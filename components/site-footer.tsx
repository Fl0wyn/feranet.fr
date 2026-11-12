"use client";

import Link from "next/link";
import { GithubIcon, Logo } from "./icons";
import { useI18n } from "./i18n-provider";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-muted-foreground">
            {t.footer.license} · © {new Date().getFullYear()} feranet.fr
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/wiki" className="hover:text-foreground">
            {t.nav.wiki}
          </Link>
          <Link href="/tools" className="hover:text-foreground">
            {t.nav.tools}
          </Link>
          <Link href="/tickets" className="hover:text-foreground">
            {t.nav.tickets}
          </Link>
          <a
            href="https://github.com/Fl0wyn/feranet.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <GithubIcon className="size-4" /> {t.footer.source}
          </a>
        </nav>
      </div>
    </footer>
  );
}
