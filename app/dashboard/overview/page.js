"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PROGRAMME, inr } from "@/lib/programme";
import { CLASSES, EVENTS } from "@/lib/schedule";
import { useSession } from "@/lib/session";

/**
 * Overview — what's coming up, all of it on campus.
 *
 *   left   up next (the first class, with a countdown),
 *          the first week as a day picker with that day's classes, events
 *   right  a short checklist before day one, the programme at a glance and
 *          the campus card
 *
 * Every class and event is offline, so each one shows its room rather than a
 * join link. On a phone it is one column — greeting, up next, checklist, then
 * the schedule — using `contents` + `order` as the Payment page does.
 */
const TZ = { timeZone: "Asia/Kolkata" };
const fmt = (iso, opts) => new Date(iso).toLocaleString("en-IN", { ...TZ, ...opts });
const day = (iso) => fmt(iso, { day: "numeric" });
const month = (iso) => fmt(iso, { month: "short" });
const weekdayShort = (iso) => fmt(iso, { weekday: "short" });
const time = (iso) => fmt(iso, { hour: "numeric", minute: "2-digit" }).toLowerCase();
const longDate = (iso) => fmt(iso, { weekday: "long", day: "numeric", month: "long" });
const dateKey = (iso) => fmt(iso, { year: "numeric", month: "2-digit", day: "2-digit" });

/** each track keeps one colour everywhere it appears */
const TRACKS = {
  Onboarding: { ink: "#1D4ED8", tint: "rgba(29,111,224,0.09)" },
  DSA: { ink: "#7C3AED", tint: "rgba(124,58,237,0.08)" },
  Development: { ink: "#047857", tint: "rgba(14,159,110,0.09)" },
  Aptitude: { ink: "#B45309", tint: "rgba(217,119,6,0.09)" },
};
const EVENT_KINDS = {
  Campus: { ink: "#1D4ED8", tint: "rgba(29,111,224,0.09)" },
  Career: { ink: "#BE185D", tint: "rgba(219,39,119,0.08)" },
  Hackathon: { ink: "#047857", tint: "rgba(14,159,110,0.09)" },
  "Industry talk": { ink: "#B45309", tint: "rgba(217,119,6,0.09)" },
};
const tone = (map, key) => map[key] || { ink: "#0A0A0B", tint: "rgba(10,10,11,0.05)" };

