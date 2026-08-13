// ==========================================================
// NODE.JS URL MODULE
// PROGRAMMATIC URL CONSTRUCTION
// ==========================================================
//
// Purpose:
// Construct an API URL from application-level values.
//
// ==========================================================

// ==========================================================
// 1. APPLICATION INPUT
// ==========================================================

const category = "ai";

const page = 2;

const limit = 20;

const sort = "newest";

// ==========================================================
// 2. CREATE BASE URL
// ==========================================================

const url = new URL("https://api.example.com/products");

// ==========================================================
// 3. ADD REQUIRED PARAMETERS
// ==========================================================

url.searchParams.set("category", category);

url.searchParams.set("page", page);

url.searchParams.set("limit", limit);

// ==========================================================
// 4. ADD OPTIONAL PARAMETER
// ==========================================================

if (sort) {
  url.searchParams.set("sort", sort);
}

// ==========================================================
// 5. DISPLAY FINAL URL
// ==========================================================

console.log("========================================");

console.log(" API REQUEST URL ");

console.log("========================================");

console.log(url.href);

console.log("========================================");
