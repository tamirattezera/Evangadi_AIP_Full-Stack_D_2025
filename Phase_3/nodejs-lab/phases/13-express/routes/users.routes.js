import express from "express";

/**
 * ============================================================
 * USER ROUTER
 * ============================================================
 *
 * This router is responsible for user-related routes.
 *
 * Main application:
 *
 *     /users
 *
 * User router:
 *
 *     GET    /
 *     GET    /:id
 *     POST   /
 *
 * Once mounted with:
 *
 *     app.use("/users", userRouter)
 *
 * the routes become:
 *
 *     GET  /users
 *     GET  /users/:id
 *     POST /users
 * ============================================================
 */

// ============================================================
// 1. CREATE ROUTER
// ============================================================

const router = express.Router();

// ============================================================
// 2. GET /users
// ============================================================
//
// Because the router is mounted at:
//
//     /users
//
// this "/" becomes:
//
//     GET /users
// ============================================================

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Users endpoint",
    users: [],
  });
});

// ============================================================
// 3. GET /users/:id
// ============================================================
//
// Router:
//
//     /users
//
// Route:
//
//     /:id
//
// Final endpoint:
//
//     /users/:id
//
// Example:
//
//     GET /users/42
//
// req.params.id:
//
//     "42"
// ============================================================

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: "User retrieved",
    userId: id,
  });
});

// ============================================================
// 4. POST /users
// ============================================================

router.post("/", (req, res) => {
  const { name, email } = req.body;

  res.status(201).json({
    message: "User created",
    user: {
      name,
      email,
    },
  });
});

// ============================================================
// 5. EXPORT ROUTER
// ============================================================

export default router;
