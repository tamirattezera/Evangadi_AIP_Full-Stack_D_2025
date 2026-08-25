import http from "node:http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  /**
   * Read the HTTP method from the incoming request.
   *
   * Examples:
   * GET, POST, PUT, PATCH, DELETE
   */
  const method = req.method;

  console.log("\n--- HTTP Request ---");
  console.log(`Method: ${method}`);
  console.log(`URL: ${req.url}`);

  /**
   * Tell the client that the request was successfully received.
   */
  res.statusCode = 200;

  /**
   * We're returning plain text for now.
   */
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  /**
   * Determine the response based on the HTTP method.
   */
  switch (method) {
    case "GET":
      res.end("GET request: retrieving data.");
      break;

    case "POST":
      res.end("POST request: creating data.");
      break;

    case "PUT":
      res.end("PUT request: replacing data.");
      break;

    case "PATCH":
      res.end("PATCH request: partially updating data.");
      break;

    case "DELETE":
      res.end("DELETE request: deleting data.");
      break;

    case "OPTIONS":
      res.setHeader("ALLOW", "GET, POST, PUT, PATCH, DELETE,OPTIONS, HEAD");
      break;
    case "HEAD":
      res.end();
      break;

    default:
      /**
       * The method is not one that our server currently
       * handles.
       */
      res.statusCode = 405;
      res.setHeader("Allow", "GET, POST, PUT, PATCH, DELETE");
      res.end("Method Not Allowed.");
  }
});

server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
