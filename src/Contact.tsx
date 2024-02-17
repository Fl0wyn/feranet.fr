import Section from "./components/Section";

const contacts = [
  {
    title: "Email",
    link: "mailto:contact@fernanet.fr",
    icon: "/contact/mail.svg",
  },
  {
    title: "LinkedIn",
    link: "https://linkedin.com/in/florian-feranet",
    icon: "/contact/linkedin.svg",
  },
  {
    title: "Malt",
    link: "https://www.malt.fr/?",
    icon: "/contact/malt.svg",
  },
  {
    title: "Fiverr",
    link: "https://fiverr.com/?",
    icon: "/contact/fiverr.svg",
  },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact" color="bg-slate-950">
      <div className="flex justify-end mt-28">
        <div className="rounded-none md:rounded-s-full md:rounded-e-lg bg-slate-800 w-full md:w-2/3">
          <div className="flex items-center">
            <img src="/me.webp" className="rounded-full h-40 shadow-sm m-4" />
            <div>
              {contacts.map((contact) => (
                <a
                  key={contact.title}
                  href={contact.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 m-3 hover:text-primary hover:translate-x-1 transform transition duration-300 ease-in-out"
                >
                  <img className="h-6 w-6" src={contact.icon} />
                  <h4 className="text-lg w-0 lg:w-20">{contact.title}</h4>
                  <i className="hidden lg:inline text-slate-400">
                    {contact.link}
                  </i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
