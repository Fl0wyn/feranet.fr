"use client";

import Link from "next/link";
import { GithubIcon, Logo, SocialIcon } from "./icons";
import { REPO_URL, SIRET, SOCIAL_LINKS, SOCIAL_ORDER, externalProps, formatSiret } from "@/lib/site";
import { useI18n } from "./i18n-provider";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Logo />
          <div className="flex gap-1">
            {SOCIAL_ORDER.map((id) => (
              <a
                key={id}
                href={SOCIAL_LINKS[id]}
                {...externalProps(SOCIAL_LINKS[id])}
                aria-label={t.social[id]}
                title={t.social[id]}
                className="grid size-9 place-items-center rounded-lg border bg-card text-muted-foreground transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-foreground"
              >
                <SocialIcon id={id} className="size-4" />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {t.footer.license} · © {new Date().getFullYear()} feranet.fr
          </p>
          <p className="text-sm text-muted-foreground">
            SIRET <span className="font-mono tabular-nums">{formatSiret(SIRET)}</span>
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/portfolio" className="hover:text-foreground">
            {t.nav.portfolio}
          </Link>
          <Link href="/cv" className="hover:text-foreground">
            {t.footer.cv}
          </Link>
          <Link href="/wiki" className="hover:text-foreground">
            {t.nav.wiki}
          </Link>
          <Link href="/tickets" className="hover:text-foreground">
            {t.nav.tickets}
          </Link>
          <a
            href={REPO_URL}
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
