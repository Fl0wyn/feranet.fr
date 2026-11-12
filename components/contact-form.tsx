"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { CircleCheck, Loader2, Send, ShieldCheck } from "lucide-react";
import { sendContactAction, type ContactState } from "@/lib/contact-actions";
import { useI18n } from "./i18n-provider";

const inputCls =
  "w-full rounded-xl border bg-background/80 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand/50 focus:ring-4 focus:ring-brand-soft aria-[invalid=true]:border-red-500/60";

export function ContactForm() {
  const { t } = useI18n();
  const f = t.contactForm;
  const [state, action] = useActionState<ContactState, FormData>(sendContactAction, undefined);
  const [formKey, setFormKey] = useState(0);
  // Heure d'ouverture du formulaire (anti-spam), renseignée côté client.
  // Champ contrôlé : il survit à la réinitialisation du formulaire après l'envoi.
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => setStartedAt(Date.now()), [formKey]);

  if (state?.ok) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border bg-background/70 p-8 text-center">
        <CircleCheck className="size-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-semibold">{f.successTitle}</h3>
        <p className="mt-2 text-muted-foreground">{f.successText}</p>
        <button
          type="button"
          onClick={() => setFormKey((k) => k + 1)}
          className="mt-6 text-sm font-medium text-brand hover:underline"
        >
          {f.another}
        </button>
      </div>
    );
  }

  const fe = (state && "fieldErrors" in state && state.fieldErrors) || {};
  const err = (k: keyof typeof fe) => (fe[k] ? f.errors[fe[k]!] : undefined);
  const globalError = state && "error" in state && state.error ? f.errors[state.error] : undefined;
  const v = (state && "values" in state && state.values) || undefined;

  return (
    <form key={formKey} action={action} className="space-y-4 rounded-3xl border bg-background/70 p-6 sm:p-7" noValidate>
      <h3 className="text-lg font-semibold">{f.title}</h3>

      {/* Anti-spam : champ invisible pour les humains et heure d'ouverture. */}
      <input type="hidden" name="started_at" value={startedAt || ""} readOnly />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.name} error={err("name")}>
          <input name="name" defaultValue={v?.name} required maxLength={80} autoComplete="name" placeholder={f.namePlaceholder} className={`${inputCls} h-11`} aria-invalid={!!err("name")} />
        </Field>
        <Field label={f.email} error={err("email")}>
          <input name="email" defaultValue={v?.email} type="email" required maxLength={160} autoComplete="email" placeholder={f.emailPlaceholder} className={`${inputCls} h-11`} aria-invalid={!!err("email")} />
        </Field>
      </div>
      <Field label={f.subject} hint={f.optional}>
        <input name="subject" defaultValue={v?.subject} maxLength={140} placeholder={f.subjectPlaceholder} className={`${inputCls} h-11`} />
      </Field>
      <Field label={f.message} error={err("message")}>
        <textarea name="message" defaultValue={v?.message} required rows={5} maxLength={5000} placeholder={f.messagePlaceholder} className={`${inputCls} resize-y py-3`} aria-invalid={!!err("message")} />
      </Field>

      {globalError && (
        <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-700 dark:text-red-300">
          {globalError}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" /> {f.privacy}
        </p>
        <SubmitButton label={f.send} />
      </div>
    </form>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-foreground px-5 text-sm font-medium text-background shadow-lg shadow-brand-1/20 transition hover:-translate-y-0.5 disabled:opacity-70"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-brand-1 to-brand-2 opacity-0 transition group-hover:opacity-100" />
      {pending ? <Loader2 className="relative size-4 animate-spin" /> : <Send className="relative size-4" />}
      <span className="relative">{label}</span>
    </button>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-1.5 text-sm font-medium">
        {label}
        {hint && <span className="text-xs font-normal text-muted-foreground">({hint})</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-600 dark:text-red-400">{error}</span>}
    </label>
  );
}
