import Link from "next/link";

import { PROGRAMME, inr } from "@/lib/programme";

/**
 * Where a parent or guardian lands from the student's share link. The link
 * holds only a random reference, so this page shows the amount and what it is
 * for, never the student's details.
 *
 * TODO: look the reference up on the server, show the student's first name,
 * and start the gateway payment from the button.
 */
export const metadata = { title: "Seat booking — uGSOT LaunchReady" };

export default function ParentPayPage({ params }) {
  return (
    <div className="flex min-h-screen flex-col bg-mist">
      <header>
        <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 sm:px-6">
          <Link href="/" className="relative h-[28px] w-[222px]">
            <img
              src="/images/ugsot-launchready-logo.png"
              alt="upGrad School of Technology — LaunchReady"
              className="absolute inset-0 size-full object-contain object-left"
            />
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[440px] flex-col gap-5 rounded-[12px] border border-ink-900/10 bg-white p-6 sm:p-8">
          <div>
            <p className="font-display text-[14px] font-medium text-ink-900/60">Seat booking amount</p>
            <p className="mt-1 font-display text-[40px] font-semibold leading-none tracking-[-0.02em] text-ink-900">
              {inr(PROGRAMME.seatAmount)}
            </p>
          </div>
          <p className="font-display text-[15px] leading-[1.6] text-ink-900/65">
            You&rsquo;ve been asked to block a seat in <strong className="font-medium text-ink-900">{PROGRAMME.name}</strong>{" "}
            — a {PROGRAMME.duration} offline programme at {PROGRAMME.campus}. The amount is adjusted
            against the {inr(PROGRAMME.fee)} programme fee.
          </p>
          <button
            type="button"
            disabled
            className="flex h-12 w-full cursor-not-allowed items-center justify-center rounded bg-flame font-display text-[15px] font-medium text-white opacity-60"
          >
            Pay {inr(PROGRAMME.seatAmount)}
          </button>
          <p className="text-center font-display text-[13px] text-ink-900/50">
            Payments open soon. Reference {params.ref}
          </p>
        </div>
      </main>
    </div>
  );
}
