"use server";

import { revalidatePath } from "next/cache";
import { deliverContactMessage } from "./contact";

export type ContactErrorKey = "name" | "email" | "message" | "spam" | "server";
export type ContactValues = { name: string; email: string; subject: string; message: string };
export type ContactState =
  | { ok: true }
  | {
      ok?: false;
      error?: ContactErrorKey;
      fieldErrors?: Partial<Record<"name" | "email" | "message", ContactErrorKey>>;
      /** Valeurs saisies, renvoyées pour ne rien perdre en cas d'erreur. */
      values?: ContactValues;
    }
  | undefined;

const field = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Un humain met au moins quelques secondes à remplir le formulaire. */
const MIN_FILL_MS = 3000;

export async function sendContactAction(_prev: ContactState, fd: FormData): Promise<ContactState> {
  // Anti-spam : champ piège invisible et délai minimum de remplissage.
  const startedAt = Number(fd.get("started_at") || 0);
  if (field(fd, "website", 200) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { error: "spam", values: { name: field(fd, "name", 80), email: field(fd, "email", 160), subject: field(fd, "subject", 140), message: field(fd, "message", 5000) } };
  }

  const name = field(fd, "name", 80);
  const email = field(fd, "email", 160);
  const subject = field(fd, "subject", 140);
  const message = field(fd, "message", 5000);

  const fieldErrors: NonNullable<Extract<ContactState, { fieldErrors?: unknown }>["fieldErrors"]> = {};
  if (name.length < 2) fieldErrors.name = "name";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "email";
  if (message.length < 10) fieldErrors.message = "message";
  const values = { name, email, subject, message };
  if (Object.keys(fieldErrors).length) return { fieldErrors, values };

  try {
    await deliverContactMessage({ name, email, subject, message });
  } catch (err) {
    console.error("[contact] Échec de l'enregistrement du message :", err);
    return { error: "server", values };
  }
  revalidatePath("/[lang]/tickets", "layout");
  return { ok: true };
}
