console.log("Loading cache-demo.js...");

// Private variable
let counter = 0;

// publick function
export function increment() {
  counter++;
  console.log(`Counter = ${counter}`);
}
