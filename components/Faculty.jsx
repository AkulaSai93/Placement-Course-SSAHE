"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Mentor rail — Figma node 1193:4280 (Catalyst file).
 *
 * Every card keeps its own photo offset/size, text-block width and logo row
 * layout. Each logo carries the width, height and crop inset Figma applies to
 * it, since the same logo is cropped differently from card to card.
 */

// Shared crop presets, keyed by the Figma image they come from.
const CROP = {
  linkedin: { w: "125.42%", h: "290.7%", left: "-12.37%", top: "-95.93%" },
  walmart: { w: "106.87%", h: "232.01%", left: "-3.42%", top: "-66.17%" },
  paypal: { w: "123.56%", h: "297.62%", left: "-12.03%", top: "-100.6%" },
  oracle: { w: "112.1%", h: "366.67%", left: "-6.76%", top: "-129.17%" },
  vmware: { w: "100%", h: "306.48%", left: "0%", top: "-120.95%" },
  microsoft: { w: "123.08%", h: "188.13%", left: "-11.54%", top: "-45.81%" },
  google: { w: "104.75%", h: "120.19%", left: "-2.79%", top: "-10.77%" },
  maybank: { w: "100%", h: "457.14%", left: "0%", top: "-179.46%" },
  ailinc: { w: "111.11%", h: "165.29%", left: "-11.11%", top: "-26.45%" },
  barclays: { w: "123.33%", h: "421.05%", left: "-11.72%", top: "-159.47%" },
};

const L = {
  linkedin: { src: "/logos/linkedin.webp", name: "LinkedIn", crop: CROP.linkedin },
  walmart: { src: "/logos/walmart.webp", name: "Walmart", crop: CROP.walmart },
  upgradSot: { src: "/logos/upgrad-sot.webp", name: "upGrad School of Technology" },
  paypal: { src: "/logos/paypal.webp", name: "PayPal", crop: CROP.paypal },
  oracle: { src: "/logos/oracle.webp", name: "Oracle", crop: CROP.oracle },
  physicsWallah: { src: "/logos/physics-wallah.webp", name: "Physics Wallah" },
  hotstar: { src: "/logos/hotstar.webp", name: "Hotstar" },
  vmware: { src: "/logos/vmware.webp", name: "VMware", crop: CROP.vmware },
  microsoft: { src: "/logos/microsoft.webp", name: "Microsoft", crop: CROP.microsoft },
  digitalocean: { src: "/logos/digitalocean.webp", name: "DigitalOcean" },
  pinnum: { src: "/logos/pinnum.webp", name: "Pinnum" },
  hcltech: { src: "/logos/hcltech.webp", name: "HCLTech" },
  ibm: { src: "/logos/ibm.webp", name: "IBM" },
  google: { src: "/logos/google.webp", name: "Google", crop: CROP.google },
  tiger: { src: "/logos/tiger-analytics.webp", name: "Tiger Analytics" },
  maybank: { src: "/logos/maybank.webp", name: "Maybank", crop: CROP.maybank },
  salesforce: { src: "/logos/salesforce.webp", name: "Salesforce" },
  ailinc: { src: "/logos/ailinc.webp", name: "AILinc", crop: CROP.ailinc },
  barclays: { src: "/logos/barclays.webp", name: "Barclays", crop: CROP.barclays },
  cisco: { src: "/logos/cisco.webp", name: "Cisco" },
  ineuron: { src: "/logos/ineuron.webp", name: "iNeuron" },
};

/** size helper: stores the exact Figma frame for each logo */
const s = (logo, w, h) => ({ ...logo, w, h });

/** Logos keep Figma's relative sizes, scaled down a little as a set. */
const LOGO_SCALE = 0.85;

const COPY_LIFT = 0;
const CARD_H = 426;

/** every card's logo row ends this far above the card's bottom edge */
const LOGO_BOTTOM = 24;

