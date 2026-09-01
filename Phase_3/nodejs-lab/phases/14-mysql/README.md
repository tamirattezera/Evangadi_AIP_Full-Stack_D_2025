# Phase 14 — MySQL + Node.js

> **From SQL Knowledge to Database-Driven Backend Engineering**

## Overview

This phase focuses on connecting **Node.js applications** to a **MySQL database** and building the foundation required for database-driven backend applications.

Previous phases focused on understanding the Node.js runtime, HTTP communication, npm, and Express. This phase connects those backend concepts to persistent data storage.

The goal is not simply to execute SQL queries from JavaScript.

The goal is to understand the complete communication flow:

```text
Node.js Application
        ↓
MySQL Driver
        ↓
Connection / Connection Pool
        ↓
MySQL Server
        ↓
Database
        ↓
SQL Execution
        ↓
Query Result
        ↓
Node.js Application
```

By the end of this phase, the application should be able to safely connect to MySQL, execute queries, manage connections, handle errors, use parameterized queries, and perform CRUD operations.

---

# 🎯 Phase Objective

The primary objective is to build a strong bridge between:

```text
JavaScript
    ↓
Node.js
    ↓
Database Driver
    ↓
MySQL
```

This phase focuses on understanding **how backend applications communicate with relational databases**.

The final mental model should be:

```text
Application
    ↓
Database Connection
    ↓
SQL Query
    ↓
MySQL Server
    ↓
Database
    ↓
Table
    ↓
Rows
    ↓
Query Result
    ↓
Application
```

---

# 🧠 Why This Phase Matters

An application without persistent storage has limited capabilities.

For example:

```text
Node.js Application
        ↓
JavaScript Objects
        ↓
Server Restart
        ↓
Data Lost
```

A database changes this:

```text
Node.js Application
        ↓
MySQL
        ↓
Persistent Storage
        ↓
Server Restart
        ↓
Data Still Exists
```

Databases allow applications to persist:

- Users
- Products
- Orders
- Authentication data
- Application settings
- Business records
- Transactions

This is a critical step toward building real backend systems.

---

# 🏗️ Phase Architecture

The architecture explored during this phase is:

```text
┌──────────────────────┐
│  Node.js Application │
└──────────┬───────────┘
           │
           │ JavaScript API
           ↓
┌──────────────────────┐
│    mysql2 Driver     │
└──────────┬───────────┘
           │
           │ MySQL Protocol
           ↓
┌──────────────────────┐
│    MySQL Server      │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│      Database        │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│       Tables         │
└──────────────────────┘
```

---

# 📂 Project Structure

```text
14-mysql/
│
├── README.md
├── notes.md
│
├── package.json
├── package-lock.json
│
├── examples/
│   ├── 01-connection.js
│   ├── 02-select.js
│   ├── 03-insert.js
│   ├── 04-update.js
│   ├── 05-delete.js
│   ├── 06-parameterized-query.js
│   ├── 07-connection-pool.js
│   ├── 08-error-handling.js
│   └── 09-transactions.js
│
├── config/
│   └── database.js
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
└── .env.example
```

Each example focuses on one database engineering concept.

---

# 🗺️ Learning Roadmap

## 01 — Database Connection

Learn how a Node.js application establishes a connection with a MySQL server.

```text
Node.js
   ↓
mysql2
   ↓
Connection
   ↓
MySQL Server
```

Key concepts:

- MySQL driver
- Database connection
- Authentication
- Host
- Port
- Database selection
- Closing connections

---

## 02 — Executing SELECT Queries

Learn how Node.js retrieves data from MySQL.

```text
Node.js
   ↓
SELECT
   ↓
MySQL
   ↓
Rows
   ↓
JavaScript
```

Key concepts:

- `execute()`
- Query results
- Rows
- Result metadata
- Async operations

---

## 03 — INSERT Operations

Learn how applications create persistent records.

```text
Application Data
       ↓
INSERT
       ↓
MySQL
       ↓
New Row
```

Key concepts:

- Insert operations
- `insertId`
- Affected rows
- Async database operations

---

## 04 — UPDATE Operations

Learn how applications modify existing database records.

```text
Existing Row
     ↓
UPDATE
     ↓
Modified Row
```

Key concepts:

- Updating records
- `affectedRows`
- Filtering with `WHERE`
- Preventing unintended updates

---

## 05 — DELETE Operations

Learn how applications remove database records.

```text
Row
 ↓
DELETE
 ↓
Database
```

Key concepts:

- Deleting records
- `WHERE` clauses
- Checking affected rows
- Safe deletion

---

## 06 — Parameterized Queries 🔴

Parameterized queries are one of the most important concepts in this phase.

Unsafe approach:

