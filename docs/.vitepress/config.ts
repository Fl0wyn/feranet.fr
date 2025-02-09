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
      { text: "Wiki", link: "/linux/textManipulation" },
      { text: "Tools", link: "/tools" },
    ],

    search: {
      provider: "local",
    },

    sidebar: {
      "/": [
        {
          text: "Linux",
          collapsed: false,
          items: [
            { text: "Ansible 🚧", link: "/linux/ansible" },
            { text: "Apache2 & Nginx", link: "/linux/apache2-nginx" },
            { text: "Archives", link: "/linux/archives" },
            { text: "Chroot SFTP", link: "/linux/chrootSFTP" },
            { text: "Conditions", link: "/linux/conditions" },
            { text: "Debian GPG Key", link: "/linux/debianGpgKey" },
            { text: "Docker", link: "/linux/docker" },
            { text: "Git 🚧", link: "/linux/git" },
            {
              text: "Iptables & Fail2ban",
              link: "/linux/iptables-fail2ban",
            },
            { text: "Kubernetes 🚧", link: "/linux/kubernetes" },
            { text: "Meraki Auto Reboot", link: "/linux/scheduleMeraki" },
            { text: "Network", link: "/linux/network" },
            { text: "PM2", link: "/linux/pm2" },
            { text: "Screen", link: "/linux/screen" },
            { text: "Share SAMBA", link: "/linux/samba" },
            { text: "SQL 🚧", link: "/linux/sql" },
            { text: "SSH", link: "/linux/ssh" },
            { text: "Text Manipulation", link: "/linux/textManipulation" },
            { text: "Vim", link: "/linux/vim" },
          ],
        },
        {
          text: "Windows",
          collapsed: false,
          items: [
            {
              text: "Bloatware & Trackers",
              link: "/windows/bloatware-trackers",
            },
            { text: "Key Activation", link: "/windows/enable-key" },
            {
              text: "Upgrade to Windows 11",
              link: "/windows/upgrade-windows-11",
            },
            { text: "Windows Commands", link: "/windows/commands" },
          ],
        },
        {
          text: "Snippets",
          collapsed: false,
          items: [
            { text: "Bash", link: "/snippets/bash" },
            {
              text: "TypeScript - Config",
              link: "/snippets/typeScript-config",
            },
            {
              text: "TypeScript - Method",
              link: "/snippets/typeScript-method",
            },
          ],
        },
        {
          items: [{ text: "Libraries", link: "/libraries" }],
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
