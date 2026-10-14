/** Footer — Figma node 37:1400. */
const SOCIALS = [
  { name: "Facebook", icon: "/icons/facebook.svg", href: "#facebook" },
  { name: "Instagram", icon: "/icons/instagram.svg", href: "#instagram" },
  { name: "X", icon: "/icons/x.svg", href: "#x" },
  { name: "YouTube", icon: "/icons/youtube.svg", href: "#youtube" },
];

const DISCLAIMER =
  "uGSOT Catalyst is a technology accelerator by upGrad School of Technology. It runs alongside your existing college degree and does not replace uGSOT Campus, the full-time higher-education experience offered by upGrad School of Technology.";

export default function SiteFooter() {
  return (
    <footer className="bg-mist">
      <div className="flex flex-col items-center gap-10 overflow-hidden rounded-t-[48px] bg-ink-soft px-6 py-14 lg:gap-[45.714px] lg:rounded-t-[95.238px] lg:p-[53.333px]">
        {/* headline + CTA */}
        <div className="flex max-w-[689.524px] flex-col items-center gap-[28.571px]">
          <div className="flex flex-col items-center gap-[15.238px] text-center">
            <h2 className="font-display text-[34px] font-medium leading-[1.33] tracking-[-0.0104em] text-white sm:text-[42px] lg:text-[49.524px] lg:leading-[65.9px]">
              Now choose how
              <br />
              far you want to go.
            </h2>
            <p className="font-display text-[14.286px] leading-[23.571px] text-[#e5e5e5]">
              {DISCLAIMER}
            </p>
          </div>

          <div className="flex flex-col items-center gap-[17.143px]">
            <a
              href="#apply"
              className="group inline-flex items-center justify-center gap-[15.238px] bg-white py-[7.619px] pl-[24.762px] pr-[7.619px] transition-colors hover:bg-lime"
            >
              <span className="font-sans text-[15.238px] font-medium leading-[22.857px] text-ink-900">
                Apply to uGSOT Catalyst
              </span>
              <span className="flex size-[38.095px] items-center justify-center bg-ink-900">
                <img
                  src="/icons/arrow-up-right.svg"
                  alt=""
                  width="17"
                  height="17"
                  className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                />
              </span>
            </a>
            <p className="text-center font-display text-[12.381px] leading-[18.571px] text-[#e5e5e5]">
              For ambitious <span className="text-brand">Year 1 &amp; Year 2</span> students across
              India.
            </p>
          </div>
        </div>

        {/* outlined wordmark */}
        <img
          src="/images/ugsot-catalyst-wordmark.png"
          alt="uGSOT Catalyst"
          className="h-auto w-full max-w-[1095.238px] object-cover"
          loading="lazy"
        />

        {/* closing line */}
        <div className="flex flex-col items-center gap-[11.429px]">
          <p className="max-w-[853.333px] text-center font-display text-[28px] font-medium leading-[1.2] tracking-[-0.01em] text-white sm:text-[38px] lg:text-[49.524px] lg:leading-[59.4px]">
            Your college gives you a degree. uGSOT Catalyst helps you catalyze it.
          </p>
          <span className="flex h-[72.381px] w-[160.952px] items-center justify-center overflow-hidden bg-brand px-[15.238px] py-[1.905px]">
            <span className="font-accent text-[36px] font-medium leading-[68.571px] text-white sm:text-[45.714px]">
              Learn.
            </span>
          </span>
        </div>

        {/* logo + socials */}
        <div className="flex flex-col items-center gap-[26.667px]">
          <img
            src="/images/ugsot-logo.png"
            alt="upGrad School of Technology"
            className="h-[43px] w-[339.75px] object-contain"
            loading="lazy"
          />
          <ul className="flex items-center gap-[22.857px]">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  aria-label={social.name}
                  className="block opacity-80 transition-opacity hover:opacity-100"
                >
                  <img src={social.icon} alt="" width="21" height="21" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* disclaimer */}
        <div className="w-full max-w-[1333.333px] border-t-[0.952px] border-white/15 pt-[30.476px]">
          <p className="mx-auto max-w-[952.381px] text-center font-display text-[11.429px] leading-[18.286px] text-white/60">
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
