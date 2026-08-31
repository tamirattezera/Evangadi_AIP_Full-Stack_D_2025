# Phase 13 — Express.js

> **From Node.js HTTP primitives to structured, production-oriented web applications**

---

## Overview

This phase focuses on mastering **Express.js** as a web framework built on top of Node.js HTTP capabilities.

The objective is not to memorize Express APIs.

The objective is to understand:

- What Express abstracts from `node:http`
- Why those abstractions exist
- How requests flow through an Express application
- How routing and middleware work
- How request data reaches application logic
- How responses are constructed
- How errors propagate
- How to structure a maintainable REST API
- How Express connects to databases and frontend applications

The phase builds directly on the previous **Node.js HTTP Server** phase.

```text
Node.js Runtime
      ↓
node:http
      ↓
IncomingMessage / ServerResponse
      ↓
Express.js
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
```

---

# Learning Philosophy

The phase follows an engineering-first learning loop:

```text
CONCEPT
   ↓
WHY
   ↓
INTERNAL FLOW
   ↓
TINY EXAMPLE
   ↓
IMPLEMENT
   ↓
DEBUG
   ↓
BREAK
   ↓
SECURE
   ↓
OPTIMIZE
   ↓
EXPLAIN
   ↓
EXTEND
```

The goal is to develop the ability to **design, build, debug, secure, and explain** Express applications.

---

# Why Express?

A raw Node.js HTTP server requires developers to manually handle many HTTP concerns.

For example:

```js
if (req.method === "GET" && req.url === "/users") {
  // ...
}
```

As an application grows, manually implementing routing, middleware, request parsing, error handling, and response logic becomes difficult to maintain.

Express provides a higher-level application layer:

```js
app.get("/users", (req, res) => {
  // ...
});
```

The important mental model is:

> **Express does not replace Node.js HTTP. It provides a structured abstraction over Node's HTTP capabilities.**

---

# Core Architecture

```text
                    CLIENT
                      │
                      │ HTTP Request
                      ▼
              ┌─────────────────┐
              │   Node.js HTTP  │
              └────────┬────────┘
                       │
                       ▼
              IncomingMessage
                    (req)
                       │
                       ▼
              ┌─────────────────┐
              │    Express      │
              │   Application   │
              └────────┬────────┘
                       │
                       ▼
                  Middleware
                       │
                       ▼
                    Router
                       │
                       ▼
                  Controller
                       │
                       ▼
                   Service
                       │
                       ▼
                  Database
                       │
                       ▼
                  Controller
                       │
                       ▼
                ServerResponse
                    (res)
                       │
                       ▼
                    CLIENT
```

---

# HTTP Request Flow

A typical request follows this conceptual pipeline:

```text
Browser
   ↓
HTTP Request
   ↓
Node.js HTTP Server
   ↓
IncomingMessage
   ↓
Express Application
   ↓
Middleware
   ↓
Route Matching
   ↓
Route Handler / Controller
   ↓
Business Logic
   ↓
Database / External Service
   ↓
Response
   ↓
ServerResponse
   ↓
Browser
```

---

# Project Structure

```text
13-express/
│
├── README.md
├── notes.md
│
├── examples/
│   ├── 01-basic-app.js
│   ├── 02-request-response.js
│   ├── 03-http-methods.js
│   ├── 04-route-params.js
│   ├── 05-query-params.js
│   ├── 06-json-response.js
│   ├── 07-json-body.js
│   ├── 08-middleware.js
│   ├── 09-router.js
│   ├── 10-error-handling.js
│   └── 11-static-files.js
│
├── exercises/
│
└── project/
```

The examples progressively introduce individual Express concepts before combining them into a complete API.

---

# Learning Roadmap

## Stage 1 — Basic Express Application

### Topics

- Installing Express
- `express()`
- `app.listen()`
- First route
- Request/response lifecycle

### Objective

Understand how Express creates an application on top of Node.js HTTP.

```text
express()
   ↓
Application
   ↓
app.listen()
   ↓
HTTP Server
```

---

# Stage 2 — Request & Response

### Topics

```text
req
res
req.method
req.url
res.status()
res.send()
res.json()
res.set()
```

### Objective

Understand how Express exposes HTTP request and response functionality through a simpler API.

---

# Stage 3 — HTTP Methods

Practice:

```text
GET
POST
PUT
PATCH
DELETE
```

Example:

```text
GET    /products
GET    /products/:id
POST   /products
PATCH  /products/:id
DELETE /products/:id
```

### Objective

Understand how HTTP methods communicate the intended operation.

---

# Stage 4 — Route Parameters

Example:

```text
GET /products/42
```

Express:

```js
app.get("/products/:id", (req, res) => {
  console.log(req.params.id);
});
```

Mental model:

```text
/products/:id
       ↓
Route pattern
       ↓
/products/42
       ↓
req.params.id
       ↓
"42"
```

---

# Stage 5 — Query Parameters

Example:

```text
GET /products?category=laptop&limit=10
```

Access:

```js
req.query.category;
req.query.limit;
```

### Objective

Understand the difference between:

```text
Route parameters
        vs
Query parameters
```

---

# Stage 6 — JSON Responses

Practice:

```js
res.json({
  message: "Success",
});
```

Understand:

```text
JavaScript Object
       ↓
JSON serialization
       ↓
HTTP response
       ↓
Content-Type: application/json
       ↓
Client
```

---

# Stage 7 — Request Body

Practice:

```js
express.json();
```

Then:

```js
req.body;
```

Example:

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

Mental model:

