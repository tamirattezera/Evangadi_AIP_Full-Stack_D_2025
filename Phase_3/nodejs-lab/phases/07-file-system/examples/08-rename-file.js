import { rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * ============================================================
 * 1. RESOLVE THE CURRENT MODULE DIRECTORY
 * ============================================================
 *
 * Because this project uses ES modules, Node.js does not
 * provide __dirname automatically.
 *
 * We reconstruct it from import.meta.url:
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
 * 2. BUILD SOURCE AND DESTINATION PATHS
 * ============================================================
 *
 * Current file:
 *
 *   examples/08-rename-file.js
 *
 * Source:
 *
 *   resources/rename-demo.txt
 *
 * Destination:
 *
 *   resources/renamed-demo.txt
 *
 * path.join() safely constructs the paths instead of manually
 * writing platform-specific separators.
 */
const sourcePath = path.join(__dirname, "..", "resources", "rename-demo.txt");

const destinationPath = path.join(
  __dirname,
  "..",
  "resources",
  "renamed-demo.txt",
);

/**
 * ============================================================
 * 3. RENAME THE FILE
 * ============================================================
 *
 * rename() changes the filesystem entry from the source path
 * to the destination path.
 *
 * Important:
 *
 *     rename()
 *         ↓
 *     source disappears
 *         ↓
 *     destination appears
 *
 * It is NOT the same as copyFile().
 */
async function renameFile() {
  try {
    await rename(sourcePath, destinationPath);

    console.log("--- File Rename ---\n");

    console.log(`From: ${sourcePath}`);
    console.log(`To:   ${destinationPath}`);

    console.log("\nFile renamed successfully.");
  } catch (error) {
    /**
     * --------------------------------------------------------
     * Handle a missing source file specifically.
     * --------------------------------------------------------
     *
     * ENOENT means that the requested filesystem entry
     * does not exist.
     */
    if (error.code === "ENOENT") {
      console.error("\nSource file does not exist.");
      console.error(`Expected source: ${sourcePath}`);

      return;
    }

    /**
     * --------------------------------------------------------
     * Handle any other filesystem error.
     * --------------------------------------------------------
     */
    console.error("\nFailed to rename file.");
    console.error(`Error code: ${error.code}`);
    console.error(`Error message: ${error.message}`);
  }
}

/**
 * ============================================================
 * 4. START THE OPERATION
 * ============================================================
 */
renameFile();
