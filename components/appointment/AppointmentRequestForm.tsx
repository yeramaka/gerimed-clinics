"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  clinicContact,
  consultationTypes,
  preferredTimeWindows,
  type ConsultationTypeId,
  type PreferredTimeWindowId,
} from "@/data/appointment";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatAppointmentDate,
  getTodayIsoDate,
  validateAppointmentRequest,
  type AppointmentFormErrors,
  type AppointmentFormValues,
} from "@/lib/appointment";
import { AppointmentSummary } from "@/components/appointment/AppointmentSummary";

const initialValues: AppointmentFormValues = {
  consultationTypeId: "",
  preferredDate: "",
  preferredTimeWindowId: "",
  fullName: "",
  mobileNumber: "",
  email: "",
};

const fieldOrder: (keyof AppointmentFormValues)[] = [
  "consultationTypeId",
  "preferredDate",
  "preferredTimeWindowId",
  "fullName",
  "mobileNumber",
  "email",
];

const fieldSteps: Record<keyof AppointmentFormValues, 1 | 2 | 3> = {
  consultationTypeId: 1,
  preferredDate: 1,
  preferredTimeWindowId: 1,
  fullName: 2,
  mobileNumber: 2,
  email: 2,
};

const inputClass =
  "mt-2 min-h-11 w-full rounded-md border border-brand-sage/45 bg-brand-ivory/45 px-3 py-2.5 text-sm text-brand-forest outline-none transition-colors placeholder:text-brand-forest/45 hover:border-brand-sage focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/25 motion-reduce:transition-none";

const labelClass = "text-sm font-semibold text-brand-forest";
const errorClass = "mt-1.5 text-sm font-medium text-[#9f2d20]";

function getValueLabel(value: string) {
  return value.trim() || "Not selected";
}

function focusFormControl(control: HTMLElement | null) {
  if (!control) {
    return;
  }

  control.scrollIntoView({
    block: "center",
    inline: "nearest",
  });
  control.focus({
    preventScroll: true,
  });
}

type StepHeaderProps = {
  controlsId: string;
  isOpen: boolean;
  number: string;
  onClick: () => void;
  summary: string;
  title: string;
};

