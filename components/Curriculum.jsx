"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Curriculum — the eight modules of UGSOT LastMile 2026, from the programme
 * deck ("What students will learn", pages 4–7) and the at-a-glance table on
 * page 1.
 *
 * The layout follows Newton School's curriculum section: a thin rail on the
 * left carrying the module label, a dot and a connecting line; beside it the
 * module's headline and description, a "What you'll learn" pill cloud, a
 * tinted panel of "In classroom concepts" cards that scroll sideways, and a
 * closing "By the end of module N" banner. Their projects row is deliberately
 * left out.
 *
 * On mobile each module collapses behind a tinted header, as theirs does.
 *
 * Every module carries its own session / week / hour counts; the totals in
 * STATS are the deck's own footer figures and must stay in step with them
 * (70 sessions, 17.5 weeks, 210 hours).
 */
const MODULES = [
  {
    id: 1,
    lead: "In Module 01,",
    bold: "Python and problem-solving",
    skills: ["Python", "Variables & Data Types", "Loops", "Functions", "Recursion", "Lists & Dictionaries", "File I/O", "Pseudocode"],
    title: "Programming",
    promise: "Write clean, working Python and break problems down before you code.",
    sessions: 6,
    weeks: "1.5 wk",
    hours: 18,
    topics: [
      ["Python Basics", "Setup, variables, data types, operators, input/output"],
      ["Control Flow", "Conditionals, loops, nested loops, pattern problems"],
      ["Functions", "Parameters, return values, scope, intro to recursion"],
      ["Python Data Structures", "Lists, tuples, dictionaries, sets, comprehensions"],
      ["Strings, Exceptions & Files", "String methods, exception handling, file I/O"],
      ["Problem-Solving Approach", "Pseudocode, dry runs, edge cases, learning with AI tools"],
    ],
  },
  {
    id: 2,
    lead: "In Module 02,",
    bold: "Data Structures & Algorithms",
    skills: ["Big-O", "Arrays", "Strings", "Hashing", "Two Pointers", "Sorting", "Binary Search", "Linked Lists", "Stacks & Queues", "Trees", "Heaps", "Graphs", "Dynamic Programming"],
    title: "Data Structures & Algorithms",
    promise:
      "Solve coding-round problems with the right data structure and an efficient algorithm.",
    sessions: 20,
    weeks: "5 wk",
    hours: 60,
    topics: [
      ["Time & Space Complexity", "Big-O, analysing loops, complexity classes"],
      ["Arrays I", "Traversal, prefix sums, frequency counting"],
      ["Arrays II", "Kadane's algorithm, in-place operations, 2D arrays"],
      ["Strings", "Palindromes, anagrams, substring problems"],
      ["Hashing", "Hash maps and sets, two-sum style problems"],
      ["Two Pointers & Sliding Window", "Pair problems, fixed and variable windows"],
      ["Recursion", "Base cases, recursion trees"],
      ["Backtracking", "Subsets, permutations, combinations"],
      ["Sorting", "Merge sort, quick sort, counting sort"],
      ["Binary Search", "Variations, search on answer"],
      ["Linked Lists", "Reversal, fast and slow pointers"],
      ["Stacks", "Parentheses, next greater element"],
      ["Queues & Deques", "Circular queue, monotonic queue"],
      ["Binary Trees", "Traversals, height, diameter, path sums"],
      ["Binary Search Trees", "Insert, delete, validate, LCA"],
      ["Heaps & Priority Queues", "Top-K problems, merging sorted lists"],
      ["Graphs I: BFS & DFS", "Representation, traversal, components"],
      ["Graphs II & Greedy", "Cycles, shortest paths, interval problems"],
      ["Dynamic Programming I", "Memoisation, tabulation, 1D DP"],
      ["Dynamic Programming II", "2D DP, knapsack, LCS"],
    ],
  },
  {
    id: 3,
    lead: "In Module 03,",
    bold: "HTML, CSS and JavaScript",
    skills: ["HTML", "CSS", "Flexbox & Grid", "Responsive Design", "JavaScript", "ES6+", "DOM & Events", "Fetch & APIs"],
    title: "Web Essentials",
    promise: "Build responsive, interactive web pages with HTML, CSS and JavaScript.",
    sessions: 6,
    weeks: "1.5 wk",
    hours: 18,
    topics: [
      ["HTML Fundamentals", "Semantic HTML, forms, tables, accessibility"],
      ["CSS Fundamentals", "Selectors, box model, colours, typography"],
      ["CSS Layouts & Responsive Design", "Flexbox, Grid, media queries"],
      ["JavaScript Fundamentals", "ES6+, functions, arrays, objects"],
      ["DOM & Events", "Updating the page, event listeners, forms"],
      ["Asynchronous JavaScript & Fetch", "Promises, async/await, APIs, JSON"],
    ],
  },
  {
    id: 4,
    lead: "In Module 04,",
    bold: "the full stack, end to end",
    skills: ["Git & GitHub", "React", "Hooks", "React Router", "Node.js", "Express", "REST APIs", "MongoDB", "JWT Auth", "Testing", "Deployment"],
    title: "Full Stack Development",
    promise: "Build, secure and deploy a complete web application as a team.",
    sessions: 16,
    weeks: "4 wk",
    hours: 48,
    topics: [
      ["Git, GitHub & Team Workflow", "Branches, pull requests, code reviews"],
      ["React Fundamentals", "Components, JSX, props"],
      ["React State & Hooks", "useState, useEffect, lists"],
      ["React Routing & Forms", "React Router, controlled forms"],
      ["React with APIs", "Data fetching, loading and error states"],
      ["Project Lab: React Frontend", "Build a multi-page React app"],
      ["Node.js & Express", "Servers, routing, middleware"],
      ["REST API Design", "CRUD endpoints, status codes, Postman"],
      ["MongoDB & Mongoose", "Schemas, documents, CRUD"],
      ["Connecting Frontend & Backend", "CORS, integration, environment config"],
      ["Authentication & Authorisation", "Hashing, JWT, protected routes"],
      ["Validation, Errors & Security", "Input validation, common vulnerabilities"],
      ["Testing & Code Quality", "Unit and API tests, clean code"],
      ["Deployment", "Shipping frontend and backend to the cloud"],
      ["Full-Stack Project Lab I", "Build a complete app in teams"],
      ["Full-Stack Project Lab II & Demo", "Finish, deploy and present"],
    ],
  },
  {
    id: 5,
    lead: "In Module 05,",
    bold: "Generative AI",
    skills: ["LLMs", "Prompt Engineering", "AI Coding Assistants", "LLM APIs", "Embeddings", "RAG"],
    title: "Generative AI & AI-Assisted Development",
    promise: "Use AI to build faster and responsibly, and ship an LLM-powered feature.",
    sessions: 4,
    weeks: "1 wk",
    hours: 12,
    topics: [
      ["Generative AI & LLM Fundamentals", "How LLMs work, tokens, context, hallucination"],
      [
        "Prompt Engineering & AI Coding Assistants",
        "Structured prompts, pair programming with AI",
      ],
      ["LLM APIs, Embeddings & RAG", "Calling models, vector search, retrieval"],
      ["Building an AI Feature", "Add an AI feature to your full-stack project"],
    ],
  },
  {
    id: 6,
    lead: "In Module 06,",
    bold: "core computer science",
    skills: ["OOP", "SOLID", "DBMS", "SQL", "Transactions & Indexing", "Operating Systems", "Computer Networks", "System Design"],
    title: "Core CS Fundamentals",
    promise:
      "Answer interview questions on OOP, databases, operating systems and networks with confidence.",
    sessions: 10,
    weeks: "2.5 wk",
    hours: 30,
    topics: [
      ["Object-Oriented Programming I", "Classes, objects, encapsulation, inheritance"],
      ["Object-Oriented Programming II", "Polymorphism, abstraction, SOLID basics"],
      ["DBMS Fundamentals", "Relational model, keys, ER, normalisation"],
      ["SQL I", "SELECT, filtering, aggregates, constraints"],
      ["SQL II", "JOINs, GROUP BY, HAVING, subqueries"],
      ["Transactions & Indexing", "ACID properties, concurrency, indexes"],
      ["Operating Systems I", "Processes, threads, scheduling, sync"],
      ["Operating Systems II", "Memory, paging, virtual memory, deadlocks"],
      ["Computer Networks", "OSI, TCP/IP, HTTP, DNS, TCP vs UDP"],
      ["System Design Basics & Revision", "Scaling, caching; interview revision"],
    ],
  },
  {
    id: 7,
    lead: "In Module 07,",
    bold: "aptitude and reasoning",
    skills: ["Quantitative Aptitude", "Data Interpretation", "Logical Reasoning", "Verbal Ability", "Mock Tests"],
    title: "Aptitude & Reasoning",
    promise: "Clear the aptitude and reasoning rounds that open most placement drives.",
    sessions: 4,
    weeks: "1 wk",
    hours: 12,
    topics: [
      ["Quantitative Aptitude I", "Percentages, ratios, averages, profit and loss"],
      ["Quantitative Aptitude II", "Time and work, speed-distance, interest, DI"],
      ["Logical Reasoning", "Series, coding-decoding, relations, syllogisms"],
      ["Verbal Ability & Mock Aptitude Test", "Grammar, comprehension, timed mock test"],
    ],
  },
  {
    id: 8,
    lead: "In Module 08,",
    bold: "how you present yourself",
    skills: ["Communication", "Resume & LinkedIn", "GitHub Portfolio", "Group Discussion", "HR Interviews", "Mock Interviews"],
    title: "Soft Skills & Career Readiness",
    promise: "Present yourself well, from your resume to the final interview round.",
    sessions: 4,
    weeks: "1 wk",
    hours: 12,
    topics: [
      ["Communication & Self-Introduction", "Elevator pitch, spoken clarity, email writing"],
      ["Resume, LinkedIn & GitHub Portfolio", "ATS-friendly resume, profiles, project write-ups"],
      ["Group Discussion & HR Interviews", "GD practice, STAR method, HR questions"],
      ["Mock Interviews & Placement Strategy", "Technical and HR mock rounds, offers"],
    ],
  },
];
/** the one accent this section uses */
const FLAME = "#E7000B";
/**
 * The phone rows match the desktop list rather than running their own palette:
 * white cards inset to the page margin, a red "MODULE 0X" label and a near
 * black title. The pale per-module tints that used to colour each bar are gone
 * — three of those title colours sat under 4.5:1, and phone and desktop read
 * as two different products.
 */


