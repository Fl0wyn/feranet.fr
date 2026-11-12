import Link from "next/link";
import {
  Archive,
  ArrowRight,
  BookOpen,
  Command,
  Monitor,
  Shield,
  Sparkles,
  Terminal,
  Ticket,
  Wrench,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { SearchTrigger } from "@/components/search-trigger";
import { getNavigation } from "@/lib/wiki";
import { toolCategories, toolCount } from "@/lib/tools";
import { format } from "@/lib/i18n/dictionaries";
import { getI18n } from "@/lib/i18n/server";

const SECTION_ICONS = { linux: Terminal, windows: Monitor, glpi: Shield, archives: Archive } as const;

export default async function HomePage() {
  const { locale, t } = await getI18n();
  const h = t.home;
  const nav = await getNavigation(locale);
  const articleCount = nav.reduce((n, s) => n + s.pages.length, 0);
  const featured = nav.flatMap((s) => s.pages).filter((p) => p.section !== "archives");
  const toolIcons = toolCategories.flatMap((c) => c.items).filter((t, i, a) => a.findIndex((x) => x.img === t.img) === i);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative isolate -mt-16 overflow-hidden pt-16">
        <div className="bg-grid mask-fade absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 opacity-40 blur-3xl dark:opacity-30">
          <div className="absolute left-0 top-10 size-96 rounded-full bg-brand-1 animate-blob" />
          <div className="absolute right-0 top-0 size-96 rounded-full bg-brand-2 animate-blob [animation-delay:-6s]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
          <div className="animate-fade-up">
            <Link
              href="/tickets"
              className="group inline-flex items-center gap-2 rounded-full border bg-card/70 py-1 pl-1 pr-3 text-xs text-muted-foreground backdrop-blur transition hover:border-brand/40"
            >
              <span className="rounded-full bg-brand-soft px-2 py-0.5 font-medium text-brand">{h.badgeNew}</span>
              {h.badge}
              <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
            </Link>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {h.hello}
              <span className="mt-2 block text-gradient">{h.role}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              {h.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/wiki"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background shadow-lg shadow-black/10 transition hover:opacity-90"
              >
                <BookOpen className="size-4" /> {h.exploreWiki}
              </Link>
              <Link
                href="/tools"
                className="inline-flex h-11 items-center gap-2 rounded-xl border bg-card px-5 text-sm font-medium transition hover:border-brand/40"
              >
                <Wrench className="size-4" /> {format(h.browseTools, { n: toolCount })}
              </Link>
              <a
                href="https://github.com/Fl0wyn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                <GithubIcon className="size-4" /> GitHub
              </a>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                [articleCount, h.statArticles],
                [toolCount, h.statTools],
                [nav.length, h.statTopics],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Terminal */}
          <div className="relative animate-fade-up [animation-delay:.15s]">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-1/20 to-brand-2/20 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border bg-card/90 shadow-2xl shadow-black/10 backdrop-blur">
              <div className="flex items-center gap-3 border-b px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-red-400/80" />
                  <span className="size-3 rounded-full bg-amber-400/80" />
                  <span className="size-3 rounded-full bg-emerald-400/80" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">florian@feranet: ~</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/u/50771957?s=80&v=4"
                  alt="Florian"
                  className="ml-auto size-6 rounded-full ring-2 ring-brand/30"
                />
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
                <code>
                  <Line prompt>feranet search &quot;docker&quot;</Line>
                  <Line muted>{h.terminalResult}</Line>
                  <Line prompt>docker run -d --name web -p 80:80 nginx</Line>
                  <Line muted>a3f9c21e7b04…</Line>
                  <Line prompt>tickets new --priority high</Line>
                  <Line>
                    <span className="text-emerald-500">✔</span> {h.terminalCreated} <span className="text-brand">#0042</span>{" "}
                    <span className="text-muted-foreground">{h.terminalTicket}</span>
                  </Line>
                  <Line prompt>
                    <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-foreground/70" />
                  </Line>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Bento ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-brand">{h.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{h.heading}</h2>
          <p className="mt-4 text-muted-foreground">
            {h.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {/* Wiki */}
          <Link href="/wiki" className="group relative overflow-hidden rounded-3xl border bg-card p-7 transition hover:border-brand/40 md:col-span-4">
            <CardHeading icon={BookOpen} title={t.nav.wiki} text={h.wikiText} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {nav.map((s) => {
                const Icon = SECTION_ICONS[s.id];
                return (
                  <div key={s.id} className="flex items-center gap-3 rounded-xl border bg-background/60 p-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-muted">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{s.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{format(h.articles, { n: s.pages.length })}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Arrow />
          </Link>

          {/* Search */}
          <div className="relative overflow-hidden rounded-3xl border bg-card p-7 md:col-span-2">
            <CardHeading icon={Command} title={h.searchTitle} text={h.searchText} />
            <SearchTrigger label={h.searchPlaceholder} />
          </div>

          {/* Ticketing */}
          <Link href="/tickets" className="group relative overflow-hidden rounded-3xl border bg-card p-7 transition hover:border-brand/40 md:col-span-3">
            <CardHeading icon={Ticket} title={h.ticketsTitle} text={h.ticketsText} />
            <div className="mt-8 grid grid-cols-3 gap-2 text-xs">
              {[
                { label: t.tickets.status.open, color: "bg-sky-500", items: h.demo.open },
                { label: t.tickets.status.in_progress, color: "bg-violet-500", items: h.demo.progress },
                { label: t.tickets.status.resolved, color: "bg-emerald-500", items: h.demo.resolved },
              ].map((col) => (
                <div key={col.label} className="rounded-xl bg-muted/60 p-2">
                  <p className="mb-2 flex items-center gap-1.5 px-1 font-medium">
                    <span className={`size-1.5 rounded-full ${col.color}`} /> {col.label}
                  </p>
                  {col.items.map((t) => (
                    <div key={t} className="mb-1.5 truncate rounded-lg border bg-card px-2 py-1.5 text-muted-foreground shadow-sm">
                      {t}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Arrow />
          </Link>

          {/* Tools */}
          <Link href="/tools" className="group relative overflow-hidden rounded-3xl border bg-card p-7 transition hover:border-brand/40 md:col-span-3">
            <CardHeading icon={Wrench} title={h.toolsTitle} text={format(h.toolsText, { n: toolCount })} />
            <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
              <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
                {[...toolIcons, ...toolIcons].map((t, i) => (
                  <span key={i} className="grid size-12 shrink-0 place-items-center rounded-xl border bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/images/${t.img}`} alt={t.app} className="size-6" loading="lazy" />
                  </span>
                ))}
              </div>
            </div>
            <Arrow />
          </Link>
        </div>
      </section>

      {/* ---------- Topics ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-brand">{h.topicsEyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{h.topicsHeading}</h2>
          </div>
          <Link href="/wiki" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            {h.allArticles} <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {featured.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground transition hover:border-brand/40 hover:text-foreground"
            >
              {p.title}
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-3xl border bg-card px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-1/15 via-transparent to-brand-2/15" />
          <Sparkles className="mx-auto size-6 text-brand" />
          <h2 className="mx-auto mt-4 max-w-xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {h.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            {h.ctaText}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/Fl0wyn/feranet.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90"
            >
              <GithubIcon className="size-4" /> {h.viewGithub}
            </a>
            <Link href="/tickets/new" className="inline-flex h-11 items-center gap-2 rounded-xl border bg-background px-5 text-sm font-medium transition hover:border-brand/40">
              <Ticket className="size-4" /> {h.openTicket}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Line({ children, prompt, muted }: { children: React.ReactNode; prompt?: boolean; muted?: boolean }) {
  return (
    <span className={`block ${muted ? "text-muted-foreground" : ""}`}>
      {prompt && <span className="mr-2 select-none text-brand">❯</span>}
      {children}
    </span>
  );
}

function CardHeading({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) {
  return (
    <div>
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-1 to-brand-2 text-white shadow-md shadow-brand-1/20">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Arrow() {
  return (
    <ArrowRight className="absolute right-7 top-7 size-5 text-muted-foreground opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
  );
}
