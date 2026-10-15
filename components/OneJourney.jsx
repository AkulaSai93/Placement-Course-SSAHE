"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Why buy 10 different courses" — ported to match the live Catalyst section at
 * sot.upgrad.com/catalyst exactly (markup, sizing and motion read off the
 * deployed DOM).
 *
 * Desktop: the stage is pinned for the length of the scroll track while each
 * card rises from the bottom edge of the deck into its resting spot. The live
 * build does this with a GSAP ScrollTrigger pin (a 3060px pin-spacer holding a
 * 900px stage — 2.4 viewports of scrub); here the same effect comes from a
 * sticky stage plus a scroll-progress scrub, so it needs no animation library
 * and reverses on the way back up just like the original.
 *
 * Mobile: no pin — a plain vertical stack that reveals once.
 *
 * NOTE: the live cards carry no rotation (computed `rotate: none`, transform is
 * pure translate, and no stylesheet rotates them), so none is applied here.
 */
const RED_GRADIENT = "linear-gradient(147deg,#ee1a24 0%,#e6161f 40%,#b90c14 100%)";

// Resting positions as a % of the deck, straight from the live classes.
const CARDS = [
  {
    id: "roadmap",
    title: "One Roadmap",
    body: "A clear, structured path that shows you what to learn, build, and master at every stage.",
    tone: "red",
    left: 10,
    top: 6,
    width: 53,
    z: 1,
  },
  {
    id: "peer",
    title: "One Peer Group",
    body: "Learn, compete, and grow alongside ambitious students who share your drive to become better engineers.",
    tone: "light",
    left: 27,
    top: 24,
    width: 54,
    z: 2,
  },
  {
    id: "mentor",
    title: "One Mentor Ecosystem",
    body: "Get guidance from experienced mentors who help you navigate technical challenges and career decisions.",
    tone: "red",
    left: 36,
    top: 40,
    width: 55,
    z: 3,
  },
  {
    id: "tech",
    title: "One technology journey",
    body: "Go from fundamentals to real-world engineering through coding, projects, AI, open source, and industry exposure.",
    tone: "light",
    left: 12,
    top: 55,
    width: 54,
    z: 4,
  },
];

// Each card scrubs over its own slice of the pinned scroll, overlapping the next.
const CARD_START = 0.22; // slice start, per index
const CARD_SPAN = 0.3; // slice length

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (n) => Math.min(1, Math.max(0, n));

function Card({ card, style, innerRef }) {
  const red = card.tone === "red";
  return (
    <article
      ref={innerRef}
      className={`rounded-xl p-4 shadow-[0_22px_50px_-30px_rgba(10,10,11,0.45)] ring-1 sm:rounded-[1.375rem] sm:p-6 lg:absolute lg:p-7 ${
        red ? "text-white ring-black/10" : "bg-white text-ink-900 ring-ink-900/85"
      } ${card.id === "tech" ? "max-sm:shadow-none" : ""}`}
      style={{
        ...(red ? { backgroundImage: RED_GRADIENT } : null),
        ...style,
      }}
    >
      <h3 className="font-display text-[clamp(1.125rem,1.9vw,1.75rem)] font-medium">
        {card.title}
      </h3>
      <p
        className={`mt-2 text-[clamp(0.8125rem,1.05vw,1rem)] leading-relaxed sm:mt-3 ${
          red ? "text-white/90" : "text-ink-900/60"
        }`}
      >
        {card.body}
      </p>
    </article>
  );
}

