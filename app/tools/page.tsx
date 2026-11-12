import type { Metadata } from "next";
import { ToolsExplorer } from "@/components/tools-explorer";
import { toolCategories, toolCount } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Tools",
  description: "A curated list of tools and resources for developers and creators.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6">
      <p className="text-sm font-medium text-brand">Toolbox · {toolCount} tools</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Tools I actually use</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Design resources, AI assistants, handy APIs and UI libraries — hand-picked and grouped by category.
      </p>
      <div className="mt-6">
        <ToolsExplorer categories={toolCategories} />
      </div>
    </div>
  );
}
