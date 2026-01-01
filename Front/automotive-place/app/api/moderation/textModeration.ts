import { bannedWords } from "./bannedWords";

export function checkText(text: string): { ok: boolean; word?: string } {
  const lowerText = text.toLowerCase();
  for (const word of bannedWords) {
    if (lowerText.includes(word)) {
      return { ok: false, word };
    }
  }
  return { ok: true };
}
