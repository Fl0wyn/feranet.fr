// Métadonnées partagées client / serveur pour le ticketing.

export const STATUSES = [
  { id: "open", label: "Open", dot: "bg-sky-500", badge: "bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-sky-500/25" },
  { id: "in_progress", label: "In progress", dot: "bg-violet-500", badge: "bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-violet-500/25" },
  { id: "waiting", label: "Waiting", dot: "bg-amber-500", badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/25" },
  { id: "resolved", label: "Resolved", dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/25" },
  { id: "closed", label: "Closed", dot: "bg-zinc-400", badge: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 ring-zinc-500/25" },
] as const;

export const PRIORITIES = [
  { id: "low", label: "Low", level: 1, badge: "text-zinc-600 dark:text-zinc-400" },
  { id: "medium", label: "Medium", level: 2, badge: "text-sky-700 dark:text-sky-300" },
  { id: "high", label: "High", level: 3, badge: "text-orange-600 dark:text-orange-300" },
  { id: "urgent", label: "Urgent", level: 4, badge: "text-red-600 dark:text-red-400" },
] as const;

export const CATEGORIES = [
  { id: "linux", label: "Linux" },
  { id: "windows", label: "Windows" },
  { id: "network", label: "Network" },
  { id: "glpi", label: "GLPI" },
  { id: "hardware", label: "Hardware" },
  { id: "web", label: "Web" },
  { id: "other", label: "Other" },
] as const;

export type Status = (typeof STATUSES)[number]["id"];
export type Priority = (typeof PRIORITIES)[number]["id"];
export type Category = (typeof CATEGORIES)[number]["id"];

export type Ticket = {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: Category;
  requester: string;
  assignee: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  comment_count?: number;
};

export type TicketEvent = {
  id: number;
  ticket_id: number;
  kind: "created" | "comment" | "status" | "priority" | "assignee" | "category";
  author: string;
  body: string;
  created_at: string;
};

export const statusMeta = (id: string) => STATUSES.find((s) => s.id === id) ?? STATUSES[0];
export const priorityMeta = (id: string) => PRIORITIES.find((p) => p.id === id) ?? PRIORITIES[1];
export const categoryMeta = (id: string) => CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];

export const isStatus = (v: unknown): v is Status => STATUSES.some((s) => s.id === v);
export const isPriority = (v: unknown): v is Priority => PRIORITIES.some((p) => p.id === v);
export const isCategory = (v: unknown): v is Category => CATEGORIES.some((c) => c.id === v);

export const ticketRef = (id: number) => `#${String(id).padStart(4, "0")}`;
