import { HeroSection } from "@/components/HeroSection";
import { GiftCarousel } from "@/components/GiftCarousel";
import { WeddingInfo } from "@/components/WeddingInfo";
import { WeddingDress } from "@/components/WeddingDress";
import { WeddingFooter } from "@/components/WeddingFooter";
import { WeddingNav } from "@/components/WeddingNav";

const Index = () => {
  return (
    <main className="min-h-screen">
      <WeddingNav />
      <HeroSection />
      <WeddingInfo />
      <WeddingDress />
      <GiftCarousel />
      <WeddingFooter />
    </main>
  );
};

export default Index;
