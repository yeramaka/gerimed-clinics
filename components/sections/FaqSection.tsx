import { Container } from "@/components/ui/Container";

const questions = [
  {
    question: "How do I request an appointment?",
    answer:
      "Choose your consultation, preferred date and time in the appointment form. Review your details, then select Send Request on WhatsApp and send the prepared message there. The clinic team will confirm availability; submitting a request does not confirm an appointment.",
  },
  {
    question: "Which care areas does Gerimed Clinics offer?",
    answer:
      "The clinic focuses on general medicine for adults, geriatric care for older adults, and lifestyle and preventive care. If you are unsure which consultation to choose, select Not Sure in the form or call the clinic for guidance.",
  },
  {
    question: "What should I bring to my consultation?",
    answer:
      "Bring any previous prescriptions, relevant medical reports and a list of the medicines you currently take. You can also note the questions you would like to discuss during your visit.",
  },
  {
    question: "Can I speak with the clinic before booking?",
    answer:
      "Yes. Use the Call the Clinic link to ask about consultation options or appointment availability. Please discuss sensitive clinical information directly with the doctor rather than adding it to the appointment form.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faqs"
      className="border-t border-brand-sage/25 bg-white"
      aria-labelledby="faq-heading"
    >
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16 lg:py-20">
        <div>
          <div className="mb-5 h-1 w-14 rounded-full bg-brand-gold" aria-hidden="true" />
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-forest/65">
            A little more clarity
          </p>
          <h2 id="faq-heading" className="text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl">
            Before your visit.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-7 text-brand-forest/75 sm:text-lg sm:leading-8">
            A few helpful answers as you plan your care.
          </p>
        </div>

        <div className="divide-y divide-brand-sage/35 border-y border-brand-sage/35">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group py-1">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-base font-semibold leading-7 text-brand-forest marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold sm:text-lg [&::-webkit-details-marker]:hidden">
                {question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-ivory text-brand-forest" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <path d="M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="origin-center transition-transform duration-200 group-open:scale-y-0 motion-reduce:transition-none" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-2xl pb-5 pr-3 text-base leading-7 text-brand-forest/75 sm:pr-12">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
