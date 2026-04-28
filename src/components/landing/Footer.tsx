import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#2c2825] text-white pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-16 mb-20">
        <div className="md:w-1/3">
          <h2 className="font-display text-3xl mb-8">Veyra</h2>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#b09e80] mb-2">The ultimate AI travel companion</p>
          <address className="not-italic text-sm text-white/70 leading-loose mt-6">
            100 Innovation Drive<br />
            San Francisco, CA 94105<br />
            <br />
            <a href="tel:+18005550199" className="hover:text-white transition-colors">+1 800 555 0199</a><br />
            <a href="mailto:concierge@veyra.ai" className="hover:text-white transition-colors">concierge@veyra.ai</a>
          </address>
        </div>
        
        <div className="md:w-1/3 grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 text-sm text-white/70">
            <a href="#" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Precision</a>
            <a href="#" className="hover:text-white transition-colors">Access</a>
            <a href="#" className="hover:text-white transition-colors">Peace of Mind</a>
          </div>
          <div className="flex flex-col gap-4 text-sm text-white/70">
            <a href="#" className="hover:text-white transition-colors">Experiences</a>
            <a href="#" className="hover:text-white transition-colors">Offers</a>
            <a href="#" className="hover:text-white transition-colors">Lounge</a>
            <a href="#" className="hover:text-white transition-colors">Gallery</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col items-start md:items-end">
          <p className="text-sm text-white/70 mb-6 text-left md:text-right">
            Discover the new standard of travel<br />
            <a href="#" className="text-white hover:text-[#b09e80] transition-colors border-b border-transparent hover:border-[#b09e80]">Join Veyra Exclusive</a>
          </p>
          <button className="bg-[#b09e80] text-white px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#2c2825] transition-colors">
            Plan Your Journey
          </button>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/50">© 2026 Veyra AI Concierge</p>
        <div className="flex gap-6 text-xs text-white/50">
          <a href="#" className="hover:text-white transition-colors">Imprint</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Jobs</a>
        </div>
      </div>
    </footer>
  );
}
