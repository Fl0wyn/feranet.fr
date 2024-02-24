import Image from "next/image";
import { Section } from "./components/section";

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
    <Section id="contact" title="Contact" bg="dot">
      <div className="flex justify-end mt-28 relative z-50">
        <div className="rounded-none sm:rounded-s-full bg-slate-900 w-full sm:w-5/6 md:w-2/3">
          <div className="flex items-center">
            <Image
              src={meIcon}
              width={160}
              height={160}
              className="rounded-full m-4"
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
                    <Image
                      width={24}
                      height={24}
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
