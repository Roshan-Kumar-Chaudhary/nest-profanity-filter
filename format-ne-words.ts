// format-ne-words.ts
import { readFileSync } from "fs";

const lines = readFileSync("ne_words.txt", "utf8")
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);

// De-duplicate (case-insensitive) while preserving original casing of first occurrence
const seen = new Set<string>();
const deduped = lines.filter((w) => {
  const key = w.toLowerCase();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

// Escape double-quotes and backslashes so the output is valid TS
const escaped = deduped.map((w) => w.replace(/\\/g, "\\\\").replace(/"/g, '\\"'));

const output =
  "export const NE_WORDS: string[] = [\n" +
  escaped.map((w) => `  "${w}",`).join("\n") +
  "\n];\n";

console.log(output);
