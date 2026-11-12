import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Clock, HeartHandshake, Languages, Lightbulb, ListTree, Pencil } from "lucide-react";
import { getAllPages, getPage, getSections } from "@/lib/wiki";
import { WikiArticle } from "@/components/wiki/article";
import { TableOfContents } from "@/components/wiki/toc";
import { SECTION_STYLE } from "@/components/wiki/section-style";
import { format } from "@/lib/i18n/dictionaries";
import { getI18n } from "@/lib/i18n/server";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPages()).map((p) => ({ section: p.section, slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/[lang]/wiki/[section]/[slug]">): Promise<Metadata> {
  const { section, slug } = await props.params;
  const { locale } = await getI18n();
  const page = await getPage(section, slug, locale);
  if (!page) return {};
  return { title: page.title, description: page.description || undefined };
}

export default async function WikiArticlePage(props: PageProps<"/[lang]/wiki/[section]/[slug]">) {
  const { section, slug } = await props.params;
  const { locale, t } = await getI18n();
  const page = await getPage(section, slug, locale);
  if (!page) notFound();
  const w = t.wiki;
  const sectionMeta = getSections(locale).find((s) => s.id === page.section)!;
  const style = SECTION_STYLE[page.section];
  const sectionsCount = page.toc.filter((h) => h.depth === 2).length;

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-10">
      <article className="min-w-0 max-w-3xl">
        {/* En-tête du guide */}
        <header className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 ${style.soft}`}>
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/wiki" className="hover:text-foreground">
              Wiki
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href={`/wiki/${sectionMeta.id}`} className="hover:text-foreground">
              {sectionMeta.title}
            </Link>
          </nav>
          <div className="mt-4 flex items-start gap-4">
            <span className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-3xl shadow-lg ${style.gradient}`}>
              {style.emoji}
            </span>
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{page.title}</h1>
              {page.description && <p className="mt-2 text-lg text-muted-foreground">{page.description}</p>}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-muted-foreground">
              <Clock className="size-3.5" /> {format(w.readingTime, { n: page.minutes })}
            </span>
            {sectionsCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-muted-foreground">
                <ListTree className="size-3.5" /> {format(w.sectionsCount, { n: sectionsCount })}
              </span>
            )}
            {!page.translated && w.englishOnly && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-muted-foreground">
                <Languages className="size-3.5" /> {w.englishOnly}
              </span>
            )}
          </div>
        </header>

        {/* Astuce */}
        <div className="mt-6 flex gap-3 rounded-2xl border border-dashed p-4 text-sm">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p>
            <span className="font-medium">{w.tipTitle} · </span>
            <span className="text-muted-foreground">{w.tipText}</span>
          </p>
        </div>

        <div className="mt-8">
          <WikiArticle html={page.html} />
        </div>

        {/* Besoin d'aide ? */}
        <section className="relative mt-14 overflow-hidden rounded-3xl border bg-card p-6 sm:p-8">
          <div className="absolute -right-10 -top-16 size-48 rounded-full bg-brand-1/20 blur-3xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-1 to-brand-2 text-white shadow-lg shadow-brand-1/30">
              <HeartHandshake className="size-6" />
            </span>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{w.helpTitle}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{w.helpText}</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {w.helpCta}
            </Link>
          </div>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {page.prev ? (
            <Link href={page.prev.href} className="group rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:border-brand/40">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" /> {w.previous}
              </span>
              <span className="mt-1 block font-medium group-hover:text-brand">{page.prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {page.next && (
            <Link href={page.next.href} className="group rounded-2xl border p-4 text-right transition hover:-translate-y-0.5 hover:border-brand/40">
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                {w.next} <ChevronRight className="size-3" />
              </span>
              <span className="mt-1 block font-medium group-hover:text-brand">{page.next.title}</span>
            </Link>
          )}
        </div>

        <div className="mt-6 text-sm">
          <a
            href={page.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand"
          >
            <Pencil className="size-3.5" /> {w.edit}
          </a>
        </div>
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-26 max-h-[calc(100dvh-8rem)] overflow-y-auto">
          <TableOfContents headings={page.toc} />
        </div>
      </aside>
    </div>
  );
}
