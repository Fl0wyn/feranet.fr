import type { Metadata } from "next";
import { ToolsExplorer } from "@/components/tools-explorer";
import { toolCount } from "@/lib/tools";
import { getToolCategories } from "@/lib/tools-fr";
import { format } from "@/lib/i18n/dictionaries";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.nav.tools, description: t.tools.metaDescription };
}

export default async function ToolsPage() {
  const { locale, t } = await getI18n();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6">
      <p className="text-sm font-medium text-brand">{format(t.tools.eyebrow, { n: toolCount })}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{t.tools.title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t.tools.lead}</p>
      <div className="mt-6">
        <ToolsExplorer categories={getToolCategories(locale)} />
      </div>
    </div>
  );
}
