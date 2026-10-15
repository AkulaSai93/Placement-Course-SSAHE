"use client";

import { useState } from "react";

/**
 * Outcomes feature card — copy left, video right.
 *
 * NOTE ON NUMBERS: every figure below is taken from sot.upgrad.com/catalyst.
 * The site states plainly that Lastmile is NOT a placement programme and does
 * not promise a job, so this is framed around what the programme actually
 * guarantees. Do not swap these for placement/CTC figures unless you have real,
 * defensible ones — it would contradict the FAQ further down this same page.
 */
const VIDEO_ID = "Zmz5gE9nJqY";
const START_SECONDS = 593;

const STATS = [
  { value: "Top 20%", label: "get guaranteed paid internships" },
  { value: "350+", label: "live instructor-led classes" },
  { value: "10,000+", label: "opportunities to apply to" },
];

export default function Outcomes() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="outcomes" className="relative z-10 bg-mist px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-[1280px] rounded-[20px] border border-ink-900/8 bg-white">
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
