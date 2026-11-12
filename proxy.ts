import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, LOCALES, isLocale, negotiateLocale } from "@/lib/i18n/dictionaries";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Langue comme le thème : choix explicite (cookie) sinon préférence du navigateur
 * (Accept-Language). Les URL restent sans préfixe : la requête est réécrite en
 * interne vers app/[lang]/…
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // /fr/… ou /en/… : on mémorise la langue et on redirige vers l'URL sans préfixe.
  const prefix = LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (prefix) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(prefix.length + 1) || "/";
    const res = NextResponse.redirect(url);
    res.cookies.set(LOCALE_COOKIE, prefix, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    return res;
  }

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookie) ? cookie : negotiateLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  const res = NextResponse.rewrite(url);
  // Le contenu varie selon la langue : les caches ne doivent pas mélanger les versions.
  res.headers.set("Vary", "Accept-Language, Cookie");
  return res;
}

export const config = {
  // Tout sauf les fichiers statiques, l'API et les routes internes.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
