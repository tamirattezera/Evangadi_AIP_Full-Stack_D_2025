````markdown
# Phase 07 — Node.js File System

> A structured deep-dive into Node.js file and directory operations using the built-in `fs` module.

---

## 1. Phase Overview

The Node.js File System (`fs`) module allows Node.js applications to interact with the operating system's file system.

In this phase, we move from understanding Node.js runtime information to performing real operations on files and directories.

We will learn how to:

- Read files
- Write files
- Append data
- Inspect file metadata
- Check file existence
- Create directories
- Read directories
- Rename files
- Move files
- Copy files
- Delete files
- Work with asynchronous file operations
- Work with file streams

The goal is not simply to memorize `fs` methods.

The goal is to understand:

```text
Node.js Application
        ↓
       fs
        ↓
Operating System
        ↓
Files / Directories
````

---

# 2. Why This Phase Matters

File system operations are fundamental to backend development.

Real applications constantly interact with files.

Examples include:

* Configuration files
* Application logs
* Uploaded files
* Images
* Videos
* Documents
* JSON data
* CSV files
* Temporary files
* Generated reports
* Cached data
* Database backups
* AI/ML datasets
* AI-generated files

For example:

```text
User
  ↓
Upload PDF
  ↓
Node.js Server
  ↓
File System
  ↓
Store PDF
  ↓
Read PDF
  ↓
Process Content
  ↓
AI System
```

Understanding `fs` is therefore essential for becoming a strong Node.js backend engineer.

---

# 3. Learning Objectives

By the end of this phase, I should be able to:

* Explain what the Node.js `fs` module does.
* Read files using Node.js.
* Write files using Node.js.
* Append data to existing files.
* Inspect file metadata.
* Determine whether a file exists.
* Create directories.
* Read directory contents.
* Rename files.
* Move files.
* Copy files.
* Delete files.
* Understand synchronous file operations.
* Understand asynchronous file operations.
* Use `fs.promises`.
* Understand Buffers when reading files.
* Understand file encodings.
* Understand the difference between files and directories.
* Understand basic file-system error handling.
* Understand why asynchronous operations matter in servers.
* Understand when streams are more appropriate than reading an entire file.

---

# 4. Core Module

The primary Node.js module used in this phase is:

```javascript
import fs from "fs";
```

Node.js also provides the promise-based API:

```javascript
import fs from "fs/promises";
```

We will learn both approaches.

---

# 5. Core File Operations

The first part of the phase focuses on basic file operations.

## Read

```javascript
fs.readFileSync()
```

and later:

```javascript
fs.promises.readFile()
```

---

## Write

```javascript
fs.writeFileSync()
```

and later:

```javascript
fs.promises.writeFile()
```

---

## Append

```javascript
fs.appendFileSync()
```

---

## Rename / Move

```javascript
fs.renameSync()
```

---

## Copy

```javascript
fs.copyFileSync()
```

---

## Delete

```javascript
fs.unlinkSync()
```

---

# 6. Directory Operations

Node.js can also manage directories.

## Create

```javascript
fs.mkdirSync()
```

## Read

```javascript
fs.readdirSync()
```

## Remove

```javascript
fs.rmdirSync()
```

We will also learn safer modern approaches for directory removal.

---

# 7. File Metadata

Node.js can inspect information about files.

For example:

```javascript
fs.statSync()
```

This allows us to investigate things such as:

* File size
* File type
* Directory status
* Modification time
* Access time
* Creation time

Conceptually:

```text
File
 ↓
fs.stat()
 ↓
Metadata
```

---

# 8. File Existence

Node.js provides:

```javascript
fs.existsSync()
```

which can be useful for simple existence checks.

However, we will also learn why blindly checking existence before performing another operation can create race-condition problems.

The goal is not just to know the method.

The goal is to understand when it is appropriate.

---

# 9. Synchronous vs Asynchronous Operations

One of the most important concepts in this phase is the difference between synchronous and asynchronous file operations.

## Synchronous

Example:

```javascript
const data = fs.readFileSync("sample.txt", "utf8");
```

The current JavaScript execution waits until the operation finishes.

Conceptually:

```text
Node.js
   ↓
Read file
   ↓
WAIT
   ↓
Continue
```

---

## Asynchronous

Example:

```javascript
const data = await fs.promises.readFile(
  "sample.txt",
  "utf8"
);
```

The operation can complete asynchronously.

Conceptually:

```text
Node.js
   ↓
Request file operation
   ↓
Continue other work
   ↓
