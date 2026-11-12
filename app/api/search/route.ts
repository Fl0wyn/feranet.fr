import { getSearchIndex } from "@/lib/wiki";
import { toolCategories } from "@/lib/tools";

export const dynamic = "force-static";

export async function GET() {
  const pages = await getSearchIndex();
  const tools = toolCategories.flatMap((c) =>
    c.items.map((t) => ({ title: t.app, detail: t.detail, url: t.url, img: t.img, category: c.title })),
  );
  return Response.json({ pages, tools });
}
