import express from "express";

/**
 * ============================================================
 * EXPRESS — STAGE 6
 * ERROR HANDLING + VALIDATION
 * ============================================================
 *
 * Request lifecycle:
 *
 * Client
 *   ↓
 * Express
 *   ↓
 * express.json()
 *   ↓
 * Logger
 *   ↓
 * Route
 *   ↓
 * Validation
 *   ↓
 * Business Logic
 *   ↓
 * ┌──────────────────────┐
 * │                      │
 * │ Success              │ Error
 * ↓                      ↓
 * 201 Created          next(error)
 *                         ↓
 *                   Error Middleware
 *                         ↓
 *                   400 / 500
 * ============================================================
 */

// ============================================================
// 1. CREATE EXPRESS APPLICATION
// ============================================================

const app = express();

// ============================================================
// 2. JSON BODY PARSER
// ============================================================
//
// Allows Express to parse:
//
// Content-Type: application/json
//
// Example:
//
// {
//   "name": "Tamirat",
//   "email": "tamirat@example.com"
// }
//
// and expose it through:
//
// req.body
// ============================================================

app.use(express.json());

// ============================================================
// 3. REQUEST LOGGER
// ============================================================

app.use((req, res, next) => {
  console.log("--------------------------------------");
  console.log("Incoming Request");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Time:", new Date().toISOString());
  console.log("--------------------------------------");

  next();
});

// ============================================================
// 4. HOME ROUTE
// ============================================================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Express API is running",
  });
});

// ============================================================
// 5. GET USERS
// ============================================================

app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users endpoint",
    users: [],
  });
});

// ============================================================
// 6. POST /users
// ============================================================
//
// Expected request:
//
// POST /users
//
// Content-Type: application/json
//
// {
//   "name": "Tamirat",
//   "email": "tamirat@example.com"
// }
//
// Possible outcomes:
//
// Valid request
//     ↓
// 201 Created
//
// Missing name/email
//     ↓
// 400 Bad Request
//
// Unexpected server problem
//     ↓
// 500 Internal Server Error
// ============================================================

app.post("/users", (req, res, next) => {
  try {
    // ----------------------------------------------------------
    // STEP 1 — Read request body
    // ----------------------------------------------------------

    const { name, email } = req.body;

    // ----------------------------------------------------------
    // STEP 2 — Validate name
    // ----------------------------------------------------------

    if (!name) {
      const error = new Error("Name is required");

      error.statusCode = 400;

      return next(error);
    }

    // ----------------------------------------------------------
    // STEP 3 — Validate email
    // ----------------------------------------------------------

    if (!email) {
      const error = new Error("Email is required");

      error.statusCode = 400;

      return next(error);
    }

    // ----------------------------------------------------------
    // STEP 4 — Simulated business logic
    // ----------------------------------------------------------
    //
    // In the future this is where you might:
    //
    //     MySQL
    //       ↓
    //     INSERT INTO users
    //
    // For now we simply create an object.
    // ----------------------------------------------------------

    const user = {
      id: Date.now(),
      name,
      email,
    };

    // ----------------------------------------------------------
    // STEP 5 — Send successful response
    // ----------------------------------------------------------

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    // ----------------------------------------------------------
    // STEP 6 — Forward unexpected errors
    // ----------------------------------------------------------

    next(error);
  }
});

// ============================================================
// 7. INTENTIONAL ERROR ROUTE
// ============================================================
//
// This route allows us to test the global error handler.
//
// Flow:
//
// GET /error
//      ↓
// Error created
//      ↓
// next(error)
//      ↓
// Global error middleware
//      ↓
// 500 response
// ============================================================

app.get("/error", (req, res, next) => {
  const error = new Error("Something unexpected happened");

  next(error);
});

// ============================================================
// 8. ASYNC ERROR ROUTE
// ============================================================
//
// Simulates an asynchronous failure.
//
// In a real application this could be:
//
//     await database.query(...)
//     await externalApiCall(...)
//     await fileOperation(...)
// ============================================================

app.get("/async-error", async (req, res) => {
  throw new Error("Async operation failed");
});

// ============================================================
// 9. 404 HANDLER
// ============================================================
//
// If Express reaches this middleware, no previous route
// matched the request.
//
// Example:
//
// GET /something-that-does-not-exist
//
// This is a routing problem, not a server crash.
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.url} does not exist`,
  });
});

// ============================================================
// 10. GLOBAL ERROR HANDLER
// ============================================================
//
// IMPORTANT:
//
// Error middleware has FOUR parameters:
//
//     (err, req, res, next)
//
// Express recognizes this as error-handling middleware.
//
// It must be registered AFTER the routes and 404 handler.
// ============================================================

app.use((err, req, res, next) => {
  // ----------------------------------------------------------
  // STEP 1 — Log detailed error internally
  // ----------------------------------------------------------

  console.error("======================================");
  console.error("ERROR");
  console.error("======================================");
  console.error(err);
  console.error("======================================");

  // ----------------------------------------------------------
  // STEP 2 — If headers already went to the client
  // ----------------------------------------------------------
  //
  // We can no longer safely change the response status.
  // Let Express's default error handler deal with it.
  // ----------------------------------------------------------

  if (res.headersSent) {
    return next(err);
  }

  // ----------------------------------------------------------
  // STEP 3 — Determine status code
  // ----------------------------------------------------------
  //
  // Validation errors:
  //
  //     400
  //
  // Unexpected errors:
  //
  //     500
  // ----------------------------------------------------------

  const statusCode = err.statusCode || 500;

  // ----------------------------------------------------------
  // STEP 4 — Send safe response to client
  // ----------------------------------------------------------

  if (statusCode === 400) {
    return res.status(400).json({
      error: "Bad Request",
      message: err.message,
    });
  }

  // ----------------------------------------------------------
  // STEP 5 — Do NOT expose internal error details
  // ----------------------------------------------------------

  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on the server",
  });
});

// ============================================================
// 11. START SERVER
// ============================================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log("======================================");
  console.log("Express Error Handling API");
  console.log("======================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log("======================================");
});
