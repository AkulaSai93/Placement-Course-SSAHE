/**
 * "What you walk away with" — the seven USPs as a bento grid.
 *
 * The layout follows the supplied reference: four columns over a six-row
 * track, with a tall hero in the second column and the remaining tiles
 * staggered either side of it so no two columns break at the same height.
 * Each tile carries its own little component — an inner card of marks, a chip
 * cluster, a browser mock, a stat, an avatar cluster — rather than a number.
 *
 * Internshala Pro is the hero tile. NOTE: the fee and the Apply Now button
 * were removed from it, so this section no longer states a price even though
 * it still owns `#pricing` — the ₹50,000 figure now lives only in the Hero and
 * the mobile sticky bar.
 *
 * `relative z-10` is required — the Hero parallaxes down over whatever follows
 * it, and any section without it gets covered.
 */
const INTERNSHALA_CROP = {
  w: "125.55%",
  h: "232.12%",
  left: "-12.8%",
  top: "-69.52%",
};

/** the near-black used by the reference's "feature" tiles */
const DARK = "#141417";

function Tile({ className = "", tint, dark = false, children }) {
  return (
    <li
      className={`relative flex flex-col gap-5 overflow-hidden rounded-[12px] p-5 sm:p-6 ${className}`}
      style={{ backgroundColor: dark ? DARK : tint }}
    >
      {children}
    </li>
  );
}

function Title({ dark = false, children }) {
  return (
    <p
      className={`font-display text-[19px] font-medium leading-[1.25] tracking-[-0.015em] sm:text-[21px] ${
        dark ? "text-white" : "text-ink-900"
      }`}
    >
      {children}
    </p>
  );
}

function Note({ dark = false, children }) {
  return (
    <p
      className={`font-display text-[13.5px] leading-[1.5] ${
        dark ? "text-white/60" : "text-ink-900/55"
      }`}
    >
      {children}
    </p>
  );
}

/**
 * The three profile marks, in a white card like the reference's icon row.
 * LinkedIn and GitHub use their own brand glyphs and brand colours; the resume
 * has no brand, so it gets a plain document mark on white.
 */
const MARKS = [
  {
    label: "Resume",
    bg: "#FFFFFF",
    fg: "#1D6FE0",
    ring: true,
    // document with a folded corner and three text lines
    paths: [
      "M6.5 2.5h7.1L19 7.9v12.6a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20.5v-16.5a1.5 1.5 0 0 1 1.5-1.5Zm7 1.6v3.4a.9.9 0 0 0 .9.9h3.3L13.5 4.1Z",
      "M8.2 12.4h7.6v1.5H8.2zM8.2 15.8h5.4v1.5H8.2z",
    ],
    fill2: "#FFFFFF",
  },
  {
    label: "LinkedIn",
    bg: "#0A66C2",
    fg: "#FFFFFF",
    // the "in" wordmark on its own, without the enclosing square
    paths: [
      "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29Z",
      "M5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Z",
      "M7.12 20.45H3.56V9h3.56v11.45Z",
    ],
  },
  {
    label: "GitHub",
    bg: "#18181B",
    fg: "#FFFFFF",
    // the Octocat mark
    paths: [
      "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.83-.26.83-.58l-.02-2.04c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.08-.75.09-.73.09-.73 1.2.08 1.83 1.23 1.83 1.23 1.08 1.84 2.81 1.31 3.5 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.94 0-1.3.47-2.38 1.24-3.22-.13-.3-.54-1.52.1-3.17 0 0 1.01-.33 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.56 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.92 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3Z",
    ],
  },
];

function ProfileMarks() {
  return (
    <div className="flex w-fit gap-2.5 rounded-[12px] bg-white p-3 shadow-[0_1px_3px_rgba(10,10,11,0.06)]">
      {MARKS.map((m) => (
        <span
          key={m.label}
          role="img"
          aria-label={m.label}
          className={`flex size-12 items-center justify-center rounded-[12px] ${
            m.ring ? "border border-ink-900/10" : ""
          }`}
          style={{ backgroundColor: m.bg }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            {m.paths.map((d, i) => (
              <path key={d} d={d} fill={m.fill2 && i > 0 ? m.fill2 : m.fg} />
            ))}
          </svg>
        </span>
      ))}
    </div>
  );
}

/** the three subjects as chips, echoing the reference's tag cluster */
function SubjectChips() {
  const chips = [
    { label: "DSA", filled: true },
    { label: "Web development", filled: false },
    { label: "Core CS", filled: false },
  ];
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <li
          key={c.label}
          className={`rounded-full px-3.5 py-1.5 font-display text-[13px] font-medium ${
            c.filled
              ? "bg-[#7C3AED] text-white"
              : "border border-ink-900/12 bg-white text-ink-900/70"
          }`}
        >
          {c.label}
        </li>
      ))}
    </ul>
  );
}

