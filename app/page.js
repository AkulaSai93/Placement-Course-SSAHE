import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import HiringCompanies from "@/components/HiringCompanies";
import Outcomes from "@/components/Outcomes";
import Curriculum from "@/components/Curriculum";
import Faculty from "@/components/Faculty";
import Pricing from "@/components/Pricing";
import Fee from "@/components/Fee";
import Faq from "@/components/Faq";
import SiteFooter from "@/components/SiteFooter";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HiringCompanies />
        <Pricing />
        <Fee />
        <Outcomes />
        <Curriculum />
        <Faculty />
        <Faq />
        <SiteFooter />
      </main>
    </>
  );
}
