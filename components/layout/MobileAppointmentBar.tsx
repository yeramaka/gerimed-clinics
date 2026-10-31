import { clinicContact } from "@/data/appointment";

export function MobileAppointmentBar() {
  return (
    <nav
      className="mobile-appointment-bar fixed inset-x-0 bottom-0 z-40 border-t border-brand-sage/35 bg-white/96 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_28px_rgba(31,77,58,0.10)] lg:hidden"
      aria-label="Quick appointment actions"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={clinicContact.telHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-brand-sage/45 px-4 py-3 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-gold hover:bg-brand-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
          aria-label={`Call GERIMED CLINICS at ${clinicContact.phoneNumber}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
          </svg>
          Call
        </a>
        <a
          href="#appointment"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-forest px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173b2c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
          aria-label="Go to appointment request section"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <path d="M3 10h18" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
          </svg>
          Book Appointment
        </a>
      </div>
    </nav>
  );
}
