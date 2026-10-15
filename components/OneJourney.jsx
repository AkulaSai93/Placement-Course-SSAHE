"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Why buy 10 different courses" — Figma node 751:424.
 *
 * Four cards sit in a scattered, overlapping stack. The desktop geometry is the
 * design's: each card is 755x222 inside a 1145x793 field, placed by its centre
 * and rotated. Positions are stored as percentages so the field can scale with
 * the viewport between `lg` and the 1280px shell.
 *
 * Below `lg` the scatter is dropped for a legible vertical stack.
 *
 * As the section scrolls into view each card rises 44px and fades in, one after
 * the next, then stays put — matching the motion on sot.upgrad.com/catalyst.
 */
// Motion matched to the live Catalyst page: each card rises and fades in, one
// clearly after the next, and settles once — it does not replay on the way back
// up. The stagger is wide enough that the cards read as arriving individually.
const RISE_PX = 44;
const STAGGER_MS = 220;

const RED_GRADIENT =
  "linear-gradient(163.6145683629473deg, rgb(231, 0, 11) 0%, rgb(193, 0, 7) 50%, rgb(159, 7, 18) 100%)";

// `x`/`y` are the card's top-left corner as a % of the field, derived from the
// Figma 1145x793 layout. Height is content-driven so the field can shrink to fit
// one viewport. `z` is paint order (Peer Group on top, technology journey last).
const CARD_W_PCT = 65.94; // 755 / 1145
const CARD_H_PCT = 27.99; // 222 / 793
const CARDS = [
  {
    id: "roadmap",
    title: "One Roadmap",
    body: "A clear, structured path that shows you what to learn, build, and master at every stage.",
    tone: "red",
    x: 0,
    y: 0,
    rotate: 0,
    z: 3,
  },
  {
    id: "peer",
    title: "One Peer Group",
    body: "Learn, compete, and grow alongside ambitious students who share your drive to become better engineers.",
    tone: "light",
    x: 22.01,
    y: 22.28,
    rotate: 2.93,
    z: 4,
  },
  {
    id: "mentor",
    title: "One Mentor Ecosystem",
    body: "Get guidance from experienced mentors who help you navigate technical challenges and career decisions.",
    tone: "red",
    x: 33.27,
    y: 43.88,
    rotate: -5.54,
    z: 2,
  },
  {
    id: "tech",
    title: "One technology journey",
    body: "Go from fundamentals to real-world engineering through coding, projects, AI, open source, and industry exposure.",
    tone: "light",
    x: 3.12,
    y: 69.6,
    rotate: 2.93,
    z: 1,
  },
];

/**
 * One card. On desktop `scaled` switches every dimension to container-query
 * units so the type, padding and radius keep the Figma ratios (relative to the
 * 755px card) no matter how far the field is scaled down to fit the viewport.
 */
function CardFace({ card, className = "", style, scaled = false }) {
  const red = card.tone === "red";
  return (
    <div
      className={`overflow-hidden border-2 border-solid border-black ${
        red ? "" : "bg-white"
      } ${scaled ? "[container-type:inline-size] rounded-[2.38cqw]" : "rounded-[18px]"} ${className}`}
      style={{ ...(red ? { backgroundImage: RED_GRADIENT } : null), ...style }}
    >
      <div
        className={`flex flex-col ${red ? "text-white" : "text-ink-900"} ${
          scaled ? "gap-[3.97cqw] p-[5.03cqw]" : "gap-4 p-6 sm:gap-[30px]"
        }`}
      >
        <p
          className={`font-display font-medium tracking-[-0.416px] ${
            scaled
              ? "text-[5.3cqw] leading-[1.331]"
              : "text-[22px] leading-tight sm:text-[28px]"
          }`}
        >
          {card.title}
        </p>
        <p
          className={`font-display ${
            scaled ? "text-[3.18cqw] leading-normal" : "text-[15px] leading-[1.45] sm:text-[17px]"
          }`}
        >
          {card.body}
        </p>
      </div>
    </div>
  );
}