function StepHeader({
  controlsId,
  isOpen,
  number,
  onClick,
  summary,
  title,
}: StepHeaderProps) {
  return (
    <button
      type="button"
      className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-brand-ivory focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-gold motion-reduce:transition-none md:hidden"
      aria-expanded={isOpen}
      aria-controls={controlsId}
      onClick={onClick}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-brand-gold/45 bg-brand-gold/10 text-xs font-semibold text-brand-forest"
          aria-hidden="true"
        >
          {number}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-brand-forest">
            {title}
          </span>
          <span className="block truncate text-xs leading-5 text-brand-forest/62">
            {summary}
          </span>
        </span>
      </span>
      <svg
        className={`h-4 w-4 shrink-0 text-brand-forest transition-transform motion-reduce:transition-none ${
          isOpen ? "rotate-180" : ""
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
  );
}

export function AppointmentRequestForm() {
  const [values, setValues] = useState<AppointmentFormValues>(initialValues);
  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [todayIso, setTodayIso] = useState("");

  const consultationRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const mobileNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const confirmClearRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const animationFrameId = window.requestAnimationFrame(() => {
      setTodayIso(getTodayIsoDate());
    });

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  const consultationLabel = useMemo(() => {
    return (
      consultationTypes.find((item) => item.id === values.consultationTypeId)
        ?.label || "Not selected"
    );
  }, [values.consultationTypeId]);

  const preferredTimeLabel = useMemo(() => {
    const timeWindow = preferredTimeWindows.find(
      (item) => item.id === values.preferredTimeWindowId,
    );

    if (!timeWindow) {
      return "Not selected";
    }

    return timeWindow.id === "no-preference"
      ? timeWindow.label
      : `${timeWindow.label}, ${timeWindow.range}`;
  }, [values.preferredTimeWindowId]);

  const preferredDateLabel = values.preferredDate
    ? formatAppointmentDate(values.preferredDate)
    : "Not selected";

  const summaryItems = [
    {
      label: "Consultation",
      value: consultationLabel,
    },
    {
      label: "Date",
      value: preferredDateLabel,
    },
    {
      label: "Time",
      value: preferredTimeLabel,
    },
    {
      label: "Patient",
      value: getValueLabel(values.fullName),
    },
  ];

  const hasFormData = Object.values(values).some((value) => value.trim());
  const hasErrors = Object.keys(errors).length > 0;
  const stepOneSummary =
    values.consultationTypeId || values.preferredDate || values.preferredTimeWindowId
      ? [consultationLabel, preferredDateLabel, preferredTimeLabel]
          .filter((value) => value !== "Not selected")
          .join(" · ") || "Choose preferences"
      : "Choose preferences";
  const stepTwoSummary =
    values.fullName || values.mobileNumber
      ? [values.fullName.trim(), values.mobileNumber.trim()]
          .filter(Boolean)
          .join(" · ")
      : "Name and mobile number";

  const updateValue = <Field extends keyof AppointmentFormValues>(
    field: Field,
    value: AppointmentFormValues[Field],
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setShowClearConfirmation(false);

    if (errors[field]) {
      setErrors((currentErrors) => {
        const nextErrors = { ...currentErrors };
        delete nextErrors[field];
        return nextErrors;
      });
    }
  };

  const focusFirstInvalidField = (nextErrors: AppointmentFormErrors) => {
    const fieldRefs = {
      consultationTypeId: consultationRef,
      preferredDate: dateRef,
      preferredTimeWindowId: timeRef,
      fullName: fullNameRef,
      mobileNumber: mobileNumberRef,
      email: emailRef,
    };
    const firstInvalidField = fieldOrder.find((field) => nextErrors[field]);

    if (firstInvalidField) {
      setActiveStep(fieldSteps[firstInvalidField]);
      requestAnimationFrame(() =>
        focusFormControl(fieldRefs[firstInvalidField].current),
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateAppointmentRequest(values);
    setErrors(validation.errors);
    setShowClearConfirmation(false);

    if (!validation.isValid) {
      const errorCount = Object.keys(validation.errors).length;
      setFeedbackMessage(
        `Please review ${errorCount} field${errorCount === 1 ? "" : "s"} before sending your request.`,
      );
      focusFirstInvalidField(validation.errors);
      return;
    }

    const message = buildWhatsAppMessage({
      fullName: values.fullName,
      mobileNumber: validation.normalizedMobileNumber || values.mobileNumber,
      email: values.email,
      consultationLabel,
      preferredDateLabel,
      preferredTimeLabel,
    });
    const whatsappUrl = buildWhatsAppUrl(
      clinicContact.whatsappBaseLink,
      message,
    );

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setActiveStep(3);
    setFeedbackMessage(
      "Your request has been prepared in WhatsApp. Please send the message there. The clinic team will contact you to confirm availability.",
    );
  };

  const clearForm = () => {
    setValues(initialValues);
    setErrors({});
    setFeedbackMessage("");
    setShowClearConfirmation(false);
    setActiveStep(1);
    requestAnimationFrame(() => focusFormControl(consultationRef.current));
  };

  const handleClearRequest = () => {
    if (!hasFormData) {
      clearForm();
      return;
    }

    setShowClearConfirmation(true);
    requestAnimationFrame(() => confirmClearRef.current?.focus());
  };

  return (
    <form
      noValidate
      className="mx-auto mt-6 overflow-hidden rounded-xl border border-brand-sage/35 bg-white shadow-[0_14px_30px_rgba(31,77,58,0.06)]"
      aria-label="Appointment request form"
      onSubmit={handleSubmit}
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_22.5rem]">
        <div className="divide-y divide-brand-sage/25">
          <div className="hidden px-5 pb-1 pt-4 md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
              Appointment Request
            </p>
            <p className="mt-1 text-sm leading-6 text-brand-forest/68">
              Choose the closest option. The clinic team can guide you if you
              are unsure.
            </p>
          </div>

          {feedbackMessage ? (
            <div
              className={`mx-4 mt-4 rounded-md border px-3 py-2 text-sm leading-6 md:mx-5 ${
                hasErrors
                  ? "border-[#d6a49d] bg-[#fff8f6] text-[#7a241a]"
                  : "border-brand-sage/35 bg-brand-ivory/70 text-brand-forest/74"
              }`}
              aria-live="polite"
              role={hasErrors ? "alert" : "status"}
            >
              {feedbackMessage}
            </div>
          ) : null}

          <section>
            <StepHeader
              controlsId="appointment-step-preferences"
              isOpen={activeStep === 1}
              number="1"
              title="Consultation, date and time"
              summary={stepOneSummary}
              onClick={() => setActiveStep(1)}
            />
            <div
              id="appointment-step-preferences"
              className={`gap-4 px-4 py-4 md:grid md:grid-cols-3 md:px-5 md:py-3 ${
                activeStep === 1 ? "grid" : "hidden"
              }`}
            >
              <div>
                <label htmlFor="consultation-type" className={labelClass}>
                  Consultation type
                </label>
                <select
                  ref={consultationRef}
                  id="consultation-type"
                  name="consultationType"
                  value={values.consultationTypeId}
                  aria-describedby={`appointment-preferences-note${
                    errors.consultationTypeId ? " consultation-type-error" : ""
                  }`}
                  aria-invalid={Boolean(errors.consultationTypeId)}
                  className={inputClass}
                  onChange={(event) =>
                    updateValue(
                      "consultationTypeId",
                      event.target.value as ConsultationTypeId | "",
                    )
                  }
                >
                  <option value="">Select care area</option>
                  {consultationTypes.map((consultationType) => (
                    <option key={consultationType.id} value={consultationType.id}>
                      {consultationType.label}
                    </option>
                  ))}
                </select>
                {errors.consultationTypeId ? (
                  <p id="consultation-type-error" className={errorClass}>
                    {errors.consultationTypeId}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="preferred-date" className={labelClass}>
                  Preferred date
                </label>
                <input
                  ref={dateRef}
                  id="preferred-date"
                  name="preferredDate"
                  type="date"
                  min={todayIso || undefined}
                  value={values.preferredDate}
                  aria-describedby={`appointment-preferences-note${
                    errors.preferredDate ? " preferred-date-error" : ""
                  }`}
                  aria-invalid={Boolean(errors.preferredDate)}
                  className={inputClass}
                  onChange={(event) =>
                    updateValue("preferredDate", event.target.value)
                  }
                />
                {errors.preferredDate ? (
                  <p id="preferred-date-error" className={errorClass}>
                    {errors.preferredDate}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="preferred-time" className={labelClass}>
                  Preferred time
                </label>
                <select
                  ref={timeRef}
                  id="preferred-time"
                  name="preferredTimeWindow"
                  value={values.preferredTimeWindowId}
                  aria-describedby={`appointment-preferences-note${
                    errors.preferredTimeWindowId
                      ? " preferred-time-error"
                      : ""
                  }`}
                  aria-invalid={Boolean(errors.preferredTimeWindowId)}
                  className={inputClass}
                  onChange={(event) =>
                    updateValue(
                      "preferredTimeWindowId",
                      event.target.value as PreferredTimeWindowId | "",
                    )
                  }
                >
                  <option value="">Select time window</option>
                  {preferredTimeWindows.map((timeWindow) => (
                    <option key={timeWindow.id} value={timeWindow.id}>
                      {timeWindow.id === "no-preference"
                        ? timeWindow.label
                        : `${timeWindow.label} - ${timeWindow.range}`}
                    </option>
                  ))}
                </select>
                {errors.preferredTimeWindowId ? (
                  <p id="preferred-time-error" className={errorClass}>
                    {errors.preferredTimeWindowId}
                  </p>
                ) : null}
              </div>

              <p
                id="appointment-preferences-note"
                className="rounded-md border border-brand-sage/25 bg-brand-ivory/55 px-3 py-2 text-xs leading-5 text-brand-forest/64 md:col-span-3"
              >
                Choose the closest option. Availability requires clinic
                confirmation, and preferred windows are not confirmed slots.
              </p>
            </div>
          </section>

          <section>
            <StepHeader
              controlsId="appointment-step-contact"
              isOpen={activeStep === 2}
              number="2"
              title="Name and contact details"
              summary={stepTwoSummary}
              onClick={() => setActiveStep(2)}
            />
            <div
              id="appointment-step-contact"
              className={`gap-4 px-4 py-4 md:grid md:grid-cols-3 md:px-5 md:py-3 ${
                activeStep === 2 ? "grid" : "hidden"
              }`}
            >
              <div>
                <label htmlFor="appointment-full-name" className={labelClass}>
                  Full name
                </label>
                <input
                  ref={fullNameRef}
                  id="appointment-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={values.fullName}
                  aria-describedby={
                    errors.fullName ? "full-name-error" : undefined
                  }
                  aria-invalid={Boolean(errors.fullName)}
                  className={inputClass}
                  placeholder="Patient full name"
                  onChange={(event) =>
                    updateValue("fullName", event.target.value)
                  }
                />
                {errors.fullName ? (
                  <p id="full-name-error" className={errorClass}>
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="appointment-mobile-number"
                  className={labelClass}
                >
                  Mobile number
                </label>
                <input
                  ref={mobileNumberRef}
                  id="appointment-mobile-number"
                  name="mobileNumber"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.mobileNumber}
                  aria-describedby={
                    errors.mobileNumber ? "mobile-number-error" : undefined
                  }
                  aria-invalid={Boolean(errors.mobileNumber)}
                  className={inputClass}
                  placeholder="+91 XXXXX XXXXX"
                  onChange={(event) =>
                    updateValue("mobileNumber", event.target.value)
                  }
                />
                {errors.mobileNumber ? (
                  <p id="mobile-number-error" className={errorClass}>
                    {errors.mobileNumber}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="appointment-email" className={labelClass}>
                  Email address{" "}
                  <span className="font-medium text-brand-forest/58">
                    (optional)
                  </span>
                </label>
                <input
                  ref={emailRef}
                  id="appointment-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={Boolean(errors.email)}
                  className={inputClass}
                  placeholder="you@example.com"
                  onChange={(event) => updateValue("email", event.target.value)}
                />
                {errors.email ? (
                  <p id="email-error" className={errorClass}>
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          <section>
            <StepHeader
              controlsId="appointment-step-review"
              isOpen={activeStep === 3}
              number="3"
              title="Review and send"
              summary="WhatsApp request and clinic call"
              onClick={() => setActiveStep(3)}
            />
            <div
              id="appointment-step-review"
              className={`px-4 py-4 md:block md:px-5 md:py-3 ${
                activeStep === 3 ? "block" : "hidden"
              }`}
            >
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
                <p className="rounded-md border border-brand-sage/35 bg-brand-ivory/65 px-3 py-2.5 text-sm leading-6 text-brand-forest/72">
                  Please avoid sharing sensitive medical information through
                  this form. Clinical details can be discussed directly with the
                  doctor.
                </p>

                <div className="flex flex-col gap-2 sm:flex-row xl:justify-end">
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#173b2c] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
                  >
                    Send Request on WhatsApp
                  </button>
                  <a
                    href={clinicContact.telHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-sage/45 px-4 py-2.5 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-gold hover:bg-brand-ivory active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
                    aria-label={`Call GERIMED CLINICS at ${clinicContact.phoneNumber}`}
                  >
                    Call the Clinic
                  </a>
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-sage/45 px-4 py-2.5 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-gold hover:bg-brand-ivory active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
                    onClick={handleClearRequest}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {showClearConfirmation ? (
                <div
                  className="mt-3 rounded-md border border-brand-gold/45 bg-brand-gold/10 px-3 py-3"
                  aria-live="polite"
                >
                  <p className="text-sm font-semibold text-brand-forest">
                    Clear this appointment request?
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <button
                      ref={confirmClearRef}
                      type="button"
                      className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#173b2c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
                      onClick={clearForm}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-sage/45 px-4 py-2 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-gold hover:bg-brand-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
                      onClick={() => setShowClearConfirmation(false)}
                    >
                      Keep editing
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>

        <div
          className={`border-t border-brand-sage/25 p-4 lg:border-l lg:border-t-0 ${
            activeStep === 3 ? "block" : "hidden"
          } md:block`}
        >
          <AppointmentSummary
            feedbackMessage={feedbackMessage}
            hasErrors={hasErrors}
            items={summaryItems}
          />
        </div>
      </div>
    </form>
  );
}
