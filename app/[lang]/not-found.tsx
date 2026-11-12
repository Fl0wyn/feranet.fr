"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-4 py-24 text-center">
      <div>
        <p className="font-mono text-sm text-brand">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t.notFound.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.notFound.text}</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
        >
          <ArrowLeft className="size-4" /> {t.notFound.back}
        </Link>
      </div>
    </div>
  );
}
