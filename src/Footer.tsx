const credits = [
  {
    title: "Vite",
    link: "https://vitejs.dev/",
  },
  {
    title: "React",
    link: "https://reactjs.org/",
  },
  {
    title: "Tailwind CSS",
    link: "https://tailwindcss.com/",
  },
  {
    title: "SVGPORN",
    link: "https://svgporn.com/",
  },
  {
    title: "Vercel",
    link: "https://vercel.com/",
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <>
      <footer className="mx-auto py-14 md:py-32">
        <div className="text-center pb-3">
          Copyright © {currentYear}&nbsp;
          <a href="https://feranet.fr" className="hover:text-primary">
            feranet.fr
          </a>
        </div>
        <div className="mx-auto border-primary border-t-2 w-24"></div>
      </footer>
      <div className="text-center border-t-2 border-slate-600 p-2">
        <span className="text-slate-200">Designed and built by Florian 😉</span>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:flex justify-center gap-3 mt-2">
          {credits.map((credit) => (
            <li
              key={credit.title}
              className="text-slate-400 hover:text-primary"
            >
              <a href={credit.link} target="_blank" rel="noreferrer">
                {credit.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
