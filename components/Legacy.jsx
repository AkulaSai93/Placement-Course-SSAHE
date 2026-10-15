/**
 * upGrad ecosystem band — Figma node 37:1243.
 *
 * The six brand tiles sit in one overlapping fan. Each keeps the exact wrapper
 * offset/size, card size, corner radius and rotation from the design, and each
 * logo keeps its own size, centre nudge and crop inset. DOM order is the design's
 * stacking order (later tiles paint on top).
 */
const TILES = [
  {
    name: "upGrad KnowledgeHut",
    src: "/brands/upgrad-knowledgehut.webp",
    box: { left: 705.3, top: 28.61, w: 153.946, h: 153.942 },
    card: { w: 151.43, h: 151.426, radius: 22.16, rotate: 0.96 },
    logo: { w: 123.792, h: 44.488, dx: 0.39, dy: -1.09 },
  },
  {
    name: "upGrad Rekrut",
    src: "/brands/upgrad-rekrut.webp",
    box: { left: 545.7, top: 2, w: 190.812, h: 190.809 },
    card: { w: 151.43, h: 151.426, radius: 22.16, rotate: 18 },
    logo: {
      w: 121.797,
      h: 61.568,
      dx: 9.06,
      dy: -3.27,
      crop: { w: "105.49%", h: "117.39%", left: "-2.93%", top: "-14.49%" },
    },
  },
  {
    name: "upGrad Abroad",
    src: "/brands/upgrad-abroad.webp",
    box: { left: 426.7, top: 6, w: 182.752, h: 182.749 },
    card: { w: 152.38, h: 152.376, radius: 22.3, rotate: -13 },
    logo: {
      w: 122.743,
      h: 37.201,
      dx: 0.39,
      dy: -0.94,
      crop: { w: "102.74%", h: "338.98%", left: "-1.88%", top: "-114.69%" },
    },
  },
  {
    name: "upGrad",
    src: "/brands/upgrad.webp",
    box: { left: 0, top: 0.06, w: 206.227, h: 206.225 },
    card: { w: 153.33, h: 153.326, radius: 22.439, rotate: -27 },
    logo: {
      w: 73.472,
      h: 86.507,
      dx: -0.66,
      dy: 0.95,
      crop: { w: "151.21%", h: "108.9%", left: "-25.81%", top: "-1.71%" },
    },
  },
  {
    name: "Internshala",
    src: "/images/internshala.webp",
    box: { left: 157.7, top: 13, w: 156.142, h: 156.138 },
    card: { w: 148.57, h: 148.566, radius: 21.742, rotate: -3 },
    logo: {
      w: 120.344,
      h: 36.652,
      dx: 0.38,
      dy: -0.92,
      crop: { w: "125.55%", h: "232.12%", left: "-12.8%", top: "-69.52%" },
    },
  },
  {
    name: "upGrad Campus",
    src: "/brands/upgrad-campus.webp",
    box: { left: 288.7, top: 0, w: 188.642, h: 188.639 },
    card: { w: 159.05, h: 159.046, radius: 23.276, rotate: 12 },
    logo: { w: 89.74, h: 89.74, dx: 0.41, dy: -0.98 },
  },
];

const FAN = { width: 859.25, height: 206.29 };

// Reading order for the stacked mobile grid (the desktop fan uses paint order).
const MOBILE_ORDER = [
  "upGrad",
  "Internshala",
  "upGrad Campus",
  "upGrad Abroad",
  "upGrad Rekrut",
  "upGrad KnowledgeHut",
];

const STATS = [
  { value: "10 M+", label: "Learners" },
  { value: "3000+", label: "Hiring Partners" },
  { value: "300+", label: "Global Universities" },
  { value: "70+", label: "Countries" },
  { value: "110K+", label: "Placements" },
  { value: "600+", label: "Corporate clients trained annually", wrap: true },
  { value: "28L+", label: "Internships Enabled" },
];

