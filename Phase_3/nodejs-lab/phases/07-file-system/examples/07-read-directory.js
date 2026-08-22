import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * ============================================================
 * 1. RESOLVE THE CURRENT MODULE DIRECTORY
 * ============================================================
 *
 * Because this project uses ES modules, Node.js does not provide
 * __dirname automatically.
 *
 * We reconstruct it from import.meta.url:
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
 * 2. BUILD THE TARGET DIRECTORY PATH
 * ============================================================
 *
 * Current file:
 *
 *   examples/07-read-directory.js
 *
 * Target directory:
 *
 *   resources/
 *
 * Result:
 *
 *   ../resources
 *
 * We use path.join() instead of manually concatenating strings.
 */
const targetDir = path.join(__dirname, "..", "resources");

/**
 * ============================================================
 * 3. READ DIRECTORY
 * ============================================================
 *
 * readdir() reads the entries inside a directory.
 *
 * IMPORTANT:
 *
 * readdir() does NOT read the contents of the files.
 *
 * For example:
 *
 * resources/
 * ├── profile.json
 * ├── sample.txt
 * └── application.log
 *
 * readdir() gives us information about these entries,
 * not the contents of those files.
 *
 * We use:
 *
 *   withFileTypes: true
 *
 * so Node returns Dirent objects instead of simple strings.
 *
 * Dirent gives us useful methods such as:
 *
 *   entry.isFile()
 *   entry.isDirectory()
 *   entry.isSymbolicLink()
 */
async function inspectDirectory() {
  try {
    /**
     * Read directory entries.
     *
     * Result:
     *
     *   Dirent[]
     */
    const entries = await readdir(targetDir, {
      withFileTypes: true,
    });

    console.log("\n--- Directory Listing ---");
    console.log(`Directory: ${targetDir}\n`);

    /**
     * Iterate through every directory entry.
     */
    for (const entry of entries) {
      /**
       * Determine the filesystem entry type.
       *
       * We check directories first.
       */
      let type;

      if (entry.isDirectory()) {
        type = "DIRECTORY";
      } else if (entry.isFile()) {
        type = "FILE";
      } else if (entry.isSymbolicLink()) {
        type = "SYMLINK";
      } else {
        type = "OTHER";
      }

      /**
       * Display the type and entry name.
       *
       * padEnd() makes the output easier to read.
       */
      console.log(`${type.padEnd(10)} ${entry.name}`);
    }

    console.log("\n--------------------------------");
  } catch (error) {
    /**
     * Handle filesystem errors.
     *
     * Common examples:
     *
     *   ENOENT → directory doesn't exist
     *   EACCES → permission denied
     */
    console.error("\nFailed to read directory.");

    console.error(`Error code: ${error.code}`);
    console.error(`Error message: ${error.message}`);
  }
}

/**
 * ============================================================
 * 4. START PROGRAM
 * ============================================================
 */
inspectDirectory();
