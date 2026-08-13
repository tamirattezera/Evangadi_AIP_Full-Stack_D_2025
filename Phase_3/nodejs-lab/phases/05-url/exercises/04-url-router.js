// ==========================================================
// NODE.JS URL MODULE
// EXERCISE 04 — URL ROUTER
// ==========================================================
//
// Purpose:
// Build a lightweight URL router using the native URL API.
//
// The router is responsible for:
//
// 1. Parsing the request URL
// 2. Matching the HTTP method
// 3. Matching the pathname
// 4. Extracting dynamic route parameters
// 5. Extracting query parameters
// 6. Identifying the appropriate handler
//
// The router does NOT execute business logic.
//
// Architecture:
//
// HTTP Request
//      ↓
// routeRequest()
//      ↓
// Parse URL
//      ↓
// Match Method
//      ↓
// Match Route
//      ↓
// Extract Params
//      ↓
// Extract Query
//      ↓
// Identify Handler
//
// ==========================================================

// ==========================================================
// 1. ROUTE DEFINITIONS
// ==========================================================
//
// Keeping routes in their own configuration makes the router
// easier to extend without changing the core routing logic.
// ==========================================================

const routes = [
  {
    method: "GET",
    pattern: "/v1/users",
    handler: "getUsers",
  },

  {
    method: "GET",
    pattern: "/v1/users/:id",
    handler: "getUserById",
  },

  {
    method: "GET",
    pattern: "/v1/prospects",
    handler: "getProspects",
  },

  {
    method: "GET",
    pattern: "/v1/prospects/:id",
    handler: "getProspectById",
  },

  {
    method: "GET",
    pattern: "/v1/search",
    handler: "search",
  },
];

// ==========================================================
// 2. ROUTE MATCHER
// ==========================================================
//
// Compares an actual pathname against a route pattern.
//
// Example:
//
// Pattern:
// /v1/users/:id
//
// Pathname:
// /v1/users/963
//
// Result:
//
// {
//   matched: true,
//   params: {
//     id: "963"
//   }
// }
//
// ==========================================================

function matchRoute(pattern, pathname) {
  // --------------------------------------------------------
  // Split both paths into segments.
  // --------------------------------------------------------

  const patternSegments = pattern.split("/").filter(Boolean);

  const pathnameSegments = pathname.split("/").filter(Boolean);

  // --------------------------------------------------------
  // Different number of segments means no match.
  // --------------------------------------------------------

  if (patternSegments.length !== pathnameSegments.length) {
    return {
      matched: false,
      params: {},
    };
  }

  // --------------------------------------------------------
  // Store dynamic route parameters.
  // --------------------------------------------------------

  const params = {};

  // --------------------------------------------------------
  // Compare each segment.
  // --------------------------------------------------------

  for (let index = 0; index < patternSegments.length; index++) {
    const patternSegment = patternSegments[index];

    const pathnameSegment = pathnameSegments[index];

    // ------------------------------------------------------
    // Dynamic segment
    //
    // Example:
    //
    // :id
    //
    // becomes:
    //
    // id: "963"
    // ------------------------------------------------------

    if (patternSegment.startsWith(":")) {
      const parameterName = patternSegment.slice(1);

      params[parameterName] = decodeURIComponent(pathnameSegment);

      continue;
    }

    // ------------------------------------------------------
    // Static segment
    // ------------------------------------------------------

    if (patternSegment !== pathnameSegment) {
      return {
        matched: false,
        params: {},
      };
    }
  }

  // --------------------------------------------------------
  // Route matched successfully.
  // --------------------------------------------------------

  return {
    matched: true,
    params,
  };
}

// ==========================================================
// 3. QUERY PARAMETER PARSER
// ==========================================================
//
// Converts:
//
// ?role=engineer&active=true
//
// into:
//
// {
//   role: "engineer",
//   active: "true"
// }
//
// ==========================================================

function parseQueryParameters(searchParams) {
  return Object.fromEntries(searchParams.entries());
}

// ==========================================================
// 4. REQUEST ROUTER
// ==========================================================
//
// Responsible for:
//
// - URL parsing
// - method matching
// - route matching
// - parameter extraction
// - query extraction
//
// It does NOT execute the handler.
// ==========================================================

