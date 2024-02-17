type SupportedLanguages = "en" | "fr";

type LanguageData = Record<string, Record<SupportedLanguages, string>>;

const data: LanguageData = {
  home: {
    en: "Home",
    fr: "Accueil",
  },
  skills: {
    en: "Skills",
    fr: "Compétences",
  },
  projects: {
    en: "Projects",
    fr: "Projets",
  },
  contact: {
    en: "Contact",
    fr: "Contact",
  },
  webDeveloper: {
    en: "Web Developer",
    fr: "Développeur Web",
  },
  hi: {
    en: "Hi, I'm",
    fr: "Salut, je suis",
  },
  webDevelopment: {
    en: "Web Development",
    fr: "Développement Web",
  },
  systemAdministration: {
    en: "System Administration",
    fr: "Administration Système",
  },
  designOthers: {
    en: "Design & others",
    fr: "Design & autres",
  },
  designBuildBy: {
    en: "Designed and built by Florian",
    fr: "Conçu et construit par Florian",
  },
};

const defaultLanguage: SupportedLanguages = "en";

const getLanguage = (): SupportedLanguages => {
  const storedLanguage = localStorage.getItem("language");
  if (storedLanguage) {
    return storedLanguage as SupportedLanguages;
  }
  const navigatorLanguage = navigator.language.split("-")[0];
  return navigatorLanguage === "fr" ? "fr" : "en";
};

export const t = (key: keyof LanguageData): string => {
  const language = getLanguage();
  localStorage.setItem("language", language);
  return data[key][language] || data[key][defaultLanguage];
};
