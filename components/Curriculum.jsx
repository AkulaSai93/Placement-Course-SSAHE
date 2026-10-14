"use client";

import { useState } from "react";

/**
 * Curriculum tabs — Figma node 37:943.
 *
 * NOTE: the Figma specifies copy for Semester 1 only, and this section is scoped
 * to Semesters 3 and 4. The projects, skills and subjects below are PLACEHOLDER
 * content carried over from the earlier build — swap them for the real syllabus.
 * `image` is left null on each project until real stills are supplied.
 */
const SEMESTERS = [
  {
    id: 3,
    label: "Semester 3",
    title: "Software Engineering & Cloud",
    projects: [
      {
        name: "Scalable Microservices Backend",
        blurb: "Design, containerise and deploy services that survive real traffic.",
        image: null,
      },
      {
        name: "CI/CD Pipeline & Observability Stack",
        blurb:
          "Automate builds, tests and deployments with monitoring and alerting built in.",
        image: null,
      },
      {
        name: "Distributed Caching Layer",
        blurb: "Cut read latency with a cache that stays correct under concurrent writes.",
        image: null,
      },
    ],
    skills: [
      "System Design",
      "Cloud Computing (AWS)",
      "Docker & Kubernetes",
      "CI/CD",
      "Operating Systems",
      "Computer Networks",
      "Competitive Programming",
    ],
    subjects: [
      "Data Structures & Algorithms II",
      "Operating Systems & Networks",
      "System Design",
      "Cloud Computing (AWS)",
      "DevOps & Containers",
      "Competitive Programming",
    ],
  },
  {
    id: 4,
    label: "Semester 4",
    title: "AI Engineering & Career Accelerator",
    projects: [
      {
        name: "Production GenAI Application",
        blurb: "Build with LLM APIs, retrieval and evaluation wired into the loop.",
        image: null,
      },
      {
        name: "Autonomous AI Agent",
        blurb: "Tool-using agents that plan, act and recover from their own failures.",
        image: null,
      },
      {
        name: "Capstone Product Build",
        blurb: "Ship one substantial product end to end and defend your design choices.",
        image: null,
      },
    ],
    skills: [
      "Machine Learning",
      "Generative AI & LLMs",
      "Retrieval-Augmented Generation",
      "AI Agents & Tooling",
      "Open Source Contribution",
      "Interview Preparation",
    ],
    subjects: [
      "Machine Learning Foundations",
      "Generative AI & LLMs",
      "AI Agents & Tooling",
      "Open Source & GSoC Preparation",
      "Interview & Aptitude Prep",
      "Capstone Project",
    ],
  },
];

