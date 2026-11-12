import { PageWrapper } from "@/components";
import Cta from "@/components/Cta";
import { getSettings } from "@/lib/api";
// import Icons from "@/components/Icon";
// import { Button } from "@/components/ui/button";
// import { getSettings } from "@/lib/api";
// import { whatsappLink } from "@/lib/utils";
import { metaData } from "@/lib/utils/metadata";
import HeroVideoResponsive from "@/sections/home/hero";
import Section1 from "@/sections/home/section1";
import Section2 from "@/sections/home/section2";
import Section3 from "@/sections/home/section3";
import Section4 from "@/sections/home/section4";
import Section5 from "@/sections/home/section5";
import Section6 from "@/sections/home/section6";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: 'Klinik Gigi Karawaci: Veneer, Invisalign & Smile Makeover | Onyx Dental Center',
    description: 'Onyx Dental Center, klinik gigi estetik di Karawaci, Tangerang. Veneer, Invisalign, smile makeover & implan gigi oleh dokter gigi berpengalaman. Buka setiap hari 09.00–20.00.',
    images: [{ url: '/assets/images/home-section1.webp' }],
    path: '/',
  });
}

export default async function Home() {
  const settings = await getSettings()

  return (
    <PageWrapper className="min-h-screen bg-custom-primary">
      <HeroVideoResponsive settings={settings.data} />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Cta
        title="Begin your smile transformation"
        description={"Your smile is your signature. Start the journey to be the best version of yourself."}
        image="home-cta"
        classNameDescription="md:max-w-[60%] xl:max-w-[55%]"
        // classNameImage=""
        buttonLabel="Book Your Session Now"
      />
    </PageWrapper>
  );
}