/** a deployed app, drawn as a browser window with an AI badge */
function DeployedApp() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-ink-900/8 bg-white">
      <div className="flex items-center gap-1.5 border-b border-ink-900/8 px-3 py-2.5">
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <span key={c} className="size-2 rounded-full" style={{ backgroundColor: c }} />
        ))}
        <span className="ml-2 h-2 flex-1 rounded-full bg-ink-900/8" />
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        <span className="h-2 w-3/4 rounded-full bg-ink-900/10" />
        <span className="h-2 w-1/2 rounded-full bg-ink-900/8" />
        <span className="mt-1 w-fit rounded-full bg-[#0E9F6E] px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
          AI feature
        </span>
      </div>
    </div>
  );
}

/**
 * Illustrated avatars for the mock-round cluster: a tinted disc, shoulders,
 * a head and a hair shape, all clipped to the disc. `hair` is the path drawn
 * over the head, so each face reads as a different person.
 */
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

function Avatar({ person }) {
  const id = person.bg.slice(1);
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" className="block">
      <defs>
        <clipPath id={`avatar-${id}`}>
          <circle cx="24" cy="24" r="24" />
        </clipPath>
      </defs>
      <g clipPath={`url(#avatar-${id})`}>
        <circle cx="24" cy="24" r="24" fill={person.bg} />
        {/* shoulders */}
        <ellipse cx="24" cy="50" rx="16" ry="14" fill={person.shirt} />
        {/* neck + head */}
        <rect x="21" y="28" width="6" height="7" rx="3" fill={person.skin} />
        <circle cx="24" cy="23" r="8.6" fill={person.skin} />
        <path d={person.hair} fill={person.shirt} />
      </g>
    </svg>
  );
}

/** the mock rounds, as an avatar cluster like the reference's green tile */
function MockRounds() {
  return (
    <div className="flex items-center">
      {PEOPLE.map((person, i) => (
        <span
          key={person.bg}
          aria-hidden="true"
          className="overflow-hidden rounded-full ring-2 ring-white"
          style={{ marginLeft: i ? "-12px" : 0 }}
        >
          <Avatar person={person} />
        </span>
      ))}
    </div>
  );
}

/**
 * The aptitude round as a countdown dial: a track, an arc showing the time
 * still on the clock, and a marker at the arc's tip. 72% of the ring is drawn,
 * which is what 45:00 of a 60-minute paper looks like.
 */
