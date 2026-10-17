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
        poster="/videos/hero-poster.jpg"
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
        src="/videos/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden size-full object-cover motion-reduce:block"
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

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:pl-[92px] lg:pr-[240px]">
        <div className="flex w-full max-w-[1108px] translate-y-[44px] flex-col gap-8 lg:translate-y-[80.5px]">
          {/* node 48:4107 */}
          <h1 className="max-w-[800px] text-balance font-display text-[26px] font-medium leading-[1.25] tracking-[-0.03em] text-white sm:text-[34px] lg:text-[44px]">
            You&rsquo;ve come this far to not come just this far.
            <br />
            Make the <span className="text-flame">Lastmile</span> count.
          </h1>

          {/* node 48:4108 */}
          <div className="flex w-full max-w-[800px] flex-col font-montserrat text-[16px] leading-normal text-white lg:text-[18px]">
            <p>
              uGSOT Lastmile is a 6-month rapid-learning offline course aimed to make you
              placement ready. It is open for students in year 3rd and 4th.
            </p>
          </div>

          {/* node 48:4121 */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#apply"
              className="group flex h-12 items-center justify-center gap-2 rounded bg-flame px-5 transition-opacity hover:opacity-90"
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

            <a
              href="#brochure"
              className="flex h-12 items-center justify-center gap-2 rounded border border-white/20 px-[21px] py-px transition-colors hover:border-white/50 hover:bg-white/5"
            >
              <img src="/icons/download-round.svg" alt="" width="24" height="24" />
              <span className="whitespace-nowrap text-center font-montserrat text-[16px] font-medium leading-normal text-white">
                Download Brochure
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
