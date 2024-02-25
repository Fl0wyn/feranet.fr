import { siteConfig } from "@/config/site";
import Image from "next/image";

import Link from "next/link";

const items = siteConfig.nav;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] w-full backdrop-blur border-b border-slate-600">
      <nav className="container mx-auto flex justify-between items-center p-3">
        <Image
          className=" hover:animate-spin"
          src="/img/logo-variant.svg"
          width={40}
          height={40}
          alt="App logo"
        />
        <ul className="flex items-center gap-8">
          {items.map((item) => (
            <li key={item.title} className="nav-link hover:-rotate-3">
              <Link
                href={item.href}
                className="hover:text-primary pb-3 relative md:inline hidden cursor-pointer"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
