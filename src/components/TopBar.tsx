import React from "react";
import { SlidersHorizontal, MapPin, Activity, User } from "lucide-react";
import { motion } from "motion/react";

interface TopBarProps {
  onOpenContext: () => void;
}

export function TopBar({ onOpenContext }: TopBarProps) {
  return (
    <header className="relative z-40 flex h-16 shrink-0 items-center justify-between border-b border-[#e3dcd1]/50 bg-[#fdfbf7]/90 px-6 shadow-md backdrop-blur-3xl">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-[#e3dcd1]/70 bg-white/70 p-1.5 shadow-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t border-[#e3dcd1]/80 opacity-50"
            />
            <Activity className="relative z-10 h-4 w-4 text-[#1a1815]" />
          </div>
          <div>
            <h1 className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-[#1a1815]">
              VEYRA
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full border border-[#e3dcd1] bg-[#fcfaf6]" />
            </h1>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#3a3530] font-bold">
              Chalet Companion
            </p>
          </div>
        </div>

        <div className="hidden h-6 w-px bg-[#fcfaf6]/30 md:block"></div>

        <div className="hidden items-center gap-2 rounded-full border border-[#e3dcd1]/65 bg-white/65 px-3 py-1.5 backdrop-blur-md md:flex">
          <MapPin className="h-3.5 w-3.5 text-[#1a1815]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1815] font-bold">
            Arosa, CH
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 border-r border-[#e3dcd1]/65 pr-4 md:flex">
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-[#1a1815] font-bold">10:17 AM</span>
            <span className="font-mono text-[9px] text-[#3a3530] font-bold">
              8°C / Clear
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-[#1a1815] font-bold">
              Serene
            </span>
            <span className="font-mono text-[9px] text-[#3a3530] font-bold">
              Trip Status
            </span>
          </div>
        </div>

        <button
          onClick={onOpenContext}
          className="flex items-center gap-2 rounded-full border border-[#e3dcd1]/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#3a3530] transition-all hover:border-[#e3dcd1] hover:bg-white hover:text-[#1a1815]"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px]">Context</span>
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3dcd1]/70 bg-white/70 text-[#3a3530] transition-all hover:border-[#e3dcd1] hover:text-[#1a1815]">
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
