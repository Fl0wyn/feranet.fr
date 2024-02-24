import Image from "next/image";
import logo from "./assets/img/logo-variant.svg";

const links = [
  { name: "Home", link: "home" },
  { name: "Skills", link: "skills" },
  { name: "Projects", link: "projects" },
  { name: "Contact", link: "contact" },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full backdrop-blur border-b-2 border-slate-600 z-[100]">
      <div className="container mx-auto p-4 flex justify-between items-center gap-8">
        <div className="w-10 hover:animate-spin">
          <Image src={logo} width={40} height={40} alt="App logo" />
        </div>

        <ul className="flex items-center gap-12">
          {links.map((list) => (
            <li key={list.name} className="nav-link hover:-rotate-3">
              <a
                className="hover:text-primary pb-3 relative md:inline hidden cursor-pointer"
                href={`#${list.link}`}
              >
                {list.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
