import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getDisplayName } from "@/lib/auth";
import { NewTicketForm } from "@/components/tickets/forms";

export const metadata: Metadata = { title: "New ticket" };

export default async function NewTicketPage() {
  const name = await getDisplayName();
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/tickets" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-4" /> All tickets
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">New ticket</h1>
      <p className="mt-2 text-muted-foreground">Describe the issue or request — the more context, the faster it gets solved.</p>
      <div className="mt-8 rounded-2xl border bg-card p-6 sm:p-8">
        <NewTicketForm defaultName={name} />
      </div>
    </div>
  );
}
