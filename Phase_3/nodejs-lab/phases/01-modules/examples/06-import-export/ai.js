// Private variable
const API_PROVIDER = "openAI";

// Named export
export const MODEL = "gpt-5.5";

// Default export
export default function generateResponse(prompt) {
  return `[${API_PROVIDER}] Response to: ${prompt}`;
}
