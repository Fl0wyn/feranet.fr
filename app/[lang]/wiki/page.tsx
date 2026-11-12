import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { getNavigation } from "@/lib/wiki";
import { SearchTrigger } from "@/components/search-trigger";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { SECTION_STYLE, START_HERE } from "@/components/wiki/section-style";
import { format } from "@/lib/i18n/dictionaries";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: "Wiki", description: t.wiki.metaDescription };
}

export default async function WikiHome() {
  const { locale, t } = await getI18n();
  const w = t.wiki;
  const nav = await getNavigation(locale);
  const pages = nav.flatMap((s) => s.pages);
  const total = pages.length;
  const startHere = START_HERE.map((key) => pages.find((p) => `${p.section}/${p.slug}` === key)).filter(
    (p): p is NonNullable<typeof p> => !!p,
  );

  return (
    <div>
      {/* Accueil */}
      <section className="relative isolate overflow-hidden rounded-3xl border bg-card px-6 py-10 sm:px-10">
        <div className="absolute -right-16 -top-20 -z-10 size-64 rounded-full bg-brand-1/20 blur-3xl" />
        <div className="absolute -bottom-24 left-10 -z-10 size-64 rounded-full bg-brand-2/20 blur-3xl" />
        <p className="text-sm font-medium text-brand">{format(w.eyebrow, { n: total })}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{w.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{w.lead}</p>
        <div className="max-w-xl">
          <SearchTrigger label={w.searchPlaceholder} />
        </div>
      </section>

      {/* Pour commencer */}
      {startHere.length > 0 && (
        <section className="mt-12">
          <Reveal>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Sparkles className="size-5 text-brand" /> {w.startTitle}
            </h2>
            <p className="mt-1 text-muted-foreground">{w.startText}</p>
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {startHere.map((p, i) => {
              const style = SECTION_STYLE[p.section];
              return (
                <Reveal key={p.href} delay={i * 70}>
                  <TiltCard href={p.href} max={10} className="h-full rounded-2xl border bg-card p-5">
                    <span className={`tilt-pop grid size-11 place-items-center rounded-xl bg-gradient-to-br text-xl ${style.gradient}`}>
                      {style.emoji}
                    </span>
                    <h3 className="mt-4 font-semibold group-hover:text-brand">{p.title}</h3>
                    {p.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>}
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" /> {format(w.readingTime, { n: p.minutes })}
                    </p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Par thème */}
      <section className="mt-14">
        <Reveal>
          <h2 className="text-xl font-semibold">{w.browse}</h2>
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {nav.map((s, i) => {
            const style = SECTION_STYLE[s.id];
            return (
              <Reveal key={s.id} delay={(i % 2) * 80}>
                <section id={s.id} className="h-full overflow-hidden rounded-3xl border bg-card">
                  <Link href={`/wiki/${s.id}`} className={`group flex items-center gap-4 p-6 ${style.soft}`}>
                    <span className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-2xl shadow-lg ${style.gradient}`}>
                      {style.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-lg font-semibold">
                        {s.title}
                        <ArrowRight className="size-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </p>
                      <p className="text-sm text-muted-foreground">{s.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {format(w.guides, { n: s.pages.length })}
                    </span>
                  </Link>
                  <ul className="divide-y">
                    {s.pages.map((p) => (
                      <li key={p.href}>
                        <Link
                          href={p.href}
                          className="group flex items-center gap-3 px-6 py-3 text-sm transition hover:bg-muted/50"
                        >
                          <span className="min-w-0 flex-1 truncate group-hover:text-brand">{p.title}</span>
                          <span className="shrink-0 text-xs text-muted-foreground">{format(w.readingTime, { n: p.minutes })}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
