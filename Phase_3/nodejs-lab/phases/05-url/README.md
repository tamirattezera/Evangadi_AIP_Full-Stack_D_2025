# Phase 05 — Node.js URL Module

## Overview

The `URL` module provides the standard tools for creating, parsing, inspecting, modifying, and resolving URLs in Node.js applications.

For an AI-powered Full-Stack Engineer and Product Systems Architect, URL handling is not merely a syntax topic. URLs form a fundamental boundary between applications, APIs, services, authentication systems, files, web resources, and external platforms.

This phase focuses on understanding URL structure and URL manipulation using Node.js's modern WHATWG `URL` API and related utilities.

The goal is not to memorize methods.

The goal is to develop the ability to reason about a URL as a structured resource and transform it safely inside real applications.

---

# 1. Why This Phase Matters

Modern backend systems constantly work with URLs.

A single application may need to handle:

- API endpoints
- REST resources
- query parameters
- search filters
- pagination
- authentication callbacks
- OAuth redirect URLs
- webhook endpoints
- external AI APIs
- image-generation services
- cloud-storage URLs
- file URLs
- CDN resources
- tracking parameters
- encoded user input

For example:

```text
https://api.example.com/users/963?role=engineer&active=true
```

A backend application may need to determine:

```text
Protocol
    ↓
https

Hostname
    ↓
api.example.com

Path
    ↓
/users/963

Query Parameters
    ↓
role=engineer
active=true
```

The URL API provides a structured way to work with these components instead of manipulating URL strings manually.

---

# 2. Architectural Position

The `05-url` phase follows the runtime and system modules already studied.

```text
Node.js Built-in Modules
│
├── 01-modules
│   └── Module architecture and code organization
│
├── 02-path
│   └── Filesystem path manipulation
│
├── 03-os
│   └── Operating-system information
│
├── 04-process
│   └── Runtime and process information
│
└── 05-url
    └── Web/resource address manipulation
```

The responsibility of each module remains separate.

| Module    | Responsibility                    |
| --------- | --------------------------------- |
| `path`    | Filesystem paths                  |
| `os`      | Operating-system information      |
| `process` | Running-process information       |
| `url`     | URL/resource-address manipulation |

This separation prevents unrelated concepts from being mixed together.

---

# 3. Learning Objectives

By completing this phase, the learner should be able to:

- Understand the structure of a URL.
- Use the WHATWG `URL` class.
- Parse URLs safely.
- Access individual URL components.
- Modify URL components.
- Work with query parameters.
- Use `URLSearchParams`.
- Add and remove query parameters.
- Detect existing query parameters.
- Encode URL components correctly.
- Understand URL resolution.
- Work with relative and absolute URLs.
- Convert filesystem paths into file URLs when appropriate.
- Convert file URLs back into filesystem paths.
- Understand the relationship between `URL` and `path`.
- Avoid fragile manual URL string manipulation.
- Build reusable URL-processing utilities.
- Apply URL concepts to API and backend architectures.

---

# 4. Core Concepts

## 4.1 URL Structure

A URL can contain several components:

```text
https://api.example.com:443/users/963?role=engineer#profile
│      │               │   │          │              │
│      │               │   │          │              └── hash
│      │               │   │          └── query
│      │               │   └── pathname
│      │               └── port
│      └── hostname
└── protocol
```

The phase will progressively decompose these components.

---

## 4.2 The WHATWG URL API

Modern Node.js applications should primarily use the standard `URL` API:

```javascript
const url = new URL("https://example.com/products?id=963");
```

This creates a structured URL object.

Instead of treating the URL as an ordinary string, the application can work with individual properties.

---

## 4.3 URL Components

Important properties include:

```javascript
url.protocol;
url.hostname;
url.port;
url.host;
url.pathname;
url.search;
url.hash;
url.origin;
url.href;
```

Understanding these properties is essential before moving into more advanced URL processing.

---

# 5. URLSearchParams

Query parameters are one of the most important parts of modern APIs.

Example:

```text
/products?category=ai&page=2&limit=20
```

Node.js provides:

```javascript
url.searchParams;
```

which exposes a structured interface for manipulating query parameters.

Important operations include:

```javascript
searchParams.get();
searchParams.set();
searchParams.append();
searchParams.delete();
searchParams.has();
searchParams.keys();
searchParams.values();
searchParams.entries();
```

This is significantly safer and clearer than manually splitting strings.

---

# 6. URL Encoding

URLs cannot safely contain arbitrary characters in raw form.

For example:

```text
hello world
```

contains a space.

URL encoding represents special characters safely so they can travel through URLs.

This becomes particularly important when handling:

- search terms
- user-generated content
- API parameters
- filenames
- AI prompts
- redirect URLs

The phase will distinguish between:

```text
URL construction
URL encoding
Query parameter encoding
```

rather than treating them as the same problem.

---

# 7. URL Resolution

Applications frequently combine relative and absolute URLs.

Example:

```text
Base:
https://example.com/api/

Relative:
users/963
```

Result:

```text
https://example.com/api/users/963
```

The `URL` API provides standard URL resolution behavior without requiring manual string concatenation.

---

# 8. URL and Filesystem Integration

Node.js applications sometimes need to bridge:

```text
Web Resource
        ↕
Filesystem Resource
```

For example:

```text
file:///home/user/project/config.json
```

The URL API can represent this as a `file:` URL.

The `path` module, however, remains responsible for filesystem path manipulation.

This distinction is important:

```text
URL
 ↓
Represents a resource location

path
 ↓
Manipulates filesystem paths
```

Neither module should replace the other.

---

# 9. Project Architecture

The phase follows the established Node.js lab architecture:

