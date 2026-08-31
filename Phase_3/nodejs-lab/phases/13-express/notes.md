# Express.js — Engineering Notes

> Personal engineering notes for mastering Express.js through understanding, implementation, debugging, security, and architecture.

---

# 01 — Express Mental Model

## Core Idea

Express.js is a web framework for Node.js that provides a higher-level abstraction for building HTTP applications and APIs.

It does not replace Node.js.

```text
Express
   ↓
Node.js HTTP
   ↓
Node.js Runtime
   ↓
Operating System
```

The raw Node.js HTTP server provides the foundation.

Express provides structure and convenience around that foundation.

---

# 02 — Raw Node.js HTTP vs Express

## Raw Node.js

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        users: [],
      }),
    );
  }
});

server.listen(3000);
```

The developer manually handles:

```text
HTTP method
URL
Routing
Headers
Status code
JSON serialization
Response
```

## Express

```js
import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json({
    users: [],
  });
});

app.listen(3000);
```

Express reduces repetitive HTTP plumbing.

---

# 03 — Express Application

Basic application:

```js
import express from "express";

const app = express();
```

Mental model:

```text
express()
    ↓
Express Application
    ↓
Routes + Middleware
    ↓
HTTP Server
```

The `app` object becomes the central application object.

It is used to configure:

```text
Routes
Middleware
Error handling
Application behavior
Server startup
```

---

# 04 — `app.listen()`

Example:

```js
app.listen(3000, () => {
  console.log("Server running");
});
```

Conceptually:

```text
app.listen()
      ↓
HTTP server starts
      ↓
Operating system binds port 3000
      ↓
Server waits for connections
```

This connects directly to previous Node.js HTTP knowledge.

---

# 05 — Request / Response

Every HTTP request produces a request/response lifecycle.

```text
Client
   ↓
HTTP Request
   ↓
Node.js
   ↓
Express
   ↓
Route
   ↓
Handler
   ↓
Response
   ↓
Client
```

Express exposes:

```js
(req, res) => {};
```

Where:

```text
req → incoming HTTP request
res → outgoing HTTP response
```

---

# 06 — Request Object

The request object provides information about the incoming request.

Important properties:

```js
req.method;
req.url;
req.params;
req.query;
req.body;
req.headers;
```

Example:

```js
app.get("/users/:id", (req, res) => {
  console.log(req.method);
  console.log(req.params);
  console.log(req.query);
  console.log(req.headers);
});
```

Mental model:

```text
HTTP Request
     ↓
IncomingMessage
     ↓
Express req
```

---

# 07 — Response Object

Express provides response helpers.

Important methods:

```js
res.status();
res.send();
res.json();
res.set();
res.end();
```

Example:

```js
res.status(200).json({
  message: "Success",
});
```

Conceptually:

```text
JavaScript Object
      ↓
JSON serialization
      ↓
HTTP Response
      ↓
Client
```

---

# 08 — HTTP Methods

Common REST methods:

```text
GET
POST
PUT
PATCH
DELETE
```

Typical meaning:

```text
GET     → retrieve data
POST    → create data
PUT     → replace data
PATCH   → partially update data
DELETE  → remove data
```

Example:

```js
app.get("/products", ...);

app.post("/products", ...);

app.patch("/products/:id", ...);

app.delete("/products/:id", ...);
```

---

# 09 — Routing

A route connects:

```text
HTTP Method
      +
URL Pattern
      ↓
Handler
```

Example:

```js
app.get("/products", (req, res) => {
  res.json([]);
});
```

Mental model:

```text
GET /products
      ↓
Express Router
      ↓
Matching route
      ↓
Handler
```

---

# 10 — Route Parameters

Route:

```js
app.get("/products/:id", (req, res) => {
  console.log(req.params.id);
});
```

Request:

```text
GET /products/42
```

Result:

```js
req.params;
```

```js
{
  id: "42";
}
```

Important:

Route parameters identify a specific resource.

```text
/products/:id
```

---

# 11 — Query Parameters

Request:

```text
GET /products?category=laptop&limit=10
```

Access:

```js
req.query.category;
req.query.limit;
```

Mental model:

```text
/products
     ↓
?category=laptop&limit=10
     ↓
