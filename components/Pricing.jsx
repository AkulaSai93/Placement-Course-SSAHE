/**
 * "What you walk away with" — Figma node 40:8774.
 *
 * Laid out as Figma node 188:7038 ("Frame 4"): three equal columns, with
 * Internshala running the full height of column 1, a 2 x 2 of mock interviews,
 * profile, aptitude and subjects in columns 2–3, and the AI tools tile across
 * both of them underneath — all five at one height. The old deployed-project
 * tile is gone.
 *
 * Sizes are the frame's; the artwork is the components above, shrunk with
 * `zoom` where the frame draws it smaller. Two columns on tablets, one on
 * phones.
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
export const WORDMARK_CROP = {
  width: "200.875px",
  height: "113.031px",
  left: "-20.48px",
  top: "-29.85px",
};

function Tile({ className = "", tint, children }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[12px] p-5 ${className}`}
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

/** node 45:11497 — the three profile marks in a white card, now 57.6px each */
const MARKS = [
  { label: "Resume", src: "/icons/mark-resume.svg", bg: "#FFFFFF", ring: true },
  { label: "LinkedIn", src: "/icons/mark-linkedin.svg", bg: "#0A66C2" },
  { label: "GitHub", src: "/icons/mark-github.svg", bg: "#18181B" },
];

