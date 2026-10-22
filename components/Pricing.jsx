/**
 * "What you walk away with" — Figma node 40:8774.
 *
 * The tiles no longer sit on an even grid: the node lays them out as a
 * masonry, so each column breaks at its own height. On a 1280 canvas with
 * 416px columns and 16px gutters the offsets are
 *
 *   column 1 : Internshala (h 556) → AI tools      (y 0, 572)
 *   column 2 : the shipped project spans columns 2–3 (h 236), then mock
 *              (h 236) and aptitude (h 236)          (y 0, 252, 504)
 *   column 3 : profile marks (h 303) → subjects      (y 252, 571)
 *
 * which is what the nested flex columns below reproduce — the inner stacks
 * advance independently, so column 3 breaks at 555 while column 2 breaks at
 * 488.
 *
 * NOTE: the node states no fee, so this section answers to `#walk-away`; the
 * price lives in its own section below, which owns `#pricing`. The node's subtitle drops the em dash ("six months not a certificate");
 * that reads as a slip, so the dash is kept here.
 *
 * Assets come from the node: the device render, the Internshala wordmark and
 * the three profile marks. The browser mock, the chips, the dial and the
 * avatars are drawn in code, as they were before the design was made from
 * them.
 */

/**
 * node 40:8935 — a 200.875 x 113.031 image inside a 160 x 48.695 window.
 *
 * The node's own top offset is -33.85px, which leaves the wordmark floating
 * about 4px above the baseline of the words either side of it: the letters
 * sit at y 128-156 of the 420x237 source, so at this scale their foot lands
 * 7.9px above the window's bottom while the text baseline is only ~3.5px
 * above it. Dropped by 4px so the three read as one line.
 */
const WORDMARK_CROP = {
  width: "200.875px",
  height: "113.031px",
  left: "-20.48px",
  top: "-29.85px",
};

