import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || "en";

  try {
    const messages = (await import(`./locales/${locale}.json`)).default;
    return { locale, messages };
  } catch (err) {
    console.error(`Could not load messages for locale "${locale}"`);
    throw err;
  }
});
