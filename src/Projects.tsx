import Section from "./components/Section";

const projects = [
  {
    title: "MonIT",
    icon: "/projects/MonIT.svg",
    description: "Generate an information report for Windows servers",
    link: "https://github.com/Fl0wyn/MonIT",
    language: ["Vue", "PowerShell"],
  },
  {
    title: "MonDrive",
    icon: "/projects/MonDrive.svg",
    description: "View disk status on Windows & Linux servers",
    link: "https://github.com/Fl0wyn/MonDrive",
    language: ["Vue", "PowerShell"],
  },
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="container mx-auto block md:flex justify-center gap-4 mt-24">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            className="border border-slate-800 shadow-xl hover:border-slate-600 rounded-lg p-4 w-full md:w-96 flex flex-col justify-between mt-2"
          >
            <div className="flex items-center gap-4">
              <img className="h-10 w-10" src={project.icon} />
              <h3 className="text-xl text-slate-200 font-semibold">
                {project.title}
              </h3>
            </div>
            <p className="text-slate-300 mt-4">{project.description}</p>
            <div className="flex justify-end mt-4">
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
      </div>
    </Section>
  );
}