function routeRequest(request) {
  try {
    // ------------------------------------------------------
    // Validate request
    // ------------------------------------------------------

    if (!request?.method) {
      throw new Error("Request method is required.");
    }

    if (!request?.url) {
      throw new Error("Request URL is required.");
    }

    // ------------------------------------------------------
    // Normalize HTTP method
    // ------------------------------------------------------

    const method = request.method.toUpperCase();

    // ------------------------------------------------------
    // Parse URL
    // ------------------------------------------------------

    const url = new URL(request.url);

    // ------------------------------------------------------
    // Extract pathname
    // ------------------------------------------------------

    const pathname = url.pathname;

    // ------------------------------------------------------
    // Extract query parameters
    // ------------------------------------------------------

    const query = parseQueryParameters(url.searchParams);

    // ------------------------------------------------------
    // Find matching route
    // ------------------------------------------------------

    for (const route of routes) {
      // ----------------------------------------------------
      // Method must match first.
      // ----------------------------------------------------

      if (route.method !== method) {
        continue;
      }

      // ----------------------------------------------------
      // Compare pathname with route pattern.
      // ----------------------------------------------------

      const match = matchRoute(route.pattern, pathname);

      // ----------------------------------------------------
      // Continue if pathname does not match.
      // ----------------------------------------------------

      if (!match.matched) {
        continue;
      }

      // ----------------------------------------------------
      // Route found.
      // ----------------------------------------------------

      return {
        statusCode: 200,

        method,

        pathname,

        route: route.pattern,

        params: match.params,

        query,

        handler: route.handler,
      };
    }

    // ======================================================
    // NO ROUTE FOUND
    // ======================================================

    return {
      statusCode: 404,

      error: "Route not found",

      method,

      pathname,

      query,
    };
  } catch (error) {
    // ======================================================
    // INVALID REQUEST
    // ======================================================

    return {
      statusCode: 400,

      error: "Invalid request",

      message: error.message,
    };
  }
}

// ==========================================================
// 5. TEST HELPER
// ==========================================================
//
// Keeps test output consistent and readable.
// ==========================================================

function testRoute(testName, request) {
  console.log("\n========================================");

  console.log(testName);

  console.log("========================================");

  console.log("Request:");

  console.log(`${request.method} ${request.url}`);

  console.log("\nRouter Result:");

  console.dir(routeRequest(request), {
    depth: null,
  });
}

// ==========================================================
// 6. TEST #1 — USERS COLLECTION
// ==========================================================

testRoute(
  "TEST 1 — GET USERS",

  {
    method: "GET",

    url: "https://api.example.com/v1/users",
  },
);

// ==========================================================
// 7. TEST #2 — USER BY ID
// ==========================================================

testRoute(
  "TEST 2 — GET USER BY ID",

  {
    method: "GET",

    url: "https://api.example.com/v1/users/963",
  },
);

// ==========================================================
// 8. TEST #3 — USER + QUERY PARAMETERS
// ==========================================================

testRoute(
  "TEST 3 — GET USER WITH QUERY",

  {
    method: "GET",

    url: "https://api.example.com/v1/users/963?role=engineer&active=true",
  },
);

// ==========================================================
// 9. TEST #4 — PROSPECT BY ID
// ==========================================================

testRoute(
  "TEST 4 — GET PROSPECT BY ID",

  {
    method: "GET",

    url: "https://api.example.com/v1/prospects/963?status=lead",
  },
);

// ==========================================================
// 10. TEST #5 — SEARCH
// ==========================================================

testRoute(
  "TEST 5 — SEARCH",

  {
    method: "GET",

    url: "https://api.example.com/v1/search?q=AI&page=2",
  },
);

// ==========================================================
// 11. TEST #6 — METHOD DOES NOT MATCH
// ==========================================================

testRoute(
  "TEST 6 — POST USERS",

  {
    method: "POST",

    url: "https://api.example.com/v1/users",
  },
);

// ==========================================================
// 12. TEST #7 — UNKNOWN ROUTE
// ==========================================================

testRoute(
  "TEST 7 — UNKNOWN ROUTE",

  {
    method: "GET",

    url: "https://api.example.com/v1/orders/123",
  },
);

// ==========================================================
// 13. TEST #8 — INVALID URL
// ==========================================================

testRoute(
  "TEST 8 — INVALID URL",

  {
    method: "GET",

    url: "not-a-valid-url",
  },
);

// ==========================================================
// 14. FINAL MESSAGE
// ==========================================================

console.log("\n========================================");

console.log(" URL ROUTER TESTS COMPLETE ");

console.log("========================================");
