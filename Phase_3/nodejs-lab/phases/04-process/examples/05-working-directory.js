// ==========================================================
// NODE.JS PROCESS MODULE
// CURRENT WORKING DIRECTORY
// ==========================================================
//
// Purpose:
// Understand the difference between:
//
// 1. process.cwd()
//    → Directory from which Node.js was launched.
//
// 2. process.argv[1]
//    → Path of the JavaScript file being executed.
//
// These are NOT necessarily the same location.
//
// ==========================================================

import path from "path";

// ==========================================================
// 1. CURRENT WORKING DIRECTORY
// ==========================================================
//
// This depends on where the `node` command was executed.
//
// ==========================================================

const workingDirectory = process.cwd();

// ==========================================================
// 2. SCRIPT PATH
// ==========================================================
//
// process.argv[1] contains the path to the JavaScript
// file currently being executed.
//
// ==========================================================

const scriptPath = process.argv[1];

// ==========================================================
// 3. SCRIPT DIRECTORY
// ==========================================================
//
// Use the path module to extract the directory containing
// the JavaScript file.
//
// ==========================================================

const scriptDirectory = path.dirname(scriptPath);

// ==========================================================
// 4. BUILD PROCESS LOCATION REPORT
// ==========================================================

const processLocation = {
  workingDirectory,
  scriptPath,
  scriptDirectory,
};

// ==========================================================
// 5. DISPLAY RESULT
// ==========================================================

console.log("========================================");

console.log(" PROCESS LOCATION ");

console.log("========================================");

console.table(processLocation);

console.log("========================================");
