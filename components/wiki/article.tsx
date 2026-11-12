"use client";

import { useEffect, useRef } from "react";

const COPY_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
const CHECK_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

/** Rendu du HTML généré au build + bouton « copier » sur chaque bloc de code. */
export function WikiArticle({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const buttons: HTMLButtonElement[] = [];
    root.querySelectorAll("pre").forEach((pre) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.ariaLabel = "Copy code";
      btn.className =
        "absolute right-2 top-2 grid size-8 place-items-center rounded-md border border-border bg-card text-muted-foreground opacity-0 shadow-sm transition hover:text-foreground focus:opacity-100 [pre:hover_&]:opacity-100";
      btn.innerHTML = COPY_ICON;
      btn.onclick = async () => {
        const code = pre.querySelector("code")?.innerText ?? "";
        await navigator.clipboard.writeText(code.replace(/\n$/, ""));
        btn.innerHTML = CHECK_ICON;
        btn.classList.add("text-emerald-500");
        setTimeout(() => {
          btn.innerHTML = COPY_ICON;
          btn.classList.remove("text-emerald-500");
        }, 1500);
      };
      pre.appendChild(btn);
      buttons.push(btn);
    });
    return () => buttons.forEach((b) => b.remove());
  }, [html]);

  return (
    <div
      ref={ref}
      className="wiki-prose prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-pre:my-5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
