// ========================================
// Application
// ========================================

import {
  generateResponse,
  MODEL,
  connectDatabase,
  log,
  error,
} from "./index.js";

// Database
connectDatabase();

// Logger
log("Application started");

// AI
console.log(generateResponse("Hello AI"));

console.log(`Model: ${MODEL}`);

// Logger
error("This is only a demo error.");
