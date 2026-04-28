import React from 'react';
import { motion } from 'motion/react';
import { X, Map, Zap, Coffee, Building, Ticket } from 'lucide-react';
import { cn } from '../lib/utils';

interface ExploreModeProps {
  onClose: () => void;
  onSelect: (item: any) => void;
}

const surpriseItems = [
  { id: 1, type: 'hidden', title: 'Underground Vinyl Bar', desc: 'A secret jazz bar behind a laundromat door.', icon: Zap, color: 'text-neon-cyan', border: 'border-neon-cyan', bg: 'bg-neon-cyan/10' },
  { id: 2, type: 'food', title: 'Midnight Ramen', desc: 'No sign, just follow the line of locals after 10PM.', icon: Coffee, color: 'text-neon-pink', border: 'border-neon-pink', bg: 'bg-neon-pink/10' },
  { id: 3, type: 'culture', title: 'Rooftop Shrine', desc: 'Hidden sanctuary overlooking the neon city.', icon: Building, color: 'text-neon-purple', border: 'border-neon-purple', bg: 'bg-neon-purple/10' },
  { id: 4, type: 'event', title: 'Pop-up Art Expo', desc: 'Digital artists showcasing interactive holograms.', icon: Ticket, color: 'text-white', border: 'border-white/30', bg: 'bg-white/5' },
];

export function ExploreMode({ onClose, onSelect }: ExploreModeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 rounded-full bg-premium-surface border border-premium-border text-premium-text-muted hover:text-white hover:border-white/50 transition-all z-10"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="w-full max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(44,40,37,0.04)] mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b09e80] via-[#8b8070] to-[#b09e80]">EXCLUSIVE</span> EXPERIENCES
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-premium-text-muted">
              Accessing off-grid experiences. Select nodes to inject into timeline.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {surpriseItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + (i * 0.1), type: 'spring', damping: 20 }}
              onClick={() => onSelect(item)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-black/40 p-6 backdrop-blur-xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(44,40,37,0.06)]",
                item.border
              )}
            >
              <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500", item.bg)} />
              
              <div className={cn("mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black/50 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500", item.color)}>
                <item.icon className="h-6 w-6" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-premium-text-muted leading-relaxed font-sans">{item.desc}</p>
              
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white">Inject Node</span>
                <span className="text-neon-cyan">&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
