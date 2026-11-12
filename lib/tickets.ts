import "server-only";
import type { Row } from "@libsql/client";
import { db } from "./db";
import {
  PRIORITIES,
  STATUSES,
  type Category,
  type Priority,
  type Status,
  type Ticket,
  type TicketEvent,
  categoryMeta,
  priorityMeta,
  statusMeta,
} from "./ticket-meta";

const now = () => new Date().toISOString();
const asTicket = (r: Row) => ({ ...r }) as unknown as Ticket;
const asEvent = (r: Row) => ({ ...r }) as unknown as TicketEvent;

export type TicketFilters = {
  q?: string;
  status?: Status | "active" | "all";
  priority?: Priority;
  category?: Category;
  sort?: "updated" | "created" | "priority";
};

const PRIORITY_ORDER = `CASE priority ${PRIORITIES.map((p) => `WHEN '${p.id}' THEN ${p.level}`).join(" ")} END`;

export async function listTickets(filters: TicketFilters = {}) {
  const where: string[] = [];
  const args: (string | number)[] = [];

  const status = filters.status ?? "active";
  if (status === "active") where.push("status NOT IN ('resolved', 'closed')");
  else if (status !== "all") {
    where.push("status = ?");
    args.push(status);
  }
  if (filters.priority) {
    where.push("priority = ?");
    args.push(filters.priority);
  }
  if (filters.category) {
    where.push("category = ?");
    args.push(filters.category);
  }
  if (filters.q?.trim()) {
    const q = filters.q.trim();
    const asId = Number(q.replace(/^#/, ""));
    where.push(`(title LIKE ? OR description LIKE ? OR requester LIKE ? OR assignee LIKE ?${asId ? " OR t.id = ?" : ""})`);
    args.push(...Array(4).fill(`%${q}%`));
    if (asId) args.push(asId);
  }

  const order =
    filters.sort === "created"
      ? "t.created_at DESC"
      : filters.sort === "priority"
        ? `${PRIORITY_ORDER} DESC, t.updated_at DESC`
        : "t.updated_at DESC";

  const client = await db();
  const res = await client.execute({
    sql: `SELECT t.*, (SELECT COUNT(*) FROM ticket_events e WHERE e.ticket_id = t.id AND e.kind = 'comment') AS comment_count
          FROM tickets t ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
          ORDER BY ${order} LIMIT 500`,
    args,
  });
  return res.rows.map(asTicket);
}

export async function getStats() {
  const client = await db();
  const res = await client.execute("SELECT status, COUNT(*) AS n FROM tickets GROUP BY status");
  const counts = Object.fromEntries(STATUSES.map((s) => [s.id, 0])) as Record<Status, number>;
  for (const r of res.rows) counts[r.status as Status] = Number(r.n);
  const urgent = await client.execute(
    "SELECT COUNT(*) AS n FROM tickets WHERE priority = 'urgent' AND status NOT IN ('resolved', 'closed')",
  );
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return { counts, total, active: counts.open + counts.in_progress + counts.waiting, urgent: Number(urgent.rows[0].n) };
}

export async function getTicket(id: number) {
  const client = await db();
  const [t, e] = await client.batch(
    [
      { sql: "SELECT * FROM tickets WHERE id = ?", args: [id] },
      { sql: "SELECT * FROM ticket_events WHERE ticket_id = ? ORDER BY created_at ASC, id ASC", args: [id] },
    ],
    "read",
  );
  if (!t.rows[0]) return null;
  return { ticket: asTicket(t.rows[0]), events: e.rows.map(asEvent) };
}

export async function createTicket(input: {
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  requester: string;
  assignee: string;
}) {
  const client = await db();
  const ts = now();
  const res = await client.execute({
    sql: `INSERT INTO tickets (title, description, status, priority, category, requester, assignee, created_at, updated_at)
          VALUES (?, ?, 'open', ?, ?, ?, ?, ?, ?)`,
    args: [input.title, input.description, input.priority, input.category, input.requester, input.assignee, ts, ts],
  });
  const id = Number(res.lastInsertRowid);
  await client.execute({
    sql: "INSERT INTO ticket_events (ticket_id, kind, author, body, created_at) VALUES (?, 'created', ?, '', ?)",
    args: [id, input.requester, ts],
  });
  return id;
}

type Patch = Partial<Pick<Ticket, "status" | "priority" | "assignee" | "category">>;

const DESCRIBE: Record<keyof Patch, (v: string) => string> = {
  status: (v) => statusMeta(v).label,
  priority: (v) => priorityMeta(v).label,
  category: (v) => categoryMeta(v).label,
  assignee: (v) => v || "nobody",
};

/** Applique les changements et journalise chaque modification dans l'activité. */
export async function updateTicket(id: number, patch: Patch, author: string) {
  const current = await getTicket(id);
  if (!current) return;
  const ts = now();
  const stmts: { sql: string; args: (string | number | null)[] }[] = [];

  for (const key of Object.keys(patch) as (keyof Patch)[]) {
    const value = patch[key];
    if (value === undefined || value === current.ticket[key]) continue;
    stmts.push({ sql: `UPDATE tickets SET ${key} = ?, updated_at = ? WHERE id = ?`, args: [value, ts, id] });
    stmts.push({
      sql: "INSERT INTO ticket_events (ticket_id, kind, author, body, created_at) VALUES (?, ?, ?, ?, ?)",
      args: [id, key, author, `${DESCRIBE[key](current.ticket[key])} → ${DESCRIBE[key](value)}`, ts],
    });
    if (key === "status") {
      const closed = value === "resolved" || value === "closed";
      stmts.push({ sql: "UPDATE tickets SET closed_at = ? WHERE id = ?", args: [closed ? ts : null, id] });
    }
  }
  if (stmts.length) await (await db()).batch(stmts, "write");
}

export async function addComment(id: number, author: string, body: string) {
  const ts = now();
  await (await db()).batch(
    [
      {
        sql: "INSERT INTO ticket_events (ticket_id, kind, author, body, created_at) VALUES (?, 'comment', ?, ?, ?)",
        args: [id, author, body, ts],
      },
      { sql: "UPDATE tickets SET updated_at = ? WHERE id = ?", args: [ts, id] },
    ],
    "write",
  );
}

export async function deleteTicket(id: number) {
  await (await db()).batch(
    [
      { sql: "DELETE FROM ticket_events WHERE ticket_id = ?", args: [id] },
      { sql: "DELETE FROM tickets WHERE id = ?", args: [id] },
    ],
    "write",
  );
}