Receive result
```

This distinction becomes extremely important when building:

* HTTP servers
* REST APIs
* Authentication systems
* File upload services
* Background workers
* AI applications
* Production backend systems

---

# 10. Buffers and Encoding

This phase connects directly with the previous Crypto phase.

When Node.js reads a file without specifying an encoding:

```javascript
const data = fs.readFileSync("sample.txt");
```

the result is a:

```text
Buffer
```

When we specify:

```javascript
const data = fs.readFileSync(
  "sample.txt",
  "utf8"
);
```

we receive:

```text
String
```

The mental model is:

```text
File
 ↓
Bytes
 ↓
Buffer
 ↓
UTF-8 decoding
 ↓
String
```

This connection is important because Node.js works heavily with binary data.

---

# 11. File System + Path

This phase will also connect with the previous `path` phase.

Instead of manually writing:

```javascript
"resources/sample.txt"
```

we can construct paths safely:

```javascript
import path from "path";

const filePath = path.join(
  "resources",
  "sample.txt"
);
```

Conceptually:

```text
path
 ↓
Build correct file path
 ↓
fs
 ↓
Perform file operation
```

This is one of the first places where multiple Node.js core modules begin working together.

---

# 12. File System + Process

The `process` module from Phase 04 also becomes useful.

For example:

```javascript
process.cwd()
```

can tell us the current working directory.

Combined:

```text
process.cwd()
      ↓
Current directory
      ↓
path.join()
      ↓
File path
      ↓
fs.readFile()
      ↓
File contents
```

This demonstrates why the phases are separated conceptually but eventually integrated.

---

# 13. File System + Crypto

The previous Crypto phase also connects naturally with File System operations.

For example:

```text
File
 ↓
Read file
 ↓
Hash contents
 ↓
SHA-256 digest
```

This is useful for:

* File integrity
* Duplicate detection
* Content verification
* Upload validation
* Backup verification

You already practiced this concept in:

```text
06-crypto/examples/02-file-hash.js
```

Now we will understand the underlying file operation more deeply.

---

# 14. Phase Architecture

This phase follows the Node.js Lab architecture:

```text
07-file-system/
│
├── README.md
├── notes.md
│
├── examples/
│
├── exercises/
│
└── resources/
```

Each directory has a different responsibility.

---

# 15. README.md

This file explains:

* What the phase is
* Why the phase matters
* Learning objectives
* Core concepts
* Architecture
* Roadmap
* Real-world applications

It is the **orientation document**.

It should not become a complete technical notebook.

---

# 16. notes.md

`notes.md` contains the deeper technical knowledge from the phase.

It should contain:

* Concepts
* API explanations
* Important behavior
* Mental models
* Comparisons
* Gotchas
* Error handling notes
* Performance considerations
* Security considerations
* Interview knowledge

The separation is:

```text
README.md
    ↓
"What am I learning?"

notes.md
    ↓
"What do I know about it?"
```

---

# 17. examples/

The `examples/` directory teaches one concept at a time.

structure:

```text
examples/
├── 01-read-file.js
├── 02-write-file.js
├── 03-append-file.js
├── 04-file-information.js
├── 05-check-file.js
├── 06-create-directory.js
├── 07-read-directory.js
├── 08-rename-file.js
├── 09-copy-file.js
├── 10-delete-file.js
├── 11-read-file-async.js
└── 12-file-stream.js
```

Each example should have a narrow responsibility.

For example:

```text
01-read-file.js
```

should primarily teach:

```javascript
fs.readFileSync()
```

It should not simultaneously teach:

* File organization
* Streams
* HTTP
* JSON processing
* Authentication
* Complex error handling

The purpose is focused learning.

---

# 18. exercises/

Exercises combine concepts that have already been learned.

Recommended structure:

```text
exercises/
├── 01-file-reader.js
├── 02-file-writer.js
├── 03-log-manager.js
├── 04-directory-manager.js
├── 05-file-organizer.js
└── 06-file-inspector.js
```

The difference:

```text
Example
    ↓
Understand one concept

Exercise
    ↓
Apply the concept independently
```

I should attempt exercises before looking at a solution.

---

# 19. resources/

The `resources/` directory contains files used by examples and exercises.

Example:

```text
resources/
├── sample.txt
└── sample-data.json
```

This prevents test data from being mixed with JavaScript source code.

---

# 20. Separation of Concerns

This phase intentionally avoids creating one huge program such as:

```text
fs-demo.js
```

containing:

```text
read
write
append
rename
copy
delete
directory creation
directory reading
metadata
streams
JSON
logging
```

Instead:

```text
01-read-file
      ↓
Read

02-write-file
      ↓
Write

03-append-file
      ↓
Append

04-file-information
      ↓
Metadata

