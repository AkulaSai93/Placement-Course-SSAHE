"use client";

import { forwardRef } from "react";

/**
 * The inputs shared by signup and the dashboard. Same spec as the brochure
 * form in ApplyDialog: 48px tall, 4px radius, 16px text (anything smaller
 * makes iOS zoom the page), grey border that goes ink on focus and red on
 * error, with the error read out through aria-describedby.
 */
const INPUT =
  "h-12 w-full rounded border bg-white px-3.5 font-display text-[16px] text-ink-900 outline-none transition-colors placeholder:text-ink-900/35 disabled:bg-mist disabled:text-ink-900/70";

// the focus colour is only added when there is no error, or the red would
// vanish the moment the field is refocused to fix it
const borderFor = (error) =>
  error ? "border-[#B42318]" : "border-[#D0D5DD] focus:border-ink-900";

export function Field({ id, label, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="font-display text-[14px] font-medium text-ink-900">
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="font-display text-[13px] text-[#B42318]">
          {error}
        </p>
      ) : hint ? (
        <p className="font-display text-[13px] text-ink-900/50">{hint}</p>
      ) : null}
    </div>
  );
}

export const TextInput = forwardRef(function TextInput({ id, error, className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${INPUT} ${borderFor(error)} ${className}`}
      {...props}
    />
  );
});

/**
 * Keeps the ten digits of an Indian mobile number from whatever was typed or
 * pasted: spaces and dashes go, and a leading +91, 91 or 0 is dropped.
 */
export function cleanPhone(raw) {
  let d = raw.replace(/\D/g, "");
  if (d.length > 10 && d.startsWith("91")) d = d.slice(2);
  else if (d.length > 10 && d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
}

/**
 * +91 fixed in front; only the ten digits reach `onChange`. No `maxLength` —
 * it counts the spaces people type ("98765 43210") and would cut the number
 * short before cleanPhone ever saw it.
 */
export const PhoneInput = forwardRef(function PhoneInput({ id, error, value, onChange, ...props }, ref) {
  return (
    <div
      className={`flex h-12 items-center rounded border ${borderFor(error)} bg-white transition-colors ${error ? "" : "focus-within:border-ink-900"}`}
    >
      <span className="pl-3.5 pr-2 font-display text-[16px] text-ink-900/55">+91</span>
      <input
        ref={ref}
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={value}
        onChange={(e) => onChange(cleanPhone(e.target.value))}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-full w-full rounded-r bg-transparent pr-3.5 font-display text-[16px] text-ink-900 outline-none placeholder:text-ink-900/35"
        {...props}
      />
    </div>
  );
});

/**
 * Native select — the phone's own picker is the smoothest thing on mobile.
 * The native arrow is suppressed, so it carries its own chevron, and the text
 * stays placeholder-grey until something is chosen (verification N2).
 */
export const SelectInput = forwardRef(function SelectInput(
  { id, error, value, onChange, options, placeholder },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${INPUT} ${borderFor(error)} appearance-none pr-11 ${
          value ? "text-ink-900" : "text-ink-900/35"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink-900">
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2"
      >
        <path
          d="m5 7.5 5 5 5-5"
          stroke="#667085"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});

export function PrimaryButton({ loading, loadingLabel, children, className = "", ...props }) {
  return (
    <button
      type="submit"
      disabled={loading || props.disabled}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded bg-flame font-display text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function Spinner({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={`animate-spin ${className}`}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
