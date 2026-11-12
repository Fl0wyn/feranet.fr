"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDisplayName, rememberDisplayName, requireAuth, signIn, signOut } from "@/lib/auth";
import { addComment, createTicket, deleteTicket, updateTicket } from "@/lib/tickets";
import { isCategory, isPriority, isStatus } from "@/lib/ticket-meta";

// Les erreurs sont des clés de traduction (dictionnaire tickets.errors), traduites côté client.
export type ErrorKey = "title" | "requester" | "priority" | "category" | "comment" | "password";
export type FormState = { error?: ErrorKey; fieldErrors?: Partial<Record<ErrorKey, ErrorKey>>; ok?: number } | undefined;

/** Toutes les pages du ticketing, dans les deux langues. */
const revalidateTickets = () => revalidatePath("/[lang]/tickets", "layout");

const str = (fd: FormData, key: string, max = 200) => String(fd.get(key) ?? "").trim().slice(0, max);

async function authorName(fd?: FormData) {
  const fromForm = fd ? str(fd, "author", 60) : "";
  if (fromForm) {
    await rememberDisplayName(fromForm);
    return fromForm;
  }
  return (await getDisplayName()) || "Anonymous";
}

/* ---------- Session ---------- */

export async function loginAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const ok = await signIn(String(fd.get("password") ?? ""));
  if (!ok) return { error: "password" };
  redirect("/tickets");
}

export async function logoutAction() {
  await signOut();
  redirect("/tickets/login");
}

/* ---------- Tickets ---------- */

export async function createTicketAction(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAuth();
  const title = str(fd, "title", 160);
  const description = str(fd, "description", 20000);
  const priority = str(fd, "priority");
  const category = str(fd, "category");
  const requester = str(fd, "requester", 60);
  const assignee = str(fd, "assignee", 60);

  const fieldErrors: NonNullable<NonNullable<FormState>["fieldErrors"]> = {};
  if (title.length < 3) fieldErrors.title = "title";
  if (!requester) fieldErrors.requester = "requester";
  if (!isPriority(priority)) fieldErrors.priority = "priority";
  if (!isCategory(category)) fieldErrors.category = "category";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  await rememberDisplayName(requester);
  const id = await createTicket({
    title,
    description,
    priority: priority as never,
    category: category as never,
    requester,
    assignee,
  });
  revalidateTickets();
  redirect(`/tickets/${id}`);
}

export async function updateTicketAction(id: number, fd: FormData) {
  await requireAuth();
  const patch: Parameters<typeof updateTicket>[1] = {};
  const status = fd.get("status");
  const priority = fd.get("priority");
  const category = fd.get("category");
  if (isStatus(status)) patch.status = status;
  if (isPriority(priority)) patch.priority = priority;
  if (isCategory(category)) patch.category = category;
  if (fd.has("assignee")) patch.assignee = str(fd, "assignee", 60);

  await updateTicket(id, patch, await authorName());
  revalidateTickets();
}

export async function setStatusAction(id: number, status: string) {
  await requireAuth();
  if (!isStatus(status)) return;
  await updateTicket(id, { status }, await authorName());
  revalidateTickets();
}

export async function commentAction(id: number, _prev: FormState, fd: FormData): Promise<FormState> {
  await requireAuth();
  const body = str(fd, "body", 20000);
  const nextStatus = fd.get("next_status");
  if (!body && !isStatus(nextStatus)) return { error: "comment" };

  const author = await authorName(fd);
  if (body) await addComment(id, author, body);
  if (isStatus(nextStatus)) await updateTicket(id, { status: nextStatus }, author);

  revalidateTickets();
  return { ok: Date.now() };
}

export async function deleteTicketAction(id: number) {
  await requireAuth();
  await deleteTicket(id);
  revalidateTickets();
  redirect("/tickets");
}
