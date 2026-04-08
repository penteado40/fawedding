import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { GiftCarousel } from "@/components/GiftCarousel";
import { WeddingInfo } from "@/components/WeddingInfo";
import { DressCarousel } from "@/components/DressCarousel";
import { WeddingFooter } from "@/components/WeddingFooter";
import { WeddingNav } from "@/components/WeddingNav";
import { ConfirmationForm } from "@/components/ConfirmationForm";
import { LoginSection } from "@/components/LoginSection";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <main className="min-h-screen">
      <WeddingNav onBrideGroomClick={() => setShowLogin(true)} />
      <HeroSection />
      <WeddingInfo />
      <DressCarousel />
      <GiftCarousel />
      <ConfirmationForm />
      <WeddingFooter />
      <LoginSection open={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  );
};

export default Index;
