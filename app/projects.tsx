import { Section } from "./components/section";
import { Meteors } from "./components/ui/meteors";

import Image from "next/image";

import MonDriveIcon from "./assets/img/projects/MonDrive.svg";
import MonITIcon from "./assets/img/projects/MonIT.svg";

const projects = [
  {
    title: "MonIT",
    icon: MonITIcon,
    description: "Generate an information report for Windows servers",
    link: "https://github.com/Fl0wyn/MonIT",
    language: ["Vue", "PowerShell"],
  },
  {
    title: "MonDrive",
    icon: MonDriveIcon,
    description: "View disk status on Windows & Linux servers",
    link: "https://github.com/Fl0wyn/MonDrive",
    language: ["Vue", "PowerShell"],
  },
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects" bg="grid">
      <ul className="container mx-auto block md:flex justify-center gap-4 mt-24">
        {projects.map((project) => (
          <li
            key={project.title}
            className="border border-slate-800 hover:border-slate-600 bg-slate-950 rounded-lg m-4 md:m-0"
          >
            <a
              href={project.link}
              target="_blank"
              className="relative px-4 py-6 h-full md:w-96 overflow-hidden flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <Image
                  width={40}
                  height={40}
                  src={project.icon}
                  alt={`${project.title} icon`}
                  className="relative z-50"
                />
                <h1 className="font-bold text-xl text-white relative z-50">
                  {project.title}
                </h1>
              </div>

              <p className="font-normal text-base text-slate-300 h-full my-4 relative z-50">
                {project.description}
              </p>

              <div className="flex justify-end relative">
                {project.language.map((lang) => (
                  <span
                    key={lang}
                    className="text-slate-300 bg-slate-800 px-2 py-1 rounded-lg mr-2"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <Meteors number={8} />
            </a>
          </li>
        ))}
      </ul>

      {/*       <div className="container mx-auto block md:flex justify-center gap-4 mt-24">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            className="border border-slate-800 shadow-xl hover:border-slate-600 rounded-lg p-4 w-full md:w-96 flex flex-col justify-between mt-2"
          >
            <div className="flex items-center gap-4">
              <Image
                width={40}
                height={40}
                src={project.icon}
                alt={`${project.title} icon`}
              />
              <h3 className="text-xl text-slate-200 font-semibold">
                {project.title}
              </h3>
            </div>
            <p className="text-slate-300 h-full mt-4">{project.description}</p>
            <div className="flex justify-end relative">
              {project.language.map((lang) => (
                <span
                  key={lang}
                  className="text-slate-300 bg-slate-800 px-2 py-1 rounded-lg mr-2"
                >
                  {lang}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div> */}
    </Section>
  );
}
