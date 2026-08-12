# Phase 05 — URL Module Notes

## 1. Core Mental Model

The Node.js `URL` API should be understood as a **structured representation of a resource location**, not simply as a string.

Instead of thinking:

```text
"https://api.example.com/users/963?active=true"
```

think:

```text
URL
├── protocol
├── hostname
├── port
├── pathname
├── search
├── searchParams
├── hash
├── origin
└── href
```

The `URL` class allows each component to be accessed and modified independently.

---

# 2. Creating a URL

Modern Node.js applications can use the standard WHATWG `URL` API:

```javascript
const url = new URL("https://api.example.com/users/963");
```

The result is a structured `URL` object.

This is preferable to manually splitting URL strings.

---

# 3. URL Components

Given:

```javascript
const url = new URL(
  "https://api.example.com:8080/users/963?role=engineer#profile",
);
```

The main components are:

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

Conceptually:

```text
https://api.example.com:8080/users/963?role=engineer#profile
│      │               │    │          │              │
│      │               │    │          │              └── hash
│      │               │    │          └── query
│      │               │    └── pathname
│      │               └── port
│      └── hostname
└── protocol
```

---

# 4. Protocol

```javascript
url.protocol;
```

returns:

```text
https:
```

The protocol identifies the communication or resource scheme.

Examples:

```text
http:
https:
file:
ftp:
```

The trailing `:` is part of the returned protocol value.

---

# 5. Hostname

```javascript
url.hostname;
```

Example:

```text
api.example.com
```

The hostname identifies the host responsible for the resource.

---

# 6. Port

```javascript
url.port;
```

For:

```text
https://example.com:8080
```

the result is:

```text
8080
```

When the default port is explicitly represented according to URL normalization rules, the URL API may normalize it.

---

# 7. Host

```javascript
url.host;
```

The host combines the hostname and port when applicable.

Example:

```text
api.example.com:8080
```

---

# 8. Pathname

```javascript
url.pathname;
```

For:

```text
https://api.example.com/users/963
```

the pathname is:

```text
/users/963
```

The pathname identifies the resource path within the host.

---

# 9. Search

```javascript
url.search;
```

For:

```text
https://example.com/products?page=2&limit=20
```

the result includes the leading `?`:

```text
?page=2&limit=20
```

This is different from:

```javascript
url.searchParams;
```

which provides a structured query-parameter interface.

---

# 10. Hash

```javascript
url.hash;
```

For:

```text
https://example.com/docs#installation
```

the result is:

```text
#installation
```

The fragment is generally used to identify a location within a resource.

---

# 11. Origin

```javascript
url.origin;
```

For:

```text
https://api.example.com:8080/users
```

the origin represents:

```text
https://api.example.com:8080
```

It combines the relevant scheme, host, and port information.

---

# 12. href

```javascript
url.href;
```

returns the serialized URL.

It represents the complete URL.

Example:

```javascript
console.log(url.href);
```

---

# 13. URL Objects Are Mutable

A `URL` object can be modified.

Example:

```javascript
const url = new URL("https://example.com/products");

url.pathname = "/users";

console.log(url.href);
```

Result:

```text
https://example.com/users
```

This is an important difference between working with a structured URL object and manipulating raw strings.

---

# 14. Query Parameters

Query parameters appear after `?`.

Example:

```text
/products?category=ai&page=2
```

The query parameters are:

```text
category=ai
page=2
```

Use:

```javascript
url.searchParams;
```

to work with them.

---

# 15. Reading Query Parameters

```javascript
const url = new URL("https://example.com/products?category=ai&page=2");

console.log(url.searchParams.get("category"));

console.log(url.searchParams.get("page"));
```

Output:

```text
ai
2
```

Important:

```javascript
url.searchParams.get(...)
```

returns strings.

If numeric behavior is required:

```javascript
const page = Number(url.searchParams.get("page"));
```

---

# 16. Checking Parameters

Use:

```javascript
url.searchParams.has("page");
```

Example:

```javascript
if (url.searchParams.has("page")) {
  console.log("Page parameter exists.");
}
```

---

# 17. Setting Parameters

```javascript
url.searchParams.set("page", "3");
```

This creates the parameter if it does not exist or replaces its existing value.

---

# 18. Appending Parameters

```javascript
url.searchParams.append("tag", "ai");
```

`append()` allows multiple values for the same parameter.

