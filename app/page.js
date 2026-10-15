import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import InternshalaPro from "@/components/InternshalaPro";
import Outcomes from "@/components/Outcomes";
import Curriculum from "@/components/Curriculum";
import OneJourney from "@/components/OneJourney";
import Certificate from "@/components/Certificate";
import Faculty from "@/components/Faculty";
import Legacy from "@/components/Legacy";
import Faq from "@/components/Faq";
import SiteFooter from "@/components/SiteFooter";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
      <Outcomes />
      <InternshalaPro />
      <Curriculum />
      <OneJourney />
      <Certificate />
      <Faculty />
      <Legacy />
      <Faq />
      <SiteFooter />
      </main>
    </>
  );
}
