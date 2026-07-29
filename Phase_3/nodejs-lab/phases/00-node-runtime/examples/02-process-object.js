"use strict";

// ============================================================
// NODE.JS PROCESS OBJECT
// ============================================================
//
// The `process` object is a GLOBAL object provided by Node.js.
//
// It represents the CURRENTLY RUNNING NODE.JS PROCESS.
//
// Think of it as the "control center" of your application.
//
// It allows your program to:
//
// • Know which Node.js version is running
// • Know which operating system it is running on
// • Read command-line arguments
// • Read environment variables
// • Monitor memory usage
// • Monitor CPU usage
// • Get the current working directory
// • Exit the application
// • Listen for process events
//
// IMPORTANT:
//
// `process` is NOT part of JavaScript (ECMAScript).
//
// It is created by the Node.js Runtime BEFORE your code starts
// executing.
//
// ============================================================

// ============================================================
// SECTION 1
// BASIC PROCESS INFORMATION
// ============================================================

console.log("\n==============================");
console.log(" BASIC PROCESS INFORMATION");
console.log("==============================");

// Current Node.js version
console.log("Node Version:");
console.log(process.version);

// Operating system
console.log("\nPlatform:");
console.log(process.platform);

// CPU Architecture
console.log("\nArchitecture:");
console.log(process.arch);

// Process ID assigned by the Operating System
console.log("\nProcess ID:");
console.log(process.pid);

// Parent Process ID
console.log("\nParent Process ID:");
console.log(process.ppid);

// ============================================================
// SECTION 2
// CURRENT EXECUTION
// ============================================================

console.log("\n==============================");
console.log(" EXECUTION INFORMATION");
console.log("==============================");

// Folder where Node was started
console.log("Current Working Directory:");
console.log(process.cwd());

// Absolute path of the Node executable
console.log("\nNode Executable:");
console.log(process.execPath);

// Process title
console.log("\nProcess Title:");
console.log(process.title);

// ============================================================
// SECTION 3
// COMMAND LINE ARGUMENTS
// ============================================================

console.log("\n==============================");
console.log(" COMMAND LINE ARGUMENTS");
console.log("==============================");

// Everything typed after:
//
// node app.js hello world
//
// becomes:
//
// [
//   node path,
//   app.js path,
//   hello,
//   world
// ]

console.log(process.argv);

// ============================================================
// SECTION 4
// ENVIRONMENT VARIABLES
// ============================================================

console.log("\n==============================");
console.log(" ENVIRONMENT VARIABLES");
console.log("==============================");

// Example:
//
// DB_HOST=localhost
// API_KEY=abc123
//
// These values usually come from .env files
// or the operating system.

console.log("PATH:");
console.log(process.env.PATH);

// ============================================================
// SECTION 5
// MEMORY INFORMATION
// ============================================================

console.log("\n==============================");
console.log(" MEMORY USAGE");
console.log("==============================");

// Returns an object describing how much memory
// Node is currently using.

console.log(process.memoryUsage());

// ============================================================
// SECTION 6
// CPU INFORMATION
// ============================================================

console.log("\n==============================");
console.log(" CPU USAGE");
console.log("==============================");

// CPU time consumed by this process

console.log(process.cpuUsage());

// ============================================================
// SECTION 7
// UPTIME
// ============================================================

console.log("\n==============================");
console.log(" PROCESS UPTIME");
console.log("==============================");

// Seconds since the process started

console.log(process.uptime(), "seconds");

// ============================================================
// SECTION 8
// NODE RELEASE INFORMATION
// ============================================================

console.log("\n==============================");
console.log(" NODE RELEASE");
console.log("==============================");

console.log(process.release);

// ============================================================
// SECTION 9
// DEMONSTRATING THAT PROCESS IS GLOBAL
// ============================================================

// Notice:
//
// We never wrote:
//
// import process from "...";
//
// or
//
// const process = ...
//
// Node automatically creates it.
//
// That's why this works immediately.

console.log("\n==============================");
console.log(" GLOBAL OBJECT");
console.log("==============================");

console.log(typeof process);

// ============================================================
// SECTION 10
// FINISHED
// ============================================================

console.log("\n==============================");
console.log(" END OF PROCESS DEMO");
console.log("==============================");
