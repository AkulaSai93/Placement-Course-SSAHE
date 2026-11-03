"use client";

import { Fragment, useState } from "react";

/**
 * FAQ — the twenty questions from the live sot.upgrad.com/ssahelr page, in
 * its five groups and numbered straight through, so "see Q18" in an answer
 * can link to #faq-q-18.
 *
 * An answer is a list of blocks: a string is a paragraph, `{ list: [...] }` a
 * bulleted list. Inside any string, [text](href) becomes a link — that is how
 * the cross-references and the contact address are written.
 *
 * FAQ_GROUPS is exported so the dashboard's payment page can show the fee and
 * refund answers word for word rather than keeping its own copy.
 */
export const CONTACT_EMAIL = "ugsotlaunchready@upgradsot.com";

export const FAQ_GROUPS = [
  {
    title: "About the Programme",
    items: [
      {
        q: "What is the uGSOT LaunchReady Programme?",
        a: [
          "It's a 6-month offline programme from upGrad School of Technology (uGSOT) that builds skills and placement readiness. It is supplementary learning that runs alongside a student's existing degree.",
        ],
      },
      {
        q: "When does it start, how long does it run, and how is it delivered?",
        a: [
          `The cohort starts on 1 December 2026. It runs for six months, and all sessions are offline. uGSOT may change the start date, schedule, timings or delivery mode if academic, operational or regulatory reasons require it. Any major change will be sent to the student's registered contact details. The offer letter doesn't specify the campus location, session timings or curriculum. For these, write to [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}).`,
        ],
      },
      {
        q: "Will my child get a degree or diploma at the end?",
        a: [
          "No. uGSOT is not a college or university. The programme does not grant a degree, diploma or any other statutory academic qualification.",
        ],
      },
      {
        q: "Does the programme affect my current degree?",
        a: [
          "No. It does not replace, substitute or change any requirement of the degree the student is enrolled in.",
        ],
      },
    ],
  },
  {
    title: "Eligibility and Admission",
    items: [
      {
        q: "Who can apply?",
        a: [
          "Students in the 3rd or 4th year of a B.Tech/B.E., BCA or B.Sc. degree. They must stay enrolled in that year of study both when they join and for the whole programme period.",
        ],
      },
      {
        q: "Does receiving the offer letter mean admission is confirmed?",
        a: [
          "No. The offer is provisional. Admission is confirmed only after three things are done: the admission formalities are complete, eligibility is verified, and the balance fee is paid. Paying the seat blocking amount and receiving the offer letter do not confirm admission on their own.",
        ],
      },
      {
        q: "What documents will be needed?",
        a: [
          "Students may be asked for proof of enrolment, proof of educational qualifications and any other information uGSOT reasonably needs. All documents must be accurate, complete, current and genuine.",
        ],
      },
      {
        q: "What happens if the information submitted turns out to be incorrect?",
        a: [
          "uGSOT can cancel or suspend enrolment if a student doesn't meet the eligibility criteria or if any document is false, misleading or incomplete. In cases of misrepresentation or fraud, no refund is available.",
        ],
      },
      {
        q: "How long is the offer letter valid?",
        a: [
          "For 10 days from the date it is issued, or until the cohort start date, whichever comes first. uGSOT can withdraw or extend it.",
        ],
      },
    ],
  },
  {
    title: "Fees and Payment",
    items: [
      {
        q: "What is the total fee?",
        a: ["INR 50,000 + 18% GST, which comes to INR 59,000 including GST, for the full six months."],
      },
      {
        q: "What is the INR 499 seat blocking amount, and is it charged on top of the fee?",
        a: [
          "It is paid before the offer letter is issued and it holds the student's seat. It is not extra: it is deducted from the total fee, so the balance payable is INR 58,501.",
        ],
      },
      {
        q: "When is the balance fee due?",
        a: [
          "Within 10 days of the offer letter's issue date, unless uGSOT gives a different timeline. If payment is late, the admission or programme access may be suspended or withdrawn.",
        ],
      },
      {
        q: "How can the fee be paid?",
        a: [
          "There are two options:",
          {
            list: [
              "A direct bank transfer (net banking, bank transfer or deposit) to Techiora Labs Private Limited. The account details are in Table-B of the offer letter.",
              "A loan or EMI through a third-party financing provider.",
            ],
          },
          "After paying, share the transaction reference or UTR number with uGSOT.",
        ],
      },
      {
        q: "Is the loan option an education loan?",
        a: [
          'No. It is a personal loan, so it does not come with the tax benefits of an education loan. Approval, interest, charges and repayment are decided entirely by the financing provider, not uGSOT. Any "No-Cost EMI" offer depends on that provider\'s terms.',
        ],
      },
    ],
  },
  {
    title: "Refunds, Cancellation and Deferral",
    items: [
      {
        q: "Is the seat blocking amount refundable?",
        a: [
          "No, it is non-refundable. It is deducted from the total fee, and it does not come back if the student withdraws or cancels. There is one exception: if uGSOT discontinues the programme and offers no suitable alternative, a refund may apply under the refund terms (see [Q18](#faq-q-18)).",
        ],
      },
      {
        q: "Can the balance fee be refunded?",
        a: [
          "Yes, but only if the request is made before 1 December 2026 (the cohort start date). The request must be in writing, sent through the designated support channel, and must state the reason. Approved refunds are processed within 30 working days, usually to the original payment method. No refund is possible on or after the start date.",
        ],
      },
      {
        q: "Can my child defer to a later batch?",
        a: [
          "No. Deferral is not allowed, and fees cannot be moved to another cohort or programme. Missing sessions or asking to defer does not extend any payment deadline and does not earn a refund.",
        ],
      },
      {
        q: "What if uGSOT discontinues the programme?",
        a: [
          "uGSOT will tell affected learners. Where reasonably practicable, it may offer an alternative arrangement, move the learner to another suitable cohort or programme, or give a refund under the refund terms if no suitable alternative is offered.",
        ],
      },
    ],
  },
  {
    title: "Outcomes and Requirements",
    items: [
      {
        q: "Does the programme guarantee a job, internship or placement?",
        a: [
          "No. The programme includes training that prepares students for placements. uGSOT does not arrange placements, help with job searches or guarantee any job, internship or interview. Learners with confirmed admission do get one year of Internshala Pro free. That access is run by Internshala under its own terms, and it doesn't guarantee any job or internship either.",
        ],
      },
      {
        q: "What does my child need to take part?",
        a: [
          "A laptop is mandatory. The minimum spec is:",
          {
            list: [
              "An i5 processor at 2.6 GHz or faster (AMD processors are not allowed)",
              "8 GB RAM and a 240 GB drive",
              "Windows 10 or later, or macOS",
              "MS Office 2010 or later",
              "Up-to-date OS patches and antivirus",
            ],
          },
          "An i7 at 3.8 GHz is recommended. Students may also need accounts on third-party tools such as code repositories, cloud services or AI tools. Any charges beyond those tools' free tiers are paid by the student.",
        ],
      },
    ],
  },
];

