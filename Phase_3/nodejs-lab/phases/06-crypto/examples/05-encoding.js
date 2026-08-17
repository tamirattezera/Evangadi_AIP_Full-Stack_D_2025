// ==========================================================
// NODE.JS CRYPTO MODULE
// DATA ENCODING & DECODING
// ==========================================================
//
// Purpose:
//
// Understand how data can be converted between different
// representations such as UTF-8, Base64, and Hex.
//
// Encoding does NOT provide security.
//
// Encoding:
//     Data representation
//
// Encryption:
//     Data confidentiality
//
// Hashing:
//     Data fingerprint
//
// ==========================================================
//
// Flow:
//
// Original Text
//      ↓
//    Buffer
//      ↓
// ┌────┴─────┐
// ↓          ↓
// Hex      Base64
// ↓          ↓
// Decode back to original data
//
// ==========================================================

import crypto from "crypto";

// ==========================================================
// 1. ORIGINAL DATA
// ==========================================================

const message = "Node.js Crypto";

// ==========================================================
// 2. CONVERT MESSAGE TO BUFFER
// ==========================================================
//
// A Buffer represents raw binary data.
//
// UTF-8 is the default text encoding used here.
//
// ==========================================================

const buffer = Buffer.from(message, "utf8");

// ==========================================================
// 3. ENCODE AS HEX
// ==========================================================

const hex = buffer.toString("hex");

// ==========================================================
// 4. ENCODE AS BASE64
// ==========================================================

const base64 = buffer.toString("base64");

// ==========================================================
// 5. DECODE HEX
// ==========================================================
//
// Convert the hexadecimal representation back into
// the original text.
//
// ==========================================================

const decodedFromHex = Buffer.from(hex, "hex").toString("utf8");

// ==========================================================
// 6. DECODE BASE64
// ==========================================================
//
// Convert the Base64 representation back into
// the original text.
//
// ==========================================================

const decodedFromBase64 = Buffer.from(base64, "base64").toString("utf8");

// ==========================================================
// 7. BUILD INFORMATION OBJECT
// ==========================================================

const encodingInformation = {
  original: message,
  hex,
  base64,
  decodedFromHex,
  decodedFromBase64,
};

// ==========================================================
// 8. DISPLAY RESULT
// ==========================================================

console.log("========================================");
console.log(" DATA ENCODING & DECODING ");
console.log("========================================");

console.table(encodingInformation);

console.log("========================================");
