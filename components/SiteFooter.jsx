/**
 * Footer.
 *
 * Layout: nav on the left and contact details on the right, then a meta row
 * (copyright · socials · terms) above a rule, and an oversized wordmark clipped
 * by the panel's bottom edge.
 *
 * The contact column is empty for now, as on the live page — the programme's
 * address is given in the FAQ instead. Fill any of CONTACT in and it renders
 * automatically, so nothing invented ships by default.
 */
import FooterWordmark from "@/components/FooterWordmark";

const CONTACT = {
  email: "",
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
  { label: "Instagram", href: "https://www.instagram.com/upgrad_schooloftech/", icon: "/icons/instagram.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/upgrad-school-of-technology", icon: "/icons/mark-linkedin.svg" },
  { label: "X", href: "https://x.com/uGSOT", icon: "/icons/x.svg" },
  { label: "YouTube", href: "https://www.youtube.com/@upGradSchoolofTechnology", icon: "/icons/youtube.svg" },
];

const DISCLAIMER =
  "Disclaimer: upGrad School of Technology is not a college or university and does not award degrees. uGSOT LaunchReady is a preparatory skill-development programme designed to enhance technical and placement readiness; it does not guarantee internships, interviews, employment or any particular salary outcome. Individual results may vary, and hiring decisions rest solely with prospective employers. Finance, No Cost EMI and Credit Card EMI options are provided by third-party financial institutions, subject to their eligibility criteria and terms, which may change without notice. Financing may be a personal loan and not an education loan; please verify all terms, interest, fees and charges with the provider before proceeding. Terms and conditions apply.";

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

        {/* the full width of the panel, inside its side padding — the longer
            LaunchReady disclaimer read as a narrow column at 760px */}
        <p className="mt-12 px-6 font-display text-[12px] leading-[1.6] text-white/60 sm:px-10 lg:mt-16 lg:px-14">
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
                  target="_blank"
                  rel="noopener noreferrer"
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
            LaunchRead<span className="tracking-normal">y</span>
          </FooterWordmark>
        </div>
      </div>
    </footer>
  );
}
