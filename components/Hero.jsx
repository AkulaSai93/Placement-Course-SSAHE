import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Student Journey", href: "#journey" },
  { label: "FAQs", href: "#faqs" },
];

/** White CTA with the dark arrow chip — used in the header and the hero body. */
function ApplyButton({ className = "" }) {
  return (
    <a
      href="#apply"
      className={`group inline-flex items-center justify-center gap-3 bg-white py-[10px] pl-4 pr-[14px] text-[13px] font-semibold uppercase leading-[19.048px] text-black transition-colors hover:bg-mist ${className}`}
    >
      <span className="whitespace-nowrap">
        Apply to <span className="lowercase">u</span>GSOT Catalyst
      </span>
      <span className="flex size-6 shrink-0 items-center justify-center bg-ink-900 text-[10.56px] text-white">
        <span className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">
          ↗
        </span>
      </span>
    </a>
  );
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 px-6 py-[26px] lg:px-20">
      <div className="mx-auto flex w-full max-w-[1336px] items-center justify-between gap-6">
        <a href="#home" className="relative h-[28px] w-[221.233px] shrink-0">
          <Image
            src="/images/ugsot-logo.png"
            alt="upGrad School of Technology"
            fill
            priority
            sizes="222px"
            className="object-contain object-left"
          />
        </a>

        <nav className="hidden items-start gap-[30.476px] lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap font-display text-[15.238px] text-white opacity-90 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ApplyButton className="hidden h-10 sm:inline-flex" />
      </div>
    </header>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-ink px-6 lg:min-h-[788px] lg:px-20"
    >
      {/* background plate */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover"
      />

      {/* vignette + top/bottom scrims, matching the design's gradient stack */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(66.24% 36.25% at 50% 54%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 72%)",
            "radial-gradient(101.82% 55.72% at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.75) 100%)",
          ].join(", "),
        }}
      />

      <Header />

      <div className="relative z-10 flex w-full max-w-[1280px] flex-col items-center pb-16 pt-32 text-center lg:pb-0 lg:pt-0">
        <h1 className="flex max-w-[972px] flex-col gap-2 font-display text-[32px] font-medium leading-normal tracking-[-0.038em] text-white sm:text-[44px] lg:text-[60px]">
          <span>Your college gives you a degree.</span>
          <span>
            <span className="font-accent font-medium text-flame">uGSOT Catalyst</span>{" "}
            helps you catalyze it.
          </span>
        </h1>

        <div className="flex max-w-[875px] flex-col gap-1.5 pt-[22px] font-display text-base leading-[28px] text-white/80 lg:text-[18px]">
          <p>
            An online 2-year technology accelerator you pursue alongside your existing B.Tech /
            B.E. / BCA / B.Sc. program.
          </p>
          <p>We become your parallel technology ecosystem.</p>
        </div>

        <div className="flex w-full max-w-[824px] flex-col items-center gap-5 pt-6">
          <p className="font-display text-base font-medium leading-[28px] text-white lg:text-[18px]">
            Designed primarily for ambitious Year 1 &amp; Year 2 students.
          </p>

          <div className="flex flex-col items-center gap-[22px] sm:flex-row">
            <ApplyButton />

            <a
              href="#brochure"
              className="inline-flex h-[44px] items-center justify-center gap-3 border border-solid border-white px-4 py-[10px] text-[13px] font-semibold uppercase leading-[19.048px] text-white transition-colors hover:bg-white/10"
            >
              <span className="whitespace-nowrap">Download Brochure</span>
              <img src="/icons/download.svg" alt="" width="24" height="24" className="shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
