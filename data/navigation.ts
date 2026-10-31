export type NavLink = {
  label: string;
  href: string;
};

export const primaryNavigation: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Specialities", href: "#specialities" },
  { label: "Doctor", href: "#doctor" },
  { label: "Book Appointment", href: "#appointment" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export const appointmentHref = "#appointment";
