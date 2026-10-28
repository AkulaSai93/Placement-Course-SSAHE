"use client";

import Link from "next/link";

import { PROGRAMME, inr } from "@/lib/programme";
import { CLASSES, EVENTS } from "@/lib/schedule";
import { useSession } from "@/lib/session";

/**
 * Overview — what's coming up. Every class and event is offline, so each one
 * shows where it happens rather than a join link.
 */
const TZ = { timeZone: "Asia/Kolkata" };
const day = (iso) => new Date(iso).toLocaleDateString("en-IN", { ...TZ, day: "numeric" });
const month = (iso) => new Date(iso).toLocaleDateString("en-IN", { ...TZ, month: "short" });
const weekday = (iso) => new Date(iso).toLocaleDateString("en-IN", { ...TZ, weekday: "long" });
const time = (iso) =>
  new Date(iso).toLocaleTimeString("en-IN", { ...TZ, hour: "numeric", minute: "2-digit" }).toLowerCase();
const fullDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { ...TZ, day: "numeric", month: "long", year: "numeric" });

export default function OverviewPage() {
  const { session } = useSession();
  if (!session) return null;

  const firstName = session.name.split(/\s+/)[0];
  const starts = CLASSES[0].start;

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <div>
        <h1 className="font-display text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900 lg:text-[40px]">
          Hi {firstName}
        </h1>
        <p className="mt-2 font-display text-[15px] leading-[1.6] text-ink-900/60 lg:text-[16px]">
          Here&rsquo;s what&rsquo;s coming up at {PROGRAMME.campus}.
        </p>
      </div>

      {session.paid ? null : (
        <div className="flex flex-col gap-4 rounded-[8px] border border-flame/20 bg-flame/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-[15px] font-medium text-ink-900">Your seat isn&rsquo;t blocked yet</p>
            <p className="mt-0.5 font-display text-[14px] text-ink-900/60">
              Pay {inr(PROGRAMME.seatAmount)} to hold your place in the {PROGRAMME.cohort} cohort.
            </p>
          </div>
          <Link
            href="/dashboard/payment"
            className="flex h-11 shrink-0 items-center justify-center rounded bg-flame px-5 font-display text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Block my seat
          </Link>
        </div>
      )}

      {/* at a glance */}
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <Stat label="Starts" value={fullDate(starts)} />
        <Stat label="Duration" value={PROGRAMME.duration} />
        <Stat label="Mode" value={`${PROGRAMME.mode}, in person`} />
        <Stat label="Campus" value={PROGRAMME.campus} />
      </dl>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
        <section aria-labelledby="classes-heading" className="flex min-w-0 flex-col gap-4">
          <SectionHead id="classes-heading" title="Upcoming classes" note={`${CLASSES.length} scheduled`} />
          <ol className="flex flex-col gap-3">
            {CLASSES.map((c) => (
              <li
                key={c.start}
                className="flex gap-4 rounded-[8px] border border-ink-900/10 bg-white p-4 sm:gap-5 sm:p-5"
              >
                <DateBlock iso={c.start} />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-mist px-2 py-0.5 font-display text-[12px] font-medium text-ink-900/70">
                      {c.track}
                    </span>
                    <OfflineTag />
                  </div>
                  <h3 className="font-display text-[16px] font-medium leading-[1.4] text-ink-900">{c.title}</h3>
                  <p className="flex flex-wrap gap-x-4 gap-y-1 font-display text-[13px] text-ink-900/55">
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon />
                      {weekday(c.start)}, {time(c.start)} – {time(c.end)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <PinIcon />
                      {c.venue}
                    </span>
                  </p>
                  <p className="font-display text-[13px] text-ink-900/45">With {c.lead}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="events-heading" className="flex min-w-0 flex-col gap-4">
          <SectionHead id="events-heading" title="Events" note="On campus" />
          <ol className="flex flex-col gap-3">
            {EVENTS.map((ev) => (
              <li key={ev.start} className="rounded-[8px] border border-ink-900/10 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-[12px] font-semibold uppercase tracking-[0.06em] text-flame">
                    {ev.kind}
                  </span>
                  <span className="font-display text-[13px] text-ink-900/55">
                    {day(ev.start)} {month(ev.start)}, {time(ev.start)}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-[16px] font-medium leading-[1.4] text-ink-900">{ev.title}</h3>
                <p className="mt-1 font-display text-[14px] leading-[1.55] text-ink-900/60">{ev.blurb}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 font-display text-[13px] text-ink-900/55">
                  <PinIcon />
                  {ev.venue}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-[8px] border border-ink-900/10 bg-white p-4 lg:p-5">
      <dt className="font-display text-[13px] text-ink-900/50">{label}</dt>
      <dd className="mt-1 font-display text-[15px] font-medium text-ink-900 lg:text-[16px]">{value}</dd>
    </div>
  );
}

function SectionHead({ id, title, note }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 id={id} className="font-display text-[20px] font-semibold text-ink-900">
        {title}
      </h2>
      <span className="font-display text-[13px] text-ink-900/50">{note}</span>
    </div>
  );
}

function DateBlock({ iso }) {
  return (
    <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-[6px] bg-ink-900 text-white sm:size-16">
      <span className="font-display text-[11px] font-medium uppercase tracking-[0.06em] text-white/70">
        {month(iso)}
      </span>
      <span className="font-display text-[22px] font-semibold leading-none">{day(iso)}</span>
    </div>
  );
}

function OfflineTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-[#ECFDF3] px-2 py-0.5 font-display text-[12px] font-medium text-[#067647]">
      <span className="size-1.5 rounded-full bg-[#17B26A]" />
      Offline · In class
    </span>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s-7-6.1-7-11.5a7 7 0 1 1 14 0C19 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
