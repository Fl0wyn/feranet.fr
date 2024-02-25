import { siteConfig } from "@/config/site";
import packageJson from "@/package.json";
import Link from "next/link";
const items = siteConfig.credits;

const currentYear = new Date().getFullYear();
const version = packageJson.version;

export default function Footer() {
  return (
    <>
      <footer className="mx-auto py-14 md:py-32 bg-slate-950 sm:bg-slate-900">
        <div className="text-center pb-3">
          Copyright © {currentYear}&nbsp;
          <Link href="https://www.feranet.fr" className="hover:text-primary">
            feranet.fr
          </Link>
        </div>
        <div className="mx-auto border-primary border-t-2 w-24"></div>
      </footer>
      <div className="text-center p-2 border-t-2 border-slate-600 hidden sm:block">
        <span className="text-slate-200 mt-8">
          Designed and built by Florian <small>(v{version})</small>
        </span>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:flex justify-center gap-3 mt-2">
          {items.map((item) => (
            <li key={item.title} className="text-slate-400 hover:text-primary">
              <Link href={item.href} target="_blank" rel="noreferrer">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
