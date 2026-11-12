import { getSearchIndex } from "@/lib/wiki";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n/dictionaries";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/search/[lang]">) {
  const { lang } = await ctx.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return Response.json({ pages: await getSearchIndex(locale) });
}
