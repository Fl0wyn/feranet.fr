import "server-only";
import fs from "node:fs";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";

const SCHEMA = `
CREATE TABLE IF NOT EXISTS tickets (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'open',
  priority    TEXT NOT NULL DEFAULT 'medium',
  category    TEXT NOT NULL DEFAULT 'other',
  requester   TEXT NOT NULL DEFAULT '',
  assignee    TEXT NOT NULL DEFAULT '',
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL,
  closed_at   TEXT
);
CREATE INDEX IF NOT EXISTS tickets_status_idx ON tickets(status);
CREATE TABLE IF NOT EXISTS ticket_events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id  INTEGER NOT NULL,
  kind       TEXT NOT NULL,
  author     TEXT NOT NULL DEFAULT '',
  body       TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ticket_events_ticket_idx ON ticket_events(ticket_id);
`;

type DbState = { client: Client; ready: Promise<void> };
const globalForDb = globalThis as unknown as { __feranetDb?: DbState };

function init(): DbState {
  // DATABASE_* en priorité ; TURSO_* sont injectées par l'intégration Turso de Vercel.
  const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL || "file:./data/tickets.db";
  const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN || undefined;
  if (url.startsWith("file:")) {
    fs.mkdirSync(path.dirname(path.resolve(url.slice("file:".length))), { recursive: true });
  }
  const client = createClient({ url, authToken });
  return { client, ready: client.executeMultiple(SCHEMA) };
}

/** Client libSQL partagé, schéma créé au premier appel. */
export async function db() {
  globalForDb.__feranetDb ??= init();
  await globalForDb.__feranetDb.ready;
  return globalForDb.__feranetDb.client;
}
