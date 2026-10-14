const STATS = [
  { label: "Learners", value: "10 M+" },
  { label: "Hiring Partners", value: "3000+" },
  { label: "Global Universities", value: "300+" },
  { label: "Countries", value: "70+" },
  { label: "Placements", value: "110K+" },
  { label: "Corporate clients trained annually", value: "600+" },
  { label: "Internships Enabled", value: "28L+" },
];

export default function Legacy() {
  return (
    <section className="bg-ink-soft py-24 text-white">
      <div className="mx-auto max-w-shell px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <h2 className="font-display text-[29px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[39px]">
            Built on upGrad&apos;s Legacy.
            <br />
            <span className="text-white/55">Designed for the Future of Tech.</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-white/60">
            uGSOT builds on upGrad&apos;s broader education ecosystem to deliver focused
            technology education. While uGSOT Campus offers a full-time campus experience,
            uGSOT Catalyst helps students pursuing degrees elsewhere accelerate their
            technology skills.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group bg-ink-soft p-6 transition-colors hover:bg-white/[0.04] sm:p-7"
            >
              <p className="font-display text-[28px] font-semibold tracking-[-0.02em] text-white sm:text-[34px]">
                {s.value}
              </p>
              <p className="mt-2 text-[12px] font-medium uppercase leading-snug tracking-[0.12em] text-white/45">
                {s.label}
              </p>
              <span className="mt-4 block h-[2px] w-6 bg-brand transition-all duration-300 group-hover:w-12" />
            </div>
          ))}
          <div className="hidden bg-ink-soft p-6 md:block" />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-display text-lg font-medium tracking-[-0.01em] text-white/85">
            The uGSOT technology ecosystem — now accessible from wherever you study.
          </p>
          <a
            href="#apply"
            className="group inline-flex w-fit items-center gap-4 bg-white py-[6px] pl-5 pr-[6px] text-[13px] font-semibold uppercase tracking-wide text-ink-900 transition-colors hover:bg-lime"
          >
            Apply to uGSOT Catalyst
            <span className="flex h-8 w-8 items-center justify-center bg-ink-900 text-white">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
