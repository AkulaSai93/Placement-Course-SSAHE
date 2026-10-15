import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import HiringCompanies from "@/components/HiringCompanies";
import Outcomes from "@/components/Outcomes";
import Partners from "@/components/Partners";
import Curriculum from "@/components/Curriculum";
import Certificate from "@/components/Certificate";
import Faculty from "@/components/Faculty";
import Legacy from "@/components/Legacy";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import SiteFooter from "@/components/SiteFooter";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HiringCompanies />
      <Outcomes />
      <Partners />
      <Faculty />
      <Curriculum />
      <Pricing />
      <Certificate />
      <Legacy />
      <Faq />
      <SiteFooter />
      </main>
    </>
  );
}
