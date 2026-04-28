import React from "react";

const FEATURES = [
  {
    name: "Intelligent Itineraries",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1000&q=80",
    description: "Veyra crafts your perfect day minute by minute, adapting instantly to changes in weather, mood, or schedule."
  },
  {
    name: "Always By Your Side",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1000&q=80",
    description: "A seamless conversational interface giving you access to world-class concierge services from the palm of your hand."
  },
  {
    name: "Curated Exclusivity",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=80",
    description: "Unlock hidden gems, exclusive reservations, and local secrets that typical travel planners can never find."
  }
];

export function ChaletShowcase() {
  return (
    <section id="features" className="py-24 bg-[#f8f6f0]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl text-[#1a1815] mb-4">Discover the Features</h2>
          <div className="h-px w-16 bg-[#8a7b63] mx-auto"></div>
        </div>
        
        <div className="flex flex-col gap-24">
          {FEATURES.map((feature, index) => (
            <div key={feature.name} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-3/5 overflow-hidden group">
                <img 
                  src={feature.image} 
                  alt={feature.name} 
                  className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="w-full md:w-2/5 flex flex-col items-center text-center px-6">
                <h3 className="font-display text-3xl text-[#1a1815] mb-6">{feature.name}</h3>
                <p className="text-[#3a3530] font-light leading-relaxed mb-8">
                  {feature.description}
                </p>
                <button className="text-[#8a7b63] uppercase tracking-[0.2em] font-mono text-[11px] border border-[#8a7b63] px-8 py-3 hover:bg-[#8a7b63] hover:text-white transition-all">
                  Explore Feature
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