/** every question with its running number, 1 to 20 */
export const FAQ_ITEMS = FAQ_GROUPS.flatMap((g) => g.items).map((item, i) => ({ ...item, n: i + 1 }));

const LINK =
  "text-flame underline decoration-flame/40 underline-offset-2 hover:decoration-flame";

/** a string with [text](href) links turned into anchors */
function Inline({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    return (
      <a key={i} href={m[2]} className={LINK}>
        {m[1]}
      </a>
    );
  });
}

/** an answer's blocks: paragraphs and bulleted lists */
export function Answer({ blocks }) {
  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, i) =>
        typeof block === "string" ? (
          <p key={i}>
            <Inline text={block} />
          </p>
        ) : (
          <ul key={i} className="list-disc space-y-1.5 pl-5">
            {block.list.map((li) => (
              <li key={li}>
                <Inline text={li} />
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default function Faq() {
  const [openN, setOpenN] = useState(1);
  let n = 0;

  // a "see Q18" link opens that question as well as scrolling to it
  const onAnswerClick = (e) => {
    const href = e.target.closest?.("a")?.getAttribute("href") || "";
    const m = href.match(/^#faq-q-(\d+)$/);
    if (m) setOpenN(Number(m[1]));
  };

  return (
    <section id="faqs" className="bg-mist px-6 py-10 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 min-[1380px]:flex-row min-[1380px]:items-start min-[1380px]:justify-between min-[1380px]:gap-10">
        {/* left column */}
        <div className="flex flex-col gap-6 min-[1380px]:sticky min-[1380px]:top-[112px] min-[1380px]:w-[496px] min-[1380px]:shrink-0 min-[1380px]:self-start">
          <div className="flex flex-col">
            <h2 className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:text-[48px] lg:leading-[52px]">
              Got Questions?
            </h2>
            <p className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-flame sm:text-[42px] lg:text-[48px] lg:leading-[52px]">
              We&apos;ve Got Answers
            </p>
          </div>
          <p className="max-w-[440px] font-display text-[15px] leading-[1.55] text-[#555]">
            For any other questions:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        {/* accordion, in its five groups */}
        <div
          className="w-full border-y-[0.952px] border-[#e5e5e5] min-[1380px]:w-[673px] min-[1380px]:shrink-0"
          onClick={onAnswerClick}
        >
          {FAQ_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="pb-1 pt-5 font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-flame">
                {group.title}
              </p>
              {group.items.map((item) => {
                n += 1;
                const num = n;
                const open = num === openN;
                const panel = `faq-panel-${num}`;
                return (
                  <div key={item.q} id={`faq-q-${num}`} className="scroll-mt-28 border-b-[0.952px] border-[#e5e5e5]">
                    <button
                      type="button"
                      onClick={() => setOpenN(open ? 0 : num)}
                      aria-expanded={open}
                      aria-controls={panel}
                      className="flex w-full items-center justify-between gap-6 py-[19.048px] text-left"
                    >
                      <span className="font-display text-[15px] font-medium leading-[22.857px] text-ink-900">
                        {num}. {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 text-[19.048px] leading-[26.667px] text-flame transition-transform duration-300 ${
                          open ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      id={panel}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      {/* closed answers are inert, so their links are not tab stops */}
                      <div className="overflow-hidden" inert={open ? undefined : ""}>
                        <div className="pb-[19.048px] font-display text-[15px] leading-[1.55] text-[#555]">
                          <Answer blocks={item.a} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
