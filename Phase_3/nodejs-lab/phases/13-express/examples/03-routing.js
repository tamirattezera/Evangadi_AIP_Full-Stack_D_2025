import express from "express";

/**
 * ============================================================
 * EXPRESS — STAGE 3
 * ROUTING
 * ============================================================
 *
 * Goal:
 * Understand how Express maps:
 *
 *      HTTP METHOD + URL
 *             ↓
 *       ROUTE MATCHING
 *             ↓
 *          HANDLER
 *             ↓
 *         RESPONSE
 *
 * Example:
 *
 *      GET /users/42
 *             ↓
 *      GET /users/:id
 *             ↓
 *      req.params.id === "42"
 * ============================================================
 */

// ============================================================
// 1. CREATE EXPRESS APPLICATION
// ============================================================

const app = express();

// ============================================================
// 2. HOME ROUTE
// ============================================================
//
// Request:
//
// GET /
//
// Express checks:
//     Method → GET
//     Path   → /
//
// If both match, this handler executes.
// ============================================================

app.get("/", (req, res) => {
  res.status(200).send("Home");
});

// ============================================================
// 3. USERS COLLECTION ROUTE
// ============================================================
//
// Request:
//
// GET /users
//
// This route represents the users collection.
//
// Query parameters can be attached:
//
// GET /users?role=developer&limit=10
//
// Query parameters are available through:
//
// req.query
// ============================================================

app.get("/users", (req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Query:", req.query);

  res.status(200).json({
    message: "Users endpoint",
    query: req.query,
  });
});

// ============================================================
// 4. CREATE USER
// ============================================================
//
// Request:
//
// POST /users
//
// Notice:
//
// GET /users
// POST /users
//
// have the same path but different HTTP methods.
//
// Express treats them as different routes.
// ============================================================

app.post("/users", (req, res) => {
  res.status(201).json({
    message: "User creation endpoint",
  });
});

// ============================================================
// 5. GET SINGLE USER
// ============================================================
//
// :id is a ROUTE PARAMETER.
//
// Example:
//
// GET /users/42
//
// Express matches:
//
// /users/:id
//
// and extracts:
//
// req.params.id
//
// Result:
//
// {
//   id: "42"
// }
//
// IMPORTANT:
// Route parameters are strings by default.
// ============================================================

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: "Single user endpoint",
    id,
  });
});

// ============================================================
// 6. UPDATE USER
// ============================================================
//
// Request:
//
// PATCH /users/42
//
// Express matches:
//
// PATCH /users/:id
//
// and provides:
//
// req.params.id
// ============================================================

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: "User update endpoint",
    id,
  });
});

// ============================================================
// 7. DELETE USER
// ============================================================
//
// Request:
//
// DELETE /users/42
//
// Express matches:
//
// DELETE /users/:id
// ============================================================

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: "User deletion endpoint",
    id,
  });
});

// ============================================================
// 8. ROUTE ORDER EXPERIMENT
// ============================================================
//
// IMPORTANT:
//
// Express processes routes in registration order.
//
// We intentionally put:
//
//     /users/:id
//
// before:
//
//     /users/me
//
// Therefore:
//
// GET /users/me
//
// may match:
//
// /users/:id
//
// with:
//
// id = "me"
//
// This is an important routing behavior to understand.
// ============================================================

app.get("/users/:id", (req, res) => {
  res.status(200).json({
    route: "/users/:id",
    id: req.params.id,
    note: "Dynamic route matched",
  });
});

// ============================================================
// 9. STATIC /users/me ROUTE
// ============================================================
//
// This route is intentionally registered AFTER:
//
//     /users/:id
//
// Therefore /users/me may already have been handled by
// the dynamic route above.
//
// We keep this here as a learning experiment.
//
// Later, we will fix the route ordering.
// ============================================================

app.get("/users/me", (req, res) => {
  res.status(200).json({
    route: "/users/me",
    message: "My profile",
  });
});

// ============================================================
// 10. PRODUCTS ROUTE
// ============================================================
//
// Demonstrates that different resources can have their own
// routes.
//
// GET /products
// ============================================================

app.get("/products", (req, res) => {
  res.status(200).json({
    message: "Products endpoint",
  });
});

// ============================================================
// 11. CUSTOM 404 HANDLER
// ============================================================
//
// If no previous route matches the request:
//
// Express reaches this handler.
//
// Example:
//
// GET /does-not-exist
//
// Since no route matched, return 404.
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.url} does not exist`,
  });
});

// ============================================================
// 12. START SERVER
// ============================================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log("======================================");
  console.log("Express Routing Server");
  console.log("======================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log("");
  console.log("Available routes:");
  console.log("GET    /");
  console.log("GET    /users");
  console.log("POST   /users");
  console.log("GET    /users/:id");
  console.log("PATCH  /users/:id");
  console.log("DELETE /users/:id");
  console.log("GET    /users/me");
  console.log("GET    /products");
  console.log("======================================");
});
