/**
 * Pricing — editorial band: eyebrow + rule, oversized price heading on the
 * left, supporting copy on the right, and the proof points beneath.
 *
 * ₹50,000 is the total fee for the whole two-year programme — not per year.
 * The matching FAQ answer was corrected to agree with this; if the price ever
 * changes, both have to move together. The three proof points come from the
 * Outcomes card. Nothing here is invented; keep it that way if you edit it.
 */
const PROOF = [
  { value: "Top 20%", label: "get guaranteed paid internships" },
  { value: "350+", label: "live instructor-led classes" },
  { value: "10,000+", label: "opportunities to apply to" },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-mist px-6 py-8 lg:px-20 lg:py-10"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* eyebrow + rule */}
        <div className="flex items-center gap-6">
          <p className="shrink-0 font-display text-[12px] font-medium uppercase tracking-[0.2em] text-ink-900/45">
            Programme fee
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-ink-900/15" />
        </div>

        {/* heading + copy */}
        <div className="mt-7 grid grid-cols-1 items-start gap-8 lg:mt-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <h2
            id="pricing-heading"
            className="font-display text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[56px] lg:text-[68px]"
          >
            ₹50,000 <span className="text-flame">in total</span>
          </h2>

          <p className="max-w-[520px] font-display text-[16px] leading-[1.75] text-ink-900/60 lg:pt-3 lg:text-[18px]">
            One fee for the full two-year programme — not per year, and not per module. That
            works out to roughly ₹68 a day, with{" "}
            <span className="text-ink-900">nothing sold separately</span>.
          </p>
        </div>

        {/* proof */}
        <dl className="mt-9 grid grid-cols-1 gap-6 border-y border-ink-900/10 py-6 min-[560px]:grid-cols-3 lg:mt-10">
          {PROOF.map((p) => (
            <div
              key={p.value}
              className="flex items-baseline gap-3 min-[560px]:flex-col min-[560px]:gap-1.5"
            >
              <dt className="font-display text-[22px] font-bold leading-none text-flame">
                {p.value}
              </dt>
              <dd className="font-display text-[12.5px] leading-[1.45] text-ink-900/55">
                {p.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
