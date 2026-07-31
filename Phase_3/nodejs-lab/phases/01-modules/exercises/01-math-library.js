// ========================================
// CONSTANTS
// ========================================

export const PI = 3.14159;

export const TAX = 0.15;

// ========================================
// BASIC OPERATIONS
// ========================================

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

// ========================================
// ADVANCED OPERATIONS
// ========================================

export function average(a, b) {
  return (a + b) / 2;
}

export function square(a) {
  return a * a;
}
