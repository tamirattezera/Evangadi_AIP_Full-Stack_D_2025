function triangleArea(base, height) {
  // Validate data types
  if (typeof base !== "number" || typeof height !== "number") {
    return "Error: Base and height must be numbers.";
  }

  // Check for NaN values
  if (Number.isNaN(base) || Number.isNaN(height)) {
    return "Error: Invalid numeric value.";
  }

  // Validate positive values
  if (base <= 0 || height <= 0) {
    return "Error: Base and height must be positive numbers.";
  }

  // Calculate triangle area
  return (base * height) / 2;
}

console.log(triangleArea(8, 4)); // 16
console.log(triangleArea(2, 5)); // 5
console.log(triangleArea(-2, 5)); // Error
console.log(triangleArea(2, "two")); // Error
console.log(triangleArea(NaN, 5)); // Error