Example:

```text
?tag=ai&tag=nodejs
```

This differs from `set()`.

```text
set()
→ replace existing value

append()
→ add another value
```

---

# 19. Deleting Parameters

```javascript
url.searchParams.delete("page");
```

This removes the parameter.

---

# 20. URLSearchParams Mental Model

Think of:

```javascript
url.searchParams;
```

as a small collection manager:

```text
URL
 │
 └── searchParams
       │
       ├── get()
       ├── set()
       ├── append()
       ├── delete()
       ├── has()
       ├── keys()
       ├── values()
       └── entries()
```

---

# 21. URL Construction

Instead of manually concatenating strings:

```javascript
const url = "https://example.com/users/" + userId + "?active=true";
```

prefer structured URL construction:

```javascript
const url = new URL(`https://example.com/users/${userId}`);

url.searchParams.set("active", "true");
```

This keeps path and query manipulation explicit.

---

# 22. URL Resolution

A relative URL can be resolved against a base URL.

Example:

```javascript
const base = "https://example.com/api/";

const url = new URL("users/963", base);

console.log(url.href);
```

Result:

```text
https://example.com/api/users/963
```

The second argument provides the base.

---

# 23. URL vs Path

This distinction is critical.

### `path`

Deals with filesystem paths:

```text
/home/user/project/uploads/image.png
```

### `URL`

Deals with resource URLs:

```text
https://example.com/uploads/image.png
```

They may look similar conceptually, but they represent different domains.

```text
path
 ↓
filesystem

URL
 ↓
resource addressing
```

---

# 24. File URLs

Node.js also supports:

```text
file:///home/user/project/config.json
```

This is a URL representing a filesystem resource.

The URL API can represent the resource:

```javascript
const fileURL = new URL("file:///home/user/project/config.json");
```

Filesystem operations still belong to the filesystem APIs and `path` utilities.

---

# 25. URL Encoding

URLs have rules for representing special characters.

For example:

```text
hello world
```

cannot simply be treated as an unescaped URL component everywhere.

When working with user input, search terms, filenames, or query parameters, proper URL encoding is important.

`URLSearchParams` automatically handles query-parameter serialization:

```javascript
const url = new URL("https://example.com/search");

url.searchParams.set("q", "AI engineer");

console.log(url.href);
```

The resulting URL contains an encoded representation of the space.

---

# 26. Avoid Manual Query Parsing

Avoid code such as:

```javascript
const query = "?name=Tamirat&page=2";

const values = query.replace("?", "").split("&");
```

This becomes fragile when values contain:

- spaces
- encoded characters
- repeated parameters
- special characters

Prefer:

```javascript
const url = new URL("https://example.com?name=Tamirat&page=2");

const name = url.searchParams.get("name");

const page = url.searchParams.get("page");
```

---

# 27. URL and Process

The previous phase taught:

```javascript
process.argv;
process.env;
process.cwd();
```

Those concepts describe the **execution environment**.

The URL module describes **resource addresses**.

A CLI application can combine them:

```text
process.argv
    ↓
User provides URL
    ↓
URL
    ↓
Parse resource
    ↓
Application logic
```

This is an example of combining modules while preserving their responsibilities.

---

# 28. URL and Path

A useful architecture can look like:

```text
Incoming URL
     ↓
URL parser
     ↓
pathname
     ↓
Path transformation
     ↓
Filesystem resource
```

For example:

```text
https://example.com/assets/avatar.png
                ↓
             pathname
                ↓
        /assets/avatar.png
                ↓
        filesystem mapping
```

The URL API and `path` module each perform their own responsibility.

---

# 29. Common Mistakes

### Mistake 1 — Treating URLs as plain strings

Fragile:

```javascript
url.split("?");
```

Prefer structured URL APIs.

---

### Mistake 2 — Confusing `search` and `searchParams`

```javascript
url.search;
```

is the serialized query component.

```javascript
url.searchParams;
```

is the structured interface for manipulating query parameters.

---

### Mistake 3 — Forgetting that query values are strings

```javascript
const page = url.searchParams.get("page");
```

returns:

```text
"2"
```

not:

```text
2
```

Convert explicitly when required:

```javascript
const page = Number(url.searchParams.get("page"));
```

---

### Mistake 4 — Manual URL concatenation

Avoid:

```javascript
const url = base + "?page=" + page;
```

when structured URL APIs can express the same operation safely.

---

### Mistake 5 — Mixing URL and filesystem responsibilities

Do not use URL logic as a replacement for filesystem path manipulation.

Keep:

```text
URL → resource addressing

