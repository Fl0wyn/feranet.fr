import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Inbox, LogOut, MessageSquare, Plus } from "lucide-react";
import { authMode } from "@/lib/auth";
import { getStats, listTickets, type TicketFilters as Filters } from "@/lib/tickets";
import { categoryMeta, isCategory, isPriority, isStatus, ticketRef, timeAgo } from "@/lib/ticket-meta";
import { logoutAction } from "../actions";
import { TicketFilters } from "@/components/tickets/filters";
import { TicketBoard } from "@/components/tickets/board";
import { Avatar, PriorityIndicator, StatusBadge } from "@/components/tickets/badges";

export const metadata: Metadata = { title: "Tickets" };

export default async function TicketsPage(props: PageProps<"/tickets">) {
  const sp = await props.searchParams;
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);

  const view = one("view") === "board" ? "board" : "list";
  const status = one("status");
  const sort = one("sort");
  const filters: Filters = {
    q: one("q"),
    status: view === "board" ? "all" : isStatus(status) || status === "all" ? status : "active",
    priority: isPriority(one("priority")) ? (one("priority") as Filters["priority"]) : undefined,
    category: isCategory(one("category")) ? (one("category") as Filters["category"]) : undefined,
    sort: sort === "created" || sort === "priority" ? sort : "updated",
  };

  const [tickets, stats] = await Promise.all([listTickets(filters), getStats()]);
  const now = Date.now();
  const hasFilters = !!(filters.q || filters.priority || filters.category || (status && view === "list"));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brand">Ticketing</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Tickets</h1>
        </div>
        <div className="flex items-center gap-2">
          {authMode() === "protected" && (
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <LogOut className="size-4" /> Sign out
              </button>
            </form>
          )}
          <Link
            href="/tickets/new"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background shadow-sm transition hover:opacity-90"
          >
            <Plus className="size-4" /> New ticket
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Active" value={stats.active} accent />
        <Stat label="Open" value={stats.counts.open} dot="bg-sky-500" />
        <Stat label="In progress" value={stats.counts.in_progress} dot="bg-violet-500" />
        <Stat label="Waiting" value={stats.counts.waiting} dot="bg-amber-500" />
        <Stat label="Urgent" value={stats.urgent} icon={<Flame className="size-4 text-red-500" />} />
      </div>

      <div className="mt-8">
        <TicketFilters />
      </div>

      <div className="mt-5">
        {stats.total === 0 ? (
          <EmptyState />
        ) : view === "board" ? (
          <TicketBoard tickets={tickets} now={now} />
        ) : tickets.length === 0 ? (
          <div className="rounded-2xl border border-dashed py-16 text-center text-sm text-muted-foreground">
            No ticket matches these filters.
            {hasFilters && (
              <Link href="/tickets" className="ml-1 font-medium text-brand hover:underline">
                Reset filters
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="hidden grid-cols-[72px_minmax(0,1fr)_120px_100px_140px_110px] gap-4 border-b bg-muted/40 px-5 py-2.5 text-xs font-medium text-muted-foreground md:grid">
              <span>ID</span>
              <span>Subject</span>
              <span>Status</span>
              <span>Priority</span>
              <span>Assignee</span>
              <span className="text-right">Updated</span>
            </div>
            <ul className="divide-y">
              {tickets.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tickets/${t.id}`}
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-3.5 transition hover:bg-muted/40 md:grid-cols-[72px_minmax(0,1fr)_120px_100px_140px_110px]"
                  >
                    <span className="hidden font-mono text-xs text-muted-foreground md:block">{ticketRef(t.id)}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium group-hover:text-brand">{t.title}</span>
                      <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-mono md:hidden">{ticketRef(t.id)}</span>
                        <span className="rounded bg-muted px-1.5 py-px">{categoryMeta(t.category).label}</span>
                        <span className="truncate">by {t.requester || "—"}</span>
                        {!!t.comment_count && (
                          <span className="inline-flex items-center gap-1">
                            <MessageSquare className="size-3" /> {t.comment_count}
                          </span>
                        )}
                      </span>
                    </span>
                    <span>
                      <StatusBadge status={t.status} />
                    </span>
                    <span className="hidden md:block">
                      <PriorityIndicator priority={t.priority} />
                    </span>
                    <span className="hidden min-w-0 items-center gap-2 text-sm md:flex">
                      {t.assignee ? (
                        <>
                          <Avatar name={t.assignee} />
                          <span className="truncate">{t.assignee}</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </span>
                    <span className="hidden text-right text-xs text-muted-foreground md:block" title={t.updated_at}>
                      {timeAgo(t.updated_at, now)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  dot,
  icon,
  accent,
}: {
  label: string;
  value: number;
  dot?: string;
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? "bg-gradient-to-br from-brand-1/10 to-brand-2/10" : "bg-card"}`}>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        {dot && <span className={`size-1.5 rounded-full ${dot}`} />}
        {icon}
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed px-6 py-20 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-muted">
        <Inbox className="size-5 text-muted-foreground" />
      </span>
      <h2 className="mt-4 font-semibold">No tickets yet</h2>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
        Create the first ticket to start tracking incidents, requests and to-dos.
      </p>
      <Link
        href="/tickets/new"
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
      >
        <Plus className="size-4" /> New ticket
      </Link>
    </div>
  );
}
