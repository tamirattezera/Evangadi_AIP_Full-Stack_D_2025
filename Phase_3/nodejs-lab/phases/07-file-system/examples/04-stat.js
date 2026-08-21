import { stat } from "node:fs/promises";
import path from "node:path";

/**
 * Read the filesystem path supplied from the command line.
 *
 * Example:
 *   node 04-stat.js ../resources/profile.json
 *
 * process.argv:
 *   [0] → Node executable
 *   [1] → JavaScript file being executed
 *   [2] → First user-provided argument
 */
const inputPath = process.argv[2];

/**
 * Make sure the user actually provided a path.
 *
 * Without this check, path.resolve(undefined) would not represent
 * the filesystem target we expect.
 */
if (!inputPath) {
  console.error("Usage: node 04-stat.js <path>");
  process.exit(1);
}

/**
 * Convert the user-provided path into an absolute path.
 *
 * Example:
 *
 *   ../resources/profile.json
 *              ↓
 *   /home/tamirat963/.../07-file-system/resources/profile.json
 *
 * path.resolve() resolves the relative path against the
 * current working directory.
 */
const targetPath = path.resolve(inputPath);

/**
 * Inspect the filesystem object.
 */
async function inspectPath() {
  try {
    /**
     * stat() asks the operating system for metadata about
     * the target filesystem object.
     *
     * IMPORTANT:
     * stat() does NOT read the file's contents.
     *
     * It gives us metadata such as:
     * - size
     * - modification time
     * - creation/birth time
     * - whether it's a file
     * - whether it's a directory
     */
    const stats = await stat(targetPath);

    console.log("\n--- File System Information ---");

    // Absolute path that was inspected.
    console.log(`Path: ${targetPath}`);

    // Size is reported by the filesystem in bytes.
    console.log(`Size: ${stats.size} bytes`);

    // Determine whether the target is a regular file.
    console.log(`Is file: ${stats.isFile()}`);

    // Determine whether the target is a directory.
    console.log(`Is directory: ${stats.isDirectory()}`);

    // Last modification time reported by the filesystem.
    console.log(`Modified: ${stats.mtime}`);

    // Creation/birth time where supported by the filesystem.
    console.log(`Created: ${stats.birthtime}`);

    console.log("--------------------------------\n");
  } catch (error) {
    /**
     * Filesystem errors have useful machine-readable codes.
     *
     * ENOENT means:
     *
     * Error NO ENTry
     *
     * In practical terms, the requested filesystem
     * entry doesn't exist.
     */
    if (error.code === "ENOENT") {
      console.error(`Path does not exist: ${targetPath}`);
      return;
    }

    /**
     * Handle unexpected filesystem errors separately.
     *
     * We don't want to assume every failure means
     * "file doesn't exist."
     */
    console.error("Failed to inspect path.");
    console.error(`Error code: ${error.code}`);
    console.error(`Error message: ${error.message}`);
  }
}

inspectPath();
