import Section from "./components/Section";
import { Terminal } from "./components/Terminal";

import bootstrapIcon from "./assets/img/skills/bootstrap.svg";
import mongodbIcon from "./assets/img/skills/mongodb-icon.svg";
import nodejsIcon from "./assets/img/skills/nodejs-icon.svg";
import reactIcon from "./assets/img/skills/react.svg";
import tailwindcssIcon from "./assets/img/skills/tailwindcss-icon.svg";
import vueIcon from "./assets/img/skills/vue.svg";

import apacheIcon from "./assets/img/skills/apache.svg";
import dockerIcon from "./assets/img/skills/docker-icon.svg";
import linuxIcon from "./assets/img/skills/linux-tux.svg";
import windowsIcon from "./assets/img/skills/microsoft-windows-icon.svg";
import nginxIcon from "./assets/img/skills/nginx.svg";
import vmwareIcon from "./assets/img/skills/vmware.svg";

import illustratorIcon from "./assets/img/skills/adobe-illustrator.svg";
import photoshopIcon from "./assets/img/skills/adobe-photoshop.svg";
import gitIcon from "./assets/img/skills/git-icon.svg";
import veeamIcon from "./assets/img/skills/veeam.svg";

const skills = [
  {
    title: "Web Development",
    lists: [
      { name: "React", icon: reactIcon },
      { name: "Vue", icon: vueIcon },
      { name: "Tailwind", icon: tailwindcssIcon },
      { name: "Bootstrap", icon: bootstrapIcon },
      { name: "Node", icon: nodejsIcon },
      { name: "MongoDB", icon: mongodbIcon },
    ],
  },
  {
    title: "System Administration",
    lists: [
      { name: "Linux", icon: linuxIcon },
      { name: "Windows", icon: windowsIcon },
      { name: "Apache", icon: apacheIcon },
      { name: "Nginx", icon: nginxIcon },
      { name: "Docker", icon: dockerIcon },
      { name: "VMware", icon: vmwareIcon },
    ],
  },
  {
    title: "Design & others",
    lists: [
      { name: "Photoshop", icon: photoshopIcon },
      { name: "Illustrator", icon: illustratorIcon },
      { name: "Veeam", icon: veeamIcon },
      { name: "Git", icon: gitIcon },
    ],
  },
];

export default function Skills() {
  return (
    <>
      <Terminal />
      <Section id="skills" title="Skills" color="bg-slate-950">
        {skills.map((skill) => (
          <div key={skill.title}>
            <h3 className="text-2xl text-slate-200 text-center font-bold mt-14 sm:mt-28">
              {skill.title}
            </h3>
            <div className="grid grid-rows-6 md:grid-rows-2 sm:grid-rows-4 grid-flow-col ms-8 md:ms-0 sm:justify-center gap-x-44 gap-y-4 mt-6">
              {skill.lists.map((list) => (
                <div key={list.name}>
                  <div className="flex items-center px-0 w-full sm:px-4 sm:w-36">
                    <img
                      className="h-7 w-7 me-3"
                      src={list.icon}
                      alt={`${list.name} icon`}
                    />
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
