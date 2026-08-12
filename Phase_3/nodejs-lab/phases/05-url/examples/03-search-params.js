// ==========================================================
// NODE.JS URL MODULE
// LESSON 03 — URLSearchParams
// ==========================================================
//
// Purpose:
// Read and inspect query parameters using the standard
// URLSearchParams API.
//
// ==========================================================

// ==========================================================
// 1. CREATE URL
// ==========================================================

const url = new URL(
  "https://api.example.com/users/963?role=engineer&active=true",
);

// ==========================================================
// 2. ACCESS QUERY PARAMETERS
// ==========================================================

const searchParams = url.searchParams;

// ==========================================================
// 3. READ INDIVIDUAL PARAMETERS
// ==========================================================

const role = searchParams.get("role");

const active = searchParams.get("active");

// ==========================================================
// 4. CHECK PARAMETER EXISTENCE
// ==========================================================

const hasRole = searchParams.has("role");

const hasDepartment = searchParams.has("department");

// ==========================================================
// 5. DISPLAY INFORMATION
// ==========================================================

console.log("========================================");

console.log(" URL SEARCH PARAMETERS ");

console.log("========================================");

console.table({
  role,
  active,
  hasRole,
  hasDepartment,
});

console.log("========================================");
