# HTTP Server — Engineering Notes

> Module: 11 — HTTP Server  
> Architecture: Node.js Runtime Engineering Lab  
> Focus: Understand HTTP at the Node.js runtime level before introducing Express.

---

# 1. Core Mental Model

HTTP solves communication between clients and servers.

```text
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
````

The fundamental cycle is:

```text
REQUEST
   ↓
PROCESS
   ↓
RESPONSE
```

A server does not simply "return data."

It receives a structured request, interprets it, performs application logic, and produces a structured response.

---

# 2. HTTP Request

An HTTP request contains several important components:

```text
HTTP Request
│
├── Method
├── URL
├── Headers
└── Body
```

Example:

```http
GET /users?page=2 HTTP/1.1
Host: localhost:3000
Accept: application/json
```

Conceptually:

```text
Method:
GET

URL:
/users?page=2

Headers:
Host
Accept

Body:
None
```

The body is optional.

---

# 3. HTTP Response

An HTTP response contains:

```text
HTTP Response
│
├── Status Code
├── Headers
└── Body
```

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Hello"
}
```

Conceptually:

```text
Status:
200

Headers:
Content-Type: application/json

Body:
JSON
```

---

# 4. Node's Native HTTP Module

Node.js provides HTTP functionality through:

```js
import http from "node:http";
```

No third-party dependency is required.

This is important because Express ultimately operates above Node's HTTP capabilities.

Architecture:

```text
Express
   ↓
Node HTTP
   ↓
Operating System
   ↓
Network
```

---

# 5. Creating a Server

The fundamental API is:

```js
http.createServer()
```

Basic structure:

```js
const server = http.createServer((request, response) => {
  // Handle request
});
```

The callback executes when an HTTP request arrives.

Mental model:

```text
createServer()
      ↓
wait
      ↓
HTTP request arrives
      ↓
callback executes
```

---

# 6. Starting the Server

A server begins listening using:

```js
server.listen(3000);
```

The number:

```text
3000
```

is the TCP port.

Conceptually:

```text
Operating System
      │
      ├── Port 3000 → Node HTTP Server
      ├── Port 5432 → Database
      └── Other ports → Other services
```

A port allows multiple network services to coexist on the same machine.

---

# 7. Request Object

The first argument of the server callback represents the incoming request.

```js
http.createServer((request, response) => {
  // request
});
```

Common properties include:

```js
request.method
request.url
request.headers
```

For example:

```js
console.log(request.method);
console.log(request.url);
```

For:

```text
GET /users?page=2
```

the server can observe:

```text
GET
/users?page=2
```

---

# 8. Response Object

The second argument represents the server's response.

```js
http.createServer((request, response) => {
  // response
});
```

The server can configure the response:

```js
response.statusCode = 200;
```

Set headers:

```js
response.setHeader(
  "Content-Type",
  "text/plain",
);
```

Send the response:

```js
response.end("Hello from Node.js");
```

Mental model:

```text
response.statusCode
        ↓
response headers
        ↓
response body
        ↓
response.end()
```

---

# 9. `response.end()`

`response.end()` is extremely important.

It signals that the response is complete.

Example:

```js
response.end("Hello");
```

Conceptually:

```text
Server
  ↓
prepare response
  ↓
write response
  ↓
end response
  ↓
client receives completion
```

A server must eventually finish the response.

---

# 10. Request → Response Lifecycle

The complete basic lifecycle:

```text
Client
   │
   │ GET /
   ▼
Node HTTP Server
   │
   ▼
request handler
   │
   ├── inspect request
   ├── execute logic
   ├── prepare response
   └── end response
   │
   ▼
Client
```

This lifecycle is the foundation of Express.

---

# 11. HTTP Methods

Common HTTP methods:

```text
GET
POST
PUT
PATCH
DELETE
```

Typical meanings:

```text
GET
→ retrieve data

POST
→ create/submit data

PUT
→ replace a resource

PATCH
→ partially update a resource

DELETE
→ remove a resource
```

Example:

```text
GET /users
POST /users
GET /users/10
PATCH /users/10
DELETE /users/10
```

The method describes the intended operation.

---

# 12. URL

An HTTP request contains a URL.

Example:

```text
/users?page=2&limit=10
```

This contains:

```text
Path:
/users

Query:
page=2
limit=10
```

Node's URL API can parse this:

```js
const requestUrl = new URL(
  request.url,
  `http://${request.headers.host}`,
);
```

Then:

```js
requestUrl.pathname
```

and:

```js
requestUrl.searchParams
```

can be used.

---

# 13. URL + HTTP Connection

This connects the previous URL module to HTTP.

Architecture:

```text
HTTP Request
      ↓
request.url
      ↓
URL
      ↓
pathname + searchParams
```

Example:

```text
/users?page=2
```

becomes:

```text
pathname
/users

