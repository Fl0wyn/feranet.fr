import { siteConfig } from "@/config/site";
import Image from "next/image";

import Link from "next/link";
const items = siteConfig.hero;

export default function Hero() {
  return (
    <div className="relative">
      <div className="h-full w-full bg-slate-900 bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-slate-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative z-20 container mx-auto md:py-64 py-32 pb-16 flex justify-between items-center">
          <div className="px-4">
            <h1 className="font-bold text-5xl md:text-7xl mb-5">
              Hi, I&apos;m <span className="stroke">Florian</span>,
            </h1>
            <h1 className="font-bold text-4xl md:text-6xl">
              <span className="text-white bg-blue-800">Web Developer</span> &
              SysAdmin
            </h1>
            <div className="flex gap-3 mt-14 font-semibold text-lg  md:justify-start justify-end">
              {items.map((item) => (
                <Link
                  key={item.title}
                  className="flex items-center rounded-xl py-2 px-6 text-black bg-white hover:bg-slate-200"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={item.icon}
                    alt={`${item.title} icon`}
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
