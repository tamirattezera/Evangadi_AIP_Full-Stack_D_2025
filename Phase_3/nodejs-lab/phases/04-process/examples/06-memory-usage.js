// ==========================================================
// NODE.JS PROCESS MODULE
// MEMORY USAGE
// ==========================================================
//
// Purpose:
// Inspect memory currently used by the Node.js process.
//
// This is useful for understanding:
//
// - JavaScript heap usage
// - Process memory consumption
// - External memory
// - Buffer-related memory
// - Runtime performance
//
// ==========================================================

// ==========================================================
// 1. MEMORY CONVERSION HELPER
// ==========================================================
//
// process.memoryUsage() returns memory values in bytes.
//
// Convert bytes → megabytes for human-readable output.
//
// ==========================================================

function bytesToMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

// ==========================================================
// 2. READ PROCESS MEMORY
// ==========================================================

const memory = process.memoryUsage();

// ==========================================================
// 3. BUILD MEMORY REPORT
// ==========================================================

const memoryReport = {
  rssMB: bytesToMB(memory.rss),
  heapTotalMB: bytesToMB(memory.heapTotal),
  heapUsedMB: bytesToMB(memory.heapUsed),
  externalMB: bytesToMB(memory.external),
  arrayBuffersMB: bytesToMB(memory.arrayBuffers),
};

// ==========================================================
// 4. DISPLAY MEMORY REPORT
// ==========================================================

console.log("========================================");

console.log(" NODE.JS MEMORY USAGE ");

console.log("========================================");

console.table(memoryReport);

console.log("========================================");
