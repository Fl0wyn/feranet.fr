import Section from "./components/Section";

import fiverrIcon from "./assets/img/contact/fiverr.svg";
import linkedinIcon from "./assets/img/contact/linkedin.svg";
import mailIcon from "./assets/img/contact/mail.svg";
import maltIcon from "./assets/img/contact/malt.svg";
import meIcon from "./assets/img/me.webp";

const contacts = [
  {
    title: "Email",
    link: "mailto:contact@fernanet.fr",
    icon: mailIcon,
  },
  {
    title: "LinkedIn",
    link: "https://linkedin.com/in/florian-feranet",
    icon: linkedinIcon,
  },
  {
    title: "Malt",
    link: "https://www.malt.fr/?",
    icon: maltIcon,
  },
  {
    title: "Fiverr",
    link: "https://fiverr.com/?",
    icon: fiverrIcon,
  },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact" color="bg-slate-950">
      <div className="flex justify-end mt-28">
        <div className="rounded-none md:rounded-s-full md:rounded-e-lg bg-slate-800 w-full md:w-2/3">
          <div className="flex items-center">
            <img
              src={meIcon}
              className="rounded-full h-40 w-40 shadow-sm m-4"
              alt="Profile picture"
            />
            <ul>
              {contacts.map((contact) => (
                <li
                  key={contact.title}
                  className="hover:text-primary hover:translate-x-1 transform transition duration-300 ease-in-out"
                >
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 m-3"
                  >
                    <img
                      className="h-6 w-6"
                      src={contact.icon}
                      alt={`${contact.title} icon`}
                    />
                    <span className="text-lg w-0 lg:w-20">{contact.title}</span>
                    <i className="hidden lg:inline text-slate-400">
                      {contact.link}
                    </i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
