import React from "react";
import { SlidersHorizontal, MapPin, Activity, User } from "lucide-react";
import { motion } from "motion/react";

interface TopBarProps {
  onOpenContext: () => void;
}

export function TopBar({ onOpenContext }: TopBarProps) {
  return (
    <header className="relative z-40 flex h-16 shrink-0 items-center justify-between border-b border-[#e3dcd1]/20 bg-[#fdfbf7]/80 px-6 shadow-md backdrop-blur-3xl">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-[#e3dcd1]/35 bg-white/70 p-1.5 shadow-[0_0_15px_rgba(44,40,37,0.04)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t border-[#e3dcd1]/45 opacity-50"
            />
            <Activity className="relative z-10 h-4 w-4 text-[#3d3833]" />
          </div>
          <div>
            <h1 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-[#2c2825]">
              VEYRA
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full border border-[#e3dcd1]/60 bg-[#fcfaf6]" />
            </h1>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#5c554d]">
              Chalet Companion
            </p>
          </div>
        </div>

        <div className="hidden h-6 w-px bg-[#fcfaf6]/30 md:block"></div>

        <div className="hidden items-center gap-2 rounded-full border border-[#e3dcd1]/30 bg-white/65 px-3 py-1.5 backdrop-blur-md md:flex">
          <MapPin className="h-3.5 w-3.5 text-[#3d3833]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#2c2825]">
            Arosa, CH
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 border-r border-[#e3dcd1]/30 pr-4 md:flex">
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-[#2c2825]">10:17 AM</span>
            <span className="font-mono text-[9px] text-[#5c554d]">
              8°C / Clear
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-[#3d3833]">
              Serene
            </span>
            <span className="font-mono text-[9px] text-[#5c554d]">
              Trip Status
            </span>
          </div>
        </div>

        <button
          onClick={onOpenContext}
          className="flex items-center gap-2 rounded-full border border-[#e3dcd1]/35 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[#5c554d] transition-all hover:border-[#e3dcd1]/70 hover:bg-white hover:text-[#2c2825]"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px]">Context</span>
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3dcd1]/35 bg-white/70 text-[#5c554d] transition-all hover:border-[#e3dcd1]/70 hover:text-[#2c2825]">
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
