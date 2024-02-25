export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  nav: [
    { title: "Home", href: "#home" },
    { title: "Skills", href: "#skills" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
  ],
  hero: [
    {
      title: "GitHub",
      href: "https://github.com/Fl0wyn/",
      icon: "/img/github.svg",
    },
    {
      title: "Wiki",
      href: "https://wiki.feranet.fr/",
      icon: "/img/book.svg",
    },
  ],
  skills: [
    {
      title: "Web Development",
      items: [
        { title: "React", icon: "/img/skills/react.svg" },
        { title: "Vue", icon: "/img/skills/vue.svg" },
        { title: "Tailwind", icon: "/img/skills/tailwind.svg" },
        { title: "Bootstrap", icon: "/img/skills/bootstrap.svg" },
        { title: "Node", icon: "/img/skills/nodejs.svg" },
        { title: "MongoDB", icon: "/img/skills/mongodb.svg" },
      ],
    },
    {
      title: "System Administration",
      items: [
        { title: "Linux", icon: "img/skills/linux.svg" },
        { title: "Windows", icon: "img/skills/windows.svg" },
        { title: "Apache", icon: "img/skills/apache.svg" },
        { title: "Nginx", icon: "img/skills/nginx.svg" },
        { title: "Docker", icon: "img/skills/docker.svg" },
        { title: "VMware", icon: "img/skills/vmware.svg" },
      ],
    },
    {
      title: "Design & others",
      items: [
        { title: "Photoshop", icon: "/img/skills/photoshop.svg" },
        { title: "Illustrator", icon: "/img/skills/illustrator.svg" },
        { title: "Veeam", icon: "/img/skills/veeam.svg" },
        { title: "Git", icon: "/img/skills/git.svg" },
      ],
    },
  ],
  projects: [
    {
      title: "MonIT",
      icon: "/img/projects/MonIT.svg",
      description: "Generate an information report for Windows servers",
      href: "https://github.com/Fl0wyn/MonIT",
      language: ["Vue", "PowerShell"],
    },
    {
      title: "MonDrive",
      icon: "/img/projects/MonDrive.svg",
      description: "View disk status on Windows & Linux servers",
      href: "https://github.com/Fl0wyn/MonDrive",
      language: ["Vue", "PowerShell"],
    },
  ],
  contacts: [
    {
      title: "Email",
      href: "mailto:contact@fernanet.fr",
      icon: "/img/contact/mail.svg",
    },
    {
      title: "LinkedIn",
      href: "https://linkedin.com/in/florian-feranet",
      icon: "/img/contact/linkedin.svg",
    },
    {
      title: "Malt",
      href: "https://www.malt.fr/?",
      icon: "/img/contact/malt.svg",
    },
    {
      title: "Fiverr",
      href: "https://fiverr.com/?",
      icon: "/img/contact/fiverr.svg",
    },
  ],
  credits: [
    {
      title: "Next",
      href: "https://nextjs.org/",
    },
    {
      title: "Tailwind CSS",
      href: "https://tailwindcss.com/",
    },
    {
      title: "Aceternity",
      href: "https://ui.aceternity.com/",
    },
    {
      title: "SVGPORN",
      href: "https://svgporn.com/",
    },
    {
      title: "Vercel",
      href: "https://vercel.com/",
    },
  ],
};
