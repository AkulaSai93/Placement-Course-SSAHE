/**
 * Faculty rail — Figma node 37:1109, reproduced to the design's exact geometry.
 *
 * Every card keeps its own photo offset/size, text-block width and logo row
 * layout. Each logo carries the width, height and crop inset Figma applies to
 * it, since the same logo is cropped differently from card to card.
 */

// Shared crop presets, keyed by the Figma image they come from.
const CROP = {
  linkedin: { w: "125.42%", h: "290.7%", left: "-12.37%", top: "-95.93%" },
  walmart: { w: "106.87%", h: "232.01%", left: "-3.42%", top: "-66.17%" },
  paypal: { w: "123.56%", h: "297.62%", left: "-12.03%", top: "-100.6%" },
  oracle: { w: "112.1%", h: "366.67%", left: "-6.76%", top: "-129.17%" },
  vmware: { w: "100%", h: "306.48%", left: "0%", top: "-120.95%" },
  microsoft: { w: "123.08%", h: "188.13%", left: "-11.54%", top: "-45.81%" },
  google: { w: "104.75%", h: "120.19%", left: "-2.79%", top: "-10.77%" },
  maybank: { w: "100%", h: "457.14%", left: "0%", top: "-179.46%" },
  ailinc: { w: "111.11%", h: "165.29%", left: "-11.11%", top: "-26.45%" },
  barclays: { w: "123.33%", h: "421.05%", left: "-11.72%", top: "-159.47%" },
};

const L = {
  linkedin: { src: "/logos/linkedin.png", name: "LinkedIn", crop: CROP.linkedin },
  walmart: { src: "/logos/walmart.png", name: "Walmart", crop: CROP.walmart },
  upgradSot: { src: "/logos/upgrad-sot.png", name: "upGrad School of Technology" },
  paypal: { src: "/logos/paypal.png", name: "PayPal", crop: CROP.paypal },
  oracle: { src: "/logos/oracle.png", name: "Oracle", crop: CROP.oracle },
  physicsWallah: { src: "/logos/physics-wallah.png", name: "Physics Wallah" },
  hotstar: { src: "/logos/hotstar.png", name: "Hotstar" },
  vmware: { src: "/logos/vmware.png", name: "VMware", crop: CROP.vmware },
  microsoft: { src: "/logos/microsoft.png", name: "Microsoft", crop: CROP.microsoft },
  digitalocean: { src: "/logos/digitalocean.png", name: "DigitalOcean" },
  pinnum: { src: "/logos/pinnum.png", name: "Pinnum" },
  hcltech: { src: "/logos/hcltech.png", name: "HCLTech" },
  ibm: { src: "/logos/ibm.png", name: "IBM" },
  google: { src: "/logos/google.png", name: "Google", crop: CROP.google },
  tiger: { src: "/logos/tiger-analytics.png", name: "Tiger Analytics" },
  maybank: { src: "/logos/maybank.png", name: "Maybank", crop: CROP.maybank },
  salesforce: { src: "/logos/salesforce.png", name: "Salesforce" },
  ailinc: { src: "/logos/ailinc.png", name: "AILinc", crop: CROP.ailinc },
  barclays: { src: "/logos/barclays.png", name: "Barclays", crop: CROP.barclays },
  cisco: { src: "/logos/cisco.png", name: "Cisco" },
  ineuron: { src: "/logos/ineuron.png", name: "iNeuron" },
};

/** size helper: [logo, width, height] */
const s = (logo, w, h) => ({ ...logo, w, h });

