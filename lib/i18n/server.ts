import "server-only";
import { lang } from "next/root-params";
import { DEFAULT_LOCALE, dictionaries, isLocale, type Locale } from "./dictionaries";

/** Langue courante, lue depuis le segment racine app/[lang]. */
export async function getLocale(): Promise<Locale> {
  const l = await lang();
  return isLocale(l) ? l : DEFAULT_LOCALE;
}

export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
