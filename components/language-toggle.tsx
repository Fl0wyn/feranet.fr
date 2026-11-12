"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALE_COOKIE } from "@/lib/i18n/dictionaries";
import { useI18n } from "./i18n-provider";

/** Bascule FR/EN : mémorise le choix (comme le thème) puis recharge les données de la page. */
export function LanguageToggle() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next = locale === "fr" ? "en" : "fr";

  const toggle = () => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      title={t.nav.language}
      aria-label={t.nav.language}
      className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-xs font-semibold uppercase text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-60"
    >
      <Languages className="size-4" />
      {locale}
    </button>
  );
}