const FACULTY = [
  {
    name: "Vishwa Mohan",
    role: "CEO of upGrad SOT",
    photo: { src: "/faculty/vishwa-mohan.webp", size: 273, top: 0, offset: -0.5 },
    text: { left: 20, top: 285, width: 223.813, gap: 20, align: "center", nameWidth: 136 },
    logoRows: [
      [s(L.linkedin, 78.227, 22.5), s(L.walmart, 86.834, 22.5), s(L.upgradSot, 78.049, 25)],
      [s(L.paypal, 81.295, 22.5), s(L.oracle, 131.719, 22.5), s(L.physicsWallah, 24.802, 25)],
    ],
  },
  {
    name: "Rishi Saraf",
    role: "Cofounder & CEO DevDynamics",
    photo: { src: "/faculty/rishi-saraf.webp", size: 273, top: 0, offset: 0.5 },
    text: { left: 20, top: 285, width: 277, gap: 20 },
    wrap: true,
    logoRows: [
      [
        s(L.upgradSot, 78.049, 25),
        s(L.hotstar, 74.766, 25),
        s(L.vmware, 127.681, 25),
        s(L.walmart, 96.482, 25),
      ],
    ],
  },
  {
    name: "Vivek Sridhar",
    role: "CTO - Microsoft for Startups | AI Advisor | Investor Founder",
    photo: { src: "/faculty/vivek-sridhar.webp" },
    // the masked composite is 246.961 wide vs 273 for the plain portraits —
    // scale it so every mentor reads at the same size
    groupScale: 273 / 246.961,
    shape: { left: 37.02, top: 49.99, width: 246.961, height: 204.363 },
    // Figma draws the shape, then the photo's top portion, then the photo
    // masked to that same shape.
    layers: [
      {
        left: 46.56,
        top: 8.65,
        width: 228.942,
        height: 171.707,
        img: { w: "113.56%", h: "151.42%", left: "0%", top: "-8.33%" },
      },
      {
        left: 46.56,
        top: 8.65,
        width: 228.942,
        height: 246.113,
        mask: { position: "-9.54px 41.336px", size: "246.961px 204.363px" },
        img: { w: "113.56%", h: "105.64%", left: "0%", top: "-5.81%" },
      },
    ],
    text: { top: 282, width: 279, gap: 16, centered: true },
    wrap: true,
    logoRows: [
      [
        s(L.microsoft, 104, 25),
        s(L.digitalocean, 25, 25),
        s(L.pinnum, 53.541, 25),
        s(L.hcltech, 25, 25),
        s(L.ibm, 66.946, 25),
      ],
    ],
  },
  {
    name: "Divyansh Dubey",
    role: "Gen AI @ Google",
    photo: { src: "/faculty/divyansh-dubey.webp", size: 273, top: 0, offset: -0.5 },
    text: { top: 281.66, width: 279, height: 118, centered: true, spread: true },
    logoRows: [[s(L.google, 68.846, 25), s(L.tiger, 50, 25), s(L.maybank, 114.286, 25)]],
    logoGap: 12,
  },
  {
    name: "Gaurav Kaushik",
    role: "Senior Staff Software Engineer & Problem Solving Track Lead",
    photo: { src: "/faculty/gaurav-kaushik.webp", size: 273, top: 0, offset: 0.5 },
    text: { left: 20, top: 285, width: 277, gap: 20 },
    logoRows: [[s(L.salesforce, 32.143, 22.5), s(L.microsoft, 104, 25), s(L.paypal, 81.295, 22.5)]],
  },
  {
    name: "Shubham Lal",
    role: "Founder AILinc | Former Developer at Microsoft",
    photo: { src: "/faculty/shubham-lal.webp" },
    groupScale: 273 / 246.961,
    shape: { left: 37.02, top: 50.65, width: 246.961, height: 204.363 },
    layers: [
      {
        left: 41.02,
        top: 8.65,
        width: 246,
        height: 171,
        img: { w: "100.04%", h: "143.92%", left: "0%", top: "0%" },
      },
      {
        left: 41.02,
        top: 8.65,
        width: 246.11,
        height: 246.11,
        mask: { position: "-4px 42px", size: "246.961px 204.363px" },
        cover: true,
      },
    ],
    text: { top: 281.66, width: 279, height: 118, centered: true, spread: true },
    wrap: true,
    logoRows: [[s(L.microsoft, 104, 25), s(L.ailinc, 44.628, 30)]],
  },
  {
    name: "Gladden Rumao",
    role: "Staff Software AI Engineer",
    photo: { src: "/faculty/gladden-rumao.webp", size: 273, top: 3, offset: -0.5 },
    text: { left: 20, top: 289, width: 224, height: 118, gap: 40 },
    logoRows: [[s(L.upgradSot, 78.049, 25), s(L.barclays, 128.026, 25)]],
    logoGap: 12,
  },
  {
    name: "Mithun S",
    role: "SDE II at Cisco",
    photo: { src: "/faculty/mithun-s.webp", size: 273, top: 0, offset: -0.5 },
    text: { left: 20, top: 284.66, width: 224, height: 118, spread: true, align: "center", nameWidth: 136 },
    logoRows: [
      [s(L.cisco, 43.892, 25), s(L.physicsWallah, 24.802, 25), s(L.ineuron, 107.693, 29.399)],
    ],
    logoGap: 12,
  },
  {
    name: "Rishab Bafna",
    role: "Senior AI Engineer & Lead Instructor",
    photo: { src: "/faculty/rishab-bafna.webp", size: 273, top: 15, offset: -0.5 },
    text: { left: 20, top: 285, width: 224, height: 118, gap: 32, justifyEnd: true },
    logoRows: [[s(L.upgradSot, 99.902, 32)]],
  },
  {
    name: "Piyush Jain",
    role: "Senior Mathematician and Lead Instructor",
    photo: { src: "/faculty/piyush-jain.webp", size: 273, top: 7, offset: -0.5 },
    text: { left: 20, top: 292, width: 224, height: 118, spread: true },
    logoRows: [[s(L.upgradSot, 99.902, 32)]],
  },
  {
    name: "Rahul Yadav",
    role: "SDE 2 + Lead Instructor",
    photo: { src: "/faculty/rahul-yadav.webp", size: 273, top: 0, offset: -0.5 },
    text: { left: 20, top: 285, width: 224, height: 118, spread: true },
    logoRows: [[s(L.upgradSot, 99.902, 32)]],
  },
  {
    name: "Jyoti Nigam",
    role: "Data Scientist at upGrad SOT",
    photo: { src: "/faculty/jyoti-nigam.webp", size: 273, top: 0, offset: -0.5 },
    text: { left: 20, top: 285, width: 224, height: 118, spread: true },
    logoRows: [[s(L.upgradSot, 99.902, 32)]],
  },
];

