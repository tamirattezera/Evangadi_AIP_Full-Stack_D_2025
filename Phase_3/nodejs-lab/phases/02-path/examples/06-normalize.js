// ==========================================================
// PATH.NORMALIZE()
// ----------------------------------------------------------
// Cleans messy paths by:
//
// • Removing duplicate separators
// • Resolving "." (current directory)
// • Resolving ".." (parent directory)
// • Using the correct separator for the OS
// ==========================================================

import path from "path";

console.log("\n========================================");
console.log(" PATH.NORMALIZE()");
console.log("========================================");

// ==========================================================
// Example 1
// ==========================================================

const messyImagePath = "uploads//images///avatar.png";

console.log("\nOriginal:");
console.log(messyImagePath);

console.log("\nNormalized:");
console.log(path.normalize(messyImagePath));

// ==========================================================
// Example 2
// ==========================================================

const documentPath = "uploads/images/../documents/./resume.pdf";

console.log("\nOriginal:");
console.log(documentPath);

console.log("\nNormalized:");
console.log(path.normalize(documentPath));

// ==========================================================
// Example 3
// AI Generated Images
// ==========================================================

const aiOutput = "outputs//images/../images/generated///cat.png";

console.log("\nAI Output:");
console.log(aiOutput);

console.log("\nNormalized:");
console.log(path.normalize(aiOutput));

// ==========================================================
// Example 4
// Cache Directory
// ==========================================================

const cachePath = "./cache/./embeddings//../vectors/result.json";

console.log("\nCache:");

console.log(cachePath);

console.log("\nNormalized:");

console.log(path.normalize(cachePath));
