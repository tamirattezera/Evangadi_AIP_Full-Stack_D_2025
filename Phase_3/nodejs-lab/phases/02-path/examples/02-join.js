// ==========================================================
// PATH.JOIN() 
// Phase 02 - Path Module
// ==========================================================

// Import Node.js built-in Path module.
import path from "path";

// ==========================================================
// PROJECT FOLDERS
// ==========================================================
// Instead of hardcoding folder names throughout the project,
// store them in one place.
//
// Benefits:
// ✔ Easy to rename folders
// ✔ Prevents spelling mistakes
// ✔ Improves maintainability
// ✔ Common production practice
// ==========================================================

const FOLDERS = {
  uploads: "uploads",
  outputs: "outputs",
  prompts: "prompts",
  logs: "logs",
  cache: "cache",
  images: "images",
  embeddings: "embeddings",
};

// ==========================================================
// HELPER FUNCTION
// ==========================================================
// Builds a valid file path.
//
// path.join():
// • Uses the correct separator for the operating system
// • Removes duplicate separators
// • Resolves "." and ".."
// • Returns a NEW string
// ==========================================================

function buildPath(...segments) {
  return path.join(...segments);
}


// User Upload
const avatarPath = buildPath(FOLDERS.uploads, FOLDERS.images, "avatar.png");


// AI Generated Image
const generatedImage = buildPath(FOLDERS.outputs, FOLDERS.images, "sunset.png");


// Prompt File
const systemPrompt = buildPath(FOLDERS.prompts, "system.txt");


// Log File
const serverLog = buildPath(FOLDERS.logs, "generation.log");


// Embedding Cache
const embeddingsCache = buildPath(
  FOLDERS.cache,
  FOLDERS.embeddings,
  "vectors.json",
);

// ==========================================================
// Parent Directory (..)
// ".." means:
// Go back one folder.
// ==========================================================

const backupLog = buildPath(FOLDERS.uploads, "..", FOLDERS.logs, "backup.log");

// ==========================================================
// Current Directory (.)
// "." means:
// Stay in the current folder.
// ==========================================================

const profileImage = buildPath(".", FOLDERS.uploads, "profile.jpg");

// ==========================================================
// DISPLAY RESULTS
// ==========================================================

console.log("======================================");
console.log(" PATH.JOIN() EXAMPLES");
console.log("======================================");

console.log("\n1. Avatar Upload");
console.log(avatarPath);

console.log("\n2. AI Generated Image");
console.log(generatedImage);

console.log("\n3. AI System Prompt");
console.log(systemPrompt);

console.log("\n4. Server Log");
console.log(serverLog);

console.log("\n5. Embedding Cache");
console.log(embeddingsCache);

console.log("\n6. Parent Directory Example");
console.log(backupLog);

console.log("\n7. Current Directory Example");
console.log(profileImage);

console.log("\n======================================");
console.log(" END OF DEMO");
console.log("======================================");
