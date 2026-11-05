import type { Speciality } from "@/data/specialities";

type SpecialitiesAccordionProps = {
  specialities: Speciality[];
};

export function SpecialitiesAccordion({ specialities }: SpecialitiesAccordionProps) {
  return (
    <div className="mt-5 grid gap-3 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
      {specialities.map((speciality) => (
        <article
          key={speciality.id}
          aria-labelledby={`${speciality.id}-heading`}
          className="flex flex-col rounded-lg border border-brand-sage/35 bg-white p-4 shadow-[0_4px_16px_#1f4d3a06] lg:p-3.5"
        >
          <div className="flex min-h-8 items-center gap-2.5">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-brand-gold/45 bg-brand-ivory text-[11px] font-semibold text-brand-forest"
              aria-hidden="true"
            >
              {speciality.number}
            </span>
            <h3 id={`${speciality.id}-heading`} className="text-sm font-semibold leading-5 text-brand-forest">
              {speciality.title}
            </h3>
          </div>
          <p className="mt-2 min-h-10 text-[13px] leading-5 text-brand-forest/75">
            {speciality.introduction}
          </p>
          <ul className="my-3 space-y-1.5 text-[13px] leading-5 text-brand-forest/75">
            {speciality.points.map((point) => {
              const separator = point.indexOf(":");
              return (
                <li key={point} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                  <span>
                    {separator > 0 ? <><strong className="font-semibold text-brand-forest">{point.slice(0, separator)}:</strong>{point.slice(separator + 1)}</> : point}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-auto border-t border-brand-sage/25 pt-2 text-[13px] font-medium leading-5 text-brand-forest">
            {speciality.closingLine}
          </p>
        </article>
      ))}
    </div>
  );
}
