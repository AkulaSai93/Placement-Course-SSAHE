"use client";

import { useState } from "react";

/**
 * FAQ — Figma node 37:1292.
 * The node only carries the answer copy for the first question; the rest are
 * taken from the live sot.upgrad.com/catalyst FAQ.
 */
const FAQS = [
  {
    q: "Is uGSOT Catalyst the online version of upGrad School of Technology?",
    a: "No. uGSOT Catalyst is a separate 2-year technology accelerator for students who are already enrolled in a college or university. uGSOT Campus is a full time higher education experience combining the university degree, physical campus, academic environment, faculty, student life and the broader uGSOT ecosystem. Catalyst complements your existing college education — it does not replace it.",
  },
  {
    q: "Do I leave my current college?",
    a: "No. Catalyst runs alongside your existing B.Tech / B.E. / BCA / B.Sc. program. You stay enrolled where you are and keep attending your own classes and exams — Catalyst is a parallel technology ecosystem, not a transfer.",
  },
  {
    q: "Is Catalyst a degree?",
    a: "No. Catalyst is a 2-year technology accelerator, not a degree programme. Your degree comes from your college; Catalyst builds the technical profile that sits alongside it.",
  },
  {
    q: "Will uGSOT issue my B.Tech / BCA?",
    a: "No. Your B.Tech or BCA is awarded by the college or university you are enrolled in. uGSOT does not issue the degree and does not affect how your college awards it.",
  },
  {
    q: "How many hours a week does Catalyst need?",
    a: "Plan for roughly 8 to 10 hours a week. Catalyst is built to run on top of a full college timetable, so the work is spread across the week rather than concentrated into fixed daily hours.",
  },
  {
    q: "Is it live or recorded?",
    a: "Both. Live sessions and mentor time are scheduled through the week, and the learning material and project work in ProjectBuilder Pro stay available on demand so you can fit them around your college schedule.",
  },
  {
    q: "Is ICPC selection guaranteed?",
    a: "No. ICPC selection is decided by the contest, not by us. What Catalyst provides is the preparation — structured practice, regular contests, peer leaderboards and team formation — so that you compete as a serious contender rather than an applicant.",
  },
  {
    q: "Is GSoC selection guaranteed?",
    a: "No. GSoC selection rests with the open-source organisations and their mentors. Catalyst builds the contribution history and developer discipline the application is judged on: reading large codebases, finding issues, landing pull requests and working with maintainers.",
  },
  {
    q: "Is an internship guaranteed?",
    a: "Yes. But only to the top 20% students who are judged basis their performance.",
  },
  {
    q: "Is placement guaranteed?",
    a: "No. Catalyst is not a placement programme and does not promise a job. It exists to make you the kind of engineer who gets hired: real shipped projects, a credible GitHub profile, competitive programming depth and career preparation.",
  },
  {
    q: "Can 3rd or 4th year students join?",
    a: "Yes, but Catalyst is designed primarily for Year 1 and Year 2 students, because the two-year arc is what lets skills, projects and a public profile compound before you graduate. Joining later leaves less runway for that to build.",
  },
  {
    q: "What happens after two years?",
    a: "You finish with a technology profile built in public — shipped projects, an open-source contribution record, competitive programming ratings and internship experience — and you carry all of it with you. Your college degree continues on its own timeline.",
  },
  {
    q: "Are campus immersion experiences guaranteed?",
    a: "No. Campus immersions are selective and depend on your progress through the programme. They are an opportunity Catalyst opens up, not an entitlement that comes with enrolment.",
  },
  {
    q: "What's included in ₹50,000/year?",
    a: "The whole programme, not a module of it: programming and maths, DSA, competitive programming and ICPC preparation, full stack development, systems and cloud, AI and GenAI, open source and GSoC guidance, real projects, free access to ProjectBuilder Pro, the AI Mentor, industry mentorship, competitions, Career OS and the internship ecosystem. The total programme fee is ₹1,00,000 across two years.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="bg-mist px-6 py-20 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between lg:gap-10">
        {/* left column */}
        <div className="flex flex-col justify-between gap-10 lg:w-[496px] lg:shrink-0">
          <div className="flex flex-col">
            <h2 className="font-display text-[40px] font-medium leading-[1.15] tracking-[-0.013em] text-black sm:text-[54px] lg:text-[60px] lg:leading-[70px]">
              Got Questions?
            </h2>
            <p className="font-accent text-[40px] font-light leading-[1.15] tracking-[-0.013em] text-flame sm:text-[54px] lg:text-[60px] lg:leading-[70px]">
              We&apos;ve Got Answers
            </p>
          </div>

          {/* start your journey card */}
          <div className="relative w-full max-w-[415.238px] overflow-hidden rounded-[24px] py-[30.476px] pl-[30.476px] pr-[57.143px]">
            <img
              src="/images/journey-card-bg.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.5) 50%, rgba(247,135,141,0.6) 75%, rgba(247,135,141,0.7) 100%)",
              }}
            />

            <div className="relative flex flex-col gap-[26.667px]">
              <div className="flex flex-col gap-[7.619px]">
                <h3 className="font-display text-[24px] font-medium leading-[35.4px] tracking-[-0.017em] text-black sm:text-[28.571px]">
                  Start Your Journey
                </h3>
                <p className="max-w-[327.619px] font-display text-[15.238px] leading-[21.333px] tracking-[-0.01em] text-black/70">
                  A structured path designed to transform ambitious students into industry-ready
                  software engineers.
                </p>
              </div>

              <a
                href="#apply"
                className="group inline-flex w-fit items-center gap-4 bg-ink-900 py-2 pl-[26px] pr-2 transition-colors hover:bg-flame"
              >
                <span className="font-display text-base font-medium text-white">
                  Start Your Journey
                </span>
                <span className="flex size-10 items-center justify-center bg-white text-[17.6px] text-ink-900">
                  <span className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                    ↗
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* accordion */}
        <div className="w-full border-y-[0.952px] border-[#e5e5e5] lg:w-[673px] lg:shrink-0">
          {FAQS.map((item, i) => {
            const open = i === openIndex;
            return (
              <div key={item.q} className="border-b-[0.952px] border-[#e5e5e5] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-[19.048px] text-left"
                >
                  <span className="font-display text-[15px] font-medium leading-[22.857px] text-ink-900">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 text-[19.048px] leading-[26.667px] text-flame transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-[19.048px] font-display text-[15px] leading-normal text-[#555]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
