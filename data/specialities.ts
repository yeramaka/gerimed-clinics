export type Speciality = {
  id: string;
  number: string;
  title: string;
  introduction: string;
  points: string[];
  closingLine: string;
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
  },
  {
    id: "adult-vaccinations",
    number: "04",
    title: "Adult Vaccinations",
    introduction:
      "Personalised vaccination guidance to support prevention throughout adult life.",
    points: [
      "Review of vaccination history",
      "Age-appropriate vaccine recommendations",
      "Dose and booster guidance",
      "Discussion of benefits and precautions",
    ],
    closingLine:
      "A practical approach to prevention, guided by your age, medical history and individual health needs.",
  },
  {
    id: "fever-clinic",
    number: "05",
    title: "Fever Clinic",
    introduction:
      "Focused assessment and care for adults with fever and accompanying symptoms.",
    points: [
      "Assessment of fever and related symptoms",
      "Investigations when clinically appropriate",
      "Individualised treatment and recovery advice",
      "Follow-up and referral when needed",
    ],
    closingLine:
      "Care that helps you understand your symptoms, supports recovery and guides appropriate next steps.",
  },
  {
    id: "pharmacy-diagnostics",
    number: "06",
    title: "Pharmacy & Diagnostics",
    introduction:
      "Access to prescribed medicines and recommended tests to support your care.",
    points: [
      "Access to prescribed medicines",
      "Doctor-recommended diagnostic tests",
      "Review and explanation of test results",
      "Support for ongoing health monitoring",
    ],
    closingLine:
      "Practical support that connects your consultation with medicines, investigations and follow-up care.",
  },
];
