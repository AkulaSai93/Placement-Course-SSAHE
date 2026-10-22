"use client";

/**
 * "upGrad learners work at" — a light band of employer logos that
 * scrolls on its own, sitting directly under the hero.
 *
 * The logos previously ran as a red band inside the Outcomes card, forced white
 * with `brightness-0 invert`. Here they keep their own brand colours, so the
 * per-logo frame + crop values are carried over to keep them optically level.
 *
 * `w`/`h` are the Figma frame, scaled to FRAME_H; `crop` is the image window
 * inside that frame, in percentages so it survives the scaling.
 */
const FRAME_H = 30;

const LOGOS = [
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

function LogoGroup({ ariaHidden }) {
  return (
    <div
      className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
      aria-hidden={ariaHidden || undefined}
    >
      {LOGOS.map((logo) => {
        const width = (logo.w * FRAME_H) / logo.h;
        return (
          <span
            key={logo.name}
            className="relative block shrink-0"
            style={{ width: `${width}px`, height: `${FRAME_H}px` }}
          >
            {logo.crop ? (
              <span className="absolute inset-0 block overflow-hidden">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="absolute max-w-none"
                  style={{
                    width: logo.crop.w,
                    height: logo.crop.h,
                    left: logo.crop.left,
                    top: logo.crop.top,
                  }}
                  loading="lazy"
                decoding="async"
                />
              </span>
            ) : (
              <img
                src={logo.src}
                alt={logo.name}
                className="absolute inset-0 size-full object-contain"
                loading="lazy"
              decoding="async"
              />
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function HiringCompanies() {
  return (
    <section
      id="hiring-companies"
      aria-labelledby="hiring-companies-heading"
      className="relative z-10 overflow-hidden bg-mist py-10 lg:py-16"
    >
      {/* soft wash behind the heading, as in the reference */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(120,160,255,0.16),rgba(120,160,255,0))]"
      />

      <h2
        id="hiring-companies-heading"
        className="relative text-center font-display text-[22px] font-semibold tracking-[-0.01em] text-ink-900 sm:text-[28px] lg:text-[32px]"
      >
        <span className="text-flame">upGrad</span> learners work at
      </h2>

      <div className="relative mt-8 overflow-hidden lg:mt-10">
        <div className="marquee-track flex w-max animate-marquee-slow motion-reduce:animate-none">
          <LogoGroup />
          <LogoGroup ariaHidden />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-mist to-transparent sm:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-mist to-transparent sm:w-32"
        />
      </div>
    </section>
  );
}