```text
05-url/
│
├── README.md
│
├── examples/
│   ├── 01-url-basics.js
│   ├── 02-url-components.js
│   ├── 03-url-properties.js
│   ├── 04-search-params.js
│   ├── 05-query-manipulation.js
│   ├── 06-url-construction.js
│   ├── 07-url-encoding.js
│   ├── 08-url-resolution.js
│   └── 09-file-url.js
│
├── exercises/
│   ├── 01-url-parser.js
│   ├── 02-query-manager.js
│   ├── 03-api-url-builder.js
│   └── 04-url-router.js
│
└── notes.md
```

The exact filenames may evolve as the lessons progress, but the separation of concerns should remain.

---

# 10. Separation of Concerns

The phase follows a strict responsibility model.

## Examples

The `examples/` directory contains isolated demonstrations of individual concepts.

```text
examples/
```

Examples answer:

> "How does this Node.js URL feature work?"

They should remain small, focused, and readable.

---

## Exercises

The `exercises/` directory combines concepts into realistic problems.

```text
exercises/
```

Exercises answer:

> "Can I use this feature to solve an application problem?"

They should require reasoning rather than simple copying.

---

## Notes

The `notes.md` file contains personal technical understanding.

```text
notes.md
```

It should capture:

- mental models
- important API behavior
- mistakes
- discoveries
- architecture insights
- interview-level explanations
- practical lessons

It should not duplicate the README.

---

# 11. What This Phase Does NOT Cover

To avoid duplication with later phases, this phase will not deeply implement:

### HTTP servers

Handled later by:

```text
11-http-server
```

### Express routing

Handled later by:

```text
13-express
```

### REST API architecture

Handled later by:

```text
14-rest-api
```

### Authentication

Handled later by:

```text
16-authentication
```

### Filesystem operations

Handled primarily by:

```text
07-file-system
```

### Buffers and binary data

Handled later by:

```text
09-buffers
```

The URL phase provides the URL knowledge those systems will eventually depend on.

---

# 12. Connection to Future Projects

The knowledge from this phase will directly support later projects.

## Static Server

```text
06-static-server
```

URL paths will need to be mapped to filesystem resources.

---

## Blog API

```text
07-blog-api
```

URLs and query parameters will represent resources and filters.

Example:

```text
/api/posts?page=2&limit=10
```

---

## Task Manager API

```text
08-task-manager-api
```

Query parameters can represent:

```text
/status
?page=2
&completed=true
```

---

## AI Assistant API

```text
09-ai-assistant-api
```

External AI services, callback URLs, resource URLs, and query parameters all depend on reliable URL handling.

---

# 13. AI Engineering Relevance

URL handling becomes especially important when AI systems interact with external resources.

Consider an AI-powered system processing:

```text
User Request
      ↓
Backend API
      ↓
AI Service
      ↓
External Resource
      ↓
Generated Result
```

Resources may be represented by URLs:

```text
Image URL
Document URL
Webhook URL
API endpoint
Cloud storage URL
Callback URL
```

A small URL-handling mistake can cause:

- incorrect API requests
- broken redirects
- malformed query parameters
- incorrect resource retrieval
- security vulnerabilities
- unexpected production behavior

Therefore, URL handling should be treated as infrastructure knowledge rather than merely another Node.js API.

---

# 14. Engineering Principles

This phase emphasizes several engineering principles.

### Prefer structured APIs

Prefer:

```javascript
const url = new URL(input);
```

over fragile string manipulation.

---

### Validate boundaries

External URLs should be treated as untrusted input.

Do not assume that every URL is valid or safe.

---

### Separate representation from business logic

URL parsing should happen at the appropriate boundary.

Business logic should receive structured information rather than repeatedly parsing raw strings.

---

### Avoid unnecessary duplication

If a URL utility belongs to URL processing, keep it within the URL responsibility boundary.

Do not mix URL parsing with:

- filesystem logic
- database logic
- authentication logic
- HTTP server logic

unless an exercise specifically requires integration.

---

# 15. Recommended Learning Method

Each lesson follows the same workflow:

```text
1. Understand the concept
        ↓
2. Read the API behavior
        ↓
3. Implement a small example
        ↓
4. Run the example
        ↓
5. Observe the output
        ↓
6. Modify the example
        ↓
7. Explain the behavior
        ↓
8. Complete an exercise
        ↓
9. Record the lesson in notes.md
```

The goal is active mastery rather than passive code consumption.

---

# 16. Mastery Criteria

The phase is considered complete when the learner can confidently explain and implement:

```text
URL
├── protocol
├── hostname
├── port
├── host
├── pathname
├── search
├── hash
├── origin
└── href
```

and:

```text
URLSearchParams
├── get()
├── set()
├── append()
├── delete()
├── has()
├── keys()
├── values()
└── entries()
```

The learner should also understand:

```text
URL
  ≠
filesystem path
```

and know when to use:

```text
URL
path
process
```

independently or together.

---

# 17. Phase Outcome

By the end of Phase 05, the learner should no longer think of URLs as strings such as:

```text
"https://example.com/api/users?id=963"
```

Instead, the URL should be understood as a structured resource representation:

```text
Protocol
    ↓
Hostname
    ↓
Port
    ↓
Path
    ↓
Query Parameters
    ↓
Fragment
```

This mental model becomes foundational for the HTTP, Express, REST API, authentication, and AI-service phases that follow.

---

# 18. Next Step

Begin with:

```text
Lesson 1 — URL Fundamentals
```

The first lesson will focus on the modern WHATWG `URL` API and establish the mental model that the remaining lessons build upon.

The objective is simple:

> **Do not memorize URL methods. Learn to see the structure inside a URL.**
