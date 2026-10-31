import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { doctorProfile } from "@/data/doctor";

export function DoctorSection() {
  return (
    <section id="doctor" className="border-t border-brand-sage/25 bg-white" aria-labelledby="doctor-heading">
      <Container className="grid items-center gap-8 py-14 sm:py-16 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <div className="relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden rounded-lg bg-brand-ivory lg:aspect-square">
          <Image
            src={doctorProfile.portrait}
            alt="Gerimed Clinics doctor seated at her consultation desk"
            fill unoptimized
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 560px, 100vw"
            className="object-cover object-[50%_65%]"
          />
        </div>
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-brand-forest/65">The person behind your care</p>
          <h2 id="doctor-heading" className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {doctorProfile.name || "Care that starts with listening."}
          </h2>
          {doctorProfile.qualifications ? <p className="mt-4 font-medium text-brand-forest/70">{doctorProfile.qualifications}</p> : null}
          <p className="mt-5 text-base leading-8 text-brand-forest/75 sm:text-lg">
            A consultation is a chance to discuss what matters to you. At Gerimed
            Clinics, our approach brings together careful evaluation, clear
            explanations and practical next steps for adults and their families.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Clinic care areas">
            {doctorProfile.careAreas.map((area) => <li key={area} className="rounded-full border border-brand-sage/35 bg-brand-ivory px-3 py-2 text-sm text-brand-forest">{area}</li>)}
          </ul>
          <Link href="/doctor" className="mt-8 inline-flex min-h-12 items-center gap-5 rounded-md bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173b2c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold motion-reduce:transition-none">
            Meet Your Doctor <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
