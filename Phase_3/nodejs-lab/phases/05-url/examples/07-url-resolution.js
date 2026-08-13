// ==========================================================
// NODE.JS URL MODULE
// URL RESOLUTION
// ==========================================================
//
// Purpose:
// Understand how relative URLs are resolved against
// an absolute base URL.
//
// ==========================================================

// ==========================================================
// 1. BASE URL
// ==========================================================

const baseUrl = "https://api.example.com/";

// ==========================================================
// 2. RELATIVE URL
// ==========================================================

const relativeUrl = "users/963";

// ==========================================================
// 3. RESOLVE URL
// ==========================================================

const resolvedUrl = new URL(relativeUrl, baseUrl);

// ==========================================================
// 4. DISPLAY RESULT
// ==========================================================

console.log("========================================");

console.log(" URL RESOLUTION ");

console.log("========================================");

console.log("Base URL:");

console.log(baseUrl);

console.log("\nRelative URL:");

console.log(relativeUrl);

console.log("\nResolved URL:");

console.log(resolvedUrl.href);

console.log("========================================");
