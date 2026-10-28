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
import FooterWordmark from "@/components/FooterWordmark";

const CONTACT = {
  email: "hello@ugsot.com",
  phone: "",
  address: "",
};

/** the same five links as the header, in the same order (UI guide P2.6) */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "Pricing", href: "#pricing" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Mentors", href: "#mentors" },
  { label: "FAQs", href: "#faqs" },
];

const SOCIALS = [
  { label: "Instagram", href: "#instagram", icon: "/icons/instagram.svg" },
  { label: "LinkedIn", href: "#linkedin", icon: "/icons/mark-linkedin.svg" },
  { label: "X", href: "#x", icon: "/icons/x.svg" },
  { label: "YouTube", href: "#youtube", icon: "/icons/youtube.svg" },
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
                    className="group relative inline-block font-display text-[16px] text-white/55 transition-colors hover:text-white"
                  >
                    {/* dot marks the hovered link without shifting the text */}
                    {/* dot sits outside the text box, so the links still align
                        with the rest of the footer (UI guide P2.5) */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-5 top-1/2 size-[5px] -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100"
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

        {/* node 95:6509 — 760px wide, which leaves a 648px text column once
            the panel's 56px side padding is taken off */}
        <p className="mt-12 max-w-[760px] px-6 font-display text-[12px] leading-[1.6] text-white/60 sm:px-10 lg:mt-16 lg:px-14">
          {DISCLAIMER}
        </p>

        {/* copyright · socials · terms */}
        <div className="mt-10 grid grid-cols-1 items-center gap-6 px-6 sm:px-10 md:grid-cols-3 lg:mt-12 lg:px-14">
          <p className="font-display text-[14px] text-white/55">
            © {new Date().getFullYear()} upGrad School of Technology
          </p>

          <ul className="flex flex-wrap items-center gap-3 md:justify-center">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/35 transition-colors hover:border-white hover:bg-white/10"
                >
                  <img
                    src={social.icon}
                    alt=""
                    width="19"
                    height="19"
                    className="size-[19px] brightness-0 invert"
                    decoding="async"
                    loading="lazy"
                  />
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

        {/* oversized wordmark, clipped by the panel's bottom edge. The sizing
            is measured at runtime — see FooterWordmark for why a fixed value
            kept clipping the final letter. */}
        <div aria-hidden="true" className="mt-8 px-6 sm:px-10 lg:px-14">
          <FooterWordmark>
            {/* the negative tracking also applies after the last letter, so the
                advance ends short of where the "e" draws; zeroing its spacing
                makes the advance match the ink */}
            Lastmil<span className="tracking-normal">e</span>
          </FooterWordmark>
        </div>
      </div>
    </footer>
  );
}
