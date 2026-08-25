import http from "node:http";

/**
 * Handles incoming HTTP requests and sends HTTP responses.
 *
 * req → incoming request
 * res → outgoing response
 */
const server = http.createServer((req, res) => {
  console.log("\n--- HTTP Request ---");
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);

  console.log("\nHeaders:");
  console.log(req.headers);

  // HTTP status code: 200 OK.
  res.statusCode = 200;

  // Tell the client the response body is UTF-8 plain text.
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // Sends the response body and signals that the response is complete.
  res.end(
    `Hello from Node.js!

Method: ${req.method}
URL: ${req.url}
`,
  );
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
