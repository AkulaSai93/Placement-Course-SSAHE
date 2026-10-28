"use client";

import { useState } from "react";

/** One-open-at-a-time FAQ list, the same motion as the homepage FAQ. */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="divide-y divide-ink-900/10">
      {items.map((item, i) => {
        const open = i === openIndex;
        const id = `faq-${i}`;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              aria-controls={id}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-display text-[15px] font-medium leading-[1.45] text-ink-900">
                {item.q}
              </span>
              <span
                aria-hidden="true"
                className={`shrink-0 text-[19px] leading-none text-flame transition-transform duration-300 ${
                  open ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              id={id}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-4 font-display text-[14px] leading-[1.6] text-ink-900/60">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
