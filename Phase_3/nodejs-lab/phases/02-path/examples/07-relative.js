// ==========================================================
// PATH.RELATIVE()
// ----------------------------------------------------------
// Finds the relative path from one location to another.
//
// Useful for:
//
// • Static file references
// • Build tools
// • File synchronization
// • AI asset management
// ==========================================================

import path from "path";

console.log("\n========================================");
console.log(" PATH.RELATIVE()");
console.log("========================================");

// ==========================================================
// Example 1
// ==========================================================

const from = "outputs/thumbnails";

const to = "uploads/images/avatar.png";

console.log("\nFrom:");
console.log(from);

console.log("\nTo:");
console.log(to);

console.log("\nRelative Path:");

console.log(path.relative(from, to));

// ==========================================================
// Example 2
// AI Documents
// ==========================================================

const aiReports = "outputs/reports";

const uploadedFile = "uploads/documents/contract.pdf";

console.log("\nDocument Path:");

console.log(path.relative(aiReports, uploadedFile));

// ==========================================================
// Example 3
// Same Directory
// ==========================================================

console.log("\nSame Folder:");

console.log(path.relative("uploads/images", "uploads/images/avatar.png"));

// ==========================================================
// Example 4
// Project Assets
// ==========================================================

const frontend = "client/src";

const backend = "server/uploads";

console.log("\nFrontend → Backend");

console.log(path.relative(frontend, backend));
