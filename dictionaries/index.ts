// Note: getDictionary is server-only but types/constants are shared

export type Locale = "uz" | "en" | "ru";

const dictionaries = {
  uz: () => import("./uz.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
  ru: () => import("./ru.json").then((m) => m.default),
};

export const locales: Locale[] = ["uz", "en", "ru"];
export const defaultLocale: Locale = "uz";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();
