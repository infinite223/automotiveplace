import path from "path";
import fs from "fs";

export const getTranslations = (locale: string) => {
  const filePath = path.join(process.cwd(), `locales/${locale}.json`);
  const translations = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return translations;
};
