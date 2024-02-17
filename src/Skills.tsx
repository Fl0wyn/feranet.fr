import Section from "./components/Section";
import { Terminal } from "./components/Terminal";

import { t } from "./locales";

const skills = [
  {
    title: t("webDevelopment"),
    lists: [
      { name: "React", icon: "/skills/react.svg" },
      { name: "Vue", icon: "/skills/vue.svg" },
      { name: "Tailwind", icon: "/skills/tailwindcss-icon.svg" },
      { name: "Bootstrap", icon: "/skills/bootstrap.svg" },
      { name: "Node", icon: "/skills/nodejs-icon.svg" },
      { name: "MongoDB", icon: "/skills/mongodb-icon.svg" },
    ],
  },
  {
    title: t("systemAdministration"),
    lists: [
      { name: "Linux", icon: "/skills/linux-tux.svg" },
      { name: "Windows", icon: "/skills/microsoft-windows-icon.svg" },
      { name: "Apache", icon: "/skills/apache.svg" },
      { name: "Nginx", icon: "/skills/nginx.svg" },
      { name: "Docker", icon: "/skills/docker-icon.svg" },
      { name: "VMware", icon: "/skills/vmware.svg" },
    ],
  },
  {
    title: t("designOthers"),
    lists: [
      { name: "Photoshop", icon: "/skills/adobe-photoshop.svg" },
      { name: "Illustrator", icon: "/skills/adobe-illustrator.svg" },
      { name: "Veeam", icon: "/skills/veeam.svg" },
      { name: "Git", icon: "/skills/git-icon.svg" },
    ],
  },
];

export default function Skills() {
  return (
    <>
      <Terminal />
      <Section id="skills" title={t("skills")} color="bg-slate-950">
        {skills.map((skill) => (
          <div key={skill.title}>
            <h3 className="text-2xl text-slate-200 text-center font-bold mt-14 sm:mt-28">
              {skill.title}
            </h3>
            <div className="grid grid-rows-6 md:grid-rows-2 sm:grid-rows-4 grid-flow-col ms-8 md:ms-0 sm:justify-center gap-x-44 gap-y-4 mt-6">
              {skill.lists.map((list) => (
                <div key={list.name}>
                  <div className="flex items-center px-0 w-full sm:px-4 sm:w-36">
                    <img className="h-7 w-7 me-3" src={list.icon} />
                    <h4 className="text-lg">{list.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
