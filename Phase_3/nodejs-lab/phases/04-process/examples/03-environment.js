// ==========================================================
// NODE.JS PROCESS MODULE
// LESSON 03 — ENVIRONMENT CONFIGURATION
// ==========================================================
//
// Purpose:
// Read application configuration from environment variables.
//
// ==========================================================

const appName = process.env.APP_NAME;

const port = process.env.PORT;

const environment = process.env.NODE_ENV;

const configuration = {
  appName,
  port,
  environment,
};

console.log("========================================");

console.log(" APPLICATION CONFIGURATION ");

console.log("========================================");

console.table(configuration);

console.log("========================================");
