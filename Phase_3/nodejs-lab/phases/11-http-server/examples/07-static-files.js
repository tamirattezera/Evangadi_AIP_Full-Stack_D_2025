import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

/**
 * ============================================================
 * 1. Resolve this module's directory
 * ============================================================
 *
 * ES modules do not provide __dirname automatically.
 *
 * import.meta.url
 *      ↓
 * fileURLToPath()
 *      ↓
 * absolute file path
 *      ↓
 * path.dirname()
 *      ↓
 * examples/
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * ============================================================
 * 2. Define the static website root
 * ============================================================
 *
 * Our project:
 *
 * 11-http-server/
 * │
 * ├── apple-bootstrap/
 * │   ├── index.html
 * │   ├── css/
 * │   │   ├── bootstrap.css
 * │   │   └── style.css
 * │   ├── js/
 * │   └── assets/
 * │       ├── icons/
 * │       ├── images/
 * │       └── logos/
 * │
 * └── examples/
 *     └── 07-static-files.js
 *
 * __dirname:
 *
 *     .../11-http-server/examples
 *
 * ../apple-bootstrap:
 *
 *     .../11-http-server/apple-bootstrap
 *
 * This directory becomes our PUBLIC ROOT.
 */
const publicDir = path.resolve(__dirname, "..", "apple-bootstrap");

/**
 * ============================================================
 * 3. MIME / Content-Type mapping
 * ============================================================
 *
 * The browser needs to know what kind of data it receives.
 *
 * Example:
 *
 *     .html → text/html
 *     .css  → text/css
 *     .js   → text/javascript
 *     .png  → image/png
 *
 * The extension is used to select the HTTP Content-Type.
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

  ".webp": "image/webp",
};

/**
 * ============================================================
 * 4. Create HTTP server
 * ============================================================
 */
