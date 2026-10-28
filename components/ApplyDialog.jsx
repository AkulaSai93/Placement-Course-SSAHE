"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import SignupFlow from "@/components/signup/SignupFlow";
import { readSession } from "@/lib/session";

/**
 * The dialog behind every "Apply Now" and "Download Brochure" (UI guide P1.1).
 *
 * "Apply" is the signup — email and mobile, each confirmed with a code, then
 * name, year and branch — and it ends on the student's dashboard (see
 * SignupFlow). Someone who already has an account skips all of that and goes
 * straight to the dashboard. "Brochure" is the short form below.
 *
 * Until now those buttons pointed at `#apply` and `#brochure`, which are not
 * sections on the page, so nothing happened on click. The dialog opens from
 * anywhere via `useApply()`, carries both modes, and closes back to the button
 * that opened it.
 *
 * Sizes follow the guide: 480px card, 32px padding, 12px radius, 48px inputs
 * with a 4px radius and 16px text (anything smaller makes iOS zoom the page),
 * a full-width 48px button, and a full-screen sheet below sm.
 *
 * NOTE: the brochure form only simulates a request. There is no endpoint yet — wire
 * `submit()` to the real one and keep the error and success states.
 */
const ApplyContext = createContext(null);

export function useApply() {
  const ctx = useContext(ApplyContext);
  if (!ctx) throw new Error("useApply must be used inside <ApplyProvider>");
  return ctx;
}

/** the brochure only needs a name and a way to send it */
const FIELDS = [
  { name: "name", label: "Full name", type: "text", placeholder: "Your name", autoComplete: "name" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "98765 43210", autoComplete: "tel", prefix: "+91" },
  { name: "email", label: "Email", type: "email", placeholder: "you@college.edu", autoComplete: "email" },
];

const EMPTY = { name: "", phone: "", email: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!/^\d{10}$/.test(values.phone.replace(/\s+/g, "")))
    errors.phone = "Enter a 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  return errors;
}

/** the signup card's width, and its gap from the button it hangs under */
const PANEL_W = 480;
const PANEL_GAP = 12;
const EDGE = 16;

