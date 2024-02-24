import book from "./assets/img/book.svg";
import github from "./assets/img/github.svg";

import Image from "next/image";

const links = [
  {
    name: "GitHub",
    link: "https://github.com/Fl0wyn/",
    icon: github,
  },
  {
    name: "Wiki",
    link: "https://wiki.feranet.fr/",
    icon: book,
  },
];

export default function Header() {
  return (
    <header className="relative">
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
              {links.map((link) => (
                <a
                  key={link.name}
                  className="flex items-center rounded-xl py-2 px-6 text-black bg-white hover:bg-slate-200"
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={link.icon}
                    alt={`${link.name} icon`}
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
