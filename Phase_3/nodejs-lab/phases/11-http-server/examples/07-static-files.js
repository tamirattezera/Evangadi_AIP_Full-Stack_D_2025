import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * ============================================================
 * 1. Resolve the current module's directory
 * ============================================================
 *
 * In ES modules, __dirname is not available automatically.
 *
 * import.meta.url
 *      ↓
 * fileURLToPath()
 *      ↓
 * absolute filename
 *      ↓
 * path.dirname()
 *      ↓
 * directory containing this file
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * ============================================================
 * 2. Define the STATIC PUBLIC DIRECTORY
 * ============================================================
 *
 * Our project structure:
 *
 * 11-http-server/
 * ├── examples/
 * │   └── 07-static-files.js
 * │
 * └── resources/
 *     └── public/
 *         ├── index.html
 *         ├── about.html
 *         └── style.css
 *
 * __dirname points to:
 *
 *     .../11-http-server/examples
 *
 * So we move:
 *
 *     .. → 11-http-server
 *
 * and then:
 *
 *     resources/public
 */
const publicDir = path.resolve(__dirname, "..", "resources", "public");

console.log("Public directory:", publicDir);

/**
 * ============================================================
 * 3. Create HTTP server
 * ============================================================
 */
const server = http.createServer((req, res) => {
  /**
   * ----------------------------------------------------------
   * STEP 1 — Parse the incoming HTTP URL
   * ----------------------------------------------------------
   *
   * Example request:
   *
   *     /style.css?version=1
   *
   * requestUrl.pathname:
   *
   *     /style.css
   *
   * requestUrl.search:
   *
   *     ?version=1
   */
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  /**
   * ----------------------------------------------------------
   * STEP 2 — Extract pathname
   * ----------------------------------------------------------
   *
   * The pathname represents the resource requested by
   * the client.
   */
  let pathname = requestUrl.pathname;

  console.log("\n--- HTTP Request ---");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Pathname:", pathname);
  console.log("Query:", requestUrl.search || "(none)");

  /**
   * ----------------------------------------------------------
   * STEP 3 — Default document
   * ----------------------------------------------------------
   *
   * When the browser requests:
   *
   *     /
   *
   * we interpret that as:
   *
   *     /index.html
   */
  if (pathname === "/") {
    pathname = "/index.html";
  }

  /**
   * ----------------------------------------------------------
   * STEP 4 — Convert URL pathname into a filesystem path
   * ----------------------------------------------------------
   *
   * Example:
   *
   *     pathname
   *     /about.html
   *
   * becomes:
   *
   *     .../resources/public/about.html
   *
   * IMPORTANT:
   *
   * We are only calculating the path at this stage.
   *
   * We are NOT reading or streaming the file yet.
   */
  const requestedFile = path.resolve(publicDir, `.${pathname}`);

  /**
   * ----------------------------------------------------------
   * STEP 5 — Display the mapping
   * ----------------------------------------------------------
   *
   * This allows us to understand exactly how the HTTP URL
   * maps to the filesystem.
   */
  console.log("Public directory:", publicDir);
  console.log("Requested pathname:", pathname);
  console.log("Resolved file:", requestedFile);

  /**
   * ----------------------------------------------------------
   * TEMPORARY RESPONSE
   * ----------------------------------------------------------
   *
   * We haven't implemented file serving yet.
   */
  res.statusCode = 200;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  res.end(
    `Stage 2 — URL → Filesystem Path

Pathname:
${pathname}

Resolved file:
${requestedFile}
`,
  );
});

/**
 * ============================================================
 * 4. Start HTTP server
 * ============================================================
 */
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`\nServer running at http://localhost:${PORT}`);
});
