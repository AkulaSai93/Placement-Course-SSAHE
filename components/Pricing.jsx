/**
 * "What you walk away with" — Figma node 36:7297.
 *
 * Seven tiles on a three-column, three-row bento (416 x 236 cells, 16px
 * gutters). The Internshala tile is black and spans rows 1–2 of the first
 * column; the resume tile spans columns 2–3 of the first row. The other five
 * are soft tints of their own accent.
 *
 * NOTE: this section owns `#pricing` and the nav's "Pricing" link, but the
 * node states no fee — ₹50,000 appears only in the Hero and the mobile sticky
 * bar.
 *
 * Assets come from the node: the device render, the Internshala wordmark, the
 * three profile marks and the countdown dial. The browser mock, the chips and
 * the avatars are drawn in code, as they were before the design was made from
 * them.
 */

/** node 36:7313 — a 200.875 x 113.031 image inside a 160 x 48.695 window */
const WORDMARK_CROP = {
  width: "200.875px",
  height: "113.031px",
  left: "-20.48px",
  top: "-33.85px",
};

function Tile({ className = "", tint, children }) {
  return (
    <li
      className={`relative flex flex-col overflow-hidden rounded-[12px] p-6 ${className}`}
      style={{ backgroundColor: tint }}
    >
      {children}
    </li>
  );
}

/** node 36:3990 — the headline on the four larger tiles */
function Title({ children }) {
  return (
    <p className="font-display text-[19px] font-medium leading-[1.25] tracking-[-0.015em] text-ink-900 sm:text-[21px] sm:leading-[26.25px] sm:tracking-[-0.315px]">
      {children}
    </p>
  );
}

/** node 36:3977 — the smaller headline on the bottom two tiles */
function TitleSm({ children }) {
  return (
    <p className="font-display text-[17px] font-medium leading-[1.3] tracking-[-0.01em] text-ink-900 sm:text-[18px] sm:leading-[23.4px] sm:tracking-[-0.18px]">
      {children}
    </p>
  );
}

function Note({ className = "", children }) {
  return (
    <p className={`font-display text-[13.5px] leading-[20.25px] text-ink-900/55 ${className}`}>
      {children}
    </p>
  );
}

/** node 36:3993 — the three profile marks in a white card */
const MARKS = [
  { label: "Resume", src: "/icons/mark-resume.svg", bg: "#FFFFFF", ring: true },
  { label: "LinkedIn", src: "/icons/mark-linkedin.svg", bg: "#0A66C2" },
  { label: "GitHub", src: "/icons/mark-github.svg", bg: "#18181B" },
];

function ProfileMarks() {
  return (
    <div className="flex w-[188px] shrink-0 gap-2.5 rounded-[12px] bg-white p-3 drop-shadow-[0_1px_1.5px_rgba(10,10,11,0.06)]">
      {MARKS.map((m) => (
        <span
          key={m.label}
          className={`flex size-12 items-center justify-center rounded-[12px] ${
            m.ring ? "border border-ink-900/10" : ""
          }`}
          style={{ backgroundColor: m.bg }}
        >
          <img src={m.src} alt={m.label} width="26" height="26" />
        </span>
      ))}
    </div>
  );
}

/** node 36:3920 — the three subjects as chips, the first one filled */
const CHIPS = [
  { label: "DSA", filled: true },
  { label: "Web development", filled: false },
  { label: "Core CS", filled: false },
];

function SubjectChips() {
  return (
    <ul className="flex flex-wrap gap-2">
      {CHIPS.map((c) => (
        <li
          key={c.label}
          className={`rounded-full px-3.5 py-1.5 font-display text-[13px] font-medium leading-[19.5px] ${
            c.filled ? "bg-[#7C3AED] text-white" : "border border-[#E5E7EB] bg-white text-ink-900/70"
          }`}
        >
          {c.label}
        </li>
      ))}
    </ul>
  );
}

/** node 36:3937 — a browser window, 249px wide and clipped by the tile */
function DeployedApp() {
  return (
    <div className="h-[120px] w-[249px] overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white">
      <div className="flex w-[390px] items-center gap-1.5 border-b border-[#E5E7EB] px-3 py-2.5">
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <span key={c} className="size-2 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        <span className="block h-2 w-full rounded-full bg-ink-900/10" />
        <span className="block h-2 w-[181px] rounded-full" />
        <span className="mt-1 w-fit rounded-full bg-[#0E9F6E] px-2.5 py-1 font-display text-[11px] font-medium uppercase leading-[16.5px] tracking-[0.88px] text-white">
          AI feature
        </span>
      </div>
    </div>
  );
}

