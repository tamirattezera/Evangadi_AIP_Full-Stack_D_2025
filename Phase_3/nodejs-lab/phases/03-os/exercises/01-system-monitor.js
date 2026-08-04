// ==========================================================
// NODE.JS OS MODULE
// SYSTEM MONITOR
// ==========================================================
//
// Purpose:
// Build a simple system monitoring application using the
// Node.js built-in OS module.
//
// This example combines everything learned in Phase 03.
//
// Topics Covered:
//
// ✓ Operating System Information
// ✓ CPU Information
// ✓ Memory Information
// ✓ Current User
// ✓ Home Directory
// ✓ Temporary Directory
// ✓ System Uptime
// ✓ Network Interfaces
// ✓ Basic System Health Check
//
// Real-world Uses:
//
// • Backend server monitoring
// • AI application diagnostics
// • Health check endpoints
// • DevOps dashboards
// • Cloud deployments
//
// ==========================================================

import os from "os";

// ==========================================================
// HELPER FUNCTION
// Convert Bytes → Gigabytes
// ==========================================================

function bytesToGB(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

// ==========================================================
// HELPER FUNCTION
// Convert Seconds → Hours Minutes Seconds
// ==========================================================

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

// ==========================================================
// COLLECT OPERATING SYSTEM INFORMATION
// ==========================================================

const currentUser = os.userInfo();
const cpus = os.cpus();

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const usedMemory = totalMemory - freeMemory;

const networkInterfaces = Object.keys(os.networkInterfaces());

// ==========================================================
// SIMPLE SYSTEM HEALTH CHECK
// ==========================================================
//
// This is a very simple example.
//
// If at least 2 GB of RAM is free,
// we consider the machine healthy.
//

const freeMemoryGB = Number(bytesToGB(freeMemory));

let systemStatus;

if (freeMemoryGB >= 2) {
  systemStatus = "Healthy";
} else {
  systemStatus = "Low Memory";
}

// ==========================================================
// BUILD SYSTEM REPORT
// ==========================================================

const systemReport = {
  // --------------------------------------------------------
  // Operating System
  // --------------------------------------------------------

  operatingSystem: os.type(),
  platform: os.platform(),
  architecture: os.arch(),
  release: os.release(),
  hostname: os.hostname(),

  // --------------------------------------------------------
  // CPU
  // --------------------------------------------------------

  cpuModel: cpus[0].model,
  cpuSpeedMHz: cpus[0].speed,
  cpuCores: cpus.length,

  // --------------------------------------------------------
  // Memory
  // --------------------------------------------------------

  totalMemoryGB: bytesToGB(totalMemory),
  usedMemoryGB: bytesToGB(usedMemory),
  freeMemoryGB: bytesToGB(freeMemory),

  // --------------------------------------------------------
  // User
  // --------------------------------------------------------

  username: currentUser.username,
  homeDirectory: os.homedir(),
  temporaryDirectory: os.tmpdir(),

  // --------------------------------------------------------
  // System Health
  // --------------------------------------------------------

  uptime: formatUptime(os.uptime()),
  networkInterfaces,
  systemStatus,
};

// ==========================================================
// DISPLAY REPORT
// ==========================================================

console.log("====================================================");
console.log("           NODE.JS SYSTEM MONITOR");
console.log("====================================================");

// ==========================================================
// OPERATING SYSTEM
// ==========================================================

console.log("\nOPERATING SYSTEM");
console.log("----------------------------------------------------");

console.log("Hostname:");
console.log(systemReport.hostname);

console.log("\nOperating System:");
console.log(systemReport.operatingSystem);

console.log("\nPlatform:");
console.log(systemReport.platform);

console.log("\nArchitecture:");
console.log(systemReport.architecture);

console.log("\nRelease:");
console.log(systemReport.release);

// ==========================================================
// CPU
// ==========================================================

console.log("\nCPU INFORMATION");
console.log("----------------------------------------------------");

console.log("CPU Model:");
console.log(systemReport.cpuModel);

console.log("\nCPU Speed:");
console.log(`${systemReport.cpuSpeedMHz} MHz`);

console.log("\nLogical CPU Cores:");
console.log(systemReport.cpuCores);

// ==========================================================
// MEMORY
// ==========================================================

console.log("\nMEMORY INFORMATION");
console.log("----------------------------------------------------");

console.log("Total Memory:");
console.log(`${systemReport.totalMemoryGB} GB`);

console.log("\nUsed Memory:");
console.log(`${systemReport.usedMemoryGB} GB`);

console.log("\nFree Memory:");
console.log(`${systemReport.freeMemoryGB} GB`);

// ==========================================================
// USER
// ==========================================================

console.log("\nUSER INFORMATION");
console.log("----------------------------------------------------");

console.log("Username:");
console.log(systemReport.username);

console.log("\nHome Directory:");
console.log(systemReport.homeDirectory);

console.log("\nTemporary Directory:");
console.log(systemReport.temporaryDirectory);

// ==========================================================
// SYSTEM HEALTH
// ==========================================================

console.log("\nSYSTEM HEALTH");
console.log("----------------------------------------------------");

console.log("System Uptime:");
console.log(systemReport.uptime);

console.log("\nNetwork Interfaces:");

systemReport.networkInterfaces.forEach((network, index) => {
  console.log(`${index + 1}. ${network}`);
});

console.log("\nHealth Status:");

if (systemReport.systemStatus === "Healthy") {
  console.log("✅ Healthy");
} else {
  console.log("⚠️ Low Memory");
}

console.log("\n====================================================");
console.log("           END OF SYSTEM REPORT");
console.log("====================================================");
