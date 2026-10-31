import { SiteHeader } from "@/components/layout/SiteHeader";
import { MobileAppointmentBar } from "@/components/layout/MobileAppointmentBar";
import { SiteInteractionManager } from "@/components/layout/SiteInteractionManager";
import { BackToTop } from "@/components/layout/BackToTop";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SpecialitiesSection } from "@/components/sections/SpecialitiesSection";
import { AppointmentSection } from "@/components/sections/AppointmentSection";
import { DoctorSection } from "@/components/sections/DoctorSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteInteractionManager />
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SpecialitiesSection />
        <DoctorSection />
        <AppointmentSection />
        <FaqSection />
      </main>
      <SiteFooter />
      <MobileAppointmentBar />
      <BackToTop />
    </>
  );
}
