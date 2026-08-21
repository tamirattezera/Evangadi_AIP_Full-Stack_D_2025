import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";

// 1. Get the current module's file path
const __filename = fileURLToPath(import.meta.url);

// 2. Get the directory containing this file
const __dirname = path.dirname(__filename);

// 3. Move from examples/ → project root → resources/profile.json
const filePath = path.join(__dirname, "..", "resources", "profile.json");

async function createProfileFile() {
  const profile = {
    name: "Tamirat",
    role: "AI-Powered Full-Stack Engineer",
    runtime: "Node.js",
  };

  try {
    const jsonString = JSON.stringify(profile, null, 2);

    await writeFile(filePath, jsonString, "utf8");

    console.log(`Successfully wrote JSON data to: ${filePath}`);
  } catch (error) {
    console.error("Failed to write file:", error);
  }
}

createProfileFile();
