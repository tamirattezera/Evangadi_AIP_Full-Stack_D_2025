import express from "express";

/**
 * ============================================================
 * EXPRESS — STAGE 5
 * REQUEST BODY
 * ============================================================
 *
 * Goal:
 *
 * Learn how data sent by a client becomes:
 *
 *                  req.body
 *
 *
 * Client
 *   ↓
 * HTTP Request
 *   ↓
 * Request Body
 *   ↓
 * express.json()
 *   ↓
 * req.body
 *   ↓
 * Route Handler
 *   ↓
 * Response
 * ============================================================
 */

// ============================================================
// 1. CREATE EXPRESS APPLICATION
// ============================================================

const app = express();

// ============================================================
// 2. JSON BODY PARSING MIDDLEWARE
// ============================================================
//
// This middleware tells Express:
//
// "When a request contains JSON,
// parse the JSON body and expose it as req.body."
//
// Example incoming body:
//
// {
//   "name": "Tamirat",
//   "role": "developer"
// }
//
// After parsing:
//
// req.body
//
// becomes:
//
// {
//   name: "Tamirat",
//   role: "developer"
// }
// ============================================================

app.use(express.json());

// ============================================================
// 3. REQUEST LOGGER
// ============================================================
//
// This middleware runs after express.json().
//
// Therefore, for JSON requests, req.body is available here.
// ============================================================

app.use((req, res, next) => {
  console.log("--------------------------------------");
  console.log("Incoming Request");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Body:", req.body);
  console.log("--------------------------------------");

  next();
});

// ============================================================
// 4. GET /users
// ============================================================
//
// GET requests normally don't contain a request body.
//
// This endpoint simply returns information.
// ============================================================

app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users endpoint",
  });
});

// ============================================================
// 5. POST /users
// ============================================================
//
// The client sends data to the server.
//
// Example:
//
// POST /users
//
// Body:
//
// {
//   "name": "Tamirat",
//   "role": "AI Engineer"
// }
// ============================================================

app.post("/users", (req, res) => {
  // Read parsed JSON from req.body.
  const { name, role } = req.body;

  console.log("Received name:", name);
  console.log("Received role:", role);

  res.status(201).json({
    message: "User received successfully",
    user: {
      name,
      role,
    },
  });
});

// ============================================================
// 6. POST /products
// ============================================================
//
// Another example of receiving structured JSON.
// ============================================================

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  res.status(201).json({
    message: "Product received successfully",
    product: {
      name,
      price,
    },
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
// 8. START SERVER
// ============================================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log("======================================");
  console.log("Express Request Body Server");
  console.log("======================================");
  console.log(`Server: http://localhost:${PORT}`);
  console.log("======================================");
});
