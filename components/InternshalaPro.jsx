/**
 * Internshala Pro band — Figma node 37:916.
 * The four icons come from one sprite sheet; each card crops its own slice,
 * so the frame + offsets below are kept exactly as the design specifies.
 */
const ICON_SPRITE = "/images/internshala-icons.png";

const CARDS = [
  {
    title: "Global Opportunities",
    body: "Explore internships beyond your college and city.",
    frame: { w: 65.11, h: 66.458 },
    img: { w: "449.69%", h: "146.86%", left: "-5.59%", top: "-23.53%" },
  },
  {
    title: "Relevant Roles",
    body: "Discover opportunities based on your skills and interests.",
    frame: { w: 69, h: 66 },
    img: { w: "424.34%", h: "147.88%", left: "-107.67%", top: "-24.14%" },
  },
  {
    title: "Remote & On-site",
    body: "Choose from different ways to gain real-world experience.",
    frame: { w: 69, h: 66 },
    img: { w: "424.34%", h: "147.88%", left: "-216.08%", top: "-28.16%" },
  },
  {
    title: "Apply & Gain Experience",
    body: "Take your skills beyond the classroom and start building your career.",
    frame: { w: 69, h: 66 },
    img: { w: "424.34%", h: "147.88%", left: "-323.42%", top: "-29.59%" },
  },
];

function SpriteIcon({ frame, img }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: `${frame.w}px`, height: `${frame.h}px` }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={ICON_SPRITE}
          alt=""
          className="absolute max-w-none"
          style={{ width: img.w, height: img.h, left: img.left, top: img.top }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function InternshalaPro() {
  return (
    <section className="bg-mist px-6 py-16 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 lg:gap-[60px]">
        <h2 className="flex flex-wrap items-end justify-center gap-x-[18px] gap-y-3 font-display text-[30px] font-medium tracking-[-0.0054em] text-ink-900 sm:text-[40px] lg:text-[52px]">
          <span className="whitespace-nowrap">Get 6 Months of</span>
          <span
            className="relative inline-block shrink-0"
            style={{ width: "268.715px", height: "81.84px" }}
          >
            <span className="pointer-events-none absolute inset-0 block overflow-hidden">
              <img
                src="/images/internshala.png"
                alt="Internshala"
                className="absolute max-w-none"
                style={{ width: "125.55%", height: "232.12%", left: "-12.8%", top: "-69.52%" }}
              />
            </span>
          </span>
          <span className="whitespace-nowrap">Pro</span>
        </h2>

        <ul className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 min-[1360px]:flex min-[1360px]:items-center min-[1360px]:justify-between min-[1360px]:gap-0">
          {CARDS.map((card, i) => {
            const isLast = i === CARDS.length - 1;
            return (
            <li key={card.title} className={`flex items-center gap-3 ${isLast ? "" : "min-[1360px]:w-[304.5px]"}`}>
              <SpriteIcon frame={card.frame} img={card.img} />
              <div className={`flex flex-col gap-[9px] text-[#1e2022] ${isLast ? "min-[1360px]:w-[243px]" : "min-[1360px]:w-[228px]"}`}>
                <p className="font-display text-[19.5px] font-medium leading-normal">
                  {card.title}
                </p>
                <p className="font-display text-[15px] leading-normal">{card.body}</p>
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
