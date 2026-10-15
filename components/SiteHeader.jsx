"use client";

import { useEffect, useState } from "react";

/** One entry per section that actually exists on the page. */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Certificate", href: "#certificate" },
  { label: "Mentors", href: "#mentors" },
  { label: "FAQs", href: "#faqs" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-6 transition-all duration-300 lg:px-20 ${
        scrolled
          ? "border-b border-white/10 bg-black py-3"
          : "border-b border-transparent bg-transparent py-[22px]"
      }`}
    >
      {/* keeps the links legible over a bright hero image */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[140px] transition-opacity duration-300 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1336px] items-center justify-between gap-6">
        <a href="#home" className="relative h-[26px] w-[205px] shrink-0">
          <img
            src="/images/ugsot-logo.webp"
            alt="upGrad School of Technology"
            className="absolute inset-0 size-full object-contain object-left"
          />
        </a>

        <nav className="hidden items-center gap-[30px] lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap font-display text-[15px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#apply"
          className="group hidden h-12 items-center justify-center gap-2 rounded-full bg-flame px-5 transition-opacity hover:opacity-90 sm:flex"
        >
          <span className="font-montserrat text-[15.6px] font-medium leading-6 text-white">
            Apply Now
          </span>
          <span className="flex size-6 items-center justify-center">
            <img
              src="/icons/chevron-right-white.svg"
              alt=""
              width="8"
              height="14"
              className="transition-transform duration-300 group-hover:translate-x-[2px]"
            />
          </span>
        </a>
      </div>
    </header>
  );
}
