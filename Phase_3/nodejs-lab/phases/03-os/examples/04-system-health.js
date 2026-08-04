// ==========================================================
// NODE.JS OS MODULE
// SYSTEM HEALTH REPORT
// ==========================================================
//
// Purpose:
// Learn how to monitor the health of the operating system.
//
// This lesson demonstrates:
//
// • os.uptime()
// • os.hostname()
// • os.platform()
// • os.networkInterfaces()
//
// Professional backend applications use this information for:
//
// • Health checks
// • Monitoring dashboards
// • Server diagnostics
// • Cloud deployments
// • AI infrastructure monitoring
//
// ==========================================================

import os from "os";

// ==========================================================
// HELPER FUNCTION
// Convert seconds into:
// Hours Minutes Seconds
// ==========================================================
//
// Node.js returns uptime in seconds.
//
// Example:
//
// 7265
//
// becomes
//
// 2h 1m 5s
//
// ==========================================================

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);

  const minutes = Math.floor((seconds % 3600) / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

// ==========================================================
// SYSTEM INFORMATION
// ==========================================================

const uptime = os.uptime();

const hostname = os.hostname();

const platform = os.platform();

const networkInterfaces = os.networkInterfaces();

// ==========================================================
// AVAILABLE NETWORK INTERFACES
// ==========================================================
//
// os.networkInterfaces() returns an object.
//
// We only want the interface names.
//
// Example:
//
// {
//     lo: [...],
//     eth0: [...],
//     wlan0: [...]
// }
//
// becomes:
//
// ["lo", "eth0", "wlan0"]
//
// ==========================================================

const interfaceNames = Object.keys(networkInterfaces);

// ==========================================================
// BUILD HEALTH REPORT
// ==========================================================

const systemHealth = {
  hostname,

  platform,

  uptime: formatUptime(uptime),

  networkInterfaces: interfaceNames,
};

// ==========================================================
// DISPLAY REPORT
// ==========================================================

console.log("==========================================");
console.log(" SYSTEM HEALTH REPORT");
console.log("==========================================");

console.log("\nHostname:");
console.log(systemHealth.hostname);

console.log("\nPlatform:");
console.log(systemHealth.platform);

console.log("\nSystem Uptime:");
console.log(systemHealth.uptime);

console.log("\nAvailable Network Interfaces:");
systemHealth.networkInterfaces.forEach((network, index) => {
  console.log(`${index + 1}. ${network}`);
});

console.log("\n==========================================");
console.log(" END OF REPORT");
console.log("==========================================");
