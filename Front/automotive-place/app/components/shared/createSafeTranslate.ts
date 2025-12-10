export type TranslateFn = (key: string, values?: Record<string, any>) => string;

export const createSafeTranslate = (t: TranslateFn) => {
  return (maybeKeyOrText?: string | null) => {
    if (!maybeKeyOrText) return null;

    const looksLikeLiteral =
      /\s|\(|\)|\{|\}|\[|\]|%|:|,/.test(maybeKeyOrText) ||
      maybeKeyOrText.length > 40;

    if (looksLikeLiteral) return maybeKeyOrText;

    try {
      const translated = t(maybeKeyOrText);
      return translated ?? maybeKeyOrText;
    } catch {
      return maybeKeyOrText;
    }
  };
};
