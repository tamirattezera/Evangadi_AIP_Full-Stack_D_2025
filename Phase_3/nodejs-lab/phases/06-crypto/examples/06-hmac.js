// ==========================================================
// NODE.JS CRYPTO MODULE
// HMAC MESSAGE AUTHENTICATION
// ==========================================================
//
// Purpose:
//
// Generate an HMAC (Hash-based Message Authentication Code)
// using a message and a shared secret.
//
// HMAC provides:
//
// 1. Message integrity
// 2. Authentication through knowledge of a shared secret
//
// Flow:
//
// Message + Secret
//       ↓
//   createHmac()
//       ↓
//     update()
//       ↓
//     digest()
//       ↓
//   HMAC Digest
//
// ==========================================================

import crypto from "crypto";

// ==========================================================
// 1. CONFIGURATION
// ==========================================================
//
// These values are intentionally simple because this is
// a learning exercise.
//
// Never hardcode real production secrets in source code.
//
// ==========================================================

const algorithm = "sha256";

const secret = "my-secret-key";

const message = "Transfer 1000 ETB";

const encoding = "hex";

// ==========================================================
// 2. GENERATE HMAC
// ==========================================================
//
// createHmac() creates an HMAC instance using:
//
// - The selected hashing algorithm
// - The shared secret
//
// update() provides the message that we want to
// authenticate.
//
// digest() produces the final HMAC value.
//
// ==========================================================

const digest = crypto
  .createHmac(algorithm, secret)
  .update(message)
  .digest(encoding);

// ==========================================================
// 3. BUILD HMAC INFORMATION
// ==========================================================
//
// Keeping the generated information inside an object
// makes the output structured and easier to inspect.
//
// ==========================================================

const hmacInformation = {
  algorithm,
  message,
  encoding,
  digest,
};

// ==========================================================
// 4. DISPLAY RESULT
// ==========================================================

console.log("========================================");
console.log(" HMAC MESSAGE AUTHENTICATION ");
console.log("========================================");

console.table(hmacInformation);

console.log("========================================");
