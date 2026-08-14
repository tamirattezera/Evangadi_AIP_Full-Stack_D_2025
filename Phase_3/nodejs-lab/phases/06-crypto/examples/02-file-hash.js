// ==========================================================
// NODE.JS CRYPTO MODULE
// FILE HASHING & INTEGRITY
// ==========================================================
//
// Purpose:
//
// Generate a SHA-256 cryptographic hash from a real file.
//
// Flow:
//
// File
//   ↓
// fs.readFileSync()
//   ↓
// Buffer
//   ↓
// SHA-256
//   ↓
// Hexadecimal Digest
//   ↓
// File Fingerprint
//
// ==========================================================

import fs from "fs";
import crypto from "crypto";

// ==========================================================
// 1. FILE CONFIGURATION
// ==========================================================

const fileName = "sample.txt";
const algorithm = "sha256";

// ==========================================================
// 2. READ FILE
// ==========================================================
//
// No encoding is provided intentionally.
//
// Node.js returns the file content as a Buffer.
//
// Buffer is appropriate here because crypto can process
// binary data directly.
//
// ==========================================================

const fileData = fs.readFileSync(fileName);

// ==========================================================
// 3. GENERATE FILE HASH
// ==========================================================

const digest = crypto.createHash(algorithm).update(fileData).digest("hex");

// ==========================================================
// 4. COLLECT FILE HASH INFORMATION
// ==========================================================

const fileHashInformation = {
  fileName,
  algorithm,
  fileSize: fileData.length,
  digest,
};

// ==========================================================
// 5. DISPLAY RESULT
// ==========================================================

console.log("========================================");
console.log(" FILE HASH & INTEGRITY ");
console.log("========================================");

console.table(fileHashInformation);

console.log("========================================");
