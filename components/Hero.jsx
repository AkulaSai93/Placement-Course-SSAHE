"use client";

import Image from "next/image";
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
      className="relative z-0 flex h-[720px] items-center overflow-hidden bg-white will-change-transform lg:h-[900px]"
    >
      <Image
        src="/images/campus-hero-2.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover"
      />

      {/* node 48:4087 — transparent to 80% black by 60.096%, then deepening to
          black at the foot, matching how the node renders */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 60.096%, rgba(0,0,0,0.92) 80%, rgba(0,0,0,1) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:pl-[92px] lg:pr-[240px]">
        <div className="flex w-full max-w-[1108px] flex-col gap-8 lg:translate-y-[80.5px]">
          {/* node 48:4107 */}
          <h1 className="font-display text-[34px] font-medium leading-normal tracking-[-0.038em] text-white sm:text-[46px] lg:text-[60px]">
            Your college gives you a degree.
            <br />
            <span className="text-flame">uGSOT Lastmile</span> helps you catalyze it.
          </h1>

          {/* node 48:4108 */}
          <div className="flex w-full flex-col font-montserrat text-[16px] leading-normal text-white lg:text-[18px]">
            <p>
              <span className="italic">Quantum </span>
              An online 2-year technology accelerator you pursue alongside your existing B.Tech /
              B.E. / BCA / B.Sc. program.
            </p>
            <p>We become your parallel technology ecosystem.</p>
          </div>

          {/* node 48:4121 */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#apply"
              className="group flex h-12 items-center justify-center gap-2 rounded-full bg-flame px-5 transition-opacity hover:opacity-90"
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
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-[21px] py-px transition-colors hover:border-white/50 hover:bg-white/5"
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
