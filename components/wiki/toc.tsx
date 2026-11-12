"use client";

import { useEffect, useState } from "react";
import { useI18n } from "../i18n-provider";

type Heading = { id: string; text: string; depth: 2 | 3 };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <div className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.wiki.onThisPage}</p>
      <ul className="space-y-1.5 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l py-0.5 transition ${h.depth === 3 ? "pl-6" : "pl-3"} ${
                active === h.id ? "border-brand text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
