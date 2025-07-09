// src/utils/nbspShort.ts

// список коротких слов (предлоги, союзы и т. п.)
const SHORT_WORDS = [
  "в",
  "на",
  "с",
  "к",
  "по",
  "от",
  "до",
  "за",
  "из",
  "об",
  "о", // однобуквенные + двухбуквенные предлоги
  "и",
  "а",
  "но",
  "ли",
  "же",
  "да",
  "или", // союзы, частицы
] as const;

/**
 * Заменяет пробел после короткого слова на неразрывный,
 * чтобы предлог/союз не оказывался в конце строки.
 */
export function nbspShort(text: string): string {
  // \b — граница слова, \s+ — один или несколько пробельных символов
  const pattern = new RegExp(`\\b(${SHORT_WORDS.join("|")})\\s+`, "gi");
  return text.replace(pattern, (_match, word) => {
    // word + NBSP
    return word + "\u00A0";
  });
}
