import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { GiftCarousel } from "@/components/GiftCarousel";
import { WeddingInfo } from "@/components/WeddingInfo";
import { DressCarousel } from "@/components/DressCarousel";
import { WeddingFooter } from "@/components/WeddingFooter";
import { WeddingNav } from "@/components/WeddingNav";
import { ConfirmationForm } from "@/components/ConfirmationForm";
import { ConfirmedGuestsList } from "@/components/ConfirmedGuestsList";
import { LoginSection } from "@/components/LoginSection";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const handleLoginSuccess = (token: string) => {
    setAuthToken(token);
    setShowLogin(false);
  };

  return (
    <main className="min-h-screen">
      <WeddingNav onBrideGroomClick={() => setShowLogin(true)} />
      <HeroSection />
      <WeddingInfo />
      <DressCarousel />
      <GiftCarousel />
      <ConfirmationForm />
      {authToken && <ConfirmedGuestsList token={authToken} />}
      <WeddingFooter />
      <LoginSection
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={handleLoginSuccess}
      />
    </main>
  );
};

export default Index;
