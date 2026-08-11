// ==========================================================
// NODE.JS PROCESS MODULE
// CONFIGURATION DEFAULTS & VALIDATION
// ==========================================================
//
// Purpose:
// Build reliable application configuration from
// environment variables.
//
// Concepts:
//
// - Default configuration
// - Required configuration
// - Type conversion
// - Configuration validation
//
// ==========================================================

// ==========================================================
// 1. OPTIONAL CONFIGURATION
// ==========================================================
//
// If PORT is not provided, the application will use 3000.
//
// ==========================================================

const port = Number(process.env.PORT) || 3000;

// ==========================================================
// 2. ENVIRONMENT CONFIGURATION
// ==========================================================
//
// development is used when NODE_ENV is not provided.
//
// ==========================================================

const environment = process.env.NODE_ENV || "development";

// ==========================================================
// 3. REQUIRED CONFIGURATION
// ==========================================================
//
// An API key has no safe default.
//
// The application should not continue without it.
//
// ==========================================================

const openAIKey = process.env.OPENAI_API_KEY;

if (!openAIKey) {
  console.error("ERROR: OPENAI_API_KEY is required.");

  process.exit(1);
}

// ==========================================================
// 4. BUILD CONFIGURATION
// ==========================================================

const configuration = {
  port,
  environment,
  openAIConfigured: Boolean(openAIKey),
};

// ==========================================================
// 5. DISPLAY CONFIGURATION
// ==========================================================

console.log("========================================");

console.log(" APPLICATION CONFIGURATION ");

console.log("========================================");

console.table(configuration);

console.log("========================================");
