"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, Search } from "lucide-react";
import { CATEGORIES, PRIORITIES, STATUSES } from "@/lib/ticket-meta";
import { useI18n } from "../i18n-provider";

const selectCls =
  "h-9 rounded-lg border bg-card px-2.5 text-sm outline-none transition focus:border-brand/50 focus:ring-4 focus:ring-brand-soft";

export function TicketFilters() {
  const router = useRouter();
  const { t } = useI18n();
  const f = t.tickets.filters;
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(params.get("q") ?? "");

  const view = params.get("view") === "board" ? "board" : "list";

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  };

  // Recherche avec anti-rebond.
  useEffect(() => {
    if (q === (params.get("q") ?? "")) return;
    const t = setTimeout(() => update({ q: q || null }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className={`flex flex-wrap items-center gap-2 transition-opacity ${pending ? "opacity-70" : ""}`}>
      <div className="relative min-w-52 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={f.search}
          className="h-9 w-full rounded-lg border bg-card pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand/50 focus:ring-4 focus:ring-brand-soft"
          aria-label={f.searchAria}
        />
      </div>

      {view === "list" && (
        <select
          aria-label={f.status}
          className={selectCls}
          value={params.get("status") ?? "active"}
          onChange={(e) => update({ status: e.target.value === "active" ? null : e.target.value })}
        >
          <option value="active">{f.active}</option>
          <option value="all">{f.allStatuses}</option>
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {t.tickets.status[s.id]}
            </option>
          ))}
        </select>
      )}
      <select
        aria-label={f.priority}
        className={selectCls}
        value={params.get("priority") ?? ""}
        onChange={(e) => update({ priority: e.target.value || null })}
      >
        <option value="">{f.anyPriority}</option>
        {PRIORITIES.map((p) => (
          <option key={p.id} value={p.id}>
            {t.tickets.priority[p.id]}
          </option>
        ))}
      </select>
      <select
        aria-label={f.category}
        className={selectCls}
        value={params.get("category") ?? ""}
        onChange={(e) => update({ category: e.target.value || null })}
      >
        <option value="">{f.anyCategory}</option>
        {CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {t.tickets.category[c.id]}
          </option>
        ))}
      </select>
      <select
        aria-label={f.sort}
        className={selectCls}
        value={params.get("sort") ?? "updated"}
        onChange={(e) => update({ sort: e.target.value === "updated" ? null : e.target.value })}
      >
        <option value="updated">{f.sortUpdated}</option>
        <option value="created">{f.sortCreated}</option>
        <option value="priority">{f.sortPriority}</option>
      </select>

      <div className="flex rounded-lg border bg-card p-0.5" role="group" aria-label={f.view}>
        {(
          [
            ["list", List, f.list],
            ["board", LayoutGrid, f.board],
          ] as const
        ).map(([id, Icon, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => update({ view: id === "list" ? null : id })}
            aria-pressed={view === id}
            className={`inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm transition ${
              view === id ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="size-3.5" /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