function Countdown() {
  const R = 34;
  const CIRC = 2 * Math.PI * R;
  const REMAINING = 0.72;
  const angle = -90 + REMAINING * 360;
  const tip = {
    x: 40 + R * Math.cos((angle * Math.PI) / 180),
    y: 40 + R * Math.sin((angle * Math.PI) / 180),
  };

  return (
    <div className="flex items-center gap-4">
      <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true" className="shrink-0">
        <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(10,10,11,0.10)" strokeWidth="6" />
        <circle
          cx="40"
          cy="40"
          r={R}
          fill="none"
          stroke="#D97706"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${CIRC * REMAINING} ${CIRC}`}
          transform="rotate(-90 40 40)"
        />
        <circle cx={tip.x} cy={tip.y} r="5" fill="#D97706" stroke="#fff" strokeWidth="2.5" />
      </svg>

      <div className="flex flex-col">
        <span className="font-display text-[34px] font-medium leading-none tracking-[-0.02em] tabular-nums text-ink-900">
          45:00
        </span>
        <span className="mt-1.5 font-display text-[11.5px] font-medium uppercase tracking-[0.12em] text-[#D97706]">
          Time left
        </span>
      </div>
    </div>
  );
}

/** the AI toolkit, as a row of small pills */
function AiTools({ dark = false }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {["Coding assistants", "LLM APIs", "Embeddings", "RAG"].map((t) => (
        <li
          key={t}
          className={`rounded-full px-3 py-1.5 font-display text-[12.5px] font-medium ${
            dark
              ? "border border-white/15 bg-white/10 text-white/85"
              : "border border-ink-900/10 bg-white text-ink-900/65"
          }`}
        >
          {t}
        </li>
      ))}
    </ul>
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
            className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:text-[48px]"
          >
            What you <span className="text-flame">walk away</span> with.
          </h2>
          <p className="font-display text-[15px] leading-normal text-ink-900/60 lg:text-[18px]">
            Seven things in hand at the end of six months — not a certificate and a hope.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:grid-rows-[repeat(3,236px)]">
          {/* the hero — dark, tall, with the Internshala app running off its foot */}
          <li className="relative flex flex-col gap-6 overflow-hidden rounded-[12px] bg-[#141417] p-6 sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:p-7">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(70%_70%_at_50%_100%,rgba(231,0,11,0.32),rgba(231,0,11,0))]"
            />

            <div className="relative flex flex-col gap-4">
              <span
                className="relative block h-[42px] w-[138px] brightness-0 invert sm:h-[48.7px] sm:w-[160px]"
                role="img"
                aria-label="Internshala"
              >
                <span className="pointer-events-none absolute inset-0 block overflow-hidden">
                  <img
                    src="/images/internshala.webp"
                    alt=""
                    className="absolute max-w-none"
                    style={{
                      width: INTERNSHALA_CROP.w,
                      height: INTERNSHALA_CROP.h,
                      left: INTERNSHALA_CROP.left,
                      top: INTERNSHALA_CROP.top,
                    }}
                    loading="lazy"
                  />
                </span>
              </span>

              <div className="flex flex-col gap-2">
                <p className="font-display text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-white sm:text-[28px]">
                  6 months of <span className="text-[#FF4A50]">Internshala Pro</span>, free
                </p>
                <Note dark>
                  Thousands of job and internship opportunities at your fingertips, included with
                  the programme for your whole hunt.
                </Note>
              </div>
            </div>

            <div className="relative mx-auto -mb-6 mt-auto w-[200px] shrink-0 sm:w-[218px] lg:-mb-7">
              <div className="rounded-t-[26px] border-[6px] border-b-0 border-[#2A2A2F] bg-[#2A2A2F] shadow-[0_-10px_40px_rgba(0,0,0,0.45)]">
                <div className="overflow-hidden rounded-t-[20px] bg-white">
                  <img
                    src="/images/internshala-app.jpg"
                    alt="The Internshala app, showing internships, jobs and courses"
                    width="552"
                    height="1200"
                    className="block w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </li>

          {/* wide, light — copy left, the marks right */}
          <Tile
            tint="rgba(29,111,224,0.08)"
            className="lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:flex-row lg:items-center lg:justify-between lg:gap-8"
          >
            <div className="flex max-w-[320px] flex-col gap-2">
              <Title>Resume, LinkedIn profile and GitHub portfolio</Title>
              <Note>An ATS-friendly resume and work you can point a recruiter at.</Note>
            </div>
            <ProfileMarks />
          </Tile>

          {/* light — the three subjects */}
          <Tile tint="rgba(124,58,237,0.08)" className="lg:col-start-2 lg:row-start-2">
            <SubjectChips />
            <div className="mt-auto flex flex-col gap-2">
              <Title>Confidence across DSA, web development and core CS</Title>
              <Note>The three things every coding round tests, practised until they stick.</Note>
            </div>
          </Tile>

          {/* dark — the shipped project */}
          <Tile dark className="lg:col-start-3 lg:row-start-2">
            <div className="flex flex-col gap-2">
              <Title dark>A deployed full-stack project with an AI feature</Title>
              <Note dark>Shipped to the cloud and demoed, not left on your laptop.</Note>
            </div>
            <div className="-mb-10 -mr-10 mt-auto rotate-[-4deg] sm:-mr-6">
              <DeployedApp />
            </div>
          </Tile>

          {/* dark — the AI toolkit */}
          <Tile dark className="lg:col-start-1 lg:row-start-3">
            <div className="flex flex-col gap-2">
              <Title dark>Hands-on with AI coding tools and LLM APIs</Title>
              <Note dark>Used inside your own build, not demonstrated on a slide.</Note>
            </div>
            <div className="mt-auto">
              <AiTools dark />
            </div>
          </Tile>

          {/* light — the timed paper */}
          <Tile tint="rgba(217,119,6,0.09)" className="lg:col-start-2 lg:row-start-3">
            <Countdown />
            <div className="mt-auto flex flex-col gap-2">
              <Title>A timed, placement-style aptitude test</Title>
              <Note>Sat under real conditions, so the one that counts holds no surprises.</Note>
            </div>
          </Tile>

          {/* light — the mock rounds */}
          <Tile tint="rgba(219,39,119,0.08)" className="lg:col-start-3 lg:row-start-3">
            <MockRounds />
            <div className="mt-auto flex flex-col gap-2">
              <Title>Technical and HR mock interview practice</Title>
              <Note>Real rounds with real feedback, before an offer is on the line.</Note>
            </div>
          </Tile>
        </ul>
      </div>
    </section>
  );
}
