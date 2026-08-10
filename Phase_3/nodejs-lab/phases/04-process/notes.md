# Phase 04 — Node.js Process Module Notes

## Process Runtime Intelligence

---

# 1. What Is a Process?

A **process** is a running instance of a program.

When executing:

```bash
node app.js
```

the operating system creates a new Node.js process.

Flow:

```
app.js

   ↓

Node.js Runtime

   ↓

Operating System Process

   ↓

CPU + Memory
```

Every running Node.js application has:

- Process ID
- Memory allocation
- Environment variables
- Runtime information
- Lifecycle events

---

# 2. The Global Process Object

Node.js provides a global object:

```javascript
process;
```

No import is required.

Example:

```javascript
console.log(process);
```

The process object gives access to:

- application information
- runtime information
- operating system interaction
- lifecycle control

---

# 3. Process Information

## Process ID

```javascript
process.pid;
```

Returns the unique ID assigned by the operating system.

Example:

```javascript
console.log(process.pid);
```

Output:

```
45231
```

Used for:

- debugging
- monitoring
- process management

---

## Node Version

```javascript
process.version;
```

Example:

```javascript
console.log(process.version);
```

Output:

```
v22.22.3
```

Useful for:

- compatibility checks
- debugging production issues

---

## Platform

```javascript
process.platform;
```

Example:

```javascript
console.log(process.platform);
```

Output:

```
linux
```

Possible values:

```
linux
win32
darwin
```

---

## CPU Architecture

```javascript
process.arch;
```

Example:

```javascript
console.log(process.arch);
```

Output:

```
x64
```

---

# 4. Command Line Arguments

Node.js receives command-line arguments through:

```javascript
process.argv;
```

Example:

Command:

```bash
node app.js hello world
```

Code:

```javascript
console.log(process.argv);
```

Output:

```javascript
["/usr/bin/node", "/app/app.js", "hello", "world"];
```

---

## Understanding Indexes

```javascript
process.argv[0];
```

Node executable path.

---

```javascript
process.argv[1];
```

Current JavaScript file.

---

```javascript
process.argv[2];
```

First user argument.

---

Example:

```javascript
const username = process.argv[2];

console.log(username);
```

Run:

```bash
node app.js Tamirat
```

Output:

```
Tamirat
```

---

# 5. Environment Variables

Environment variables store configuration outside the source code.

Access:

```javascript
process.env;
```

Example:

```javascript
console.log(process.env.NODE_ENV);
```

---

Common variables:

```
PORT

DATABASE_URL

OPENAI_API_KEY

JWT_SECRET

NODE_ENV
```

---

Example:

```javascript
const port = process.env.PORT || 3000;
```

Meaning:

Use:

```
PORT from environment
```

otherwise:

```
3000
```

---

# Why Environment Variables Matter

Never:

```javascript
const password = "123456";
```

Because:

- code can leak
- GitHub exposes secrets
- environments differ

Instead:

```
.env

     ↓

process.env

     ↓

Application
```

---

# 6. Current Working Directory

```javascript
process.cwd();
```

Returns the directory where Node.js was executed.

Example:

```javascript
console.log(process.cwd());
```

Output:

```
/home/user/project
```

---

Important difference:

## process.cwd()

Where the command was executed.

---

## \_\_dirname

Where the file exists.

Example:

```
project

├── app.js

└── utils
    └── helper.js
```

Inside helper.js:

```
__dirname

=
/project/utils
```

---

# 7. Memory Usage

Node provides:

```javascript
process.memoryUsage();
```

Example:

```javascript
console.log(process.memoryUsage());
```

Returns:

```javascript
{
  (rss, heapTotal, heapUsed, external, arrayBuffers);
}
```

---

## Important Fields

### RSS

Resident Set Size.

Total memory used by the process.

---

### heapUsed

Memory currently used by JavaScript objects.

---

### heapTotal

Allocated heap memory.

---

Example:

```javascript
const memory = process.memoryUsage();

console.log(memory.heapUsed);
```

---

# 8. Process Exit

Stop the application:

```javascript
process.exit();
```

Example:

```javascript
process.exit(0);
```

---

Exit codes:

## Success

```
0
```

Application completed correctly.

---

## Error

```
1
```

Application failed.

---

Example:

```javascript
if (!password) {
  console.log("Missing password");

  process.exit(1);
}
```

---

# 9. Process Events

Node processes can listen for events.

Syntax:

```javascript
process.on(event, callback);
```

Example:

```javascript
process.on("exit", () => {
  console.log("Application stopped");
});
```

---

Common events:

```
exit

SIGINT

SIGTERM

uncaughtException

unhandledRejection
```

---

# 10. Graceful Shutdown

Production applications should shutdown safely.

Bad:

```
CTRL + C

↓

Immediate stop
```

Problems:

- unfinished requests
- database corruption
- lost data

---

Good:

```
Signal received

↓

Close connections

↓

Save data

↓

Stop server
```

---

Example:

```javascript
process.on("SIGTERM", () => {
  console.log("Shutting down safely");
});
```

---

# Process vs OS Module

## OS Module

Question:

"What is my machine?"

Example:

```javascript
os.cpus();

os.totalmem();

os.hostname();
```

---

## Process Module

Question:

"What is my application doing?"

Example:

```javascript
process.pid;

process.env;

process.argv;
```

---

# Process Module Cheat Sheet

| Purpose           | API                     |
| ----------------- | ----------------------- |
| Process ID        | `process.pid`           |
| Node version      | `process.version`       |
| Platform          | `process.platform`      |
| Architecture      | `process.arch`          |
| Arguments         | `process.argv`          |
| Environment       | `process.env`           |
| Current directory | `process.cwd()`         |
| Memory            | `process.memoryUsage()` |
| Exit application  | `process.exit()`        |
| Listen events     | `process.on()`          |

---

# Backend Engineering Applications

## CLI Tools

Uses:

```javascript
process.argv;
```

Examples:

- npm
- git
- custom developer tools

---

## Configuration Management

Uses:

```javascript
process.env;
```

Examples:

- API keys
- database configuration
- deployment settings

---

## Production Monitoring

Uses:

```javascript
process.pid;

process.memoryUsage();
```

Examples:

- server dashboards
- health checks
- debugging

---

## AI Application Infrastructure

AI systems require:

- API secrets
- memory monitoring
- graceful shutdown
- runtime awareness

The process module provides the foundation.

---

# Phase 04 Mastery Checklist

Before moving forward:

- [ ] Understand Node.js processes
- [ ] Use process information APIs
- [ ] Read command-line arguments
- [ ] Manage environment variables
- [ ] Understand cwd vs dirname
- [ ] Monitor memory
- [ ] Handle shutdown signals
- [ ] Build a CLI application

---

# Core Principle

A beginner learns:

"How to write Node.js code."

A professional learns:

"How Node.js code behaves while running."
