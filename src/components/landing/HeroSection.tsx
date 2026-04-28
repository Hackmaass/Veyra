import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import Spline from '@splinetool/react-spline';

export function HeroSection({ onPlanStay, onLogin }: { onPlanStay: () => void; onLogin: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#1a1815]">
      <div className="absolute inset-0 z-0">
        <Spline 
          scene="https://prod.spline.design/LdREZp1cq8F1tDoN/scene.splinecode" 
        />
      </div>
      
      {/* Darker overlay to ensure text readability without hiding the 3D scene */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className={`font-display text-2xl tracking-widest uppercase ${scrolled ? "text-[#1a1815]" : "text-white"}`}>
            Veyra
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Philosophy", "Features", "Benefits", "Access"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm uppercase tracking-widest transition-opacity ${scrolled ? "text-[#3a3530] hover:text-[#1a1815]" : "text-white/90 hover:text-white"}`}>
                {link}
              </a>
            ))}
            <button onClick={onLogin} className={`text-xs uppercase tracking-widest transition-opacity mr-4 ${scrolled ? "text-[#1a1815]/70 hover:text-[#1a1815]" : "text-white/70 hover:text-white"}`}>
              Member Access
            </button>
            <button onClick={onPlanStay} className={`border px-6 py-2 uppercase tracking-widest text-xs transition-all ${scrolled ? "border-[#8a7b63] text-[#8a7b63] hover:bg-[#8a7b63] hover:text-white" : "border-white text-white hover:bg-white hover:text-[#1a1815]"}`}>
              Plan Your Stay
            </button>
          </div>
          <button className="md:hidden">
            <Menu className={scrolled ? "text-[#1a1815]" : "text-white"} />
          </button>
        </div>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 text-center px-6 max-w-4xl mt-16 pointer-events-none"
      >
        <p className="font-mono text-xs md:text-sm text-white/90 uppercase tracking-[0.4em] mb-6">Your Intelligent Luxury Travel Concierge</p>
        <h1 className="font-display text-7xl md:text-8xl lg:text-[10rem] text-white font-semibold leading-none drop-shadow-2xl tracking-tight">
          Veyra
        </h1>
      </motion.div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white mb-2">Scroll to discover</span>
        <div className="w-px h-12 bg-white/50" />
      </div>
    </section>
  );
}
