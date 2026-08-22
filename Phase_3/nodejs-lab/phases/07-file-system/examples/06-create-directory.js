import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * ============================================================
 * 1. RESOLVE THE CURRENT MODULE DIRECTORY
 * ============================================================
 *
 * ES modules don't provide __dirname automatically.
 *
 * We reconstruct it:
 *
 * import.meta.url
 *      ↓
 * fileURLToPath()
 *      ↓
 * __filename
 *      ↓
 * path.dirname()
 *      ↓
 * __dirname
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * ============================================================
 * 2. BUILD THE TARGET DIRECTORY PATH
 * ============================================================
 *
 * Current file:
 *
 *   examples/06-create-directory.js
 *
 * Target:
 *
 *   storage/
 *     uploads/
 *       images/
 *
 * path.join() safely constructs the filesystem path.
 */
const targetDir = path.join(__dirname, "..", "storage", "uploads", "images");

/**
 * ============================================================
 * 3. ENSURE THE DIRECTORY EXISTS
 * ============================================================
 *
 * mkdir() creates directories.
 *
 * recursive: true means:
 *
 *   - create missing parent directories
 *   - create the target directory
 *   - don't fail if the target already exists
 *
 * This makes the operation useful for application startup
 * and initialization.
 */
async function ensureDirectoryExists() {
  try {
    await mkdir(targetDir, {
      recursive: true,
    });

    console.log("Directory is ready.");
    console.log(`Path: ${targetDir}`);
  } catch (error) {
    /**
     * If directory creation fails, inspect the filesystem
     * error rather than hiding it.
     */
    console.error("Failed to create directory.");
    console.error(`Error code: ${error.code}`);
    console.error(`Error message: ${error.message}`);
  }
}

/**
 * ============================================================
 * 4. START
 * ============================================================
 */
ensureDirectoryExists();
