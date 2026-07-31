# Phase 01 — Node.js Modules Notes

## Goal

Learn how Node.js organizes code into reusable, maintainable, and scalable modules using ES Modules (ESM).

---

# What is a Module?

A module is a JavaScript file that has its own private scope.

Every file is an independent unit of code.

Modules allow applications to be divided into small, reusable pieces instead of placing everything inside one large file.

Example:

```text
AI Application

server.js
│
├── auth.js
├── database.js
├── openai.js
├── email.js
└── logger.js
```

Each file has a single responsibility.

---

# Why Do Modules Exist?

Without modules:

- Code becomes extremely large.
- Functions become difficult to find.
- Variables pollute the global scope.
- Reusing code is difficult.
- Collaboration becomes difficult.

With modules:

- Code is organized.
- Responsibilities are separated.
- Reuse becomes simple.
- Testing becomes easier.
- Maintenance becomes easier.
- Applications scale naturally.

---

# Module Scope

Every module has its own private scope.

Variables declared inside one module cannot be accessed directly by another module.

Example:

```javascript
const PI = 3.14;
```

`PI` is private unless exported.

---

# Public vs Private

Private

- Internal helper functions
- Internal variables
- Secrets
- Business logic implementation

Public

- Functions intended for other modules
- Constants intended for reuse
- Public API of the module

Example:

```javascript
const secret = "private";

export const TAX = 0.15;

export function add(a, b) {
  return a + b;
}
```

Only `TAX` and `add()` are accessible outside the module.

---

# Export

`export` exposes code from a module.

It creates the module's public API.

Example:

```javascript
export function add(a, b) {
  return a + b;
}

export const PI = 3.14;
```

---

# Import

`import` allows another module to use exported values.

Example:

```javascript
import { add, PI } from "./math.js";
```

The imported names must exactly match the exported names.

---

# Named Exports

A module may export multiple values.

Example:

```javascript
export function add() {}

export function subtract() {}

export const PI = 3.14;
```

Import:

```javascript
import { add, subtract, PI } from "./math.js";
```

Use named exports when a module exposes multiple related values.

---

# Default Export

A module may have one primary export.

Example:

```javascript
export default function calculate() {}
```

Import:

```javascript
import calculate from "./calculator.js";
```

The imported name can be anything.

Example:

```javascript
import myCalculator from "./calculator.js";
```

Use a default export when a module represents one main object or function.

---

# Named vs Default Export

Named Export

- Multiple per module
- Imported using braces `{ }`
- Names must match

Default Export

- Only one per module
- Imported without braces
- Name can be changed by the importer

---

# Module Dependency

A consumer imports a provider.

Correct direction:

```text
Application
        │
        ▼
Imports
        │
        ▼
Module
```

A module should not import the application that uses it.

---

# Module Resolution

Node.js resolves imports by:

1. Reading the import statement.
2. Resolving the file path.
3. Loading the module.
4. Creating the module.
5. Building the export table.
6. Executing the module.
7. Returning requested exports.

Example:

```javascript
import { add } from "./math.js";
```

Node searches for `math.js` relative to the importing file.

---

# Module Cache

Node loads a module only once.

Subsequent imports reuse the cached module.

Benefits:

- Better performance.
- Shared module state.
- Avoids repeated execution.

---

# ES Modules (ESM)

Modern Node.js module system.

Syntax:

```javascript
export

import
```

Requires:

```json
"type": "module"
```

inside `package.json`.

---

# CommonJS (Legacy)

Older Node.js module system.

Syntax:

```javascript
module.exports;

require();
```

Still widely used in older projects but ES Modules are preferred for new applications.

---

# Mental Model

```text
JavaScript File

↓

Private Module Scope

↓

Developer decides

↓

Export

↓

Public API

↓

Import

↓

Other Modules
```

---

# Real-World Examples

Express

```text
server.js

↓

routes/

↓

controllers/

↓

services/

↓

database/
```

AI Backend

```text
server.js

↓

openai.service.js

↓

OpenAI API
```

Authentication

```text
server.js

↓

auth.service.js

↓

JWT
```

Each file exposes only the functionality other modules need.

---

# Best Practices

- One responsibility per module.
- Export only what is necessary.
- Keep implementation details private.
- Prefer named exports for utility libraries.
- Use default exports when a module has one primary purpose.
- Keep module names descriptive.
- Avoid circular dependencies.
- Use ES Modules for new Node.js projects.

---

# Common Beginner Mistakes

- Forgetting to export a function.
- Importing something that is not exported.
- Misspelling exported names.
- Forgetting the `.js` extension in Node.js ES Modules.
- Importing from the wrong relative path.
- Creating unnecessary modules for very small programs.
- Mixing CommonJS and ES Modules without understanding the differences.

---

# Key Concepts Learned

- Module
- Scope
- Encapsulation
- Public API
- Private implementation
- Export
- Import
- Named Export
- Default Export
- Module Resolution
- Module Cache
- Dependency Direction
- ES Modules

---

# Quick Revision Checklist

- I can explain what a module is.
- I understand private vs public module scope.
- I know how `export` works.
- I know how `import` works.
- I can use named exports.
- I understand default exports.
- I know why Node caches modules.
- I understand dependency direction.
- I can explain why modules improve scalability.
- I can apply modules to future AI-powered backend applications.