/** deck footer, page 7 — the sum of the per-module counts above */
const STATS = [
  ["8", "modules, in sequence"],
  ["70", "three-hour sessions"],
  ["210", "hours of teaching"],
  ["17.5", "weeks, plus practice days"],
];

/** cycled across the concept cards so each one carries a mark, and each mark
 *  its own tint — the only place this section departs from the single accent */
const ICON_COLOURS = [
  { fg: "#E7000B", bg: "rgba(231,0,11,0.10)" },
  { fg: "#1D6FE0", bg: "rgba(29,111,224,0.10)" },
  { fg: "#0E9F6E", bg: "rgba(14,159,110,0.11)" },
  { fg: "#7C3AED", bg: "rgba(124,58,237,0.10)" },
  { fg: "#D97706", bg: "rgba(217,119,6,0.12)" },
  { fg: "#0891B2", bg: "rgba(8,145,178,0.11)" },
];


const ICONS = [
  "M19.75 4A2.25 2.25 0 0 1 22 6.25v11.5A2.25 2.25 0 0 1 19.75 20H4.25A2.25 2.25 0 0 1 2 17.75V6.25A2.25 2.25 0 0 1 4.25 4h15.5Zm-12.47 4.47a.75.75 0 1 0-1.06 1.06L8.69 12l-2.47 2.47a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3ZM11.25 14.25a.75.75 0 0 0 0 1.5H17.25a.75.75 0 0 0 0-1.5h-6Z",
  "M12 2.25 2.25 7 12 11.75 21.75 7 12 2.25Zm9.75 9.25L12 16.25 2.25 11.5M21.75 16 12 20.75 2.25 16",
  "M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm0 0c2.5 2.6 3.75 5.85 3.75 9.75S14.5 19.15 12 21.75m0-19.5C9.5 4.85 8.25 8.1 8.25 12s1.25 7.15 3.75 9.75M2.6 9h18.8M2.6 15h18.8",
  "M12 3c4.14 0 7.5 1.34 7.5 3s-3.36 3-7.5 3-7.5-1.34-7.5-3 3.36-3 7.5-3ZM4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3",
  "M9 3.75a3 3 0 0 0-3 3v.4a3 3 0 0 0-1.5 5.2v.3A3 3 0 0 0 6 18a3 3 0 0 0 6 0V6.75a3 3 0 0 0-3-3Zm6 0a3 3 0 0 1 3 3v.4a3 3 0 0 1 1.5 5.2v.3A3 3 0 0 1 18 18a3 3 0 0 1-6 0V6.75a3 3 0 0 1 3-3Z",
  "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z",
];

