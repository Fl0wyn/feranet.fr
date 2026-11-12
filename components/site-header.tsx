"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Logo, SocialIcon } from "./icons";
import { SOCIAL_LINKS, SOCIAL_ORDER, externalProps, type SocialId } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { openCommandMenu } from "./command-menu";
import { useI18n } from "./i18n-provider";

/** Dans l'en-tête, l'icône e-mail ouvre le formulaire de contact plutôt que la messagerie. */
const headerHref = (id: SocialId) => (id === "email" ? "/#contact" : SOCIAL_LINKS[id]);

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "/#services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/wiki", label: t.nav.wiki },
    { href: "/tickets", label: t.nav.tickets },
  ];

  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled || mobileOpen ? "border-border bg-background/80 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" aria-label={t.nav.home}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                isActive(l.href) ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={openCommandMenu}
            className="hidden h-9 items-center gap-2 rounded-lg border bg-card/60 pl-3 pr-1.5 text-sm text-muted-foreground transition hover:border-brand/40 hover:text-foreground sm:flex sm:w-56"
          >
            <Search className="size-4" />
            <span>{t.nav.search}</span>
            <kbd className="ml-auto rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <button
            type="button"
            onClick={openCommandMenu}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground sm:hidden"
            aria-label={t.nav.searchAria}
          >
            <Search className="size-4" />
          </button>
          <div className="hidden items-center lg:flex">
            {SOCIAL_ORDER.map((id) => (
              <a
                key={id}
                href={headerHref(id)}
                {...externalProps(headerHref(id))}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label={t.social[id]}
                title={t.social[id]}
              >
                <SocialIcon id={id} className="size-4" />
              </a>
            ))}
          </div>
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href="/#contact"
            className="ml-1 hidden h-9 items-center rounded-lg bg-gradient-to-r from-brand-1 to-brand-2 px-3.5 text-sm font-medium text-white shadow-md shadow-brand-1/25 transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex"
          >
            {t.nav.contact}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted md:hidden"
            aria-label={t.nav.menu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-lg px-3 py-2.5 text-sm ${isActive(l.href) ? "bg-muted font-medium" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mt-2 flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-brand-1 to-brand-2 text-sm font-medium text-white"
          >
            {t.nav.contact}
          </Link>
          <div className="mt-3 flex gap-1 border-t pt-3">
            {SOCIAL_ORDER.map((id) => (
              <a
                key={id}
                href={headerHref(id)}
                {...externalProps(headerHref(id))}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
              >
                <SocialIcon id={id} className="size-4" /> {t.social[id]}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
