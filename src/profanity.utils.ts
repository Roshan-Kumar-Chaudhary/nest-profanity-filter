export function escapeRegex(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  
  /**
   * Builds a Unicode-aware whole-word regex for a word list.
   * Uses lookarounds with \p{L} instead of \b so Nepali/Unicode works better.
   */
  export function buildWholeWordRegex(words: string[], caseInsensitive: boolean) {
    const clean = words
      .map((w) => w?.trim())
      .filter(Boolean)
      .sort((a, b) => b.length - a.length) // longest first
      .map(escapeRegex);
  
    if (!clean.length) return null;
  
    // Whole word boundaries for unicode letters
    // Not preceded by a letter, not followed by a letter
    const pattern = `(?<!\\p{L})(${clean.join("|")})(?!\\p{L})`;
  
    // g = global, u = unicode
    // i = optional case-insensitive
    return new RegExp(pattern, caseInsensitive ? "giu" : "gu");
  }
  
  export function maskWord(word: string, maskChar: string, preserveFirstLast: boolean) {
    const chars = Array.from(word); // unicode-safe (codepoints)
    if (chars.length === 0) return word;
  
    if (!preserveFirstLast) return maskChar.repeat(chars.length);
  
    if (chars.length <= 2) return maskChar.repeat(chars.length);
  
    return chars[0] + maskChar.repeat(chars.length - 2) + chars[chars.length - 1];
  }
  