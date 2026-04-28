import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, Sparkles, X } from "lucide-react";

export function SuggestionToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show context-aware suggestion after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ opacity: 0, x: 50, scale: 0.9 }}
           animate={{ opacity: 1, x: 0, scale: 1 }}
           exit={{ opacity: 0, x: 20, scale: 0.9 }}
           className="group absolute right-8 top-24 z-40 w-72 cursor-pointer rounded-2xl border border-[#e3dcd1]/35 bg-white/85 p-4 font-sans shadow-[0_10px_40px_rgba(44,40,37,0.06)] backdrop-blur-2xl transition-all hover:border-[#e3dcd1]/55 hover:bg-white"
        >
           <button 
              onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
              className="absolute right-3 top-3 rounded-md p-1 text-[#3d3833] opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-[#2c2825]"
           >
              <X className="h-3.5 w-3.5" />
           </button>
           
           <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e3dcd1]/45 bg-white">
                 <Coffee className="h-4 w-4 text-[#3d3833]" />
              </div>
              <div className="pr-4">
                 <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="h-3 w-3 text-[#3d3833]" fill="currentColor" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#3d3833]">Concierge Note</span>
                 </div>
                 <h4 className="mb-1 text-sm font-medium text-[#2c2825] drop-shadow-sm">Wellness Pause Suggested</h4>
                 <p className="text-xs leading-relaxed text-[#5c554d]">
                    Your pace looks intense. A quiet cafe with panoramic views is just 4 minutes away.
                 </p>
                 <button 
                    onClick={() => setIsVisible(false)}
                    className="group/btn mt-3 flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider text-[#3d3833] transition-colors hover:text-[#2c2825]"
                 >
                    Modify Route <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                 </button>
              </div>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
