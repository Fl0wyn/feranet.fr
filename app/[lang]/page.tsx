import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CodeXml,
  HeartHandshake,
  Layers,
  MapPin,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  Smile,
  Ticket,
} from "lucide-react";
import { SocialIcon } from "@/components/icons";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { getNavigation } from "@/lib/wiki";
import { SOCIAL_LINKS, SOCIAL_ORDER, externalProps } from "@/lib/site";
import { format } from "@/lib/i18n/dictionaries";
import { getI18n } from "@/lib/i18n/server";

const SERVICE_ICONS = { web: CodeXml, it: Server, design: Palette } as const;
const WHY_ICONS = { human: Smile, allInOne: Layers, reliable: ShieldCheck, close: MapPin } as const;

export default async function HomePage() {
  const { locale, t } = await getI18n();
  const h = t.home;
  const nav = await getNavigation(locale);
  const articleCount = nav.reduce((n, s) => n + s.pages.length, 0);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative isolate -mt-16 overflow-hidden pt-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,oklch(0.6_0.24_305/0.22),transparent_60%),radial-gradient(ellipse_60%_50%_at_10%_80%,oklch(0.75_0.15_220/0.18),transparent_60%)]" />
        <div className="bg-grid mask-fade absolute inset-0 -z-20 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[45%] overflow-hidden">
          <div className="perspective-floor" />
        </div>

        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-6 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
          <div className="relative z-10 animate-fade-up">
            <span className="glass inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {h.badge}
            </span>

            <h1 className="mt-7 text-5xl font-semibold tracking-tighter text-balance sm:text-6xl lg:text-7xl">
              {h.hello}
              <span className="text-shimmer mt-3 block pb-2 text-3xl leading-tight sm:text-4xl lg:text-5xl">{h.role}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">{h.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 text-sm font-medium text-background shadow-xl shadow-brand-1/20 transition hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-1 to-brand-2 opacity-0 transition group-hover:opacity-100" />
                <HeartHandshake className="relative size-4" />
                <span className="relative">{h.ctaPrimary}</span>
              </a>
              <Link
                href="/portfolio"
                className="glass group inline-flex h-12 items-center gap-2 rounded-xl border px-6 text-sm font-medium transition hover:-translate-y-0.5 hover:border-brand/40"
              >
                {h.ctaSecondary}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>

            <ul className="mt-10 space-y-2.5">
              {h.promises.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-brand-1 to-brand-2 text-white">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Scène 3D + cartes flottantes */}
          <div className="relative h-[380px] sm:h-[480px] lg:h-[640px]">
            <HeroCanvas />
            <div className="pointer-events-none absolute inset-0 hidden sm:block">
              <FloatingChip className="left-0 top-[14%] [--float-r:-4deg]" icon={Rocket} label={h.floating.launch} />
              <FloatingChip className="bottom-[18%] right-0 [--float-r:3deg] [animation-delay:-3s]" icon={ShieldCheck} label={h.floating.secure} />
              <FloatingChip className="bottom-[4%] left-[10%] [--float-r:-2deg] [animation-delay:-5s]" icon={Palette} label={h.floating.design} />
            </div>
          </div>
        </div>

        <a
          href="#services"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground lg:flex"
        >
          {h.scroll}
          <ChevronDown className="size-4 animate-bounce" />
        </a>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6">
        <SectionTitle eyebrow={h.servicesEyebrow} title={h.servicesHeading} lead={h.servicesLead} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {(Object.keys(h.services) as (keyof typeof h.services)[]).map((id, i) => {
            const s = h.services[id];
            const Icon = SERVICE_ICONS[id];
            return (
              <Reveal key={id} delay={i * 100}>
                <TiltCard className="h-full rounded-3xl border bg-card p-7">
                  <div className="tilt-pop-sm">
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-1 to-brand-2 text-white shadow-lg shadow-brand-1/30">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-muted-foreground">{s.text}</p>
                  </div>
                  <ul className="tilt-pop mt-6 space-y-2 border-t pt-5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm">
                        <Check className="size-4 text-brand" strokeWidth={2.5} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- Pourquoi moi ---------- */}
      <section className="relative isolate overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-soft to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow={h.whyEyebrow} title={h.whyHeading} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(h.why) as (keyof typeof h.why)[]).map((id, i) => {
              const w = h.why[id];
              const Icon = WHY_ICONS[id];
              return (
                <Reveal key={id} delay={i * 80}>
                  <TiltCard max={10} className="glass h-full rounded-2xl border p-6">
                    <Icon className="tilt-pop size-7 text-brand" />
                    <h3 className="mt-4 font-semibold">{w.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{w.text}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Étapes ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionTitle eyebrow={h.stepsEyebrow} title={h.stepsHeading} />
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent md:block" />
        <ol className="relative grid gap-6 md:grid-cols-3">
          {h.steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 120} className="relative">
              <span className="relative grid size-14 place-items-center rounded-2xl border bg-card text-xl font-semibold shadow-lg shadow-brand-1/10">
                <span className="text-gradient">{i + 1}</span>
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </Reveal>
          ))}
        </ol>
        </div>
      </section>

      {/* ---------- Ressources ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <SectionTitle eyebrow={h.resourcesEyebrow} title={h.resourcesHeading} lead={h.resourcesLead} />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <TiltCard href="/wiki" className="h-full rounded-3xl border bg-card p-7">
              <div className="tilt-pop-sm flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-muted">
                  <BookOpen className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{h.wikiTitle}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{format(h.wikiText, { n: articleCount })}</p>
                </div>
              </div>
              <div className="tilt-pop mt-6 flex flex-wrap gap-2">
                {nav.map((s) => (
                  <span key={s.id} className="rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                    {s.title} · {s.pages.length}
                  </span>
                ))}
              </div>
              <CornerArrow />
            </TiltCard>
          </Reveal>
          <Reveal delay={100}>
            <TiltCard href="/tickets" className="h-full rounded-3xl border bg-card p-7">
              <div className="tilt-pop-sm flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-muted">
                  <Ticket className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{h.ticketsTitle}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{h.ticketsText}</p>
                </div>
              </div>
              <div className="tilt-pop mt-6 grid grid-cols-3 gap-2 text-xs">
                {[
                  { label: t.tickets.status.open, color: "bg-sky-500", items: h.demo.open },
                  { label: t.tickets.status.in_progress, color: "bg-violet-500", items: h.demo.progress },
                  { label: t.tickets.status.resolved, color: "bg-emerald-500", items: h.demo.resolved },
                ].map((col) => (
                  <div key={col.label} className="rounded-xl bg-muted/60 p-2">
                    <p className="mb-2 flex items-center gap-1.5 px-1 font-medium">
                      <span className={`size-1.5 rounded-full ${col.color}`} /> {col.label}
                    </p>
                    {col.items.map((item) => (
                      <div key={item} className="mb-1.5 truncate rounded-lg border bg-card px-2 py-1.5 text-muted-foreground shadow-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <CornerArrow />
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-28 sm:px-6">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border bg-card px-6 py-12 sm:px-12 sm:py-16">
            <div className="absolute -left-20 -top-24 -z-10 size-72 rounded-full bg-brand-1/30 blur-3xl animate-blob" />
            <div className="absolute -bottom-24 -right-16 -z-10 size-72 rounded-full bg-brand-2/30 blur-3xl animate-blob [animation-delay:-8s]" />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
              <div>
                <p className="text-sm font-medium text-brand">{h.contactEyebrow}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{h.contactTitle}</h2>
                <p className="mt-4 max-w-lg text-lg text-muted-foreground">{h.contactText}</p>
                <div className="mt-8 space-y-2">
                  {SOCIAL_ORDER.map((id) => (
                    <a
                      key={id}
                      href={SOCIAL_LINKS[id]}
                      {...externalProps(SOCIAL_LINKS[id])}
                      className="glass group/link flex items-center gap-3 rounded-2xl border p-3.5 transition hover:-translate-y-0.5 hover:border-brand/40"
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-1/15 to-brand-2/15">
                        <SocialIcon id={id} className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{t.social[id]}</span>
                        <span className="block truncate text-sm text-muted-foreground">{h.socialDesc[id]}</span>
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-brand" />
                    </a>
                  ))}
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium text-brand">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
      {lead && <p className="mt-4 text-lg text-pretty text-muted-foreground">{lead}</p>}
    </Reveal>
  );
}

function FloatingChip({ className, icon: Icon, label }: { className: string; icon: React.ElementType; label: string }) {
  return (
    <div className={`glass absolute flex animate-float items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-medium shadow-xl shadow-black/10 ${className}`}>
      <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand-1 to-brand-2 text-white">
        <Icon className="size-3.5" />
      </span>
      {label}
      <Check className="size-4 text-emerald-500" strokeWidth={3} />
    </div>
  );
}

function CornerArrow() {
  return (
    <ArrowUpRight className="absolute right-7 top-7 size-5 text-muted-foreground opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100" />
  );
}
