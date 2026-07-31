// ========================================
// Multiple Exports Example
// ========================================

// Named export
export const APP_NAME = "Node Learning Lab";

// Named export
export const VERSION = "1.0.0";

// Named export
export function showVersion() {
  console.log(`Version: ${VERSION}`);
}

// Default export
export default function greet(name) {
  return `Welcome, ${name}!`;
}
