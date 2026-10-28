"use client";

import Link from "next/link";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useSession } from "@/lib/session";

/**
 * Everything under /dashboard needs an account. Until the session has been
 * read there is nothing to show (no flash of the signed-out card); without
 * one, the student is pointed back to Apply Now rather than shown an empty
 * dashboard.
 */
export default function DashboardLayout({ children }) {
  const { session, ready, signOut } = useSession();

  if (!ready) return <div className="min-h-screen bg-mist" />;

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist px-6">
        <div className="flex w-full max-w-[420px] flex-col items-center gap-3 rounded-[12px] bg-white p-8 text-center">
          <h1 className="font-display text-[22px] font-medium text-ink-900">
            Sign up to see your dashboard
          </h1>
          <p className="font-display text-[15px] leading-[1.55] text-ink-900/60">
            Use Apply Now on the homepage to create your account. It takes about a minute.
          </p>
          <Link
            href="/"
            className="mt-2 flex h-12 w-full items-center justify-center rounded bg-flame font-display text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist">
      <DashboardHeader session={session} onSignOut={signOut} />
      <main className="mx-auto max-w-[1280px] px-4 pb-20 pt-8 sm:px-6 lg:px-10 lg:pt-12">
        {children}
      </main>
    </div>
  );
}
