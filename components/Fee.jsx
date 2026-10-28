"use client";

import { useApply } from "@/components/ApplyDialog";

/**
 * The programme fee.
 *
 * ₹50,000 is the total fee for the whole six months, offered on No Cost EMI —
 * not a yearly charge. The matching FAQ answer has to agree with this; if the
 * price or the EMI offer changes, both have to move together.
 *
 * Deliberately plain: no card, no border, no box. The figure is the only thing
 * here, so it sits centred on the section background with the line and the
 * button beneath it — a card around three short lines left a lot of empty
 * white doing nothing.
 *
 * This section owns `#pricing` and the nav's "Pricing" link, since it is the
 * only place on the page that states a price. The USP grid above it answers to
 * `#walk-away`.
 *
 * `relative z-10` is required — the Hero parallaxes down over whatever follows
 * it, and any section without it gets covered.
 */
export default function Fee() {
  const { open } = useApply();

  return (
    <section
      id="pricing"
      aria-labelledby="fee-heading"
      // the negative top margin eats part of the previous section's bottom
      // padding, and the next section's own top padding carries the gap below,
      // so this band is not fenced in by three stacked paddings
      className="relative z-10 -mt-4 bg-mist px-6 pb-0 pt-0 lg:-mt-10 lg:px-20"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 border-t border-ink-900/10 pt-10 text-center lg:pt-12">
        <h2
          id="fee-heading"
          className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:text-[48px] lg:leading-[52px]"
        >
          ₹50,000 with <span className="text-flame">No Cost EMI</span>
        </h2>

        <p className="max-w-[520px] font-display text-[15px] leading-[1.55] text-ink-900/55 lg:text-[18px]">
          Flexible payment options to help you get started right away.
        </p>

        <button
          type="button"
          onClick={() => open("apply")}
          className="group mt-2 flex h-11 items-center justify-center gap-2 rounded bg-flame px-5 transition-opacity hover:opacity-90"
        >
          <span className="whitespace-nowrap font-display text-[14.5px] font-medium leading-5 text-white">
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
      </div>
    </section>
  );
}
