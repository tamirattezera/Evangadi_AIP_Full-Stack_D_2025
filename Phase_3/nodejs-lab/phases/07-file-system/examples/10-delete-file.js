import { rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * ============================================================
 * 1. RESOLVE THE CURRENT MODULE DIRECTORY
 * ============================================================
 *
 * ES modules don't provide __dirname automatically.
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
 * 2. BUILD THE TARGET FILE PATH
 * ============================================================
 *
 * Project structure:
 *
 * 07-file-system/
 * ├── examples/
 * │   └── 10-delete-file.js
 * │
 * └── resources/
 *     └── delete-demo.txt
 *
 * We will create and then delete:
 *
 * resources/delete-demo.txt
 */
const targetPath = path.join(__dirname, "..", "resources", "delete-demo.txt");

/**
 * ============================================================
 * 3. DELETE THE FILE
 * ============================================================
 *
 * rm() removes a filesystem entry.
 *
 * For a normal file:
 *
 *     file → deleted
 *
 * IMPORTANT:
 *
 * This operation is destructive.
 *
 * Once the file is removed, Node.js does not provide an
 * automatic "undo" operation.
 */
async function deleteDemoFile() {
  try {
    /**
     * --------------------------------------------------------
     * Create a temporary demonstration file.
     * --------------------------------------------------------
     *
     * In a real application, the file would normally already
     * exist. Creating it here makes our lab exercise
     * repeatable.
     */
    await writeFile(
      targetPath,
      "This file will be deleted by Node.js.\n",
      "utf8",
    );

    console.log("--- File Deletion ---\n");

    console.log(`Target: ${targetPath}`);

    /**
     * --------------------------------------------------------
     * Delete the file.
     * --------------------------------------------------------
     */
    await rm(targetPath);

    console.log("\nFile deleted successfully.");
  } catch (error) {
    /**
     * --------------------------------------------------------
     * Handle common filesystem errors.
     * --------------------------------------------------------
     *
     * ENOENT
     * → The file does not exist.
     *
     * EACCES
     * → Permission denied.
     *
     * Other errors
     * → Report the filesystem error.
     */
    if (error.code === "ENOENT") {
      console.error("Delete failed: file does not exist.");
    } else if (error.code === "EACCES") {
      console.error("Delete failed: permission denied.");
    } else {
      console.error("Failed to delete file:", error.message);
    }

    console.error(`Error code: ${error.code}`);
  }
}


deleteDemoFile();
