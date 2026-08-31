import express from "express";

/**
 * ============================================================
 * EXPRESS — STAGE 4
 * MIDDLEWARE
 * ============================================================
 *
 * Middleware creates a processing pipeline:
 *
 * HTTP Request
 *      ↓
 * Middleware
 *      ↓
 * Middleware
 *      ↓
 * Route
 *      ↓
 * Response
 *
 * A middleware function receives:
 *
 *     req
 *     res
 *     next
 *
 * `next()` tells Express:
 *
 *     "I have finished my work.
 *      Continue processing this request."
 * ============================================================
 */

// ============================================================
// 1. CREATE EXPRESS APPLICATION
// ============================================================

const app = express();

// ============================================================
// 2. GLOBAL REQUEST LOGGER
// ============================================================
//
// This middleware runs for EVERY request.
//
// Example:
//
// GET /users
//
// Flow:
//
// Request
//   ↓
// Logger
//   ↓
// next()
//   ↓
// Route
// ============================================================

app.use((req, res, next) => {
  console.log("--------------------------------------");
  console.log("Incoming Request");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Time:", new Date().toISOString());
  console.log("--------------------------------------");

  // Continue to the next middleware/route.
  next();
});

// ============================================================
// 3. CUSTOM RESPONSE HEADER MIDDLEWARE
// ============================================================
//
// Middleware can modify the response before the route
// handler sends it.
//
// We add a custom header:
//
// X-Powered-By-Learning: Express
// ============================================================

app.use((req, res, next) => {
  res.setHeader("X-Powered-By-Learning", "Express");

  next();
});

// ============================================================
// 4. HOME ROUTE
// ============================================================

app.get("/", (req, res) => {
  res.send("Home");
});

// ============================================================
// 5. USERS ROUTE
// ============================================================

app.get("/users", (req, res) => {
  res.json({
    message: "Users endpoint",
  });
});

// ============================================================
// 6. ROUTE-SPECIFIC MIDDLEWARE
// ============================================================
//
// Middleware doesn't have to be global.
//
// We can attach middleware directly to a route.
//
// Flow:
//
// GET /admin
//      ↓
// authentication middleware
//      ↓
// route handler
// ============================================================

function adminMiddleware(req, res, next) {
  console.log("Admin middleware executed");

  next();
}

app.get("/admin", adminMiddleware, (req, res) => {
  res.json({
    message: "Admin endpoint",
  });
});

// ============================================================
// 7. 404 MIDDLEWARE
// ============================================================
//
// If no route matched, Express reaches this middleware.
//
// IMPORTANT:
//
// This middleware does NOT call next().
//
// Instead, it finishes the request by sending a response.
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.url} does not exist`,
  });
});

// ============================================================
// 8. START SERVER
// ============================================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log("======================================");
  console.log("Express Middleware Server");
  console.log("======================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log("======================================");
});
