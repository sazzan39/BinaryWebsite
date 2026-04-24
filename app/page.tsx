import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Gap } from "@/components/site/Gap";
import { SiteClient } from "@/components/site/SiteClient";
import { Proof } from "@/components/site/Proof";
import { DesignShowcase } from "@/components/site/DesignShowcase";
import { RetentionFunnel } from "@/components/site/RetentionFunnel";
import { Offer } from "@/components/site/Offer";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Gap />
        <SiteClient />
        <Proof />
        <DesignShowcase />
        <RetentionFunnel />
        <Offer />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
