# Phase 02 — Path Module

> Learn how Node.js understands file and folder paths across different operating systems.

---

# Learning Objectives

By the end of this phase, you will be able to:

- Understand what file paths are.
- Differentiate between absolute and relative paths.
- Use Node.js Path Module confidently.
- Build cross-platform applications.
- Navigate directories programmatically.
- Extract file names and extensions.
- Build safe file paths.
- Prepare for the File System (fs) module.

---

# Why Learn the Path Module?

Every backend application works with files.

Examples include:

- Uploading images
- Reading configuration files
- Saving logs
- Serving static assets
- Reading AI prompts
- Writing reports
- Managing datasets
- Handling PDFs
- Saving generated images

Before Node.js can read or write a file, it must know **where the file is located**.

The Path Module helps Node.js understand file system locations safely and consistently.

---

# Real-World Examples

AI Resume Analyzer

```
uploads/
resume.pdf
```

↓

Read the uploaded PDF.

---

ChatGPT Clone

```
prompts/
system-prompt.txt
```

↓

Load the prompt before sending it to the AI model.

---

Image Generator

```
outputs/
image.png
```

↓

Save the generated image.

---

Video Processing

```
videos/
intro.mp4
```

↓

Locate the source video before processing.

---

# Folder Structure

```
02-path/
│
├── README.md
├── notes.md
│
├── examples/
│   ├── 01-path-info.js
│   ├── 02-join.js
│   ├── 03-resolve.js
│   ├── 04-parse.js
│   ├── 05-basename.js
│   ├── 06-dirname.js
│   ├── 07-extname.js
│   ├── 08-normalize.js
│   └── 09-relative.js
│
└── exercises/
    ├── 01-file-analyzer.js
    ├── 02-path-builder.js
    ├── 03-project-locator.js
    └── 04-ai-storage.js
```

---

# Lessons

## Lesson 1

Introduction to the Path Module

Learn

- What is a file path?
- Absolute path
- Relative path
- Path separators
- Cross-platform compatibility

---

## Lesson 2

path.join()

Learn how Node safely joins folders.

Example

```
uploads
images
profile.png
```

↓

```
uploads/images/profile.png
```

---

## Lesson 3

path.resolve()

Convert relative paths into absolute paths.

---

## Lesson 4

path.parse()

Break a file path into:

- root
- directory
- filename
- extension
- base

---

## Lesson 5

path.basename()

Extract only the filename.

Example

```
/uploads/avatar.png
```

↓

```
avatar.png
```

---

## Lesson 6

path.dirname()

Extract the folder.

Example

```
/uploads/avatar.png
```

↓

```
/uploads
```

---

## Lesson 7

path.extname()

Extract the file extension.

Example

```
photo.jpg
```

↓

```
.jpg
```

---

## Lesson 8

path.normalize()

Clean invalid or duplicated paths.

---

## Lesson 9

path.relative()

Calculate the relative path between two locations.

---

# Exercises

## Exercise 1

File Analyzer

Analyze a file path and display:

- filename
- extension
- directory
- absolute path

---

## Exercise 2

Path Builder

Build file paths using `path.join()`.

---

## Exercise 3

Project Locator

Display:

- current directory
- parent directory
- project root

---

## Exercise 4

AI Storage Manager

Generate paths for

- uploads
- outputs
- prompts
- cache
- logs
- models

---

# Best Practices

✅ Never hardcode path separators.

Bad

```js
"uploads/images/avatar.png";
```

Good

```js
path.join("uploads", "images", "avatar.png");
```

---

Always use the built-in `path` module for file locations.

---

Use absolute paths whenever possible for backend projects.

---

Keep uploads, outputs, cache, and logs separated.

---

Never assume Windows and Linux use the same path format.

---

# Common Mistakes

❌ Using `/` manually.

❌ Mixing relative and absolute paths.

❌ Ignoring operating system differences.

❌ Building paths with string concatenation.

❌ Forgetting that `path.resolve()` returns an absolute path.

---

# Professional Use Cases

The Path Module is used in

- Express.js
- File Upload APIs
- Authentication
- Logging
- Static Servers
- Build Tools
- AI Applications
- Video Processing
- Image Processing
- PDF Processing
- Cloud Storage
- CLI Tools

---

# AI-Powered Full-Stack Perspective

Modern AI applications constantly manage files.

Examples

- User uploads PDF
- Save AI-generated images
- Load prompt templates
- Store embeddings
- Cache AI responses
- Save generated reports
- Organize datasets

Understanding the Path Module is the first step toward building production-ready AI backends.

---

# Prerequisites

Before this phase, you should understand:

- Node.js Runtime
- ES Modules
- import / export
- Variables
- Functions

---

# Next Phase

After mastering the Path Module, continue with:

**Phase 03 — OS Module**

Learn how Node.js interacts with the operating system, including CPU, memory, platform, architecture, uptime, and user information.

---

# Mastery Checklist

Before moving to the next phase, you should be able to:

- Explain the purpose of the Path Module.
- Differentiate absolute vs relative paths.
- Use `path.join()`.
- Use `path.resolve()`.
- Use `path.parse()`.
- Use `path.basename()`.
- Use `path.dirname()`.
- Use `path.extname()`.
- Use `path.normalize()`.
- Use `path.relative()`.
- Build cross-platform file paths.
- Design file structures for AI-powered applications.

---

**Goal:** Don't just memorize the `path` API. Build the mental model of how Node.js locates, constructs, and manages file system paths so you can confidently build backend services, automation tools, and AI applications that work reliably across platforms.
