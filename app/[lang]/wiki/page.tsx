import type { Metadata } from "next";
import Link from "next/link";
import { Archive, ArrowRight, Monitor, Shield, Terminal } from "lucide-react";
import { getNavigation } from "@/lib/wiki";
import { SearchTrigger } from "@/components/search-trigger";
import { format } from "@/lib/i18n/dictionaries";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: "Wiki", description: t.wiki.metaDescription };
}

const ICONS = { linux: Terminal, windows: Monitor, glpi: Shield, archives: Archive } as const;

export default async function WikiHome() {
  const { locale, t } = await getI18n();
  const nav = await getNavigation(locale);
  const total = nav.reduce((n, s) => n + s.pages.length, 0);

  return (
    <div>
      <p className="text-sm font-medium text-brand">{format(t.wiki.eyebrow, { n: total })}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{t.wiki.title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {t.wiki.lead}
      </p>
      <div className="max-w-xl">
        <SearchTrigger label={t.wiki.searchPlaceholder} />
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {nav.map((s) => {
          const Icon = ICONS[s.id];
          return (
            <section key={s.id} id={s.id} className="rounded-2xl border bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <Link href={`/wiki/${s.id}`} className="group inline-flex items-center gap-1.5 font-semibold">
                    {s.title}
                    <ArrowRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                  {s.pages.length}
                </span>
              </div>
              <ul className="mt-5 grid gap-x-4 sm:grid-cols-2">
                {s.pages.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="block truncate rounded-md py-1.5 text-sm text-muted-foreground transition hover:text-brand"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
