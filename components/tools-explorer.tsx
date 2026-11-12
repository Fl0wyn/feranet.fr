"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { ToolCategory } from "@/lib/tools";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function ToolsExplorer({ categories }: { categories: ToolCategory[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => !category || c.title === category)
      .map((c) => ({
        ...c,
        items: [...c.items]
          .filter((t) => !q || t.app.toLowerCase().includes(q) || t.detail.toLowerCase().includes(q))
          .sort((a, b) => a.app.localeCompare(b.app)),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, query, category]);

  const shown = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 border-b bg-background/85 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter tools by name or description…"
            className="h-11 w-full rounded-xl border bg-card pl-10 pr-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand/50 focus:ring-4 focus:ring-brand-soft"
            aria-label="Filter tools"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted"
              aria-label="Clear"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          <Chip active={!category} onClick={() => setCategory(null)}>
            All
          </Chip>
          {categories.map((c) => (
            <Chip key={c.title} active={category === c.title} onClick={() => setCategory(category === c.title ? null : c.title)}>
              {c.title} <span className="opacity-60">{c.items.length}</span>
            </Chip>
          ))}
        </div>
      </div>

      {shown === 0 && (
        <p className="py-20 text-center text-muted-foreground">
          No tool matches “{query}”.
        </p>
      )}

      {filtered.map((c) => (
        <section key={c.title} id={slug(c.title)} className="mt-10 scroll-mt-40">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            {c.title}
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">{c.items.length}</span>
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.items.map((t) => (
              <a
                key={t.app + t.url}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand-1/5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/${t.img}`} alt="" width={22} height={22} loading="lazy" className="size-[22px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 font-medium">
                    {t.app}
                    <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{t.detail}</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition ${
        active ? "border-foreground bg-foreground text-background" : "bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
