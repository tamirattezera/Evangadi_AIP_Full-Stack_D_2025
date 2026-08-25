import http from "node:http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  /**
   * ==========================================================
   * REQUEST HEADERS
   * ==========================================================
   *
   * req.headers contains metadata sent by the client.
   *
   * Examples:
   * - host
   * - user-agent
   * - accept
   * - content-type
   * - authorization
   */
  console.log("\n--- HTTP Request ---");
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);

  console.log("\nRequest Headers:");
  console.log(req.headers);

  /**
   * Access individual request headers.
   *
   * Node normalizes incoming header names to lowercase.
   */
  const userAgent = req.headers["user-agent"];
  const accept = req.headers.accept;
  const contentType = req.headers["content-type"];

  console.log("\nSelected Headers:");
  console.log(`User-Agent: ${userAgent}`);
  console.log(`Accept: ${accept}`);
  console.log(`Content-Type: ${contentType ?? "not provided"}`);

  res.statusCode = 200;

  /**
   * ==========================================================
   * RESPONSE HEADERS
   * ==========================================================
   *
   * setHeader() defines metadata that Node will send back
   * to the client.
   */
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  res.setHeader("X-Powered-By", "Node.js");

  res.end(
    `HTTP Header Information

Method: ${req.method}
URL: ${req.url}
User-Agent: ${userAgent}
Accept: ${accept}
Content-Type: ${contentType ?? "not provided"}
`,
  );
});

server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
