import React from "react";
import { HeroSection } from "./HeroSection";
import { PhilosophySection } from "./PhilosophySection";
import { ChaletShowcase } from "./ChaletShowcase";
import { AmenitiesSection } from "./AmenitiesSection";
import { Footer } from "./Footer";

interface LandingPageProps {
  onPlanStay: () => void;
}

export function LandingPage({ onPlanStay }: LandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#2c2825] font-sans selection:bg-[#b09e80] selection:text-white overflow-x-hidden">
      <HeroSection onPlanStay={onPlanStay} />
      <PhilosophySection />
      <ChaletShowcase />
      <AmenitiesSection />
      <Footer />
    </div>
  );
}
