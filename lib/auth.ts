import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "feranet_tickets";
const NAME_COOKIE = "feranet_tickets_name";

const password = () => process.env.TICKETS_PASSWORD ?? "";

/**
 * - Mot de passe défini : accès protégé.
 * - Pas de mot de passe en développement : accès libre.
 * - Pas de mot de passe en production : ticketing verrouillé (non configuré).
 */
export function authMode(): "protected" | "open" | "unconfigured" {
  if (password()) return "protected";
  return process.env.NODE_ENV === "production" ? "unconfigured" : "open";
}

const sessionToken = () => createHmac("sha256", password()).update("feranet-tickets-session-v1").digest("hex");

const safeEqual = (a: string, b: string) => {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
};

export async function isAuthenticated() {
  // Lire les cookies systématiquement : les pages du ticketing restent dynamiques
  // même si le mot de passe n'est pas défini au moment du build.
  const store = await cookies();
  const mode = authMode();
  if (mode === "open") return true;
  if (mode === "unconfigured") return false;
  const token = store.get(COOKIE)?.value ?? "";
  return safeEqual(token, sessionToken());
}

export async function requireAuth() {
  if (!(await isAuthenticated())) redirect("/tickets/login");
}

export async function signIn(candidate: string) {
  if (authMode() !== "protected" || !safeEqual(candidate, password())) return false;
  (await cookies()).set(COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function signOut() {
  (await cookies()).delete(COOKIE);
}

/** Dernier nom saisi, pour préremplir les formulaires. */
export async function getDisplayName() {
  return (await cookies()).get(NAME_COOKIE)?.value ?? "";
}

export async function rememberDisplayName(name: string) {
  if (!name) return;
  (await cookies()).set(NAME_COOKIE, name, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
}
