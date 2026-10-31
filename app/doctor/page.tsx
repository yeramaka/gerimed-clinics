import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteInteractionManager } from "@/components/layout/SiteInteractionManager";
import { Container } from "@/components/ui/Container";
import { clinicContact } from "@/data/appointment";
import { doctorProfile } from "@/data/doctor";

export const metadata: Metadata = {
  title: "Meet Your Doctor",
  description: "Meet your doctor at Gerimed Clinics and request a consultation for general, geriatric or lifestyle-focused care.",
};

export default function DoctorPage() {
  return (
    <>
      <SiteInteractionManager />
      <SiteHeader homeHrefPrefix="/" />
      <main id="main-content" className="bg-brand-ivory">
        <Container className="py-8 sm:py-12">
          <Link href="/#doctor" className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-brand-forest/75 hover:text-brand-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold">
            <span aria-hidden="true">←</span> Back to Gerimed Clinics
          </Link>
          <section id="doctor" aria-labelledby="profile-heading" className="mt-6 grid items-start gap-8 pb-10 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1fr)] lg:gap-16 lg:pb-16">
            <div className="mx-auto w-full max-w-[32rem] overflow-hidden rounded-lg bg-white shadow-[0_16px_48px_#1f4d3a0d]">
              <Image
                src={doctorProfile.portrait}
                alt="Original portrait of the Gerimed Clinics doctor at her consultation desk"
                width={doctorProfile.portraitWidth}
                height={doctorProfile.portraitHeight}
                unoptimized preload
                className="h-auto w-full"
              />
            </div>
            <div className="max-w-xl lg:pt-8">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-forest/65">Gerimed Clinics</p>
              <h1 id="profile-heading" className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{doctorProfile.name || "Meet your doctor."}</h1>
              {doctorProfile.qualifications ? <p className="mt-4 text-lg font-medium text-brand-forest/70">{doctorProfile.qualifications}</p> : null}
              <p className="mt-6 font-[Georgia,serif] text-3xl leading-snug text-brand-forest/85">Personal care.<br />A clearer path forward.</p>
              <p className="mt-6 text-base leading-8 text-brand-forest/75 sm:text-lg">Your health needs change over time. Our approach at Gerimed Clinics is centred on listening, understanding your day-to-day needs and helping you make sense of your care plan.</p>
              <p className="mt-4 text-base leading-8 text-brand-forest/75 sm:text-lg">Whether you are arranging a consultation for yourself or a family member, the clinic team can help you choose a suitable care area and appointment window.</p>
              <div className="mt-8 border-y border-brand-sage/35 py-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider">Care at Gerimed</h2>
                <ul className="mt-4 space-y-3 text-base text-brand-forest/80">
                  {doctorProfile.careAreas.map((area) => <li key={area} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />{area}</li>)}
                </ul>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#appointment" className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173b2c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold motion-reduce:transition-none">Request a Consultation <span aria-hidden="true" className="ml-4">→</span></Link>
                <a href={clinicContact.telHref} className="inline-flex min-h-12 items-center justify-center rounded-md border border-brand-forest/25 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold motion-reduce:transition-none">Call the Clinic</a>
              </div>
              <p className="mt-4 text-sm leading-6 text-brand-forest/65">Appointment requests are confirmed by the clinic team.</p>
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter homeHrefPrefix="/" />
    </>
  );
}
