import Image from "next/image";

export default function Certificate() {
  return (
    <section className="relative bg-ink pb-24 pt-24">
      {/* fades from the dark section above into the light section below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(rgba(0,0,0,0) 35%, #F4F4F5)" }}
      />

      <div className="relative mx-auto max-w-shell px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[41px]">
            Earn a Completion Certificate
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            Complete the 2-year program and earn a certificate that recognizes your learning,
            projects, and progress in technology.
          </p>
        </div>

        {/* certificate */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          <div className="rounded-sm bg-white p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5">
            <div className="relative aspect-[3508/2480] w-full overflow-hidden">
              <Image
                src="/images/certificate.png"
                alt="uGSOT Catalyst certificate of completion"
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
