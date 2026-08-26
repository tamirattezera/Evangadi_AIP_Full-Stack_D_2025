# 11 — HTTP Server

## Node.js Runtime Architecture Lab

![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![HTTP](https://img.shields.io/badge/HTTP-Deep%20Dive-005571?style=for-the-badge&logo=http&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2025-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-In%20Progress-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> Deep mastery of Node.js HTTP — from HTTP fundamentals and TCP networking to streams, performance, security, and production engineering.

The HTTP Server module explores how Node.js applications communicate over HTTP without relying on frameworks such as Express.

The module focuses on understanding the native `node:http` API, the HTTP request/response lifecycle, network communication, streams, event-driven execution, and the architectural foundations upon which Express and modern backend APIs are built.

---

## Architecture Position

This module belongs to the following Node.js runtime learning architecture:

```
Runtime
   ↓
Modules
   ↓
Path
   ↓
OS
   ↓
Process
   ↓
URL
   ↓
Crypto
   ↓
File System
   ↓
Events
   ↓
Buffers
   ↓
Streams
   ↓
HTTP Server
   ↓
npm
   ↓
Express
```

````

HTTP Server represents the transition from Node.js runtime fundamentals into backend and API engineering.

---

# 1. Module Objective

The objective of this module is to understand how Node.js receives HTTP requests and produces HTTP responses using the native `node:http` module.

The focus is on understanding the underlying system rather than memorizing framework syntax.

By completing this module, the developer should understand:

- what HTTP solves
- how an HTTP request is structured
- how an HTTP response is structured
- how Node.js creates an HTTP server
- how a server listens on a network port
- how request and response objects work
- how HTTP methods are represented
- how URLs and query parameters are handled
- how HTTP headers work
- how status codes communicate results
- how response bodies are produced
- how JSON APIs are implemented
- how HTTP request bodies are received
- why request bodies are streams
- how buffers participate in HTTP communication
- how basic routing can be implemented without Express
- how errors are handled
- how a Node.js server shuts down gracefully
- how HTTP connects to Events, Streams, Buffers, OS, and Process
- how Express is built on top of Node's HTTP capabilities

---

# 2. Core Mental Model

The fundamental HTTP model is:

```
Client
   │
   │ HTTP Request
   ▼
Node.js HTTP Server
   │
   │ Application Logic
   ▼
HTTP Response
   │
   ▼
Client
```
---

A request contains information such as:

```
HTTP Request
│
├── Method
├── URL
├── Headers
└── Body
```

A response contains:

```
HTTP Response
│
├── Status Code
├── Headers
└── Body
```

The developer's responsibility is to understand how these components move through the Node.js runtime.

---

# 3. Primary Node.js API

The core module for this phase is:

```javascript
import http from "node:http";
```

The most important API is:

```javascript
http.createServer();
```

A server can then begin listening for network connections using:

```javascript
server.listen();
```

The basic lifecycle is:

```
http.createServer()
        ↓
request arrives
        ↓
request handler executes
        ↓
application processes request
        ↓
response is generated
        ↓
response.end()
        ↓
client receives response
```

---

# 4. Learning Progression

The module follows the progression:

```
CONCEPT
   ↓
API
   ↓
REQUEST
   ↓
RESPONSE
   ↓
METHODS
   ↓
URL
   ↓
QUERY PARAMETERS
   ↓
HEADERS
   ↓
STATUS CODES
   ↓
BODY
   ↓
JSON
   ↓
REQUEST BODY
   ↓
STREAMS
   ↓
ROUTING
   ↓
ERROR HANDLING
   ↓
GRACEFUL SHUTDOWN
   ↓
ARCHITECTURAL CONNECTION
```

---

# 5. Planned Topics

## 11.1 — HTTP Mental Model

Understanding:

- client
- server
- request
- response
- HTTP protocol
- network communication

---

## 11.2 — `node:http`

Understanding the native Node.js HTTP module.

```javascript
import http from "node:http";
```

---

## 11.3 — `createServer()`

Understanding:

```javascript
http.createServer();
```

and how Node invokes the request handler when an HTTP request arrives.

---

## 11.4 — Request Object

Understanding:

```javascript
request.method;
request.url;
```

and other request properties.

---

## 11.5 — Response Object

Understanding:

```javascript
response.statusCode;
response.setHeader();
response.write();
response.end();
```

---

## 11.6 — HTTP Methods

Understanding common HTTP methods:

```
GET
POST
PUT
PATCH
DELETE
```

and the purpose of each.

---

## 11.7 — URLs and Query Parameters

Understanding URLs such as:

```
/users?page=2&limit=10
```

and connecting the HTTP layer to the Node.js `URL` module.

---

## 11.8 — HTTP Headers

Understanding:

```
Content-Type
Content-Length
Authorization
Accept
Cache-Control
```

and how headers communicate metadata between clients and servers.

---

## 11.9 — Status Codes

Understanding categories:

```
1xx → Informational

2xx → Success

3xx → Redirection

4xx → Client Error

5xx → Server Error
```

Common examples:

```
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found

500 Internal Server Error
```

---

## 11.10 — Response Bodies

Understanding how Node sends:

```
text
HTML
JSON
binary data
```

to clients.

---

## 11.11 — JSON APIs

Understanding how a Node HTTP server produces API responses:

```json
{
  "message": "Hello from Node.js"
}
```

and correctly communicates:

```
Content-Type: application/json
```

---

## 11.12 — Request Bodies

Understanding how data sent by clients reaches Node.js.

Examples:

```
POST
PUT
PATCH
```

The request body will be connected directly to the Stream and Buffer modules.

---

## 11.13 — Request Streams

Understanding the relationship:

```
HTTP Request
      ↓
Readable Stream
      ↓
Buffer Chunks
      ↓
Application
```

This is particularly important for:

- file uploads
- large payloads
- streaming data
- APIs
- AI applications

---

## 11.14 — Basic Routing

Understanding how a native Node.js server can distinguish:

```
GET /
GET /users
GET /products
POST /users
DELETE /users/1
```

before introducing Express.

---

## 11.15 — Error Handling

Understanding:

- invalid requests
- unsupported routes
- malformed data
- server errors
- network errors
- error status codes

---

## 11.16 — Graceful Shutdown

Understanding how a Node.js server can respond to operating-system signals and shut down safely.

The concepts include:

```
process
   ↓
SIGINT
   ↓
server.close()
   ↓
graceful shutdown
```

This connects HTTP directly to the previously studied `process` module.

---

# 6. HTTP and the Node.js Runtime

HTTP does not exist independently from the Node.js runtime.

The architecture can be viewed as:

```
Client
   │
   │ Network
   ▼
Operating System
   │
   ▼
Node.js
   │
   ▼
HTTP Server
   │
   ▼
Request / Response
   │
   ▼
Application Logic
```

Node.js uses asynchronous I/O and the event-driven architecture to handle network activity without requiring a new blocking execution thread for every request.

---

# 7. Connection to Events

Node.js HTTP servers are event-driven.

Conceptually:

```
HTTP activity
      ↓
Events
      ↓
Callbacks / handlers
      ↓
Application logic
```

This connects directly to the Events module:

```
Events
   ↓
HTTP
```

---

# 8. Connection to Buffers

HTTP data can contain binary information.

Examples include:

```
images
videos
PDFs
audio
uploaded files
compressed data
```

Node.js represents raw binary data using:

```javascript
Buffer;
```

The relationship becomes:

```
HTTP
 ↓
Stream
 ↓
Buffer
 ↓
Application
```

---

# 9. Connection to Streams

HTTP request and response objects behave as streams.

Conceptually:

```
HTTP Request
      ↓
Readable Stream
      ↓
Chunks
      ↓
Buffers
```

and:

```
Application
      ↓
Writable HTTP Response
      ↓
Network
      ↓
Client
```

This becomes essential for high-performance applications and large payloads.

---

# 10. Connection to File System

HTTP and `fs` frequently work together.

For example:

```
Client
   │
   │ GET /image
   ▼
HTTP Server
   │
   ▼
File Stream
   │
   ▼
Image
   │
   ▼
HTTP Response
   │
   ▼
Client
```

File uploads reverse the direction:

```
Client
   │
   │ HTTP upload
   ▼
HTTP Request Stream
   │
   ▼
File Stream
   │
   ▼
File System
```

---

# 11. Connection to Process

The `process` module becomes important for server configuration and lifecycle management.

Examples include:

```
process.env
process.argv
process.on()
```

A production server may use:

```
Environment Variables
        ↓
process.env
        ↓
Server Configuration
```

Graceful shutdown can use:

```
process
   ↓
SIGINT / SIGTERM
   ↓
HTTP Server
   ↓
Graceful Shutdown
```

---

# 12. Connection to URL

HTTP requests contain URLs.

Node's `URL` API can parse:

```
/users?page=2&limit=20
```

into structured information:

```
pathname
searchParams
protocol
host
port
```

This connects the earlier URL module directly to HTTP.

---

# 13. Connection to Express

Express will be introduced only after the native HTTP model is understood.

The architectural relationship is:

```
Express
   ↓
Node.js HTTP
   ↓
Network
```

Express simplifies common backend tasks such as:

```
routing
middleware
request parsing
response helpers
error handling
```

The purpose of learning native HTTP first is to understand what Express is actually abstracting.

---

# 14. Production Engineering Principles

The module emphasizes:

### 1. Non-blocking I/O

HTTP servers should avoid unnecessary synchronous operations inside request handlers.

Avoid:

```javascript
readFileSync();
```

for request-time operations when asynchronous alternatives are appropriate.

---

### 2. Input Validation

Client input must never automatically be considered trustworthy.

```
HTTP Request
     ↓
Validation
     ↓
Application Logic
```

---

### 3. Correct Status Codes

Responses should communicate meaningful outcomes.

```
Success → 2xx
Client problem → 4xx
Server problem → 5xx
```

---

### 4. Correct Content Types

The server should explicitly communicate the format of response data.

Example:

```
Content-Type: application/json
```

---

### 5. Resource Management

Servers must properly manage:

```
streams
files
connections
memory
shutdown
```

---

### 6. Security

HTTP applications must consider:

```
input validation
payload limits
authentication
authorization
headers
sensitive information
```

Security will become more important when Express and authentication are introduced.

---

# 15. Directory Structure

The module follows the standard Node.js runtime lab structure:

```
11-http-server/
│
├── README.md
│
├── examples/
│   ├── 01-basic-server.js
│   ├── 02-request-response.js
│   ├── 03-http-methods.js
│   ├── 04-url-query.js
│   ├── 05-headers.js
│   ├── 06-status-codes.js
│   ├── 07-json-response.js
│   ├── 08-request-body.js
│   ├── 09-routing.js
│   ├── 10-error-handling.js
│   └── 11-graceful-shutdown.js
│
├── exercises/
│
├── resources/
│
└── notes.md
```

The exact files may evolve as the module progresses.

---

# 16. Engineering Goal

The goal is not to become an expert in building HTTP servers without frameworks.

The goal is to understand the underlying architecture well enough that frameworks become easier to reason about.

The desired progression is:

```
Node Runtime
     ↓
Native HTTP
     ↓
Understand Request
     ↓
Understand Response
     ↓
Understand Streams
     ↓
Understand Routing
     ↓
Understand Middleware Conceptually
     ↓
Express
     ↓
Production APIs
```

---

# 17. Final Architecture

After completing this module, the developer should be able to reason about a request using the following model:

```
                 CLIENT
                    │
                    │ HTTP Request
                    ▼
            ┌─────────────────┐
            │  Node.js HTTP   │
            │     Server      │
            └────────┬────────┘
                     │
              Request Object
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
        Method       URL      Headers
                     │
                     ▼
              Request Body
                     │
                  Stream
                     │
                  Buffers
                     │
                     ▼
             Application Logic
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Database      fs        AI APIs
                     │
                     ▼
              Response Object
                     │
             Status + Headers
                     │
                     ▼
               Response Body
                     │
                     ▼
                  CLIENT
```

---

# 18. Definition of Done

The HTTP Server module is considered complete when the developer can:

- [ ] Explain HTTP request/response architecture
- [ ] Create a native Node.js HTTP server
- [ ] Explain `http.createServer()`
- [ ] Explain `request`
- [ ] Explain `response`
- [ ] Read HTTP methods
- [ ] Read request URLs
- [ ] Parse query parameters
- [ ] Set response headers
- [ ] Use appropriate status codes
- [ ] Return text responses
- [ ] Return JSON responses
- [ ] Receive request bodies
- [ ] Understand request bodies as streams
- [ ] Work with Buffer data
- [ ] Implement basic routing
- [ ] Handle common HTTP errors
- [ ] Handle server errors
- [ ] Implement graceful shutdown
- [ ] Explain how HTTP connects to Events
- [ ] Explain how HTTP connects to Buffers
- [ ] Explain how HTTP connects to Streams
- [ ] Explain how HTTP connects to `fs`
- [ ] Explain how HTTP connects to `process`
- [ ] Explain why Express is an abstraction over lower-level Node.js capabilities

---

## Core Principle

> **Understand the protocol before learning the framework.**

The developer should understand what Node.js is doing underneath Express before depending on Express to do it automatically.

```
````
