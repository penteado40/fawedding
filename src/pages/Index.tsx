import { HeroSection } from "@/components/HeroSection";
import { GiftCarousel } from "@/components/GiftCarousel";
import { WeddingInfo } from "@/components/WeddingInfo";
import { DressCarousel } from "@/components/DressCarousel";
import { WeddingFooter } from "@/components/WeddingFooter";
import { WeddingNav } from "@/components/WeddingNav";

const Index = () => {
  return (
    <main className="min-h-screen">
      <WeddingNav />
      <HeroSection />
      <WeddingInfo />
      <DressCarousel />
      <GiftCarousel />
      <WeddingFooter />
    </main>
  );
};

export default Index;