/** node 36:3954 — the AI toolkit pills */
function AiTools() {
  return (
    <ul className="flex flex-wrap gap-2">
      {["Coding assistants", "LLM APIs", "Embeddings", "RAG"].map((t) => (
        <li
          key={t}
          className="rounded-full border border-white/15 bg-white px-3 py-1.5 font-display text-[12.5px] font-medium leading-[18.75px] text-ink-900/65"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** node 36:4008 — the avatar cluster, 48px discs overlapping by 12px */
const PEOPLE = [
  {
    bg: "#7C5CF0",
    skin: "#F3C9A3",
    shirt: "#2B2140",
    hair: "M14 22c0-6 4.5-10 10-10s10 4 10 10c0-1.5-1-2.5-2.5-3-2 1.2-4.6 1.8-7.5 1.8s-5.5-.6-7.5-1.8C15 19.5 14 20.5 14 22Z",
  },
  {
    bg: "#F06BA8",
    skin: "#8A5A3B",
    shirt: "#3A1E2C",
    hair: "M24 9c6 0 10 4 10 9 0 2-.8 3.6-2 4.6.4-4.6-2.8-7.6-8-7.6s-8.4 3-8 7.6c-1.2-1-2-2.6-2-4.6 0-5 4-9 10-9Z",
  },
  {
    bg: "#E89B3C",
    skin: "#6B4226",
    shirt: "#2E2014",
    hair: "M13.5 23c-.5-6.5 4-11 10.5-11s11 4.5 10.5 11c-.3-3.8-1.8-5.8-3.4-6.6-2 .9-4.4 1.4-7.1 1.4s-5.1-.5-7.1-1.4c-1.6.8-3.1 2.8-3.4 6.6Z",
  },
  {
    bg: "#3B82F6",
    skin: "#EBB98F",
    shirt: "#17284A",
    hair: "M24 10c6.2 0 10.2 4.2 9.8 10.4-.6-2.4-2-3.8-3.6-4.4-1.8 1-4 1.5-6.2 1.5s-4.4-.5-6.2-1.5c-1.6.6-3 2-3.6 4.4C13.8 14.2 17.8 10 24 10Z",
  },
];

function MockRounds() {
  return (
    <div className="flex items-center">
      {PEOPLE.map((person, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="overflow-hidden rounded-full ring-2 ring-white"
          style={{ marginLeft: i ? "-12px" : 0 }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" className="block">
            <defs>
              <clipPath id={`avatar-${i}`}>
                <circle cx="24" cy="24" r="24" />
              </clipPath>
            </defs>
            <g clipPath={`url(#avatar-${i})`}>
              <circle cx="24" cy="24" r="24" fill={person.bg} />
              <ellipse cx="24" cy="50" rx="16" ry="14" fill={person.shirt} />
              <rect x="21" y="28" width="6" height="7" rx="3" fill={person.skin} />
              <circle cx="24" cy="23" r="8.6" fill={person.skin} />
              <path d={person.hair} fill={person.shirt} />
            </g>
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="usps-heading"
      className="relative z-10 bg-mist px-6 py-10 lg:px-20 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex max-w-[760px] flex-col gap-4">
          <h2
            id="usps-heading"
            className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:text-[48px] lg:leading-[51.84px] lg:tracking-[-0.96px]"
          >
            What you <span className="text-flame">walk away</span> with.
          </h2>
          <p className="font-display text-[15px] leading-normal text-ink-900/60 lg:text-[18px] lg:leading-[27px]">
            Seven things in hand at the end of six months — not a certificate and a hope.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:grid-rows-[repeat(3,236px)]">
          {/* node 36:3829 — Internshala, black, spanning rows 1–2 of column 1 */}
          <li className="relative overflow-hidden rounded-[12px] bg-black pb-6 pt-[17px] sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:pb-0">
            <div className="relative z-10 mx-auto flex max-w-[368px] flex-col items-center gap-2 px-6">
              <div className="flex items-end gap-1.5">
                <p className="whitespace-nowrap font-display text-[24px] font-medium leading-none text-white sm:text-[28px]">
                  6 months of
                </p>
                <span
                  className="relative block h-[41.7px] w-[137px] overflow-hidden sm:h-[48.695px] sm:w-[160px]"
                  role="img"
                  aria-label="Internshala"
                >
                  <img
                    src="/images/internshala-wordmark.png"
                    alt=""
                    className="absolute max-w-none origin-top-left scale-[0.857] sm:scale-100"
                    style={WORDMARK_CROP}
                  />
                </span>
                <p className="whitespace-nowrap font-display text-[24px] font-medium leading-none text-white sm:text-[28px]">
                  Free
                </p>
              </div>
              <p className="text-center font-display text-[14px] leading-normal text-white/60">
                Thousands of job and internship opportunities at your fingertips, included with the
                programme for your whole hunt.
              </p>
            </div>

            {/* node 36:7452 — the device render fills a 300 x 595.294 frame, and the
                tile clips whatever runs past its foot. 604x1200 source, so it
                stays sharp on retina. */}
            <div className="relative mx-auto mt-6 h-[370px] w-[256px] overflow-hidden sm:h-[450px] sm:w-[300px] lg:mt-[22px] lg:h-[501px]">
              <img
                src="/images/internshala-app-device.png"
                alt="The Internshala app, showing internships, jobs and courses"
                width="604"
                height="1200"
                className="absolute inset-0 size-full max-w-none object-cover object-top"
                loading="lazy"
              />
            </div>
          </li>

          {/* node 36:3987 — resume marks, spanning columns 2–3 of the first row */}
          <Tile
            tint="rgba(29,111,224,0.08)"
            className="gap-6 sm:col-span-2 lg:col-start-2 lg:row-start-1 lg:flex-row lg:items-center lg:justify-between lg:gap-8"
          >
            <div className="flex max-w-[320px] flex-col gap-2">
              <Title>Resume, LinkedIn profile and GitHub portfolio</Title>
              <Note>An ATS-friendly resume and work you can point a recruiter at.</Note>
            </div>
            <ProfileMarks />
          </Tile>

          {/* node 36:3919 */}
          <Tile tint="rgba(124,58,237,0.08)" className="gap-5 lg:col-start-2 lg:row-start-2">
            <SubjectChips />
            <div className="mt-auto flex flex-col justify-end">
              <Title>Confidence across DSA, web development and core CS</Title>
            </div>
          </Tile>

          {/* node 36:3930 — the browser mock is positioned, then clipped */}
          <Tile tint="rgba(14,159,110,0.09)" className="gap-5 lg:col-start-3 lg:row-start-2">
            <div className="flex flex-col gap-2">
              <Title>A deployed full-stack project with an AI feature</Title>
              <Note>Shipped to the cloud and demoed, not left on your laptop.</Note>
            </div>
            <div className="mt-4 self-end lg:absolute lg:left-[175px] lg:top-[118px] lg:mt-0">
              <DeployedApp />
            </div>
          </Tile>

          {/* node 36:3950 */}
          <Tile tint="rgba(8,145,178,0.09)" className="gap-5 lg:col-start-1 lg:row-start-3">
            <Title>Hands-on with AI coding tools and LLM APIs</Title>
            <div className="mt-auto flex flex-col justify-end">
              <AiTools />
            </div>
          </Tile>

          {/* node 36:3963 */}
          <Tile
            tint="rgba(217,119,6,0.09)"
            className="gap-8 lg:col-start-2 lg:row-start-3 lg:gap-[42px]"
          >
            <div className="flex items-center gap-4">
              <img src="/icons/timer-dial.svg" alt="" width="80" height="80" className="shrink-0" />
              <div className="flex flex-col">
                <p className="font-display text-[34px] font-medium leading-[34px] tracking-[-0.68px] tabular-nums text-ink-900">
                  45:00
                </p>
                <p className="pt-1.5 font-display text-[11.5px] font-medium uppercase leading-[17.25px] tracking-[1.38px] text-[#D97706]">
                  Time left
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <TitleSm>A timed, placement-style aptitude test</TitleSm>
              <Note className="max-w-[260px] text-[13px] leading-[19.5px]">
                Sat under real conditions, so the one that counts holds no surprises.
              </Note>
            </div>
          </Tile>

          {/* node 36:4007 */}
          <Tile
            tint="rgba(219,39,119,0.08)"
            className="justify-between gap-8 lg:col-start-3 lg:row-start-3"
          >
            <MockRounds />
            <div className="flex flex-col gap-2">
              <TitleSm>Technical and HR mock interview practice</TitleSm>
              <Note className="text-[13px] leading-[19.5px]">
                Real rounds with real feedback, before an offer is on the line.
              </Note>
            </div>
          </Tile>
        </ul>
      </div>
    </section>
  );
}
