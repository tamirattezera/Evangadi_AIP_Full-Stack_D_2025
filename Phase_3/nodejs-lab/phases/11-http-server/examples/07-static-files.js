import http from "node:http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  /**
   * ---------------------------------------------------------
   * STAGE 1 — Parse the incoming request URL
   * ---------------------------------------------------------
   *
   * req.url contains the request target.
   *
   * Example:
   *
   *   /about.html?theme=dark
   *
   * We use the WHATWG URL API to safely separate:
   *
   *   pathname → /about.html
   *   search   → ?theme=dark
   */
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  /**
   * Extract only the pathname.
   *
   * The pathname identifies the requested resource.
   */
  const pathname = requestUrl.pathname;

  /**
   * ---------------------------------------------------------
   * Debugging / Observation
   * ---------------------------------------------------------
   *
   * At this stage we are only observing the request.
   * We are NOT serving files yet.
   */
  console.log("\n--- HTTP Request ---");
  console.log(`Method:   ${req.method}`);
  console.log(`URL:      ${req.url}`);
  console.log(`Pathname: ${pathname}`);
  console.log(`Query:    ${requestUrl.search}`);

  /**
   * ---------------------------------------------------------
   * Temporary response
   * ---------------------------------------------------------
   *
   * We haven't implemented static-file serving yet.
   * This response simply confirms that URL parsing worked.
   */
  res.statusCode = 200;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  res.end(
    `Stage 1 URL Parsing

Method: ${req.method}
URL: ${req.url}
Pathname: ${pathname}
Query: ${requestUrl.search || "(none)"}
`,
  );
});

/**
 * -----------------------------------------------------------
 * Start HTTP server
 * -----------------------------------------------------------
 */
server.listen(PORT, () => {
  console.log(`Static file server starting at http://localhost:${PORT}`);
});
