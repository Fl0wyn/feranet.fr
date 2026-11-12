// Contenu du CV et du portfolio, en anglais et en français.
// Source : CV de Florian Feramus. Les projets proviennent de ses dépôts GitHub publics.

import type { Locale } from "./i18n/dictionaries";

type L = Record<Locale, string>;

export const CV = {
  name: "Florian Feramus",
  title: { en: "Linux SysAdmin & full-stack developer", fr: "Sysadmin Linux & développeur full stack" } as L,
  yearsOfExperience: 10,
  profile: {
    en: "With 10 years of experience in IT, I specialise in systems administration and infrastructure management on Linux and Windows Server, with solid development skills. Passionate about technology, I'm proactive in solving problems and always keeping up with new tools to improve performance. I believe in teamwork to reach ambitious goals.",
    fr: "Fort de 10 ans d'expérience en informatique, je suis spécialisé en administration systèmes et gestion d'infrastructures sous Linux et Windows Server, avec des compétences en développement. Passionné par les technologies, proactif dans la résolution de problèmes et constamment en veille technologique pour optimiser les performances, je privilégie le travail collaboratif pour atteindre des objectifs ambitieux.",
  } as L,
  experience: [
    {
      role: { en: "Full-stack developer", fr: "Développeur full stack" } as L,
      company: "Acs2i Services",
      contract: { en: "Permanent contract", fr: "CDI" } as L,
      period: "2022 – 2024",
      points: {
        en: [
          "Built and maintained websites and web applications.",
          "Worked with design and marketing teams to create great user experiences.",
          "Front-end and back-end technologies: HTML, CSS, JavaScript, Node.js.",
        ],
        fr: [
          "Développement et maintenance de sites web et d'applications.",
          "Collaboration avec les équipes de conception et de marketing pour créer des expériences utilisateur optimales.",
          "Technologies front-end et back-end : HTML, CSS, JavaScript, Node.js.",
        ],
      },
    },
    {
      role: { en: "Systems & network administrator", fr: "Administrateur systèmes et réseaux" } as L,
      company: "Acs2i Services",
      contract: { en: "Permanent contract", fr: "CDI" } as L,
      period: "2017 – 2022",
      points: {
        en: [
          "Managed the network infrastructure and servers.",
          "Implemented security and data backup policies.",
          "Monitored and troubleshot IT equipment.",
        ],
        fr: [
          "Gestion de l'infrastructure réseau et des serveurs.",
          "Mise en œuvre de politiques de sécurité et de sauvegarde des données.",
          "Supervision et dépannage des équipements informatiques.",
        ],
      },
    },
    {
      role: { en: "IT technician", fr: "Technicien informatique" } as L,
      company: "Acs2i Services",
      contract: { en: "Work-study", fr: "Alternance" } as L,
      period: "2015 – 2017",
      points: {
        en: [
          "Technical support and workstation maintenance.",
          "Installed and configured software and hardware.",
          "Helped users solve their technical issues.",
        ],
        fr: [
          "Support technique et maintenance des postes de travail.",
          "Installation et configuration de logiciels et de matériels.",
          "Assistance aux utilisateurs pour résoudre les problèmes techniques.",
        ],
      },
    },
  ],
  education: [
    {
      school: "UTEC Marne-la-Vallée",
      degree: {
        en: "BTS in IT Services for Organisations (SIO)",
        fr: "BTS Services informatiques aux organisations (SIO)",
      } as L,
      option: {
        en: "Option: systems & network infrastructure solutions",
        fr: "Option : Solutions d'infrastructure, systèmes et réseaux",
      } as L,
    },
    {
      school: "UTEC Marne-la-Vallée",
      degree: {
        en: "Baccalaureate in Digital & Electronic Systems (SEN)",
        fr: "Baccalauréat Systèmes électroniques et numériques (SEN)",
      } as L,
      option: { en: "Option: telecommunications & networks", fr: "Option : Télécommunications et réseaux" } as L,
    },
  ],
  softSkills: {
    en: ["People skills", "Teamwork", "Adaptability", "Versatility", "Autonomy", "Rigour"],
    fr: ["Sens du contact", "Travail en équipe", "Capacité d'adaptation", "Polyvalence", "Autonomie", "Rigueur"],
  },
  languages: {
    en: ["French (native)", "English (basic)"],
    fr: ["Français (maternel)", "Anglais (bases)"],
  },
  interests: {
    en: ["Hiking", "Sport", "Music", "Reading", "Travel"],
    fr: ["Randonnée", "Sport", "Musique", "Lecture", "Voyage"],
  },
  /** Technologies citées dans le CV et documentées dans le wiki. */
  stack: [
    { group: { en: "Systems", fr: "Systèmes" } as L, items: ["Linux (Debian)", "Windows Server", "Bash", "PowerShell"] },
    { group: { en: "Infrastructure", fr: "Infrastructure" } as L, items: ["Docker", "Ansible", "Nginx / Apache", "Firewall", "SSH", "Backups"] },
    { group: { en: "Development", fr: "Développement" } as L, items: ["HTML / CSS", "JavaScript", "TypeScript", "Node.js", "Vue", "React / Next.js"] },
    { group: { en: "Data & tools", fr: "Données & outils" } as L, items: ["SQL", "MongoDB", "Git", "GLPI", "PM2"] },
  ],
};

