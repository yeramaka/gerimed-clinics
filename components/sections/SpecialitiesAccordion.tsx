"use client";

import Link from "next/link";
import { useState } from "react";

import type { Speciality } from "@/data/specialities";

type SpecialitiesAccordionProps = {
  specialities: Speciality[];
};

export function SpecialitiesAccordion({
  specialities,
}: SpecialitiesAccordionProps) {
  const [activeId, setActiveId] = useState(specialities[0]?.id ?? "");

  return (
    <div className="mt-8 space-y-3 lg:hidden">
      {specialities.map((speciality) => {
        const isExpanded = speciality.id === activeId;
        const panelId = `${speciality.id}-mobile-panel`;
        const buttonId = `${speciality.id}-mobile-button`;

        return (
          <article
            key={speciality.id}
            className="overflow-hidden rounded-lg border border-brand-sage/35 bg-white"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-brand-ivory focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-gold motion-reduce:transition-none"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => setActiveId(speciality.id)}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-brand-gold/45 bg-brand-ivory text-xs font-semibold text-brand-forest"
                    aria-hidden="true"
                  >
                    {speciality.number}
                  </span>
                  <span className="text-base font-semibold text-brand-forest">
                    {speciality.title}
                  </span>
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 text-brand-forest transition-transform motion-reduce:transition-none ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="m5 8 5 5 5-5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isExpanded}
              className="border-t border-brand-sage/25 px-4 pb-4 pt-3"
            >
              <p className="text-sm leading-6 text-brand-forest/72">
                {speciality.introduction}
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-brand-forest/75">
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
              <p className="mt-3 border-t border-brand-sage/25 pt-3 text-sm font-medium leading-6 text-brand-forest">
                {speciality.closingLine}
              </p>
              <Link
                href={speciality.href}
                aria-label={speciality.linkLabel}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-brand-forest/20 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-gold hover:bg-brand-ivory active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
              >
                Request this care area
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
