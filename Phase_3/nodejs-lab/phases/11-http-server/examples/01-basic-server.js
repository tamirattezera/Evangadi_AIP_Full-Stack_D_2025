import http from "node:http";

/**
 * ============================================================
 * HTTP SERVER
 * ============================================================
 *
 * createServer() creates a Node.js HTTP server.
 *
 * Every time a client sends an HTTP request, this callback
 * runs:
 *
 *     Client
 *        │
 *        │ HTTP Request
 *        ▼
 *     Node.js
 *        │
 *        ▼
 *   (req, res)
 *
 * req → information about the incoming request
 * res → object used to build the response
 */
const server = http.createServer((req, res) => {
  /**
   * ==========================================================
   * REQUEST INFORMATION
   * ==========================================================
   *
   * req.method
   *     → HTTP method
   *
   * req.url
   *     → requested URL/path
   */
  console.log("\n--- HTTP Request ---");
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);

  /**
   * ==========================================================
   * RESPONSE
   * ==========================================================
   *
   * Set the response status.
   *
   * 200 = OK
   */
  res.statusCode = 200;

  /**
   * Tell the client what kind of data we're returning.
   */
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  /**
   * end() sends the response body and signals that the
   * response is complete.
   *
   * For a simple response, we don't need res.write().
   */
  res.end("Hello from Node.js HTTP Server\n");
});

/**
 * ============================================================
 * START SERVER
 * ============================================================
 *
 * Port 3000 identifies the network endpoint where our
 * HTTP server accepts incoming connections.
 */
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
