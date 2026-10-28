"use client";

import { useEffect, useState } from "react";

import { useApply } from "@/components/ApplyDialog";

/** One entry per section that actually exists on the page. */
// Order mirrors the page. Every href must point at a section that is actually
// mounted in app/page.js — "#certificate" was left behind when that section
// came out and scrolled nowhere.
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Pricing", href: "#pricing" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Mentors", href: "#mentors" },
  { label: "FAQs", href: "#faqs" },
];

function Arrow({ className = "" }) {
  return (
    <span className="flex size-6 items-center justify-center">
      <img
        src="/icons/chevron-right-white.svg"
        alt=""
        width="8"
        height="14"
        className={className}
      decoding="async"
      loading="lazy"
      />
    </span>
  );
}

export default function SiteHeader() {
  const { open } = useApply();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // while the panel is open: hold the page still, close on Escape, and close if
  // the viewport grows past the breakpoint where the full nav returns
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (mq.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  // the panel has its own solid backdrop, so the header must look solid too
  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-6 transition-all duration-300 lg:px-20 ${
          solid
            ? "border-b border-white/10 bg-black py-2"
            : "border-b border-transparent bg-transparent py-[14px]"
        }`}
      >
        {/* keeps the links legible over a bright hero image */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-[140px] transition-opacity duration-300 ${
            solid ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div className="relative mx-auto flex w-full max-w-[1336px] items-center justify-between gap-6">
          <a href="#home" className="relative h-[34px] w-[179px] shrink-0 sm:h-[38px] sm:w-[200px]">
            {/* UI guide P2.1 — the logo's red disappears against the video, so
                it is knocked out to white until the bar turns solid */}
            <img
              src="/images/ugsot-lastmile-logo.png"
              alt="upGrad School of Technology — Lastmile"
              className={`absolute inset-0 size-full object-contain object-left transition-[filter] duration-300 ${
                solid ? "" : "brightness-0 invert"
              }`}
            decoding="async"
            fetchPriority="high"
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

          <button
            type="button"
            onClick={() => open("apply")}
            className="group hidden h-10 items-center justify-center gap-2 rounded bg-flame px-4 transition-opacity hover:opacity-90 lg:flex"
          >
            <span className="font-display text-[14.5px] font-medium leading-5 text-white">
              Apply Now
            </span>
            <Arrow className="transition-transform duration-300 group-hover:translate-x-[2px]" />
          </button>

          {/* hamburger — the full nav only exists from lg up */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`relative flex size-10 shrink-0 items-center justify-center rounded transition-colors lg:hidden ${
              menuOpen ? "border border-white/30" : "border border-transparent"
            }`}
          >
            <span className="relative block h-[14px] w-[22px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute left-0 block h-[2px] w-full rounded-full bg-white transition-all duration-300"
                  style={
                    menuOpen
                      ? {
                          top: "6px",
                          transform:
                            i === 0
                              ? "rotate(45deg)"
                              : i === 2
                                ? "rotate(-45deg)"
                                : "scaleX(0)",
                          opacity: i === 1 ? 0 : 1,
                        }
                      : { top: `${i * 6}px` }
                  }
                />
              ))}
            </span>
          </button>
        </div>
      </header>

      {/* mobile nav panel */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 bottom-0 top-[58px] z-40 overflow-y-auto bg-white transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-7 px-6 pt-9" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-[20px] font-medium text-ink-900 transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="px-6 pb-10 pt-9">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              open("apply");
            }}
            className="group flex h-11 w-full items-center justify-center gap-2 rounded bg-flame transition-opacity hover:opacity-90"
          >
            <span className="font-display text-[15px] font-medium leading-5 text-white">
              Apply Now
            </span>
            <Arrow className="transition-transform duration-300 group-hover:translate-x-[2px]" />
          </button>
        </div>
      </div>

      {/* sticky bar — mobile only: supporting copy left, CTA right */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink-900/10 bg-white px-4 py-2.5 shadow-[0_-8px_24px_-12px_rgba(10,10,11,0.18)] transition-opacity duration-200 lg:hidden ${
          menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-[15px] font-medium leading-tight text-ink-900">
              ₹50,000 · No Cost EMI
            </p>
            <p className="truncate font-display text-[12.5px] leading-tight text-ink-900/55">
              6-month offline programme
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              open("apply");
            }}
            className="group flex h-10 shrink-0 items-center justify-center gap-2 rounded bg-flame px-4 transition-opacity hover:opacity-90"
          >
            <span className="whitespace-nowrap font-display text-[14px] font-medium leading-5 text-white">
              Apply Now
            </span>
            <Arrow className="transition-transform duration-300 group-hover:translate-x-[2px]" />
          </button>
        </div>
      </div>

    </>
  );
}
