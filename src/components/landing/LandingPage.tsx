import React from "react";
import { HeroSection } from "./HeroSection";
import { PhilosophySection } from "./PhilosophySection";
import { ChaletShowcase } from "./ChaletShowcase";
import { AmenitiesSection } from "./AmenitiesSection";
import { Footer } from "./Footer";

interface LandingPageProps {
  onPlanStay: () => void;
  onLogin: () => void;
}

export function LandingPage({ onPlanStay, onLogin }: LandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#1a1815] font-sans selection:bg-[#8a7b63] selection:text-white overflow-x-hidden">
      <HeroSection onPlanStay={onPlanStay} onLogin={onLogin} />
      <PhilosophySection />
      <ChaletShowcase />
      <AmenitiesSection />
      <Footer onPlanStay={onPlanStay} onLogin={onLogin} />
    </div>
  );
}
