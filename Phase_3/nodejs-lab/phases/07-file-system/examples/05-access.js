import { constants } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * ============================================================
 * 1. RESOLVE THE CURRENT MODULE DIRECTORY
 * ============================================================
 *
 * In an ES module, __dirname is not available automatically.
 *
 * We reconstruct it using:
 *
 *   import.meta.url
 *        ↓
 *   fileURLToPath()
 *        ↓
 *   __filename
 *        ↓
 *   path.dirname()
 *        ↓
 *   __dirname
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * ============================================================
 * 2. BUILD THE TARGET PATH
 * ============================================================
 *
 * Current file:
 *
 *   examples/05-access.js
 *
 * Target:
 *
 *   resources/profile.json
 *
 * Therefore:
 *
 *   __dirname
 *       ↓
 *   ..
 *       ↓
 *   resources
 *       ↓
 *   profile.json
 */
const targetPath = path.join(__dirname, "..", "resources", "profile.json");

/**
 * ============================================================
 * 3. ACCESS-CHECK HELPER
 * ============================================================
 *
 * access() does NOT return true/false.
 *
 * Success:
 *
 *   await access(...)
 *        ↓
 *   Promise resolves
 *
 * Failure:
 *
 *   await access(...)
 *        ↓
 *   Promise rejects
 *
 * Therefore we use try/catch.
 *
 * The function returns:
 *
 *   true  → requested access is allowed
 *   false → requested access is denied/unavailable
 */
async function checkAccess(filePath, mode) {
  try {
    await access(filePath, mode);

    return true;
  } catch {
    return false;
  }
}

/**
 * ============================================================
 * 4. CHECK ACCESS PERMISSIONS
 * ============================================================
 */
async function verifyAccess() {
  console.log("\n--- Access Check ---\n");
  console.log(`Path: ${targetPath}\n`);

  /**
   * ----------------------------------------------------------
   * F_OK — Check that the filesystem entry exists.
   * ----------------------------------------------------------
   *
   * Important:
   * F_OK does NOT mean "the file is readable."
   *
   * It checks whether the filesystem entry is accessible
   * according to the F_OK check.
   */
  const exists = await checkAccess(targetPath, constants.F_OK);

  /**
   * ----------------------------------------------------------
   * R_OK — Check read access.
   * ----------------------------------------------------------
   */
  const canRead = await checkAccess(targetPath, constants.R_OK);

  /**
   * ----------------------------------------------------------
   * W_OK — Check write access.
   * ----------------------------------------------------------
   */
  const canWrite = await checkAccess(targetPath, constants.W_OK);

  /**
   * ----------------------------------------------------------
   * Display the results.
   * ----------------------------------------------------------
   */
  console.log(`Exists/access check: ${exists ? "✓" : "✗"}`);

  console.log(`Read access:         ${canRead ? "✓" : "✗"}`);

  console.log(`Write access:        ${canWrite ? "✓" : "✗"}`);

  console.log();
}

/**
 * ============================================================
 * 5. START THE PROGRAM
 * ============================================================
 */
verifyAccess();
