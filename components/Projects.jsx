"use client";

import { useEffect, useRef } from "react";

/**
 * Projects — the ten builds from "UGSOT LaunchReady 2026 - Projects" (the
 * project sheet), as their own section after the curriculum.
 *
 * Cards follow the Catalyst page's "Projects you'll be working on" row: a
 * light card, a 3:2 product-mockup image with rounded corners, then the
 * words. Each card here also carries the sheet's level, module, description
 * and tech tags. The images were generated in Figma AI in the Catalyst style
 * (3D app mockups on a pastel ground in a dark frame) and live in
 * /public/projects/launchready.
 *
 * The row scrolls sideways with arrows, as the concept and mentor rails do.
 */
const PROJECTS = [
  {
    name: "Rule-Based Chatbot",
    tagline: "Build your first chatbot",
    module: "Programming",
    level: "Beginner",
    image: "01-chatbot",
    description:
      "Build a command-line assistant that understands what you type and replies, using your own pattern-matching logic. Later in the programme, you upgrade it to a real AI model.",
    tags: ["Python", "Functions", "String Handling", "Logic Building"],
  },
  {
    name: "Email Automation Tool",
    tagline: "Put your emails on autopilot",
    module: "Programming",
    level: "Intermediate",
    image: "02-email-automation",
    description:
      "Send personalised emails to a whole contact list from a CSV, with HTML templates, scheduled sends and automatic retries when something fails.",
    tags: ["Python", "File Handling", "Automation", "Error Handling"],
  },
  {
    name: "Typing Speed Race",
    tagline: "How fast can you really type?",
    module: "Web Essentials",
    level: "Beginner",
    image: "03-typing-race",
    description:
      "Type a random sentence against the clock and watch each letter turn green or red as you go. Finish to see your words per minute and accuracy, with a new sentence every round.",
    tags: ["HTML", "CSS", "JavaScript", "DOM Events", "Timers"],
  },
  {
    name: "Drag-and-Drop Task Board",
    tagline: "Your own drag-and-drop task board",
    module: "Web Essentials",
    level: "Intermediate",
    image: "04-task-board",
    description:
      "Add tasks, drag them across To Do, Doing and Done, and find everything right where you left it after a refresh.",
    tags: ["JavaScript", "DOM", "Drag and Drop", "Local Storage"],
  },
  {
    name: "Trip Expense Splitter",
    tagline: "Settle trip expenses in seconds",
    module: "Full Stack Development",
    level: "Intermediate",
    image: "05-expense-splitter",
    description:
      "Log a trip’s expenses and who paid, and the app works out the fewest payments to settle up, like “Rahul pays Anita ₹500”.",
    tags: ["React", "State Management", "Algorithms"],
  },
  {
    name: "Movie Watchlist",
    tagline: "Never forget a movie again",
    module: "Full Stack Development",
    level: "Intermediate",
    image: "06-movie-watchlist",
    description:
      "Search any movie, add it to your watchlist, mark it watched and rate it, with smart filters and sorting.",
    tags: ["React", "Hooks", "APIs", "Search"],
  },
  {
    name: "URL Shortener",
    tagline: "Short links with click analytics",
    module: "Full Stack Development",
    level: "Intermediate",
    image: "07-url-shortener",
    description:
      "Build a service that turns long links into short ones, redirects visitors instantly and tracks clicks on every link.",
    tags: ["Node.js", "Express", "REST APIs", "MongoDB"],
  },
  {
    name: "Login & Authentication System",
    tagline: "Secure login, built from scratch",
    module: "Full Stack Development",
    level: "Intermediate",
    image: "08-auth-system",
    description:
      "Build a complete sign-up and login system with safely stored passwords, login tokens and pages only members or admins can open. Reuse it in every project after this.",
    tags: ["Node.js", "Express", "Authentication", "Security"],
  },
  {
    name: "Campus Lost & Found Portal",
    tagline: "Campus lost and found, powered by AI",
    module: "Capstone",
    level: "Advanced",
    image: "09-lost-and-found",
    description:
      "A full campus platform to report lost and found items with photos, search posts, claim items and moderate as an admin. AI matches lost items with found ones automatically.",
    tags: ["MERN Stack", "Authentication", "Image Uploads", "AI Matching"],
  },
  {
    name: "Study Group Finder",
    tagline: "Find your study group, powered by AI",
    module: "Capstone",
    level: "Advanced",
    image: "10-study-group",
    description:
      "Find or create study groups by subject and time, chat with members and get session reminders. An AI study assistant summarises shared notes and turns them into practice quizzes.",
    tags: ["MERN Stack", "Real-Time Chat", "Email Reminders", "Generative AI"],
  },
];

