import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { clinicContact } from "@/data/appointment";

type SiteFooterProps = {
  homeHrefPrefix?: string;
};

const footerLinks = [
  { label: "Home", id: "home" },
  { label: "Specialities", id: "specialities" },
  { label: "Our doctor", id: "doctor" },
  { label: "Request an appointment", id: "appointment" },
];

const linkClass =
  "inline-flex min-h-11 items-center text-sm leading-6 text-brand-ivory/85 transition-colors hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold motion-reduce:transition-none";

const socialLinks = [
  {
    name: "WhatsApp",
    href: clinicContact.whatsappBaseLink,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 20.5 11.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.6 7.8c.3-.3.6-.2.8.2l.8 1.7c.1.3.1.5-.1.7l-.6.7c.7 1.3 1.8 2.4 3.2 3l.7-.8c.2-.2.4-.2.7-.1l1.7.8c.4.2.5.5.3.9-.4.8-1.1 1.2-1.9 1.1-3.4-.5-6.7-3.6-7.2-6.6-.1-.7.2-1.2.6-1.6Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: clinicContact.instagramUrl,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.4" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: clinicContact.facebookUrl,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6H17V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5v3.2h2.8V21Z" />
      </svg>
    ),
  },
];

export function SiteFooter({ homeHrefPrefix = "" }: SiteFooterProps) {
  return (
    <footer id="contact" className="bg-brand-forest pb-24 text-brand-ivory lg:pb-0" aria-labelledby="contact-heading">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-xl font-semibold tracking-[0.06em] sm:text-2xl">GERIMED CLINICS</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-brand-ivory/80">
              General <span className="mx-1 text-brand-gold">•</span> Geriatrics <span className="mx-1 text-brand-gold">•</span> Lifestyle
            </p>
            <div className="my-5 h-px w-14 bg-brand-gold" aria-hidden="true" />
            <p className="max-w-xs text-base leading-7 text-brand-ivory/80">
              Thoughtful care for today. Support for the years ahead.
            </p>
          </div>

          <div>
            <h2 id="contact-heading" className="text-lg font-semibold">Contact us</h2>
            <nav aria-label="Gerimed Clinics social links" className="mt-5 flex flex-wrap gap-5">
              {socialLinks.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Gerimed Clinics on ${name} (opens in a new tab)`}
                  className="group inline-flex min-w-14 flex-col items-center gap-2 rounded-md text-brand-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-ivory/30 bg-white/5 transition-colors group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-forest motion-reduce:transition-none">
                    {icon}
                  </span>
                  <span className="text-xs font-medium">{name}</span>
                </a>
              ))}
            </nav>
          </div>

          <nav aria-label="Footer navigation">
            <p className="mb-2 text-lg font-semibold">Explore</p>
            <ul>
              {footerLinks.map(({ label, id }) => (
                <li key={id}>
                  <Link href={`${homeHrefPrefix}#${id}`} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-brand-ivory/20 pt-6 text-xs leading-6 text-brand-ivory/70 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p>© {new Date().getFullYear()} GERIMED CLINICS. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">General care. Personal attention.</p>
        </div>
      </Container>
    </footer>
  );
}
