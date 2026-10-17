"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Curriculum timeline.
 *
 * ⚠️ PLACEHOLDER CONTENT. This section is scoped to Semesters 3 and 4, and the
 * Figma only ever specified copy for Semester 1 — so the themes, descriptions,
 * concepts, projects and skills below are stand-ins carried over from the
 * earlier build. Swap them for the real syllabus. Project stills are unset
 * Project stills are placeholder artwork reused from the Figma Semester-1 export —
 * they do NOT depict these projects. Swap them for real stills.
 */
const ICONS = {
  code: "M8 6L2 12l6 6M16 6l6 6-6 6",
  cloud: "M7 18a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.6 1.5A3.5 3.5 0 0 1 17 18H7Z",
  server: "M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01",
  chip: "M7 7h10v10H7zM4 10h3M4 14h3M17 10h3M17 14h3M10 4v3M14 4v3M10 17v3M14 17v3",
  graph: "M4 19V5M4 19h16M8 15l3-4 3 3 4-6",
  people: "M15 20v-2a4 4 0 0 0-8 0v2M11 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M20 20v-2a3 3 0 0 0-2.5-3",
};

const SEMESTERS = [
  {
    id: 3,
    label: "Semester 3",
    // accent drives the mobile accordion header; accentSoft tints the panels
    accent: "#1D6FE0",
    accentSoft: "rgba(29,111,224,0.08)",
    theme: "Scale",
    lead: "By Semester 3,",
    description:
      "students design systems that survive real traffic — containerised services, cloud deployment and the operational discipline that production demands.",
    bold: "move from writing code to running it",
    skills: [
      "System Design",
      "Cloud Computing (AWS)",
      "Docker & Kubernetes",
      "CI/CD",
      "Operating Systems",
      "Computer Networks",
      "Competitive Programming",
    ],
    concepts: [
      {
        icon: "server",
        title: "System Design",
        body: "Learn how large systems are structured, and why they fail when they do.",
      },
      {
        icon: "cloud",
        title: "Cloud Computing",
        body: "Deploy and operate real services on AWS, not a local sandbox.",
      },
      {
        icon: "chip",
        title: "Operating Systems",
        body: "Understand processes, memory and the machine under your code.",
      },
      {
        icon: "code",
        title: "DSA II",
        body: "Advanced data structures and the problem-solving depth interviews probe.",
      },
    ],
    projects: [
      { name: "Scalable Microservices Backend", image: "/projects/enterprise-integration.webp" },
      { name: "CI/CD Pipeline & Observability Stack", image: "/projects/linux-security.webp" },
      { name: "Distributed Caching Layer", image: "/projects/food-delivery.webp" },
    ],
  },
  {
    id: 4,
    label: "Semester 4",
    accent: "#0E9F6E",
    accentSoft: "rgba(14,159,110,0.09)",
    theme: "Ship",
    lead: "By Semester 4,",
    description:
      "students build with LLMs, retrieval and agents — then defend a capstone they shipped and can explain line by line.",
    bold: "become AI-native engineers",
    skills: [
      "Machine Learning",
      "Generative AI & LLMs",
      "Retrieval-Augmented Generation",
      "AI Agents & Tooling",
      "Open Source Contribution",
      "Interview Preparation",
    ],
    concepts: [
      {
        icon: "graph",
        title: "Machine Learning",
        body: "The foundations behind models, training and evaluation.",
      },
      {
        icon: "chip",
        title: "Generative AI & LLMs",
        body: "Build with language models: prompting, retrieval and guardrails.",
      },
      {
        icon: "code",
        title: "AI Agents & Tooling",
        body: "Agents that plan, call tools and recover from their own failures.",
      },
      {
        icon: "people",
        title: "Career Readiness",
        body: "Interviews, aptitude and the communication the job actually needs.",
      },
    ],
    projects: [
      { name: "Production GenAI Application", image: "/projects/portfolio.webp" },
      { name: "Autonomous AI Agent", image: "/projects/enterprise-integration.webp" },
      { name: "Capstone Product Build", image: "/projects/linux-security.webp" },
    ],
  },
];

