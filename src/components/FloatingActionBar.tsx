import React from "react";
import { Wrench, Utensils, Shuffle, Zap } from "lucide-react";
import { motion } from "motion/react";

export function FloatingActionBar({
  onFixPlan,
  onFindFood,
  onSurprise,
  onOptimize,
}: {
  onFixPlan: () => void;
  onFindFood: () => void;
  onSurprise: () => void;
  onOptimize: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.5 }}
      className="absolute bottom-6 left-1/2 z-40 hidden -translate-x-1/2 md:block"
    >
      <div className="flex items-center gap-2 rounded-2xl border border-[#e3dcd1]/30 bg-[#fdfbf7]/80 p-2 shadow-[0_10px_40px_rgba(44,40,37,0.06)] backdrop-blur-2xl">
        <button
          onClick={onFixPlan}
          className="group pointer-events-auto flex min-w-[80px] flex-col items-center justify-center gap-1.5 rounded-xl p-2 transition-all hover:-translate-y-1 hover:bg-white"
        >
          <Wrench className="h-4 w-4 text-[#5c554d] transition-colors group-hover:text-[#2c2825]" />
          <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#5c554d] group-hover:text-[#2c2825]">
            Fix Plan
          </span>
        </button>
        <div className="h-8 w-px bg-[#fcfaf6]/25"></div>
        <button
          onClick={onFindFood}
          className="group pointer-events-auto flex min-w-[80px] flex-col items-center justify-center gap-1.5 rounded-xl p-2 transition-all hover:-translate-y-1 hover:bg-white"
        >
          <Utensils className="h-4 w-4 text-[#5c554d] transition-colors group-hover:text-[#2c2825]" />
          <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#5c554d] group-hover:text-[#2c2825]">
            Find Food
          </span>
        </button>
        <div className="h-8 w-px bg-[#fcfaf6]/25"></div>
        <button
          onClick={onSurprise}
          className="group pointer-events-auto flex min-w-[80px] flex-col items-center justify-center gap-1.5 rounded-xl p-2 transition-all hover:-translate-y-1 hover:bg-white"
        >
          <Shuffle className="h-4 w-4 text-[#5c554d] transition-colors group-hover:text-[#2c2825]" />
          <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#5c554d] group-hover:text-[#2c2825]">
            Surprise
          </span>
        </button>
        <div className="h-8 w-px bg-[#fcfaf6]/25"></div>
        <button
          onClick={onOptimize}
          className="group pointer-events-auto relative flex min-w-[80px] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-[#e3dcd1]/45 bg-white p-2 transition-all hover:-translate-y-1 hover:border-[#e3dcd1]/75 hover:bg-white"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#d8c7a9]/15 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
          <Zap className="relative z-10 h-4 w-4 text-[#3d3833]" />
          <span className="relative z-10 font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#2c2825]">
            Optimize
          </span>
        </button>
      </div>
    </motion.div>
  );
}