export default function OneJourney() {
  const trackRef = useRef(null);
  const deckRef = useRef(null);
  const cardRefs = useRef([]);
  // 0 → nothing revealed, 1 → fully assembled
  const [progress, setProgress] = useState(0);
  const [offsets, setOffsets] = useState(() => CARDS.map(() => 0));
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Each card starts at the bottom edge of the deck and rises to its spot —
  // this reproduces the live build's per-card start offsets (512/423/344/270
  // at a 900px viewport).
  useEffect(() => {
    const measure = () => {
      const deck = deckRef.current;
      if (!deck) return;
      const deckH = deck.getBoundingClientRect().height;
      setOffsets(
        CARDS.map((_, i) => {
          const el = cardRefs.current[i];
          return el ? Math.max(0, deckH - el.offsetTop) : 0;
        })
      );
    };

    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsDesktop(mqDesktop.matches);
      setReduced(mqReduce.matches);
      measure();
    };

    sync();
    mqDesktop.addEventListener("change", sync);
    mqReduce.addEventListener("change", sync);
    window.addEventListener("resize", measure);
    return () => {
      mqDesktop.removeEventListener("change", sync);
      mqReduce.removeEventListener("change", sync);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!isDesktop) {
        // mobile: reveal once the deck is on screen, no scrub
        const deck = deckRef.current;
        if (!deck) return;
        if (deck.getBoundingClientRect().top < window.innerHeight * 0.9) setProgress(1);
        return;
      }
      const travel = Math.max(1, track.offsetHeight - window.innerHeight);
      setProgress(clamp01(-track.getBoundingClientRect().top / travel));
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
  }, [isDesktop, reduced]);

  const cardMotion = (i) => {
    if (reduced) return { opacity: 1 };
    if (!isDesktop) {
      return {
        opacity: progress,
        transform: `translateY(${(1 - progress) * 28}px)`,
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
        transitionDelay: `${i * 110}ms`,
      };
    }
    const local = easeOut(clamp01((progress - i * CARD_START) / CARD_SPAN));
    return {
      opacity: local,
      visibility: local <= 0 ? "hidden" : "visible",
      transform: `translateY(${(1 - local) * offsets[i]}px)`,
    };
  };

  return (
    <section id="one-journey" aria-labelledby="one-journey-heading" className="relative bg-mist">
      {/* desktop: tall track whose length is the pinned scrub distance */}
      <div ref={trackRef} className="relative lg:h-[340svh]">
        <div className="mx-auto flex w-full max-w-[84rem] flex-col px-5 py-16 sm:px-6 lg:sticky lg:top-0 lg:h-[100svh] lg:py-0 lg:pb-12 lg:pt-24">
          <h2
            id="one-journey-heading"
            className="shrink-0 text-balance text-center font-display text-[clamp(1.375rem,3vw,2.5rem)] font-semibold text-ink-900"
          >
            <span className="whitespace-normal sm:whitespace-pre-line">
              {"Why buy 10 different courses\nwhen you can have one"}
            </span>{" "}
            <span className="font-accent text-brand">uGSOT Catalyst</span> journey?
          </h2>

          <div
            ref={deckRef}
            className="mt-7 flex flex-col gap-3 sm:mt-10 sm:gap-4 lg:relative lg:mt-8 lg:block lg:min-h-0 lg:flex-1 lg:gap-0 lg:overflow-hidden"
          >
            {CARDS.map((card, i) => (
              <Card
                key={card.id}
                card={card}
                innerRef={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  ...cardMotion(i),
                  ...(isDesktop
                    ? {
                        left: `${card.left}%`,
                        top: `${card.top}%`,
                        width: `${card.width}%`,
                        zIndex: card.z,
                      }
                    : null),
                }}
              />
            ))}
          </div>

          <div className="mt-7 flex shrink-0 flex-col items-center gap-3 text-center sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:text-left lg:mt-8">
            <p className="max-w-[26rem] text-balance font-display text-[clamp(1rem,1.6vw,1.375rem)] font-bold text-ink-900">
              Stop collecting courses. Start becoming an{" "}
              <span className="font-accent text-brand">engineer.</span>
            </p>
            <div className="flex shrink-0 flex-col items-center sm:items-start">
              <p className="flex items-baseline gap-1">
                <span className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold text-brand">
                  ₹50,000
                </span>
                <span className="text-[clamp(0.75rem,1vw,0.9375rem)] text-ink-900/60">/year</span>
              </p>
              <p className="mt-1.5 font-display text-[clamp(0.75rem,1vw,0.8125rem)] text-ink-900/60">
                Total program fee ₹1,00,000 · ≈ ₹137/day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
