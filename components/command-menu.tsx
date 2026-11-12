"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, BookOpen, CornerDownLeft, FileText, Search, Ticket, Wrench } from "lucide-react";

type PageEntry = { title: string; href: string; section: string; headings: string[]; text: string };
type ToolEntry = { title: string; detail: string; url: string; img: string; category: string };
type Result = {
  key: string;
  group: "Navigation" | "Wiki" | "Tools";
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  img?: string;
  score: number;
};

const NAV: Result[] = [
  { key: "nav-wiki", group: "Navigation", title: "Wiki", subtitle: "Browse every article", href: "/wiki", score: 0 },
  { key: "nav-tools", group: "Navigation", title: "Tools", subtitle: "Curated tools & resources", href: "/tools", score: 0 },
  { key: "nav-tickets", group: "Navigation", title: "Tickets", subtitle: "Open the ticketing board", href: "/tickets", score: 0 },
  { key: "nav-new", group: "Navigation", title: "New ticket", subtitle: "Create a support ticket", href: "/tickets/new", score: 0 },
];

export const openCommandMenu = () => window.dispatchEvent(new Event("feranet:command-menu"));

function snippet(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q);
  if (i === -1) return "";
  const start = Math.max(0, i - 40);
  return (start > 0 ? "…" : "") + text.slice(start, i + q.length + 60).trim() + "…";
}

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<{ pages: PageEntry[]; tools: ToolEntry[] } | null>(null);
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
    if (!open || index) return;
    fetch("/api/search")
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex({ pages: [], tools: [] }));
  }, [open, index]);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV;
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
    const tools: Result[] = (index?.tools ?? [])
      .map((t) => {
        const title = t.title.toLowerCase();
        const score =
          (title.startsWith(q) ? 100 : title.includes(q) ? 60 : 0) + (t.detail.toLowerCase().includes(q) ? 15 : 0);
        return {
          key: `tool-${t.title}-${t.url}`,
          group: "Tools" as const,
          title: t.title,
          subtitle: `${t.category} · ${t.detail}`,
          href: t.url,
          external: true,
          img: t.img,
          score,
        };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
    return [...nav, ...pages, ...tools];
  }, [query, index]);

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
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-black/20 animate-fade-up [animation-duration:.25s]">
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search the wiki, tools, pages…"
            className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            aria-label="Search"
          />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <div ref={listRef} className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">
              {index ? `No results for “${query}”.` : "Loading index…"}
            </p>
          )}
          {results.map((r, i) => {
            const header = r.group !== lastGroup ? r.group : null;
            lastGroup = r.group;
            const Icon = r.group === "Wiki" ? FileText : r.href.startsWith("/tickets") ? Ticket : r.href === "/tools" ? Wrench : BookOpen;
            return (
              <div key={r.key}>
                {header && <p className="px-3 pb-1 pt-3 text-xs font-medium text-muted-foreground">{header}</p>}
                <button
                  type="button"
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(r)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${i === active ? "bg-muted" : ""}`}
                >
                  {r.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/images/${r.img}`} alt="" className="size-5 shrink-0 rounded" loading="lazy" />
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
