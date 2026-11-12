"use client";

import { Download } from "lucide-react";

/** Ouvre la fenêtre d'impression : « Enregistrer au format PDF » produit le CV en PDF. */
export function PrintButton({ label, hint }: { label: string; hint: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      title={hint}
      className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-foreground px-5 text-sm font-medium text-background shadow-xl shadow-brand-1/20 transition hover:-translate-y-0.5"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-brand-1 to-brand-2 opacity-0 transition group-hover:opacity-100" />
      <Download className="relative size-4" />
      <span className="relative">{label}</span>
    </button>
  );
}
