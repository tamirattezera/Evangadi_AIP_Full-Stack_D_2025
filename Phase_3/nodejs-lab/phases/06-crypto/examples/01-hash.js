import crypto from "crypto";

// ==========================================================
// NODE.JS CRYPTO MODULE
// CRYPTOGRAPHIC HASHING
// ==========================================================
//
// Purpose:
//
// Generate a deterministic SHA-256 hash from input data.
//
// Flow:
//
// Input
//   ↓
// SHA-256
//   ↓
// Digest
//   ↓
// Hexadecimal representation
//
// ==========================================================

// ==========================================================
// 1. DEFINE HASH CONFIGURATION
// ==========================================================

const algorithm = "sha256";
const input = "Node.js Crypto";

// ==========================================================
// 2. GENERATE HASH
// ==========================================================

const digest = crypto.createHash(algorithm).update(input).digest("hex");

// ==========================================================
// 3. BUILD HASH INFORMATION
// ==========================================================

const hashInformation = {
  algorithm,
  input,
  digest,
};

// ==========================================================
// 4. DISPLAY RESULT
// ==========================================================

console.log("========================================");
console.log(" CRYPTOGRAPHIC HASH ");
console.log("========================================");

console.table(hashInformation);

console.log("========================================");
