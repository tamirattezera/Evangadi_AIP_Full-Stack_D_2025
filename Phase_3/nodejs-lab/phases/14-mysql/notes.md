# Phase 14 — MySQL + Node.js Notes

> Personal engineering notes for understanding how Node.js applications communicate with MySQL.

---

# 1. Core Mental Model

MySQL and Node.js are separate systems.

```text
Node.js Application
        │
        │ Network Communication
        ↓
MySQL Server
        │
        ↓
Database
        │
        ↓
Tables
```

Node.js does not directly access database files.

Instead, it communicates with the MySQL server through a database driver.

---

# 2. MySQL vs mysql2

## MySQL

MySQL is the database management system.

It is responsible for:

- Storing data
- Executing SQL queries
- Managing databases
- Managing tables
- Managing transactions
- Enforcing constraints
- Returning query results

Conceptually:

```text
MySQL Server
    │
    ├── Database
    │      ├── Table
    │      ├── Table
    │      └── Table
    │
    └── Executes SQL
```

## mysql2

`mysql2` is a Node.js driver.

It allows JavaScript applications to communicate with MySQL.

```text
Node.js
   ↓
mysql2
   ↓
MySQL Protocol
   ↓
MySQL Server
```

### Important distinction

> **MySQL stores and manages data. mysql2 helps a Node.js application communicate with MySQL.**

---

# 3. Database Connection

Before Node.js can execute SQL, it must establish a connection with the MySQL server.

Conceptually:

```text
Node.js Process
      │
      │ TCP Connection
      ↓
MySQL Server
      │
      ↓
Authentication
      │
      ↓
Database Session
```

A connection usually requires:

```text
host
port
user
password
database
```

Example configuration:

```js
{
  host: "localhost",
  user: "root",
  password: "...",
  database: "ai_learning"
}
```

---

# 4. What `localhost` Means

```text
localhost
```

means the MySQL server is running on the same machine as the application.

Conceptually:

```text
Node.js
   │
   │ localhost
   ↓
MySQL Server
```

A production application may connect to a different server:

```text
Node.js Server
        │
        │ Network
        ↓
Database Server
```

---

# 5. Default MySQL Port

MySQL commonly listens on:

```text
3306
```

The complete conceptual destination can be:

```text
localhost:3306
```

Meaning:

```text
Machine
    +
Port
    ↓
Specific MySQL Service
```

---

# 6. `createConnection()`

Example:

```js
const connection = await mysql.createConnection(config);
```

This means:

```text
Node.js
    │
    │ Ask mysql2 to connect
    ↓
mysql2
    │
    │ Open connection
    ↓
MySQL Server
    │
    │ Authenticate
    ↓
Connection Established
```

The returned `connection` object represents an active database connection.

---

# 7. Why `await` Is Used

Connecting to MySQL takes time.

Node.js must:

```text
Create network connection
        ↓
Communicate with MySQL
        ↓
Authenticate
        ↓
Wait for response
```

This operation is asynchronous.

Therefore:

```js
await mysql.createConnection(...)
```

means:

> Pause this asynchronous flow until the connection attempt succeeds or fails.

Important:

> `await` does not block the entire Node.js runtime. It waits within the current asynchronous operation.

---

# 8. Promise-Based API

Importing:

```js
import mysql from "mysql2/promise";
```

provides Promise-based methods.

This allows:

```js
const connection = await mysql.createConnection(config);
```

Instead of callback-based code.

Mental model:

```text
Start Database Operation
        ↓
Promise
        ↓
Wait with await
        ↓
Success → Result

Failure → Error
```

---

# 9. Executing SQL

A Node.js application sends SQL to the MySQL server.

Example:

```js
const [rows] = await connection.execute("SELECT * FROM users");
```

Data flow:

```text
JavaScript
    ↓
SQL Query
    ↓
mysql2
    ↓
MySQL Server
    ↓
Query Execution
    ↓
Database
    ↓
Rows
    ↓
mysql2
    ↓
JavaScript
```

---

# 10. Understanding `[rows]`

Many database driver operations return multiple pieces of information.

Conceptually:

```text
[
  rows,
  metadata
]
```

Therefore:

```js
const [rows] = await connection.execute(...);
```

uses JavaScript array destructuring.

Meaning:

> Extract the first returned value and store it in the `rows` variable.

Example:

```js
const [rows, fields] = await connection.execute("SELECT * FROM users");
```

For many `SELECT` queries:

```text
rows
```

contains the actual database records.

---

# 11. Parameterized Queries 🔴

Dynamic values should not be directly inserted into SQL strings.

Unsafe approach:

```js
const sql = `
  SELECT * FROM users
  WHERE id = ${userId}
`;
```

Safer approach:

```js
const [rows] = await connection.execute("SELECT * FROM users WHERE id = ?", [
  userId,
]);
```

Conceptually:

```text
SQL Structure
       +
Parameters
       ↓
mysql2
       ↓
Safe Binding
       ↓
MySQL
```

### Why this matters

Parameterized queries help prevent SQL injection.

🔴 **Never trust external input as part of SQL syntax.**

---

# 12. CRUD From Node.js

CRUD represents the basic database operations.

```text
CREATE
READ
UPDATE
DELETE
```

## CREATE

```text
Application Data
       ↓
INSERT
       ↓
MySQL
       ↓
New Row
```

