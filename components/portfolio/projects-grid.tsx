"use client";

import { useState } from "react";
import { ArrowUpRight, CodeXml, Server } from "lucide-react";
import { GithubIcon } from "../icons";
import { TiltCard } from "../tilt-card";
import { useI18n } from "../i18n-provider";
import type { Project } from "@/lib/cv";

type Filter = "all" | Project["kind"];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const { locale, t } = useI18n();
  const p = t.portfolio;
  const [filter, setFilter] = useState<Filter>("all");
  const shown = projects.filter((x) => filter === "all" || x.kind === filter);

  return (
    <div>
      <div className="flex justify-center gap-2" role="group">
        {(["all", "web", "sysadmin"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              filter === f
                ? "border-transparent bg-gradient-to-r from-brand-1 to-brand-2 text-white shadow-md shadow-brand-1/25"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.filters[f]}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => {
          const Icon = project.kind === "web" ? CodeXml : Server;
          return (
            <TiltCard key={project.name} max={8} className="flex h-full flex-col rounded-3xl border bg-card p-6">
              <div className="tilt-pop-sm flex items-start justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand-1 to-brand-2 text-white shadow-lg shadow-brand-1/25">
                  <Icon className="size-5" />
                </span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{p.filters[project.kind]}</span>
              </div>
              <h3 className="tilt-pop-sm mt-5 text-lg font-semibold">{project.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.description[locale]}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-md border bg-background/70 px-2 py-0.5 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="tilt-pop mt-5 flex gap-2 border-t pt-4">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border bg-background px-3 text-sm transition hover:border-brand/40"
                  >
                    <GithubIcon className="size-4" /> {p.code}
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3 text-sm text-background transition hover:opacity-90"
                  >
                    {p.demo} <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}
