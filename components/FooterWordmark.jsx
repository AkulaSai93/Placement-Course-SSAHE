"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * The oversized "Lastmile" at the foot of the page — node 95:6540.
 *
 * Both of its dimensions are measured at runtime rather than written down.
 * Every earlier attempt hard-coded a ratio (`29.85cqw` wide, `0.79em` tall),
 * and each one encoded the metrics of one typeface at one tracking: the width
 * clipped the final "e", and the height cut the word in half, because the
 * baseline of our font does not sit where the design's font puts it.
 *
 * So two things are read off the real rendered text:
 *
 *   width   the advance at a reference size, scaled to the space available
 *   height  the ink box from the canvas — the cap top down through the round
 *           letters' overshoot — with the text pulled up so its ink starts at
 *           the top of the window
 *
 * That holds for any font, any string and any width. A ResizeObserver redoes
 * it when the footer changes width, and `document.fonts.ready` redoes it once
 * the webfont replaces the fallback and every metric moves.
 *
 * Before hydration the `cqw` fallback keeps the server-rendered page showing a
 * full-width wordmark; it is deliberately a little small, since too narrow
 * reads as a margin while too wide reads as a bug.
 */
const REFERENCE_PX = 100;

/** the line box the text is laid out in, as a multiple of the font size */
const LINE_HEIGHT = 1;

/** pre-hydration only, deliberately under the measured fit */
const FALLBACK_CQW = 26.5;
const FALLBACK_INK_RATIO = 0.72;

export default function FooterWordmark({ children }) {
  const boxRef = useRef(null);
  const textRef = useRef(null);
  const [metrics, setMetrics] = useState(null);

  const fit = useCallback(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;

    const available = box.clientWidth;
    if (!available) return;

    // 1. Width. Lay the text out at a known size and read what it takes up.
    //    The <p> is a flex item, so it shrinks to its content and its own box
    //    is the advance — `scrollWidth` would report the container width
    //    whenever the text happens to be narrower than it.
    text.style.fontSize = `${REFERENCE_PX}px`;
    const natural = text.getBoundingClientRect().width;
    text.style.fontSize = "";
    if (!natural) return;

    const fontSize = (available / natural) * REFERENCE_PX;

    // 2. Height. Ask the canvas where the ink actually sits at that size.
    const style = getComputedStyle(text);
    const canvas = document.createElement("canvas").getContext("2d");
    canvas.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
    const m = canvas.measureText(text.textContent || "");

    const inkAscent = m.actualBoundingBoxAscent;
    const inkDescent = m.actualBoundingBoxDescent;
    if (!inkAscent) {
      setMetrics({ fontSize, height: null, shift: 0 });
      return;
    }

    // where the baseline falls inside the line box, half-leading included
    const lineBox = fontSize * LINE_HEIGHT;
    const halfLeading = (lineBox - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2;
    const baselineFromTop = halfLeading + m.fontBoundingBoxAscent;

    setMetrics({
      fontSize,
      // the whole word, cap top through the overshoot under the baseline
      height: inkAscent + inkDescent,
      // pull the line box up so that ink starts at the top of the window
      shift: inkAscent - baselineFromTop,
    });
  }, []);

  useLayoutEffect(() => {
    fit();

    const box = boxRef.current;
    if (!box || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [fit]);

  useEffect(() => {
    if (!document.fonts?.ready) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) fit();
    });
    return () => {
      cancelled = true;
    };
  }, [fit]);

  const fontSize = metrics ? `${metrics.fontSize}px` : `${FALLBACK_CQW}cqw`;
  const height = metrics?.height ? `${metrics.height}px` : `${FALLBACK_INK_RATIO}em`;

  return (
    <div ref={boxRef} className="[container-type:inline-size]">
      {/* a flex row, not a text line: an inline-block would sit on the
          container's own baseline, and at this font size that strut pushed the
          word ~139px down the window */}
      <div className="flex justify-center overflow-hidden" style={{ fontSize, height }}>
        <p
          ref={textRef}
          className="select-none whitespace-nowrap font-display font-medium tracking-[-0.045em] text-white"
          style={{
            lineHeight: LINE_HEIGHT,
            marginTop: metrics ? `${metrics.shift}px` : undefined,
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
