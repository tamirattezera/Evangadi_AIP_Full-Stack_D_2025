// ==========================================================
// PATH ANALYSIS
// basename()
// dirname()
// extname()
// ==========================================================

import path from "path";

// Sample file path
const filePath = path.join("uploads", "images", "avatar.png");

console.log("==================================");
console.log("FILE ANALYSIS");
console.log("==================================");

console.log("Original Path:");
console.log(filePath);

console.log("\nDirectory:");
console.log(path.dirname(filePath));

console.log("\nFile Name:");
console.log(path.basename(filePath));

console.log("\nExtension:");
console.log(path.extname(filePath));

const file = path.join("uploads", "documents", "resume.pdf");

const metadata = {
  fullPath: file,
  directory: path.dirname(file),
  fileName: path.basename(file),
  extension: path.extname(file),
};

console.table(metadata);

console.log("\n==================================");
