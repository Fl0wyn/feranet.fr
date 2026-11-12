import "server-only";
import { createTicket } from "./tickets";
import { EMAIL } from "./site";

export type ContactMessage = { name: string; email: string; subject: string; message: string };

/**
 * Un message de contact :
 * 1. devient une demande dans l'espace support (rien n'est perdu, même sans e-mail configuré) ;
 * 2. est envoyé par e-mail via Resend si RESEND_API_KEY est défini
 *    (ajouté automatiquement par l'intégration Resend du Vercel Marketplace).
 */
export async function deliverContactMessage(msg: ContactMessage) {
  const title = msg.subject || `Message de ${msg.name}`;
  const ticketId = await createTicket({
    title: `✉️ ${title}`.slice(0, 160),
    description: `${msg.message}\n\n— ${msg.name} <${msg.email}>`,
    priority: "medium",
    category: "other",
    requester: msg.name,
    assignee: "",
  });

  const mailed = await sendMail(msg, ticketId).catch((err) => {
    console.error("[contact] Échec de l'envoi de l'e-mail :", err);
    return false;
  });
  return { ticketId, mailed };
}

/**
 * Expéditeur : CONTACT_FROM s'il est défini, sinon une adresse du domaine fourni par
 * l'intégration Resend (RESEND_EMAIL_DOMAIN), sinon l'adresse de test de Resend
 * (qui ne peut écrire qu'à l'adresse du compte Resend).
 */
function sender() {
  if (process.env.CONTACT_FROM) return process.env.CONTACT_FROM;
  const domain = process.env.RESEND_EMAIL_DOMAIN?.trim();
  return domain ? `Feranet <site@${domain}>` : "Feranet <onboarding@resend.dev>";
}

/** Envoi par l'API HTTP de Resend (recommandé par Vercel plutôt que SMTP depuis une fonction). */
async function sendMail(msg: ContactMessage, ticketId: number) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: sender(),
      to: [process.env.CONTACT_TO || EMAIL],
      reply_to: msg.email,
      subject: `[feranet.fr] ${msg.subject || `Message de ${msg.name}`}`,
      text: `${msg.message}\n\n— ${msg.name} <${msg.email}>\n\nDemande n°${ticketId} dans l'espace support.`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status} : ${await res.text()}`);
  return true;
}
