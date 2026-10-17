/**
 * Pricing — Figma node 106:10350 (revised layout).
 *
 * Left: the oversized "6-months Internshala Pro Free" headline, its supporting
 * line, and the Apply Now button. A vertical rule. Right: the two short claims —
 * "Experienced Tech and Academic Minds" and "₹50,000 with No Cost EMI" —
 * separated by a horizontal rule.
 *
 * ₹50,000 is the total programme fee, offered on No Cost EMI. The matching FAQ
 * answer has to agree with this — if the price or the EMI offer changes, both
 * have to move together.
 *
 * The Internshala lockup reuses /images/internshala.webp with the design's own
 * crop window (the node scales a 325x183 image inside a 259x79 box, which is
 * the same 125.55% / 232.12% / -12.8% / -69.52% window used elsewhere).
 *
 * `relative z-10` is required — the Hero parallaxes down over whatever follows
 * it, and any section without it gets covered.
 */
const INTERNSHALA_CROP = {
  w: "125.55%",
  h: "232.12%",
  left: "-12.8%",
  top: "-69.52%",
};

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Programme fee"
      className="relative z-10 bg-mist px-6 py-10 lg:px-20 lg:py-20"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-[105px]">
        {/* headline + CTA — left */}
        <div className="flex w-full flex-col gap-6 lg:w-[599px] lg:shrink-0 lg:gap-7">
          <div className="flex flex-col gap-3 lg:gap-4">
            {/* the node's headline row is 659px inside a 599px column — it overflows
                the frame by design, so it stays on one line from lg up */}
            <div className="flex flex-wrap items-end gap-x-[11.88px] gap-y-1 lg:flex-nowrap">
              <p className="shrink-0 whitespace-nowrap font-display text-[28px] font-medium leading-none text-ink-900 sm:text-[36px] lg:text-[47.52px]">
                6-months
              </p>
              <span
                className="relative block h-[47.2px] w-[155px] shrink-0 sm:h-[60.9px] sm:w-[200px] lg:h-[78.888px] lg:w-[259.042px]"
                role="img"
                aria-label="Internshala"
              >
                <span className="pointer-events-none absolute inset-0 block overflow-hidden">
                  <img
                    src="/images/internshala.webp"
                    alt=""
                    className="absolute max-w-none"
                    style={{
                      width: INTERNSHALA_CROP.w,
                      height: INTERNSHALA_CROP.h,
                      left: INTERNSHALA_CROP.left,
                      top: INTERNSHALA_CROP.top,
                    }}
                    loading="lazy"
                  />
                </span>
              </span>
              <p className="shrink-0 whitespace-nowrap font-display text-[28px] font-medium leading-none text-ink-900 sm:text-[36px] lg:text-[47.52px]">
                Pro Free
              </p>
            </div>

            <p className="font-display text-[16px] leading-[27px] text-[#1e2022] lg:text-[18px]">
              Thousands of job and internship opportunities at your fingertips
            </p>
          </div>

          <a
            href="#apply"
            className="group flex h-12 w-fit items-center justify-center gap-2 rounded bg-flame px-5 transition-opacity hover:opacity-90"
          >
            <span className="font-montserrat text-[15.6px] font-medium leading-6 tracking-[-0.2803px] text-white">
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
        </div>

        {/* vertical rule — only once the columns sit side by side */}
        <div
          aria-hidden="true"
          className="hidden shrink-0 bg-ink-900/15 lg:block lg:w-px lg:self-stretch"
        />

        {/* claims — right */}
        <div className="flex w-full flex-col gap-4 lg:w-[513px] lg:shrink-0">
          <div className="flex flex-col gap-2">
            <p className="font-display text-[20px] font-medium tracking-[-0.2808px] text-ink-900 sm:text-[27px]">
              Experienced <span className="text-flame">Tech and Academic</span> Minds
            </p>
            <p className="font-display text-[15px] leading-[1.45] text-[#1e2022] sm:text-[18px]">
              Industry experts and innovators who turn real-world experience into transformative
              learning
            </p>
          </div>

          <div aria-hidden="true" className="h-px w-full bg-ink-900/15" />

          <div className="flex flex-col gap-2">
            <p className="font-display text-[20px] font-medium tracking-[-0.2808px] text-ink-900 sm:text-[27px]">
              ₹50,000 with <span className="text-flame">No Cost EMI</span>
            </p>
            <p className="font-display text-[15px] leading-[1.45] text-[#1e2022] sm:text-[18px]">
              Flexible payment options to help you get started right away.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
