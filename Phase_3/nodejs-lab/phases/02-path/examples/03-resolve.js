// ==========================================================
// PATH.RESOLVE() 
// Phase 02 - Path Module
// ==========================================================

// Import Node.js built-in modules.
import path from "path";
import { fileURLToPath } from "url";

// ==========================================================
// ES MODULE PATHS
// ==========================================================
// Unlike CommonJS, ES Modules do NOT provide:
//
//   __filename
//   __dirname
//
// We recreate them using import.meta.url.
//
// __filename -> Absolute path of THIS file.
// __dirname  -> Absolute path of THIS file's directory.
// ==========================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================================
// PROJECT ROOT
// ==========================================================
// Move from:
//   phases/02-path/examples
//
// up to:
//
//   nodejs-lab
//
// This gives us a stable project root regardless of where
// the application is started from.
// ==========================================================

const PROJECT_ROOT = path.resolve(__dirname, "../../..");

// ==========================================================
// CENTRALIZED PATHS
// ==========================================================
// A single source of truth for important project folders.
//
// Production applications typically centralize paths like
// this to avoid repeating strings throughout the codebase.
// ==========================================================

const PATHS = {
  root: PROJECT_ROOT,

  uploads: path.resolve(PROJECT_ROOT, "uploads"),

  outputs: path.resolve(PROJECT_ROOT, "outputs"),

  prompts: path.resolve(PROJECT_ROOT, "prompts"),

  logs: path.resolve(PROJECT_ROOT, "logs"),

  cache: path.resolve(PROJECT_ROOT, "cache"),
};

// ==========================================================
// BUILD SPECIFIC FILE PATHS
// ==========================================================
// Use resolve() again to build absolute paths for files.
// ==========================================================

const avatarImage = path.resolve(PATHS.uploads, "images", "avatar.png");

const aiPrompt = path.resolve(PATHS.prompts, "system.txt");

const logFile = path.resolve(PATHS.logs, "server.log");

const generatedImage = path.resolve(PATHS.outputs, "images", "sunset.png");

const embeddings = path.resolve(PATHS.cache, "embeddings", "vectors.json");

// ==========================================================
// DISPLAY RESULTS
// ==========================================================

console.log("\n======================================");
console.log(" PROJECT INFORMATION");
console.log("======================================");

console.log("Current File:");
console.log(__filename);

console.log("\nCurrent Directory:");
console.log(__dirname);

console.log("\nProject Root:");
console.log(PROJECT_ROOT);

console.log("\n======================================");
console.log(" PROJECT DIRECTORIES");
console.log("======================================");

console.table(PATHS);

console.log("\n======================================");
console.log(" APPLICATION FILES");
console.log("======================================");

console.log("Avatar:");
console.log(avatarImage);

console.log("\nAI Prompt:");
console.log(aiPrompt);

console.log("\nServer Log:");
console.log(logFile);

console.log("\nGenerated Image:");
console.log(generatedImage);

console.log("\nEmbedding Cache:");
console.log(embeddings);

console.log("\n======================================");
console.log(" END OF DEMO");
console.log("======================================");
