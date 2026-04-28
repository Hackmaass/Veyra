import React from "react";

export function AmenitiesSection() {
  return (
    <section id="benefits" className="bg-[#fdfbf7]">
      {/* Precision */}
      <div className="flex flex-col md:flex-row min-h-[600px]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-16 md:p-24 bg-white">
          <h2 className="font-display text-4xl text-[#1a1815] mb-6">Absolute Precision</h2>
          <p className="text-[#3a3530] font-light leading-relaxed mb-8 max-w-md">
            It’s well-known that travel can be unpredictable. And if you’re exploring with Veyra, you want to indulge in a seamless experience. Our AI engine constantly monitors your timeline, adjusting routes, predicting delays, and ensuring every moment of your journey is optimized for comfort and joy.
          </p>
          <button className="text-[#1a1815] uppercase tracking-widest font-mono text-[11px] border-b border-[#1a1815] pb-1 hover:text-[#8a7b63] hover:border-[#8a7b63] transition-colors">
            Learn More
          </button>
        </div>
        <div className="w-full md:w-1/2 bg-[url('https://images.unsplash.com/photo-1414235077428-338988a2e8c0?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center min-h-[400px]"></div>
      </div>

      {/* Wellness */}
      <div id="access" className="flex flex-col md:flex-row-reverse min-h-[600px]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-16 md:p-24 bg-[#f8f6f0]">
          <h2 className="font-display text-4xl text-[#1a1815] mb-6">Unrivaled Access</h2>
          <p className="text-[#3a3530] font-light leading-relaxed mb-8 max-w-md">
            Skip the tourist traps. Veyra uses proprietary local insights to unlock private tours, secure impossible reservations, and find tranquil retreats away from the crowds. Experience a destination like an insider, not a visitor.
          </p>
          <button className="text-[#1a1815] uppercase tracking-widest font-mono text-[11px] border-b border-[#1a1815] pb-1 hover:text-[#8a7b63] hover:border-[#8a7b63] transition-colors">
            Discover Exclusivity
          </button>
        </div>
        <div className="w-full md:w-1/2 bg-[url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center min-h-[400px]"></div>
      </div>

      {/* Peace of mind */}
      <div className="flex flex-col md:flex-row min-h-[600px]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-16 md:p-24 bg-white">
          <h2 className="font-display text-4xl text-[#1a1815] mb-6">Total Peace of Mind</h2>
          <p className="text-[#3a3530] font-light leading-relaxed mb-8 max-w-md">
            Looking for downtime with friends and family? Veyra handles the logistics so you don't have to. With automated itinerary syncing and real-time mapping, your entire party stays effortlessly coordinated, leaving you free to focus on what matters most.
          </p>
          <button className="text-[#1a1815] uppercase tracking-widest font-mono text-[11px] border-b border-[#1a1815] pb-1 hover:text-[#8a7b63] hover:border-[#8a7b63] transition-colors">
            Experience Serenity
          </button>
        </div>
        <div className="w-full md:w-1/2 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d140b284?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center min-h-[400px]"></div>
      </div>
    </section>
  );
}