```text
User Input
     ↓
String Concatenation
     ↓
SQL Query
     ⚠
```

Safer approach:

```text
SQL Template
     +
Parameters
     ↓
mysql2
     ↓
MySQL
```

Example:

```js
await connection.execute("SELECT * FROM users WHERE id = ?", [userId]);
```

This concept is essential for preventing SQL injection.

---

## 07 — Connection Pooling 🔴

Applications should not normally create a completely new database connection for every operation.

Instead:

```text
Request 1 ──┐
Request 2 ──┤
Request 3 ──┤
            ↓
    Connection Pool
       │    │    │
       ↓    ↓    ↓
      DB1  DB2  DB3
            ↓
         MySQL
```

Key concepts:

- Connection reuse
- Connection limits
- Waiting queues
- Performance
- Resource management

---

## 08 — Error Handling

Database operations can fail.

Examples include:

```text
Connection failure
Authentication failure
Database not found
SQL syntax error
Constraint violation
Network error
```

Applications must understand:

```text
Try
 ↓
Database Operation
 ↓
Success → Continue

Failure → Catch Error
        ↓
        Handle Safely
```

---

## 09 — Transactions 🔴

Transactions ensure multiple related operations succeed or fail together.

```text
START TRANSACTION
        ↓
Operation 1
        ↓
Operation 2
        ↓
Operation 3
        ↓
All Successful?
   │            │
  YES           NO
   ↓             ↓
COMMIT       ROLLBACK
```

Transactions are important for:

- Payments
- Orders
- Inventory
- Banking systems
- Multi-step database operations

---

# 🔴 MUST MASTER

The highest-priority concepts in this phase are:

```text
mysql2
Database connections
Async/await
SELECT queries
INSERT operations
UPDATE operations
DELETE operations
Parameterized queries
SQL injection prevention
Connection pooling
Error handling
Transactions
Database result handling
```

---

# 🟡 SHOULD KNOW

These concepts should be understood after mastering the fundamentals:

```text
Connection lifecycle
Query metadata
Database configuration
Environment variables
Pool configuration
Database error codes
Query optimization
EXPLAIN
Repository pattern
Database migrations
```

---

# 🟢 NICE TO KNOW

These concepts are valuable but not required for the first database-driven application:

```text
Replication
Sharding
Partitioning
Database clustering
Advanced MySQL internals
Distributed transactions
```

---

# 🔐 Environment Configuration

Database credentials should not be hard-coded into application source code.

Instead of:

```js
password: "my-secret-password";
```

Use environment variables.

Example:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=ai_learning
```

The actual `.env` file should not be committed to Git.

Instead, commit:

```text
.env.example
```

This allows other developers to understand the required configuration without exposing secrets.

---

# 🧠 Core Data Flow

A typical database operation follows this flow:

```text
JavaScript Code
       ↓
await pool.execute()
       ↓
mysql2 Driver
       ↓
MySQL Protocol
       ↓
Network Connection
       ↓
MySQL Server
       ↓
SQL Parser
       ↓
Query Execution
       ↓
Database Storage
       ↓
Result
       ↓
mysql2
       ↓
JavaScript
```

Understanding this flow is more valuable than simply memorizing the driver API.

---

# 🚀 From MySQL to Full-Stack Development

This phase is part of a larger backend and full-stack learning journey.

```text
Node.js Runtime
       ↓
HTTP
       ↓
npm
       ↓
Express
       ↓
MySQL
       ↓
Express + MySQL
       ↓
REST API
       ↓
Authentication
       ↓
React
       ↓
Full-Stack Application
```

The next major integration is:

```text
Client
   ↓
HTTP Request
   ↓
Express
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL
```

---

# 🛠️ Technologies

This phase uses:

- Node.js
- MySQL
- SQL
- npm
- mysql2
- JavaScript ES Modules

---

# 📚 Engineering Principle

> Do not memorize database commands in isolation.

Instead, understand:

```text
WHAT happens?
      ↓
WHY does it happen?
      ↓
HOW does the application communicate with MySQL?
      ↓
WHAT happens internally?
      ↓
HOW should failures be handled?
      ↓
HOW does the design scale?
```

The objective is to develop the ability to:

- Design database interactions
- Debug database connection problems
- Write safe SQL queries
- Understand asynchronous database operations
- Manage database connections efficiently
- Build production-oriented backend systems

---

# 🎯 Final Outcome

By the end of this phase, the goal is to confidently explain and build:

```text
Node.js Application
        ↓
MySQL Driver
        ↓
Connection Pool
        ↓
Parameterized SQL Query
        ↓
MySQL
        ↓
Rows / Results
        ↓
JavaScript
```

The next step is to combine these database skills with Express to build complete database-driven APIs.
