"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "./i18n-provider";
import { format, type Dictionary } from "@/lib/i18n/dictionaries";
import { EMAIL, SOCIAL_LINKS, SOCIAL_ORDER, type SocialId } from "@/lib/site";
import { SocialIcon } from "./icons";
import { ArrowUpRight, BookOpen, CornerDownLeft, FileText, Search, Ticket } from "lucide-react";

type PageEntry = { title: string; href: string; section: string; headings: string[]; text: string };
type Result = {
  key: string;
  group: "Navigation" | "Wiki" | "Links";
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  social?: SocialId;
  score: number;
};


function navResults(t: Dictionary): Result[] {
  return [
    { key: "nav-cv", group: "Navigation", title: t.footer.cv, subtitle: t.cv.metaDescription, href: "/cv", score: 0 },
    { key: "nav-wiki", group: "Navigation", title: t.nav.wiki, subtitle: t.search.wikiSub, href: "/wiki", score: 0 },
    { key: "nav-tickets", group: "Navigation", title: t.nav.tickets, subtitle: t.search.ticketsSub, href: "/tickets", score: 0 },
    { key: "nav-new", group: "Navigation", title: t.search.newTicket, subtitle: t.search.newTicketSub, href: "/tickets/new", score: 0 },
  ];
}

function navLinks(t: Dictionary): Result[] {
  return SOCIAL_ORDER.map((id) => ({
    key: `link-${id}`,
    group: "Links" as const,
    title: t.social[id],
    subtitle: id === "email" ? EMAIL : SOCIAL_LINKS[id].replace(/^https?:\/\/(www\.)?/, ""),
    href: SOCIAL_LINKS[id],
    external: /^https?:/.test(SOCIAL_LINKS[id]),
    social: id,
    score: 0,
  }));
}

export const openCommandMenu = () => window.dispatchEvent(new Event("feranet:command-menu"));

function snippet(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q);
  if (i === -1) return "";
  const start = Math.max(0, i - 40);
  return (start > 0 ? "…" : "") + text.slice(start, i + q.length + 60).trim() + "…";
}

export function CommandMenu() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<{ locale: string; pages: PageEntry[] } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("feranet:command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("feranet:command-menu", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Index de recherche chargé à la première ouverture.
  useEffect(() => {
    if (!open || index?.locale === locale) return;
    fetch(`/api/search/${locale}`)
      .then((r) => r.json())
      .then((data) => setIndex({ locale, ...data }))
      .catch(() => setIndex({ locale, pages: [] }));
  }, [open, index, locale]);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    const NAV = navResults(t);
    if (!q) return [...NAV, ...navLinks(t)];
    const nav = NAV.filter((n) => n.title.toLowerCase().includes(q));
    const pages: Result[] = (index?.pages ?? [])
      .map((p) => {
        const title = p.title.toLowerCase();
        const heading = p.headings.find((h) => h.toLowerCase().includes(q));
        const inText = p.text.toLowerCase().includes(q);
        const score = (title.startsWith(q) ? 100 : title.includes(q) ? 60 : 0) + (heading ? 30 : 0) + (inText ? 10 : 0);
        return {
          key: p.href,
          group: "Wiki" as const,
          title: p.title,
          subtitle: heading ? `${p.section} › ${heading}` : inText ? snippet(p.text, q) : p.section,
          href: p.href,
          score,
        };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    const links = navLinks(t).filter((l) => l.title.toLowerCase().includes(q));
    return [...nav, ...pages, ...links];
  }, [query, index, t]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = useCallback(
    (r: Result) => {
      setOpen(false);
      if (r.external) window.open(r.href, "_blank", "noopener,noreferrer");
      else router.push(r.href);
    },
    [router],
  );

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label={t.nav.searchAria}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-black/20 animate-fade-up [animation-duration:.25s]">
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t.search.placeholder}
            className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            aria-label={t.nav.searchAria}
          />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <div ref={listRef} className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">
              {index ? format(t.search.noResults, { q: query }) : t.search.loading}
            </p>
          )}
          {results.map((r, i) => {
            const header = r.group !== lastGroup ? r.group : null;
            lastGroup = r.group;
            const Icon = r.group === "Wiki" ? FileText : r.href.startsWith("/tickets") ? Ticket : BookOpen;
            return (
              <div key={r.key}>
                {header && <p className="px-3 pb-1 pt-3 text-xs font-medium text-muted-foreground">{t.search.groups[header]}</p>}
                <button
                  type="button"
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(r)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${i === active ? "bg-muted" : ""}`}
                >
                  {r.social ? (
                    <SocialIcon id={r.social} className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{r.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.subtitle}</span>
                  </span>
                  {r.external ? (
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    i === active && <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
