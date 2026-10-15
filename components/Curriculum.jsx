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
    // accent is used only by the projects panel + end-of-semester strip
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
    outcome: "Design, deploy and operate cloud services end to end.",
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
    outcome: "Ship an AI product you can defend in an interview.",
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

const Semester = ({ sem, reached, innerRef }) => {
  return (
    <div ref={innerRef} className="relative grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[132px_1fr]">
      {/* rail */}
      <div className="relative lg:pt-1.5">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`font-display text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
              reached ? "text-flame" : "text-ink-900/45"
            }`}
          >
            {sem.label}
          </span>
          <span
            aria-hidden="true"
            className={`hidden size-[11px] shrink-0 rounded-full border-2 bg-white transition-colors duration-300 lg:block ${
              reached ? "border-flame" : "border-ink-900/20"
            }`}
          />
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col gap-6 pb-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[30px] font-medium leading-tight tracking-[-0.02em] text-flame lg:text-[34px]">
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
        <div className="rounded-[16px] bg-ink-900/[0.035] p-5 sm:p-6">
          <p className="font-display text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-900/45">
            In classroom concepts
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sem.concepts.map((c) => (
              <li
                key={c.title}
                className="flex flex-col gap-3 rounded-[12px] border border-ink-900/8 bg-white p-4"
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
          </ul>
        </div>

        {/* projects */}
        <div className="rounded-[16px] p-5 sm:p-6" style={{ backgroundColor: sem.accentSoft }}>
          <p className="font-display text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-900/45">
            Projects you&apos;ll work on
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sem.projects.map((p) => (
              <li key={p.name} className="flex flex-col gap-3">
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
          </ul>
        </div>

        {/* end-of-semester outcome */}
        <div
          className="rounded-[12px] border-l-[3px] px-5 py-4"
          style={{ borderColor: sem.accent, backgroundColor: sem.accentSoft }}
        >
          <p className="font-display text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-900/45">
            By the end of {sem.label}
          </p>
          <p className="mt-1.5 font-display text-[16px] font-medium leading-snug text-ink-900">
            {sem.outcome}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Curriculum() {
  const trackRef = useRef(null);
  const blockRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(() => SEMESTERS.map((_, i) => i === 0));

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
    <section id="curriculum" className="bg-mist px-6 py-20 lg:px-20">
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

        <div ref={trackRef} className="relative mt-14">
          {/* rail track — sits under the dots at the right edge of the rail column */}
          <span
            aria-hidden="true"
            className="absolute left-[126.5px] top-[7px] hidden w-px bg-ink-900/12 lg:block"
            style={{ bottom: "56px" }}
          />
          {/* filled portion, driven by scroll */}
          <span
            aria-hidden="true"
            className="absolute left-[126.5px] top-[7px] hidden w-px origin-top bg-flame lg:block"
            style={{ height: `calc((100% - 63px) * ${progress})` }}
          />
          {/* arrow riding the tip of the fill */}
          <span
            aria-hidden="true"
            className="absolute left-[126.5px] z-10 hidden size-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-flame shadow-[0_2px_8px_rgba(230,22,31,0.45)] lg:flex"
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
