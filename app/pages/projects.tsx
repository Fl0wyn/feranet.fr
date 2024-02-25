import { SiteSection } from "@/components/site-section";
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import Image from "next/image";

const items = siteConfig.projects;

export default function Projects() {
  return (
    <SiteSection id="projects" title="Projects" bg="grid">
      <ul className="container mx-auto block md:flex justify-center gap-4 mt-24">
        {items.map((item) => (
          <li
            key={item.title}
            className="border border-slate-800 hover:border-slate-600 bg-slate-950 rounded-lg m-4 md:m-0"
          >
            <Link
              href={item.href}
              target="_blank"
              className="relative px-4 py-6 h-full md:w-96 overflow-hidden flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <Image
                  width={40}
                  height={40}
                  src={item.icon}
                  alt={`${item.title} icon`}
                  className="relative z-50"
                />
                <h1 className="font-bold text-xl text-white relative z-50">
                  {item.title}
                </h1>
              </div>

              <p className="font-normal text-base text-slate-300 h-full my-4 relative z-50">
                {item.description}
              </p>

              <div className="flex justify-end relative">
                {item.language.map((lang) => (
                  <span
                    key={lang}
                    className="text-slate-300 bg-slate-800 px-2 py-1 rounded-lg mr-2"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <Meteors number={8} />
            </Link>
          </li>
        ))}
      </ul>
    </SiteSection>
  );
}