function Tile({ className = "", tint, children }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[12px] p-6 ${className}`}
      style={{ backgroundColor: tint }}
    >
      {children}
    </div>
  );
}

/** node 40:8942 — the headline on the larger tiles */
function Title({ children }) {
  return (
    <p className="font-display text-[19px] font-medium leading-[1.25] tracking-[-0.015em] text-ink-900 sm:text-[21px] sm:leading-[26.25px] sm:tracking-[-0.315px]">
      {children}
    </p>
  );
}

/** node 40:9009 — the smaller headline */
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

/** node 45:11497 — the three profile marks in a white card, now 57.6px each */
const MARKS = [
  { label: "Resume", src: "/icons/mark-resume.svg", bg: "#FFFFFF", ring: true },
  { label: "LinkedIn", src: "/icons/mark-linkedin.svg", bg: "#0A66C2" },
  { label: "GitHub", src: "/icons/mark-github.svg", bg: "#18181B" },
];

function ProfileMarks() {
  return (
    <div className="flex w-fit shrink-0 gap-3 rounded-[14.4px] bg-white p-[14.4px] drop-shadow-[0_1.2px_1.8px_rgba(10,10,11,0.06)] sm:w-[225.6px]">
      {MARKS.map((m) => (
        <span
          key={m.label}
          className={`flex size-[48px] items-center justify-center rounded-[14.4px] sm:size-[57.6px] ${
            m.ring ? "border-[1.2px] border-ink-900/10" : ""
          }`}
          style={{ backgroundColor: m.bg }}
        >
          <img
            src={m.src}
            alt={m.label}
            width="31"
            height="31"
            className="size-[26px] sm:size-[31.2px]"
            decoding="async"
            loading="lazy"
          />
        </span>
      ))}
    </div>
  );
}

/** node 40:9061 — the three subjects as chips, the first one filled */
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

/** node 40:9018 — a browser window, 364 x 167.3, clipped by the tile */
function DeployedApp() {
  return (
    <div className="h-[167.3px] w-[364px] overflow-hidden rounded-[14px] border-[1.4px] border-[#E5E7EB] bg-white">
      <div className="flex w-[361.2px] items-center gap-[8.4px] border-b-[1.4px] border-[#E5E7EB] px-[16.8px] py-[14px]">
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <span
            key={c}
            className="size-[11.2px] rounded-full"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-[11.2px] p-[19.6px]">
        <span className="block h-[11.2px] w-[241.5px] rounded-full bg-ink-900/10" />
        <span className="block h-[11.2px] w-[161px] rounded-full" />
        <span className="mt-[5.6px] w-fit rounded-full bg-[#0E9F6E] px-[14px] py-[5.6px] font-display text-[15.4px] font-medium uppercase leading-[23.1px] tracking-[1.232px] text-white">
          AI feature
        </span>
      </div>
    </div>
  );
}

/** node 40:9032 — the AI toolkit pills, one row */
function AiTools() {
  return (
    // the four pills come to 369px in a 368px tile, so the gap is 7px rather
    // than 8px — otherwise RAG drops to a second line
    <ul className="flex flex-wrap items-center gap-[7px]">
      {["Coding assistants", "LLM APIs", "Embeddings", "RAG"].map((t) => (
        <li
          key={t}
          className="whitespace-nowrap rounded-full border border-white/15 bg-white px-3 py-1.5 font-display text-[12.5px] font-medium leading-[18.75px] text-ink-900/65"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * node 40:9045 — the countdown dial. Drawn in code rather than imported: the
 * design's export flattens the dash pattern into four separate arc segments,
 * so the ring comes out broken instead of one sweep.
 */
const DIAL_COLOUR = "#D97706";

function CountdownDial() {
  const R = 34;
  const CIRC = 2 * Math.PI * R;
  const REMAINING = 0.75;
  const angle = -90 + REMAINING * 360;
  const tip = {
    x: 40 + R * Math.cos((angle * Math.PI) / 180),
    y: 40 + R * Math.sin((angle * Math.PI) / 180),
  };

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true" className="shrink-0">
      <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(10,10,11,0.1)" strokeWidth="6" />
      <circle
        cx="40"
        cy="40"
        r={R}
        fill="none"
        stroke={DIAL_COLOUR}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${CIRC * REMAINING} ${CIRC}`}
        transform="rotate(-90 40 40)"
      />
      <circle cx={tip.x} cy={tip.y} r="5" fill={DIAL_COLOUR} stroke="#fff" strokeWidth="2.5" />
    </svg>
  );
}

