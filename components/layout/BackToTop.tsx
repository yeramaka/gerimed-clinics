"use client";

import { useEffect, useRef, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const visibilityRef = useRef(false);

  useEffect(() => {
    let frameId = 0;
    const updateVisibility = () => {
      frameId = 0;
      const nextVisible = window.scrollY > 640;
      if (nextVisible !== visibilityRef.current) {
        visibilityRef.current = nextVisible;
        setIsVisible(nextVisible);
      }
    };
    const scheduleVisibilityUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateVisibility);
    };

    scheduleVisibilityUpdate();
    window.addEventListener("scroll", scheduleVisibilityUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleVisibilityUpdate);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-sage/45 bg-white text-brand-forest shadow-[0_10px_24px_rgba(31,77,58,0.12)] transition-[opacity,transform,background-color,border-color] hover:border-brand-gold hover:bg-brand-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none lg:bottom-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="none"
      >
        <path
          d="m5 12 5-5 5 5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </button>
  );
}
