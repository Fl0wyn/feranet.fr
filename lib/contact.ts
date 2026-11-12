import "server-only";
import nodemailer from "nodemailer";
import { createTicket } from "./tickets";
import { EMAIL } from "./site";

export type ContactMessage = { name: string; email: string; subject: string; message: string };

/**
 * Un message de contact :
 * 1. devient une demande dans l'espace support (rien n'est perdu, même sans e-mail configuré) ;
 * 2. est envoyé par e-mail si un serveur SMTP est configuré (variables SMTP_*).
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

async function sendMail(msg: ContactMessage, ticketId: number) {
  const host = process.env.SMTP_HOST;
  if (!host) return false;

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });

  const to = process.env.CONTACT_TO || EMAIL;
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER || to,
    to,
    replyTo: { name: msg.name, address: msg.email },
    subject: `[feranet.fr] ${msg.subject || `Message de ${msg.name}`}`,
    text: `${msg.message}\n\n— ${msg.name} <${msg.email}>\n\nDemande n°${ticketId} dans l'espace support.`,
  });
  return true;
}
