export type Speciality = {
  id: string;
  number: string;
  title: string;
  introduction: string;
  points: string[];
  closingLine: string;
  linkLabel: string;
  href: string;
};

export const specialities: Speciality[] = [
  {
    id: "general-medicine",
    number: "01",
    title: "General Medicine",
    introduction:
      "Thoughtful evaluation and ongoing care for common adult health concerns.",
    points: [
      "Routine medical consultations",
      "Ongoing health monitoring",
      "Support for long-term health conditions",
      "Clear guidance on appropriate next steps",
    ],
    closingLine:
      "A practical starting point for new symptoms, regular follow-ups and continuing adult healthcare.",
    linkLabel: "Learn about General Medicine consultations",
    href: "#appointment",
  },
  {
    id: "geriatric-care",
    number: "02",
    title: "Geriatric Care",
    introduction:
      "Focused healthcare support for older adults and the families involved in their care.",
    points: [
      "Age-related health assessment",
      "Review of changing care needs",
      "Mobility and everyday wellbeing considerations",
      "Coordinated guidance for patients and families",
    ],
    closingLine:
      "Care that considers independence, comfort, daily routines and quality of life alongside medical needs.",
    linkLabel: "Learn about Geriatric Care consultations",
    href: "#appointment",
  },
  {
    id: "lifestyle-preventive-care",
    number: "03",
    title: "Lifestyle & Preventive Care",
    introduction:
      "Realistic guidance that supports healthier routines and long-term wellbeing.",
    points: [
      "Preventive health discussions",
      "Nutrition and activity guidance",
      "Lifestyle support for ongoing conditions",
      "Sustainable health-goal planning",
    ],
    closingLine:
      "Small, practical improvements shaped around the patient's health, routine and personal circumstances.",
    linkLabel: "Learn about Lifestyle and Preventive Care consultations",
    href: "#appointment",
  },
];
