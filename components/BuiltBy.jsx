/**
 * Logo strip — Figma node 38:1592.
 * Each logo keeps the crop its Figma frame applies: a fixed-size window with the
 * source image scaled and offset inside it, so the artwork lands identically.
 */
const LOGOS = [
  { name: "Flipkart", src: "/logos/flipkart.png", w: 118.009, img: { w: "100.5%", h: "187.04%", left: "-0.31%", top: "-43.69%" } },
  { name: "Goldman Sachs", src: "/logos/goldman-sachs.png", w: 77.272, img: { w: "103.45%", h: "125.93%", left: "-1.72%", top: "-12.59%" } },
  { name: "Google", src: "/logos/google.png", w: 98.326, img: { w: "104.75%", h: "120.19%", left: "-2.79%", top: "-10.77%" } },
  { name: "Groww", src: "/logos/groww.png", w: 110.745, img: { w: "118.31%", h: "275.42%", left: "-9.43%", top: "-86.86%" } },
  { name: "Haptik", src: "/logos/haptik.png", w: 81.374, img: { w: "153.06%", h: "196.22%", left: "-26.53%", top: "-47.53%" } },
  { name: "Accenture", src: "/logos/accenture.png", w: 126.067, img: { w: "100.05%", h: "198.71%", left: "-0.03%", top: "-48.76%" } },
  { name: "Adobe", src: "/logos/adobe.png", w: 119.356, img: { w: "141.45%", h: "315%", left: "-20.3%", top: "-107.5%" } },
  { name: "Amazon", src: "/logos/amazon.png", w: 111.623, img: { w: "128.11%", h: "176.77%", left: "-14.22%", top: "-48.99%" } },
  { name: "Apple", src: "/logos/apple.png", w: 98.241, img: { w: "110.11%", h: "151.48%", left: "-4.95%", top: "-24.26%" } },
  { name: "Cisco", src: "/logos/cisco.png", w: 62.686, img: null },
  { name: "Dell", src: "/logos/dell.png", w: 89.782, img: { w: "122.78%", h: "154.37%", left: "-11.2%", top: "-29.13%" } },
];

const FRAME_HEIGHT = 35.705;
const GAP = 32.4;

function Logo({ logo }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: `${logo.w}px`, height: `${FRAME_HEIGHT}px` }}
    >
      {logo.img ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={logo.src}
            alt={logo.name}
            className="absolute max-w-none"
            style={{ width: logo.img.w, height: logo.img.h, left: logo.img.left, top: logo.img.top }}
            loading="lazy"
          />
        </div>
      ) : (
        <img
          src={logo.src}
          alt={logo.name}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
}

/** One full pass of the strip; the trailing gap makes the -50% loop seamless. */
function LogoGroup({ ariaHidden }) {
  return (
    <div
      className="flex shrink-0 items-end"
      style={{ gap: `${GAP}px`, paddingRight: `${GAP}px` }}
      aria-hidden={ariaHidden || undefined}
    >
      {LOGOS.map((logo) => (
        <Logo key={logo.name} logo={logo} />
      ))}
    </div>
  );
}

export default function BuiltBy() {
  return (
    <section className="bg-mist pb-20 pt-4 lg:pb-24">
      <div className="flex flex-col items-center gap-6">
        <h2 className="px-6 text-center font-accent text-[22px] font-medium leading-normal text-ink-900 sm:text-[28px]">
          Built by people who&apos;ve worked at
        </h2>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
          <div className="marquee-track flex w-max animate-marquee motion-reduce:animate-none">
            <LogoGroup />
            <LogoGroup ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
