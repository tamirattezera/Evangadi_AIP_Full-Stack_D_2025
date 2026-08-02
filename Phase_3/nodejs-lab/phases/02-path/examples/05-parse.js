// ==========================================================
// PATH.PARSE() & PATH.FORMAT()
// ----------------------------------------------------------
// Learn how to:
// 1. Break a file path into its components.
// 2. Read file metadata.
// 3. Modify file information.
// 4. Rebuild a new file path.
// ----------------------------------------------------------
// Real-world use cases:
// • AI document processing
// • Image generation
// • PDF processing
// • File upload systems
// • Video rendering pipelines
// ==========================================================

import path from "path";

// ==========================================================
// STEP 1: Create a file path
// ==========================================================

const originalFilePath = path.join("uploads", "documents", "resume.pdf");

console.log("\n========================================");
console.log(" ORIGINAL FILE PATH");
console.log("========================================");

console.log(originalFilePath);

// ==========================================================
// STEP 2: Parse the file path
// ----------------------------------------------------------
// path.parse() separates the path into useful pieces.
// ==========================================================

const fileInfo = path.parse(originalFilePath);

console.log("\n========================================");
console.log(" PARSED FILE INFORMATION");
console.log("========================================");

console.table(fileInfo);

/*
fileInfo contains:

{
  root : "",
  dir  : "uploads/documents",
  base : "resume.pdf",
  ext  : ".pdf",
  name : "resume"
}
*/

// ==========================================================
// STEP 3: Simulate AI Processing
// ----------------------------------------------------------
// Imagine an AI summarizes the uploaded document.
//
// resume.pdf
//
// becomes
//
// resume-summary.pdf
// ==========================================================

fileInfo.name = `${fileInfo.name}-summary`;

console.log("\n========================================");
console.log(" UPDATED FILE INFORMATION");
console.log("========================================");

console.table(fileInfo);

// ==========================================================
// STEP 4: Rebuild the path
// ----------------------------------------------------------
// path.format() converts the object back into a path.
// ==========================================================

const processedFilePath = path.format(fileInfo);

console.log("\n========================================");
console.log(" NEW FILE PATH");
console.log("========================================");

console.log(processedFilePath);

// ==========================================================
// STEP 5: Production Example
// ==========================================================

const processedDocument = {
  original: originalFilePath,
  processed: processedFilePath,
  extension: fileInfo.ext,
  directory: fileInfo.dir,
};

console.log("\n========================================");
console.log(" PROCESSING RESULT");
console.log("========================================");

console.table(processedDocument);

