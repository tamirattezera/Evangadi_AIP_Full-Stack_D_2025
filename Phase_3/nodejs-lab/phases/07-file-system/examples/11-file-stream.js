import { createReadStream, createWriteStream } from "node:fs";

import { mkdir } from "node:fs/promises";

import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * ============================================================
 * 1. RESOLVE THE CURRENT MODULE DIRECTORY
 * ============================================================
 *
 * Because this project uses ES modules, __dirname is not
 * available automatically.
 *
 * We reconstruct it:
 *
 * import.meta.url
 *       ↓
 * fileURLToPath()
 *       ↓
 * __filename
 *       ↓
 * path.dirname()
 *       ↓
 * __dirname
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * ============================================================
 * 2. BUILD FILE PATHS
 * ============================================================
 *
 * Project structure:
 *
 * 07-file-system/
 *
 * ├── examples/
 * │   └── 11-file-stream.js
 * │
 * └── resources/
 *     ├── sample.txt
 *     └── stream-output.txt
 *
 * We will:
 *
 * 1. Read sample.txt as a stream.
 * 2. Write the chunks into stream-output.txt.
 */
const resourcesDir = path.join(__dirname, "..", "resources");

const sourcePath = path.join(resourcesDir, "sample.txt");

const destinationPath = path.join(resourcesDir, "stream-output.txt");

/**
 * ============================================================
 * 3. COPY A FILE USING STREAMS
 * ============================================================
 *
 * createReadStream()
 *      ↓
 * reads the source file in chunks
 *
 * createWriteStream()
 *      ↓
 * writes chunks to the destination
 *
 * Instead of loading the entire file into memory:
 *
 *     readFile()
 *        ↓
 *     [ENTIRE FILE]
 *        ↓
 *      MEMORY
 *
 * Streams work like:
 *
 *     file
 *      ↓
 *    chunk
 *      ↓
 *    chunk
 *      ↓
 *    chunk
 *      ↓
 *     ...
 */
async function copyFileUsingStreams() {
  try {
    /**
     * --------------------------------------------------------
     * Make sure the resources directory exists.
     * --------------------------------------------------------
     */
    await mkdir(resourcesDir, {
      recursive: true,
    });

    /**
     * --------------------------------------------------------
     * Create the readable stream.
     * --------------------------------------------------------
     *
     * The stream does NOT immediately load the entire file
     * into memory.
     *
     * Data becomes available progressively.
     */
    const readStream = createReadStream(sourcePath, {
      encoding: "utf8",
    });

    /**
     * --------------------------------------------------------
     * Create the writable stream.
     * --------------------------------------------------------
     *
     * Data will be written progressively as chunks arrive.
     */
    const writeStream = createWriteStream(destinationPath, {
      encoding: "utf8",
    });

    /**
     * --------------------------------------------------------
     * Track how many chunks we receive.
     * --------------------------------------------------------
     *
     * This is only for learning/debugging.
     */
    let chunkCount = 0;

    /**
     * ========================================================
     * READ STREAM EVENTS
     * ========================================================
     *
     * A Readable stream emits events as data becomes
     * available.
     *
     * "data"
     *     ↓
     * a chunk has arrived
     *
     * "end"
     *     ↓
     * no more data remains
     *
     * "error"
     *     ↓
     * something went wrong
     */
    readStream.on("data", (chunk) => {
      chunkCount++;

      console.log(`Received chunk #${chunkCount}`);

      console.log(`Chunk size: ${chunk.length}`);

      /**
       * Write the current chunk to the destination.
       */
      writeStream.write(chunk);
    });

    /**
     * --------------------------------------------------------
     * READ STREAM COMPLETED
     * --------------------------------------------------------
     */
    readStream.on("end", () => {
      /**
       * Signal that no more data will be written.
       */
      writeStream.end();

      console.log("\n--- Stream Completed ---");
      console.log(`Total chunks: ${chunkCount}`);

      console.log(`Output: ${destinationPath}`);
    });

    /**
     * --------------------------------------------------------
     * READ STREAM ERROR
     * --------------------------------------------------------
     */
    readStream.on("error", (error) => {
      console.error("Read stream failed:", error.message);

      /**
       * If reading fails, stop the destination stream.
       */
      writeStream.destroy(error);
    });

    /**
     * --------------------------------------------------------
     * WRITE STREAM ERROR
     * --------------------------------------------------------
     */
    writeStream.on("error", (error) => {
      console.error("Write stream failed:", error.message);
    });
  } catch (error) {
    /**
     * Handles errors that happen while creating the
     * streams or preparing the environment.
     */
    console.error("Failed to initialize file streams:", error.message);
  }
}


copyFileUsingStreams();
