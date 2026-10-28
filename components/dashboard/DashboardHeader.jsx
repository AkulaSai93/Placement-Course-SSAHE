"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * The dashboard's top bar: the logo, two chips — Payment and Overview,
 * nothing else — and the student's initial, which opens a small account menu.
 *
 * Light, on the page's own background, with no bar of colour across the top.
 * The logo artwork has white lettering ("Last", the divider, "School of
 * Technology") made for dark backgrounds, so the `logo-ink` filter below
 * turns white to ink while leaving the red alone:
 *
 *   R' = R − 0.96·G     white (1,1,1) → 0.04, red (0.9,0,0) → 0.9
 *   G' = 0, B' = B − 0.96·G
 *
 * On a phone the chips drop to their own row under the logo.
 */
const TABS = [
  { label: "Payment", href: "/dashboard/payment" },
  { label: "Overview", href: "/dashboard/overview" },
];

export default function DashboardHeader({ session, onSignOut }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const initial = (session?.name || "?").trim().charAt(0).toUpperCase();

  const chips = (className) => (
    <nav aria-label="Dashboard" className={className}>
      <div className="flex gap-1 rounded-full border border-ink-900/10 bg-white p-1">
        {TABS.map((tab) => {
          const active = pathname?.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex h-9 flex-1 items-center justify-center rounded-full px-5 font-display text-[14px] font-medium transition-colors ${
                active
                  ? "bg-ink-900 text-white"
                  : "text-ink-900/60 hover:bg-mist hover:text-ink-900"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 bg-mist/85 backdrop-blur-md">
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <filter id="logo-ink" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 -0.96 0 0 0  0 0 0 0 0  0 -0.96 1 0 0  0 0 0 1 0"
          />
        </filter>
      </svg>

      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-[76px] lg:px-10">
        <Link href="/" className="relative h-[30px] w-[158px] shrink-0 sm:h-[34px] sm:w-[179px]">
          <img
            src="/images/ugsot-lastmile-logo.png"
            alt="upGrad School of Technology — Lastmile"
            className="absolute inset-0 size-full object-contain object-left [filter:url(#logo-ink)]"
            decoding="async"
          />
        </Link>

        {chips("hidden sm:block")}

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="Account"
            className="flex size-10 items-center justify-center rounded-full bg-flame font-display text-[15px] font-medium text-white transition-opacity hover:opacity-85"
          >
            {initial}
          </button>

          {menuOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+8px)] w-[260px] animate-fadeUp rounded-[12px] border border-ink-900/10 bg-white p-2 shadow-[0_12px_32px_rgba(10,10,11,0.12)]"
            >
              <div className="px-3 pb-3 pt-2">
                <p className="truncate font-display text-[15px] font-medium text-ink-900">
                  {session?.name}
                </p>
                <p className="truncate font-display text-[13px] text-ink-900/55">{session?.email}</p>
              </div>
              <div className="h-px bg-ink-900/10" />
              <Link
                href="/"
                role="menuitem"
                className="mt-1 flex h-10 items-center rounded px-3 font-display text-[14px] text-ink-900 hover:bg-mist"
              >
                Back to website
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onSignOut();
                  router.push("/");
                }}
                className="flex h-10 w-full items-center rounded px-3 text-left font-display text-[14px] text-[#B42318] hover:bg-mist"
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* phones: the chips on their own row, splitting the width */}
      {chips("px-4 pb-3 sm:hidden")}
    </header>
  );
}
