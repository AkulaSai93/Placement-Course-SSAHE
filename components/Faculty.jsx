const FACULTY = [
  { name: "Vishwa Mohan", role: "CEO of upGrad School of Technology" },
  { name: "Rishi Saraf", role: "Cofounder & CEO, DevDynamics" },
  { name: "Vivek Sridhar", role: "CTO - Microsoft for Startups | AI Advisor | Investor" },
  { name: "Divyansh Dubey", role: "Gen AI @ Google" },
  { name: "Gaurav Kaushik", role: "Senior Staff Software Engineer & Problem Solving Track Lead" },
  { name: "Shubham Lal", role: "Founder AILinc | Former Developer at Microsoft" },
  { name: "Gladden Rumao", role: "Staff Software AI Engineer" },
  { name: "Mithun S", role: "SDE II at Cisco" },
  { name: "Rishab Bafna", role: "Senior AI Engineer & Lead Instructor" },
  { name: "Piyush Jain", role: "Senior Mathematician and Lead Instructor" },
  { name: "Rahul Yadav", role: "SDE 2 + Lead Instructor" },
  { name: "Jyoti Nigam", role: "Data Scientist at upGrad SOT" },
];

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function FacultyCard({ person }) {
  return (
    <article className="group w-[260px] shrink-0 border border-ink-900/8 bg-white p-5 transition-shadow hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
      <div className="relative mb-5 flex h-44 items-center justify-center overflow-hidden bg-ink">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(70% 70% at 50% 10%, rgba(230,22,31,0.45) 0%, rgba(10,7,8,0) 70%)",
          }}
        />
        <span className="relative font-display text-3xl font-semibold text-white/85">
          {initials(person.name)}
        </span>
        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand transition-all duration-500 group-hover:w-full" />
      </div>
      <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-ink-900">
        {person.name}
      </h3>
      <p className="mt-1.5 text-[13px] leading-snug text-ink-900/55">{person.role}</p>
    </article>
  );
}

function Row({ people, reverse = false }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
      <div
        className={`marquee-track flex w-max gap-5 ${
          reverse ? "animate-marquee-slow [animation-direction:reverse]" : "animate-marquee-slow"
        }`}
      >
        {[...people, ...people].map((p, i) => (
          <FacultyCard key={`${p.name}-${i}`} person={p} />
        ))}
      </div>
    </div>
  );
}

export default function Faculty() {
  const half = Math.ceil(FACULTY.length / 2);

  return (
    <section className="bg-mist py-24 text-ink-900">
      <div className="mx-auto max-w-shell px-6">
        <h2 className="max-w-3xl font-display text-[30px] font-semibold leading-tight tracking-[-0.02em] sm:text-[41px]">
          Taught by Experienced Tech and Academic Minds
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-900/60">
          Industry experts and innovators who turn real-world experience into transformative
          learning.
        </p>
      </div>

      <div className="mt-12 space-y-5">
        <Row people={FACULTY.slice(0, half)} />
        <Row people={FACULTY.slice(half)} reverse />
      </div>

      <div className="mx-auto mt-12 max-w-shell px-6">
        <a
          href="#apply"
          className="group inline-flex items-center gap-4 bg-ink-900 py-[6px] pl-5 pr-[6px] text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand"
        >
          Apply to uGSOT Catalyst
          <span className="flex h-8 w-8 items-center justify-center bg-white text-ink-900">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