function Logo({ logo }) {
  return (
    <li
      className="relative shrink-0"
      style={{ width: `${logo.w * LOGO_SCALE}px`, height: `${logo.h * LOGO_SCALE}px` }}
    >
      {logo.crop ? (
        <span className="pointer-events-none absolute inset-0 block overflow-hidden">
          <img
            src={logo.src}
            alt={logo.name}
            className="absolute max-w-none"
            style={{
              width: logo.crop.w,
              height: logo.crop.h,
              left: logo.crop.left,
              top: logo.crop.top,
            }}
            loading="lazy"
          decoding="async"
          />
        </span>
      ) : (
        <img
          src={logo.src}
          alt={logo.name}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain object-left"
          loading="lazy"
        decoding="async"
        />
      )}
    </li>
  );
}

function FacultyCard({ person }) {
  const t = person.text;
  const photo = person.photo;

  return (
    <article className="relative w-[320px] shrink-0 overflow-hidden rounded-[14px] bg-white"
      style={{ height: `${CARD_H}px` }}>
      {/* portrait */}
      {photo.size ? (
        /* centred square portrait */
        <div
          className="absolute left-1/2 overflow-hidden"
          style={{
            top: `${photo.top}px`,
            width: `${photo.size}px`,
            height: `${photo.size}px`,
            transform: `translateX(calc(-50% + ${photo.offset}px))`,
          }}
        >
          <img
            src={photo.src}
            alt={person.name}
            className="pointer-events-none absolute inset-0 size-full object-cover"
            loading="lazy"
          decoding="async"
          />
        </div>
      ) : person.layers ? (
        /* red shape + the photo's top portion + the photo masked to the shape */
        <span
          className="pointer-events-none absolute inset-0 block"
          style={{
            transform: `translateY(-11px) scale(${person.groupScale})`,
            transformOrigin: "160px 0px",
          }}
        >
          <img
            src="/faculty/card-shape.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              left: `${person.shape.left}px`,
              top: `${person.shape.top}px`,
              width: `${person.shape.width}px`,
              height: `${person.shape.height}px`,
            }}
          decoding="async"
          loading="lazy"
          />
          {person.layers.map((layer, i) => (
            <span
              key={i}
              className="pointer-events-none absolute block overflow-hidden"
              style={{
                left: `${layer.left}px`,
                top: `${layer.top}px`,
                width: `${layer.width}px`,
                height: `${layer.height}px`,
                ...(layer.mask
                  ? {
                      maskImage: "url(/faculty/card-mask.svg)",
                      WebkitMaskImage: "url(/faculty/card-mask.svg)",
                      maskPosition: layer.mask.position,
                      WebkitMaskPosition: layer.mask.position,
                      maskSize: layer.mask.size,
                      WebkitMaskSize: layer.mask.size,
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                    }
                  : null),
              }}
            >
              {layer.cover ? (
                <img
                  src={photo.src}
                  alt={i === 0 ? person.name : ""}
                  className="absolute inset-0 size-full max-w-none object-cover"
                  loading="lazy"
                decoding="async"
                />
              ) : (
                <img
                  src={photo.src}
                  alt={i === 0 ? person.name : ""}
                  className="absolute max-w-none"
                  style={{
                    width: layer.img.w,
                    height: layer.img.h,
                    left: layer.img.left,
                    top: layer.img.top,
                  }}
                  loading="lazy"
                decoding="async"
                />
              )}
            </span>
          ))}
        </span>
      ) : (
        /* plain positioned portrait */
        <img
          src={photo.src}
          alt={person.name}
          className="pointer-events-none absolute object-cover"
          style={{
            left: `${photo.left}px`,
            top: `${photo.top}px`,
            width: `${photo.width}px`,
            height: `${photo.height}px`,
          }}
          loading="lazy"
        decoding="async"
        />
      )}

      {/* Name and role. The Figma frame positions each of these per card, and
          those tops are kept. */}
      <div
        className="absolute flex flex-col"
        style={{
          top: `${t.top - COPY_LIFT}px`,
          width: `${t.width}px`,
          ...(t.centered
            ? { left: "50%", transform: "translateX(calc(-50% + 0.5px))" }
            : { left: `${t.left}px` }),
        }}
      >
        <div
          className={`flex flex-col gap-2 ${
            t.align === "center" ? "items-center text-center" : "items-start"
          }`}
          style={{ width: t.nameWidth ? `${t.nameWidth}px` : "100%" }}
        >
          <p className="font-display text-[18px] font-semibold leading-normal text-[#272727]">
            {person.name}
          </p>
          {/* verification P2.3c: one size for every title. The longer ones used
              to shrink to 10px via `roleSize`; they wrap onto a second line
              instead. No reserved second line here — the logos are pinned to
              the card's bottom edge, so alignment no longer depends on this
              block being a fixed height, and reserving a line pushed the two
              cards with tall logo stacks into them. */}
          <p className="font-display text-[13px] font-normal leading-normal text-[#4B5563]">
            {person.role}
          </p>
        </div>
      </div>

      {/* Logos, pinned to the card's bottom edge rather than stacked under the
          role. The Figma frame gives each card its own absolute offset for this
          block, which left the logo rows ending anywhere between 393px and
          425px down a 426px card — visibly ragged along a row of cards. One
          shared bottom lines every card up. */}
      <div
        className="absolute flex flex-col gap-[10.8px]"
        style={{
          bottom: `${LOGO_BOTTOM}px`,
          width: `${t.width}px`,
          ...(t.centered
            ? { left: "50%", transform: "translateX(calc(-50% + 0.5px))" }
            : { left: `${t.left}px` }),
        }}
      >
        {person.logoRows.map((row, i) => (
          <ul
            key={i}
            className={`flex items-center ${person.wrap ? "flex-wrap" : ""}`}
            style={{ gap: `${person.logoGap ?? 10.8}px` }}
          >
            {row.map((logo, j) => (
              <Logo key={`${logo.name}-${j}`} logo={logo} />
            ))}
          </ul>
        ))}
      </div>
    </article>
  );
}

