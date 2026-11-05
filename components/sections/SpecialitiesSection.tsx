import { Container } from "@/components/ui/Container";
import { SpecialitiesAccordion } from "@/components/sections/SpecialitiesAccordion";
import { specialities } from "@/data/specialities";

export function SpecialitiesSection() {
  return (
    <section
      id="specialities"
      className="border-t border-brand-sage/25 bg-brand-ivory"
      aria-labelledby="specialities-heading"
    >
      <Container className="py-10 sm:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-brand-gold" aria-hidden="true" />
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-brand-forest/65">Our Specialities</p>
          <h2 id="specialities-heading" className="text-2xl font-semibold leading-tight text-brand-forest sm:text-3xl">
            Care designed around changing adult health needs.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-brand-forest/75">
            Everyday medical care, healthy-ageing support, preventive care and practical services for the next steps in your care.
          </p>
        </div>
        <SpecialitiesAccordion specialities={specialities} />
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-brand-forest/68">
          The appropriate consultation and care plan will depend on each patient&apos;s individual health needs.
        </p>
      </Container>
    </section>
  );
}
