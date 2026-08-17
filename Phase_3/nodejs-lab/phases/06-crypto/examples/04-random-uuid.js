// ==========================================================
// NODE.JS CRYPTO MODULE
// RANDOM UUID GENERATION
// ==========================================================
//
// Purpose:
//
// Generate a UUID using Node.js cryptographically secure
// randomness.
//
// UUID:
// Universally Unique Identifier
//
// Flow:
//
// crypto.randomUUID()
//        ↓
// Random UUID
//        ↓
// Identifier
//
// Common uses:
//
// - Users
// - Orders
// - Transactions
// - Files
// - Jobs
// - API resources
//
// ==========================================================

import crypto from "crypto";

// ==========================================================
// 1. GENERATE UUID
// ==========================================================
//
// randomUUID() generates a UUID suitable for identifying
// resources where a random UUID is appropriate.
//
// ==========================================================

const id = crypto.randomUUID();

// ==========================================================
// 2. BUILD UUID INFORMATION
// ==========================================================

const uuidInformation = {
  id,
  length: id.length,
};

// ==========================================================
// 3. DISPLAY RESULT
// ==========================================================

console.log("========================================");
console.log(" RANDOM UUID ");
console.log("========================================");

console.table(uuidInformation);

console.log("========================================");
