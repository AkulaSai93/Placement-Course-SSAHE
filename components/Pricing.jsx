/**
 * Pricing — Figma node 106:10350.
 *
 * Fee block on the left ("₹50,000 with" / "No Cost EMI" with the Apply Now pill
 * sitting inline between the two lines), a vertical rule, then the two claim
 * blocks on the right separated by a horizontal rule.
 *
 * ₹50,000 is the total programme fee, offered on No Cost EMI. The matching FAQ
 * answer has to agree with this — if the price or the EMI offer changes, both
 * have to move together.
 *
 * The Internshala lockup reuses /images/internshala.webp with the design's own
 * crop window, the same values the Legacy tile and Outcomes card use.
 */
const INTERNSHALA_CROP = {
  w: "125.55%",
  h: "232.12%",
  left: "-12.8%",
  top: "-69.52%",
};

export default function Pricing() {
  return (
    <section id="pricing" aria-label="Programme fee" className="relative z-10 bg-mist px-6 py-10 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-[88px]">
        {/* fee — left */}
        <div className="flex w-full flex-col gap-5 lg:w-[589px] lg:shrink-0">
          <div className="flex flex-col gap-[11px]">
            <p className="font-display text-[34px] font-bold leading-normal text-ink-900 sm:text-[48px] lg:text-[62px]">
              ₹50,000 with
            </p>

            {/* the CTA sits inline with the second heading line */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:flex-nowrap lg:gap-x-24">
              <a
                href="#apply"
                className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded bg-flame px-5 transition-opacity hover:opacity-90"
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
              <p className="whitespace-nowrap font-display text-[34px] font-bold leading-normal text-ink-900 sm:text-[48px] lg:text-[62px]">
                No Cost EMI
              </p>
            </div>
          </div>

          <p className="font-display text-[16px] leading-[1.75] text-ink-900/60 lg:text-[18px] lg:leading-[31.5px]">
            Flexible payment options to help you get started right away.
          </p>
        </div>

        {/* vertical rule — horizontal once the columns stack */}
        <div
          aria-hidden="true"
          className="hidden shrink-0 bg-ink-900/15 lg:block lg:h-[241.37px] lg:w-px"
        />

        {/* claims — right */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-end gap-x-[5px] gap-y-1">
              <p className="font-display text-[20px] font-medium tracking-[-0.2808px] text-ink-900 sm:text-[27px]">
                6-months
              </p>
              <span
                className="relative block h-[45.7px] w-[150px] shrink-0 sm:h-[60.374px] sm:w-[198.233px]"
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
              <p className="font-display text-[20px] font-medium tracking-[-0.2808px] text-ink-900 sm:text-[27px]">
                Pro Free
              </p>
            </div>
            <p className="font-display text-[15px] leading-normal text-[#1e2022] sm:text-[18px]">
              Thousands of job and internship opportunities at your fingertips
            </p>
          </div>

          <div aria-hidden="true" className="h-px w-full bg-ink-900/15" />

          <div className="flex flex-col gap-[15px]">
            <p className="font-display text-[20px] font-medium tracking-[-0.2808px] text-ink-900 sm:text-[27px]">
              Experienced <span className="text-flame">Tech and Academic</span> Minds
            </p>
            <p className="max-w-[513px] font-display text-[15px] leading-normal text-[#1e2022] sm:text-[18px]">
              Industry experts and innovators who turn real-world experience into transformative
              learning
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
