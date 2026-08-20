// ==========================================================
// NODE.JS FILE SYSTEM MODULE
// ASYNCHRONOUS FILE READING
// ==========================================================
//
// Purpose:
//
// Learn how to read a file asynchronously using:
//
// fs/promises
// readFile()
// async / await
// try...catch
//
// Key concepts:
//
// - Promise-based File System API
// - readFile()
// - async
// - await
// - try...catch
// - non-blocking execution
//
// ==========================================================

import fs from "fs/promises";

// ==========================================================
// 1. DEFINE FILE PATH
// ==========================================================

const filePath = "../resources/sample.txt";

// ==========================================================
// 2. CREATE ASYNCHRONOUS FUNCTION
// ==========================================================

async function readFileAsync() {
  try {
    // ======================================================
    // 3. READ FILE ASYNCHRONOUSLY
    // ======================================================
    //
    // await pauses this async function until the Promise
    // resolves, but it does NOT block the Node.js event loop
    // in the same way a synchronous file operation does.
    //
    // "utf8" converts the file bytes into a string.
    //
    // ======================================================

    const fileContent = await fs.readFile(filePath, "utf8");

    // ======================================================
    // 4. DISPLAY RESULT
    // ======================================================

    console.log("========================================");
    console.log(" ASYNCHRONOUS FILE READING ");
    console.log("========================================");

    console.log("File:", filePath);

    console.log("\nContent:");
    console.log(fileContent);

    console.log("========================================");
  } catch (error) {
    // ======================================================
    // 5. HANDLE FILE SYSTEM ERROR
    // ======================================================

    console.error("Failed to read file.");

    console.error("Error:", error.message);
  }
}

// ==========================================================
// 6. EXECUTE FUNCTION
// ==========================================================

readFileAsync();
