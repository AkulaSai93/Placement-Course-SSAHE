"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Curriculum — the eight modules of UGSOT LastMile 2026, taken from the
 * programme deck ("What students will learn", pages 4–7) and its at-a-glance
 * table on page 1.
 *
 * Every module carries its own session / week / hour counts; the totals in
 * STATS below are the deck's own footer figures and must stay in step with the
 * per-module numbers (70 sessions, 17.5 weeks, 210 hours).
 *
 * Layout follows the deck: a tinted header band with the module number, title,
 * one-line promise and the three counts, then the numbered topics in two
 * columns (one column on mobile). The scroll rail and its travelling arrow are
 * carried over from the previous build.
 */
const MODULES = [
  {
    id: 1,
    accent: "#1D6FE0",
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
    accent: "#0E9F6E",
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
    accent: "#7C3AED",
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
    accent: "#D97706",
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
    accent: "#0891B2",
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
    accent: "#4F46E5",
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
    accent: "#DB2777",
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
    accent: "#E7000B",
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

/** Deck footer, page 7 — the sum of the per-module counts above. */
const STATS = [
  ["8", "modules, taught in sequence"],
  ["70", "three-hour teaching sessions"],
  ["210", "hours of classroom teaching"],
  ["17.5", "weeks of teaching, plus practice days"],
];

const pad = (n) => String(n).padStart(2, "0");

/** sessions / weeks / hours, as soft outlined pills */
function Meta({ mod, className = "" }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {[`${mod.sessions} sessions`, mod.weeks, `${mod.hours} hrs`].map((item) => (
        <li
          key={item}
          className="whitespace-nowrap rounded-full border border-ink-900/12 bg-white px-4 py-2 font-display text-[13.5px] font-medium text-ink-900/65"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const Module = ({ mod, reached, innerRef, open, onToggle }) => (
  <div ref={innerRef} className="relative grid grid-cols-1 gap-x-10 lg:grid-cols-[132px_1fr]">
    {/* rail / accordion header */}
    <div className="relative lg:pt-1.5">
      {/* mobile: tappable header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`module-${mod.id}-body`}
        className="flex w-full items-center justify-between gap-4 border-t border-ink-900/15 py-4 text-left lg:hidden"
      >
        <span className="flex items-start gap-3.5">
          <span
            className="font-display text-[12px] font-medium leading-6 tabular-nums"
            style={{ color: mod.accent }}
          >
            {pad(mod.id)}
          </span>
          <span className="flex flex-col gap-0.5">
            <span
              className="font-display text-[17px] font-medium leading-tight tracking-[-0.01em]"
              style={{ color: mod.accent }}
            >
              {mod.title}
            </span>
            <span className="font-display text-[12.5px] text-ink-900/55">
              {mod.sessions} sessions · {mod.hours} hrs
            </span>
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
          Module {pad(mod.id)}
        </span>
        <span
          aria-hidden="true"
          className={`size-[11px] shrink-0 rounded-full border-2 bg-white transition-colors duration-300 ${
            reached ? "border-flame" : "border-ink-900/20"
          }`}
        />
      </div>
    </div>

    {/* module body — no card: a rule, a heading row, then the topics */}
    <div
      id={`module-${mod.id}-body`}
      className={`mb-10 lg:mb-16 ${open ? "" : "hidden"} lg:block`}
    >
      {/* heading row */}
      <div className="hidden flex-col gap-3 lg:flex lg:flex-row lg:items-baseline lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-1.5">
          <h3
            className="font-display text-[22px] font-medium leading-tight tracking-[-0.02em] sm:text-[28px]"
            style={{ color: mod.accent }}
          >
            {mod.title}
          </h3>
          <p className="max-w-[560px] font-display text-[14px] leading-[1.55] text-ink-900/60 sm:text-[15px]">
            {mod.promise}
          </p>
        </div>
        <Meta mod={mod} className="shrink-0 lg:justify-end" />
      </div>

      {/* topics */}
      <ol className="mt-2 grid grid-cols-1 gap-x-14 lg:mt-3 lg:grid-cols-2">
        {mod.topics.map(([name, detail], i) => (
          <li key={name} className="flex gap-3.5 py-3">
            <span
              className="w-[18px] shrink-0 font-display text-[12px] font-medium leading-6 tabular-nums"
              style={{ color: mod.accent }}
            >
              {pad(i + 1)}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-display text-[15px] font-medium leading-6 text-ink-900">
                {name}
              </span>
              <span className="font-display text-[13px] leading-[1.5] text-ink-900/55">
                {detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default function Curriculum() {
  const trackRef = useRef(null);
  const blockRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(() => MODULES.map((_, i) => i === 0));
  // mobile accordion: first module open, the rest collapsed
  const [openId, setOpenId] = useState(MODULES[0].id);

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
    <section id="curriculum" className="relative z-10 bg-mist px-6 py-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex max-w-[760px] flex-col gap-4">
          <h2 className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:text-[48px]">
            A <span className="font-accent font-medium text-flame">Curriculum</span> Built Around
            How Engineers Actually Learn.
          </h2>
          <p className="font-display text-[15px] leading-normal text-ink-900/60 lg:text-[18px]">
            Eight modules, taught in sequence — each one a focused block of three-hour sessions
            with hands-on practice.
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

        <div ref={trackRef} className="relative mt-12 pl-6 lg:pl-0">
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

          {MODULES.map((mod, i) => (
            <Module
              key={mod.id}
              mod={mod}
              reached={reached[i]}
              open={openId === mod.id}
              onToggle={() => setOpenId((cur) => (cur === mod.id ? null : mod.id))}
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