/** node 40:8959 — the avatar cluster, 57.6px discs overlapping by 14.4px */
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
          className="overflow-hidden rounded-full ring-[2.4px] ring-white"
          style={{ marginLeft: i ? "-14.4px" : 0 }}
        >
          <svg width="57.6" height="57.6" viewBox="0 0 48 48" className="block">
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
      id="walk-away"
      aria-labelledby="usps-heading"
      className="relative z-10 bg-mist px-6 py-10 lg:px-20 lg:py-20"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center">
        {/* node 40:9078 — the heading block is centred and 554px wide */}
        <div className="flex w-full max-w-[554px] flex-col gap-4 text-center">
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

        {/* the masonry */}
        <div className="mt-10 flex w-full flex-col gap-4 lg:mt-14 lg:flex-row">
          {/* column 1 */}
          <div className="flex flex-col gap-4 lg:w-[calc((100%-32px)/3)] lg:shrink-0">
            {/* node 40:8929 — Internshala, 556 tall */}
            <div className="relative overflow-hidden rounded-[12px] bg-black pb-0 pt-[27px] lg:h-[556px]">
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
                      src="/images/internshala-wordmark.webp"
                      alt=""
                      className="absolute max-w-none origin-top-left scale-[0.857] sm:scale-100"
                      style={WORDMARK_CROP}
                    decoding="async"
                    loading="lazy"
                    />
                  </span>
                  <p className="whitespace-nowrap font-display text-[24px] font-medium leading-none text-white sm:text-[28px]">
                    Free
                  </p>
                </div>
                <p className="text-center font-display text-[14px] leading-normal text-white/60">
                  Thousands of job and internship opportunities at your fingertips, included with
                  the programme for your whole hunt.
                </p>
              </div>

              {/* node 40:8930 — the device sits at y=138 and the tile clips its foot */}
              <div className="relative mx-auto mt-6 aspect-[300/400] w-full max-w-[256px] overflow-hidden sm:max-w-[300px] lg:mt-[18px] lg:aspect-[300/418]">
                <img
                  src="/images/internshala-app-device.webp"
                  alt="The Internshala app, showing internships, jobs and courses"
                  width="604"
                  height="1200"
                  className="absolute inset-0 size-full max-w-none object-cover object-top"
                  loading="lazy"
                decoding="async"
                />
              </div>
            </div>

            {/* node 40:9031 — pills above, headline below */}
            <Tile tint="rgba(8,145,178,0.09)" className="gap-[34px]">
              <AiTools />
              <Title>Hands-on with AI coding tools and LLM APIs</Title>
            </Tile>
          </div>

          {/* columns 2–3 */}
          <div className="flex flex-col gap-4 lg:min-w-0 lg:flex-1">
            {/* node 45:11422 — the shipped project now spans both columns, with
                the browser mock pinned at x=460 inside the 848-wide tile */}
            <Tile
              tint="rgba(14,159,110,0.09)"
              className="gap-6 lg:min-h-[236px] lg:flex-row lg:items-center lg:justify-between lg:gap-8"
            >
              <div className="flex max-w-[320px] flex-col gap-2">
                <Title>A deployed full-stack project with an AI feature</Title>
                <Note>Shipped to the cloud and demoed, not left on your laptop.</Note>
              </div>
              <div className="-mr-6 origin-bottom-left scale-[0.82] self-start sm:scale-100 lg:absolute lg:left-[460px] lg:top-[34px] lg:mr-0 lg:self-auto">
                <DeployedApp />
              </div>
            </Tile>

            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              {/* column 2 */}
              <div className="flex flex-col gap-4 md:min-w-0 md:flex-1">
                {/* node 45:11441 */}
                <Tile
                  tint="rgba(219,39,119,0.08)"
                  className="justify-between gap-8 sm:min-h-[236px]"
                >
                  <MockRounds />
                  <div className="flex flex-col gap-2">
                    <TitleSm>Technical and HR mock interview practice</TitleSm>
                    <Note className="text-[13px] leading-[19.5px]">
                      Real rounds with real feedback, before an offer is on the line.
                    </Note>
                  </div>
                </Tile>

                {/* node 45:11527 */}
                <Tile
                  tint="rgba(217,119,6,0.09)"
                  className="gap-8 sm:min-h-[236px] lg:gap-[34px]"
                >
                  <div className="flex items-center gap-4">
                    <CountdownDial />
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
              </div>

              {/* column 3 */}
              <div className="flex flex-col gap-4 md:min-w-0 md:flex-1">
                {/* node 45:11495 — the profile marks, 303 tall, marks above the
                    headline with a 70px gap between them */}
                <Tile
                  tint="rgba(29,111,224,0.09)"
                  className="justify-between gap-10 sm:min-h-[303px] lg:gap-[70px]"
                >
                  <ProfileMarks />
                  <div className="flex flex-col gap-2">
                    <Title>A Resume, LinkedIn profile and GitHub portfolio</Title>
                    <Note>An ATS-friendly resume and work you can point a recruiter at.</Note>
                  </div>
                </Tile>

                {/* node 45:11544 — chips above, headline below */}
                <Tile tint="rgba(124,58,237,0.08)" className="gap-[34px]">
                  <SubjectChips />
                  <Title>Confidence across DSA, web development and core CS</Title>
                </Tile>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
