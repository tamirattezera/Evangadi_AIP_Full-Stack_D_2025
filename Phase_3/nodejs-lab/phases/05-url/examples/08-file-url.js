// ==========================================================
// NODE.JS URL MODULE
// FILE URL CONVERSION
// ==========================================================
//
// Purpose:
// Demonstrate conversion between filesystem paths and
// file:// URLs.
//
// ==========================================================

import { pathToFileURL, fileURLToPath } from "node:url";

// ==========================================================
// 1. SOURCE FILESYSTEM PATH
// ==========================================================

const filePath = "/home/tamirat/project/data/config.json";

// ==========================================================
// 2. PATH → FILE URL
// ==========================================================

const fileUrl = pathToFileURL(filePath);

// ==========================================================
// 3. FILE URL → PATH
// ==========================================================

const convertedPath = fileURLToPath(fileUrl);

// ==========================================================
// 4. DISPLAY RESULTS
// ==========================================================

console.log("========================================");

console.log(" FILE URL CONVERSION ");

console.log("========================================");

console.table({
  originalPath: filePath,
  fileUrl: fileUrl.href,
  convertedPath,
});

console.log("========================================");