function Tile({ tile }) {
  const { box, card, logo } = tile;

  return (
    <div
      className="group absolute flex items-center justify-center transition-transform duration-300 ease-out hover:z-20 hover:scale-[1.14]"
      style={{
        left: `${box.left}px`,
        top: `${box.top}px`,
        width: `${box.w}px`,
        height: `${box.h}px`,
      }}
    >
      <div
        className="relative overflow-hidden border-4 border-solid border-black bg-white transition-shadow duration-300 ease-out group-hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.55)]"
        style={{
          width: `${card.w}px`,
          height: `${card.h}px`,
          borderRadius: `${card.radius}px`,
          transform: `rotate(${card.rotate}deg)`,
        }}
      >
        <div
          className="absolute"
          style={{
            width: `${logo.w}px`,
            height: `${logo.h}px`,
            left: `calc(50% + ${logo.dx}px)`,
            top: `calc(50% + ${logo.dy}px)`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {logo.crop ? (
            <span className="pointer-events-none absolute inset-0 block overflow-hidden">
              <img
                src={tile.src}
                alt={tile.name}
                className="absolute max-w-none"
                style={{
                  width: logo.crop.w,
                  height: logo.crop.h,
                  left: logo.crop.left,
                  top: logo.crop.top,
                }}
                loading="lazy"
              />
            </span>
          ) : (
            <img
              src={tile.src}
              alt={tile.name}
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Same artwork as `Tile`, but every logo dimension is expressed as a percentage
 * of the card instead of a fixed pixel size, so the tile can be any width. Used
 * for the stacked grid below `lg`.
 */
function MobileTile({ tile }) {
  const { card, logo } = tile;
  const pctW = (v) => `${(v / card.w) * 100}%`;
  const pctH = (v) => `${(v / card.h) * 100}%`;

  return (
    <li className="flex items-center justify-center">
      <div
        className="relative aspect-square w-full overflow-hidden border-2 border-solid border-black bg-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]"
        style={{
          borderRadius: `${(card.radius / card.w) * 100}%`,
          transform: `rotate(${card.rotate}deg)`,
        }}
      >
        <div
          className="absolute"
          style={{
            width: pctW(logo.w),
            height: pctH(logo.h),
            left: `calc(50% + ${pctW(logo.dx)})`,
            top: `calc(50% + ${pctH(logo.dy)})`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {logo.crop ? (
            <span className="pointer-events-none absolute inset-0 block overflow-hidden">
              <img
                src={tile.src}
                alt={tile.name}
                className="absolute max-w-none"
                style={{
                  width: logo.crop.w,
                  height: logo.crop.h,
                  left: logo.crop.left,
                  top: logo.crop.top,
                }}
                loading="lazy"
              />
            </span>
          ) : (
            <img
              src={tile.src}
              alt={tile.name}
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </li>
  );
}

export default function Legacy() {
  return (
    <section id="ecosystem" className="bg-ink-soft px-6 py-20 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-[60px] lg:gap-[100px]">
        <div className="flex w-full flex-col items-center gap-[40px] lg:gap-[52px]">
          <div className="flex max-w-[1023px] flex-col items-center gap-5 text-center text-white">
            <h2 className="max-w-[851px] font-display text-[30px] font-medium leading-[1.1] tracking-[-0.009em] sm:text-[38px] lg:text-[48px]">
              Built by{" "}
              <span className="font-accent font-medium text-flame">
                upGrad School of Technology.
              </span>{" "}
              Designed To Reach Beyond The Campus.
            </h2>
            <p className="font-display text-base leading-normal lg:text-[24px]">
              uGSOT Campus is building a full-time campus technology education experience. uGSOT
              Lastmile takes a focused technology-acceleration layer to ambitious students who are
              already pursuing degrees elsewhere.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-10">
            {/* mobile: 3x2 stacked grid */}
            <ul className="grid w-full max-w-[420px] grid-cols-3 gap-x-4 gap-y-5 px-1 py-4 lg:hidden">
              {MOBILE_ORDER.map((name) => {
                const tile = TILES.find((t) => t.name === name);
                return tile ? <MobileTile key={name} tile={tile} /> : null;
              })}
            </ul>

            {/* desktop: brand tile fan — extra padding keeps the hover pop-up from clipping */}
            <div className="hidden w-full overflow-x-auto overflow-y-visible py-6 lg:block">
              <div
                className="relative mx-auto shrink-0"
                style={{ width: `${FAN.width}px`, height: `${FAN.height}px` }}
              >
                {TILES.map((tile) => (
                  <Tile key={tile.name} tile={tile} />
                ))}
              </div>
            </div>

            <ul className="grid w-full max-w-[420px] grid-cols-2 gap-x-6 gap-y-10 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-[30px] sm:gap-y-8 min-[1360px]:flex-nowrap">
              {STATS.map((stat, i) => (
                <li
                  key={stat.label}
                  className={`flex items-center justify-center sm:shrink-0 sm:gap-x-[30px] ${
                    i === STATS.length - 1 && STATS.length % 2 === 1
                      ? "col-span-2 sm:col-span-1"
                      : ""
                  }`}
                >
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-20 w-px shrink-0 bg-white/25 min-[1360px]:block"
                    />
                  )}
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="font-display text-[32px] font-bold leading-normal text-flame lg:text-[40px]">
                      {stat.value}
                    </p>
                    <p
                      className={`font-display text-[15px] leading-normal text-white lg:text-base ${
                        stat.wrap ? "sm:w-[143px]" : "sm:whitespace-nowrap"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="w-full text-center font-accent text-[22px] font-medium leading-normal text-white lg:text-[32px]">
          The <span className="text-flame">uGSOT technology</span> ecosystem now accessible from
          wherever you study.
        </p>
      </div>
    </section>
  );
}
