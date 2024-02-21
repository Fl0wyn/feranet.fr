import book from "./assets/img/book.svg";
import github from "./assets/img/github.svg";

const links = [
  {
    name: "GitHub",
    link: "https://github.com/Fl0wyn/",
    icon: github,
  },
  {
    name: "Wiki",
    link: "https://wiki.feranet.fr/",
    icon: book,
  },
];

export default function Header() {
  return (
    <header className="relative">
      <div className="bg-square"></div>
      <div className="container mx-auto py-64 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-5xl md:text-7xl mb-5">
            Hi, I'm <span className="stroke">Florian</span>,
          </h1>
          <h1 className="font-bold text-4xl md:text-6xl">
            <span className="text-white bg-blue-800">Web Developer</span> &
            SysAdmin
          </h1>
          <div className="flex gap-3 mt-14 font-semibold text-lg">
            {links.map((link) => (
              <a
                key={link.name}
                className="flex items-center rounded-xl py-2 px-6 text-black bg-white hover:bg-slate-200"
                href={link.link}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={link.icon}
                  alt={`${link.name} icon`}
                  className="w-5 h-5 inline-block mr-2"
                />
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
