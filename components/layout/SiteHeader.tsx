import Image from "next/image";
import Link from "next/link";

import { appointmentHref, primaryNavigation } from "@/data/navigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

const phoneNumber = "+91 99852 41122";
const phoneHref = "tel:+919985241122";

export function SiteHeader({ homeHrefPrefix = "" }: { homeHrefPrefix?: string }) {
  const navigation = primaryNavigation.map((link) => ({
    ...link,
    href: `${homeHrefPrefix}${link.href}`,
  }));
  return (
    <>
      <div
        className="relative z-50 bg-brand-forest text-brand-ivory"
        aria-label="Clinic information"
      >
        <div className="mx-auto flex min-h-9 w-full max-w-[87.5rem] items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium leading-5 sm:px-6 lg:px-10">
          <p className="hidden whitespace-nowrap tracking-wide sm:block">
            General <span className="text-brand-gold">•</span> Geriatrics{" "}
            <span className="text-brand-gold">•</span> Lifestyle
          </p>
          <span
            className="hidden h-4 w-px bg-brand-gold/50 sm:block"
            aria-hidden="true"
          />
          <div className="flex items-center justify-center gap-2">
            <a
              href={phoneHref}
              className="whitespace-nowrap transition-colors hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
              aria-label={`Call GERIMED CLINICS at ${phoneNumber}`}
            >
              {phoneNumber}
            </a>
            <span
              className="hidden h-4 w-px bg-brand-gold/50 md:block"
              aria-hidden="true"
            />
            <p className="hidden whitespace-nowrap text-brand-ivory/85 md:block">
              8:00 AM–8:00 PM
            </p>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-brand-sage/30 bg-white/95 shadow-[0_8px_22px_rgba(31,77,58,0.05)]">
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[87.5rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <Link
            href={`${homeHrefPrefix}#home`}
            className="inline-flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
            aria-label="GERIMED CLINICS homepage"
          >
            <Image
              src="/logo/gerimed-clinics-logo.png"
              alt="GERIMED CLINICS logo"
              width={1939}
              height={2305}
              priority
              className="h-14 w-auto sm:h-16"
              sizes="(min-width: 640px) 54px, 47px"
            />
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-nav-section={link.href.split("#")[1]}
                className={
                  link.href === `${homeHrefPrefix}${appointmentHref}`
                    ? "inline-flex min-h-10 items-center justify-center rounded-[1.35rem] bg-brand-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#173b2c] active:translate-y-px aria-[current=location]:ring-2 aria-[current=location]:ring-brand-gold/55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold motion-reduce:transition-none"
                    : "inline-flex min-h-10 items-center justify-center rounded-[1.35rem] px-2.5 py-2 text-sm font-medium text-brand-forest/85 transition-colors hover:bg-brand-ivory hover:text-brand-forest active:translate-y-px aria-[current=location]:bg-brand-ivory aria-[current=location]:text-brand-forest aria-[current=location]:shadow-[inset_0_-2px_0_var(--brand-harvest-gold)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold motion-reduce:transition-none xl:px-3"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center justify-end lg:flex">
            <a
              href={phoneHref}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-brand-sage/45 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-gold hover:bg-brand-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold motion-reduce:transition-none xl:px-5"
              aria-label={`Call GERIMED CLINICS at ${phoneNumber}`}
            >
              Call
            </a>
          </div>

          <MobileNavigation
            appointmentHref={`${homeHrefPrefix}${appointmentHref}`}
            links={navigation}
            phoneHref={phoneHref}
            phoneNumber={phoneNumber}
          />
        </div>
      </header>
    </>
  );
}
