import { getSearchIndex } from "@/lib/wiki";
import { getToolCategories } from "@/lib/tools-fr";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n/dictionaries";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/search/[lang]">) {
  const { lang } = await ctx.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const pages = await getSearchIndex(locale);
  const tools = getToolCategories(locale).flatMap((c) =>
    c.items.map((t) => ({ title: t.app, detail: t.detail, url: t.url, img: t.img, category: c.title })),
  );
  return Response.json({ pages, tools });
}
