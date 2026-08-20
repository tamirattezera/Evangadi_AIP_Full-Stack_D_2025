// ==========================================================
// NODE.JS FILE SYSTEM MODULE
// SYNCHRONOUS FILE READING
// ==========================================================
//
// Purpose:
//
// Learn how to read a file synchronously using:
//
// fs.readFileSync()
//
// Key concepts:
//
// - fs module
// - readFileSync()
// - UTF-8 encoding
// - try...catch
// - synchronous execution
//
// ==========================================================

import fs from "fs";

// ==========================================================
// 1. DEFINE FILE PATH
// ==========================================================

const filePath = "../resources/sample.txt";

// ==========================================================
// 2. READ FILE SYNCHRONOUSLY
// ==========================================================
//
// readFileSync() blocks execution until the file has
// been completely read.
//
// The "utf8" encoding tells Node.js to return a string
// instead of a Buffer.
//
// ==========================================================

try {
  const fileContent = fs.readFileSync(filePath, "utf8");

  // ========================================================
  // 3. DISPLAY RESULT
  // ========================================================

  console.log("========================================");
  console.log(" SYNCHRONOUS FILE READING ");
  console.log("========================================");

  console.log("File:", filePath);

  console.log("\nContent:");
  console.log(fileContent);

  console.log("========================================");
} catch (error) {
  // ========================================================
  // 4. HANDLE FILE SYSTEM ERROR
  // ========================================================

  console.error("Failed to read file.");

  console.error("Error:", error.message);
}
