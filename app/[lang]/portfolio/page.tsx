import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, FileText, GraduationCap, Mail, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { SocialIcon } from "@/components/icons";
import { ProjectsGrid } from "@/components/portfolio/projects-grid";
import { CV, PROJECTS } from "@/lib/cv";
import { PHOTO_URL, SOCIAL_LINKS, SOCIAL_ORDER, externalProps } from "@/lib/site";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.portfolio.metaTitle, description: t.portfolio.metaDescription };
}

export default async function PortfolioPage() {
  const { locale, t } = await getI18n();
  const p = t.portfolio;

  return (
    <div className="overflow-hidden">
      {/* ---------- Présentation ---------- */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_80%_10%,oklch(0.6_0.24_305/0.18),transparent_60%),radial-gradient(ellipse_60%_50%_at_0%_90%,oklch(0.75_0.15_220/0.15),transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:py-24">
          <div className="animate-fade-up">
            <TiltCard max={12} className="mx-auto w-fit rounded-[2.5rem]">
              <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brand-1 to-brand-2 p-1.5 shadow-2xl shadow-brand-1/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTO_URL}
                  alt={CV.name}
                  width={320}
                  height={320}
                  className="size-64 rounded-[2.2rem] object-cover sm:size-80"
                />
                <span className="tilt-pop glass absolute -bottom-5 -right-5 flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium shadow-xl">
                  <span className="text-gradient text-2xl font-bold">{CV.yearsOfExperience}</span>
                  {p.years}
                </span>
              </div>
            </TiltCard>
          </div>

          <div className="animate-fade-up [animation-delay:.1s]">
            <p className="text-sm font-medium text-brand">{p.eyebrow}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{p.hello}</h1>
            <p className="text-shimmer mt-3 text-2xl font-semibold sm:text-3xl">{CV.title[locale]}</p>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">{CV.profile[locale]}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cv"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 text-sm font-medium text-background shadow-xl shadow-brand-1/20 transition hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-1 to-brand-2 opacity-0 transition group-hover:opacity-100" />
                <FileText className="relative size-4" />
                <span className="relative">{p.viewCv}</span>
              </Link>
              <a
                href={SOCIAL_LINKS.email}
                className="glass inline-flex h-12 items-center gap-2 rounded-xl border px-6 text-sm font-medium transition hover:-translate-y-0.5 hover:border-brand/40"
              >
                <Mail className="size-4" /> {p.contact}
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
              {[
                [`${CV.yearsOfExperience}`, p.years],
                [`${CV.experience.length}`, p.roles],
                [`${PROJECTS.length}`, p.projectsCount],
              ].map(([value, label]) => (
                <div key={label} className="border-l border-brand/30 pl-3">
                  <dd className="text-3xl font-semibold tabular-nums">{value}</dd>
                  <dt className="mt-1 text-xs text-muted-foreground">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- Expérience ---------- */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow={p.experienceEyebrow} title={p.experienceTitle} />
        <ol className="relative mt-14 space-y-8 border-l-2 border-brand/20 pl-8 sm:pl-10">
          {CV.experience.map((job, i) => (
            <Reveal key={job.period} as="li" delay={i * 100} className="relative">
              <span className="absolute -left-[45px] top-6 grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand-1 to-brand-2 text-white shadow-lg shadow-brand-1/30 sm:-left-[53px]">
                <Briefcase className="size-4" />
              </span>
              <TiltCard max={5} className="rounded-3xl border bg-card p-6">
                <div className="tilt-pop-sm flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{job.role[locale]}</h3>
                  <span className="rounded-full bg-brand-soft px-3 py-0.5 text-sm font-medium text-brand">{job.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {job.company} · <em>{job.contract[locale]}</em>
                </p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {job.points[locale].map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </ol>

        {/* Formation */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {CV.education.map((ed, i) => (
            <Reveal key={ed.degree.en} delay={i * 80}>
              <div className="glass h-full rounded-2xl border p-5">
                <GraduationCap className="size-6 text-brand" />
                <p className="mt-3 font-semibold">{ed.degree[locale]}</p>
                <p className="text-sm text-muted-foreground">{ed.school}</p>
                <p className="mt-1 text-xs text-muted-foreground">{ed.option[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Compétences ---------- */}
      <section className="relative isolate py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-soft to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow={p.skillsEyebrow} title={p.skillsTitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CV.stack.map((g, i) => (
              <Reveal key={g.group.en} delay={i * 80}>
                <TiltCard max={10} className="h-full rounded-3xl border bg-card p-6">
                  <h3 className="tilt-pop-sm font-semibold">{g.group[locale]}</h3>
                  <div className="tilt-pop mt-4 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span key={item} className="rounded-lg border bg-background/70 px-2.5 py-1 text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <h3 className="text-sm font-medium text-muted-foreground">{p.softTitle}</h3>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {CV.softSkills[locale].map((s) => (
                <span key={s} className="glass rounded-full border px-4 py-1.5 text-sm">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Projets ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow={p.projectsEyebrow} title={p.projectsTitle} lead={p.projectsLead} />
        <div className="mt-10">
          <ProjectsGrid projects={PROJECTS} />
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6">
        <Reveal>
          <TiltCard max={4} className="overflow-hidden rounded-[2rem] border bg-card px-6 py-14 text-center sm:px-12">
            <div className="absolute -left-20 -top-24 -z-10 size-72 rounded-full bg-brand-1/30 blur-3xl animate-blob" />
            <div className="absolute -bottom-24 -right-16 -z-10 size-72 rounded-full bg-brand-2/30 blur-3xl animate-blob [animation-delay:-8s]" />
            <div className="tilt-pop">
              <Sparkles className="mx-auto size-7 text-brand" />
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{p.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{p.ctaText}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {SOCIAL_ORDER.filter((id) => id !== "portfolio").map((id, i) => (
                  <a
                    key={id}
                    href={SOCIAL_LINKS[id]}
                    {...externalProps(SOCIAL_LINKS[id])}
                    className={`inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium transition hover:-translate-y-0.5 ${
                      i === 0 ? "bg-foreground text-background hover:opacity-90" : "glass border hover:border-brand/40"
                    }`}
                  >
                    <SocialIcon id={id} className="size-4" /> {t.social[id]}
                  </a>
                ))}
                <Link
                  href="/cv"
                  className="glass inline-flex h-11 items-center gap-2 rounded-xl border px-5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-brand/40"
                >
                  <FileText className="size-4" /> {p.viewCv} <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </section>
    </div>
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
