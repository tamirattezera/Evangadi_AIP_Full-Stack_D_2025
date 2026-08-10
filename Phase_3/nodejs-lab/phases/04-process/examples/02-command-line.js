// ==========================================================
// NODE.JS PROCESS MODULE
// LESSON 02 — COMMAND-LINE ARGUMENTS
// ==========================================================
//
// Purpose:
// Learn how a Node.js process receives user input from
// the terminal through process.argv.
//
// Example:
//
// node 02-command-line.js Tamirat 963 AI-Engineer Ethiopia
//
// process.argv provides the values as strings.
//
// ==========================================================

// ==========================================================
// 1. READ COMMAND-LINE INPUT
// ==========================================================
//
// process.argv is an array.
//
// Index 0 → Node.js executable
// Index 1 → Current JavaScript file
// Index 2 → First user argument
// Index 3 → Second user argument
// Index 4 → Third user argument
// Index 5 → Fourth user argument
//
// ==========================================================

const name = process.argv[2];

const id = process.argv[3];

const role = process.argv[4];

const country = process.argv[5];

// ==========================================================
// 2. BUILD STRUCTURED USER INPUT
// ==========================================================
//
// At this stage, the values are intentionally kept as
// strings.
//
// Example:
//
// id → "963"
//
// We will learn type conversion and validation later.
//
// ==========================================================

const userInput = {
  name,
  id,
  role,
  country,
};

// ==========================================================
// 3. DISPLAY RESULT
// ==========================================================

console.log("========================================");

console.log(" COMMAND-LINE USER INPUT ");

console.log("========================================");

console.table(userInput);

console.log("========================================");