## READ

```text
Application
       ↓
SELECT
       ↓
MySQL
       ↓
Rows
```

## UPDATE

```text
Existing Row
       ↓
UPDATE
       ↓
Modified Row
```

## DELETE

```text
Existing Row
       ↓
DELETE
       ↓
Removed Row
```

---

# 13. Database Results

A database operation may return more than just rows.

For example, an `INSERT` operation can provide information such as:

```text
insertId
affectedRows
warningStatus
```

An `UPDATE` operation can provide:

```text
affectedRows
changedRows
```

An application should inspect results rather than automatically assuming an operation succeeded exactly as expected.

---

# 14. Connection Lifecycle

A simple database connection has a lifecycle:

```text
Create Connection
        ↓
Authenticate
        ↓
Execute Query
        ↓
Receive Result
        ↓
Close Connection
```

Example:

```js
const connection = await mysql.createConnection(config);

// Execute queries

await connection.end();
```

A connection consumes resources.

Therefore:

> Connections should be managed intentionally.

---

# 15. Connection Pooling 🔴

Creating a new database connection repeatedly can be inefficient.

Without a pool:

```text
Request 1
    ↓
Create Connection
    ↓
Query
    ↓
Close

Request 2
    ↓
Create Connection
    ↓
Query
    ↓
Close
```

With a connection pool:

```text
                 Requests
             ↙      ↓      ↘
        Connection Pool
          ↙      ↓      ↘
        C1       C2       C3
          \      |      /
                ↓
             MySQL
```

The pool manages reusable database connections.

Benefits:

- Connection reuse
- Better performance
- Controlled resource usage
- Connection limits
- Request queueing

---

# 16. Pool vs Connection

## Single Connection

Useful for:

```text
Scripts
Small examples
CLI tools
One-time database operations
```

## Connection Pool

Useful for:

```text
Web applications
Express APIs
Multiple concurrent requests
Production systems
```

---

# 17. Error Handling

Database operations can fail for many reasons.

Examples:

```text
Wrong password
Database unavailable
Invalid SQL
Constraint violation
Connection refused
Database does not exist
Network failure
```

Conceptual flow:

```text
try
 │
 ↓
Database Operation
 │
 ├── Success → Continue
 │
 └── Failure → catch
                   ↓
              Handle Error
```

Example:

```js
try {
  const [rows] = await connection.execute("SELECT * FROM users");

  console.log(rows);
} catch (error) {
  console.error("Database error:", error.message);
}
```

Errors should be understood rather than ignored.

---

# 18. Common Database Errors

## `ER_ACCESS_DENIED_ERROR`

Conceptually:

```text
Node reached MySQL
       ↓
Authentication failed
```

Possible causes:

- Incorrect username
- Incorrect password
- Missing permissions

---

## `ECONNREFUSED`

Conceptually:

```text
Node
  ↓
Connection Attempt
  ↓
❌ Connection Refused
```

Possible causes:

- MySQL server is not running
- Incorrect host
- Incorrect port
- Network configuration problem

---

## `ER_BAD_DB_ERROR`

Conceptually:

```text
Connection Established
       ↓
Authentication Successful
       ↓
❌ Requested database does not exist
```

---

# 19. Environment Variables

Database credentials should not be hard-coded into application source code.

Bad:

```js
password: "my-secret-password";
```

Better:

```text
Environment
      ↓
Configuration
      ↓
Database Connection
```

Example environment variables:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=ai_learning
```

Important:

```text
.env
   ↓
Do not commit

.env.example
   ↓
Safe to commit
```

---

# 20. Transactions 🔴

A transaction groups multiple database operations into one logical unit.

```text
START TRANSACTION
        ↓
Operation 1
        ↓
Operation 2
        ↓
Operation 3
        ↓
Success?
   │          │
  YES         NO
   ↓           ↓
COMMIT      ROLLBACK
```

Transactions are necessary when multiple operations must remain consistent.

Example:

```text
Create Order
      ↓
Reduce Product Inventory
      ↓
Create Payment Record
```

If one operation fails:

```text
ROLLBACK
```

This helps prevent partially completed operations.

---

# 21. Core Request Flow

Eventually, a full backend application may work like this:

```text
Client
   ↓
HTTP Request
   ↓
Express Route
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
mysql2
   ↓
MySQL
```

The result returns:

```text
MySQL
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
HTTP Response
   ↓
Client
```

---

# 22. Engineering Principles

## Principle 1

> Understand the communication flow, not just the API.

## Principle 2

> Never build SQL by directly concatenating untrusted input.

## Principle 3

> Database connections are limited resources.

## Principle 4

> Use connection pools for server applications.

## Principle 5

> A successful SQL command does not always mean the intended data changed.

## Principle 6

> Errors contain information. Read them before changing random code.

## Principle 7

> Transactions protect consistency across related operations.

---

# 23. Final Mental Model

```text
┌───────────────────────────┐
│    Node.js Application    │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│       mysql2 Driver       │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│ Connection / Pool Manager │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│       MySQL Server        │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│          Database         │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│           Tables          │
└───────────────────────────┘
```

The goal of this phase is not simply:

> "I know how to execute SQL from Node.js."

The real goal is:

> **I understand how a Node.js application safely communicates with a MySQL database, manages connections, handles failures, and builds reliable data-driven systems.**
