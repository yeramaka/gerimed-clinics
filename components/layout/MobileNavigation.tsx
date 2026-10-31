"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { NavLink } from "@/data/navigation";

type MobileNavigationProps = {
  appointmentHref: string;
  links: NavLink[];
  phoneHref: string;
  phoneNumber: string;
};

export function MobileNavigation({
  appointmentHref,
  links,
  phoneHref,
  phoneNumber,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => buttonRef.current?.focus({ preventScroll: true }));
    }
  }, []);

  const followLink = (href: string) => {
    closeMenu(false);
    const destination = new URL(href, window.location.href);
    if (destination.pathname !== window.location.pathname || !destination.hash) return;

    const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
    requestAnimationFrame(() => {
      const heading = target?.querySelector<HTMLElement>("h1, h2") ?? target;
      if (!heading) return;
      if (!heading.hasAttribute("tabindex")) heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });
    const activeSection = document.querySelector<HTMLElement>(
      '[data-nav-section][aria-current="location"]',
    )?.dataset.navSection;
    panelRef.current?.querySelectorAll<HTMLElement>("[data-nav-section]").forEach((link) => {
      if (activeSection && link.dataset.navSection === activeSection) {
        link.setAttribute("aria-current", "location");
      }
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex="0"]',
      );
      const first = focusable?.[0];
      const last = focusable?.[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleDesktop = () => {
      if (desktop.matches) closeMenu(false);
    };
    desktop.addEventListener("change", handleDesktop);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      desktop.removeEventListener("change", handleDesktop);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("data-mobile-nav-open", "true");
    } else {
      document.body.removeAttribute("data-mobile-nav-open");
    }

    return () => {
      document.body.removeAttribute("data-mobile-nav-open");
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-forest transition-colors hover:bg-brand-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
        aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <span
          aria-hidden="true"
          className="flex h-5 w-5 flex-col justify-center gap-1.5"
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-transform motion-reduce:transition-none ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-opacity motion-reduce:transition-none ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-transform motion-reduce:transition-none ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] cursor-default bg-brand-forest/35 backdrop-blur-[1px]"
            tabIndex={-1}
            aria-label="Close mobile menu"
            onClick={() => closeMenu()}
          />
          <div
            ref={panelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Clinic navigation"
            className="fixed inset-y-0 right-0 z-[70] w-[min(20rem,82vw)] overflow-y-auto border-l border-brand-sage/30 bg-white px-7 py-7 shadow-[-18px_0_46px_rgba(31,77,58,0.20)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-brand-sage/30 pb-6">
              <div>
                <p className="text-2xl font-semibold leading-tight text-brand-forest">
                  GERIMED
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-brand-forest/55">
                  General <span className="text-brand-gold">•</span>{" "}
                  Geriatrics <span className="text-brand-gold">•</span>{" "}
                  Lifestyle
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-sage/45 text-brand-forest transition-colors hover:border-brand-gold hover:bg-brand-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
                aria-label="Close mobile menu"
                onClick={() => closeMenu()}
              >
                <span aria-hidden="true" className="text-2xl leading-none">
                  ×
                </span>
              </button>
            </div>

            <nav className="mt-5" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-nav-section={
                        link.href.includes("#") ? link.href.split("#")[1] : undefined
                      }
                      className={
                        link.href === appointmentHref
                          ? "mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-[1.35rem] bg-brand-forest px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#173b2c] aria-[current=location]:ring-2 aria-[current=location]:ring-brand-gold/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
                          : "block min-h-12 rounded-md px-1 py-3 text-base font-medium text-brand-forest transition-colors hover:text-brand-gold aria-[current=location]:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
                      }
                      onClick={() => followLink(link.href)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={phoneHref}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-[1.35rem] border border-brand-sage/45 px-4 py-3 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-gold hover:bg-brand-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold motion-reduce:transition-none"
                aria-label={`Call GERIMED CLINICS at ${phoneNumber}`}
                onClick={() => closeMenu(false)}
              >
                Call {phoneNumber}
              </a>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