export default function OverviewPage() {
  const { session } = useSession();

  // the first week: six days from the first class, whether or not each has one
  const week = useMemo(() => {
    const first = new Date(CLASSES[0].start);
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(first.getTime() + i * 86400000).toISOString();
      const key = dateKey(d);
      return { iso: d, key, classes: CLASSES.filter((c) => dateKey(c.start) === key) };
    });
  }, []);
  const [selected, setSelected] = useState(() => week[0].key);

  if (!session) return null;

  const firstName = session.name.split(/\s+/)[0];
  const next = CLASSES[0];
  const daysToGo = Math.max(0, Math.ceil((new Date(next.start) - Date.now()) / 86400000));
  const today = week.find((d) => d.key === selected) || week[0];

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-8 lg:gap-y-0">
      {/* ---------------- left ---------------- */}
      <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-8">
        <div className="order-1">
          <h1 className="font-display text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-ink-900 lg:text-[36px]">
            Hi {firstName}
          </h1>
          <p className="mt-2 font-display text-[15px] leading-[1.6] text-ink-900/60">
            Here&rsquo;s what&rsquo;s coming up at {PROGRAMME.campus}.
          </p>
        </div>

        <UpNext item={next} daysToGo={daysToGo} />

        <section aria-labelledby="week-heading" className="order-4 flex flex-col gap-4">
          <SectionHead id="week-heading" title="First week" note="All classes are in person" />

          {/* day picker */}
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div role="tablist" aria-label="Day" className="grid min-w-[480px] grid-cols-6 gap-2">
              {week.map((d) => {
                const active = d.key === selected;
                return (
                  <button
                    key={d.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelected(d.key)}
                    className={`flex flex-col items-center gap-1 rounded-[8px] border py-3 transition-colors ${
                      active
                        ? "border-ink-900 bg-ink-900 text-white"
                        : "border-ink-900/[0.08] bg-white text-ink-900 hover:border-ink-900/25"
                    }`}
                  >
                    <span className={`font-display text-[12px] font-medium uppercase tracking-[0.06em] ${active ? "text-white/60" : "text-ink-900/45"}`}>
                      {weekdayShort(d.iso)}
                    </span>
                    <span className="font-display text-[20px] font-semibold leading-none">{day(d.iso)}</span>
                    <span className="flex h-1.5 gap-1">
                      {d.classes.map((c) => (
                        <span
                          key={c.start}
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: active ? "#fff" : tone(TRACKS, c.track).ink }}
                        />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* that day's classes */}
          <div role="tabpanel" key={today.key} className="flex animate-fadeUp flex-col gap-3">
            <p className="font-display text-[14px] font-medium text-ink-900/55">{longDate(today.iso)}</p>
            {today.classes.length ? (
              today.classes.map((c) => <ClassRow key={c.start} item={c} />)
            ) : (
              <div className="rounded-[8px] border border-dashed border-ink-900/15 px-5 py-8 text-center font-display text-[14px] text-ink-900/50">
                No classes this day. The campus labs are open for practice.
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="events-heading" className="order-5 flex flex-col gap-4">
          <SectionHead id="events-heading" title="Events" note="On campus" />
          <ol className="grid gap-3 sm:grid-cols-2">
            {EVENTS.map((ev) => {
              const t = tone(EVENT_KINDS, ev.kind);
              return (
                <li key={ev.start} className="flex flex-col rounded-[8px] p-5" style={{ backgroundColor: t.tint }}>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="font-display text-[12px] font-semibold uppercase tracking-[0.06em]"
                      style={{ color: t.ink }}
                    >
                      {ev.kind}
                    </span>
                    <span className="rounded-[6px] bg-white px-2 py-1 font-display text-[12px] font-medium text-ink-900">
                      {day(ev.start)} {month(ev.start)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[16px] font-semibold leading-[1.35] text-ink-900">
                    {ev.title}
                  </h3>
                  <p className="mt-1 flex-1 font-display text-[13.5px] leading-[1.55] text-ink-900/60">{ev.blurb}</p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[13px] text-ink-900/60">
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon />
                      {time(ev.start)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <PinIcon />
                      {ev.venue}
                    </span>
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      {/* ---------------- right ---------------- */}
      <aside className="contents lg:sticky lg:top-[100px] lg:flex lg:min-w-0 lg:flex-col lg:gap-6 lg:self-start">
        <Checklist paid={!!session.paid} />

        <section className="order-6 rounded-[8px] border border-ink-900/[0.08] bg-white p-5">
          <h2 className="font-display text-[15px] font-semibold text-ink-900">Programme at a glance</h2>
          <dl className="mt-4 grid grid-cols-2 gap-2">
            <Glance label="Starts" value={`${day(next.start)} ${month(next.start)} 2027`} />
            <Glance label="Duration" value={PROGRAMME.duration} />
            <Glance label="Mode" value={PROGRAMME.mode} />
            <Glance label="Fee" value={inr(PROGRAMME.fee)} />
          </dl>
        </section>

        <section className="order-7 overflow-hidden rounded-[8px] border border-ink-900/[0.08] bg-white">
          <div className="relative h-[120px] overflow-hidden bg-ink-900">
            <img
              src="/videos/hero-poster.webp"
              alt=""
              className="absolute inset-0 size-full object-cover opacity-80"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute bottom-3 left-3 rounded-[6px] bg-white px-2 py-1 font-display text-[12px] font-semibold text-ink-900">
              Your campus
            </span>
          </div>
          <div className="p-5">
            <h2 className="font-display text-[16px] font-semibold text-ink-900">{PROGRAMME.campus}</h2>
            <ul className="mt-3 flex flex-col gap-2.5 font-display text-[13.5px] leading-[1.5] text-ink-900/65">
              <li className="flex gap-2">
                <ClockIcon />
                Report by 9:30 am on orientation day
              </li>
              <li className="flex gap-2">
                <PinIcon />
                Main reception, then the Main Auditorium
              </li>
              <li className="flex gap-2">
                <IdIcon />
                Bring your college ID and a laptop
              </li>
            </ul>
          </div>
        </section>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** the first class, in a dark card with a countdown */
function UpNext({ item, daysToGo }) {
  return (
    <section
      aria-labelledby="next-heading"
      className="relative order-2 overflow-hidden rounded-[8px] bg-ink-900 p-5 text-white sm:p-7"
    >
      {/* a soft red glow in the corner, the brand's one accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-flame/40 blur-3xl"
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-[6px] bg-white/10 px-2.5 py-1 font-display text-[12px] font-medium text-white/80">
            <span className="size-1.5 rounded-full bg-flame" />
            Up next · Offline
          </span>
          <h2 id="next-heading" className="max-w-[440px] font-display text-[22px] font-semibold leading-[1.25] lg:text-[26px]">
            {item.title}
          </h2>
          <p className="flex flex-wrap gap-x-4 gap-y-1.5 font-display text-[14px] text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon />
              {longDate(item.start)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon />
              {time(item.start)} – {time(item.end)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PinIcon />
              {item.venue}
            </span>
          </p>
        </div>

        <div className="shrink-0">
          <div className="sm:text-right">
            <p className="font-display text-[40px] font-semibold leading-none tracking-[-0.02em]">{daysToGo}</p>
            <p className="mt-1 font-display text-[12px] uppercase tracking-[0.08em] text-white/55">
              days to go
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClassRow({ item }) {
  const t = tone(TRACKS, item.track);
  return (
    <article className="flex overflow-hidden rounded-[8px] border border-ink-900/[0.08] bg-white">
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <div className="shrink-0 sm:w-[96px]">
          <p className="font-display text-[15px] font-semibold text-ink-900">{time(item.start)}</p>
          <p className="font-display text-[13px] text-ink-900/45">to {time(item.end)}</p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span
            className="w-fit rounded-[6px] px-2 py-0.5 font-display text-[12px] font-semibold"
            style={{ backgroundColor: t.tint, color: t.ink }}
          >
            {item.track}
          </span>
          <h3 className="font-display text-[16px] font-semibold leading-[1.35] text-ink-900">{item.title}</h3>
          <p className="flex flex-wrap gap-x-4 gap-y-1 font-display text-[13px] text-ink-900/55">
            <span className="inline-flex items-center gap-1.5">
              <PinIcon />
              {item.venue}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PersonIcon />
              {item.lead}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}

/** what to have done before day one — the seat is the only open item */
function Checklist({ paid }) {
  const items = [
    { label: "Account created", done: true },
    { label: "Email and mobile verified", done: true },
    { label: `Seat blocked (${inr(PROGRAMME.seatAmount)})`, done: paid, href: "/dashboard/payment" },
    { label: "Offer letter accepted", done: false, note: paid ? "On its way to your inbox" : "After your seat is blocked" },
  ];
  const doneCount = items.filter((i) => i.done).length;

  return (
    <section className="order-3 rounded-[8px] border border-ink-900/[0.08] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[15px] font-semibold text-ink-900">Before you start</h2>
        <span className="font-display text-[13px] font-medium text-ink-900/50">
          {doneCount} of {items.length}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-900/10">
        <div className="h-full rounded-full bg-flame transition-[width]" style={{ width: `${(doneCount / items.length) * 100}%` }} />
      </div>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((i) => (
          <li key={i.label} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                i.done ? "bg-[#17B26A]" : "border-[1.5px] border-ink-900/20"
              }`}
            >
              {i.done ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m5 12.5 4.5 4.5L19 7.5" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`font-display text-[14px] ${i.done ? "text-ink-900/50 line-through decoration-ink-900/25" : "font-medium text-ink-900"}`}>
                {i.label}
              </p>
              {i.note && !i.done ? (
                <p className="font-display text-[12.5px] text-ink-900/45">{i.note}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      {paid ? null : (
        <Link
          href="/dashboard/payment"
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-[6px] bg-flame font-display text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Block my seat
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </section>
  );
}

function Glance({ label, value }) {
  return (
    <div className="rounded-[6px] bg-mist px-3 py-2.5">
      <dt className="font-display text-[12px] text-ink-900/45">{label}</dt>
      <dd className="mt-0.5 font-display text-[14px] font-semibold text-ink-900">{value}</dd>
    </div>
  );
}

function SectionHead({ id, title, note }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 id={id} className="font-display text-[20px] font-bold tracking-[-0.01em] text-ink-900">
        {title}
      </h2>
      <span className="font-display text-[13px] text-ink-900/50">{note}</span>
    </div>
  );
}

const iconProps = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, className: "mt-[1px] shrink-0" };

function ClockIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 1 1 14 0C19 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IdIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
      <path d="M6 16c.6-1.5 1.7-2.2 3-2.2s2.4.7 3 2.2M14.5 10h3.5M14.5 13.5h3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
