"use client";

import { useState } from "react";

/**
 * The film. Nothing else — the "6-months Internshala Pro Free" and "Experienced
 * Tech and Academic Minds" claims that used to sit beside it now live in the
 * Pricing section, so keeping them here duplicated them on the page.
 *
 * The thumbnail is a facade: the YouTube iframe is only mounted once the play
 * button is pressed, so the embed costs nothing until someone wants it.
 *
 * `relative z-10` is required — the Hero parallaxes down over whatever follows
 * it, and any section without it gets covered.
 */
const VIDEO_ID = "Zmz5gE9nJqY";
const START_SECONDS = 593;

export default function Outcomes() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="outcomes" className="relative z-10 bg-mist px-6 py-10 lg:px-20 lg:py-20">
      <div className="group relative mx-auto aspect-[16/9] w-full max-w-[1280px] overflow-hidden rounded-[20px] bg-ink">
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
            decoding="async"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/15"
            />
            <span className="absolute left-1/2 top-1/2 flex size-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/15 transition-transform duration-300 group-hover:scale-110 sm:size-[68px]">
              <svg viewBox="0 0 20 22" fill="none" aria-hidden="true" className="w-[14px] sm:w-[19px]">
                <path d="M19 11L0.999999 21.3923L1 0.607696L19 11Z" fill="white" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
