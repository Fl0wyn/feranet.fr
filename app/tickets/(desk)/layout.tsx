import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = { robots: { index: false } };

export default async function DeskLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();
  return <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6">{children}</div>;
}
