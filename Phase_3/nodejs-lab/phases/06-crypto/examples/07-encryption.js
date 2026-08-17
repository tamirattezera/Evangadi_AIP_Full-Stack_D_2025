// ==========================================================
// NODE.JS CRYPTO MODULE
// SYMMETRIC ENCRYPTION
// ==========================================================
//
// Purpose:
//
// Encrypt and decrypt sensitive data using AES-256-GCM.
//
// Encryption provides:
//
// 1. Confidentiality
// 2. Integrity/authentication through the GCM auth tag
//
// Flow:
//
// Plaintext
//     ↓
// Encryption Key
//     ↓
// AES-256-GCM
//     ↓
// Ciphertext + IV + Auth Tag
//
// Decryption:
//
// Ciphertext + IV + Auth Tag + Key
//             ↓
//        AES-256-GCM
//             ↓
//          Plaintext
//
// ==========================================================

import crypto from "crypto";

// ==========================================================
// 1. CONFIGURATION
// ==========================================================

const algorithm = "aes-256-gcm";

const keyLength = 32;

const ivLength = 12;

const encoding = "hex";

const message = "Confidential Node.js data";

// ==========================================================
// 2. GENERATE ENCRYPTION KEY
// ==========================================================
//
// AES-256 requires a 256-bit key.
//
// 256 bits / 8 = 32 bytes.
//
// randomBytes() generates cryptographically secure
// random bytes.
//
// ==========================================================

const key = crypto.randomBytes(keyLength);

// ==========================================================
// 3. GENERATE INITIALIZATION VECTOR
// ==========================================================
//
// GCM commonly uses a 12-byte IV.
//
// The IV does not need to be secret.
//
// It must be unique for a given encryption key.
//
// ==========================================================

const iv = crypto.randomBytes(ivLength);

// ==========================================================
// 4. CREATE CIPHER
// ==========================================================

const cipher = crypto.createCipheriv(algorithm, key, iv);

// ==========================================================
// 5. ENCRYPT MESSAGE
// ==========================================================

const encrypted = Buffer.concat([
  cipher.update(message, "utf8"),
  cipher.final(),
]);

// ==========================================================
// 6. GET AUTHENTICATION TAG
// ==========================================================
//
// GCM generates an authentication tag that allows the
// receiver to detect tampering.
//
// ==========================================================

const authTag = cipher.getAuthTag();

// ==========================================================
// 7. CONVERT OUTPUT TO HEX
// ==========================================================

const ciphertext = encrypted.toString(encoding);

const keyHex = key.toString(encoding);

const ivHex = iv.toString(encoding);

const authTagHex = authTag.toString(encoding);

// ==========================================================
// 8. CREATE ENCRYPTION REPORT
// ==========================================================

const encryptionInformation = {
  algorithm,
  keyLength,
  ivLength,
  encoding,
  plaintext: message,
  ciphertext,
  iv: ivHex,
  authTag: authTagHex,
};

// ==========================================================
// 9. DISPLAY ENCRYPTION RESULT
// ==========================================================

console.log("========================================");
console.log(" AES-256-GCM ENCRYPTION ");
console.log("========================================");

console.table(encryptionInformation);

console.log("========================================");
