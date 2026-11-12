"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "../i18n-provider";
import { SECTION_STYLE } from "./section-style";
import type { SectionId } from "@/lib/wiki";

export type NavSection = { id: SectionId; title: string; pages: { href: string; title: string }[] };

export function WikiSidebar({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();
  const { t } = useI18n();
  return (
    <nav className="space-y-7 text-sm">
      <Link
        href="/wiki"
        className={`block rounded-lg px-3 py-1.5 font-medium ${pathname === "/wiki" ? "bg-brand-soft text-brand" : "hover:bg-muted"}`}
      >
        {t.wiki.overview}
      </Link>
      {sections.map((s) => (
        <div key={s.id}>
          <Link href={`/wiki/${s.id}`} className="mb-2 block px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground">
            <span className="mr-1.5">{SECTION_STYLE[s.id].emoji}</span>
            {s.title}
          </Link>
          <ul className="space-y-0.5 border-l ml-3">
            {s.pages.map((p) => {
              const active = pathname === p.href;
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={active ? "page" : undefined}
                    className={`-ml-px block border-l py-1.5 pl-4 pr-2 transition ${
                      active
                        ? "border-brand font-medium text-brand"
                        : "border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
