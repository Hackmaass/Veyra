import React from "react";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-32 px-6 bg-[#fdfbf7]">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl md:text-5xl text-[#2c2825] leading-tight mb-10">
          We’re rethinking travel. <br />
          Your intelligent companion offering insight, precision, and serendipity.
        </h2>
        <p className="text-lg text-[#5c554d] leading-relaxed mb-8 max-w-3xl mx-auto font-light">
          Veyra seamlessly integrates into your journey, combining the warmth of a world-class concierge with the foresight of artificial intelligence. We believe luxury travel isn't just about where you stay—it's about the seamless orchestration of your time, eliminating friction, and unlocking exclusive experiences. Veyra sets the new benchmark for modern exploration, unparalleled privacy, and bespoke service.
        </p>
        <p className="text-lg text-[#5c554d] leading-relaxed mb-12 max-w-3xl mx-auto font-light">
          Powered by state-of-the-art AI, Veyra adapts to your pace in real-time. Whether you are seeking a high-octane adventure through the Alps or a serene afternoon at a hidden wellness retreat, Veyra anticipates your needs and curates an impeccable itinerary. Your next great journey of discovery begins here.
        </p>
        <button className="text-[#b09e80] uppercase tracking-widest font-mono text-sm border-b border-[#b09e80] pb-1 hover:text-[#8b8070] hover:border-[#8b8070] transition-colors">
          Discover Our Philosophy
        </button>
      </div>
    </section>
  );
}
