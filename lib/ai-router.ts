import { askOpenAI } from "./openai";
import { askGemini } from "./gemini";

export async function askAI(prompt: string) {
  // Simple intelligent routing
  if (prompt.length < 200) {
    return askOpenAI(prompt);
  } else {
    return askGemini(prompt);
  }
}
