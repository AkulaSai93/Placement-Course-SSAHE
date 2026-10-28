"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Accordion from "@/components/dashboard/Accordion";
import { Field, PrimaryButton, SelectInput } from "@/components/FormControls";
import {
  AiTools,
  CountdownDial,
  DeployedApp,
  MockRounds,
  ProfileMarks,
  SubjectChips,
  WORDMARK_CROP,
} from "@/components/Pricing";
import { PROGRAMME, STATES, inr } from "@/lib/programme";
import { useSession } from "@/lib/session";

/**
 * Payment — block a seat in the cohort.
 *
 * Laid out after the Catalyst seat page:
 *
 *   left   heading, one card with the applicant's details (read only, from
 *          signup) plus the billing state, and the programme; then the FAQ
 *          and terms straight on the page, no card
 *   right  the amount card — Proceed to pay, then "or", then the link a
 *          parent can pay through — and the benefits underneath
 *
 * On a phone it is one column ordered heading → details → pay → benefits →
 * FAQ: both columns are `display: contents` there so `order` can interleave
 * them, and real columns again from lg.
 *
 * SIMULATED: no gateway is connected. "Proceed to pay" waits a moment and
 * marks the seat as blocked in the browser session. TODO: hand off to the real
 * gateway and set `paid` from its confirmation, never from the client.
 */
const TERMS = [
  `Paying ${inr(PROGRAMME.seatAmount)} blocks your seat in the ${PROGRAMME.cohort} cohort, subject to payment confirmation and verification of eligibility.`,
  "The seat booking amount is non-refundable.",
  `It is adjusted against the ${inr(PROGRAMME.fee)} programme fee — it is not an extra charge on top of it.`,
  "After payment you receive an offer letter with the full fee, the No Cost EMI schedule and the admission terms. The balance is due within the timeline stated there.",
  `All classes are offline, in person at ${PROGRAMME.campus}. Attendance is part of the programme requirements.`,
];

const FAQS = [
  {
    q: `What does the ${inr(PROGRAMME.seatAmount)} confirm?`,
    a: `It holds your place in the ${PROGRAMME.cohort} cohort while admission is completed. The rest of the ${inr(PROGRAMME.fee)} fee is raised separately in your offer letter.`,
  },
  {
    q: "Is Lastmile online or offline?",
    a: `Offline. Every class, lab and event runs in person at ${PROGRAMME.campus} across the ${PROGRAMME.duration}. There is no online version.`,
  },
  {
    q: "Can a parent or guardian pay?",
    a: "Yes. Share the payment link on this page with them — they can pay from their own phone, and the seat is blocked in your name.",
  },
  {
    q: "Is No Cost EMI available on the full fee?",
    a: `Yes. The ${inr(PROGRAMME.fee)} programme fee can be paid on No Cost EMI. The options are listed in your offer letter.`,
  },
  {
    q: "Why do you need my state?",
    a: "It is used for the GST invoice on your payment.",
  },
];

