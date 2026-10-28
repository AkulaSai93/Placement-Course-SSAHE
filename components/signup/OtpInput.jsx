"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

/**
 * Six one-digit boxes that behave like one field:
 *
 *   typing     moves to the next box
 *   backspace  on an empty box clears and steps back to the previous one
 *   arrows     move between boxes
 *   paste      a whole code (from anywhere, spaces and dashes ignored) fills
 *              every box at once
 *   autofill   `one-time-code` on the first box lets iOS / Android offer the
 *              code from the SMS or mail; it arrives as one long value, which
 *              is treated exactly like a paste
 *
 * `onComplete` fires the moment the last digit lands, so nobody has to reach
 * for a Verify button.
 */
const OtpInput = forwardRef(function OtpInput(
  { length, value, onChange, onComplete, error, disabled, idPrefix },
  ref
) {
  const boxes = useRef([]);
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  // The code as of the last keystroke, not the last render. Moving focus to
  // the next box runs that box's onFocus before React has re-rendered, and
  // with the stale `value` it saw an empty code and bounced focus back to the
  // first box — so every digit overwrote the first one.
  const latest = useRef(value);
  latest.current = value;
  const emit = (next) => {
    latest.current = next;
    onChange(next);
  };

  useImperativeHandle(ref, () => ({
    focus: () => boxes.current[Math.min(latest.current.length, length - 1)]?.focus(),
  }));

  const commit = (next) => {
    const clean = next.replace(/\D/g, "").slice(0, length);
    emit(clean);
    if (clean.length === length) onComplete?.(clean);
    return clean;
  };

  const handleChange = (i, raw) => {
    const typed = raw.replace(/\D/g, "");
    if (!typed) return;
    const current = latest.current;
    // more than one digit = paste or autofill: fill from this box onwards
    if (typed.length > 1) {
      const filled = commit(current.slice(0, i) + typed);
      boxes.current[Math.min(filled.length, length - 1)]?.focus();
      return;
    }
    // one digit: it replaces this box's digit (or is appended at the end)
    const next = commit(current.slice(0, i) + typed.slice(-1) + current.slice(i + 1));
    if (i < length - 1 && next.length > i) boxes.current[i + 1]?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const current = latest.current;
      if (current[i]) {
        // codes are filled left to right, so clearing a box drops it and
        // everything after it
        emit(current.slice(0, i));
      } else if (i > 0) {
        emit(current.slice(0, i - 1));
        boxes.current[i - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      boxes.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      boxes.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const filled = commit(e.clipboardData.getData("text"));
    boxes.current[Math.min(filled.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-between gap-2 sm:gap-3" role="group" aria-label="One-time code">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (boxes.current[i] = el)}
          id={i === 0 ? idPrefix : undefined}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          // the first box accepts a whole autofilled code; the rest take one
          maxLength={i === 0 ? length : 1}
          pattern="[0-9]*"
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${idPrefix}-error` : undefined}
          disabled={disabled}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => {
            // no gaps: a tap on a box past the first empty one lands on that
            // empty one instead
            const filled = latest.current.length;
            if (i > filled) boxes.current[filled]?.focus();
            else e.target.select();
          }}
          className={`aspect-square h-auto w-full min-w-0 max-w-[56px] rounded border bg-white text-center font-display text-[22px] font-medium text-ink-900 outline-none transition-colors focus:border-ink-900 focus:ring-2 focus:ring-ink-900/10 disabled:bg-mist ${
            error ? "border-[#B42318]" : d ? "border-ink-900/40" : "border-[#D0D5DD]"
          }`}
        />
      ))}
    </div>
  );
});

export default OtpInput;
