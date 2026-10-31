import Image from "next/image";

import { Container } from "@/components/ui/Container";

const carePrinciples = [
  {
    number: "01",
    title: "Whole-person care",
    description:
      "We consider medical history, daily routines, mobility, nutrition and overall wellbeing, not only individual symptoms.",
  },
  {
    number: "02",
    title: "Clear and practical guidance",
    description:
      "Consultations are centred on understandable explanations and realistic next steps for patients and their families.",
  },
  {
    number: "03",
    title: "Continuity through changing needs",
    description:
      "Care plans can evolve over time as health conditions, lifestyle requirements and family support needs change.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 border-t border-brand-sage/25 bg-white sm:scroll-mt-32 lg:scroll-mt-36"
      aria-labelledby="about-heading"
    >
      <Container className="grid gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,0.8fr)] lg:gap-12 lg:py-20 xl:gap-14">
        <div className="max-w-3xl">
          <div
            className="mb-5 h-1 w-16 rounded-full bg-brand-gold"
            aria-hidden="true"
          />
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-forest/65">
            About Gerimed Clinics
          </p>
          <h2
            id="about-heading"
            className="text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl lg:text-5xl"
          >
            Healthcare that looks beyond today&apos;s symptoms.
          </h2>
          <div className="mt-5 space-y-3 text-base leading-7 text-brand-forest/75 sm:text-lg sm:leading-8">
            <p>
              Gerimed Clinics brings together general medicine, geriatric care
              and lifestyle guidance to support adults through changing health
              needs. Our approach focuses on careful evaluation, clear
              communication and practical care plans that patients and families
              can understand.
            </p>
            <p>
              From routine consultations and long-term condition management to
              healthy-ageing support, the clinic is designed to provide
              thoughtful, continuous care in a calm and respectful environment.
            </p>
          </div>

          <p className="mt-5 border-l-4 border-brand-gold pl-4 text-base font-semibold leading-7 text-brand-forest sm:pl-5">
            General care for adults. Focused support for older adults. Practical
            guidance for healthier living.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute -left-4 top-8 hidden h-32 w-32 rounded-full border border-brand-sage/35 lg:block"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-lg border border-brand-sage/35 bg-brand-ivory/55 p-4 sm:p-6 lg:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-brand-sage/30 pb-4 sm:gap-5 sm:pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-forest/55">
                  Care principles
                </p>
                <p className="mt-2 text-lg font-semibold text-brand-forest">
                  A steady, connected approach
                </p>
              </div>
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-brand-gold/35 bg-white p-2.5"
                aria-hidden="true"
              >
                <Image
                  src="/logo/gerimed-icon.png"
                  alt=""
                  width={397}
                  height={397}
                  className="h-full w-full object-contain"
                  sizes="64px"
                />
              </div>
            </div>

            <div className="relative mt-5 space-y-5 sm:space-y-6">
              <div
                className="absolute bottom-10 left-5 top-6 w-px bg-brand-sage/45"
                aria-hidden="true"
              />
              {carePrinciples.map((principle) => (
                <article
                  key={principle.title}
                  className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4"
                >
                  <div
                    className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-white text-xs font-semibold text-brand-forest"
                    aria-hidden="true"
                  >
                    {principle.number}
                  </div>
                  <div className="pb-1">
                    <h3 className="text-lg font-semibold text-brand-forest">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-base leading-6 text-brand-forest/72 sm:leading-7">
                      {principle.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