export default function OneJourney() {
  const stackRef = useRef(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setSettled(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSettled(true);
          io.disconnect();
        }
      },
      // threshold 0 with no rootMargin. A non-zero threshold only reports a
      // *crossing*, so a reload landing mid-section would leave the cards
      // invisible forever; a rootMargin suppressed the callback entirely in
      // some engines. This combination always delivers the initial callback.
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="one-journey" className="bg-mist px-6 py-20 lg:px-20 lg:py-0">
      <div
        ref={stackRef}
        className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 lg:h-[100svh] lg:min-h-[680px] lg:max-h-[940px] lg:justify-between lg:gap-6 lg:py-4"
      >
        <h2 className="max-w-[1084px] text-center font-display text-[28px] font-medium leading-[1.15] tracking-[-0.416px] text-ink-900 sm:text-[38px] lg:text-[52px] lg:leading-[1.024]">
          Why buy 10 different courses
          <br className="hidden sm:block" />{" "}
          <span className="lg:whitespace-nowrap">
            when you can have one{" "}
            <span className="font-accent font-medium text-flame">uGSOT Catalyst</span> journey?
          </span>
        </h2>

        {/* mobile: plain vertical stack */}
        <ul className="flex w-full flex-col gap-4 lg:hidden">
          {CARDS.map((card, i) => (
            <li
              key={card.id}
              className="transition-[transform,opacity] duration-700 ease-out"
              style={{
                transitionDelay: `${i * STAGGER_MS}ms`,
                opacity: settled ? 1 : 0,
                transform: settled ? "translateY(0)" : `translateY(${RISE_PX}px)`,
              }}
            >
              <CardFace card={card} />
            </li>
          ))}
        </ul>

        {/* desktop: the design's scattered field */}
        <div className="hidden w-full lg:flex lg:min-h-0 lg:flex-1 lg:items-center lg:justify-center">
          <ul className="relative h-full max-w-[1145px] aspect-[1145/793]">
          {CARDS.map((card, i) => (
            <li
              key={card.id}
              className="absolute"
              style={{
                left: `${card.x}%`,
                top: `${card.y}%`,
                width: `${CARD_W_PCT}%`,
                height: `${CARD_H_PCT}%`,
                zIndex: card.z,
              }}
            >
              <div
                className="size-full transition-[transform,opacity] duration-700 ease-out"
                style={{
                  transitionDelay: `${i * STAGGER_MS}ms`,
                  opacity: settled ? 1 : 0,
                  transform: settled ? "translateY(0)" : `translateY(${RISE_PX}px)`,
                }}
              >
                <CardFace
                  card={card}
                  scaled
                  className="size-full"
                  style={{ transform: `rotate(${card.rotate}deg)` }}
                />
              </div>
            </li>
          ))}
          </ul>
        </div>

        <div className="flex w-full max-w-[1145px] flex-col items-center gap-8 text-center lg:flex-row lg:justify-center lg:gap-[132px] lg:text-left">
          <p className="max-w-[473px] font-accent text-[22px] font-medium leading-normal text-ink-900 lg:w-[473px] lg:text-[32px]">
            Stop collecting courses. Start becoming an{" "}
            <span className="text-flame">engineer.</span>
          </p>

          <div className="flex flex-col items-center gap-2 lg:w-[287px] lg:items-start">
            <p className="flex items-baseline whitespace-nowrap font-display text-brand">
              <span className="text-[44px] font-bold tracking-[-1.16px] lg:text-[58px]">
                ₹50,000
              </span>
              <span className="ml-1 font-medium text-[17px] text-[#444] lg:text-[20px]">/year</span>
            </p>
            <p className="font-display text-[13px] text-[#444] lg:text-[15px]">
              Total program fee ₹1,00,000 · ≈ ₹137/day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
