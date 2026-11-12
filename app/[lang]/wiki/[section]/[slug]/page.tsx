import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Languages, Pencil } from "lucide-react";
import { getAllPages, getPage, getSections } from "@/lib/wiki";
import { getI18n } from "@/lib/i18n/server";
import { WikiArticle } from "@/components/wiki/article";
import { TableOfContents } from "@/components/wiki/toc";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPages()).map((p) => ({ section: p.section, slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/[lang]/wiki/[section]/[slug]">): Promise<Metadata> {
  const { section, slug } = await props.params;
  const page = await getPage(section, slug);
  if (!page) return {};
  return { title: page.title, description: page.description || undefined };
}

export default async function WikiArticlePage(props: PageProps<"/[lang]/wiki/[section]/[slug]">) {
  const { section, slug } = await props.params;
  const page = await getPage(section, slug);
  if (!page) notFound();
  const { locale, t } = await getI18n();
  const sectionMeta = getSections(locale).find((s) => s.id === page.section)!;

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-10">
      <article className="min-w-0 max-w-3xl">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/wiki" className="hover:text-foreground">
            Wiki
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href={`/wiki/${sectionMeta.id}`} className="hover:text-foreground">
            {sectionMeta.title}
          </Link>
        </nav>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
        {page.description && <p className="mt-3 text-lg text-muted-foreground">{page.description}</p>}
        {t.wiki.englishOnly && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
            <Languages className="size-3.5" /> {t.wiki.englishOnly}
          </p>
        )}

        <div className="mt-8">
          <WikiArticle html={page.html} />
        </div>

        <div className="mt-14 flex items-center border-t pt-6 text-sm">
          <a
            href={page.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand"
          >
            <Pencil className="size-3.5" /> {t.wiki.edit}
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {page.prev ? (
            <Link href={page.prev.href} className="group rounded-xl border p-4 transition hover:border-brand/40">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" /> {t.wiki.previous}
              </span>
              <span className="mt-1 block font-medium group-hover:text-brand">{page.prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {page.next && (
            <Link href={page.next.href} className="group rounded-xl border p-4 text-right transition hover:border-brand/40">
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                {t.wiki.next} <ChevronRight className="size-3" />
              </span>
              <span className="mt-1 block font-medium group-hover:text-brand">{page.next.title}</span>
            </Link>
          )}
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
