import http from "node:http";

/**
 * ============================================================
 * HTTP REQUEST / RESPONSE
 * ============================================================
 *
 * Every HTTP interaction has two sides:
 *
 *        CLIENT
 *           │
 *           │ HTTP REQUEST
 *           ▼
 *        SERVER
 *           │
 *           │ HTTP RESPONSE
 *           ▼
 *        CLIENT
 *
 * req → incoming HTTP request
 * res → outgoing HTTP response
 */

/**
 * ============================================================
 * CREATE HTTP SERVER
 * ============================================================
 */
const server = http.createServer((req, res) => {
  /**
   * ==========================================================
   * REQUEST
   * ==========================================================
   *
   * The `req` object represents the request sent by the
   * client.
   *
   * Important properties:
   *
   * req.method
   *     → HTTP method
   *
   * req.url
   *     → requested URL
   *
   * req.headers
   *     → HTTP request headers
   */
  console.log("\n==============================");
  console.log("        HTTP REQUEST");
  console.log("==============================");

  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);

  console.log("\nHeaders:");
  console.log(req.headers);

  /**
   * ==========================================================
   * RESPONSE
   * ==========================================================
   *
   * The `res` object allows the server to construct the
   * response sent back to the client.
   */

  // HTTP status code.
  res.statusCode = 200;

  /**
   * Response header.
   *
   * This tells the client that the response body is plain text
   * encoded as UTF-8.
   */
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  /**
   * Send the response body and finish the response.
   *
   * Once res.end() is called, the response is complete.
   */
  res.end(
    `Hello from Node.js!

Method: ${req.method}
URL: ${req.url}
`,
  );
});

/**
 * ============================================================
 * SERVER CONFIGURATION
 * ============================================================
 */

const PORT = 3000;

/**
 * Start listening for TCP connections on port 3000.
 */
server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
