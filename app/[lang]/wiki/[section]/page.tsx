import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getNavigation, getSections, SECTIONS } from "@/lib/wiki";
import { getI18n } from "@/lib/i18n/server";
import { format } from "@/lib/i18n/dictionaries";
import { SECTION_STYLE } from "@/components/wiki/section-style";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.id }));
}

export async function generateMetadata(props: PageProps<"/[lang]/wiki/[section]">): Promise<Metadata> {
  const { section } = await props.params;
  const { locale } = await getI18n();
  const s = getSections(locale).find((x) => x.id === section);
  return s ? { title: `${s.title} · Wiki`, description: s.description } : {};
}

export default async function SectionPage(props: PageProps<"/[lang]/wiki/[section]">) {
  const { section } = await props.params;
  const { locale, t } = await getI18n();
  const s = (await getNavigation(locale)).find((x) => x.id === section);
  if (!s) notFound();
  const style = SECTION_STYLE[s.id];

  return (
    <div className="max-w-3xl">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/wiki" className="hover:text-foreground">
          Wiki
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{s.title}</span>
      </nav>
      <div className="mt-4 flex items-center gap-4">
        <span className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-3xl shadow-lg ${style.gradient}`}>
          {style.emoji}
        </span>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{s.title}</h1>
          <p className="mt-1 text-muted-foreground">{s.description}</p>
        </div>
      </div>
      <div className="mt-10 divide-y rounded-2xl border bg-card">
        {s.pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex items-center gap-4 px-5 py-4 transition first:rounded-t-2xl last:rounded-b-2xl hover:bg-muted/50"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium group-hover:text-brand">{p.title}</p>
              {p.description && <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{p.description}</p>}
              <p className="mt-1 text-xs text-muted-foreground">{format(t.wiki.readingTime, { n: p.minutes })}</p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
