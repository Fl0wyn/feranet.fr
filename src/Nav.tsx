import { Link as ScrollLink } from "react-scroll";

const lists = [
  { name: "Home", link: "home" },
  { name: "Skills", link: "skills" },
  // { name: "Projects", link: "projects" },
  { name: "Contact", link: "contact" },
  { name: "Wiki", link: "https://wiki.feranet.fr/", external: true },
  { name: "GitHub", link: "https://github.com/Fl0wyn/", external: true },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 w-full backdrop-blur border-b-2 border-slate-600 z-[1]">
      <div className="container mx-auto p-4 flex justify-between items-center gap-8">
        <div className="w-10 hover:animate-spin">
          <img src="/logo-variant.svg" />
        </div>

        <ul className="flex items-center gap-12">
          {lists.map((list) => (
            <li key={list.name} className="hover:-rotate-3">
              {list.external ? (
                <a
                  className="hover:text-primary relative pb-3"
                  target="_blank"
                  href={list.link}
                >
                  {list.name}
                </a>
              ) : (
                <ScrollLink
                  className="hover:text-primary relative pb-3 md:inline hidden cursor-pointer"
                  to={list.link}
                  smooth={true}
                  duration={500}
                >
                  {list.name}
                </ScrollLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