```text
HTTP Request
      ↓
Request Body Stream
      ↓
Express JSON Middleware
      ↓
JSON Parsing
      ↓
req.body
      ↓
Application Logic
```

This connects directly to the raw `req.on("data")` and `req.on("end")` work from the Node.js HTTP phase.

---

# Stage 8 — Middleware

Middleware is one of the most important Express concepts.

Basic model:

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

Practice:

```js
app.use(...)
```

and:

```js
(req, res, next) => {
  next();
};
```

Understand:

- Why middleware exists
- What `next()` does
- Middleware ordering
- Request middleware
- Response middleware
- Authentication middleware
- Logging middleware
- Validation middleware

---

# Stage 9 — Router

Move from:

```text
app.get(...)
app.post(...)
app.patch(...)
app.delete(...)
```

to modular routing:

```text
routes/
├── users.routes.js
├── products.routes.js
└── orders.routes.js
```

Mental model:

```text
Application
    ↓
Router
    ├── /users
    ├── /products
    └── /orders
```

---

# Stage 10 — Error Handling

Understand:

```text
404
400
401
403
404
409
500
```

and Express error middleware.

Conceptual flow:

```text
Request
   ↓
Middleware
   ↓
Controller
   ↓
Error
   ↓
Error Middleware
   ↓
HTTP Response
```

Objective:

> Errors should be controlled application states, not uncontrolled crashes.

---

# Stage 11 — Static Files

Connect Express to the previous Node.js static-file-server work.

Understand:

```text
express.static()
```

and compare:

```text
Manual Node.js Static Server
          ↓
fs.stat()
createReadStream()
path.resolve()
Content-Type
res
```

with:

```text
Express
   ↓
express.static()
```

The objective is to understand **what Express abstracts away**.

---

# 🔴 MUST MASTER

These concepts form the core Express skill set:

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
404 handling

REST API design
```

---

# 🟡 SHOULD KNOW

```text
express.json()
express.urlencoded()

express.static()

Custom middleware

Request logging

Validation middleware

Authentication middleware

CORS concepts

Environment configuration
```

---

# 🟢 NICE TO KNOW

```text
Advanced middleware composition

Custom framework abstractions

Advanced Express internals

Package authoring

Complex middleware ecosystems
```

These topics should not distract from the core full-stack path.

---

# ⚫ LEGACY / LOW PRIORITY

Avoid spending significant learning time on outdated Express patterns simply because they appear in old tutorials.

Prefer modern JavaScript and ES module syntax:

```js
import express from "express";
```

instead of automatically adopting older CommonJS examples:

```js
const express = require("express");
```

---

# REST API Architecture

The final direction of this phase is:

```text
HTTP Request
      ↓
Express
      ↓
Middleware
      ↓
Router
      ↓
Controller
      ↓
Service
      ↓
Database Layer
      ↓
MySQL
```

For example:

```text
POST /api/products
       ↓
productsRouter
       ↓
createProductController
       ↓
productService
       ↓
MySQL
       ↓
JSON Response
```

---

# Initial Express Project

The first project should intentionally remain simple.

### Product API

```text
GET    /api/products
GET    /api/products/:id

POST   /api/products

PATCH  /api/products/:id

DELETE /api/products/:id
```

Initially:

```text
Express
   ↓
In-memory data
```

Later:

```text
Express
   ↓
Service
   ↓
MySQL
```

This separation allows Express concepts to be mastered before introducing database complexity.

---

# Connection to Previous Node.js Knowledge

This phase should continuously connect Express abstractions to the Node.js runtime.

| Express            | Underlying Concept                |
| ------------------ | --------------------------------- |
| `req`              | `IncomingMessage`                 |
| `res`              | `ServerResponse`                  |
| `app.get()`        | HTTP method + routing             |
| `req.body`         | Request body stream + parsing     |
| `res.json()`       | HTTP headers + JSON serialization |
| Middleware         | Request processing pipeline       |
| `express.static()` | Filesystem + streams              |
| `app.listen()`     | Node HTTP server                  |
| Error middleware   | Controlled request lifecycle      |

The goal is to understand both layers:

```text
Express API
     ↓
Node.js HTTP
     ↓
Node.js Runtime
     ↓
Operating System
```

---

# 80/20 Full-Stack Connection

Express is not an isolated technology.

It is the backend layer of the upcoming full-stack architecture:

```text
                 React
                   │
                   │ HTTP / JSON
                   ▼
              Express API
                   │
                   ▼
             Business Logic
                   │
                   ▼
                 MySQL
```

Therefore, Express mastery should prioritize the concepts that will directly support:

- REST APIs
- React communication
- Database integration
- Authentication
- Validation
- Error handling
- Production project architecture

---

# Final Phase Objective

At the end of this phase, the developer should be able to start with an empty directory and build a structured Express REST API without blindly following a tutorial.

The developer should be able to explain:

```text
How does a request enter Node.js?

How does Express receive it?

How does middleware process it?

How does Express select a route?

How do params/query/body reach the handler?

Where should business logic live?

How is data returned as JSON?

How are errors handled?

How will this API connect to MySQL?

How will React consume this API?
```

The ultimate goal is:

> **Move from understanding Node.js HTTP primitives to designing maintainable backend systems with Express.**

---

# Next Phase

After Express:

```text
Node.js
   ↓
HTTP
   ↓
npm
   ↓
Express
   ↓
MySQL
   ↓
React
   ↓
Full-Stack Projects
   ↓
AI-Powered Applications
```

Express is therefore the **bridge between Node.js runtime knowledge and real full-stack application development**.
