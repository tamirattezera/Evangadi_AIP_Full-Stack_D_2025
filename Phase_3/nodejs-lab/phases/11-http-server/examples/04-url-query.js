import http from "node:http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  /**
   * ----------------------------------------------------------
   * 1. Build a complete URL
   * ----------------------------------------------------------
   *
   * req.url normally contains only the request target:
   *
   *     /users?page=2&limit=10
   *
   * The URL constructor needs a complete URL, so we provide
   * the server origin as the second argument.
   */
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  /**
   * ----------------------------------------------------------
   * 2. Extract URL components
   * ----------------------------------------------------------
   */

  const pathname = requestUrl.pathname;

  /**
   * URLSearchParams gives us a structured interface for
   * query parameters.
   */
  const searchParams = requestUrl.searchParams;

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");

  console.log("\n--- HTTP Request ---");
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${pathname}`);
  console.log(`Page: ${page}`);
  console.log(`Limit: ${limit}`);
  console.log(`Search: ${search}`);

  res.statusCode = 200;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  res.end(
    `HTTP URL Information

Method: ${req.method}
Path: ${pathname}
Page: ${page ?? "not provided"}
Limit: ${limit ?? "not provided"}
Search: ${search ?? "not provided"}
`,
  );
});

server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
