"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Field, PhoneInput, PrimaryButton, SelectInput, TextInput } from "@/components/FormControls";
import OtpInput from "@/components/signup/OtpInput";
import { OTP_LENGTH, RESEND_AFTER_S, sendOtp, verifyOtp } from "@/lib/otp";
import { BRANCHES, PROGRAMME, YEARS } from "@/lib/programme";
import { findAccount, makeRef, writeSession } from "@/lib/session";

/**
 * Apply Now → account → dashboard.
 *
 * One entry for everyone. A returning student is recognised once their email
 * code checks out and goes straight to the dashboard; someone new carries on
 * through the remaining steps:
 *
 *   1  Email    address, then the code mailed to it
 *   2  Mobile   number, then the code texted to it
 *   3  Details  name, year of study, branch
 *
 * What keeps it smooth:
 *   - every step focuses its own field, and Enter always moves forward
 *   - a code verifies itself as soon as the sixth digit lands (typed, pasted
 *     or autofilled from the SMS), with no button to find
 *   - a wrong code clears and refocuses rather than leaving six red boxes
 *   - "Change" and the back arrow keep what was already typed
 *   - resend unlocks after 30 seconds, with the countdown shown
 *   - after the last step the dashboard opens on its own
 */
const STEPS = ["email", "emailOtp", "mobile", "mobileOtp", "details"];
const STAGES = [
  { label: "Email", steps: ["email", "emailOtp"] },
  { label: "Mobile", steps: ["mobile", "mobileOtp"] },
  { label: "Details", steps: ["details"] },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupFlow({ onClose }) {
  const router = useRouter();
  const [step, setStep] = useState("email");
  const [values, setValues] = useState({
    email: "",
    emailCode: "",
    phone: "",
    phoneCode: "",
    name: "",
    year: "",
    branch: "",
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const fieldRef = useRef(null);

  const stage = STAGES.findIndex((s) => s.steps.includes(step));

  // hand focus to the step's first control every time the step changes
  useEffect(() => {
    const t = setTimeout(() => fieldRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [step]);

  // resend countdown
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };

  const fail = (name, message) => {
    setErrors({ [name]: message });
    setBusy(false);
    setTimeout(() => fieldRef.current?.focus(), 30);
  };

  const back = () => {
    setErrors({});
    const i = STEPS.indexOf(step);
    if (i > 0) setStep(STEPS[i - 1]);
  };

  /* ---------- step actions ---------- */

  const requestCode = async (channel) => {
    const target = channel === "email" ? values.email.trim() : values.phone;
    const codeField = channel === "email" ? "emailCode" : "phoneCode";
    setBusy(true);
    try {
      await sendOtp(channel, target);
    } catch (err) {
      fail(channel === "email" ? "email" : "phone", err.message || "Could not send the code. Try again.");
      return false;
    }
    set(codeField, "");
    setResendIn(RESEND_AFTER_S);
    setBusy(false);
    return true;
  };

  const submitEmail = async () => {
    const email = values.email.trim();
    if (!EMAIL_RE.test(email)) return fail("email", "Enter a valid email address.");
    if (await requestCode("email")) setStep("emailOtp");
  };

  const submitPhone = async () => {
    if (!/^[6-9]\d{9}$/.test(values.phone))
      return fail("phone", "Enter a 10-digit Indian mobile number.");
    if (await requestCode("sms")) setStep("mobileOtp");
  };

  const checkCode = async (channel, code) => {
    const codeField = channel === "email" ? "emailCode" : "phoneCode";
    if (code.length !== OTP_LENGTH) return fail(codeField, `Enter all ${OTP_LENGTH} digits.`);
    setBusy(true);
    let ok = false;
    try {
      ok = await verifyOtp(channel, channel === "email" ? values.email.trim() : values.phone, code);
    } catch (err) {
      return fail(codeField, err.message || "Could not check the code. Try again.");
    }
    if (!ok) {
      set(codeField, "");
      return fail(codeField, "That code is not right. Check it and try again.");
    }
    // coming back: the email is enough to sign in
    if (channel === "email") {
      const existing = findAccount(values.email);
      if (existing) {
        writeSession(existing);
        router.push("/dashboard/payment");
        onClose();
        return;
      }
    }
    setBusy(false);
    setErrors({});
    setStep(channel === "email" ? "mobile" : "details");
  };

  const submitDetails = async () => {
    const found = {};
    if (values.name.trim().length < 2) found.name = "Enter your full name.";
    if (!values.year) found.year = "Choose your year of study.";
    if (!values.branch) found.branch = "Choose your branch.";
    if (Object.keys(found).length) {
      setErrors(found);
      document.getElementById(`signup-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    // TODO: create the account on the server; this keeps it in the browser
    await new Promise((r) => setTimeout(r, 500));
    writeSession({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone,
      year: values.year,
      branch: values.branch,
      payRef: makeRef(),
      paid: false,
      createdAt: new Date().toISOString(),
    });
    router.push("/dashboard/payment");
    onClose();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (busy) return;
    if (step === "email") submitEmail();
    else if (step === "emailOtp") checkCode("email", values.emailCode);
    else if (step === "mobile") submitPhone();
    else if (step === "mobileOtp") checkCode("sms", values.phoneCode);
    else submitDetails();
  };

  /* ---------- render ---------- */

  const isCode = step === "emailOtp" || step === "mobileOtp";
  const codeChannel = step === "emailOtp" ? "email" : "sms";
  const codeField = step === "emailOtp" ? "emailCode" : "phoneCode";
  const codeTarget = step === "emailOtp" ? values.email.trim() : `+91 ${values.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}`;

  const copy = {
    email: ["Let’s get you started", "Enter your email. We’ll send a code to confirm it’s you."],
    emailOtp: ["Check your inbox", null],
    mobile: ["Add your mobile number", "We’ll text a code to verify it. Our team uses this number to reach you."],
    mobileOtp: ["Enter the code we texted", null],
    details: ["A little about you", `${PROGRAMME.name} is open to students in their 3rd and 4th year.`],
  }[step];

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col">
      {/* progress: three stages, each bar fills when the stage is reached */}
      <div className="flex items-center gap-3 pr-10">
        {step !== "email" ? (
          <button
            type="button"
            onClick={back}
            aria-label="Back"
            className="-ml-2 flex size-9 shrink-0 items-center justify-center rounded text-ink-900/60 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
        <ol className="flex flex-1 gap-2" aria-label={`Step ${stage + 1} of ${STAGES.length}: ${STAGES[stage].label}`}>
          {STAGES.map((s, i) => (
            <li key={s.label} className="flex flex-1 flex-col gap-1.5">
              <span className="h-1 overflow-hidden rounded-full bg-ink-900/10">
                <span
                  className={`block h-full rounded-full bg-flame transition-[width] duration-500 ease-out ${
                    i < stage ? "w-full" : i === stage ? "w-1/2" : "w-0"
                  }`}
                />
              </span>
              <span
                className={`font-display text-[12px] font-medium transition-colors ${
                  i <= stage ? "text-ink-900" : "text-ink-900/40"
                }`}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* keyed on the step so each one fades in */}
      <div key={step} className="mt-7 flex animate-fadeUp flex-col">
        <h2 id="apply-title" className="font-display text-[24px] font-medium leading-[1.2] text-ink-900">
          {copy[0]}
        </h2>
        {isCode ? (
          <p className="mt-1.5 font-display text-[15px] leading-[1.5] text-ink-900/60">
            We sent a {OTP_LENGTH}-digit code to{" "}
            <span className="font-medium text-ink-900">{codeTarget}</span>.{" "}
            <button
              type="button"
              onClick={back}
              className="font-medium text-flame underline-offset-2 hover:underline"
            >
              Change
            </button>
          </p>
        ) : (
          <p className="mt-1.5 font-display text-[15px] leading-[1.5] text-ink-900/60">{copy[1]}</p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {step === "email" ? (
            <Field id="signup-email" label="Email" error={errors.email}>
              <TextInput
                ref={fieldRef}
                id="signup-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="you@college.edu"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                error={errors.email}
              />
            </Field>
          ) : null}

          {step === "mobile" ? (
            <Field id="signup-phone" label="Mobile number" error={errors.phone}>
              <PhoneInput
                ref={fieldRef}
                id="signup-phone"
                placeholder="98765 43210"
                value={values.phone}
                onChange={(v) => set("phone", v)}
                error={errors.phone}
              />
            </Field>
          ) : null}

          {isCode ? (
            <Field id="signup-code" error={errors[codeField]}>
              <OtpInput
                ref={fieldRef}
                idPrefix="signup-code"
                length={OTP_LENGTH}
                value={values[codeField]}
                onChange={(v) => set(codeField, v)}
                onComplete={(code) => checkCode(codeChannel, code)}
                error={errors[codeField]}
                disabled={busy}
              />
              <div className="mt-1 flex items-center justify-between gap-3 font-display text-[13px]">
                {resendIn > 0 ? (
                  <span className="text-ink-900/50">
                    Resend code in 0:{String(resendIn).padStart(2, "0")}
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => requestCode(codeChannel).then(() => fieldRef.current?.focus())}
                    className="font-medium text-flame underline-offset-2 hover:underline disabled:opacity-60"
                  >
                    Resend code
                  </button>
                )}
              </div>
            </Field>
          ) : null}

          {step === "details" ? (
            <>
              <Field id="signup-name" label="Full name" error={errors.name}>
                <TextInput
                  ref={fieldRef}
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  autoCapitalize="words"
                  placeholder="Your name"
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  error={errors.name}
                />
              </Field>
              <Field id="signup-year" label="Year of study" error={errors.year}>
                <SelectInput
                  id="signup-year"
                  value={values.year}
                  onChange={(v) => set("year", v)}
                  options={YEARS}
                  placeholder="Select your year"
                  error={errors.year}
                />
              </Field>
              <Field id="signup-branch" label="Branch" error={errors.branch}>
                <SelectInput
                  id="signup-branch"
                  value={values.branch}
                  onChange={(v) => set("branch", v)}
                  options={BRANCHES}
                  placeholder="Select your branch"
                  error={errors.branch}
                />
              </Field>
            </>
          ) : null}
        </div>

        <PrimaryButton
          className="mt-6"
          loading={busy}
          loadingLabel={
            step === "email" || step === "mobile"
              ? "Sending code…"
              : isCode
                ? step === "emailOtp" && findAccount(values.email)
                  ? "Signing you in…"
                  : "Verifying…"
                : "Setting up your dashboard…"
          }
        >
          {step === "email" || step === "mobile" ? "Send code" : isCode ? "Verify" : "Create account"}
        </PrimaryButton>

        {step === "email" ? (
          <p className="mt-4 text-center font-display text-[13px] leading-[1.5] text-ink-900/50">
            {PROGRAMME.duration} · {PROGRAMME.mode} · open to 3rd and 4th year students
          </p>
        ) : null}
      </div>
    </form>
  );
}
