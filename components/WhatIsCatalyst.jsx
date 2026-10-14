"use client";

import { useState } from "react";

const VIDEO_ID = "Zmz5gE9nJqY";
const START_SECONDS = 593;

export default function WhatIsCatalyst() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="what-is-catalyst" className="relative bg-mist text-ink-900">
      {/* copy block */}
      <div className="mx-auto max-w-shell px-6 pb-14 pt-20 lg:pb-20 lg:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 text-[12px] font-semibold tracking-[0.01em] text-brand">
          <span className="size-1.5 rounded-full bg-brand" />
          Technology accelerator
        </span>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-14">
          <h2 className="max-w-[720px] font-display text-[34px] font-medium leading-[1.12] tracking-[-0.03em] sm:text-[44px] lg:text-[52px] xl:whitespace-nowrap">
            What is <span className="text-brand">uGSOT Catalyst?</span>
          </h2>

          <p className="max-w-[580px] text-[15px] leading-[1.7] text-ink-900/60 lg:pt-3 lg:text-base">
            uGSOT Catalyst is an online{" "}
            <span className="font-semibold text-brand">2-year technology accelerator</span>{" "}
            built to run alongside your college journey — giving you the skills, platforms,
            projects, mentorship and opportunities to become a stronger software engineer.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-6">
          <a
            href="#apply"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-ink-900"
          >
            Apply to uGSOT Catalyst
          </a>
          <a
            href="#curriculum"
            className="group inline-flex items-center gap-2 text-[14px] font-semibold text-ink-900 transition-colors hover:text-brand"
          >
            View more
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-[3px]"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* video */}
      <div className="relative">
        <div className="relative mx-auto max-w-shell px-6 pb-12 lg:pb-16">
          <div className="group relative mx-auto aspect-[16/9] w-full max-w-[880px] overflow-hidden rounded-2xl bg-ink">
            {playing ? (
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&start=${START_SECONDS}&rel=0`}
                title="uGSOT Catalyst"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the uGSOT Catalyst film"
                className="absolute inset-0 size-full cursor-pointer"
              >
                <img
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/15" />
                <span className="absolute left-1/2 top-1/2 flex size-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/15 transition-transform duration-300 group-hover:scale-110">
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
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
