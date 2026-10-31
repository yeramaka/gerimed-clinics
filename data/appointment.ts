export type ConsultationTypeId =
  | "general-medicine"
  | "geriatric-care"
  | "lifestyle-preventive-care"
  | "follow-up-consultation"
  | "not-sure";

export type ConsultationType = {
  id: ConsultationTypeId;
  label: string;
  description: string;
};

export type PreferredTimeWindowId =
  | "morning"
  | "midday"
  | "afternoon"
  | "evening"
  | "no-preference";

export type PreferredTimeWindow = {
  id: PreferredTimeWindowId;
  label: string;
  range: string;
};

export const clinicContact = {
  phoneNumber: "+91 99852 41122",
  telHref: "tel:+919985241122",
  whatsappBaseLink: "https://wa.me/919985241122",
};

export const consultationTypes: ConsultationType[] = [
  {
    id: "general-medicine",
    label: "General Medicine",
    description:
      "Everyday adult health concerns and ongoing medical care.",
  },
  {
    id: "geriatric-care",
    label: "Geriatric Care",
    description:
      "Focused care for older adults and changing age-related needs.",
  },
  {
    id: "lifestyle-preventive-care",
    label: "Lifestyle & Preventive Care",
    description:
      "Practical guidance for long-term health and healthier routines.",
  },
  {
    id: "follow-up-consultation",
    label: "Follow-up Consultation",
    description: "For patients returning after an earlier consultation.",
  },
  {
    id: "not-sure",
    label: "Not Sure",
    description:
      "The clinic team can help identify the appropriate consultation.",
  },
];

export const preferredTimeWindows: PreferredTimeWindow[] = [
  {
    id: "morning",
    label: "Morning",
    range: "8:00 AM-11:00 AM",
  },
  {
    id: "midday",
    label: "Midday",
    range: "11:00 AM-2:00 PM",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    range: "2:00 PM-5:00 PM",
  },
  {
    id: "evening",
    label: "Evening",
    range: "5:00 PM-8:00 PM",
  },
  {
    id: "no-preference",
    label: "No preference",
    range: "Clinic team can suggest a suitable time",
  },
];
