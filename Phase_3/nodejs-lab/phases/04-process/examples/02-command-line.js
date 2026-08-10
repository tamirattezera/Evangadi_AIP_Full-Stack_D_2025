// ==========================================================
// NODE.JS PROCESS MODULE
// COMMAND-LINE INPUT
// TYPE CONVERSION & VALIDATION
// ==========================================================
//
// Purpose:
// Convert raw command-line strings into useful application
// values and validate required input before continuing.
//
// Example:
//
// node 02-command-line.js Tamirat 963 AI-Engineer Ethiopia
//
// ==========================================================

// ==========================================================
// 1. READ RAW COMMAND-LINE INPUT
// ==========================================================

const name = process.argv[2];

const rawId = process.argv[3];

const role = process.argv[4];

const country = process.argv[5];

// ==========================================================
// 2. VALIDATE REQUIRED INPUT
// ==========================================================
//
// The application requires four user values.
//
// ==========================================================

if (!name || !rawId || !role || !country) {
  console.error("Error: name, id, role, and country are required.");

  process.exit(1);
}

// ==========================================================
// 3. CONVERT ID FROM STRING TO NUMBER
// ==========================================================

const id = Number(rawId);

// ==========================================================
// 4. VALIDATE THE CONVERTED ID
// ==========================================================

if (Number.isNaN(id)) {
  console.error("Error: ID must be a valid number.");

  process.exit(1);
}

// ==========================================================
// 5. CREATE STRUCTURED APPLICATION DATA
// ==========================================================

const userInput = {
  name,
  id,
  role,
  country,
};

// ==========================================================
// 6. DISPLAY RESULT
// ==========================================================

console.log("========================================");

console.log(" COMMAND-LINE USER INPUT ");

console.log("========================================");

console.table(userInput);

console.log("========================================");