/** the short chip label for the long module name */
const SHORT = { "Full Stack Development": "Full Stack" };

/** one colour per level, the same green / amber / red a difficulty usually reads as */
const LEVELS = {
  Beginner: { ink: "#067647", bg: "#ECFDF3" },
  Intermediate: { ink: "#B54708", bg: "#FFFAEB" },
  Advanced: { ink: "#C01048", bg: "#FFF1F3" },
};

function Chevron({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectCard({ project }) {
  const level = LEVELS[project.level];
  return (
    // tabIndex lets a tap on a phone (no hover there) focus the card and
    // reveal the description the same way a mouse does
    <article
      tabIndex={0}
      aria-label={`${project.name}: ${project.description}`}
      className="group relative flex w-[264px] shrink-0 snap-start flex-col overflow-hidden rounded-[12px] border border-ink-900/[0.08] bg-white p-3 outline-none transition-shadow hover:shadow-[0_12px_32px_-12px_rgba(10,10,11,0.25)] focus-visible:ring-2 focus-visible:ring-ink-900/30 sm:w-[300px]"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[8px] bg-ink-900/5">
        <img
          src={`/projects/launchready/${project.image}.jpg`}
          alt={`${project.name} — ${project.tagline}`}
          width="900"
          height="600"
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
          decoding="async"
        />

      </div>

      {/* level and module, just above the name — on the image they were
          hard to read against the artwork */}
      <div className="mt-3 flex gap-1.5 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0">
        <span
          className="rounded-full px-2 py-0.5 font-display text-[11px] font-semibold"
          style={{ backgroundColor: level.bg, color: level.ink }}
        >
          {project.level}
        </span>
        <span className="rounded-full bg-mist px-2 py-0.5 font-display text-[11px] font-medium text-ink-900/65">
          {SHORT[project.module] || project.module}
        </span>
      </div>

      <h3 className="mt-2 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0 font-display text-[16px] font-semibold leading-snug text-ink-900">
        {project.name}
      </h3>
      <p className="mt-0.5 font-display text-[13px] font-medium text-flame transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0">{project.tagline}</p>
      {/* two lines keep every card the same short height; the full text
          appears over the image on hover */}
      <p
        className="mt-1.5 line-clamp-2 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0 font-display text-[13px] leading-[1.5] text-ink-900/60"
      >
        {project.description}
      </p>

      {/* one row of tags: the first two, then a count of the rest */}
      <ul className="mt-auto flex gap-1.5 overflow-hidden pt-3 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0" aria-label={project.tags.join(", ")}>
        {project.tags.slice(0, 2).map((tag) => (
          <li
            key={tag}
            className="shrink-0 whitespace-nowrap rounded-full border border-ink-900/10 px-2.5 py-1 font-display text-[11.5px] font-medium text-ink-900/65"
          >
            {tag}
          </li>
        ))}
        {project.tags.length > 2 ? (
          <li
            aria-hidden="true"
            className="shrink-0 rounded-full bg-mist px-2.5 py-1 font-display text-[11.5px] font-medium text-ink-900/55"
          >
            +{project.tags.length - 2}
          </li>
        ) : null}
      </ul>

      {/* hover or tap: the whole description and every tag slide up over
          the card, so it keeps its height and the row never jumps */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex translate-y-3 flex-col justify-end rounded-[12px] bg-gradient-to-t from-ink-900/[0.92] from-45% via-ink-900/70 via-70% to-ink-900/10 p-5 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"
      >
        {/* the level and module again, since the panel covers the card's own */}
        <div className="mb-2.5 flex gap-1.5">
          <span
            className="rounded-full px-2 py-0.5 font-display text-[11px] font-semibold"
            style={{ backgroundColor: level.bg, color: level.ink }}
          >
            {project.level}
          </span>
          <span className="rounded-full bg-white px-2 py-0.5 font-display text-[11px] font-medium text-ink-900/75">
            {SHORT[project.module] || project.module}
          </span>
        </div>
        <p className="font-display text-[15px] font-semibold leading-snug text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">{project.name}</p>
        <p className="mt-2 font-display text-[13.5px] leading-[1.6] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">{project.description}</p>
        {/* and every tag, not just the first two shown under the card */}
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white/20 px-2 py-0.5 font-display text-[11px] font-medium text-white backdrop-blur-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Projects() {
  const railRef = useRef(null);
  const animRef = useRef(0);
  const animTargetRef = useRef(null);

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  // native smooth scrolling is unreliable inside a snap container, so the
  // arrows animate scrollLeft directly, one card at a time
  const nudge = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const cards = [...el.children];
    if (!cards.length) return;

    // step card to card by their real positions, so a second tap mid-glide
    // still lands exactly on a card rather than between two
    const stops = cards.map((c) => c.offsetLeft - cards[0].offsetLeft);
    const max = el.scrollWidth - el.clientWidth;
    const here = animTargetRef.current ?? el.scrollLeft;
    // the next card start past where the row is now, in the arrow's
    // direction — the row's end is rarely a card start, so going back from
    // there must land on the card just before it, not skip one
    const target =
      dir > 0
        ? stops.find((x) => x > here + 1) ?? max
        : [...stops].reverse().find((x) => x < Math.min(here, max) - 1) ?? 0;
    const to = Math.max(0, Math.min(max, target));
    const from = el.scrollLeft;
    if (Math.abs(to - from) < 1) return;

    // Scroll snapping is switched off for the length of the glide: with it on,
    // a phone snaps after every per-frame scrollLeft write, which is what made
    // the motion stutter and jump. It comes back once the row has arrived.
    cancelAnimationFrame(animRef.current);
    el.style.scrollSnapType = "none";
    animTargetRef.current = to;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 360);
      el.scrollLeft = from + (to - from) * (1 - Math.pow(1 - t, 3));
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        animTargetRef.current = null;
        el.style.scrollSnapType = "";
      }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-mist px-6 py-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[760px] flex-col gap-2">
            <h2
              id="projects-heading"
              className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:text-[48px]"
            >
              <span className="text-flame">Projects</span> You&rsquo;ll Build.
            </h2>
            <p className="font-display text-[15px] font-medium leading-[1.6] text-[#5B6271] lg:text-[18px]">
              Ten hands-on builds, from your first chatbot to two AI-powered capstones.
            </p>
          </div>

          <div className="hidden shrink-0 gap-2 lg:flex">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => nudge(dir)}
                aria-label={dir < 0 ? "Previous projects" : "Next projects"}
                className="flex size-11 items-center justify-center rounded-full border border-[#D0D5DD] bg-white text-ink-900 transition-colors hover:border-ink-900/40 hover:bg-ink-900/5"
              >
                <Chevron className={`size-5 ${dir < 0 ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={railRef}
          className="-mx-6 mt-8 flex snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:scroll-pl-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>

        {/* phones: the arrows sit under the row, centred, as the mentor rail's do */}
        <div className="mt-4 flex justify-center gap-3 lg:hidden">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => nudge(dir)}
              aria-label={dir < 0 ? "Previous projects" : "Next projects"}
              className="flex size-11 items-center justify-center rounded-full border border-[#D0D5DD] bg-white text-ink-900"
            >
              <Chevron className={`size-5 ${dir < 0 ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