function Icon({ name }) {
  return (
    <span className="flex size-8 items-center justify-center rounded-[7px] bg-flame/10">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={ICONS[name]}
          stroke="#E7000B"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Panel whose items scroll horizontally on mobile (with prev/next arrows, as in
 * the reference) and fall back to the plain grid from `lg` up.
 */
function CarouselPanel({ title, className, style, children, count }) {
  const scrollerRef = useRef(null);

  // Native `behavior: "smooth"` is unreliable inside a scroll-snap container,
  // so the arrows animate scrollLeft directly.
  const animRef = useRef(0);
  const nudge = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    const max = el.scrollWidth - el.clientWidth;
    const from = el.scrollLeft;
    const to = Math.max(0, Math.min(max, from + dir * step));
    if (to === from) return;

    cancelAnimationFrame(animRef.current);
    const start = performance.now();
    const DURATION = 320;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      el.scrollLeft = from + (to - from) * eased;
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  return (
    <div className={`rounded-[16px] p-4 sm:p-6 ${className}`} style={style}>
      <div className="flex items-center justify-between gap-4">
        <p className="whitespace-nowrap font-display text-[11px] font-medium uppercase tracking-[0.1em] text-ink-900/45 sm:text-[11.5px] sm:tracking-[0.14em]">
          {title}
        </p>
        <div className="flex shrink-0 gap-2 lg:hidden">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => nudge(dir)}
              aria-label={dir < 0 ? `Previous ${title}` : `Next ${title}`}
              className="flex size-8 items-center justify-center rounded-[9px] border border-ink-900/10 bg-white text-ink-900/70 transition-colors active:bg-ink-900/5"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d={dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <ul
        ref={scrollerRef}
        className={`mt-5 flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:overflow-visible lg:pb-0 ${
          count >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        }`}
      >
        {children}
      </ul>
    </div>
  );
}

const Semester = ({ sem, reached, innerRef, open, onToggle }) => {
  return (
    <div
      ref={innerRef}
      className={`relative grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[132px_1fr] lg:pb-0 ${
        open ? "" : "pb-3"
      }`}
    >
      {/* rail / accordion header */}
      <div className="relative lg:pt-1.5">
        {/* mobile: tinted, tappable header */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`sem-${sem.id}-body`}
          className="flex w-full items-center justify-between gap-4 rounded-[12px] px-4 py-3.5 text-left lg:hidden"
          style={{ backgroundColor: sem.accentSoft }}
        >
          <span className="flex flex-col gap-0.5">
            <span
              className="font-display text-[11.5px] font-medium uppercase tracking-[0.14em]"
              style={{ color: sem.accent }}
            >
              {sem.label}
            </span>
            <span className="font-display text-[22px] font-medium leading-tight tracking-[-0.02em] text-ink-900">
              {sem.theme}
            </span>
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={`shrink-0 text-ink-900 transition-transform duration-300 ${
              open ? "" : "rotate-180"
            }`}
          >
            <path
              d="M6 14.5l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* desktop: rail label + dot */}
        <div className="hidden items-center justify-between gap-3 lg:flex">
          <span
            className={`font-display text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
              reached ? "text-flame" : "text-ink-900/45"
            }`}
          >
            {sem.label}
          </span>
          <span
            aria-hidden="true"
            className={`size-[11px] shrink-0 rounded-full border-2 bg-white transition-colors duration-300 ${
              reached ? "border-flame" : "border-ink-900/20"
            }`}
          />
        </div>
      </div>

      {/* content */}
      <div
        id={`sem-${sem.id}-body`}
        className={`flex-col gap-6 pb-14 ${open ? "flex" : "hidden"} lg:flex`}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="hidden font-display text-[30px] font-medium leading-tight tracking-[-0.02em] text-flame lg:block lg:text-[34px]">
              {sem.theme}
            </h3>
            <p className="max-w-[460px] font-display text-[15px] leading-[1.6] text-ink-900/70">
              <span className="font-medium text-ink-900">{sem.lead}</span>{" "}
              <span className="font-medium text-ink-900">{sem.bold}</span> — {sem.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-display text-[14px] font-medium text-ink-900">
              What you&apos;ll learn
            </p>
            <ul className="flex flex-wrap gap-2">
              {sem.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-ink-900/10 bg-white px-3 py-1.5 font-display text-[12.5px] text-ink-900/75"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* classroom concepts */}
        <CarouselPanel
          title="In classroom concepts"
          className="bg-ink-900/[0.035]"
          count={sem.concepts.length}
        >
            {sem.concepts.map((c) => (
              <li
                key={c.title}
                className="flex w-[78%] shrink-0 flex-col gap-3 rounded-[12px] border border-ink-900/8 bg-white p-4 sm:w-[48%] lg:w-auto"
              >
                <Icon name={c.icon} />
                <p className="font-display text-[14px] font-medium leading-snug text-ink-900">
                  {c.title}
                </p>
                <p className="font-display text-[12.5px] leading-[1.5] text-ink-900/55">
                  {c.body}
                </p>
              </li>
            ))}
        </CarouselPanel>

        {/* projects */}
        <CarouselPanel
          title="Projects you'll work on"
          style={{ backgroundColor: sem.accentSoft }}
          count={sem.projects.length}
        >
            {sem.projects.map((p) => (
              <li
                key={p.name}
                className="flex w-[78%] shrink-0 flex-col gap-3 sm:w-[48%] lg:w-auto"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-white">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex size-full items-center justify-center bg-[linear-gradient(135deg,#fff_0%,#f1f2f4_100%)] text-[10px] font-medium uppercase tracking-[0.14em] text-ink-900/25"
                    >
                      Project still
                    </div>
                  )}
                </div>
                <p className="font-display text-[13px] font-medium leading-snug text-ink-900">
                  {p.name}
                </p>
              </li>
            ))}
        </CarouselPanel>
      </div>
    </div>
  );
};

export default function Curriculum() {
  const trackRef = useRef(null);
  const blockRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(() => SEMESTERS.map((_, i) => i === 0));
  // mobile accordion: first semester open, the rest collapsed
  const [openId, setOpenId] = useState(SEMESTERS[0].id);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      // the line follows a point ~45% down the viewport
      const anchor = window.innerHeight * 0.45;
      const raw = (anchor - rect.top) / Math.max(rect.height, 1);
      setProgress(Math.min(1, Math.max(0, raw)));
      setReached(
        blockRefs.current.map((el) => (el ? el.getBoundingClientRect().top <= anchor : false))
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="curriculum" className="bg-mist px-6 py-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex max-w-[760px] flex-col gap-4">
          <h2 className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:text-[48px]">
            A <span className="font-accent font-medium text-flame">Curriculum</span> Built Around
            How Engineers Actually Learn.
          </h2>
          <p className="font-display text-[15px] leading-normal text-ink-900/60 lg:text-[18px]">
            Hands-on learning, curated semester by semester.
          </p>
        </div>

        <div ref={trackRef} className="relative mt-14 pl-6 lg:pl-0">
          {/* rail track — sits under the dots at the right edge of the rail column */}
          <span
            aria-hidden="true"
            className="absolute left-[3px] top-[7px] w-px bg-ink-900/12 lg:left-[126.5px]"
            style={{ bottom: "56px" }}
          />
          {/* filled portion, driven by scroll */}
          <span
            aria-hidden="true"
            className="absolute left-[3px] top-[7px] w-px origin-top bg-flame lg:left-[126.5px]"
            style={{ height: `calc((100% - 63px) * ${progress})` }}
          />
          {/* arrow riding the tip of the fill */}
          <span
            aria-hidden="true"
            className="absolute left-[3px] z-10 flex size-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-flame shadow-[0_2px_8px_rgba(230,22,31,0.45)] lg:left-[126.5px]"
            style={{ top: `calc(7px + (100% - 63px) * ${progress})` }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 2.5v7M3 6.5l3 3 3-3"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {SEMESTERS.map((sem, i) => (
            <Semester
              key={sem.id}
              sem={sem}
              reached={reached[i]}
              open={openId === sem.id}
              onToggle={() => setOpenId((cur) => (cur === sem.id ? null : sem.id))}
              innerRef={(el) => {
                blockRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
