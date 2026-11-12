import type { SectionId } from "@/lib/wiki";

/** Identité visuelle de chaque thème du wiki : emoji et dégradé. */
export const SECTION_STYLE: Record<SectionId, { emoji: string; gradient: string; soft: string }> = {
  linux: { emoji: "🐧", gradient: "from-amber-400 to-orange-500", soft: "bg-amber-500/10" },
  windows: { emoji: "🪟", gradient: "from-sky-400 to-blue-600", soft: "bg-sky-500/10" },
  glpi: { emoji: "🛡️", gradient: "from-emerald-400 to-teal-600", soft: "bg-emerald-500/10" },
  archives: { emoji: "📦", gradient: "from-zinc-400 to-zinc-600", soft: "bg-zinc-500/10" },
};

/** Guides conseillés pour débuter (section/slug). */
export const START_HERE = ["linux/ssh", "linux/docker", "linux/git", "windows/commands"];
