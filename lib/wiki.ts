import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Root, Element } from "hast";

const CONTENT_DIR = path.join(process.cwd(), "content", "wiki");
const REPO_URL = "https://github.com/Fl0wyn/feranet.fr";

export type SectionId = "linux" | "windows" | "glpi" | "archives";

export const SECTIONS: { id: SectionId; title: string; description: string }[] = [
  { id: "linux", title: "Linux", description: "Server administration, shell, containers and services." },
  { id: "windows", title: "Windows", description: "Commands, activation, upgrades and debloating." },
  { id: "glpi", title: "GLPI", description: "IT asset management and security auditing." },
  { id: "archives", title: "Archives", description: "Older notes on Bash, TypeScript and libraries." },
];

export type WikiPageMeta = {
  section: SectionId;
  slug: string;
  title: string;
  href: string;
  description: string;
  headings: string[];
  sourceUrl: string;
};

export type Heading = { id: string; text: string; depth: 2 | 3 };

export type WikiPage = WikiPageMeta & {
  html: string;
  toc: Heading[];
  prev?: WikiPageMeta;
  next?: WikiPageMeta;
};

function extractTitle(md: string, fallback: string) {
  return md.match(/^#\s+(.+)$/m)?.[1].trim() ?? fallback;
}

/** Premier paragraphe « texte » du document, sans le Markdown. */
function extractDescription(md: string) {
  const body = md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^:::[\s\S]*?^:::[ \t]*$/gm, "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !/^(#|>|\||-|\*|\d+\.|<|!\[|\[[^\]]+\]\([^)]+\)$)/.test(p));
  return (body ?? "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 180);
}

function stripMarkdown(md: string) {
  return md
    .replace(/^#\s+.+$/m, "")
    .replace(/```\w*\n?/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Conteneurs VitePress `::: info` → bloc HTML stylé. */
function transformContainers(md: string) {
  return md.replace(
    /^:::[ \t]*(info|tip|note|warning|danger)[ \t]*(.*)\n([\s\S]*?)^:::[ \t]*$/gm,
    (_m, type: string, title: string, body: string) =>
      `<div class="callout callout-${type}">\n<p class="callout-title">${title || type}</p>\n\n${body.trim()}\n\n</div>`,
  );
}

const readSource = cache(async (section: string, slug: string) => {
  const file = path.join(CONTENT_DIR, section, `${slug}.md`);
  try {
    // Normalise les fins de ligne (checkout Windows en CRLF).
    return (await fs.readFile(file, "utf8")).replace(/\r\n?/g, "\n");
  } catch {
    return null;
  }
});

export const getAllPages = cache(async (): Promise<WikiPageMeta[]> => {
  const pages: WikiPageMeta[] = [];
  for (const section of SECTIONS) {
    const files = (await fs.readdir(path.join(CONTENT_DIR, section.id))).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const md = (await readSource(section.id, slug)) ?? "";
      pages.push({
        section: section.id,
        slug,
        title: extractTitle(md, slug),
        href: `/wiki/${section.id}/${slug}`,
        description: extractDescription(md),
        headings: [...md.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim()),
        sourceUrl: `${REPO_URL}/edit/main/content/wiki/${section.id}/${file}`,
      });
    }
  }
  return pages.sort(
    (a, b) =>
      SECTIONS.findIndex((s) => s.id === a.section) - SECTIONS.findIndex((s) => s.id === b.section) ||
      a.title.localeCompare(b.title),
  );
});

export async function getNavigation() {
  const pages = await getAllPages();
  return SECTIONS.map((s) => ({ ...s, pages: pages.filter((p) => p.section === s.id) }));
}

/** Index plein texte léger, chargé à la demande par la palette de recherche. */
export async function getSearchIndex() {
  const pages = await getAllPages();
  return Promise.all(
    pages.map(async (p) => ({
      title: p.title,
      href: p.href,
      section: SECTIONS.find((s) => s.id === p.section)!.title,
      headings: p.headings,
      text: stripMarkdown((await readSource(p.section, p.slug)) ?? "").slice(0, 4000),
    })),
  );
}

async function renderMarkdown(md: string) {
  const toc: Heading[] = [];

  const collectHeadings = () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
        toc.push({
          id: String(node.properties.id),
          text: toString(node).replace(/#$/, "").trim(),
          depth: node.tagName === "h2" ? 2 : 3,
        });
      }
    });
  };

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(collectHeadings)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
      content: { type: "text", value: "#" },
    })
    .use(rehypeShiki, {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
      defaultColor: false,
      lazy: true,
      fallbackLanguage: "plaintext",
      defaultLanguage: "plaintext",
      transformers: [
        {
          pre(node) {
            const lang = this.options.lang;
            if (lang && lang !== "plaintext" && lang !== "text") {
              node.children.push({
                type: "element",
                tagName: "span",
                properties: { className: ["code-lang"] },
                children: [{ type: "text", value: lang }],
              });
            }
          },
        },
      ],
    })
    // Liens externes : nouvel onglet.
    .use(() => (tree: Root) => {
      visit(tree, "element", (node: Element) => {
        const href = node.tagName === "a" ? String(node.properties?.href ?? "") : "";
        if (/^https?:\/\//.test(href)) {
          node.properties.target = "_blank";
          node.properties.rel = ["noopener", "noreferrer"];
        }
      });
    })
    .use(rehypeStringify)
    .process(transformContainers(md));

  return { html: String(file), toc };
}

export const getPage = cache(async (section: string, slug: string): Promise<WikiPage | null> => {
  const md = await readSource(section, slug);
  if (md === null) return null;

  const pages = await getAllPages();
  const index = pages.findIndex((p) => p.section === section && p.slug === slug);
  if (index === -1) return null;

  // Le titre H1 est rendu par le gabarit de page.
  const { html, toc } = await renderMarkdown(md.replace(/^#\s+.+$/m, ""));

  return {
    ...pages[index],
    html,
    toc,
    prev: pages[index - 1],
    next: pages[index + 1],
  };
});
