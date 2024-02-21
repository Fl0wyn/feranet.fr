import { Link as ScrollLink } from "react-scroll";

import logo from "./assets/img/logo-variant.svg";

const links = [
  { name: "Home", link: "home" },
  { name: "Skills", link: "skills" },
  { name: "Projects", link: "projects" },
  { name: "Contact", link: "contact" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 w-full backdrop-blur border-b-2 border-slate-600 z-[1]">
      <div className="container mx-auto p-4 flex justify-between items-center gap-8">
        <div className="w-10 hover:animate-spin">
          <img src={logo} alt="App logo" className="h-10 w-10" />
        </div>

        <ul className="flex items-center gap-12">
          {links.map((list) => (
            <li key={list.name} className="nav-link hover:-rotate-3">
              <ScrollLink
                className="hover:text-primary pb-3 relative md:inline hidden cursor-pointer"
                to={list.link}
                smooth={true}
                duration={500}
                href={`#${list.link}`}
              >
                {list.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
