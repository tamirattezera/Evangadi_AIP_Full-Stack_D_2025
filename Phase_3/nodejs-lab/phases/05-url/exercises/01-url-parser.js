// ==========================================================
// NODE.JS URL MODULE
// EXERCISE 01 — URL PARSER
// ==========================================================
//
// Purpose:
// Parse a URL into structured information that can be
// consumed by application logic.
//
// Concepts:
// - URL
// - URL components
// - URLSearchParams
// - Query parameters
// - Functions
// - Error handling
//
// ==========================================================

// ==========================================================
// 1. URL PARSER
// ==========================================================

function parseUrl(urlString) {
  try {
    // --------------------------------------------------------
    // Create URL object
    // --------------------------------------------------------

    const url = new URL(urlString);

    // --------------------------------------------------------
    // Extract query parameters
    // --------------------------------------------------------

    const query = {
      role: url.searchParams.get("role"),
      active: url.searchParams.get("active"),
    };

    // --------------------------------------------------------
    // Build structured URL information
    // --------------------------------------------------------

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
      query,
    };

    // --------------------------------------------------------
    // Return parsed result
    // --------------------------------------------------------

    return urlInformation;
  } catch (error) {
    // --------------------------------------------------------
    // Handle invalid URLs
    // --------------------------------------------------------

    return {
      error: "Invalid URL",
      message: error.message,
    };
  }
}

// ==========================================================
// 2. TEST URL
// ==========================================================

const inputUrl =
  "https://api.example.com:8443/users/963?role=engineer&active=true#profile";

// ==========================================================
// 3. PARSE URL
// ==========================================================

const result = parseUrl(inputUrl);

// ==========================================================
// 4. DISPLAY RESULT
// ==========================================================

console.log("========================================");
console.log(" URL PARSER ");
console.log("========================================");

console.dir(result, {
  depth: null,
});

console.log("========================================");
