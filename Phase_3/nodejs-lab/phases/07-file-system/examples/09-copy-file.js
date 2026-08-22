import { copyFile, mkdir, writeFile } from "node:fs/promises";
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
 * 2. BUILD ABSOLUTE PATHS
 * ============================================================
 *
 * Project structure:
 *
 * 07-file-system/
 * ├── examples/
 * │   └── 09-copy-file.js
 * │
 * └── resources/
 *     └── copy-demo.txt
 *
 * We will copy:
 *
 * resources/copy-demo.txt
 *          ↓
 * resources/copy-demo-copy.txt
 */
const resourcesDir = path.join(__dirname, "..", "resources");

const sourcePath = path.join(resourcesDir, "copy-demo.txt");

const destinationPath = path.join(resourcesDir, "copy-demo-copy.txt");

/**
 * ============================================================
 * 3. COPY THE FILE
 * ============================================================
 *
 * copyFile() creates a new filesystem entry containing
 * a copy of the source file's data.
 *
 * Unlike rename():
 *
 * rename()
 *   source ─────────→ destination
 *   source disappears
 *
 * copyFile()
 *   source ─────────→ destination
 *   source remains
 */
async function copyDemoFile() {
  try {
    /**
     * --------------------------------------------------------
     * Ensure the resources directory exists.
     * --------------------------------------------------------
     *
     * recursive: true makes this operation safe to run
     * even if the directory already exists.
     */
    await mkdir(resourcesDir, {
      recursive: true,
    });

    /**
     * --------------------------------------------------------
     * Create a small source file for this demonstration.
     * --------------------------------------------------------
     *
     * This makes the example self-contained and repeatable.
     *
     * In a real application, the source file would normally
     * already exist.
     */
    await writeFile(
      sourcePath,
      "This file demonstrates Node.js copyFile().\n",
      "utf8",
    );

    /**
     * --------------------------------------------------------
     * Copy the source file.
     * --------------------------------------------------------
     */
    await copyFile(sourcePath, destinationPath);

    console.log("--- File Copy ---\n");

    console.log(`Source:`);
    console.log(sourcePath);

    console.log(`\nDestination:`);
    console.log(destinationPath);

    console.log("\nFile copied successfully.");
  } catch (error) {
    /**
     * --------------------------------------------------------
     * Handle filesystem errors.
     * --------------------------------------------------------
     */
    if (error.code === "ENOENT") {
      console.error(
        "Copy failed: source file or destination directory does not exist.",
      );
    } else if (error.code === "EACCES") {
      console.error("Copy failed: permission denied.");
    } else if (error.code === "EEXIST") {
      console.error("Copy failed: destination already exists.");
    } else {
      console.error("Failed to copy file:", error.message);
    }

    console.error(`Error code: ${error.code}`);
  }
}

/**
 * ============================================================
 * 4. START THE PROGRAM
 * ============================================================
 */
copyDemoFile();