path → filesystem paths
```

---

# 30. API Design Mental Model

A backend endpoint might receive:

```text
/api/users?page=2&limit=20&role=engineer
```

The URL layer can extract:

```text
pathname
/api/users

page
2

limit
20

role
engineer
```

Then application logic can operate on structured values.

The flow becomes:

```text
Raw Request
    ↓
URL parsing
    ↓
Structured request data
    ↓
Validation
    ↓
Business logic
    ↓
Response
```

This separation becomes especially important when the project reaches the HTTP and REST API phases.

---

# 31. AI Product Architecture Connection

AI-powered products frequently process URLs.

Examples include:

```text
Document URL
Image URL
Webhook URL
API endpoint
Callback URL
Cloud-storage URL
External model endpoint
```

A system might perform:

```text
User
 ↓
URL
 ↓
Validation
 ↓
Resource extraction
 ↓
AI processing
 ↓
Generated result
```

The URL layer should remain responsible for understanding and transforming the address.

The AI service should remain responsible for AI operations.

This separation keeps the system maintainable.

---

# 32. Security Awareness

URLs frequently contain untrusted input.

Examples:

```text
?redirect=
?callback=
?url=
?next=
?file=
```

Applications should not automatically trust arbitrary URLs.

Potential problems can include:

- malicious redirects
- unsafe resource fetching
- unexpected external requests
- SSRF-related risks
- malformed input
- authorization bypasses

URL parsing is therefore also part of backend security awareness.

Validation and authorization will be handled more deeply in later phases.

---

# 33. Interview-Level Questions

### What is the WHATWG URL API?

A standard structured API for parsing, inspecting, constructing, and modifying URLs.

---

### What is the difference between `URL` and `URLSearchParams`?

`URL` represents the complete URL.

`URLSearchParams` provides structured access to the query parameters.

---

### What does `url.pathname` return?

The path component of the URL.

Example:

```text
/users/963
```

---

### What does `url.search` return?

The serialized query component, including the leading `?`.

---

### What does `url.searchParams.get()` return?

The value associated with a query parameter, normally as a string, or `null` if it doesn't exist.

---

### What is the difference between `set()` and `append()`?

```text
set()
→ creates or replaces a parameter

append()
→ adds another parameter value
```

---

### Why use `URL` instead of manual string manipulation?

Because URLs have structured syntax and encoding rules. The standard API handles those rules more reliably.

---

# 34. Personal Mastery Checklist

- [ ] Explain what a URL represents.
- [ ] Create a `URL` object.
- [ ] Explain URL components.
- [ ] Read `protocol`.
- [ ] Read `hostname`.
- [ ] Read `port`.
- [ ] Read `host`.
- [ ] Read `pathname`.
- [ ] Read `search`.
- [ ] Read `hash`.
- [ ] Read `origin`.
- [ ] Read `href`.
- [ ] Access `searchParams`.
- [ ] Use `get()`.
- [ ] Use `set()`.
- [ ] Use `append()`.
- [ ] Use `delete()`.
- [ ] Use `has()`.
- [ ] Construct URLs programmatically.
- [ ] Resolve relative URLs.
- [ ] Understand URL encoding.
- [ ] Distinguish URL from filesystem paths.
- [ ] Explain how URL processing fits into backend architecture.
- [ ] Explain why arbitrary URLs should not automatically be trusted.

---

# 35. Key Takeaway

The most important lesson of this phase is:

```text
A URL is structured data.
```

Instead of manipulating:

```text
"https://example.com/api/users?page=2"
```

as an opaque string, reason about it as:

```text
URL
├── protocol
├── host
├── pathname
└── searchParams
```

That mental model will make HTTP servers, Express routing, REST APIs, authentication callbacks, webhooks, and AI integrations significantly easier to understand.

The progression is:

```text
Modules
   ↓
Filesystem paths
   ↓
Operating system
   ↓
Process runtime
   ↓
URL/resource addressing
   ↓
HTTP
   ↓
REST APIs
   ↓
AI services
```

The objective is not to memorize another Node.js module.

The objective is to understand another **boundary in a production system**.
