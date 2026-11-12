import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, CircleDot, MessageSquare, Pencil } from "lucide-react";
import { getDisplayName } from "@/lib/auth";
import { getTicket } from "@/lib/tickets";
import { categoryMeta, ticketRef, timeAgo, type TicketEvent } from "@/lib/ticket-meta";
import { Avatar, PriorityIndicator, StatusBadge } from "@/components/tickets/badges";
import { CommentForm, DeleteTicketButton, TicketProperties } from "@/components/tickets/forms";

const parseId = (raw: string) => (/^\d+$/.test(raw) ? Number(raw) : NaN);

export async function generateMetadata(props: PageProps<"/tickets/[id]">): Promise<Metadata> {
  const id = parseId((await props.params).id);
  const data = Number.isNaN(id) ? null : await getTicket(id);
  return { title: data ? `${ticketRef(id)} ${data.ticket.title}` : "Ticket" };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Paris" });

export default async function TicketPage(props: PageProps<"/tickets/[id]">) {
  const id = parseId((await props.params).id);
  if (Number.isNaN(id)) notFound();
  const data = await getTicket(id);
  if (!data) notFound();
  const { ticket, events } = data;
  const name = await getDisplayName();
  const now = Date.now();

  return (
    <div>
      <Link href="/tickets" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-4" /> All tickets
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm text-muted-foreground">{ticketRef(ticket.id)}</span>
        <StatusBadge status={ticket.status} />
        <PriorityIndicator priority={ticket.priority} />
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs">{categoryMeta(ticket.category).label}</span>
      </div>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{ticket.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Opened by <span className="font-medium text-foreground">{ticket.requester || "—"}</span> ·{" "}
        <span title={fmt(ticket.created_at)}>{timeAgo(ticket.created_at, now)}</span>
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-8">
          {/* Description */}
          <section className="rounded-2xl border bg-card">
            <header className="flex items-center gap-3 border-b px-5 py-3">
              <Avatar name={ticket.requester || "?"} />
              <span className="text-sm font-medium">{ticket.requester || "Anonymous"}</span>
              <span className="text-xs text-muted-foreground">{fmt(ticket.created_at)}</span>
            </header>
            <div className="whitespace-pre-wrap break-words px-5 py-4 text-sm leading-relaxed">
              {ticket.description || <span className="italic text-muted-foreground">No description provided.</span>}
            </div>
          </section>

          {/* Activité */}
          <section>
            <h2 className="mb-4 text-sm font-semibold">Activity</h2>
            <ol className="relative space-y-5 border-l pl-6">
              {events.map((e) => (
                <EventItem key={e.id} event={e} now={now} />
              ))}
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold">Reply</h2>
            <CommentForm ticket={ticket} defaultName={name} />
            <p className="mt-2 text-xs text-muted-foreground">Tip: press Ctrl + Enter to send.</p>
          </section>
        </div>

        {/* Propriétés */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold">Properties</h2>
            <TicketProperties ticket={ticket} />
          </div>
          <dl className="space-y-3 rounded-2xl border bg-card p-5 text-sm">
            <Row label="Created">{fmt(ticket.created_at)}</Row>
            <Row label="Updated">{fmt(ticket.updated_at)}</Row>
            {ticket.closed_at && <Row label="Closed">{fmt(ticket.closed_at)}</Row>}
          </dl>
          <DeleteTicketButton id={ticket.id} />
        </aside>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

const LABELS: Record<string, string> = {
  status: "changed the status",
  priority: "changed the priority",
  category: "changed the category",
  assignee: "changed the assignee",
};

function EventItem({ event: e, now }: { event: TicketEvent; now: number }) {
  if (e.kind === "comment") {
    return (
      <li className="relative">
        <span className="absolute -left-[37px] top-2 grid size-6 place-items-center rounded-full border bg-card">
          <MessageSquare className="size-3 text-muted-foreground" />
        </span>
        <div className="rounded-xl border bg-card">
          <div className="flex items-center gap-2 border-b px-4 py-2 text-sm">
            <Avatar name={e.author || "?"} />
            <span className="font-medium">{e.author || "Anonymous"}</span>
            <span className="text-xs text-muted-foreground" title={fmt(e.created_at)}>
              {timeAgo(e.created_at, now)}
            </span>
          </div>
          <p className="whitespace-pre-wrap break-words px-4 py-3 text-sm leading-relaxed">{e.body}</p>
        </div>
      </li>
    );
  }

  const Icon = e.kind === "created" ? CircleDot : Pencil;
  return (
    <li className="relative flex items-center gap-2 text-sm text-muted-foreground">
      <span className="absolute -left-[37px] grid size-6 place-items-center rounded-full border bg-background">
        <Icon className="size-3" />
      </span>
      <span className="font-medium text-foreground">{e.author || "Someone"}</span>
      {e.kind === "created" ? "opened this ticket" : LABELS[e.kind]}
      {e.body && <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">{e.body}</span>}
      <span className="text-xs" title={fmt(e.created_at)}>
        · {timeAgo(e.created_at, now)}
      </span>
    </li>
  );
}
