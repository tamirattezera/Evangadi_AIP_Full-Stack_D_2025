import fs from "node:fs";
const filePath = "../resources/sample.txt";

try {
  fs.writeFileSync(
    filePath,
    "Hello from Node.js synchronous file writing.",
    "utf8",
  );
  console.log("SYNCHRONOUS FILE WRITING");
  console.log("file:", filePath);
} catch (error) {
  console.error("Failed to write file", error);
}
