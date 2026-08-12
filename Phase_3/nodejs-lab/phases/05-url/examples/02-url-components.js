// ==========================================================
// NODE.JS URL MODULE
// URL COMPONENT ANALYSIS
// ==========================================================
//
// Purpose:
// Inspect the major components of a structured URL.
//
// ==========================================================

// ==========================================================
// 1. CREATE URL
// ==========================================================

const url = new URL(
  "https://api.example.com:8443/users/963?role=engineer&active=true#profile",
);

// ==========================================================
// 2. EXTRACT URL COMPONENTS
// ==========================================================

const urlInformation = {
  protocol: url.protocol,
  hostname: url.hostname,
  port: url.port,
  host: url.host,
  pathname: url.pathname,
  search: url.search,
  hash: url.hash,
  origin: url.origin,
  href: url.href,
};

// ==========================================================
// 3. DISPLAY RESULT
// ==========================================================

console.log("========================================");

console.log(" URL COMPONENT ANALYSIS ");

console.log("========================================");

console.table(urlInformation);

console.log("========================================");
