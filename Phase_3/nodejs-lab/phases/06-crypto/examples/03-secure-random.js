import crypto from "crypto";

// ==========================================================
// NODE.JS CRYPTO MODULE
// SECURE RANDOM TOKEN GENERATION
// ==========================================================
//
// Purpose:
//
// Generate cryptographically secure random bytes and
// represent them as a hexadecimal token.
//
// Flow:
//
// Secure Randomness
//      ↓
// randomBytes()
//      ↓
// Buffer
//      ↓
// Hexadecimal Encoding
//      ↓
// Secure Token
//
// ==========================================================

// ==========================================================
// 1. CONFIGURATION
// ==========================================================

const byteLength = 32;
const encoding = "hex";

// ==========================================================
// 2. GENERATE SECURE RANDOM TOKEN
// ==========================================================

const token = crypto.randomBytes(byteLength).toString(encoding);

// ==========================================================
// 3. BUILD INFORMATION OBJECT
// ==========================================================

const randomInformation = {
  byteLength,
  encoding,
  token,
};

// ==========================================================
// 4. DISPLAY RESULT
// ==========================================================

console.log("========================================");
console.log(" SECURE RANDOM TOKEN ");
console.log("========================================");

console.table(randomInformation);

console.log("========================================");
