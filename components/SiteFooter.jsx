/**
 * Footer.
 *
 * ⚠️ CONTACT_EMAIL is a placeholder — swap it for the real admissions address
 * before this goes live.
 */
const CONTACT_EMAIL = "hello@ugsot.com";

const EXPLORE = [
  { label: "Home", href: "#home" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Student Journey", href: "#outcomes" },
  { label: "FAQs", href: "#faqs" },
];

const FOLLOW = [
  { label: "Instagram", href: "#instagram" },
  { label: "LinkedIn", href: "#linkedin" },
  { label: "X", href: "#x" },
  { label: "YouTube", href: "#youtube" },
];

const DISCLAIMER =
  "uGSOT Lastmile is a technology accelerator by upGrad School of Technology. It runs alongside your existing college degree and does not replace uGSOT Campus, the full-time higher-education experience offered by upGrad School of Technology.";

function LinkColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-display text-[14px] text-white/40">{title}</p>
      <ul className="flex flex-col gap-[10px]">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="font-display text-[16px] text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-mist px-4 pb-4 pt-6 sm:px-6 sm:pb-6 lg:px-6">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[28px] bg-ink p-6 sm:p-10 lg:p-14">
        {/* contact + links */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="w-full max-w-[520px]">
            <p className="font-display text-[14px] text-white/40">Let&apos;s talk</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group mt-4 flex items-center gap-4 border-b border-white/20 pb-4 transition-colors hover:border-white/50"
            >
              <span className="font-display text-[28px] leading-none tracking-[-0.02em] text-white sm:text-[36px] lg:text-[40px]">
                {CONTACT_EMAIL}
              </span>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-flame">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                >
                  <path d="M14 2L2 7l5 2 2 5 5-12Z" fill="#fff" />
                </svg>
              </span>
            </a>
          </div>

          <div className="flex gap-12 sm:gap-20">
            <LinkColumn title="Explore" links={EXPLORE} />
            <LinkColumn title="Follow" links={FOLLOW} />
          </div>
        </div>

        {/* wordmark panel */}
        <div className="mt-14 overflow-hidden rounded-[22px] bg-mist px-5 pb-5 pt-2 sm:px-8 sm:pb-6 lg:mt-20">
          <p
            aria-hidden="true"
            className="select-none text-center font-display font-medium leading-[0.86] tracking-[-0.045em] text-ink-900"
            style={{ fontSize: "clamp(72px, 20.5vw, 300px)" }}
          >
            Lastmile
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-[13px] text-ink-900/60">
              © {new Date().getFullYear()} upGrad School of Technology
            </p>
            <div className="flex gap-7">
              <a
                href="#privacy"
                className="font-display text-[13px] text-ink-900/60 transition-colors hover:text-ink-900"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="font-display text-[13px] text-ink-900/60 transition-colors hover:text-ink-900"
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-[860px] text-center font-display text-[11.5px] leading-[1.6] text-white/35">
          {DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
