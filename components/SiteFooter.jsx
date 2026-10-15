/**
 * Footer.
 *
 * Layout: nav on the left and contact details on the right, then a meta row
 * (copyright · socials · terms) above a rule, and an oversized wordmark clipped
 * by the panel's bottom edge.
 *
 * ⚠️ CONTACT.email is a placeholder — swap it for the real admissions address
 * before this goes live. `phone` and `address` are intentionally empty: fill
 * them in and they render automatically, so nothing invented ships by default.
 */
const CONTACT = {
  email: "hello@ugsot.com",
  phone: "",
  address: "",
};

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Student Journey", href: "#outcomes" },
  { label: "FAQs", href: "#faqs" },
];

const SOCIALS = [
  { label: "Instagram", href: "#instagram" },
  { label: "LinkedIn", href: "#linkedin" },
  { label: "X", href: "#x" },
  { label: "YouTube", href: "#youtube" },
];

const DISCLAIMER =
  "uGSOT Lastmile is a technology accelerator by upGrad School of Technology. It runs alongside your existing college degree and does not replace uGSOT Campus, the full-time higher-education experience offered by upGrad School of Technology.";

export default function SiteFooter() {
  const contactLines = [
    CONTACT.email && (
      <a
        key="email"
        href={`mailto:${CONTACT.email}`}
        className="transition-colors hover:text-white"
      >
        {CONTACT.email}
      </a>
    ),
    CONTACT.phone && (
      <a
        key="phone"
        href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`}
        className="transition-colors hover:text-white"
      >
        {CONTACT.phone}
      </a>
    ),
    CONTACT.address && <span key="address">{CONTACT.address}</span>,
  ].filter(Boolean);

  return (
    <footer className="bg-mist px-4 pb-4 pt-6 sm:px-6">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[28px] bg-ink pt-10 sm:pt-12 lg:pt-14">
        {/* nav + contact */}
        <div className="flex flex-col gap-10 px-6 sm:px-10 md:flex-row md:items-start md:justify-between lg:px-14">
          <nav>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative inline-block pl-5 font-display text-[16px] text-white/55 transition-colors hover:text-white"
                  >
                    {/* dot marks the hovered link without shifting the text */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 size-[5px] -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-2.5 font-display text-[16px] text-white/55 md:items-end md:text-right">
            {contactLines}
          </div>
        </div>

        <p className="mt-12 max-w-[760px] px-6 font-display text-[11.5px] leading-[1.6] text-white/30 sm:px-10 lg:mt-16 lg:px-14">
          {DISCLAIMER}
        </p>

        {/* copyright · socials · terms */}
        <div className="mt-10 grid grid-cols-1 items-center gap-6 px-6 sm:px-10 md:grid-cols-3 lg:mt-12 lg:px-14">
          <p className="font-display text-[14px] text-white/55">
            © {new Date().getFullYear()} upGrad School of Technology
          </p>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 md:justify-center">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="font-display text-[14px] text-white/55 transition-colors hover:text-white"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#terms"
            className="font-display text-[14px] text-white/55 transition-colors hover:text-white md:justify-self-end"
          >
            Terms and Conditions
          </a>
        </div>

        <div className="mt-8 px-6 sm:px-10 lg:px-14">
          <div className="h-px w-full bg-white/15" />
        </div>

        {/* oversized wordmark, clipped by the panel edge */}
        {/* The wordmark always spans the full panel width: the outer div is a
            query container, so sizing the type in `cqw` scales it to whatever
            width is available rather than to the viewport. */}
        <div
          aria-hidden="true"
          className="mt-8 px-6 [container-type:inline-size] sm:px-10 lg:px-14"
        >
          {/* 0.79em clears the glyph ink exactly (baseline sits at 0.773em and the
              round letters overshoot it by ~0.015em), so the wordmark sits flush
              to the panel edge without slicing through the letterforms. */}
          <div className="overflow-hidden" style={{ fontSize: "30.3cqw", height: "0.79em" }}>
            <p className="select-none whitespace-nowrap text-center font-display font-medium leading-[0.8] tracking-[-0.045em] text-white">
              Lastmile
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
