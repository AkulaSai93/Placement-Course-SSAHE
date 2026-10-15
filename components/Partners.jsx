"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Our Partners — ported from the "Redesign Our Partners Section" reference
 * build (Figma Make export), which supersedes the static Figma node 74:7425.
 *
 * A three-card carousel: the active card sits centre at full scale, its
 * neighbours flank it at 0.9 scale, and the panel cross-fades to the active
 * partner's brand theme. It advances itself every 4.5s and pauses on hover,
 * focus or touch; arrow keys, swipes, the pagination bars and clicking a card
 * all select directly.
 *
 * Styles live in app/globals.css under "Our Partners carousel" — the transforms
 * and theme gradients are the reference's values verbatim.
 *
 * All artwork — covers and logos — comes from the Figma file rather than the
 * reference's Unsplash hotlinks and hand-drawn SVG wordmarks. Covers are
 * resized to ~2x their render size and saved as JPEG (the originals were
 * ~4x oversized PNGs, 7.4MB in total, which risked decode hitches).
 */
const PARTNERS = [
  {
    name: "MongoDB",
    role: "Data platform partner",
    description: "Powering data-driven innovation and modern application development.",
    image: "/partners/mongodb-cover.jpg",
    imageAlt: "MongoDB Atlas database deployments dashboard",
    logo: "/partners/mongodb-logo.png",
    theme: "mongodb",
  },
  {
    name: "Navana.ai",
    role: "AI learning partner",
    description: "Exploring AI-powered learning and intelligent technology solutions.",
    image: "/partners/navana-cover.jpg",
    imageAlt: "Multilingual voice assistant interface",
    logo: "/partners/navana-logo.png",
    theme: "navana",
  },
  {
    name: "NVIDIA",
    role: "AI compute partner",
    description: "Advancing AI, accelerated computing, and next-generation technologies.",
    image: "/partners/nvidia-cover.jpg",
    imageAlt: "Green illuminated data centre aisle",
    logo: "/partners/nvidia-logo.png",
    // the source is a 512x512 square whose lockup occupies a ~90px band; these
    // are Figma's crop values, which scale it up and offset it to fill the box
    logoCrop: { w: "107.79%", h: "533.33%", left: "-3.58%", top: "-216.67%" },
    logoAspect: 202.795 / 40.986,
    theme: "nvidia",
  },
];

function PartnerLogo({ partner }) {
  if (partner.logoCrop) {
    const c = partner.logoCrop;
    return (
      <div className={`partner-logo partner-logo--${partner.theme}`}>
        <span
          className="partner-logo__crop"
          style={{ aspectRatio: String(partner.logoAspect) }}
        >
          <img
            src={partner.logo}
            alt={partner.name}
            style={{ width: c.w, height: c.h, left: c.left, top: c.top }}
            loading="lazy"
            decoding="async"
          />
        </span>
      </div>
    );
  }

  return (
    <div className={`partner-logo partner-logo--${partner.theme}`}>
      <img src={partner.logo} alt={partner.name} loading="lazy" decoding="async" />
    </div>
  );
}

function PartnerCard({ partner, position, isActive, onSelect }) {
  return (
    <button
      aria-label={`${isActive ? "Current partner" : "View partner"}: ${partner.name}`}
      aria-pressed={isActive}
      className={`partner-card ${isActive ? "is-active" : ""}`}
      onClick={onSelect}
      style={{ "--card-position": position }}
      type="button"
    >
      <span className="partner-card__image">
        <img alt={partner.imageAlt} draggable="false" src={partner.image} loading="lazy" />
        <span className={`partner-card__tint partner-card__tint--${partner.theme}`} />
      </span>
      <span className="partner-card__content">
        <PartnerLogo partner={partner} />
        <span className="partner-card__role">{partner.role}</span>
        <span className="partner-card__description">{partner.description}</span>
      </span>
    </button>
  );
}

export default function Partners() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef(null);

  const goTo = useCallback((index) => {
    setActiveIndex((index + PARTNERS.length) % PARTNERS.length);
  }, []);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % PARTNERS.length);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused]);

  // neighbours wrap, so the strip reads as a loop rather than a line
  const getPosition = (index) => {
    const difference = index - activeIndex;
    if (difference > 1) return difference - PARTNERS.length;
    if (difference < -1) return difference + PARTNERS.length;
    return difference;
  };

  const handleTouchEnd = (clientX) => {
    if (touchStart.current === null) return;
    const distance = clientX - touchStart.current;
    if (Math.abs(distance) > 45) goTo(activeIndex + (distance < 0 ? 1 : -1));
    touchStart.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="flex items-center overflow-hidden bg-mist px-5 py-10 sm:px-8 lg:py-[72px]"
    >
      <div
        className={`partners-panel theme-active-${PARTNERS[activeIndex].theme}`}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
        }}
        onFocusCapture={() => setIsPaused(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(activeIndex + 1);
          }
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchCancel={() => {
          touchStart.current = null;
          setIsPaused(false);
        }}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
          setIsPaused(true);
        }}
      >
        {PARTNERS.map((partner, index) => (
          <div
            aria-hidden="true"
            className={`partners-panel__background theme-${partner.theme} ${
              activeIndex === index ? "is-visible" : ""
            }`}
            key={partner.name}
          />
        ))}

        <div className="partners-panel__lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <header className="partners-heading">
          <h2 id="partners-heading">Our Partners</h2>
          <p>Building what&rsquo;s next, together</p>
        </header>

        <div
          aria-label="Technology partners"
          aria-live="polite"
          className="partners-carousel"
          role="region"
        >
          {PARTNERS.map((partner, index) => (
            <PartnerCard
              isActive={activeIndex === index}
              key={partner.name}
              onSelect={() => goTo(index)}
              partner={partner}
              position={getPosition(index)}
            />
          ))}
        </div>

        <div className="partners-controls">
          <div className="partners-pagination" role="tablist" aria-label="Choose a partner">
            {PARTNERS.map((partner, index) => (
              <button
                aria-label={`Show ${partner.name}`}
                aria-selected={activeIndex === index}
                className={activeIndex === index ? "is-active" : ""}
                key={partner.name}
                onClick={() => goTo(index)}
                role="tab"
                type="button"
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
