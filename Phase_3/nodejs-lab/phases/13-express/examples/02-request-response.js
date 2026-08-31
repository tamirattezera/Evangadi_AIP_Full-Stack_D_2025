import express from "express";

/**
 * ============================================================
 * EXPRESS — STAGE 2
 * Request & Response
 * ============================================================
 *
 * Learning objectives:
 *
 * 1. Understand the Express `req` object.
 * 2. Understand the Express `res` object.
 * 3. Inspect HTTP method and URL.
 * 4. Set HTTP status codes.
 * 5. Set response headers.
 * 6. Send text responses.
 * 7. Send JSON responses.
 *
 * Request flow:
 *
 * Browser
 *    ↓
 * HTTP Request
 *    ↓
 * Node.js HTTP
 *    ↓
 * Express
 *    ↓
 * Route Handler
 *    ↓
 * Response
 *    ↓
 * Browser
 * ============================================================
 */

// ------------------------------------------------------------
// 1. Create the Express application
// ------------------------------------------------------------

const app = express();

// ------------------------------------------------------------
// 2. GET /
// ------------------------------------------------------------
//
// When the client sends:
//
// GET /
//
// Express executes this handler.
//
// `req` → incoming HTTP request
// `res` → outgoing HTTP response
// ------------------------------------------------------------

app.get("/", (req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  res.status(200).send("Welcome to the Express server");
});

// ------------------------------------------------------------
// 3. GET /about
// ------------------------------------------------------------
//
// Demonstrates:
//
// req.method
// req.url
// res.status()
// res.send()
// ------------------------------------------------------------

app.get("/about", (req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  res.status(200).send("This is the About page");
});

// ------------------------------------------------------------
// 4. GET /contact
// ------------------------------------------------------------
//
// Demonstrates explicitly setting a response header.
//
// The browser needs to know what type of data it received.
// ------------------------------------------------------------

app.get("/contact", (req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  res
    .status(200)
    .set("Content-Type", "text/plain; charset=utf-8")
    .send("Contact page");
});

// ------------------------------------------------------------
// 5. GET /api/status
// ------------------------------------------------------------
//
// Demonstrates sending JSON.
//
// Express:
//
// res.json(object)
//
// handles JSON serialization and the appropriate
// Content-Type response.
// ------------------------------------------------------------

app.get("/api/status", (req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  res.status(200).json({
    status: "ok",
    message: "Express server is running",
    runtime: "Node.js",
    framework: "Express",
  });
});

// ------------------------------------------------------------
// 6. GET /api/request-info
// ------------------------------------------------------------
//
// This endpoint lets us inspect the incoming request.
//
// Try:
//
// http://localhost:3000/api/request-info?name=Tamirat
//
// Notice:
//
// req.url
//
// contains:
//
// /api/request-info?name=Tamirat
//
// ------------------------------------------------------------

app.get("/api/request-info", (req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  res.status(200).json({
    method: req.method,
    url: req.url,
    message: "Request information received",
  });
});

// ------------------------------------------------------------
// 7. Start the server
// ------------------------------------------------------------
//
// app.listen() starts the underlying HTTP server.
//
// Express
//    ↓
// Node.js HTTP server
//    ↓
// Operating system
//    ↓
// Port 3000
// ------------------------------------------------------------

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Express server running at http:
  //localhost:${PORT}`);
});
