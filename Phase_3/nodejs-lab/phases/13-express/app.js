import express from "express";

import userRouter from "./routes/users.routes.js";
import productRouter from "./routes/products.routes.js";

/**
 * ============================================================
 * EXPRESS APPLICATION
 * ============================================================
 *
 * Architecture:
 *
 *                    Express App
 *                        │
 *             ┌──────────┴──────────┐
 *             ↓                     ↓
 *        User Router          Product Router
 *             │                     │
 *          /users               /products
 *             │                     │
 *          handlers             handlers
 * ============================================================
 */

// ============================================================
// 1. CREATE EXPRESS APPLICATION
// ============================================================

const app = express();

// ============================================================
// 2. GLOBAL JSON BODY PARSER
// ============================================================
//
// Must execute before routes that need req.body.
// ============================================================

app.use(express.json());

// ============================================================
// 3. REQUEST LOGGER
// ============================================================

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

  next();
});

// ============================================================
// 4. MOUNT USER ROUTER
// ============================================================
//
// Every route inside userRouter receives:
//
//     /users
//
// as its prefix.
//
// Example:
//
// router.get("/")
//
// becomes:
//
// GET /users
// ============================================================

app.use("/users", userRouter);

// ============================================================
// 5. MOUNT PRODUCT ROUTER
// ============================================================
//
// Example:
//
// router.get("/:id")
//
// becomes:
//
// GET /products/:id
// ============================================================

app.use("/products", productRouter);

// ============================================================
// 6. API HEALTH CHECK
// ============================================================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Express API is running",
  });
});

// ============================================================
// 7. 404 HANDLER
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.url} does not exist`,
  });
});

// ============================================================
// 8. GLOBAL ERROR HANDLER
// ============================================================

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on the server",
  });
});

// ============================================================
// 9. START SERVER
// ============================================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log("======================================");
  console.log("Express Router API");
  console.log("======================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log("======================================");
});