export type Project = {
  name: string;
  description: L;
  tags: string[];
  kind: "web" | "sysadmin" | "client";
  repo?: string;
  demo?: string;
};

const gh = (repo: string) => `https://github.com/Fl0wyn/${repo}`;

export const PROJECTS: Project[] = [
  {
    name: "feranet.fr",
    description: {
      en: "This very site: a bilingual Next.js website with a 3D hero, a wiki of sysadmin guides and a support space for clients.",
      fr: "Ce site : un site Next.js bilingue avec une scène 3D, un wiki de guides sysadmin et un espace support pour les clients.",
    },
    tags: ["Next.js", "TypeScript", "Three.js", "Tailwind"],
    kind: "web",
    repo: gh("feranet.fr"),
    demo: "https://www.feranet.fr",
  },
  {
    name: "Cindy Kate",
    description: {
      en: "Showcase website for an artist and well-being guide: music, sessions, creative kits, podcasts, her book and a contact page.",
      fr: "Site vitrine d'une artiste et accompagnante bien-être : musique, soins, kits créatifs, podcasts, son livre et une page de contact.",
    },
    tags: ["Next.js", "TypeScript", "Showcase site"],
    kind: "client",
    demo: "https://cindy-kate.vercel.app",
  },
  {
    name: "Jérôme Met Le Feu",
    description: {
      en: "Tour website for the 2027 show: an opening video, the full list of dates and venues, and links to the ticket office.",
      fr: "Site de la tournée 2027 du spectacle : vidéo d'ouverture, liste des dates et des salles, et liens vers la billetterie.",
    },
    tags: ["HTML", "CSS", "Responsive"],
    kind: "client",
    demo: "https://jeromemetlefeu.vercel.app",
  },
  {
    name: "Les Cartes d'un Ami",
    description: {
      en: "A treasure hunt made of 4 physical postcards: each QR code opens a step of the story, and the last one reveals a final message.",
      fr: "Un jeu de piste en 4 cartes postales physiques : chaque QR code ouvre une étape de l'histoire, et la dernière révèle un message final.",
    },
    tags: ["Next.js", "Tailwind", "QR codes"],
    kind: "client",
    repo: gh("cartes-damien"),
  },
  {
    name: "SSH Web Manager",
    description: {
      en: "A local web interface to browse the hosts of ~/.ssh/config and open interactive SSH sessions right in the browser.",
      fr: "Une interface web locale pour parcourir les hôtes de ~/.ssh/config et ouvrir des sessions SSH interactives dans le navigateur.",
    },
    tags: ["TypeScript", "SSH", "Web terminal"],
    kind: "sysadmin",
    repo: gh("ssh-web-manager"),
  },
  {
    name: "RPiFo",
    description: {
      en: "Real-time Raspberry Pi monitoring: a responsive web app and its companion Bash script.",
      fr: "Supervision en temps réel d'un Raspberry Pi : une application web responsive et son script Bash.",
    },
    tags: ["Vue", "Bash", "Monitoring"],
    kind: "sysadmin",
    repo: gh("rpifo-web"),
    demo: "https://fl0wyn.github.io/rpifo-web/",
  },
  {
    name: "MonDrive",
    description: {
      en: "A dashboard showing the disk health and usage of Windows and Linux servers.",
      fr: "Un tableau de bord qui affiche l'état et l'occupation des disques des serveurs Windows et Linux.",
    },
    tags: ["Vue", "Windows", "Linux"],
    kind: "sysadmin",
    repo: gh("MonDrive"),
  },
  {
    name: "MonIT",
    description: {
      en: "Generates an information report for Windows servers in a few clicks.",
      fr: "Génère en quelques clics un rapport d'information pour les serveurs Windows.",
    },
    tags: ["Vue", "Windows Server", "Reporting"],
    kind: "sysadmin",
    repo: gh("MonIT"),
  },
  {
    name: "Vue Page Builder",
    description: {
      en: "A modular page builder for Vue 3: assemble pages from ready-made blocks.",
      fr: "Un constructeur de pages modulaire pour Vue 3 : assemblez vos pages à partir de blocs prêts à l'emploi.",
    },
    tags: ["Vue 3", "UI"],
    kind: "web",
    repo: gh("vue-pagebuilder"),
    demo: "https://vue-pagebuilder-gold.vercel.app",
  },
  {
    name: "Bash Color",
    description: {
      en: "A small tool to make your Bash scripts prettier with colours and styles.",
      fr: "Un petit outil pour embellir vos scripts Bash avec des couleurs et des styles.",
    },
    tags: ["Vue", "Bash"],
    kind: "web",
    repo: gh("bash-color"),
    demo: "https://fl0wyn.github.io/bash-color/",
  },
  {
    name: "HomePing",
    description: {
      en: "Pings your hosts and shows at a glance which ones are up.",
      fr: "Ping vos hôtes et montre d'un coup d'œil lesquels répondent.",
    },
    tags: ["Vue", "Network"],
    kind: "sysadmin",
    repo: gh("homeping"),
    demo: "https://fl0wyn.github.io/homeping/",
  },
];
