"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * The form behind every "Apply Now" and "Download Brochure" (UI guide P1.1).
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
 * NOTE: submitting only simulates a request. There is no endpoint yet — wire
 * `submit()` to the real one and keep the error and success states.
 */
const ApplyContext = createContext(null);

export function useApply() {
  const ctx = useContext(ApplyContext);
  if (!ctx) throw new Error("useApply must be used inside <ApplyProvider>");
  return ctx;
}

const YEARS = ["1st year", "2nd year", "3rd year", "4th year", "Graduated"];

const FIELDS = [
  { name: "name", label: "Full name", type: "text", placeholder: "Your name", autoComplete: "name" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "98765 43210", autoComplete: "tel", prefix: "+91" },
  { name: "email", label: "Email", type: "email", placeholder: "you@college.edu", autoComplete: "email" },
  { name: "college", label: "College", type: "text", placeholder: "Your college", autoComplete: "organization" },
  { name: "year", label: "Year of study", type: "select" },
];

const EMPTY = { name: "", phone: "", email: "", college: "", year: "" };

function validate(values, mode) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!/^\d{10}$/.test(values.phone.replace(/\s+/g, "")))
    errors.phone = "Enter a 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  // the brochure only needs a way to send it
  if (mode === "apply") {
    if (!values.college.trim()) errors.college = "Enter your college.";
    if (!values.year) errors.year = "Choose your year of study.";
  }
  return errors;
}

export function ApplyProvider({ children }) {
  const [mode, setMode] = useState(null); // "apply" | "brochure" | null
  const open = useCallback((next = "apply") => setMode(next), []);
  const close = useCallback(() => setMode(null), []);

  return (
    <ApplyContext.Provider value={{ open, close, mode }}>
      {children}
      <ApplyDialog mode={mode} onClose={close} />
    </ApplyContext.Provider>
  );
}

function ApplyDialog({ mode, onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const cardRef = useRef(null);
  const firstFieldRef = useRef(null);
  const openerRef = useRef(null);

  const isOpen = mode !== null;
  const brochure = mode === "brochure";
  const fields = brochure ? FIELDS.filter((f) => f.name !== "college" && f.name !== "year") : FIELDS;

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
    const found = validate(values, brochure ? "brochure" : "apply");
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

  const title = brochure ? "Download the brochure" : "Apply to uGSOT Lastmile";
  const blurb = brochure
    ? "Tell us where to send it and the brochure is on its way."
    : "Six months, offline, ₹50,000 with No Cost EMI. Open to 3rd and 4th year students.";

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
        className="relative flex max-h-full w-full flex-col overflow-y-auto bg-white px-6 pb-10 pt-16 sm:max-w-[480px] sm:rounded-[12px] sm:p-8"
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

        {sent ? (
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
              {brochure ? "Brochure sent" : "Application received"}
            </h2>
            <p className="max-w-[320px] font-display text-[15px] leading-[1.55] text-ink-900/60">
              {brochure
                ? `We have emailed the brochure to ${values.email}.`
                : "Our team will call you on the number you gave us within two working days."}
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

                    {field.type === "select" ? (
                      <select
                        id={id}
                        ref={i === 0 ? firstFieldRef : undefined}
                        value={values[field.name]}
                        onChange={(e) => set(field.name, e.target.value)}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className={`${base} ${border} appearance-none`}
                      >
                        <option value="">Select</option>
                        {YEARS.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    ) : field.prefix ? (
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
              {sending ? "Sending…" : brochure ? "Send me the brochure" : "Submit application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