...
```

This makes each concept easier to understand and debug.

---

# 21. Learning Roadmap

## Lesson 01 — Read a File

Learn:

```javascript
fs.readFileSync()
```

Focus:

* File contents
* Encoding
* Buffer
* UTF-8

---

## Lesson 02 — Write a File

Learn:

```javascript
fs.writeFileSync()
```

Focus:

* Creating files
* Overwriting files
* Writing strings

---

## Lesson 03 — Append to a File

Learn:

```javascript
fs.appendFileSync()
```

Focus:

* Adding content
* Logs
* Sequential file writes

---

## Lesson 04 — File Information

Learn:

```javascript
fs.statSync()
```

Focus:

* Size
* File vs directory
* Timestamps
* Metadata

---

## Lesson 05 — Check File

Learn:

```javascript
fs.existsSync()
```

Focus:

* Existence checks
* Limitations
* Race conditions

---

## Lesson 06 — Create Directory

Learn:

```javascript
fs.mkdirSync()
```

Focus:

* Directory creation
* Nested directories
* Recursive creation

---

## Lesson 07 — Read Directory

Learn:

```javascript
fs.readdirSync()
```

Focus:

* Listing files
* Directory contents
* File discovery

---

## Lesson 08 — Rename / Move

Learn:

```javascript
fs.renameSync()
```

Focus:

* Renaming
* Moving
* Path relationships

---

## Lesson 09 — Copy

Learn:

```javascript
fs.copyFileSync()
```

Focus:

* File duplication
* Backup concepts

---

## Lesson 10 — Delete

Learn:

```javascript
fs.unlinkSync()
```

Focus:

* Removing files
* Safe deletion
* Error handling

---

## Lesson 11 — Asynchronous File Operations

Learn:

```javascript
fs/promises
```

Focus:

* Promises
* `async`
* `await`
* Non-blocking operations
* Error handling

---

## Lesson 12 — Streams

Learn:

```javascript
fs.createReadStream()
fs.createWriteStream()
```

Focus:

* Large files
* Memory efficiency
* Chunk-based processing
* Backpressure fundamentals

---

# 22. Exercises Roadmap

## Exercise 01 — File Reader

Build a program that:

* Accepts a file path
* Reads the file
* Displays its contents
* Displays basic information

---

## Exercise 02 — File Writer

Build a program that:

* Creates a file
* Writes user-provided content
* Reports the resulting file

---

## Exercise 03 — Log Manager

Build a simple log system:

```text
logs/
└── application.log
```

The program should append entries such as:

```text
Application started
User logged in
Request completed
```

---

## Exercise 04 — Directory Manager

Build a program that can:

* Create a directory
* List its contents
* Display file types

---

## Exercise 05 — File Organizer

Build a small file organizer.

Initial structure:

```text
downloads/
├── photo.jpg
├── resume.pdf
├── video.mp4
└── notes.txt
```

Organize into:

```text
downloads/
├── images/
│   └── photo.jpg
│
├── documents/
│   ├── resume.pdf
│   └── notes.txt
│
└── videos/
    └── video.mp4
```

This exercise combines:

```text
fs
+
path
+
process
```

---

## Exercise 06 — File Inspector

Build a utility that accepts a file path and reports:

```text
File name
File size
File type
Created time
Modified time
Absolute path
```

This prepares you for real backend utilities.

---

# 23. Real-World Applications

## Logging

```text
Application
    ↓
Logger
    ↓
application.log
```

---

## File Uploads

```text
HTTP Request
    ↓
Uploaded File
    ↓
File System
    ↓
Storage
```

---

## Static Files

```text
Node.js Server
      ↓
HTML
CSS
JavaScript
Images
```

---

## Configuration

```text
Application
    ↓
Configuration File
    ↓
Read Configuration
```

---

## Data Processing

```text
CSV
 ↓
Read
 ↓
Parse
 ↓
Process
 ↓
Write Result
```

---

## AI Applications

```text
User
 ↓
Upload Document
 ↓
File System
 ↓
Read File
 ↓
Extract Content
 ↓
AI Processing
 ↓
Generate Result
 ↓
Save Result
```

---

# 24. Performance Considerations

A critical production principle:

> Do not blindly use synchronous file operations inside high-throughput server request handlers.

For example:

```javascript
fs.readFileSync()
```

can block the current execution path while the file operation completes.

For server-side workloads, asynchronous APIs are generally preferable.

Later in this phase we will compare:

```text
Sync API
vs
Async API
vs
Streams
```

---

# 25. Streams

Large files introduce another problem.

Imagine:

```text
2 GB video
```

Reading the entire file into memory at once is undesirable.

Instead:

```text
2 GB File
    ↓
Chunk
Chunk
Chunk
Chunk
Chunk
    ↓
