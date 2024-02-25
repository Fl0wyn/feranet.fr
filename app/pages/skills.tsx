import Image from "next/image";

import { SiteSection } from "@/components/site-section";
import { Terminal } from "@/components/ui/terminal";

import { siteConfig } from "@/config/site";

const items = siteConfig.skills;

export default function Skills() {
  return (
    <>
      <Terminal />
      <SiteSection id="skills" title="Skills" bg="dot">
        {items.map((item) => (
          <div key={item.title} className="relative z-50">
            <h3 className="text-2xl text-slate-200 text-center font-bold mt-14 sm:mt-28">
              {item.title}
            </h3>
            <ul className="grid grid-rows-6 md:grid-rows-2 sm:grid-rows-4 grid-flow-col ms-8 md:ms-0 sm:justify-center gap-x-44 gap-y-4 mt-6">
              {item.items.map((skill) => (
                <li
                  className="flex items-center px-0 w-full sm:px-4 sm:w-36"
                  key={skill.title}
                >
                  <Image
                    className="me-3"
                    width={28}
                    height={28}
                    src={skill.icon}
                    alt={`${skill.title} icon`}
                  />
                  <h4 className="text-lg">{skill.title}</h4>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </SiteSection>
    </>
  );
}
