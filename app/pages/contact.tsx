import { SiteSection } from "@/components/site-section";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

const items = siteConfig.contacts;

export default function Contact() {
  return (
    <SiteSection id="contact" title="Contact" bg="dot">
      <div className="flex justify-end mt-28 relative z-50">
        <div className="rounded-none sm:rounded-s-full bg-slate-900 w-full sm:w-5/6 md:w-2/3">
          <div className="flex items-center">
            <Image
              src="/img/me.webp"
              width={160}
              height={160}
              className="rounded-full m-4"
              alt="Profile picture"
            />
            <ul>
              {items.map((item) => (
                <li
                  key={item.title}
                  className="hover:text-primary hover:translate-x-1 transform transition duration-300 ease-in-out"
                >
                  <Link
                    className="flex items-center gap-3 m-3"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      width={24}
                      height={24}
                      src={item.icon}
                      alt={`${item.title} icon`}
                    />
                    <span className="text-lg w-0 lg:w-20">{item.title}</span>
                    <i className="hidden lg:inline text-slate-400">
                      {item.href}
                    </i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SiteSection>
  );
}
