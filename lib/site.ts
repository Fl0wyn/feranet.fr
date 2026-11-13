// Liens et informations personnelles affichés sur le site.

export const EMAIL = "contact+site@feranet.fr";

export const SOCIAL_LINKS = {
  // Toutes les enveloppes du site mènent au formulaire de contact (l'adresse reste visible sur le CV).
  email: "/#contact",
  linkedin: "https://www.linkedin.com/in/florian-feramus/",
  github: "https://github.com/Fl0wyn",
  portfolio: "/portfolio",
} as const;

export type SocialId = keyof typeof SOCIAL_LINKS;

export const SOCIAL_ORDER: SocialId[] = ["email", "linkedin", "github", "portfolio"];

/** Attributs pour ouvrir un lien externe dans un nouvel onglet (rien pour les liens internes et mailto). */
export const externalProps = (href: string) =>
  /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export const REPO_URL = "https://github.com/Fl0wyn/feranet.fr";

// Numéro SIRET affiché dans le pied de page (14 chiffres, sans espaces).
export const SIRET = "94007583100013";
/** « 940 075 831 00013 » : SIREN (3 × 3 chiffres) puis NIC (5 chiffres). */
export const formatSiret = (siret: string) => siret.replace(/^(\d{3})(\d{3})(\d{3})(\d{5})$/, "$1 $2 $3 $4");

// Photo (extraite du CV) utilisée dans la scène 3D, le portfolio et le CV.
export const PHOTO_URL = "/florian.jpg";

// Photo de la scène 3D de l'accueil : la même que sur GitHub (CORS autorisé).
export const HOME_PHOTO_URL = "https://avatars.githubusercontent.com/u/50771957?s=512&v=4";
