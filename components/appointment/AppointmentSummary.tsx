type SummaryItem = {
  label: string;
  value: string;
};

type AppointmentSummaryProps = {
  feedbackMessage: string;
  hasErrors: boolean;
  items: SummaryItem[];
};

export function AppointmentSummary({
  feedbackMessage,
  hasErrors,
  items,
}: AppointmentSummaryProps) {
  return (
    <aside className="rounded-lg border border-brand-sage/35 bg-brand-ivory/65 p-4">
      <div className="flex flex-col gap-3 border-b border-brand-sage/25 pb-4 sm:flex-row sm:items-start sm:justify-between lg:flex-col xl:flex-row">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
            Appointment Request
          </p>
          <h3 className="mt-1 text-lg font-semibold leading-tight text-brand-forest">
            Appointment request summary
          </h3>
        </div>
        <span className="w-fit rounded-md border border-brand-gold/40 bg-white px-3 py-2 text-xs font-semibold leading-5 text-brand-forest">
          Awaiting clinic confirmation
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm" aria-live="polite">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3"
          >
            <dt className="font-medium text-brand-forest/62">{item.label}</dt>
            <dd className="font-semibold leading-6 text-brand-forest">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div
        className={`mt-4 rounded-md border px-3 py-2.5 text-sm leading-6 ${
          hasErrors
            ? "border-[#d6a49d] bg-[#fff8f6] text-[#7a241a]"
            : "border-brand-sage/35 bg-white/75 text-brand-forest/74"
        }`}
        aria-live="polite"
        role={hasErrors ? "alert" : "status"}
      >
        {feedbackMessage ||
          "Choose your preferences and send the request on WhatsApp. The clinic team will contact you to confirm availability."}
      </div>
    </aside>
  );
}
