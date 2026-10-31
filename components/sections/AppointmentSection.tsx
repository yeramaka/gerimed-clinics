import { AppointmentRequestForm } from "@/components/appointment/AppointmentRequestForm";
import { Container } from "@/components/ui/Container";

export function AppointmentSection() {
  return (
    <section
      id="appointment"
      className="scroll-mt-28 border-t border-brand-sage/25 bg-brand-ivory sm:scroll-mt-32 lg:scroll-mt-36"
      aria-labelledby="appointment-heading"
    >
      <Container className="py-10 sm:py-12 lg:py-8 xl:py-10">
        <div className="mx-auto max-w-6xl text-left lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-10">
          <div className="max-w-2xl">
          <div
            className="mb-4 h-1 w-14 rounded-full bg-brand-gold"
            aria-hidden="true"
          />
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-forest/65">
            Book a Consultation
          </p>
          <h2
            id="appointment-heading"
            className="text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl xl:text-[2.45rem]"
          >
            Request an appointment at Gerimed Clinics.
          </h2>
          </div>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-forest/75 sm:text-lg sm:leading-8 lg:mt-0 lg:max-w-none">
            Select your preferred consultation, date and time. The clinic team
            will contact you to confirm availability.
          </p>
        </div>

        <AppointmentRequestForm />
      </Container>
    </section>
  );
}
