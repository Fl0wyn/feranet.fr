import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Globe, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { PrintButton } from "@/components/print-button";
import { CV } from "@/lib/cv";
import { EMAIL, PHOTO_URL, SOCIAL_LINKS } from "@/lib/site";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.cv.metaTitle, description: t.cv.metaDescription };
}

export default async function CvPage() {
  const { locale, t } = await getI18n();
  const c = t.cv;
  const [firstName, lastName] = CV.name.split(" ");

  return (
    <div className="cv-page mx-auto max-w-[230mm] px-4 py-10 sm:px-6">
      {/* Barre d'outils (masquée à l'impression) */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="size-4" /> {c.back}
        </Link>
        <div className="flex items-center gap-3">
          <p className="hidden max-w-xs text-right text-xs text-muted-foreground md:block">{c.printHint}</p>
          <PrintButton label={c.print} hint={c.printHint} />
        </div>
      </div>

      {/* Feuille A4 */}
      <article className="cv-sheet mx-auto grid overflow-hidden rounded-3xl border bg-white text-zinc-800 shadow-2xl shadow-black/10 md:grid-cols-[34%_1fr]">
        {/* Colonne latérale */}
        <aside className="cv-aside bg-gradient-to-b from-[#24124d] to-[#0f2a44] px-7 py-9 text-white">
          <div className="mx-auto w-fit rounded-full bg-gradient-to-br from-brand-1 to-brand-2 p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO_URL} alt={CV.name} width={160} height={160} className="size-36 rounded-full border-4 border-white object-cover" />
          </div>

          <CvAsideTitle>{c.contact}</CvAsideTitle>
          <ul className="space-y-2.5 text-[13px]">
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-brand-2" />
              <a href={SOCIAL_LINKS.email} className="break-all hover:underline">
                {EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <LinkedinIcon className="size-4 shrink-0 text-brand-2" />
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-[12px] hover:underline">
                linkedin.com/in/florian-feramus
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="size-4 shrink-0 text-brand-2" />
              <a href="https://www.feranet.fr" target="_blank" rel="noopener noreferrer" className="hover:underline">
                www.feranet.fr
              </a>
            </li>
          </ul>

          <CvAsideTitle>{c.skills}</CvAsideTitle>
          <CvList items={CV.softSkills[locale]} />

          <CvAsideTitle>{c.languages}</CvAsideTitle>
          <CvList items={CV.languages[locale]} />

          <CvAsideTitle>{c.interests}</CvAsideTitle>
          <CvList items={CV.interests[locale]} />
        </aside>

        {/* Colonne principale */}
        <div className="cv-main px-7 py-9 sm:px-9">
          <div>
            <h1 className="text-4xl tracking-tight">
              <span className="font-bold uppercase text-zinc-700">{firstName}</span>{" "}
              <span className="font-light uppercase text-[#24124d]">{lastName}</span>
            </h1>
            <p className="mt-1 text-lg font-medium uppercase tracking-wide text-zinc-500">{CV.title[locale]}</p>
            <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-brand-1 to-brand-2" />
          </div>

          <CvTitle>{c.profile}</CvTitle>
          <p className="text-justify text-[13.5px] leading-relaxed text-zinc-600">{CV.profile[locale]}</p>

          <CvTitle>{c.experience}</CvTitle>
          <ol className="relative space-y-5 border-l-2 border-[#24124d]/70 pl-5">
            {CV.experience.map((job) => (
              <li key={job.period} className="relative">
                <span className="absolute -left-[27px] top-1.5 size-3 rounded-full bg-gradient-to-br from-brand-1 to-brand-2 ring-4 ring-white" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-zinc-800">{job.role[locale]}</h3>
                  <span className="text-[13px] text-zinc-500">{job.period}</span>
                </div>
                <p className="text-[13px] text-zinc-500">
                  {job.company} · <em>{job.contract[locale]}</em>
                </p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-[13px] text-zinc-600 marker:text-brand">
                  {job.points[locale].map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <CvTitle>{c.education}</CvTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            {CV.education.map((ed) => (
              <div key={ed.degree.en}>
                <p className="font-semibold text-zinc-800">{ed.school}</p>
                <p className="text-[13px] text-zinc-600">{ed.degree[locale]}</p>
                <p className="mt-1 text-[11px] font-medium text-zinc-500">{ed.option[locale]}</p>
              </div>
            ))}
          </div>

          <CvTitle>{c.stack}</CvTitle>
          <div className="flex flex-wrap gap-1.5">
            {CV.stack.flatMap((g) => g.items).map((item) => (
              <span key={item} className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[12px] text-zinc-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function CvAsideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="cv-title mb-3 mt-8 border-b border-white/40 pb-1.5 text-sm font-bold uppercase tracking-[0.2em]">{children}</h2>
  );
}

function CvList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 text-[13px] text-white/90">
      {items.map((i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="size-1 rounded-full bg-brand-2" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function CvTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="cv-title mb-3 mt-8 border-b-2 border-[#24124d] pb-1 text-lg font-bold uppercase tracking-[0.15em] text-[#24124d]">
      {children}
    </h2>
  );
}
