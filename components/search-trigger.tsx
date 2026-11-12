"use client";

import { Search } from "lucide-react";
import { openCommandMenu } from "./command-menu";

/** Faux champ de recherche qui ouvre la palette Ctrl+K. */
export function SearchTrigger({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openCommandMenu}
      className="mt-8 flex h-12 w-full items-center gap-3 rounded-xl border bg-background px-4 text-left text-sm text-muted-foreground shadow-sm transition hover:border-brand/40 hover:text-foreground"
    >
      <Search className="size-4" />
      <span className="flex-1 truncate">{label}</span>
      <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
    </button>
  );
}
