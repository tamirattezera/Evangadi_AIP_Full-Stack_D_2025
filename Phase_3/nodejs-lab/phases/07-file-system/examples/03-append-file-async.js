import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const logDirPath = path.resolve("../resources");
const logFilePath = path.join(logDirPath, "application.log");

async function appendLog() {
  try {
    await mkdir(logDirPath, { recursive: true });

    await appendFile(logFilePath, "Node.js application started\n", "utf8");

    console.log("Append complete");
  } catch (error) {
    console.error("Failed to append to log file:", error.message);
  }
}

appendLog();