searchParams
page=2
```

---

# 14. Headers

Headers communicate metadata.

Example request headers:

```text
Host
Accept
Authorization
Content-Type
User-Agent
```

Example response header:

```js
response.setHeader(
  "Content-Type",
  "application/json",
);
```

Headers should be understood as metadata about the HTTP message.

---

# 15. Content-Type

`Content-Type` tells the receiver what type of data is being transferred.

Examples:

```text
text/plain
text/html
application/json
image/png
application/pdf
```

For a JSON response:

```js
response.setHeader(
  "Content-Type",
  "application/json",
);
```

---

# 16. Status Codes

Status codes communicate the result of a request.

```text
1xx
Informational

2xx
Success

3xx
Redirection

4xx
Client Error

5xx
Server Error
```

Important codes:

```text
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict

500 Internal Server Error
```

Example:

```js
response.statusCode = 404;
```

---

# 17. JSON Responses

A JSON API response can be produced with:

```js
const data = {
  message: "Hello",
};

response.setHeader(
  "Content-Type",
  "application/json",
);

response.end(
  JSON.stringify(data),
);
```

Important distinction:

```text
JavaScript Object
       ↓
JSON.stringify()
       ↓
JSON string
       ↓
HTTP response
```

HTTP does not automatically understand JavaScript objects.

---

# 18. Request Body

GET requests commonly don't contain meaningful request bodies.

POST, PUT, and PATCH commonly do.

Example:

```http
POST /users
Content-Type: application/json

{
  "name": "Tamirat"
}
```

The body does not arrive as one magical JavaScript object.

It arrives as data over the network.

---

# 19. HTTP Request Bodies Are Streams

This is one of the most important connections in Node.js.

Architecture:

```text
HTTP Request
      ↓
Readable Stream
      ↓
Chunks
      ↓
Buffers
      ↓
Application
```

A request body can therefore be processed progressively.

This is important for:

```text
file uploads
large JSON payloads
multipart data
streaming data
AI-related data processing
```

---

# 20. Buffers + HTTP

When raw data arrives without a text encoding, Node.js can represent chunks as:

```js
Buffer
```

Conceptually:

```text
Network
   ↓
Bytes
   ↓
Buffer
   ↓
Application
```

This connects:

```text
HTTP
 ↓
Streams
 ↓
Buffers
```

---

# 21. HTTP + File System

HTTP and `fs` frequently work together.

Example download architecture:

```text
Client
   │
   │ GET /file
   ▼
Node HTTP Server
   │
   ▼
File Read Stream
   │
   ▼
HTTP Response
   │
   ▼
Client
```

Upload architecture:

```text
Client
   │
   │ POST /upload
   ▼
HTTP Request Stream
   │
   ▼
File Write Stream
   │
   ▼
File System
```

This is why the previous `fs` and Streams modules matter.

---

# 22. Events + HTTP

Node's architecture is event-driven.

HTTP activity interacts with this architecture:

```text
Network activity
       ↓
Node.js runtime
       ↓
Events
       ↓
HTTP handling
       ↓
Application logic
```

The request/response lifecycle should therefore be understood as asynchronous event-driven I/O rather than a traditional blocking server model.

---

# 23. HTTP + Process

The `process` module becomes useful for server lifecycle management.

Example:

```js
process.on("SIGINT", () => {
  // graceful shutdown
});
```

Conceptually:

```text
Operating System
       ↓
SIGINT / SIGTERM
       ↓
Node process
       ↓
HTTP server
       ↓
server.close()
       ↓
shutdown
```

This becomes important in production deployments.

---

# 24. HTTP + Environment Variables

Server configuration should not be hard-coded unnecessarily.

Instead of:

```js
const PORT = 3000;
```

production applications commonly use:

```js
const PORT = process.env.PORT || 3000;
```

Architecture:

```text
Environment
     ↓
process.env
     ↓
Node application
     ↓
HTTP server
```

---

# 25. Basic Routing

Native Node HTTP does not provide Express-style routing automatically.

The application can inspect:

```js
request.method
request.url
```

and determine what operation should happen.

Conceptually:

```text
Request
   │
   ├── GET /
   │      ↓
   │    Home
   │
   ├── GET /users
   │      ↓
   │    Users
   │
   └── POST /users
          ↓
        Create User
```

Express later makes this much cleaner.

---

# 26. Why Express Exists

Native Node HTTP gives the fundamental capabilities.

However, manually handling:

```text
routing
middleware
validation
body parsing
authentication
errors
responses
```

becomes repetitive.

Express provides abstractions around these problems.

The relationship:

```text
Node HTTP
     ↓
low-level HTTP primitives
     ↓
Express
     ↓
higher-level backend framework
```

The goal is not to avoid Node HTTP.

The goal is to understand what Express abstracts.

---

# 27. Blocking vs Non-Blocking HTTP

A major production rule:

Avoid expensive synchronous operations inside HTTP request handlers.

Bad pattern:

```js
server.on(... => {
  const data = readFileSync(...);
});
```

A slow operation can block the JavaScript thread.

Better:

```text
HTTP Request
     ↓
async operation
     ↓