export default function PaymentPage() {
  const { session, update } = useSession();
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (session?.state) setState(session.state);
  }, [session?.state]);

  if (!session) return null;
  const paid = !!session.paid;

  const pay = async () => {
    if (!state) {
      setError("Select your state to continue.");
      document.getElementById("pay-state")?.focus();
      return;
    }
    setPaying(true);
    update({ state });
    // TODO: redirect to the payment gateway here
    await new Promise((r) => setTimeout(r, 1200));
    update({ state, paid: true, paidAt: new Date().toISOString() });
    setPaying(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-x-10 lg:gap-y-0">
      {/* ---------------- left ---------------- */}
      <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-8">
        <div className="order-1">
          <h1 className="font-display text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-ink-900 lg:text-[36px]">
            {paid ? "Your Seat Is Blocked" : "Block Your Seat"}
          </h1>
          <p className="mt-3 max-w-[600px] font-display text-[15px] leading-[1.65] text-ink-900/60">
            {paid
              ? `You’re in the ${PROGRAMME.cohort} cohort. Your offer letter, with the full fee and the No Cost EMI options, is on its way to ${session.email}.`
              : `Confirm your place in the six-month offline ${PROGRAMME.name} programme.`}
          </p>
        </div>

        <section className="order-2 rounded-[8px] border border-ink-900/[0.08] bg-white p-5 sm:p-7">
          <h2 className="font-display text-[16px] font-semibold text-ink-900">Applicant Information</h2>
          <div className="mt-5 flex flex-col gap-5">
            <ReadOnly id="pay-name" label="Applicant Name" value={session.name} />
            <ReadOnly id="pay-email" label="Email Address" value={session.email} verified />
            <ReadOnly id="pay-phone" label="Mobile Number" value={`+91 ${session.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}`} verified />
            <div className="grid gap-5 sm:grid-cols-2">
              <ReadOnly id="pay-year" label="Year of Study" value={session.year} />
              <ReadOnly id="pay-branch" label="Branch" value={session.branch} />
            </div>
            <Field id="pay-state" label="State" error={error} hint="Used for the GST invoice on your payment.">
              <SelectInput
                id="pay-state"
                value={state}
                onChange={(v) => {
                  setState(v);
                  setError("");
                }}
                options={STATES}
                placeholder="Select your state"
                error={error}
              />
            </Field>
          </div>

          <h2 className="mt-9 font-display text-[16px] font-semibold text-ink-900">Program Information</h2>
          <div className="mt-5 flex flex-col gap-5">
            <ReadOnly id="pay-programme" label="Program Name" value={`${PROGRAMME.name} — 6-Month Offline Programme`} />
            <ReadOnly id="pay-cohort" label="Cohort" value={PROGRAMME.cohort} />
          </div>
        </section>

        {/* Important Terms, in full, as the Catalyst seat page shows them */}
        <section className="order-5">
          <h2 className="font-display text-[22px] font-bold tracking-[-0.01em] text-ink-900 lg:text-[24px]">
            Important Terms:
          </h2>
          <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 marker:text-ink-900/40">
            {TERMS.map((t, i) => (
              <li key={t} className="font-display text-[14.5px] leading-[1.65] text-ink-900/70">
                {/* the non-refundable line carries the red asterisk */}
                {i === 1 ? <span className="mr-1 text-flame">*</span> : null}
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-display text-[14.5px] leading-[1.65] text-ink-900/70">
            By proceeding with payment, you confirm that you have read and agree to these terms, the
            applicable Terms and Conditions, and the Privacy Policy.
          </p>
        </section>

        <section className="order-6">
          <h2 className="font-display text-[22px] font-bold tracking-[-0.01em] text-ink-900 lg:text-[24px]">
            Frequently Asked Questions
          </h2>
          <div className="mt-3 border-b border-ink-900/10">
            <Accordion items={FAQS} defaultOpen={0} />
          </div>
        </section>
      </div>

      {/* ---------------- right ---------------- */}
      <aside className="contents lg:sticky lg:top-[100px] lg:row-span-1 lg:flex lg:min-w-0 lg:flex-col lg:gap-6 lg:self-start">
        <div className="order-3 rounded-[8px] border border-ink-900/[0.08] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-[15px] font-medium text-ink-900">Seat Booking Amount</p>
            {paid ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-2.5 py-1 font-display text-[12px] font-semibold text-[#067647]">
                <span className="size-1.5 rounded-full bg-[#17B26A]" /> Paid
              </span>
            ) : (
              <span className="rounded-md bg-[#FEF6E7] px-2 py-1 font-display text-[12px] font-semibold text-[#B54708]">
                Closes {PROGRAMME.seatDeadline}
              </span>
            )}
          </div>
          <p className="mt-2 font-display text-[36px] font-bold leading-tight tracking-[-0.02em] text-ink-900">
            ₹ {PROGRAMME.seatAmount}
          </p>
          <p className="mt-2 font-display text-[14px] leading-[1.55] text-ink-900/60">
            A one-time amount to confirm your place. Seats in the {PROGRAMME.cohort.split(" · ")[0]} cohort
            are allotted in order of payment.
          </p>

          {paid ? (
            <Link
              href="/dashboard/overview"
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-ink-900 font-display text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              See your classes
              <ArrowIcon />
            </Link>
          ) : (
            <>
              <PrimaryButton
                type="button"
                onClick={pay}
                loading={paying}
                loadingLabel="Opening secure payment…"
                className="mt-5 rounded-[6px] font-semibold"
              >
                Proceed to pay
                <ArrowIcon />
              </PrimaryButton>

              <p className="mt-5 border-t border-ink-900/10 pt-5 text-center font-display text-[13px] text-ink-900/55">
                Backed by upGrad — 10M+ learners and 110K+ placements
              </p>

              <div className="my-4 flex items-center gap-3 font-display text-[13px] text-ink-900/40">
                <span className="h-px flex-1 bg-ink-900/10" />
                or
                <span className="h-px flex-1 bg-ink-900/10" />
              </div>

              <ShareLink payRef={session.payRef} />
            </>
          )}
        </div>

        <Benefits />
      </aside>
    </div>
  );
}

/** a filled, grey, read-only field — the details came from signup */
function ReadOnly({ id, label, value, verified }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-display text-[14px] font-medium text-ink-900/60">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          readOnly
          value={value || ""}
          className={`h-12 w-full truncate rounded-[6px] border border-ink-900/10 bg-mist px-4 font-display text-[16px] text-ink-900/80 outline-none ${
            verified ? "pr-24" : ""
          }`}
        />
        {verified ? (
          <span className="pointer-events-none absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-full bg-[#ECFDF3] px-2 py-0.5 font-display text-[12px] font-medium text-[#067647]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified
          </span>
        ) : null}
      </div>
    </div>
  );
}

/**
 * What the seat gets you — the homepage's "What you walk away with" tiles at
 * a smaller size: the same tints, headlines and artwork, imported from
 * Pricing rather than redrawn. The artwork is shrunk with `zoom`, not a
 * transform, so its smaller size is also what the layout reserves.
 */
const PERKS = [
  {
    title: "Hands-on with AI coding tools and LLM APIs",
    tint: "rgba(8,145,178,0.09)",
    art: <AiTools />,
    zoom: 0.6,
  },
  {
    title: "A deployed full-stack project with an AI feature",
    tint: "rgba(14,159,110,0.09)",
    art: <DeployedApp />,
    zoom: 0.5,
  },
  {
    title: "Technical and HR mock interview practice",
    tint: "rgba(219,39,119,0.08)",
    art: <MockRounds />,
    zoom: 0.62,
  },
  {
    title: "A timed, placement-style aptitude test",
    tint: "rgba(217,119,6,0.09)",
    art: (
      <div className="flex items-center gap-4">
        <CountdownDial />
        <div className="flex flex-col">
          <p className="font-display text-[34px] font-medium leading-[34px] tracking-[-0.68px] tabular-nums text-ink-900">
            45:00
          </p>
          <p className="pt-1.5 font-display text-[12px] font-medium uppercase leading-[17.25px] tracking-[1.38px] text-[#92400E]">
            Time left
          </p>
        </div>
      </div>
    ),
    zoom: 0.55,
  },
  {
    title: "A resume, LinkedIn profile and GitHub portfolio",
    tint: "rgba(29,111,224,0.09)",
    art: <ProfileMarks />,
    zoom: 0.5,
  },
  {
    title: "Confidence across DSA, web development and core CS",
    tint: "rgba(124,58,237,0.08)",
    art: <SubjectChips />,
    zoom: 0.65,
  },
];

function Benefits() {
  return (
    <div className="order-4 grid grid-cols-2 gap-3">
      {/* Internshala — the lockup and the phone, as on the homepage */}
      <div className="relative col-span-2 flex min-h-[150px] overflow-hidden rounded-[8px] bg-black p-5">
        <div className="relative z-10 flex max-w-[60%] flex-col gap-2">
          <div className="flex flex-wrap items-end gap-x-1 gap-y-0.5">
            <p className="whitespace-nowrap font-display text-[17px] font-medium leading-none text-white">
              6 months of
            </p>
            {/* the homepage's 160 x 48.7 window and crop, zoomed as one */}
            <span
              className="relative block h-[48.695px] w-[160px] overflow-hidden"
              style={{ zoom: 0.6 }}
              role="img"
              aria-label="Internshala"
            >
              <img
                src="/images/internshala-wordmark.webp"
                alt=""
                className="absolute max-w-none"
                style={WORDMARK_CROP}
                decoding="async"
                loading="lazy"
              />
            </span>
            <p className="whitespace-nowrap font-display text-[17px] font-medium leading-none text-white">
              Free
            </p>
          </div>
          <p className="font-display text-[12.5px] leading-[1.5] text-white/60">
            Thousands of job and internship opportunities, included with the programme.
          </p>
        </div>
        <img
          src="/images/internshala-app-device.webp"
          alt=""
          width="604"
          height="1200"
          className="absolute -bottom-[118px] right-4 w-[128px]"
          loading="lazy"
          decoding="async"
        />
      </div>

      {PERKS.map((p) => (
        <div
          key={p.title}
          className="flex min-h-[148px] flex-col justify-between gap-4 overflow-hidden rounded-[8px] p-4"
          style={{ backgroundColor: p.tint }}
        >
          <div aria-hidden="true" className="pointer-events-none" style={{ zoom: p.zoom }}>
            {p.art}
          </div>
          <p className="font-display text-[14px] font-medium leading-[1.3] tracking-[-0.01em] text-ink-900">
            {p.title}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * A link a parent or guardian can pay through on their own phone. The link
 * carries only a random reference, never the student's details.
 */
function ShareLink({ payRef }) {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLink(`${window.location.origin}/pay/${payRef}`);
  }, [payRef]);

  const share = async () => {
    const data = {
      title: "uGSOT Lastmile seat booking",
      text: `Please help me block my seat in ${PROGRAMME.name} (${inr(PROGRAMME.seatAmount)}).`,
      url: link,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
    } catch (err) {
      if (err?.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the field is selectable, so it can be copied by hand
    }
  };

  return (
    <div>
      <p className="font-display text-[14px] font-medium text-ink-900">
        Want your parent or guardian to pay on your behalf?
      </p>
      <div className="mt-3 flex gap-2">
        <input
          readOnly
          // shown without the scheme, as people read links; Share sends it whole
          value={link.replace(/^https?:\/\//, "")}
          aria-label="Payment link"
          onFocus={(e) => e.target.select()}
          className="h-11 min-w-0 flex-1 rounded-[6px] border border-ink-900/10 bg-white px-3.5 font-display text-[13.5px] text-ink-900/70 outline-none focus:border-ink-900"
        />
        <button
          type="button"
          onClick={share}
          className="h-11 shrink-0 rounded-[6px] border border-ink-900/10 bg-white px-4 font-display text-[14px] font-semibold text-ink-900 transition-colors hover:bg-mist"
        >
          {copied ? "Copied" : "Share"}
        </button>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
