import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Feranet",
  description:
    "A collection of useful tips, tricks and tools for developers and creators",
  titleTemplate: "Feranet | :title",

  lastUpdated: true,
  cleanUrls: true,

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/logo.svg",
      },
    ],
    ["script", { src: "/_vercel/insights/script.js", defer: "true" }],
    ["script", { src: "/_vercel/speed-insights/script.js", defer: "true" }],
    [
      "script",
      {},
      `
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
      window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
      `,
    ],
  ],

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Wiki", link: "/wiki/linux/textManipulation" },
      { text: "Tools", link: "/tools" },
      { text: "Archives", link: "/archives/bash" },
    ],

    search: {
      provider: "local",
    },

    sidebar: {
      "/wiki": [
        {
          text: "Linux",
          collapsed: false,
          items: [
            { text: "Ansible", link: "/wiki/linux/ansible" },
            { text: "Apache & Nginx", link: "/wiki/linux/apache-nginx" },
            { text: "Archives", link: "/wiki/linux/archives" },
            { text: "Chroot SFTP", link: "/wiki/linux/chrootSFTP" },
            { text: "Conditions", link: "/wiki/linux/conditions" },
            { text: "Cron", link: "/wiki/linux/cron" },
            { text: "Debian GPG Key", link: "/wiki/linux/debianGpgKey" },
            { text: "Docker", link: "/wiki/linux/docker" },
            { text: "Firewall", link: "/wiki/linux/firewall" },
            { text: "Git", link: "/wiki/linux/git" },
            { text: "Kubernetes", link: "/wiki/linux/kubernetes" },
            { text: "Logs", link: "/wiki/linux/logs" },
            { text: "Meraki Auto Reboot", link: "/wiki/linux/scheduleMeraki" },
            { text: "Network", link: "/wiki/linux/network" },
            { text: "PM2", link: "/wiki/linux/pm2" },
            { text: "Screen", link: "/wiki/linux/screen" },
            { text: "Share SAMBA", link: "/wiki/linux/samba" },
            { text: "SQL", link: "/wiki/linux/sql" },
            { text: "SSH", link: "/wiki/linux/ssh" },
            { text: "Text Manipulation", link: "/wiki/linux/textManipulation" },
            { text: "Vim", link: "/wiki/linux/vim" },
          ],
        },
        {
          text: "Windows",
          collapsed: false,
          items: [
            {
              text: "Bloatware & Trackers",
              link: "/wiki/windows/bloatware-trackers",
            },
            { text: "Key Activation", link: "/wiki/windows/enable-key" },
            {
              text: "Upgrade to Windows 11",
              link: "/wiki/windows/upgrade-windows-11",
            },
            { text: "Windows Commands", link: "/wiki/windows/commands" },
          ],
        },
        {
          text: "Glpi",
          collapsed: false,
          items: [
            {
              text: "Security Audit",
              link: "/wiki/glpi/security-audit",
            },
          ],
        },
      ],
      "/archives": [
        {
          text: "Archives",
          items: [
            { text: "Bash", link: "/archives/bash" },
            {
              text: "TypeScript - Config",
              link: "/archives/typeScript-config",
            },
            {
              text: "TypeScript - Method",
              link: "/archives/typeScript-method",
            },
            { text: "Libraries", link: "/archives/libraries" },
          ],
        },
      ],
    },

    editLink: {
      pattern: "https://github.com/Fl0wyn/feranet.fr/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Fl0wyn/feranet.fr" },
    ],

    footer: {
      message: "Released under the GPL-3.0 License.",
      copyright: `Copyright © ${new Date().getFullYear()} — feranet.fr`,
    },
  },
});
