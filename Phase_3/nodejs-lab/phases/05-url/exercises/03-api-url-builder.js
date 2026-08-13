// ==========================================================
// NODE.JS URL MODULE
// EXERCISE 03 — API URL BUILDER
// ==========================================================
//
// Purpose:
// Build API URLs programmatically from configuration and
// query parameters.
//
// Concepts:
// - URL
// - URLSearchParams
// - Object.entries()
// - Dynamic query parameters
// - Optional parameters
// - URL encoding
// - Error handling
//
// Architecture:
//
// Configuration + Query
//          ↓
//    buildApiUrl()
//          ↓
//      URL object
//          ↓
//   Structured result
//          ↓
//       Consumer
//
// ==========================================================

// ==========================================================
// 1. API URL BUILDER
// ==========================================================

function buildApiUrl(config, query = {}) {
  try {
    // --------------------------------------------------------
    // Validate configuration
    // --------------------------------------------------------

    if (!config?.baseUrl) {
      throw new Error("API base URL is required.");
    }

    if (!config?.version) {
      throw new Error("API version is required.");
    }

    if (!config?.resource) {
      throw new Error("API resource is required.");
    }

    // --------------------------------------------------------
    // Create URL object from the base URL
    // --------------------------------------------------------

    const url = new URL(config.baseUrl);

    // --------------------------------------------------------
    // Normalize path components
    //
    // Removing leading/trailing slashes prevents paths such
    // as:
    //
    // /v1//prospects
    //
    // --------------------------------------------------------

    const version = String(config.version).replace(/^\/+|\/+$/g, "");

    const resource = String(config.resource).replace(/^\/+|\/+$/g, "");

    // --------------------------------------------------------
    // Build API pathname
    // --------------------------------------------------------

    url.pathname = `/${version}/${resource}`;

    // --------------------------------------------------------
    // Add query parameters dynamically
    //
    // Object.entries() converts:
    //
    // {
    //   status: "lead",
    //   page: 2
    // }
    //
    // into:
    //
    // [
    //   ["status", "lead"],
    //   ["page", 2]
    // ]
    // --------------------------------------------------------

    for (const [key, value] of Object.entries(query)) {
      // Skip undefined and null values.

      if (value === undefined || value === null) {
        continue;
      }

      // Convert values to strings through URLSearchParams.

      url.searchParams.set(key, String(value));
    }

    // --------------------------------------------------------
    // Return structured result
    // --------------------------------------------------------

    return {
      baseUrl: config.baseUrl,

      version,

      resource,

      query,

      url: url.href,
    };
  } catch (error) {
    // --------------------------------------------------------
    // Controlled error response
    // --------------------------------------------------------

    return {
      error: "Unable to build API URL",

      message: error.message,
    };
  }
}

// ==========================================================
// 2. TEST #1 — PROSPECTS API
// ==========================================================

const prospectsConfig = {
  baseUrl: "https://api.example.com",
  version: "v1",
  resource: "prospects",
};

const prospectsQuery = {
  status: "lead",
  industry: "technology",
  page: 2,
  limit: 20,
};

const prospectsResult = buildApiUrl(prospectsConfig, prospectsQuery);

// ==========================================================
// 3. DISPLAY TEST #1
// ==========================================================

console.log("========================================");

console.log(" TEST 1 — PROSPECTS API ");

console.log("========================================");

console.dir(prospectsResult, {
  depth: null,
});

// ==========================================================
// 4. TEST #2 — AI SEARCH API
// ==========================================================

const aiConfig = {
  baseUrl: "https://ai.example.com",
  version: "v1",
  resource: "search",
};

const aiQuery = {
  query: "AI & Full-Stack Engineering",
  model: "reasoning",
  page: 1,
  limit: 10,
};

const aiResult = buildApiUrl(aiConfig, aiQuery);

// ==========================================================
// 5. DISPLAY TEST #2
// ==========================================================

console.log("\n========================================");

console.log(" TEST 2 — AI SEARCH API ");

console.log("========================================");

console.dir(aiResult, {
  depth: null,
});

// ==========================================================
// 6. TEST #3 — OPTIONAL PARAMETERS
// ==========================================================

const optionalConfig = {
  baseUrl: "https://api.example.com/",
  version: "/v1/",
  resource: "/prospects/",
};

const optionalQuery = {
  status: "lead",
  industry: undefined,
  page: 1,
  limit: 20,
};

const optionalResult = buildApiUrl(optionalConfig, optionalQuery);

// ==========================================================
// 7. DISPLAY TEST #3
// ==========================================================

console.log("\n========================================");

console.log(" TEST 3 — OPTIONAL PARAMETERS ");

console.log("========================================");

console.dir(optionalResult, {
  depth: null,
});

// ==========================================================
// 8. TEST #4 — INVALID CONFIGURATION
// ==========================================================

const invalidConfig = {
  baseUrl: "not-a-valid-url",
  version: "v1",
  resource: "users",
};

const invalidResult = buildApiUrl(invalidConfig, {});

// ==========================================================
// 9. DISPLAY TEST #4
// ==========================================================

console.log("\n========================================");

console.log(" TEST 4 — INVALID URL ");

console.log("========================================");

console.dir(invalidResult, {
  depth: null,
});

console.log("\n========================================");
