import { Menu } from "lucide-react";
import { getNavigation } from "@/lib/wiki";
import { getI18n } from "@/lib/i18n/server";
import { WikiSidebar } from "@/components/wiki/sidebar";

export default async function WikiLayout({ children }: { children: React.ReactNode }) {
  const { locale, t } = await getI18n();
  const nav = await getNavigation(locale);
  const sections = nav.map((s) => ({
    id: s.id,
    title: s.title,
    pages: s.pages.map((p) => ({ href: p.href, title: p.title })),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <details className="group sticky top-16 z-30 -mx-4 border-b bg-background/90 px-4 backdrop-blur lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
          <Menu className="size-4" /> {t.wiki.menu}
        </summary>
        <div className="max-h-[70vh] overflow-y-auto pb-4">
          <WikiSidebar sections={sections} />
        </div>
      </details>
      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] overflow-y-auto py-10 pr-2 lg:block">
          <WikiSidebar sections={sections} />
        </aside>
        <div className="min-w-0 py-10">{children}</div>
      </div>
    </div>
  );
}
