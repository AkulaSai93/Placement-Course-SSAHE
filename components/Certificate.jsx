import Image from "next/image";

export default function Certificate() {
  return (
    <section id="certificate" className="relative overflow-hidden bg-mist px-6 pb-24 pt-20 lg:px-20">
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <h2 className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[42px] lg:text-[48px]">
            Earn a Completion{" "}
            <span className="whitespace-nowrap text-flame">
              C<span className="font-display font-medium">ertificate</span>
            </span>
          </h2>

          <p className="max-w-xl font-display text-[15px] leading-relaxed text-ink-900/60 lg:text-base">
            Complete the 2-year program and earn a certificate that recognizes your learning,
            projects, and progress in technology.
          </p>
        </div>

        {/* certificate */}
        <div className="group relative mx-auto mt-14 max-w-5xl [perspective:1800px]">
          <div className="rounded-sm bg-white p-2 shadow-[0_30px_70px_-26px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-transform duration-700 ease-out [transform:rotateX(7deg)] group-hover:[transform:rotateX(0deg)]">
            <div className="relative aspect-[3508/2480] w-full overflow-hidden">
              <Image
                src="/images/certificate.webp"
                alt="uGSOT Lastmile certificate of completion"
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
