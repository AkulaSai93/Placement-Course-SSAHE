"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * The signed-in student, kept in this browser only.
 *
 * There is no auth backend yet, so the account the signup flow creates lives
 * in localStorage under one key. Every read and write is wrapped: private
 * windows and blocked site data throw, and the app has to treat that as
 * "signed out" rather than crash.
 *
 * TODO: replace with the real session (cookie / token) once the API exists.
 * Nothing outside this file should touch storage directly.
 */
const KEY = "lastmile.session";
/** every account made on this browser, by email, so "Sign In" can find it */
const ACCOUNTS = "lastmile.accounts";
const EVENT = "lastmile:session";

export function readSession() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readAccounts() {
  try {
    return JSON.parse(window.localStorage.getItem(ACCOUNTS) || "{}");
  } catch {
    return {};
  }
}

/** a returning student's saved profile, or null for someone new */
export function findAccount(email) {
  return readAccounts()[email.trim().toLowerCase()] || null;
}

export function writeSession(next) {
  try {
    if (next) {
      window.localStorage.setItem(KEY, JSON.stringify(next));
      // signing out clears the session but keeps the account to sign back in to
      const accounts = readAccounts();
      accounts[next.email.toLowerCase()] = next;
      window.localStorage.setItem(ACCOUNTS, JSON.stringify(accounts));
    }
    else window.localStorage.removeItem(KEY);
  } catch {
    // storage unavailable — the in-memory copy below still updates this tab
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
}

/** a short random id, used for the parent's payment link */
export function makeRef() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 10);
}

/**
 * `ready` is false until the first read, so pages can wait instead of
 * flashing their signed-out state during hydration.
 */
export function useSession() {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
    const onChange = (e) => setSession(e.detail ?? readSession());
    const onStorage = (e) => {
      if (e.key === KEY) setSession(readSession());
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const update = useCallback((patch) => {
    const next = { ...(readSession() || {}), ...patch };
    writeSession(next);
  }, []);

  const signOut = useCallback(() => writeSession(null), []);

  return { session, ready, update, signOut };
}