const FACULTY = [
  {
    name: "Vishwa Mohan",
    role: "CEO of upGrad SOT",
    photo: { src: "/faculty/vishwa-mohan.png", size: 273, top: 0, offset: -0.5 },
    text: { left: 20, top: 285, width: 223.813, gap: 20, align: "center", nameWidth: 136 },
    roleSize: 12,
    logoRows: [
      [s(L.linkedin, 78.227, 22.5), s(L.walmart, 86.834, 22.5), s(L.upgradSot, 78.049, 25)],
      [s(L.paypal, 81.295, 22.5), s(L.oracle, 131.719, 22.5), s(L.physicsWallah, 24.802, 25)],
    ],
  },
  {
    name: "Rishi Saraf",
    role: "Cofounder & CEO DevDynamics",
    photo: { src: "/faculty/rishi-saraf.png", size: 273, top: 0, offset: 0.5 },
    text: { left: 20, top: 285, width: 277, gap: 20 },
    roleSize: 12,
    wrap: true,
    logoRows: [
      [
        s(L.upgradSot, 78.049, 25),
        s(L.hotstar, 74.766, 25),
        s(L.vmware, 127.681, 25),
        s(L.walmart, 96.482, 25),
      ],
    ],
  },
  {
    name: "Vivek Sridhar",
    role: "CTO - Microsoft for Startups | AI Advisor | Investor Founder",
    photo: { src: "/faculty/vivek-sridhar.png", left: 46.56, top: 8.65, width: 228.942, height: 228.942 },
    shape: { left: 37.02, top: 49.99, width: 246.961, height: 204.363 },
    text: { top: 282, width: 279, gap: 16, centered: true },
    roleSize: 10,
    wrap: true,
    logoRows: [
      [
        s(L.microsoft, 104, 25),
        s(L.digitalocean, 25, 25),
        s(L.pinnum, 53.541, 25),
        s(L.hcltech, 25, 25),
        s(L.ibm, 66.946, 25),
      ],
    ],
  },
  {
    name: "Divyansh Dubey",
    role: "Gen AI @ Google",
    photo: { src: "/faculty/divyansh-dubey.png", left: 37.02, top: 8.65, width: 246.35, height: 246.35 },
    text: { top: 281.66, width: 279, height: 118, centered: true, spread: true },
    roleSize: 10,
    logoRows: [[s(L.google, 68.846, 25), s(L.tiger, 50, 25), s(L.maybank, 114.286, 25)]],
    logoGap: 12,
  },
  {
    name: "Gaurav Kaushik",
    role: "Senior Staff Software Engineer & Problem Solving Track Lead",
    photo: { src: "/faculty/gaurav-kaushik.png", size: 273, top: 0, offset: 0.5 },
    text: { left: 20, top: 285, width: 277, gap: 20 },
    roleSize: 12,
    logoRows: [[s(L.salesforce, 32.143, 22.5), s(L.microsoft, 104, 25), s(L.paypal, 81.295, 22.5)]],
  },
  {
    name: "Shubham Lal",
    role: "Founder AILinc | Former Developer at Microsoft",
    photo: { src: "/faculty/shubham-lal.png", left: 41.02, top: 8.65, width: 246, height: 246 },
    shape: { left: 37.02, top: 50.65, width: 246.961, height: 204.363 },
    text: { top: 281.66, width: 279, height: 118, centered: true, spread: true },
    roleSize: 10,
    wrap: true,
    logoRows: [[s(L.microsoft, 104, 25), s(L.ailinc, 44.628, 30)]],
  },
  {
    name: "Gladden Rumao",
    role: "Staff Software AI Engineer",
    photo: { src: "/faculty/gladden-rumao.png", size: 268, top: 14, offset: -3 },
    text: { left: 20, top: 289, width: 224, height: 118, gap: 40 },
    roleSize: 12,
    logoRows: [[s(L.upgradSot, 78.049, 25), s(L.barclays, 128.026, 25)]],
    logoGap: 12,
  },
  {
    name: "Mithun S",
    role: "SDE II at Cisco",
    photo: { src: "/faculty/mithun-s.png", size: 273, top: 0, offset: -0.5 },
    text: { left: 20, top: 284.66, width: 224, height: 118, spread: true, align: "center", nameWidth: 136 },
    roleSize: 12,
    logoRows: [
      [s(L.cisco, 43.892, 25), s(L.physicsWallah, 24.802, 25), s(L.ineuron, 107.693, 29.399)],
    ],
    logoGap: 12,
  },
  {
    name: "Rishab Bafna",
    role: "Senior AI Engineer & Lead Instructor",
    photo: { src: "/faculty/rishab-bafna.png", size: 273, top: 15, offset: -0.5 },
    text: { left: 20, top: 285, width: 224, height: 118, gap: 32, justifyEnd: true },
    roleSize: 12,
    logoRows: [[s(L.upgradSot, 99.902, 32)]],
  },
  {
    name: "Piyush Jain",
    role: "Senior Mathematician and Lead Instructor",
    photo: { src: "/faculty/piyush-jain.png", size: 273, top: 7, offset: -0.5 },
    text: { left: 20, top: 292, width: 224, height: 118, spread: true },
    roleSize: 12,
    logoRows: [[s(L.upgradSot, 99.902, 32)]],
  },
  {
    name: "Rahul Yadav",
    role: "SDE 2 + Lead Instructor",
    photo: { src: "/faculty/rahul-yadav.png", size: 273, top: 0, offset: -0.5 },
    text: { left: 20, top: 285, width: 224, height: 118, spread: true },
    roleSize: 12,
    logoRows: [[s(L.upgradSot, 99.902, 32)]],
  },
  {
    name: "Jyoti Nigam",
    role: "Data Scientist at upGrad SOT",
    photo: { src: "/faculty/jyoti-nigam.png", size: 273, top: 0, offset: -0.5 },
    text: { left: 20, top: 285, width: 224, height: 118, spread: true },
    roleSize: 12,
    logoRows: [[s(L.upgradSot, 99.902, 32)]],
  },
];