const pad = (n) => String(n).padStart(2, "0");

function Chevron({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** the concept cards scroll sideways, with arrows to nudge them */
function ConceptRail({ mod }) {
  const scrollerRef = useRef(null);
  const animRef = useRef(0);

  // native smooth scrolling is unreliable inside a snap container, so the
  // arrows animate scrollLeft directly
  const nudge = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const from = el.scrollLeft;
    const to = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, from + dir * step));
    if (to === from) return;

    cancelAnimationFrame(animRef.current);
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 320);
      el.scrollLeft = from + (to - from) * (1 - Math.pow(1 - t, 3));
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  return (
    <div className="flex flex-col gap-5 rounded-[16px] bg-ink-900/[0.035] py-4 pl-4 sm:p-6">
      <div className="flex items-center justify-between pr-4 sm:pr-0">
        <span className="font-display text-[11px] font-medium uppercase leading-[1.16] tracking-[0.14em] text-ink-900/45 sm:text-[11.5px]">
          In classroom concepts
        </span>
        <div className="flex shrink-0 gap-1 lg:hidden">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => nudge(dir)}
              aria-label={dir < 0 ? "Scroll back" : "Scroll forward"}
              className="grid size-[31px] place-items-center rounded-[9px] border border-ink-900/10 bg-white text-ink-900/70 transition-colors active:bg-ink-900/5"
            >
              <Chevron className={`size-5 sm:size-6 ${dir < 0 ? "rotate-90" : "-rotate-90"}`} />
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={scrollerRef}
        className="flex snap-x gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {mod.topics.map(([name, detail], i) => (
          <li
            key={name}
            className="flex w-[229px] shrink-0 snap-start flex-col gap-3 rounded-[12px] border border-ink-900/8 bg-white p-4 sm:w-[278px] sm:p-5"
          >
            <span
              className="flex size-9 items-center justify-center rounded-[9px]"
              style={{ backgroundColor: ICON_COLOURS[i % ICON_COLOURS.length].bg }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="size-[18px]"
                style={{ color: ICON_COLOURS[i % ICON_COLOURS.length].fg }}
              >
                <path
                  d={ICONS[i % ICONS.length]}
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="font-display text-[15px] font-medium leading-snug text-ink-900">
              {name}
            </p>
            <p className="font-display text-[13px] leading-[1.5] text-ink-900/55">{detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Module({ mod, open, reached, onToggle, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="flex flex-col overflow-hidden rounded-lg border border-[#E4E7EC] bg-white sm:flex-row sm:gap-10 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent"
    >
      {/* mobile: the row header that opens the module */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`module-${mod.id}`}
        className="flex w-full items-center justify-between gap-3 px-4 py-[14px] text-left sm:hidden"
      >
        <span className="flex flex-col gap-1">
          <span className="font-display text-[12px] font-semibold uppercase leading-[1.12] tracking-[1.6px] text-flame">
            Module {pad(mod.id)}
          </span>
          <span className="font-display text-[17px] font-semibold leading-[1.2] text-ink-900">
            {mod.title}
          </span>
        </span>
        <Chevron
          className={`size-6 shrink-0 text-[#16191D] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* desktop: the rail — label, dot and the line down to the next module */}
      <div className="relative hidden w-[72px] shrink-0 sm:block" aria-hidden="true">
        <span
          className={`absolute right-0 top-1 size-3 rounded-full border-2 bg-white transition-colors duration-300 ${
            reached ? "border-flame" : "border-ink-900/20"
          }`}
        />
        <span
          className={`absolute left-0 top-0 whitespace-nowrap font-display text-[14px] font-semibold leading-[1.335] transition-colors duration-300 ${
            reached ? "text-flame" : "text-ink-900/40"
          }`}
        >
          {pad(mod.id)}
        </span>
      </div>

      <div
        id={`module-${mod.id}`}
        className={`min-w-0 flex-1 flex-col gap-5 px-4 pb-5 pt-4 sm:flex sm:px-0 sm:pb-10 sm:pt-0 ${
          open ? "flex" : "hidden"
        }`}
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-20">
          <div className="flex flex-col gap-2">
            <p
              className="hidden font-display text-[30px] font-medium leading-tight tracking-[-0.02em] sm:block lg:text-[34px]"
              style={{ color: FLAME }}
            >
              {mod.title}
            </p>
            <p className="max-w-[460px] font-display text-[14px] leading-[1.6] text-ink-900/70 sm:text-[15px]">
              <span className="font-medium text-ink-900">{mod.lead}</span>{" "}
              <span className="font-medium text-ink-900">{mod.bold}</span> — {mod.promise}
            </p>
            <p className="font-display text-[12.5px] text-ink-900/45">
              {mod.sessions} sessions · {mod.weeks} · {mod.hours} hrs
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-display text-[14px] font-medium leading-[1.33] tracking-[0.25px] text-ink-900 sm:text-[15px]">
              What you&rsquo;ll learn
            </p>
            <div className="flex flex-wrap gap-1.5">
              {mod.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-ink-900/10 bg-white px-2.5 py-1 font-display text-[11.5px] font-medium text-ink-900/70 sm:px-3 sm:py-[5px] sm:text-[12.5px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ConceptRail mod={mod} />

      </div>
    </div>
  );
}

export default function Curriculum() {
  // mobile only: the first module starts open, as on the reference
  const [openId, setOpenId] = useState(MODULES[0].id);

  // the rail's fill and arrow follow the scroll, as they did in the first
  // build of this section
  const trackRef = useRef(null);
  const blockRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(() => MODULES.map((_, i) => i === 0));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      // the arrow follows a point ~45% down the viewport
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
    <section id="curriculum" className="relative z-10 bg-mist px-6 py-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex max-w-[760px] flex-col gap-2">
          <h2 className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:text-[48px]">
            A <span className="font-display font-medium text-flame">Curriculum</span> Built Around
            How Engineers Actually Learn.
          </h2>
          <p className="font-display text-[15px] font-medium leading-[1.6] text-[#5B6271] lg:text-[18px]">
            Eight modules, taught in sequence — each a focused block of three-hour sessions with
            hands-on practice.
          </p>
        </div>

        {/* the deck's own totals */}
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-ink-900/10 py-6 lg:mt-10 lg:grid-cols-4">
          {STATS.map(([value, label]) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="font-display text-[28px] font-medium leading-none tracking-[-0.02em] text-flame lg:text-[34px]">
                {value}
              </dt>
              <dd className="font-display text-[13px] leading-[1.4] text-ink-900/60 lg:text-[14px]">
                {label}
              </dd>
            </div>
          ))}
        </dl>

        <div ref={trackRef} className="relative mt-6 flex flex-col gap-2 sm:mt-10 sm:gap-0">
          {/* the rail the dots sit on — one line for the whole list, with the
              flame fill and its arrow driven by scroll */}
          <span
            aria-hidden="true"
            className="absolute left-[66.5px] top-[10px] hidden w-px bg-[#E1E5EA] sm:block"
            style={{ bottom: "24px" }}
          />
          <span
            aria-hidden="true"
            className="absolute left-[66.5px] top-[10px] hidden w-px origin-top bg-flame sm:block"
            style={{ height: `calc((100% - 34px) * ${progress})` }}
          />
          <span
            aria-hidden="true"
            className="absolute left-[66.5px] z-10 hidden size-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-flame shadow-[0_2px_8px_rgba(231,0,11,0.45)] sm:flex"
            style={{ top: `calc(10px + (100% - 34px) * ${progress})` }}
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

          {MODULES.map((m, i) => (
            <Module
              key={m.id}
              mod={m}
              open={openId === m.id}
              reached={reached[i]}
              onToggle={() => setOpenId((cur) => (cur === m.id ? null : m.id))}
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
