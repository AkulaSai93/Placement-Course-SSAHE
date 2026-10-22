"use client";

import { useEffect, useRef } from "react";

/** Polaris lags its hero at 30% of scroll while the next section slides over
 *  it at full speed — measured as translateY = scrollY * 0.3. */
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
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const limit = el.offsetHeight;
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

  return (
    <section
      id="home"
      ref={ref}
      className="relative z-0 flex h-[76svh] min-h-[520px] items-center overflow-hidden bg-white will-change-transform lg:h-[900px] lg:min-h-0"
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

      {/* node 48:4087 — transparent to 80% black by 60.096%, then deepening to
          black at the foot, matching how the node renders */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.62) 62%, rgba(0,0,0,0.74) 82%, rgba(0,0,0,0.84) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-[92px]">
        <div className="flex w-full translate-y-[44px] flex-col gap-5 lg:translate-y-[60px] lg:gap-6">
          <h1 className="max-w-[820px] text-balance font-display text-[30px] font-medium leading-[1.2] tracking-[-0.03em] text-white sm:text-[40px] lg:max-w-none lg:text-[clamp(40px,4vw,56px)]">
            {/* kept on one line once the column is wide enough for it */}
            <span className="lg:whitespace-nowrap">
              You&rsquo;ve come this far to not come just this far.
            </span>
            <br />
            Make the <span className="text-flame">Lastmile</span> count.
          </h1>

          <p className="max-w-[560px] font-montserrat text-[17px] leading-[1.6] text-white/85 lg:max-w-[760px] lg:text-[20px]">
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
            <a
              href="#apply"
              className="group flex h-[44px] items-center justify-center gap-2 rounded bg-flame px-5 transition-opacity hover:opacity-90"
            >
              <span className="font-montserrat text-[15px] font-medium leading-5 text-white">
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
            </a>

            <a
              href="#brochure"
              className="flex h-[44px] items-center justify-center gap-2 rounded border border-white/25 px-5 transition-colors hover:border-white/50 hover:bg-white/5"
            >
              <img src="/icons/download-round.svg" alt="" width="24" height="24"
 decoding="async"
 loading="lazy"
 />
              <span className="whitespace-nowrap font-montserrat text-[15px] font-medium text-white">
                Download Brochure
              </span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
