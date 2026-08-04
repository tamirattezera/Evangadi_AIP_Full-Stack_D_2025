// ==========================================================
// NODE.JS OS MODULE
// USER ENVIRONMENT
// ==========================================================
//
// Purpose:
// Learn how to retrieve information about the current
// operating system user and important directories.
//
// This information is commonly used in:
//
// • AI assistants
// • File managers
// • Desktop applications
// • Upload systems
// • Temporary file processing
//
// ==========================================================

import os from "os";

// ==========================================================
// Retrieve information about the current OS user
// ==========================================================

const currentUser = os.userInfo();

// ==========================================================
// Build environment report
// ==========================================================

const environmentInformation = {
  // Username of the currently logged-in OS user
  username: currentUser.username,

  // User ID (Linux/macOS)
  uid: currentUser.uid,

  // Group ID (Linux/macOS)
  gid: currentUser.gid,

  // User's default home directory
  homeDirectory: os.homedir(),

  // Default shell (Linux/macOS)
  shell: currentUser.shell,

  // Temporary directory used by the operating system
  temporaryDirectory: os.tmpdir(),
};

// ==========================================================
// Display Report
// ==========================================================

console.log("=========================================");
console.log(" USER ENVIRONMENT REPORT");
console.log("=========================================");

console.log("\nUsername:");
console.log(environmentInformation.username);

console.log("\nUser ID:");
console.log(environmentInformation.uid);

console.log("\nGroup ID:");
console.log(environmentInformation.gid);

console.log("\nHome Directory:");
console.log(environmentInformation.homeDirectory);

console.log("\nShell:");
console.log(environmentInformation.shell);

console.log("\nTemporary Directory:");
console.log(environmentInformation.temporaryDirectory);

console.log("\n=========================================");
console.log(" END OF REPORT");
console.log("=========================================");