function CardGroup({ ariaHidden }) {
  return (
    <div className="flex shrink-0 gap-6 pr-6" aria-hidden={ariaHidden || undefined}>
      {FACULTY.map((person) => (
        <FacultyCard key={person.name} person={person} />
      ))}
    </div>
  );
}

/** node 95:6104/95:6246 — one 320px card plus the 24px gap after it */
const STEP = 344;

/** how long an arrow press takes to settle on the next card */
const JUMP_MS = 420;

export default function Faculty() {
  const railRef = useRef(null);
  const holdRef = useRef(0);
  const targetRef = useRef(null);

  // The row drifts by moving scrollLeft rather than by a CSS transform, so the
  // arrows and a finger can move the same rail the animation does. The track
  // holds two identical groups (node 95:6102 — 8256px for twelve 320px cards
  // twice over); wrapping at the halfway mark keeps the loop seamless in both
  // directions.
  //
  // An arrow press is eased inside this same loop rather than handed to
  // `scrollBy({behavior:"smooth"})`: the drift writes scrollLeft every frame,
  // which cancels a native smooth scroll mid-flight and leaves the rail
  // somewhere between the two.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = performance.now();
    const PX_PER_MS = 0.042; // ~60s for one group, as the marquee ran

    const tick = (now) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const half = rail.scrollWidth / 2;

      const jump = targetRef.current;
      if (jump) {
        // Time-based, not a per-frame lerp: a hidden or busy tab throttles rAF
        // to a frame or two a second, and a per-frame step would then land the
        // rail short of the card it was sent to.
        const t = Math.min(1, (now - jump.start) / JUMP_MS);
        const eased = 1 - (1 - t) ** 3;
        rail.scrollLeft = jump.from + (jump.to - jump.from) * eased;
        if (t >= 1) targetRef.current = null;
      } else if (!still && now >= holdRef.current && half > 0) {
        rail.scrollLeft += PX_PER_MS * dt;
      }

      if (half > 0) {
        // wrap in both directions, carrying any in-flight jump with it
        if (rail.scrollLeft >= half) {
          rail.scrollLeft -= half;
          if (jump) {
            jump.from -= half;
            jump.to -= half;
          }
        } else if (rail.scrollLeft < 0) {
          rail.scrollLeft += half;
          if (jump) {
            jump.from += half;
            jump.to += half;
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  /** hold the drift while someone is reading or driving the rail themselves */
  const hold = useCallback((ms = 1200) => {
    holdRef.current = Math.max(holdRef.current, performance.now() + ms);
  }, []);

  const nudge = useCallback(
    (direction) => {
      const rail = railRef.current;
      if (!rail) return;
      hold(1600);
      const from = targetRef.current ? targetRef.current.to : rail.scrollLeft;
      targetRef.current = {
        from: rail.scrollLeft,
        to: from + direction * STEP,
        start: performance.now(),
      };
    },
    [hold],
  );

  return (
    <section id="mentors" className="bg-mist px-6 py-10 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 text-center text-ink-900">
        <h2 className="font-display text-[30px] font-medium leading-normal tracking-[-0.0206em] sm:text-[38px] lg:text-[44px] min-[1240px]:whitespace-nowrap min-[1240px]:text-[48px]">
          Taught by{" "}
          <span className="font-display font-medium text-flame">World&apos;s Top Tech</span> and
          Academic Minds
        </h2>
        <p className="font-display text-[18px] leading-[27px] text-ink-900/60">
          Industry experts and innovators who turn real-world experience into transformative
          learning.
        </p>
      </div>

      <div className="relative mt-14">
        <div
          ref={railRef}
          onPointerEnter={() => hold(400)}
          onPointerMove={() => hold(400)}
          onPointerDown={() => hold(2400)}
          onFocusCapture={() => hold(4000)}
          onTouchStart={() => hold(2400)}
          className="no-scrollbar flex overflow-x-auto overscroll-x-contain"
        >
          <CardGroup />
          <CardGroup ariaHidden />
        </div>

        {/* node 95:6388/95:6389 — 40px washes over each edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-mist to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-mist to-transparent"
        />

        {/* sitting on the cards themselves, one at each edge and centred on the
            card's height, so they are in reach at every width */}
        <RailButton
          label="Previous mentors"
          onClick={() => nudge(-1)}
          className="left-2 sm:left-4"
        />
        <RailButton
          label="Next mentors"
          onClick={() => nudge(1)}
          flip
          className="right-2 sm:right-4"
        />
      </div>
    </section>
  );
}

/** 44px white circle, as the curriculum rail uses, floated over the cards */
function RailButton({ label, onClick, flip, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D0D5DD] bg-white text-ink-900 shadow-[0_2px_10px_rgba(10,10,11,0.12)] transition-colors hover:border-ink-900/40 hover:bg-ink-900/5 ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className={flip ? "" : "rotate-180"}
      >
        <path
          d="m6 3 5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
