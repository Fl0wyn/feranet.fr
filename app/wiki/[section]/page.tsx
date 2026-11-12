import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getNavigation, SECTIONS } from "@/lib/wiki";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.id }));
}

export async function generateMetadata(props: PageProps<"/wiki/[section]">): Promise<Metadata> {
  const { section } = await props.params;
  const s = SECTIONS.find((x) => x.id === section);
  return s ? { title: `${s.title} · Wiki`, description: s.description } : {};
}

export default async function SectionPage(props: PageProps<"/wiki/[section]">) {
  const { section } = await props.params;
  const s = (await getNavigation()).find((x) => x.id === section);
  if (!s) notFound();

  return (
    <div className="max-w-3xl">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/wiki" className="hover:text-foreground">
          Wiki
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{s.title}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{s.title}</h1>
      <p className="mt-2 text-muted-foreground">{s.description}</p>
      <div className="mt-10 divide-y rounded-2xl border bg-card">
        {s.pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex items-center gap-4 px-5 py-4 transition first:rounded-t-2xl last:rounded-b-2xl hover:bg-muted/50"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium group-hover:text-brand">{p.title}</p>
              {p.description && <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{p.description}</p>}
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