req.query
```

Query parameters are commonly used for:

```text
Filtering
Searching
Sorting
Pagination
Optional configuration
```

---

# 12 — Route Params vs Query Params

## Route parameter

```text
/products/42
```

Means:

> I want product 42.

```js
req.params.id;
```

## Query parameter

```text
/products?category=laptop
```

Means:

> Give me products filtered by category.

```js
req.query.category;
```

Mental model:

```text
Resource identity
       ↓
Route params

Resource filtering/options
       ↓
Query params
```

---

# 13 — JSON Request Body

Express can parse JSON request bodies using:

```js
app.use(express.json());
```

Then:

```js
req.body;
```

Example request:

```http
POST /products
Content-Type: application/json
```

```json
{
  "name": "MacBook",
  "price": 1200
}
```

Express:

```js
app.use(express.json());

app.post("/products", (req, res) => {
  console.log(req.body);
});
```

Mental model:

```text
HTTP Request
      ↓
Request Body Stream
      ↓
express.json()
      ↓
JSON parsing
      ↓
req.body
```

This connects directly to the previous raw Node.js request-body exercise.

---

# 14 — Middleware

Middleware is code that runs during the request/response lifecycle.

Basic structure:

```js
(req, res, next) => {
  next();
};
```

Mental model:

```text
Request
   ↓
Middleware 1
   ↓
Middleware 2
   ↓
Middleware 3
   ↓
Route Handler
   ↓
Response
```

---

# 15 — `next()`

`next()` tells Express:

> Continue processing the request.

Example:

```js
app.use((req, res, next) => {
  console.log("Request received");

  next();
});
```

Without `next()` or a response:

```js
res.send(...)
```

the request can remain unresolved.

---

# 16 — Middleware Ordering

Middleware executes in registration order.

Example:

```js
app.use(first);
app.use(second);
app.get("/", handler);
```

Flow:

```text
Request
   ↓
first
   ↓
second
   ↓
handler
   ↓
Response
```

Therefore:

> **Middleware order matters.**

---

# 17 — Built-in JSON Middleware

```js
app.use(express.json());
```

This should generally be registered before routes that need `req.body`.

```js
app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
});
```

---

# 18 — Router

As the application grows, routes should be separated.

Example:

```text
routes/
├── users.routes.js
├── products.routes.js
└── orders.routes.js
```

Conceptual architecture:

```text
Express App
     ↓
Router
     ├── users
     ├── products
     └── orders
```

---

# 19 — REST API Mental Model

Example:

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
```

The API models resources rather than actions.

Prefer:

```text
POST /api/products
```

over:

```text
POST /api/create-product
```

---

# 20 — Status Codes

Important API status codes:

```text
200 → successful request
201 → resource created
204 → successful request with no body
400 → invalid request
401 → authentication required
403 → forbidden
404 → resource not found
409 → conflict
500 → server error
```

Example:

```js
res.status(201).json(product);
```

---

# 21 — Error Handling

Application errors should be handled intentionally.

Conceptual flow:

```text
Request
   ↓
Middleware
   ↓
Route
   ↓
Controller
   ↓
Error
   ↓
Error Middleware
   ↓
HTTP Response
```

A centralized error handler can provide consistent responses.

---

# 22 — 404 Handling

If no route matches:

```text
GET /unknown
```

the application should return an appropriate 404 response.

Conceptually:

```text
Request
   ↓
All routes checked
   ↓
No match
   ↓
404 Middleware
   ↓
404 Response
```

---

# 23 — Error Middleware

Express error middleware has four parameters:

```js
(err, req, res, next);
```

Example structure:

```js
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
  });
});
```

The four arguments are significant.

---

# 24 — Static Files

Express can serve static assets:

```js
app.use(express.static("public"));
```

Mental model:

```text
Browser
   ↓
GET /style.css
   ↓
Express
   ↓
Static middleware
   ↓
Filesystem
   ↓
File
   ↓
HTTP Response
   ↓
Browser
```

This connects directly to the previous Node.js static-file-server implementation.

---

# 25 — Express vs Manual Static Server

Previously:

