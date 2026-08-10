// ==========================================================
// NODE.JS PROCESS MODULE
// PROCESS INFORMATION
// ==========================================================
//
// Purpose:
//
// Understand information about the currently running
// Node.js application process.
//
// Topics:
//
// process.pid
// process.version
// process.platform
// process.arch
// process.title
//
// ==========================================================

// Process ID
const processId = process.pid;

// Node.js version
const nodeVersion = process.version;

// Operating platform
const platform = process.platform;

// CPU architecture
const architecture = process.arch;

// Current process title
const title = process.title;

// Create report

const processInformation = {
  processId,

  nodeVersion,

  platform,

  architecture,

  title,
};

// Display result

console.log("================================");
console.log(" NODE PROCESS INFORMATION ");
console.log("================================");

console.table(processInformation);

console.log("================================");
