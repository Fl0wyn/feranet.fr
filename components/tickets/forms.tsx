"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Lock, Send, Trash2 } from "lucide-react";
import {
  commentAction,
  createTicketAction,
  deleteTicketAction,
  loginAction,
  updateTicketAction,
  type FormState,
} from "@/lib/ticket-actions";
import { useI18n } from "../i18n-provider";
import { CATEGORIES, PRIORITIES, STATUSES, type Ticket } from "@/lib/ticket-meta";

const PRIORITY_EMOJI = { low: "🌱", medium: "👌", high: "⚡", urgent: "🔥" } as const;

export const inputCls =
  "w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand/50 focus:ring-4 focus:ring-brand-soft aria-[invalid=true]:border-red-500/60";

function SubmitButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60 ${className}`}
    >
      {pending && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

function Field({ label, error, children, hint }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs text-red-600 dark:text-red-400">{error}</span>
      ) : (
        hint && <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>
      )}
    </label>
  );
}

/* ---------- Connexion ---------- */

export function LoginForm() {
  const [state, action] = useActionState<FormState, FormData>(loginAction, undefined);
  const { t } = useI18n();
  return (
    <form action={action} className="space-y-4">
      <Field label={t.tickets.login.password} error={state?.error && t.tickets.errors[state.error]}>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className={`${inputCls} h-11 pl-9`}
            aria-invalid={!!state?.error}
          />
        </div>
      </Field>
      <SubmitButton className="h-11 w-full">{t.tickets.login.signIn}</SubmitButton>
    </form>
  );
}

/* ---------- Nouveau ticket ---------- */

export function NewTicketForm({ defaultName }: { defaultName: string }) {
  const [state, action] = useActionState<FormState, FormData>(createTicketAction, undefined);
  const [priority, setPriority] = useState("medium");
  const { t } = useI18n();
  const f = t.tickets.form;
  const fe = state?.fieldErrors ?? {};
  const e = Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v && t.tickets.errors[v]])) as Record<string, string | undefined>;

  return (
    <form action={action} className="space-y-6">
      <Field label={f.titleLabel} error={e.title}>
        <input
          name="title"
          required
          minLength={3}
          maxLength={160}
          autoFocus
          placeholder={f.titlePlaceholder}
          className={`${inputCls} h-11`}
          aria-invalid={!!e.title}
        />
      </Field>

      <Field label={f.description} hint={f.descriptionHint}>
        <textarea name="description" rows={7} maxLength={20000} className={`${inputCls} resize-y font-mono text-[13px]`} />
      </Field>

      <div>
        <span className="mb-1.5 block text-sm font-medium">{f.priority}</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup">
          {PRIORITIES.map((p) => (
            <label
              key={p.id}
              className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center text-sm transition ${
                priority === p.id
                  ? "border-brand bg-brand-soft shadow-md shadow-brand-1/10"
                  : "bg-card hover:-translate-y-0.5 hover:border-foreground/30"
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={p.id}
                checked={priority === p.id}
                onChange={() => setPriority(p.id)}
                className="sr-only"
              />
              <span className="text-xl" aria-hidden="true">
                {PRIORITY_EMOJI[p.id]}
              </span>
              <span className={`font-medium ${p.badge}`}>{t.tickets.priority[p.id]}</span>
              <span className="text-xs text-muted-foreground">{t.tickets.priorityHelp[p.id]}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label={f.category} error={e.category}>
          <select name="category" defaultValue="other" className={`${inputCls} h-10`}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {t.tickets.category[c.id]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={f.requester} error={e.requester}>
          <input
            name="requester"
            required
            maxLength={60}
            defaultValue={defaultName}
            placeholder={f.requesterPlaceholder}
            className={`${inputCls} h-10`}
            aria-invalid={!!e.requester}
          />
        </Field>
        <Field label={f.assignee} hint={f.optional}>
          <input name="assignee" maxLength={60} placeholder={t.tickets.unassigned} className={`${inputCls} h-10`} />
        </Field>
      </div>

      <div className="flex justify-end gap-3 border-t pt-6">
        <SubmitButton>{f.create}</SubmitButton>
      </div>
    </form>
  );
}

/* ---------- Propriétés (enregistrement automatique) ---------- */

export function TicketProperties({ ticket }: { ticket: Ticket }) {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = () => formRef.current?.requestSubmit();
  const { t } = useI18n();
  const f = t.tickets.filters;
  const update = updateTicketAction.bind(null, ticket.id);

  return (
    <form ref={formRef} action={update} className="space-y-4" key={ticket.updated_at}>
      <Field label={f.status}>
        <select name="status" defaultValue={ticket.status} onChange={submit} className={`${inputCls} h-9`}>
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {t.tickets.status[s.id]}
            </option>
          ))}
        </select>
      </Field>
      <Field label={f.priority}>
        <select name="priority" defaultValue={ticket.priority} onChange={submit} className={`${inputCls} h-9`}>
          {PRIORITIES.map((p) => (
            <option key={p.id} value={p.id}>
              {t.tickets.priority[p.id]}
            </option>
          ))}
        </select>
      </Field>
      <Field label={f.category}>
        <select name="category" defaultValue={ticket.category} onChange={submit} className={`${inputCls} h-9`}>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {t.tickets.category[c.id]}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t.tickets.form.assignee}>
        <input
          name="assignee"
          defaultValue={ticket.assignee}
          placeholder={t.tickets.unassigned}
          maxLength={60}
          onBlur={(e) => e.target.value.trim() !== ticket.assignee && submit()}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), submit())}
          className={`${inputCls} h-9`}
        />
      </Field>
    </form>
  );
}

/* ---------- Commentaire ---------- */

export function CommentForm({ ticket, defaultName }: { ticket: Ticket; defaultName: string }) {
  const [state, action] = useActionState<FormState, FormData>(commentAction.bind(null, ticket.id), undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const isClosed = ticket.status === "resolved" || ticket.status === "closed";
  const { t } = useI18n();
  const d = t.tickets.detail;

  useEffect(() => {
    if (state?.ok) {
      const body = formRef.current?.elements.namedItem("body") as HTMLTextAreaElement | null;
      if (body) body.value = "";
    }
  }, [state?.ok]);

  return (
    <form ref={formRef} action={action} className="overflow-hidden rounded-xl border bg-card focus-within:border-brand/50 focus-within:ring-4 focus-within:ring-brand-soft">
      <textarea
        name="body"
        rows={4}
        maxLength={20000}
        placeholder={d.commentPlaceholder}
        className="block w-full resize-y bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) formRef.current?.requestSubmit();
        }}
      />
      <div className="flex flex-wrap items-center gap-2 border-t bg-muted/40 px-3 py-2">
        <input
          name="author"
          defaultValue={defaultName}
          placeholder={d.yourName}
          maxLength={60}
          className="h-8 w-40 rounded-md border bg-card px-2 text-sm outline-none focus:border-brand/50"
          aria-label={d.yourName}
        />
        {state?.error && <span className="text-xs text-red-600 dark:text-red-400">{t.tickets.errors[state.error]}</span>}
        <div className="ml-auto flex gap-2">
          <ResolveButton isClosed={isClosed} />
          <CommentSubmit />
        </div>
      </div>
    </form>
  );
}

function ResolveButton({ isClosed }: { isClosed: boolean }) {
  const { pending } = useFormStatus();
  const { t } = useI18n();
  return (
    <button
      type="submit"
      name="next_status"
      value={isClosed ? "open" : "resolved"}
      disabled={pending}
      className="h-8 rounded-md border bg-card px-3 text-sm transition hover:border-foreground/30 disabled:opacity-60"
    >
      {isClosed ? t.tickets.detail.reopen : t.tickets.detail.resolve}
    </button>
  );
}

function CommentSubmit() {
  const { pending } = useFormStatus();
  const { t } = useI18n();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
    >
      {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
      {t.tickets.detail.comment}
    </button>
  );
}

/* ---------- Suppression ---------- */

export function DeleteTicketButton({ id }: { id: number }) {
  const [confirming, setConfirming] = useState(false);
  const remove = deleteTicketAction.bind(null, id);
  const { t } = useI18n();
  const d = t.tickets.detail;

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-red-600"
      >
        <Trash2 className="size-4" /> {d.delete}
      </button>
    );
  }
  return (
    <form action={remove} className="space-y-2 rounded-lg border border-red-500/30 bg-red-500/5 p-3">
      <p className="text-sm">{d.deleteConfirm}</p>
      <div className="flex gap-2">
        <button type="submit" className="h-8 rounded-md bg-red-600 px-3 text-sm font-medium text-white hover:bg-red-700">
          {d.deleteButton}
        </button>
        <button type="button" onClick={() => setConfirming(false)} className="h-8 rounded-md border bg-card px-3 text-sm">
          {d.cancel}
        </button>
      </div>
    </form>
  );
}