export function ApplyProvider({ children }) {
  const router = useRouter();
  const [mode, setMode] = useState(null); // "apply" | "brochure" | null
  const [anchor, setAnchor] = useState(null);
  const lastTrigger = useRef(null);

  // Every caller just says open("apply"), so the button that was pressed is
  // picked up here instead: the panel opens under whichever one it was.
  // (Safari never focuses a clicked button, so activeElement can't be used.)
  useEffect(() => {
    const onClick = (e) => {
      lastTrigger.current = e.target.closest?.("button, a") || null;
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const open = useCallback(
    (next = "apply") => {
      // already signed up: Apply Now means "take me to my dashboard"
      if (next === "apply" && readSession()) {
        router.push("/dashboard/payment");
        return;
      }
      setAnchor(next === "apply" ? lastTrigger.current : null);
      setMode(next);
    },
    [router]
  );
  const close = useCallback(() => setMode(null), []);

  return (
    <ApplyContext.Provider value={{ open, close, mode }}>
      {children}
      <ApplyDialog mode={mode} anchor={anchor} onClose={close} />
    </ApplyContext.Provider>
  );
}

/** room the card wants beneath its button, and the fixed header to keep clear of */
const ROOM_BELOW = 560;
const HEADER_CLEAR = 96;

/**
 * Where the signup card goes: directly under the button that opened it, lined
 * up with one of its edges and kept 16px inside the viewport (on a phone,
 * full width less the gutters).
 *
 * A button low on the screen — the hero's copy is bottom-aligned — leaves no
 * room beneath it, so the page is first scrolled up just enough to make that
 * room, never so far that the button slides under the fixed header. Whatever
 * is still short scrolls inside the card.
 */
function placePanel(el) {
  if (!el?.isConnected) return null;
  const vh = window.innerHeight;
  let r = el.getBoundingClientRect();
  const short = ROOM_BELOW - (vh - r.bottom - PANEL_GAP - EDGE);
  if (short > 0) {
    const lift = Math.min(short, Math.max(0, r.top - HEADER_CLEAR));
    if (lift > 0) {
      // instant, not the page's smooth scrolling, so the measurement below
      // reads where the button has actually landed
      window.scrollTo({ top: window.scrollY + lift, behavior: "instant" });
      r = el.getBoundingClientRect();
    }
  }
  const vw = window.innerWidth;
  const width = Math.min(PANEL_W, vw - EDGE * 2);
  // right edges line up when the card fits that way (the header button);
  // otherwise left edges do (the hero button, at the left of the page)
  const ideal = r.right - width >= EDGE ? r.right - width : r.left;
  const left = Math.min(Math.max(ideal, EDGE), vw - width - EDGE);
  const top = r.bottom + PANEL_GAP;
  // a button pinned to the bottom of the screen (the phone price bar) can't
  // be scrolled up, so there is nowhere under it: use the centred card
  if (vh - top - EDGE < 300) return null;
  return { left, width, top, maxHeight: vh - top - EDGE };
}

function ApplyDialog({ mode, anchor, onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const cardRef = useRef(null);
  const firstFieldRef = useRef(null);
  const openerRef = useRef(null);

  const isOpen = mode !== null;
  const brochure = mode === "brochure";
  const fields = FIELDS;
  const [place, setPlace] = useState(null);

  // measured before paint so the panel never flashes in the wrong spot, and
  // again on resize (rotating a tablet, dragging a window)
  useLayoutEffect(() => {
    if (!isOpen || brochure) return;
    const update = () => setPlace(placePanel(anchor));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isOpen, brochure, anchor]);

  // hold the page still, close on Escape, and hand focus to the first field
  useEffect(() => {
    if (!isOpen) return;
    openerRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
      openerRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  // a fresh form each time it opens
  useEffect(() => {
    if (isOpen) {
      setValues(EMPTY);
      setErrors({});
      setSent(false);
      setSending(false);
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = fields.find((f) => found[f.name]);
      document.getElementById(`apply-${first.name}`)?.focus();
      return;
    }
    setSending(true);
    // TODO: POST to the real endpoint once it exists
    await new Promise((r) => setTimeout(r, 650));
    setSending(false);
    setSent(true);
  };

  const title = "Download the brochure";
  const blurb = "Tell us where to send it and the brochure is on its way.";

  // signup: the same card as before, hanging off the button that opened it.
  // The brochure, or a signup opened with no button to anchor to, stays the
  // centred dialog.
  const anchored = !brochure && place;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-stretch justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-title"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-[2px]"
      />

      <div
        ref={cardRef}
        style={anchored ? place : undefined}
        className={
          anchored
            ? "fixed flex animate-fadeUp flex-col overflow-y-auto rounded-[12px] bg-white px-6 pb-8 pt-6 sm:p-8"
            : "relative flex max-h-full w-full flex-col overflow-y-auto bg-white px-6 pb-10 pt-16 sm:max-w-[480px] sm:rounded-[12px] sm:p-8"
        }
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded text-ink-900/60 transition-colors hover:bg-ink-900/5 hover:text-ink-900 sm:right-5 sm:top-5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {!brochure ? (
          <SignupFlow onClose={onClose} />
        ) : sent ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-flame/10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  stroke="#E7000B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 id="apply-title" className="font-display text-[24px] font-medium text-ink-900">
              Brochure sent
            </h2>
            <p className="max-w-[320px] font-display text-[15px] leading-[1.55] text-ink-900/60">
              {`We have emailed the brochure to ${values.email}.`}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 flex h-12 w-full items-center justify-center rounded bg-flame font-display text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col">
            <h2 id="apply-title" className="font-display text-[24px] font-medium text-ink-900">
              {title}
            </h2>
            <p className="mt-1.5 font-display text-[15px] leading-[1.5] text-ink-900/60">{blurb}</p>

            <div className="mt-6 flex flex-col gap-4">
              {fields.map((field, i) => {
                const error = errors[field.name];
                const id = `apply-${field.name}`;
                const base =
                  "h-12 w-full rounded border bg-white px-3.5 font-display text-[16px] text-ink-900 outline-none transition-colors placeholder:text-ink-900/35 focus:border-ink-900";
                const border = error ? "border-[#B42318]" : "border-[#D0D5DD]";
                return (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={id}
                      className="font-display text-[14px] font-medium text-ink-900"
                    >
                      {field.label}
                    </label>

                    {field.prefix ? (
                      <div
                        className={`flex h-12 items-center rounded border ${border} bg-white transition-colors focus-within:border-ink-900`}
                      >
                        <span className="pl-3.5 pr-2 font-display text-[16px] text-ink-900/55">
                          {field.prefix}
                        </span>
                        <input
                          id={id}
                          ref={i === 0 ? firstFieldRef : undefined}
                          type={field.type}
                          inputMode="numeric"
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          value={values[field.name]}
                          onChange={(e) => set(field.name, e.target.value)}
                          aria-invalid={!!error}
                          aria-describedby={error ? `${id}-error` : undefined}
                          className="h-full w-full rounded-r bg-transparent pr-3.5 font-display text-[16px] text-ink-900 outline-none placeholder:text-ink-900/35"
                        />
                      </div>
                    ) : (
                      <input
                        id={id}
                        ref={i === 0 ? firstFieldRef : undefined}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        placeholder={field.placeholder}
                        value={values[field.name]}
                        onChange={(e) => set(field.name, e.target.value)}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className={`${base} ${border}`}
                      />
                    )}

                    {error ? (
                      <p
                        id={`${id}-error`}
                        className="font-display text-[13px] text-[#B42318]"
                      >
                        {error}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 flex h-12 w-full items-center justify-center rounded bg-flame font-display text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send me the brochure"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
