import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getDisplayName } from "@/lib/auth";
import { NewTicketForm } from "@/components/tickets/forms";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.tickets.form.title };
}

export default async function NewTicketPage() {
  const name = await getDisplayName();
  const { t } = await getI18n();
  const f = t.tickets.form;
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/tickets" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-4" /> {f.back}
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{f.title}</h1>
      <p className="mt-2 text-muted-foreground">{f.lead}</p>
      <div className="mt-8 rounded-2xl border bg-card p-6 sm:p-8">
        <NewTicketForm defaultName={name} />
      </div>
    </div>
  );
}