Node can continue handling other work
     ↓
operation completes
     ↓
response
```

This connects HTTP to the Event Loop.

---

# 28. Request Handler Mental Model

The request handler should be viewed as:

```text
Request
   ↓
Understand
   ↓
Validate
   ↓
Execute
   ↓
Respond
```

Not:

```text
Request
   ↓
random code
   ↓
send something
```

A production API should have deliberate control over every stage.

---

# 29. Error Handling

Errors can happen at several levels:

```text
Client input
     ↓
Validation error

Application logic
     ↓
Business error

Filesystem
     ↓
I/O error

Database
     ↓
Database error

Network
     ↓
Network error

Unexpected failure
     ↓
Server error
```

HTTP should translate appropriate application failures into meaningful status codes.

Example:

```text
Resource doesn't exist
        ↓
404 Not Found
```

Invalid input:

```text
Invalid client data
        ↓
400 Bad Request
```

Unexpected server failure:

```text
Unhandled application failure
        ↓
500 Internal Server Error
```

---

# 30. Security Mental Model

HTTP exposes an application to external input.

Therefore:

```text
Everything from the client
        ↓
UNTRUSTED
```

This includes:

```text
URL
query parameters
headers
body
cookies
authorization data
uploaded files
```

The server must validate and constrain incoming data.

---

# 31. Payload Limits

Large request bodies can consume significant resources.

Conceptually:

```text
Client
   ↓
Huge payload
   ↓
Server memory
   ↓
Resource exhaustion
```

Production systems therefore establish limits.

This becomes especially important when implementing:

```text
file uploads
AI APIs
JSON APIs
multipart requests
```

---

# 32. Graceful Shutdown

A production HTTP server should not simply terminate abruptly.

Conceptually:

```text
SIGTERM
   ↓
Stop accepting new work
   ↓
Allow existing work to finish
   ↓
Close resources
   ↓
Exit process
```

This becomes important when deploying with:

```text
Docker
Kubernetes
Cloud platforms
Process managers
CI/CD systems
```

---

# 33. Debugging Checklist

When an HTTP server does not behave correctly:

```text
1. Is the Node process running?

2. Is the expected port being used?

3. Is another process already using the port?

4. Did the request reach the server?

5. What is request.method?

6. What is request.url?

7. What are request.headers?

8. Was a response sent?

9. Was response.end() called?

10. What status code was returned?

11. What Content-Type was returned?

12. Did an asynchronous operation fail?

13. Did the request body finish arriving?
```

Useful tools:

```bash
curl
```

Browser DevTools:

```text
Network tab
```

Node debugging:

```bash
node --inspect
```

---

# 34. Useful Testing Commands

Basic GET:

```bash
curl http://localhost:3000
```

Show response headers:

```bash
curl -i http://localhost:3000
```

Specify HTTP method:

```bash
curl -X POST http://localhost:3000/users
```

Send JSON:

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Tamirat"}' \
  http://localhost:3000/users
```

These commands make HTTP behavior observable without depending only on a browser.

---

# 35. Important Mental Models

## Model 1 — Request/Response

```text
Request
   ↓
Server
   ↓
Response
```

## Model 2 — HTTP structure

```text
Request
├── method
├── URL
├── headers
└── body
```

```text
Response
├── status
├── headers
└── body
```

## Model 3 — Request body

```text
Network
   ↓
Stream
   ↓
Chunks
   ↓
Buffers
   ↓
Application
```

## Model 4 — Express

```text
Express
   ↓
Node HTTP
```

---

# 36. Current Learning Status

```text
[ ] HTTP mental model
[ ] node:http
[ ] createServer()
[ ] server.listen()
[ ] request object
[ ] response object
[ ] HTTP methods
[ ] URL
[ ] query parameters
[ ] headers
[ ] status codes
[ ] response bodies
[ ] JSON
[ ] request bodies
[ ] request streams
[ ] buffers
[ ] routing
[ ] error handling
[ ] graceful shutdown
[ ] production architecture
```

The checklist should be updated as each concept is mastered.

---

# 37. Mastery Standard

The module should not be considered complete merely because the developer can write:

```js
http.createServer(...)
```

The developer should be able to explain:

```text
Client
   ↓
HTTP request
   ↓
Operating System
   ↓
Node.js runtime
   ↓
HTTP server
   ↓
request object
   ↓
application logic
   ↓
response object
   ↓
HTTP response
   ↓
Client
```

and explain how:

```text
Events
Buffers
Streams
File System
Process
URL
```

participate in this lifecycle.

---

# 38. Architectural Principle

> HTTP should be understood as a protocol and runtime interaction before it is treated as a framework feature.

Understanding native Node.js HTTP makes Express easier to understand, easier to debug, and easier to use correctly.

---

# 39. Final Connection

The current Node.js architecture is:

```text
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

The next major objective is to understand how a Node.js process becomes a network service.

The key question for this module is:

> How does a Node.js process receive a request from a client, process it asynchronously, and produce a correct HTTP response?
