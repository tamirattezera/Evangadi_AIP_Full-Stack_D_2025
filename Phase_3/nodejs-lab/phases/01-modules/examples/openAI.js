import askAI, { MODEL, countTokens, estimateCost } from "./openai-service.js";

console.log("========== AI SERVICE ==========");

console.log("Model:");
console.log(MODEL);

console.log();

const prompt = "Hello AI";

const response = await askAI(prompt);

console.log("AI Response:");
console.log(response);

console.log();

const tokens = countTokens(prompt);

console.log("Token Count:");
console.log(tokens);

console.log();

const price = estimateCost(tokens);

console.log("Estimated Cost:");
console.log(price);
