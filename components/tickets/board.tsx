"use client";

import Link from "next/link";
import { useOptimistic, useState, startTransition } from "react";
import { MessageSquare } from "lucide-react";
import { STATUSES, categoryMeta, ticketRef, type Status, type Ticket } from "@/lib/ticket-meta";
import { timeAgo } from "@/lib/i18n/dictionaries";
import { useI18n } from "../i18n-provider";
import { setStatusAction } from "@/lib/ticket-actions";
import { Avatar, PriorityIndicator } from "./badges";

export function TicketBoard({ tickets, now }: { tickets: Ticket[]; now: number }) {
  const [optimistic, moveTicket] = useOptimistic(tickets, (state, { id, status }: { id: number; status: Status }) =>
    state.map((t) => (t.id === id ? { ...t, status } : t)),
  );
  const { locale, t } = useI18n();
  const [dragOver, setDragOver] = useState<Status | null>(null);

  const drop = (status: Status, e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    const id = Number(e.dataTransfer.getData("text/ticket-id"));
    const ticket = optimistic.find((x) => x.id === id);
    if (!ticket || ticket.status === status) return;
    startTransition(async () => {
      moveTicket({ id, status });
      await setStatusAction(id, status);
    });
  };

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
      <div className="grid min-w-[1100px] grid-cols-5 gap-3">
        {STATUSES.map((s) => {
          const items = optimistic.filter((x) => x.status === s.id);
          return (
            <section
              key={s.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(s.id);
              }}
              onDragLeave={() => setDragOver((d) => (d === s.id ? null : d))}
              onDrop={(e) => drop(s.id, e)}
              className={`flex min-h-[420px] flex-col rounded-2xl border bg-muted/40 p-2 transition ${
                dragOver === s.id ? "border-brand/60 bg-brand-soft" : ""
              }`}
              aria-label={t.tickets.status[s.id]}
            >
              <header className="flex items-center gap-2 px-2 py-2 text-sm font-medium">
                <span className={`size-2 rounded-full ${s.dot}`} />
                {t.tickets.status[s.id]}
                <span className="ml-auto rounded-full bg-background px-2 text-xs tabular-nums text-muted-foreground">{items.length}</span>
              </header>
              <div className="flex flex-1 flex-col gap-2">
                {items.map((ticket) => (
                  <Link
                    key={ticket.id}
                    href={`/tickets/${ticket.id}`}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/ticket-id", String(ticket.id));
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    className="group cursor-grab rounded-xl border bg-card p-3 shadow-sm transition hover:border-brand/40 hover:shadow-md active:cursor-grabbing"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">{ticketRef(ticket.id)}</span>
                      <PriorityIndicator priority={ticket.priority} showLabel={false} />
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm font-medium group-hover:text-brand">{ticket.title}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-md bg-muted px-1.5 py-0.5">{t.tickets.category[categoryMeta(ticket.category).id]}</span>
                      {!!ticket.comment_count && (
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="size-3" /> {ticket.comment_count}
                        </span>
                      )}
                      <span className="ml-auto">{timeAgo(ticket.updated_at, locale, now)}</span>
                      <Avatar name={ticket.assignee} />
                    </div>
                  </Link>
                ))}
                {items.length === 0 && (
                  <p className="m-auto px-4 text-center text-xs text-muted-foreground">{t.tickets.drop}</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
