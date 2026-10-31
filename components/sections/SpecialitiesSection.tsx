import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SpecialitiesAccordion } from "@/components/sections/SpecialitiesAccordion";
import { specialities } from "@/data/specialities";

export function SpecialitiesSection() {
  return (
    <section
      id="specialities"
      className="scroll-mt-28 border-t border-brand-sage/25 bg-brand-ivory sm:scroll-mt-32 lg:scroll-mt-36"
      aria-labelledby="specialities-heading"
    >
      <Container className="py-12 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="mx-auto mb-4 h-1 w-14 rounded-full bg-brand-gold"
            aria-hidden="true"
          />
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-forest/65">
            Our Specialities
          </p>
          <h2
            id="specialities-heading"
            className="text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl xl:text-5xl"
          >
            Care designed around changing adult health needs.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-brand-forest/75 sm:text-lg sm:leading-8">
            Gerimed Clinics brings together everyday medical care, focused
            support for older adults and practical lifestyle guidance in one
            thoughtful clinical setting.
          </p>
        </div>

        <SpecialitiesAccordion specialities={specialities} />

        <div className="mt-9 hidden gap-5 lg:grid lg:grid-cols-3">
          {specialities.map((speciality) => (
            <article
              key={speciality.id}
              aria-labelledby={`${speciality.id}-heading`}
              className="flex h-full flex-col rounded-lg border border-brand-sage/35 bg-white p-5 shadow-[0_10px_24px_rgba(31,77,58,0.05)] xl:p-6"
            >
              <div
                className="mb-4 h-1 w-12 rounded-full bg-brand-gold"
                aria-hidden="true"
              />

              <div
                className="flex h-10 w-10 items-center justify-center rounded-md border border-brand-gold/45 bg-brand-ivory text-sm font-semibold text-brand-forest"
                aria-hidden="true"
              >
                {speciality.number}
              </div>

              <h3
                id={`${speciality.id}-heading`}
                className="mt-4 text-xl font-semibold leading-tight text-brand-forest xl:text-2xl"
              >
                {speciality.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-brand-forest/72 xl:text-base xl:leading-7">
                {speciality.introduction}
              </p>

              <ul className="mt-4 space-y-2.5 text-sm leading-6 text-brand-forest/75 xl:text-base">
                {speciality.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4">
                <p className="border-t border-brand-sage/30 pt-3 text-sm font-medium leading-6 text-brand-forest">
                  {speciality.closingLine}
                </p>

                <Link
                  href={speciality.href}
                  aria-label={speciality.linkLabel}
                  className="mt-4 inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-brand-forest/20 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-gold hover:bg-brand-ivory active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold motion-reduce:transition-none"
                >
                  Request this care area
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-brand-forest/68">
          The appropriate consultation and care plan will depend on each
          patient&apos;s individual health needs.
        </p>
      </Container>
    </section>
  );
}