function Logo({ logo }) {
  return (
    <li
      className="relative shrink-0"
      style={{ width: `${logo.w}px`, height: `${logo.h}px` }}
    >
      {logo.crop ? (
        <span className="pointer-events-none absolute inset-0 block overflow-hidden">
          <img
            src={logo.src}
            alt={logo.name}
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
          src={logo.src}
          alt={logo.name}
          className="pointer-events-none absolute inset-0 size-full max-w-none object-contain object-left"
          loading="lazy"
        />
      )}
    </li>
  );
}

function FacultyCard({ person }) {
  const t = person.text;
  const photo = person.photo;

  return (
    <article className="relative h-[426px] w-[320px] shrink-0 overflow-hidden rounded-[14px] bg-white">
      {/* portrait */}
      {photo.size ? (
        <div
          className="absolute left-1/2 overflow-hidden"
          style={{
            top: `${photo.top}px`,
            width: `${photo.size}px`,
            height: `${photo.size}px`,
            transform: `translateX(calc(-50% + ${photo.offset}px))`,
          }}
        >
          <img
            src={photo.src}
            alt={person.name}
            className="pointer-events-none absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <>
          {person.shape && (
            <img
              src="/faculty/card-shape.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute"
              style={{
                left: `${person.shape.left}px`,
                top: `${person.shape.top}px`,
                width: `${person.shape.width}px`,
                height: `${person.shape.height}px`,
              }}
            />
          )}
          <img
            src={photo.src}
            alt={person.name}
            className="pointer-events-none absolute object-contain"
            style={{
              left: `${photo.left}px`,
              top: `${photo.top}px`,
              width: `${photo.width}px`,
              height: `${photo.height}px`,
            }}
            loading="lazy"
          />
        </>
      )}

      {/* copy */}
      <div
        className={`absolute flex flex-col ${t.spread ? "justify-between" : ""} ${
          t.justifyEnd ? "justify-end" : ""
        }`}
        style={{
          top: `${t.top}px`,
          width: `${t.width}px`,
          height: t.height ? `${t.height}px` : undefined,
          gap: t.gap ? `${t.gap}px` : undefined,
          ...(t.centered
            ? { left: "50%", transform: "translateX(calc(-50% + 0.5px))" }
            : { left: `${t.left}px` }),
        }}
      >
        <div
          className={`flex flex-col gap-2 ${t.align === "center" ? "items-center text-center" : "items-start"}`}
          style={{ width: t.nameWidth ? `${t.nameWidth}px` : "100%" }}
        >
          <p className="font-montserrat text-[18px] font-semibold leading-normal text-[#272727]">
            {person.name}
          </p>
          <p
            className="font-montserrat font-medium italic leading-normal text-flame"
            style={{ fontSize: `${person.roleSize}px` }}
          >
            {person.role}
          </p>
        </div>

        <div className="flex flex-col gap-[10.8px]">
          {person.logoRows.map((row, i) => (
            <ul
              key={i}
              className={`flex items-center ${person.wrap ? "flex-wrap" : ""}`}
              style={{ gap: `${person.logoGap ?? 10.8}px` }}
            >
              {row.map((logo, j) => (
                <Logo key={`${logo.name}-${j}`} logo={logo} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </article>
  );
}

function CardGroup({ ariaHidden }) {
  return (
    <div className="flex shrink-0 gap-6 pr-6" aria-hidden={ariaHidden || undefined}>
      {FACULTY.map((person) => (
        <FacultyCard key={person.name} person={person} />
      ))}
    </div>
  );
}

export default function Faculty() {
  return (
    <section className="bg-mist px-6 py-20 lg:px-20">
      <div className="mx-auto flex max-w-[694px] flex-col items-center gap-5 text-center text-ink-900">
        <h2 className="font-display text-[30px] font-medium leading-normal tracking-[-0.0206em] sm:text-[38px] lg:text-[48px]">
          Taught by{" "}
          <span className="font-accent font-medium text-flame">World&apos;s Top Tech</span> and
          Academic Minds
        </h2>
        <p className="font-display text-base leading-normal lg:text-[22.857px]">
          Industry experts and innovators who turn real-world experience into transformative
          learning.
        </p>
      </div>

      <div className="relative mt-14 overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee-slow motion-reduce:animate-none">
          <CardGroup />
          <CardGroup ariaHidden />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-mist to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-mist to-transparent"
        />
      </div>
    </section>
  );
}
