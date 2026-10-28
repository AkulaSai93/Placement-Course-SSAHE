/**
 * One-time codes for the signup flow.
 *
 * DUMMY: there is no SMS or email provider wired up yet, so these resolve
 * after a short delay and any six digits are accepted.
 *
 * TODO: point `sendOtp` / `verifyOtp` at the real endpoints. The UI only
 * relies on the shapes below:
 *   sendOtp   → resolves, or throws Error(message)
 *   verifyOtp → resolves true / false, or throws Error(message)
 */
export const OTP_LENGTH = 6;
export const RESEND_AFTER_S = 30;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// eslint-disable-next-line no-unused-vars
export async function sendOtp(channel, target) {
  await wait(700);
}

// eslint-disable-next-line no-unused-vars
export async function verifyOtp(channel, target, code) {
  await wait(550);
  return new RegExp(`^\\d{${OTP_LENGTH}}$`).test(code);
}
