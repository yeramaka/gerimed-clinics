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
            <h2 id="contact-heading" className="text-lg font-semibold">Let&apos;s talk about your visit.</h2>
            <a href={clinicContact.telHref} className={`${linkClass} mt-3 text-lg font-medium`} aria-label={`Call Gerimed Clinics at ${clinicContact.phoneNumber}`}>
              {clinicContact.phoneNumber}
            </a>
            <div>
              <a href={clinicContact.whatsappBaseLink} target="_blank" rel="noopener noreferrer" className={`${linkClass} underline decoration-brand-gold/60 underline-offset-4`}>
                Contact us on WhatsApp <span className="sr-only">(opens in a new tab)</span>
                <span aria-hidden="true" className="ml-2">↗</span>
              </a>
            </div>
            <p className="mt-2 max-w-xs text-sm leading-6 text-brand-ivory/70">
              Call or message the clinic to confirm availability before your visit.
            </p>
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
