"use client";

import { useState } from "react";

/**
 * Outcomes feature card — ticker band on top, copy left, video right.
 *
 * NOTE ON NUMBERS: every figure below is taken from sot.upgrad.com/catalyst.
 * The site states plainly that Lastmile is NOT a placement programme and does
 * not promise a job, so this is framed around what the programme actually
 * guarantees. Do not swap these for placement/CTC figures unless you have real,
 * defensible ones — it would contradict the FAQ further down this same page.
 */
const VIDEO_ID = "Zmz5gE9nJqY";
const START_SECONDS = 593;

/**
 * Each logo carries the frame + crop Figma trims it to, so they all render at
 * one optical size. `w`/`h` are the Figma frame; they're scaled to FRAME_H
 * here, and `crop` is the image window inside that frame (percentages, so it
 * survives the scaling).
 */
const FRAME_H = 24;

const TICKER_LOGOS = [
  { src: "/logos/flipkart.webp", name: "Flipkart", w: 118.009, h: 35.702, crop: { w: "100.5%", h: "187.04%", left: "-0.31%", top: "-43.69%" } },
  { src: "/logos/goldman-sachs.webp", name: "Goldman Sachs", w: 77.272, h: 35.705, crop: { w: "103.45%", h: "125.93%", left: "-1.72%", top: "-12.59%" } },
  { src: "/logos/google.webp", name: "Google", w: 98.326, h: 35.705, crop: { w: "104.75%", h: "120.19%", left: "-2.79%", top: "-10.77%" } },
  { src: "/logos/accenture.webp", name: "Accenture", w: 126.067, h: 35.705, crop: { w: "100.05%", h: "198.71%", left: "-0.03%", top: "-48.76%" } },
  { src: "/logos/adobe.webp", name: "Adobe", w: 119.356, h: 35.705, crop: { w: "141.45%", h: "315%", left: "-20.3%", top: "-107.5%" } },
  { src: "/logos/amazon.webp", name: "Amazon", w: 111.623, h: 35.705, crop: { w: "128.11%", h: "176.77%", left: "-14.22%", top: "-48.99%" } },
  { src: "/logos/cisco.webp", name: "Cisco", w: 62.686, h: 35.705, crop: null },
  { src: "/logos/dell.webp", name: "Dell", w: 89.782, h: 35.705, crop: { w: "122.78%", h: "154.37%", left: "-11.2%", top: "-29.13%" } },
  { src: "/logos/microsoft.webp", name: "Microsoft", w: 104, h: 25, crop: { w: "123.08%", h: "188.13%", left: "-11.54%", top: "-45.81%" } },
  { src: "/logos/paypal.webp", name: "PayPal", w: 81.295, h: 22.5, crop: { w: "123.56%", h: "297.62%", left: "-12.03%", top: "-100.6%" } },
  { src: "/logos/oracle.webp", name: "Oracle", w: 131.719, h: 22.5, crop: { w: "112.1%", h: "366.67%", left: "-6.76%", top: "-129.17%" } },
  { src: "/logos/walmart.webp", name: "Walmart", w: 86.834, h: 22.5, crop: { w: "106.87%", h: "232.01%", left: "-3.42%", top: "-66.17%" } },
];

const STATS = [
  { value: "Top 20%", label: "get guaranteed paid internships" },
  { value: "350+", label: "live instructor-led classes" },
  { value: "10,000+", label: "opportunities to apply to" },
];

function TickerGroup({ ariaHidden }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={ariaHidden || undefined}
    >
      {TICKER_LOGOS.map((logo) => {
        const width = (logo.w * FRAME_H) / logo.h;
        return (
          <span
            key={logo.name}
            className="relative block shrink-0 brightness-0 invert"
            style={{ width: `${width}px`, height: `${FRAME_H}px` }}
          >
            {logo.crop ? (
              <span className="absolute inset-0 block overflow-hidden">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="absolute max-w-none"
                  style={{ width: logo.crop.w, height: logo.crop.h, left: logo.crop.left, top: logo.crop.top }}
                  loading="lazy"
                />
              </span>
            ) : (
              <img
                src={logo.src}
                alt={logo.name}
                className="absolute inset-0 size-full max-w-none object-contain"
                loading="lazy"
              />
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function Outcomes() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="outcomes" className="relative z-10 bg-mist px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[20px] border border-ink-900/8 bg-white">
        {/* moving logo band */}
        <div className="relative overflow-hidden bg-flame py-4">
          <div className="marquee-track flex w-max animate-marquee motion-reduce:animate-none">
            <TickerGroup />
            <TickerGroup ariaHidden />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-flame to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-flame to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-12">
          {/* copy — left */}
          <div className="flex flex-col gap-5">
            <p className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900">
              Built-in <span className="text-flame">programme outcomes</span>
            </p>

            <h2 className="font-display text-[44px] font-medium leading-[1.05] tracking-[-0.03em] text-flame sm:text-[56px] lg:text-[64px]">
              ₹1 Crore
              <span className="text-[24px] sm:text-[28px] lg:text-[32px]"> /prize pool</span>
            </h2>

            <p className="max-w-[520px] font-display text-[15px] leading-[1.6] text-ink-900/60 lg:text-base">
              Across hackathons held every 6 months · over the full two years of the programme
            </p>

            <ul className="mt-2 grid grid-cols-1 overflow-hidden rounded-[14px] border border-ink-900/10 sm:grid-cols-3">
              {STATS.map((stat, i) => (
                <li
                  key={stat.label}
                  className={`px-5 py-6 ${
                    i > 0 ? "border-t border-ink-900/10 sm:border-l sm:border-t-0" : ""
                  }`}
                >
                  <p className="font-display text-[26px] font-medium leading-none tracking-[-0.02em] text-flame lg:text-[30px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-display text-[13px] leading-snug text-ink-900/60">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* video — right */}
          <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-[14px] bg-ink">
            {playing ? (
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&start=${START_SECONDS}&rel=0`}
                title="uGSOT Lastmile"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the uGSOT Lastmile film"
                className="absolute inset-0 size-full cursor-pointer"
              >
                <img
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/15"
                />
                <span className="absolute left-1/2 top-1/2 flex size-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/15 transition-transform duration-300 group-hover:scale-110">
                  <svg width="19" height="21" viewBox="0 0 20 22" fill="none" aria-hidden="true">
                    <path d="M19 11L0.999999 21.3923L1 0.607696L19 11Z" fill="white" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
