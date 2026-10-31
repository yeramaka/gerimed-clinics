import Image from "next/image";
import Link from "next/link";

import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.content}>
        <p className={styles.eyebrow}>General · Geriatrics · Lifestyle</p>
        <h1 id="hero-heading" className={styles.heading}>
          Complete adult healthcare with a focus on healthy ageing.
        </h1>
        <p className={styles.description}>
          Personalised medical care across general medicine, geriatrics and
          lifestyle management.
        </p>
        <div className={styles.actions}>
          <Link href="#appointment" className={styles.primaryAction}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2" />
            </svg>
            Book Appointment
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="#specialities" className={styles.secondaryAction}>
            View Services <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className={styles.supportingLine}>
          Thoughtful care. Clear guidance. Every stage of adulthood.
        </p>
      </div>
      <div className={styles.artwork}>
        <Image
          src="/images/doctor-standing-hero.webp"
          alt="Gerimed Clinics doctor standing with folded arms in a sunlit clinic"
          fill
          preload
          sizes="100vw"
          className={styles.photograph}
        />
        <div className={styles.wallCopy}>
          <p className={styles.quote}>
            <span>More</span><span>Years</span><span>Brighter</span><span>Lives</span>
          </p>
          <span className={styles.goldRule} aria-hidden="true" />
          <p className={styles.handwritten}>Care<br />for what<br />matters</p>
        </div>
      </div>
    </section>
  );
}
