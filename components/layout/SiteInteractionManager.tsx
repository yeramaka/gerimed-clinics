"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const sectionIds = [
  "home",
  "about",
  "specialities",
  "doctor",
  "appointment",
  "faqs",
  "contact",
];

export function SiteInteractionManager() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector("header");
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let activeId = "";
    let frameId = 0;
    let headerHeight = 72;

    const updateActiveNavigation = () => {
      frameId = 0;
      const marker = headerHeight + Math.min(window.innerHeight * 0.22, 160);
      let currentId = sections[0]?.id ?? (pathname === "/doctor" ? "doctor" : "");

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) {
          currentId = section.id;
        }
      }

      if (
        sections.length > 0 &&
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= root.scrollHeight - 2
      ) {
        currentId = sections[sections.length - 1].id;
      }

      if (currentId === activeId) return;
      activeId = currentId;
      document.querySelectorAll<HTMLAnchorElement>("[data-nav-section]").forEach((link) => {
        if (link.dataset.navSection === currentId) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const scheduleNavigationUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateActiveNavigation);
    };

    const updateHeaderHeight = () => {
      headerHeight = header?.getBoundingClientRect().height ?? 72;
      root.style.setProperty("--site-header-height", `${headerHeight}px`);
      scheduleNavigationUpdate();
    };

    updateHeaderHeight();
    const headerObserver = new ResizeObserver(updateHeaderHeight);
    if (header) headerObserver.observe(header);
    window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
    window.addEventListener("resize", scheduleNavigationUpdate, { passive: true });

    // Content is visible by default. The observer only adds an entrance animation
    // as each section arrives, so JavaScript failure never hides the page.
    const revealTargets = sections
      .filter((section) => section.id !== "home" && section.tagName !== "FOOTER")
      .map((section) => section.firstElementChild)
      .filter((target): target is HTMLElement => target instanceof HTMLElement);
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!motionPreference.matches) {
            (entry.target as HTMLElement).dataset.sectionReveal = "visible";
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -32px 0px" },
    );
    revealTargets.forEach((target) => revealObserver.observe(target));

    const appointment = document.getElementById("appointment");
    const appointmentObserver = new IntersectionObserver(
      ([entry]) => {
        document.body.toggleAttribute("data-appointment-visible", Boolean(entry?.isIntersecting));
        if (entry?.isIntersecting) {
          document.body.dataset.appointmentVisible = "true";
        }
      },
      { rootMargin: "-15% 0px -20% 0px", threshold: 0 },
    );
    if (appointment) appointmentObserver.observe(appointment);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleNavigationUpdate);
      window.removeEventListener("resize", scheduleNavigationUpdate);
      headerObserver.disconnect();
      revealObserver.disconnect();
      appointmentObserver.disconnect();
      revealTargets.forEach((target) => delete target.dataset.sectionReveal);
      document.body.removeAttribute("data-appointment-visible");
    };
  }, [pathname]);

  return null;
}