const server = http.createServer(async (req, res) => {
  /**
   * ==========================================================
   * STEP 1 — Validate HTTP method
   * ==========================================================
   *
   * A static file server only needs:
   *
   *     GET
   *     HEAD
   *
   * GET:
   *     Request the actual resource.
   *
   * HEAD:
   *     Request only the headers.
   */
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;

    res.setHeader("Allow", "GET, HEAD");

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("Method Not Allowed");

    return;
  }

  /**
   * ==========================================================
   * STEP 2 — Parse the request URL
   * ==========================================================
   *
   * Example:
   *
   *     /css/style.css?version=1
   *
   * URL gives us:
   *
   *     pathname → /css/style.css
   *     search   → ?version=1
   *
   * The query string should NOT become part of the
   * filesystem filename.
   */
  const requestUrl = new URL(req.url, "http://localhost");

  let pathname = requestUrl.pathname;

  console.log("\n==============================");
  console.log("HTTP REQUEST");
  console.log("==============================");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Pathname:", pathname);
  console.log("Query:", requestUrl.search || "(none)");

  /**
   * ==========================================================
   * STEP 3 — Decode URL pathname
   * ==========================================================
   *
   * URLs can contain encoded characters.
   *
   * Example:
   *
   *     %20 → space
   *
   * Malformed encoding can throw an error, so we handle it.
   */
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    res.statusCode = 400;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("400 - Bad Request");

    return;
  }

  /**
   * ==========================================================
   * STEP 4 — Default document
   * ==========================================================
   *
   * When the browser requests:
   *
   *     /
   *
   * serve:
   *
   *     /index.html
   */
  if (pathname === "/") {
    pathname = "/index.html";
  }

  /**
   * ==========================================================
   * STEP 5 — Convert URL → filesystem path
   * ==========================================================
   *
   * Example:
   *
   * URL:
   *
   *     /css/style.css
   *
   * becomes:
   *
   *     apple-bootstrap/css/style.css
   *
   * We use path.resolve() instead of manually concatenating
   * filesystem paths.
   */
  const requestedFile = path.resolve(publicDir, `.${pathname}`);

  console.log("Resolved file:", requestedFile);

  /**
   * ==========================================================
   * STEP 6 — SECURITY: Path Traversal Protection
   * ==========================================================
   *
   * The client must NEVER be able to escape:
   *
   *     apple-bootstrap/
   *
   * Example malicious request:
   *
   *     /../secret.txt
   *
   * or:
   *
   *     /%2e%2e/%2e%2e/secret.txt
   *
   * After decoding + resolving, we verify that the resulting
   * path is still inside publicDir.
   */
  const publicRoot = publicDir.endsWith(path.sep)
    ? publicDir
    : `${publicDir}${path.sep}`;

  const isInsidePublicDirectory =
    requestedFile === publicDir || requestedFile.startsWith(publicRoot);

  if (!isInsidePublicDirectory) {
    console.warn("Blocked path traversal attempt:", pathname);

    res.statusCode = 403;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("403 - Forbidden");

    return;
  }

  /**
   * ==========================================================
   * STEP 7 — Inspect the filesystem
   * ==========================================================
   *
   * stat() tells us whether:
   *
   *     - the path exists
   *     - it is a file
   *     - it is a directory
   *     - its size
   *     - timestamps
   */
  let fileStats;

  try {
    fileStats = await stat(requestedFile);
  } catch (error) {
    /**
     * ENOENT means:
     *
     * "No such file or directory"
     *
     * For an HTTP server this becomes:
     *
     *     404 Not Found
     */
    if (error.code === "ENOENT") {
      console.log("File not found:", requestedFile);

      res.statusCode = 404;

      res.setHeader("Content-Type", "text/plain; charset=utf-8");

      res.end("404 - File Not Found");

      return;
    }

    /**
     * Any unexpected filesystem error becomes:
     *
     *     500 Internal Server Error
     */
    console.error("Filesystem error:", error);

    res.statusCode = 500;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("500 - Internal Server Error");

    return;
  }

  /**
   * ==========================================================
   * STEP 8 — Don't serve directories
   * ==========================================================
   *
   * Example:
   *
   *     /assets/
   *
   * points to a directory.
   *
   * This server only serves actual files.
   */
  if (!fileStats.isFile()) {
    res.statusCode = 404;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.end("404 - File Not Found");

    return;
  }

  /**
   * ==========================================================
   * STEP 9 — Determine Content-Type
   * ==========================================================
   *
   * Example:
   *
   *     /css/style.css
   *
   * extension:
   *
   *     .css
   *
   * MIME:
   *
   *     text/css
   */
  const extension = path.extname(requestedFile).toLowerCase();

  const contentType = contentTypes[extension] ?? "application/octet-stream";

  /**
   * ==========================================================
   * STEP 10 — Set HTTP response headers
   * ==========================================================
   */
  res.statusCode = 200;

  res.setHeader("Content-Type", contentType);

  /**
   * Tell the browser exactly how many bytes to expect.
   */
  res.setHeader("Content-Length", fileStats.size);

  /**
   * ==========================================================
   * STEP 11 — Handle HEAD
   * ==========================================================
   *
   * HEAD returns the same headers as GET but does not
   * send the file body.
   */
  if (req.method === "HEAD") {
    res.end();

    return;
  }

  /**
   * ==========================================================
   * STEP 12 — Create a readable file stream
   * ==========================================================
   *
   * We intentionally DO NOT use:
   *
   *     await readFile(requestedFile)
   *
   * because readFile() loads the complete file into memory.
   *
   * Instead:
   *
   *     File
   *       ↓
   *     Readable Stream
   *       ↓
   *     HTTP Response
   *
   * This is much better for large files.
   */
  const fileStream = createReadStream(requestedFile);

  /**
   * ==========================================================
   * STEP 13 — Handle stream errors
   * ==========================================================
   *
   * The filesystem can change between:
   *
   *     stat()
   *
   * and:
   *
   *     createReadStream()
   *
   * For example, another process could delete the file.
   */
  fileStream.on("error", (error) => {
    console.error("File stream error:", error);

    /**
     * If headers haven't been sent yet,
     * we can return a clean HTTP 500.
     */
    if (!res.headersSent) {
      res.statusCode = 500;

      res.setHeader("Content-Type", "text/plain; charset=utf-8");

      res.end("500 - Internal Server Error");
    } else {
      /**
       * Headers are already on their way to the client.
       *
       * We cannot change:
       *
       *     200
       *
       * into:
       *
       *     500
       *
       * at this point.
       *
       * Destroy the response instead.
       */
      res.destroy(error);
    }
  });

  /**
   * ==========================================================
   * STEP 14 — Handle client disconnect
   * ==========================================================
   *
   * If the browser/client disconnects while the file is
   * streaming, stop reading the file.
   */
  req.on("close", () => {
    if (!res.writableEnded) {
      fileStream.destroy();
    }
  });

  /**
   * ==========================================================
   * STEP 15 — Stream file → HTTP response
   * ==========================================================
   *
   * fileStream = Readable
   *
   * res = Writable
   *
   * pipe() connects the two.
   *
   *     filesystem
   *          ↓
   *     fileStream
   *          ↓
   *        pipe()
   *          ↓
   *        res
   *          ↓
   *       browser
   */
  fileStream.pipe(res);
});

/**
 * ============================================================
 * 5. Start HTTP server
 * ============================================================
 */

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`\n🚀 Apple Bootstrap server running at:`);

  console.log(`   http://localhost:${PORT}`);

  console.log(`📁 Public directory: ${publicDir}`);
});