function ProjectCard({ project }) {
  return (
    <li className="flex w-[314px] shrink-0 flex-col gap-4 rounded-[11.5px] bg-mist p-[15.6px]">
      <div className="h-[178.8px] w-full overflow-hidden rounded-[9.8px] bg-white">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex size-full items-center justify-center bg-[linear-gradient(135deg,#fafafa_0%,#eceef1_100%)] text-[11px] font-medium uppercase tracking-[0.14em] text-ink-900/25"
          >
            Project still
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[9.4px]">
        <p className="font-display text-[13.1px] font-medium leading-normal tracking-[-0.024em] text-[#1e2022]">
          {project.name}
        </p>
        <p className="font-display text-[11.5px] leading-normal text-[#1e2022]">
          {project.blurb}
        </p>
      </div>
    </li>
  );
}

function SubjectRow({ subject }) {
  return (
    <li className="flex items-center gap-[9.8px] py-[6.6px] pr-[6.6px]">
      <img src="/icons/chevron-right.svg" alt="" width="13" height="13" className="shrink-0" />
      <span className="font-display text-[11.5px] leading-[16.4px] text-[#1e2022]">
        {subject}
      </span>
    </li>
  );
}

export default function Curriculum() {
  const [activeId, setActiveId] = useState(SEMESTERS[0].id);
  const active = SEMESTERS.find((s) => s.id === activeId);
  const half = Math.ceil(active.subjects.length / 2);
  const columns = [active.subjects.slice(0, half), active.subjects.slice(half)];

  return (
    <section id="curriculum" className="bg-mist px-6 py-20">
      <div className="mx-auto flex max-w-[1131px] flex-col items-center gap-10">
        <div className="flex w-full max-w-[699px] flex-col items-center gap-5 text-center text-[#1e2022]">
          <h2 className="font-display text-[32px] font-medium leading-[1.02] tracking-[-0.008em] sm:text-[42px] lg:text-[52px]">
            A <span className="font-accent text-flame">Curriculum</span> Built Around How
            Engineers Actually Learn.
          </h2>
          <p className="font-display text-base leading-normal lg:text-[24px]">
            Learn the fundamentals. Build real projects. Grow your career.
          </p>
        </div>

        <div className="w-full max-w-[927px] overflow-hidden rounded-[16px] bg-white">
          {/* tab strip */}
          <div role="tablist" aria-label="Semesters" className="flex">
            {SEMESTERS.map((sem) => {
              const isActive = sem.id === activeId;
              return (
                <button
                  key={sem.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveId(sem.id)}
                  className={`flex min-h-[67px] flex-1 flex-col items-start gap-[6.6px] px-[18px] py-[11.5px] text-left transition-colors ${
                    isActive
                      ? "bg-flame text-[#f5f5f5]"
                      : "border border-[#e5e5e5] bg-white text-[#1e2022] hover:bg-mist"
                  }`}
                >
                  <span className="font-display text-[11.5px] font-medium uppercase leading-[16.9px]">
                    {sem.label}
                  </span>
                  <span className="font-display text-[11.5px] font-medium leading-[18.7px] tracking-[-0.027em]">
                    {sem.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* panel */}
          <div className="flex flex-col gap-5 border border-[#e5e5e5] border-t-0 p-5">
            <div className="flex flex-col gap-[18.7px]">
              <p className="font-display text-[15.6px] font-medium leading-[18.7px] tracking-[-0.02em] text-[#1e2022]">
                Projects you&apos;ll be working on:
              </p>
              <ul className="no-scrollbar -mx-1 flex gap-[18px] overflow-x-auto px-1 pb-1">
                {active.projects.map((p) => (
                  <ProjectCard key={p.name} project={p} />
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-[18.7px]">
              <p className="font-display text-[15.6px] font-medium leading-[18.7px] tracking-[-0.02em] text-[#1e2022]">
                Skills you&apos;ll Build:
              </p>
              <ul className="flex flex-wrap gap-x-[15.6px] gap-y-5">
                {active.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex h-[31.2px] items-center rounded-[7.8px] border border-flame bg-white px-[9.4px] py-[6.2px]"
                  >
                    <span className="font-display text-[12.5px] font-medium leading-[15px] tracking-[-0.02em] text-flame">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px w-full bg-[#e5e5e5]" />

            <div className="rounded-[9.8px] border border-[#e5e5e5] bg-white p-[9.8px]">
              <div className="flex flex-col gap-[13.1px]">
                <div className="flex items-center gap-[9px]">
                  <span className="flex size-[26.2px] items-center justify-center rounded-[4.4px] bg-white">
                    <img src="/icons/book-text.svg" alt="" width="15" height="15" />
                  </span>
                  <p className="font-display text-[12.5px] font-medium leading-[18.7px] tracking-[-0.02em] text-[#1e2022]">
                    All Subjects
                  </p>
                </div>

                <div className="flex flex-col gap-x-[70px] sm:flex-row sm:items-start">
                  {columns.map((col, i) => (
                    <ul key={i} className="flex w-full flex-col gap-[6.6px] sm:w-[244px]">
                      {col.map((subject) => (
                        <SubjectRow key={subject} subject={subject} />
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
