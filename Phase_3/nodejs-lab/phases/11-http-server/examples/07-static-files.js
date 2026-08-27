import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

/**
 * ============================================================
 * 1. Resolve the directory containing this module
 * ============================================================
 *
 * ES modules do not provide __dirname automatically.
 *
 * import.meta.url
 *      ↓
 * fileURLToPath()
 *      ↓
 * absolute filename
 *      ↓
 * path.dirname()
 *      ↓
 * examples/
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * ============================================================
 * 2. Define the public directory
 * ============================================================
 *
 * Only files inside this directory are allowed to be served.
 *
 * resources/
 * └── public/
 *     ├── index.html
 *     ├── about.html
 *     └── style.css
 */
const publicDir = path.resolve(__dirname, "..", "resources", "public");

/**
 * ============================================================
 * 3. Supported MIME types
 * ============================================================
 *
 * The browser needs to know what type of content it receives.
 */
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
};

/**
 * ============================================================
 * 4. Create HTTP server
 * ============================================================
 */
const server = http.createServer(async (req, res) => {
  /**
   * ----------------------------------------------------------
   * STEP 1 — Only allow GET and HEAD
   * ----------------------------------------------------------
   *
   * Static file serving normally uses GET.
   *
   * HEAD is useful because it asks for the response headers
   * without requiring the response body.
   */
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("Method Not Allowed");
    return;
  }

  /**
   * ----------------------------------------------------------
   * STEP 2 — Parse URL
   * ----------------------------------------------------------
   *
   * Example:
   *
   * /style.css?version=1
   *
   * becomes:
   *
   * pathname = /style.css
   * search   = ?version=1
   */
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  let pathname = requestUrl.pathname;

  /**
   * ----------------------------------------------------------
   * STEP 3 — Default document
   * ----------------------------------------------------------
   *
   * GET /
   *
   * becomes:
   *
   * GET /index.html
   */
  if (pathname === "/") {
    pathname = "/index.html";
  }

  /**
   * ----------------------------------------------------------
   * STEP 4 — Decode URL pathname
   * ----------------------------------------------------------
   *
   * Example:
   *
   * /about%2Ehtml
   *
   * becomes:
   *
   * /about.html
   *
   * decodeURIComponent() can throw for malformed encoding,
   * so handle it safely.
   */
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("Bad Request");
    return;
  }

  /**
   * ----------------------------------------------------------
   * STEP 5 — Convert URL path into filesystem path
   * ----------------------------------------------------------
   *
   * The leading "." prevents pathname beginning with "/"
   * from replacing publicDir during path resolution.
   *
   * Example:
   *
   * publicDir:
   *   /project/resources/public
   *
   * pathname:
   *   /about.html
   *
   * result:
   *   /project/resources/public/about.html
   */
  const requestedFile = path.resolve(publicDir, `.${pathname}`);

  /**
   * ----------------------------------------------------------
   * STEP 6 — SECURITY: prevent path traversal
   * ----------------------------------------------------------
   *
   * The requested file must remain inside publicDir.
   *
   * We append path.sep so that:
   *
   * /public
   *
   * does not incorrectly match:
   *
   * /public-secret
   */
  const publicRoot = publicDir.endsWith(path.sep)
    ? publicDir
    : `${publicDir}${path.sep}`;

  const isInsidePublicDirectory =
    requestedFile === publicDir || requestedFile.startsWith(publicRoot);

  if (!isInsidePublicDirectory) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("Forbidden");
    return;
  }

  /**
   * ----------------------------------------------------------
   * STEP 7 — Inspect filesystem entry
   * ----------------------------------------------------------
   *
   * We need to distinguish:
   *
   *   file exists
   *   directory exists
   *   file does not exist
   */
  let fileStats;

  try {
    fileStats = await stat(requestedFile);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");

      res.end("404 - File Not Found");
      return;
    }

    console.error("Filesystem error:", error);

    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("500 - Internal Server Error");
    return;
  }

  /**
   * ----------------------------------------------------------
   * STEP 8 — Prevent serving directories
   * ----------------------------------------------------------
   *
   * We want files, not directories.
   */
  if (!fileStats.isFile()) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("404 - File Not Found");
    return;
  }

  /**
   * ----------------------------------------------------------
   * STEP 9 — Determine Content-Type
   * ----------------------------------------------------------
   */
  const extension = path.extname(requestedFile).toLowerCase();

  const contentType = contentTypes[extension] ?? "application/octet-stream";

  res.statusCode = 200;

  res.setHeader("Content-Type", contentType);

  /**
   * Content-Length allows the client to know the size
   * of the response body.
   */
  res.setHeader("Content-Length", fileStats.size);

  /**
   * ----------------------------------------------------------
   * STEP 10 — HEAD request
   * ----------------------------------------------------------
   *
   * HEAD returns headers but no response body.
   */
  if (req.method === "HEAD") {
    res.end();
    return;
  }

  /**
   * ----------------------------------------------------------
   * STEP 11 — Stream the file
   * ----------------------------------------------------------
   *
   * IMPORTANT:
   *
   * We do NOT do:
   *
   *   await readFile(requestedFile)
   *
   * because that buffers the complete file in memory.
   *
   * Instead:
   *
   *   File
   *    ↓
   *   Readable Stream
   *    ↓
   *   ServerResponse
   */
  const fileStream = createReadStream(requestedFile);

  /**
   * ----------------------------------------------------------
   * STEP 12 — Handle filesystem stream errors
   * ----------------------------------------------------------
   *
   * The file may disappear or become inaccessible after stat()
   * but before/during streaming.
   */
  fileStream.on("error", (error) => {
    console.error("File stream error:", error);

    /**
     * If headers have already been sent, we cannot safely
     * change the HTTP status code.
     */
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");

      res.end("500 - Internal Server Error");
    } else {
      res.destroy(error);
    }
  });

  /**
   * ----------------------------------------------------------
   * STEP 13 — Client disconnect
   * ----------------------------------------------------------
   *
   * If the client disconnects before the response finishes,
   * stop the file stream.
   */
  req.on("close", () => {
    if (!res.writableEnded) {
      fileStream.destroy();
    }
  });

  /**
   * ----------------------------------------------------------
   * STEP 14 — Connect the streams
   * ----------------------------------------------------------
   *
   * Readable:
   *
   *   fileStream
   *
   * Writable:
   *
   *   res
   *
   * pipe() connects them.
   */
  fileStream.pipe(res);
});

/**
 * ============================================================
 * 5. Start server
 * ============================================================
 */
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Static file server running at http://localhost:${PORT}`);

  console.log(`Public directory: ${publicDir}`);
});
