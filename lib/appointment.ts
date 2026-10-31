import type {
  ConsultationTypeId,
  PreferredTimeWindowId,
} from "@/data/appointment";

export type AppointmentFormValues = {
  consultationTypeId: ConsultationTypeId | "";
  preferredDate: string;
  preferredTimeWindowId: PreferredTimeWindowId | "";
  fullName: string;
  mobileNumber: string;
  email: string;
};

export type AppointmentFormErrors = Partial<
  Record<keyof AppointmentFormValues, string>
>;

export type AppointmentValidationResult = {
  errors: AppointmentFormErrors;
  isValid: boolean;
  normalizedMobileNumber?: string;
};

export type DateOption = {
  iso: string;
  dayName: string;
  dayNumber: string;
  monthLabel: string;
  fullLabel: string;
};

export type WhatsAppMessageInput = {
  fullName: string;
  mobileNumber: string;
  email: string;
  consultationLabel: string;
  preferredDateLabel: string;
  preferredTimeLabel: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toLocalIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTodayIsoDate() {
  return toLocalIsoDate(new Date());
}

function parseLocalIsoDate(isoDate: string) {
  if (!isoDatePattern.test(isoDate)) {
    return null;
  }

  const [year, month, day] = isoDate.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

export function buildDateOptions(referenceDate = new Date(), days = 14) {
  const baseDate = startOfLocalDay(referenceDate);
  const dayFormatter = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
  });
  const monthFormatter = new Intl.DateTimeFormat("en-IN", {
    month: "short",
  });
  const fullFormatter = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return Array.from({ length: days }, (_, index): DateOption => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + index);

    return {
      iso: toLocalIsoDate(date),
      dayName: dayFormatter.format(date),
      dayNumber: String(date.getDate()),
      monthLabel: monthFormatter.format(date),
      fullLabel: fullFormatter.format(date),
    };
  });
}

export function formatAppointmentDate(isoDate: string) {
  const parsedDate = parseLocalIsoDate(isoDate);

  if (!parsedDate) {
    return "Not selected";
  }

  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

export function normalizeIndianMobileNumber(value: string) {
  const trimmedValue = value.trim();
  const digitsOnly = trimmedValue.replace(/\D/g, "");
  let nationalNumber = digitsOnly;

  if (nationalNumber.length === 13 && nationalNumber.startsWith("910")) {
    nationalNumber = nationalNumber.slice(3);
  } else if (
    nationalNumber.length === 12 &&
    nationalNumber.startsWith("91")
  ) {
    nationalNumber = nationalNumber.slice(2);
  } else if (
    nationalNumber.length === 11 &&
    nationalNumber.startsWith("0")
  ) {
    nationalNumber = nationalNumber.slice(1);
  }

  if (!/^[6-9]\d{9}$/.test(nationalNumber)) {
    return {
      displayValue: trimmedValue,
      isValid: false,
    };
  }

  return {
    displayValue: `+91 ${nationalNumber.slice(0, 5)} ${nationalNumber.slice(5)}`,
    isValid: true,
  };
}

export function validateAppointmentRequest(
  values: AppointmentFormValues,
): AppointmentValidationResult {
  const errors: AppointmentFormErrors = {};
  const trimmedName = values.fullName.trim();
  const trimmedEmail = values.email.trim();

  if (!values.consultationTypeId) {
    errors.consultationTypeId = "Select a consultation type.";
  }

  if (!values.preferredDate) {
    errors.preferredDate = "Select a preferred date.";
  } else {
    const selectedDate = parseLocalIsoDate(values.preferredDate);
    const today = startOfLocalDay(new Date());

    if (!selectedDate || selectedDate < today) {
      errors.preferredDate = "Select today or a future preferred date.";
    }
  }

  if (!values.preferredTimeWindowId) {
    errors.preferredTimeWindowId = "Select a preferred time window.";
  }

  if (!trimmedName) {
    errors.fullName = "Enter the patient's full name.";
  } else if (trimmedName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  const normalizedMobile = normalizeIndianMobileNumber(values.mobileNumber);

  if (!values.mobileNumber.trim()) {
    errors.mobileNumber = "Enter a mobile number.";
  } else if (!normalizedMobile.isValid) {
    errors.mobileNumber = "Enter a valid 10-digit Indian mobile number.";
  }

  if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
    errors.email = "Enter a valid email address or leave it blank.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    normalizedMobileNumber: normalizedMobile.isValid
      ? normalizedMobile.displayValue
      : undefined,
  };
}

export function buildWhatsAppMessage(input: WhatsAppMessageInput) {
  return [
    "Hello GERIMED CLINICS,",
    "",
    "I would like to request an appointment.",
    "",
    `Name: ${input.fullName.trim()}`,
    `Mobile: ${input.mobileNumber}`,
    `Email: ${input.email.trim() || "Not provided"}`,
    `Consultation: ${input.consultationLabel}`,
    `Preferred date: ${input.preferredDateLabel}`,
    `Preferred time: ${input.preferredTimeLabel}`,
    "",
    "Please contact me to confirm availability.",
  ].join("\n");
}

export function buildWhatsAppUrl(baseLink: string, message: string) {
  return `${baseLink}?text=${encodeURIComponent(message)}`;
}
