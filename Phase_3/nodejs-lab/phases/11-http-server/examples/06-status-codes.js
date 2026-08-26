import http from "node:http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Parse URL
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  const pathname = requestUrl.pathname;
  const method = req.method;

  console.log(`\n${method} ${pathname}`);

  // Default response type
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    // ==========================
    // GET /users
    // ==========================
    if (pathname === "/users" && method === "GET") {
      res.statusCode = 200;

      return res.end(
        JSON.stringify({
          success: true,
          message: "Users retrieved successfully",
        }),
      );
    }

    // ==========================
    // POST /users
    // ==========================
    if (pathname === "/users" && method === "POST") {
      res.statusCode = 201;

      return res.end(
        JSON.stringify({
          success: true,
          message: "User created successfully",
        }),
      );
    }

    // ==========================
    // GET /health
    // ==========================
    if (pathname === "/health" && method === "GET") {
      res.statusCode = 200;

      return res.end(
        JSON.stringify({
          status: "OK",
          uptime: process.uptime(),
        }),
      );
    }

    // ==========================
    // Method not allowed
    // ==========================
    if (pathname === "/users" && !["GET", "POST"].includes(method)) {
      res.statusCode = 405;

      res.setHeader("Allow", "GET, POST");

      return res.end(
        JSON.stringify({
          error: "Method Not Allowed",
        }),
      );
    }

    // ==========================
    // Route not found
    // ==========================
    res.statusCode = 404;

    return res.end(
      JSON.stringify({
        error: "Not Found",
      }),
    );
  } catch (error) {
    console.error(error);

    res.statusCode = 500;

    return res.end(
      JSON.stringify({
        error: "Internal Server Error",
      }),
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
