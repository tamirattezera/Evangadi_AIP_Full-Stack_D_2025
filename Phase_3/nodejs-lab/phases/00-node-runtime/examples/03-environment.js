"use strict";

// ============================================================
// ENVIRONMENT VARIABLES
// ============================================================
//
// Environment Variables are configuration values that live
// OUTSIDE your JavaScript code.
//
// They allow us to:
//
// • Store secrets
// • Configure applications
// • Use different settings for development and production
//
// Node.js exposes them through:
//
// process.env
//
// ============================================================

// ============================================================
// DISPLAY ALL ENVIRONMENT VARIABLES
// ============================================================

console.log("\n==============================");
console.log(" ALL ENVIRONMENT VARIABLES");
console.log("==============================");

console.log(process.env);

// ============================================================
// READ SPECIFIC VARIABLES
// ============================================================

console.log("\n==============================");
console.log(" COMMON VARIABLES");
console.log("==============================");

console.log("HOME:");
console.log(process.env.HOME);

console.log("\nPATH:");
console.log(process.env.PATH);

console.log("\nUSER:");
console.log(process.env.USER);

// ============================================================
// CUSTOM VARIABLES
// ============================================================

// If these variables do not exist,
// Node returns undefined.

console.log("\n==============================");
console.log(" CUSTOM VARIABLES");
console.log("==============================");

console.log("APP_NAME:");
console.log(process.env.APP_NAME);

console.log("\nPORT:");
console.log(process.env.PORT);

console.log("\nDB_HOST:");
console.log(process.env.DB_HOST);

console.log("\nOPENAI_API_KEY:");
console.log(process.env.OPENAI_API_KEY);

// ============================================================
// DEFAULT VALUES
// ============================================================

// If PORT does not exist,
// use 3000.

const PORT = process.env.PORT || 3000;

console.log("\n==============================");
console.log(" DEFAULT VALUE");
console.log("==============================");

console.log("Application Port:", PORT);

// ============================================================
// CHECK REQUIRED VARIABLES
// ============================================================

console.log("\n==============================");
console.log(" REQUIRED VARIABLES");
console.log("==============================");

if (!process.env.OPENAI_API_KEY) {
  console.log("OpenAI API Key is NOT configured.");
} else {
  console.log("OpenAI API Key loaded successfully.");
}

// ============================================================
// FINISHED
// ============================================================

console.log("\n==============================");
console.log(" END OF ENVIRONMENT DEMO");
console.log("==============================");
