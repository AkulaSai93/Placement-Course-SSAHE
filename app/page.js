import Hero from "@/components/Hero";
import WhatIsCatalyst from "@/components/WhatIsCatalyst";
import BuiltBy from "@/components/BuiltBy";
import InternshalaPro from "@/components/InternshalaPro";
import Curriculum from "@/components/Curriculum";
import Certificate from "@/components/Certificate";
import Faculty from "@/components/Faculty";
import Legacy from "@/components/Legacy";
import Faq from "@/components/Faq";
import SiteFooter from "@/components/SiteFooter";

export default function Page() {
  return (
    <main>
      <Hero />
      <WhatIsCatalyst />
      <BuiltBy />
      <InternshalaPro />
      <Curriculum />
      <Certificate />
      <Faculty />
      <Legacy />
      <Faq />
      <SiteFooter />
    </main>
  );
}
