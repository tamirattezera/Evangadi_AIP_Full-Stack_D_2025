// ==========================================================
// NODE.JS URL MODULE
// URL FUNDAMENTALS
// ==========================================================
//
// Purpose:
// Understand the URL class and inspect the basic structure
// of a URL.
//
// ==========================================================

// ==========================================================
// 1. CREATE URL
// ==========================================================

const url = new URL("https://api.example.com:8443/users/963");

// ==========================================================
// 2. EXTRACT BASIC COMPONENTS
// ==========================================================

const urlInformation = {
  protocol: url.protocol,
  hostname: url.hostname,
  port: url.port,
  pathname: url.pathname,
};

// ==========================================================
// 3. DISPLAY RESULT
// ==========================================================

console.log("========================================");

console.log(" URL FUNDAMENTALS ");

console.log("========================================");

console.table(urlInformation);

console.log("========================================");
