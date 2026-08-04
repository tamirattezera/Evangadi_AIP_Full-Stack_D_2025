// ==========================================================
// NODE.JS OS MODULE
// CPU & MEMORY INTELLIGENCE
// ==========================================================
//
// Purpose:
// Learn how Node.js collects CPU and memory information
// from the operating system.
//
// Why this matters:
//
// Professional backend applications must understand the
// resources of the machine they are running on.
//
// Examples:
// • AI image generation
// • Chatbot servers
// • SaaS platforms
// • File processing
// • Video rendering
// • Background workers
//
// Before performing heavy work, the backend should know:
//
// ✓ How many CPU cores are available?
// ✓ How much RAM is installed?
// ✓ How much memory is currently free?
//
// ==========================================================

import os from "os";

// ==========================================================
// HELPER FUNCTION
// Convert Bytes → Gigabytes
// ==========================================================
//
// The OS returns memory in bytes.
//
// Example:
//
// 17179869184 bytes
//
// Humans prefer:
//
// 16.00 GB
//
// This helper converts bytes into GB.
//
function bytesToGB(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

// ==========================================================
// CPU INFORMATION
// ==========================================================
//
// os.cpus() returns an ARRAY.
//
// Each element represents one logical CPU core.
//
// Example:
//
// [
//   {
//     model: "...",
//     speed: 2400,
//     times: { ... }
//   },
//   ...
// ]
//
const cpus = os.cpus();

// ==========================================================
// MEMORY INFORMATION
// ==========================================================

const totalMemory = os.totalmem();

const freeMemory = os.freemem();

const usedMemory = totalMemory - freeMemory;

// ==========================================================
// BUILD SYSTEM REPORT
// ==========================================================
//
// Store everything inside one object.
//
// This makes the data easy to:
//
// • return from an API
// • save into a database
// • send to a monitoring dashboard
// • log to a file
//
const systemInformation = {
  // --------------------------------------------------------
  // CPU
  // --------------------------------------------------------

  // CPU manufacturer/model
  cpuModel: cpus[0].model,

  // CPU speed (MHz)
  cpuSpeedMHz: cpus[0].speed,

  // Number of logical processors
  cpuCores: cpus.length,

  // --------------------------------------------------------
  // MEMORY
  // --------------------------------------------------------

  // Installed RAM
  totalMemoryGB: bytesToGB(totalMemory),

  // Currently available RAM
  freeMemoryGB: bytesToGB(freeMemory),

  // RAM currently being used
  usedMemoryGB: bytesToGB(usedMemory),
};

// ==========================================================
// DISPLAY REPORT
// ==========================================================

console.log("==========================================");
console.log(" CPU & MEMORY REPORT");
console.log("==========================================");

console.log("\nCPU INFORMATION");
console.log("------------------------------------------");

console.log("Model:");
console.log(systemInformation.cpuModel);

console.log("\nSpeed:");
console.log(`${systemInformation.cpuSpeedMHz} MHz`);

console.log("\nLogical CPU Cores:");
console.log(systemInformation.cpuCores);

console.log("\nMEMORY INFORMATION");
console.log("------------------------------------------");

console.log("Total Memory:");
console.log(`${systemInformation.totalMemoryGB} GB`);

console.log("\nUsed Memory:");
console.log(`${systemInformation.usedMemoryGB} GB`);

console.log("\nFree Memory:");
console.log(`${systemInformation.freeMemoryGB} GB`);

console.log("\n==========================================");
console.log(" END OF REPORT");
console.log("==========================================");
