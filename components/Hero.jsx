"use client";

import { useEffect, useRef } from "react";

import { useApply } from "@/components/ApplyDialog";

/** Polaris lags its hero *background* at 30% of scroll — measured as
 *  translateY = scrollY * 0.3 — while the copy and the buttons scroll with the
 *  page at full speed.
 *
 *  This used to move the whole <section>, which meant the headline, the fee and
 *  the two CTAs drifted down into the section that slides over the hero, so the
 *  buttons were clipped mid-scroll. Only the media layer moves now, so nothing
 *  in front of it can be cut. */
const PARALLAX = 0.3;

/**
 * Hero — Figma node 48:4084. Content is exactly what the node contains.
 *
 * NOTE ON THE BACKGROUND: the node's bg image is Polaris School of Technology's
 * own building, with their signage on the facade. Using it would put a
 * competitor's campus (and trademark) on this page, so the SSAHE campus photo
 * supplied earlier is used instead. Everything else follows the node.
 */
export default function Hero() {
  const bgRef = useRef(null);
  const { open } = useApply();

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // the layer is 130% tall and starts 30% above the section, so it can
      // travel exactly that 30% before a gap would open at the top
      const limit = (el.parentElement?.offsetHeight || 0) * PARALLAX;
      const offset = Math.min(window.scrollY * PARALLAX, limit);
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // One screen tall on every device: 100svh is a *minimum*, not a fixed
  // height, so the section fills the viewport but still grows when the content
  // needs more room — which is what stops the brochure button being clipped on
  // a short phone (verification N1). The old `lg:h-[900px]` ignored the
  // viewport entirely and ran past the bottom of any laptop shorter than that.
  //
  // 104px of top padding clears the header; 88px at the bottom clears the
  // fixed price bar on phones, and 48px does the same job on desktop. The copy
  // is bottom-aligned at every width, as Polaris keeps it: it sits low in the
  // frame, leaving the upper two thirds of the film clear, and it stays on
  // screen for the hero's whole height rather than leaving after half a
  // swipe.
  return (
    <section
      id="home"
      className="relative z-0 flex min-h-[100svh] items-end overflow-hidden bg-white pb-[88px] pt-[104px] lg:pb-12"
    >
      {/* everything that parallaxes lives in here; the content below does not */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30%] left-0 h-[130%] w-full will-change-transform"
      >
      {/* Background film. Muted + playsInline so iOS plays it inline rather than
          going fullscreen; the poster covers the gap before it buffers, and
          prefers-reduced-motion users get the poster alone. */}
      <video
        src="/videos/hero.mp4"
        poster="/videos/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 size-full object-cover motion-reduce:hidden"
      />
      {/* shown instead of the film when reduced motion is requested */}
      <img
        src="/videos/hero-poster.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden size-full object-cover motion-reduce:block"
      decoding="async"
      fetchPriority="high"
      />

      {/* UI guide P2.1 — the video runs bright on some frames, so two layers
          sit between it and the text: a vertical wash for the phone layout and
          a left-to-right one from lg up, where the copy is on the left. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.56) 45%, rgba(0,0,0,0.80) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.58) 50%, rgba(0,0,0,0.24) 100%)",
        }}
      />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-20">
        <div className="flex w-full flex-col gap-5 lg:gap-6">
          <h1 className="max-w-[820px] text-balance font-display text-[30px] font-medium leading-[1.2] tracking-[-0.03em] text-white sm:text-[40px] lg:max-w-none lg:text-[clamp(40px,4vw,56px)]">
            {/* kept on one line once the column is wide enough for it */}
            <span className="lg:whitespace-nowrap">
              You&rsquo;ve come this far to not come just this far.
            </span>
            <br />
            Make the <span className="text-flame">Lastmile</span> count.
          </h1>

          <p className="max-w-[560px] font-display text-[17px] leading-[1.6] text-white/85 lg:max-w-[760px] lg:text-[20px]">
            uGSOT Lastmile is a 6-month rapid-learning offline course aimed to make you placement
            ready. It is open for students in year 3rd and 4th.
          </p>

          {/* fee, inline with the copy — the amount carries the accent */}
          <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="font-display text-[30px] font-bold leading-none tracking-[-0.02em] text-flame lg:text-[36px]">
              ₹50,000
            </span>
            <span className="font-display text-[16px] text-white/80 lg:text-[18px]">
              with <span className="font-medium text-white">No Cost EMI</span>
            </span>
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => open("apply")}
              className="group flex h-[44px] items-center justify-center gap-2 rounded bg-flame px-5 transition-opacity hover:opacity-90"
            >
              <span className="font-display text-[15px] font-medium leading-5 text-white">
                Apply Now
              </span>
              <span className="flex size-6 items-center justify-center">
                <img
                  src="/icons/chevron-right-white.svg"
                  alt=""
                  width="8"
                  height="14"
                  className="transition-transform duration-300 group-hover:translate-x-[2px]"
                decoding="async"
                loading="lazy"
                />
              </span>
            </button>

            <button
              type="button"
              onClick={() => open("brochure")}
              className="flex h-[44px] items-center justify-center gap-2 rounded border border-white/25 px-5 transition-colors hover:border-white/50 hover:bg-white/5"
            >
              <img src="/icons/download-round.svg" alt="" width="24" height="24"
 decoding="async"
 loading="lazy"
 />
              <span className="whitespace-nowrap font-display text-[15px] font-medium text-white">
                Download Brochure
              </span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
