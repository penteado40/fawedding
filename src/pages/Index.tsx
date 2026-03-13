import { HeroSection } from "@/components/HeroSection";
import { GiftCarousel } from "@/components/GiftCarousel";
import { WeddingInfo } from "@/components/WeddingInfo";
import { WeddingFooter } from "@/components/WeddingFooter";
import { WeddingNav } from "@/components/WeddingNav";

const Index = () => {
  return (
    <main className="min-h-screen">
      <WeddingNav />
      <HeroSection />
      <GiftCarousel />
      <WeddingInfo />
      <WeddingFooter />
    </main>
  );
};

export default Index;
