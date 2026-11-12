import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Ticket, TriangleAlert } from "lucide-react";
import { authMode, isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/tickets/forms";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.tickets.login.metaTitle, robots: { index: false } };
}

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/tickets");
  const mode = authMode();
  const { t } = await getI18n();
  const l = t.tickets.login;

  return (
    <div className="relative isolate grid min-h-[calc(100dvh-4rem)] place-items-center px-4 py-16">
      <div className="bg-grid mask-fade absolute inset-0 -z-10 opacity-50" />
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-xl shadow-black/5">
        <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand-1 to-brand-2 text-white">
          <Ticket className="size-5" />
        </span>
        <h1 className="mt-5 text-xl font-semibold tracking-tight">{l.title}</h1>
        {mode === "unconfigured" ? (
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-600" />
            <p>
              {l.lockedBefore} <code className="font-mono text-xs">TICKETS_PASSWORD</code> {l.lockedAfter}
            </p>
          </div>
        ) : (
          <>
            <p className="mt-1 text-sm text-muted-foreground">{l.lead}</p>
            <div className="mt-6">
              <LoginForm />
            </div>
            <p className="mt-6 border-t pt-4 text-center text-sm text-muted-foreground">
              <Link href="/#contact" className="hover:text-brand">
                {l.help}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
