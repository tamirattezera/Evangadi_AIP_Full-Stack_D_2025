// ==========================================================
// NODE.JS URL MODULE
// EXERCISE 02 — QUERY MANAGER
// ==========================================================
//
// Purpose:
// Manage URL query parameters using URLSearchParams.
//
// Concepts:
// - URL
// - URLSearchParams
// - get()
// - getAll()
// - has()
// - set()
// - append()
// - delete()
// - Error handling
//
// Architecture:
//
// Input URL
//     ↓
// manageQuery()
//     ↓
// Parse URL
//     ↓
// Read / Modify Query Parameters
//     ↓
// Structured Result
//     ↓
// Consumer
//
// ==========================================================

// ==========================================================
// 1. QUERY MANAGER
// ==========================================================

function manageQuery(urlString) {
  try {
    // --------------------------------------------------------
    // Create URL object
    // --------------------------------------------------------

    const url = new URL(urlString);

    // --------------------------------------------------------
    // Access query parameters
    // --------------------------------------------------------

    const searchParams = url.searchParams;

    // --------------------------------------------------------
    // Read existing parameters
    // --------------------------------------------------------

    const status = searchParams.get("status");

    const originalPage = searchParams.get("page");

    // --------------------------------------------------------
    // Check whether tag exists
    // --------------------------------------------------------

    const hasTag = searchParams.has("tag");

    // --------------------------------------------------------
    // Update existing page parameter
    // --------------------------------------------------------

    searchParams.set("page", "2");

    // --------------------------------------------------------
    // Add limit parameter
    // --------------------------------------------------------

    searchParams.set("limit", "20");

    // --------------------------------------------------------
    // Append additional tag values
    // --------------------------------------------------------

    searchParams.append("tag", "nodejs");

    searchParams.append("tag", "backend");

    // --------------------------------------------------------
    // Retrieve all tag values
    // --------------------------------------------------------

    const tags = searchParams.getAll("tag");

    // --------------------------------------------------------
    // Remove limit parameter
    // --------------------------------------------------------

    searchParams.delete("limit");

    // --------------------------------------------------------
    // Return structured result
    // --------------------------------------------------------

    return {
      original: urlString,

      status,

      originalPage,

      page: searchParams.get("page"),

      hasTag,

      tags,

      finalUrl: url.href,
    };
  } catch (error) {
    // --------------------------------------------------------
    // Handle invalid URL
    // --------------------------------------------------------

    return {
      error: "Invalid URL",
      message: error.message,
    };
  }
}

// ==========================================================
// 2. TEST INPUT
// ==========================================================

const inputUrl = "https://api.example.com/prospects?status=lead&page=1&tag=ai";

// ==========================================================
// 3. EXECUTE QUERY MANAGER
// ==========================================================

const result = manageQuery(inputUrl);

// ==========================================================
// 4. DISPLAY RESULT
// ==========================================================

console.log("========================================");

console.log(" QUERY MANAGER ");

console.log("========================================");

console.dir(result, {
  depth: null,
});

console.log("========================================");
