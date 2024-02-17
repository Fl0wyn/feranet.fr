import { Link as ScrollLink } from "react-scroll";

import { t } from "./locales";

const links = [
  { name: t("home"), link: "home" },
  { name: t("skills"), link: "skills" },
  // { name: "Projects", link: "projects" },
  { name: t("contact"), link: "contact" },
];

const changeLanguage = () => {
  const storedLanguage = localStorage.getItem("language");
  const language = storedLanguage === "fr" ? "en" : "fr";
  localStorage.setItem("language", language);
  window.location.reload();
};

export default function Nav() {
  return (
    <nav className="sticky top-0 w-full backdrop-blur border-b-2 border-slate-600 z-[1]">
      <div className="container mx-auto p-4 flex justify-between items-center gap-8">
        <div className="w-10 hover:animate-spin">
          <img src="/logo-variant.svg" />
        </div>

        <ul className="flex items-center gap-12">
          {links.map((list) => (
            <li key={list.name} className="hover:-rotate-3">
              <ScrollLink
                className="hover:text-primary pb-3 relative md:inline hidden cursor-pointer"
                to={list.link}
                smooth={true}
                duration={500}
              >
                {list.name}
              </ScrollLink>
            </li>
          ))}
          <li className="hover:-rotate-3">
            <a
              role="button"
              onClick={changeLanguage}
              className="hover:fill-primary relative pb-3 md:inline hidden cursor-pointer"
            >
              <img
                src="/header/translate.svg"
                className="w-5 h-5 inline-block mr-2"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