export function ProfileMarks() {
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

export function SubjectChips() {
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

/** node 40:9032 — the AI toolkit pills, one row */
const AI_TOOLS = ["Coding assistants", "LLM APIs", "Embeddings", "RAG"];

export function AiTools({ order = AI_TOOLS, className = "gap-[7px]" }) {
  return (
    // the four pills come to 369px in a 368px tile, so the default gap is 7px
    // rather than 8px — otherwise RAG drops to a second line
    <ul className={`flex flex-wrap items-center ${className}`}>
      {order.map((t) => (
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

export function CountdownDial() {
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

export function MockRounds() {
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
      className="relative z-10 bg-mist px-6 py-10 lg:px-20 lg:py-16"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center">
        {/* node 95:5009 — centred, title on one line with the subtitle on a
            single line under it. The 554px cap is kept on narrow screens; from
            lg the block takes the full width so the subtitle does not wrap. */}
        <div className="flex w-full max-w-[554px] flex-col items-center gap-4 text-center lg:max-w-none">
          <h2
            id="usps-heading"
            className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:whitespace-nowrap lg:text-[48px] lg:leading-[51.84px] lg:tracking-[-0.96px]"
          >
            What you <span className="text-flame">walk away</span> with.
          </h2>
          <p className="font-display text-[15px] leading-normal text-ink-900/60 lg:whitespace-nowrap lg:text-[18px] lg:leading-[27px]">
            Six things in hand at the end of six months — not a certificate and a hope.
          </p>
        </div>

        {/* Frame 4 — node 188:7038. Three 416px columns with 16px gutters:
            Internshala (416 x 580) runs the full height of column 1, and the
            five other tiles sit in three equal rows beside it — every one of
            them the same height (182.6px in the frame). The rows are
            "minmax(182px, 1fr)": if a tile needs more room on a narrower
            screen, all three rows grow together, so they stay equal. */}
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(3,minmax(150px,1fr))]">
          {/* node 188:6845 — Internshala */}
          <div className="relative h-[440px] overflow-hidden rounded-[12px] bg-black sm:col-span-2 sm:h-[500px] lg:col-span-1 lg:row-span-3 lg:h-auto">
            {/* node 188:6846 — the full phone, 300 wide from y 166, running
                off the bottom edge */}
            <img
              src="/images/internshala-app-device.webp"
              alt="The Internshala app, showing internships, jobs and courses"
              width="604"
              height="1200"
              className="absolute left-1/2 top-[140px] w-[250px] max-w-none -translate-x-1/2 sm:top-[150px] sm:w-[270px]"
              loading="lazy"
              decoding="async"
            />
            {/* node 188:6847 — lockup and line, centred */}
            <div className="absolute inset-x-2 top-[22px] flex flex-col items-center gap-1.5">
              <div className="flex items-end gap-[5.4px] [zoom:0.85] sm:[zoom:1]">
                <p className="whitespace-nowrap font-display text-[25.2px] font-medium leading-[37.8px] tracking-[0.34px] text-white">
                  1 year of
                </p>
                {/* node 188:6852 — the wordmark's 160 x 48.7 crop at 0.9, which
                    is the frame's 144 x 44.1 window */}
                <span
                  className="relative block h-[48.695px] w-[160px] shrink-0 overflow-hidden [zoom:0.9]"
                  role="img"
                  aria-label="Internshala"
                >
                  <img
                    src="/images/internshala-wordmark.webp"
                    alt=""
                    width="420"
                    height="237"
                    className="absolute max-w-none"
                    style={{ ...WORDMARK_CROP, top: "-33.85px" }}
                    decoding="async"
                    loading="lazy"
                  />
                </span>
                <p className="whitespace-nowrap font-display text-[25.2px] font-medium leading-[37.8px] tracking-[0.34px] text-white">
                  Pro free
                </p>
              </div>
              <p className="w-full max-w-[400px] text-center font-display text-[14px] leading-[21px] tracking-[-0.15px] text-white/60">
                Thousands of job and internship opportunities at your fingertips, included with
                the programme for your whole hunt.
              </p>
            </div>
          </div>

          {/* node 188:6860 */}
          <Tile tint="rgba(219,39,119,0.08)" className="justify-between gap-4">
            <div className="[zoom:0.8]">
              <MockRounds />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-display text-[18px] font-medium leading-[23.4px] tracking-[-0.62px] text-ink-900">Technical and HR mock interview practice</p>
              <p className="font-display text-[13px] leading-[20.25px] tracking-[-0.08px] text-ink-900/55">
                Real rounds with real feedback, before an offer is on the line.
              </p>
            </div>
          </Tile>

          {/* node 188:6931 — the marks card at 2/3 size: 38.4px marks */}
          <Tile tint="rgba(29,111,224,0.09)" className="justify-between gap-4">
            <div className="[zoom:0.58]">
              <ProfileMarks />
            </div>
            <div className="flex flex-col gap-1">
              {/* half a point under the frame's 18px: the browser's face sets it 8px
                wider than Figma does, which pushed it to two lines */}
              <p className="font-display text-[17.5px] font-medium leading-[23.4px] tracking-[-0.67px] text-ink-900">A Resume, LinkedIn profile and GitHub portfolio</p>
              <p className="font-display text-[12px] leading-[20.25px] tracking-[-0.11px] text-ink-900/55">
                An ATS-friendly resume and work you can point a recruiter at.
              </p>
            </div>
          </Tile>

          {/* node 188:6914 — the dial at 57.6px, 45:00 at 24.5px */}
          <Tile tint="rgba(217,119,6,0.09)" className="justify-between gap-3">
            <div className="flex items-center gap-4 [zoom:0.6]">
              <CountdownDial />
              <div className="flex flex-col">
                <p className="font-display text-[34px] font-medium leading-[34px] tracking-[-0.68px] tabular-nums text-ink-900">
                  45:00
                </p>
                <p className="pt-1.5 font-display text-[12px] font-medium uppercase leading-[17.25px] tracking-[1.38px] text-[#92400E]">
                  Time left
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-display text-[18px] font-medium leading-[23.4px] tracking-[-0.62px] text-ink-900">A timed, placement-style aptitude test</p>
              <p className="font-display text-[13px] leading-[20.25px] tracking-[-0.08px] text-ink-900/55">
                Sat under real conditions, so the one that counts holds no surprises.
              </p>
            </div>
          </Tile>

          {/* node 188:6956 */}
          <Tile tint="rgba(124,58,237,0.08)" className="justify-between gap-4">
            <SubjectChips />
            <div className="max-w-[369px]">
              <Title>Develop skills across DSA, web development and core CS</Title>
            </div>
          </Tile>

          {/* node 188:7022 — across columns 2–3, pills in one row */}
          <Tile tint="rgba(8,145,178,0.09)" className="justify-between gap-4 sm:col-span-2">
            <AiTools order={["RAG", "Coding assistants", "LLM APIs", "Embeddings"]} className="gap-2" />
            <p className="font-display text-[19px] font-normal leading-[1.25] tracking-[-0.015em] text-ink-900 sm:text-[21px] sm:leading-[26.25px] sm:tracking-[-0.67px]">
              Hands-on with AI coding tools and LLM APIs
            </p>
          </Tile>
        </div>
      </div>
    </section>
  );
}