```text
URL
 ↓
URL parsing
 ↓
Path resolution
 ↓
Path traversal protection
 ↓
stat()
 ↓
Content-Type
 ↓
createReadStream()
 ↓
pipe()
 ↓
response
```

With Express:

```js
app.use(express.static("public"));
```

Express handles much of that static-serving functionality.

Important lesson:

> **Framework abstractions are valuable only when the underlying behavior is understood.**

---

# 26 — Controller / Service Architecture

As the API grows, avoid putting all logic inside routes.

Instead:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Database
```

Example:

```text
products.routes.js
        ↓
products.controller.js
        ↓
products.service.js
        ↓
MySQL
```

Responsibilities:

### Route

Defines the endpoint.

### Controller

Handles HTTP concerns.

### Service

Handles business logic.

### Database layer

Handles persistence.

---

# 27 — Full-Stack Architecture

The upcoming architecture is:

```text
React
  │
  │ HTTP / JSON
  ▼
Express
  │
  ▼
Routes
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
MySQL
```

Response:

```text
MySQL
  ↓
Service
  ↓
Controller
  ↓
Express
  ↓
JSON
  ↓
React
```

---

# 28 — Security Mental Model

Every incoming request is untrusted.

Treat:

```text
req.params
req.query
req.body
req.headers
```

as untrusted input.

Security concerns include:

```text
Input validation
Authentication
Authorization
SQL injection
XSS
CORS
Rate limiting
Sensitive data exposure
Error information leakage
```

---

# 29 — Performance Mental Model

Avoid unnecessary work.

Important principles:

```text
Validate early
Query efficiently
Use pagination
Avoid unnecessary database calls
Avoid blocking operations
Stream large data when appropriate
Cache expensive operations when justified
```

Express itself is only one component of application performance.

---

# 30 — Debugging Mental Model

When an endpoint fails, trace the request:

```text
Client
 ↓
HTTP Method
 ↓
URL
 ↓
Middleware
 ↓
Router
 ↓
Controller
 ↓
Service
 ↓
Database
 ↓
Response
```

Ask:

1. Did the request reach the server?
2. Did middleware execute?
3. Did the route match?
4. Are params/query/body correct?
5. Did the controller execute?
6. Did business logic fail?
7. Did the database fail?
8. Was the response sent?
9. What status code was returned?

---

# 31 — Common Mistakes

## Forgetting `express.json()`

```js
app.post("/users", (req, res) => {
  console.log(req.body);
});
```

Without:

```js
app.use(express.json());
```

JSON request bodies may not be parsed into `req.body`.

---

## Forgetting `next()`

Middleware:

```js
app.use((req, res, next) => {
  console.log("Hello");
});
```

The request can hang because neither:

```js
next();
```

nor:

```js
res.send(...)
```

was called.

---

## Sending multiple responses

Incorrect:

```js
res.json(data);
res.json(otherData);
```

A request should normally produce one completed response.

---

# 32 — Core Mental Model

The most important Express model:

```text
REQUEST
   ↓
Middleware
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Data / External Systems
   ↓
Controller
   ↓
RESPONSE
```

And underneath everything:

```text
Express
   ↓
Node.js HTTP
   ↓
Node.js Runtime
   ↓
Operating System
```

---

# 33 — Learning Priority

## 🔴 MUST MASTER

```text
express()
app.listen()

Routing
HTTP methods

req.params
req.query
req.body

res.status()
res.send()
res.json()

Middleware
next()

Router
Error handling
REST APIs
```

## 🟡 SHOULD KNOW

```text
express.json()
express.static()

Custom middleware
Validation
Authentication concepts
CORS
Environment variables
```

## 🟢 NICE TO KNOW

```text
Advanced middleware patterns
Advanced framework internals
Package authoring
Complex Express ecosystems
```

---

# 34 — Final Engineering Goal

The goal is not:

> "I know Express."

The goal is:

> **"I can design and build an HTTP API with Express, understand its request lifecycle, debug it, secure it, connect it to MySQL, and expose it to a React frontend."**

Final architecture:

```text
                 React
                   │
                   │ HTTP / JSON
                   ▼
              Express API
                   │
                Router
                   │
              Controller
                   │
                Service
                   │
                MySQL
```

This is the bridge from Node.js fundamentals to full-stack engineering.
