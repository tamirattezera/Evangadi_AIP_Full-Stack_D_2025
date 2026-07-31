export const MODEL = "gpt-5.5";

export function countTokens(text) {
  return text.length;
}

export function estimateCost(tokens) {
  return tokens * 0.00001;
}

export default async function askAI(prompt) {
  return `AI Response: ${prompt}`;
}