Process incrementally
```

This is where streams become important.

Node.js provides:

```javascript
fs.createReadStream()
```

and:

```javascript
fs.createWriteStream()
```

Streams will be introduced at the end of this phase before the dedicated Streams phase.

---

# 26. Error Handling

File operations can fail.

Examples:

```text
File doesn't exist
Permission denied
Invalid path
Directory doesn't exist
Disk unavailable
File already exists
```

Therefore production-quality code must account for errors.

For synchronous APIs:

```javascript
try {
  // file operation
} catch (error) {
  // handle error
}
```

For asynchronous APIs:

```javascript
try {
  const data = await fs.readFile(...);
} catch (error) {
  // handle error
}
```

We will gradually introduce error handling instead of adding unnecessary complexity to the first examples.

---

# 27. Security Considerations

File-system code can introduce serious security vulnerabilities.

Examples include:

* Path traversal
* Unauthorized file access
* Unsafe file uploads
* Overwriting important files
* Arbitrary file deletion
* Exposing sensitive files

A dangerous input could look conceptually like:

```text
../../../../sensitive-file
```

This is why your previous knowledge of:

```text
path
+
process
+
fs
```

will eventually become important for secure backend systems.

---

# 28. Connection to Future Phases

This phase prepares you for:

```text
07 File System
      ↓
08 Events
      ↓
09 Buffers
      ↓
10 Streams
      ↓
11 HTTP Server
      ↓
12 npm
      ↓
13 Express
      ↓
14 REST API
      ↓
15 MySQL
      ↓
16 Authentication
      ↓
17 Capstone
```

The concepts will increasingly combine.

For example:

```text
HTTP Request
     ↓
File Upload
     ↓
fs
     ↓
Buffer
     ↓
Stream
     ↓
Storage
     ↓
Database
```

---

# 29. Phase Completion Criteria

This phase is complete when I can independently:

* Read a file.
* Write a file.
* Append to a file.
* Inspect file metadata.
* Check whether a file exists.
* Create directories.
* List directory contents.
* Rename files.
* Move files.
* Copy files.
* Delete files.
* Use asynchronous file APIs.
* Explain synchronous vs asynchronous operations.
* Explain Buffers and encoding.
* Use streams for large files.
* Handle common file-system errors.
* Identify basic file-system security risks.
* Build a practical file-management utility.

Most importantly:

> I should understand **why** I am using a particular API, not merely remember its method name.

---

# 30. Final Mental Model

The complete File System mental model:

```text
                    Node.js
                       │
                       ▼
                      fs
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
      Files       Directories       Streams
        │              │              │
   ┌────┼────┐      ┌──┴──┐           │
   ↓    ↓    ↓      ↓     ↓           ↓
 Read Write Delete Create Read      Chunks
   │    │    │       │     │           │
   └────┴────┴───────┴─────┴───────────┘
                       │
                       ▼
                Operating System
```

And the larger Node.js architecture:

```text
                NODE.JS CORE
                     │
     ┌───────────────┼────────────────┐
     ↓               ↓                ↓
   process          path              os
     │               │                │
     └───────────────┼────────────────┘
                     ↓
                    fs
                     │
             ┌───────┴────────┐
             ↓                ↓
          Files           Directories
             │
             ↓
          Buffers
             │
             ↓
          Streams
             │
             ↓
        HTTP / APIs
             │
             ↓
        Real Products
```

---

# 31. Phase Learning Principle

Throughout this phase, maintain the same discipline:

```text
ONE EXAMPLE
    ↓
ONE PRIMARY CONCEPT

ONE EXERCISE
    ↓
APPLY KNOWN CONCEPTS

ONE PROJECT
    ↓
COMBINE CONCEPTS
```

Do not optimize for writing the biggest program.

Optimize for understanding the smallest concept deeply enough that you can later compose it into production systems.

---

# 32. Phase Status

```text
Phase: 07-file-system

Status: In Progress

Examples:
[ ] 01-read-file.js
[ ] 02-write-file.js
[ ] 03-append-file.js
[ ] 04-file-information.js
[ ] 05-check-file.js
[ ] 06-create-directory.js
[ ] 07-read-directory.js
[ ] 08-rename-file.js
[ ] 09-copy-file.js
[ ] 10-delete-file.js
[ ] 11-read-file-async.js
[ ] 12-file-stream.js

Exercises:
[ ] 01-file-reader.js
[ ] 02-file-writer.js
[ ] 03-log-manager.js
[ ] 04-directory-manager.js
[ ] 05-file-organizer.js
[ ] 06-file-inspector.js

Project:
[ ] File System Project
```

---

# Phase 07 Rule

> **Understand the File System before abstracting it.**

Learn what happens when Node.js reads, writes, modifies, and removes files.

Then learn asynchronous APIs.

Then learn streams.

Then combine `fs` with:

```text
path
process
buffers
streams
events
HTTP
databases
```

That is how this phase becomes a foundation for real Node.js backend engineering.

```
```
