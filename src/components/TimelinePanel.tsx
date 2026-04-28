import React, { useEffect, useRef } from "react";
import { Clock, Navigation, CheckCircle2, Circle, X } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { TimelineItem } from "../types";

export function TimelinePanel({
  items,
  onSkip,
  hoveredItemId,
  onItemHover,
  clickedItemId,
  onItemClick,
}: {
  items: TimelineItem[];
  onSkip: (id: string) => void;
  hoveredItemId: string | null;
  onItemHover: (id: string | null) => void;
  clickedItemId: string | null;
  onItemClick: (id: string) => void;
}) {
  const activeItemRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [items]);

  useEffect(() => {
    if (clickedItemId && itemRefs.current[clickedItemId]) {
      itemRefs.current[clickedItemId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      // Try to clear the click after scrolling? Not strictly necessary unless we want the effect to run again on same click.
      // But map map marker click already sets it.
    }
  }, [clickedItemId]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto p-6" ref={scrollContainerRef}>
      <div className="sticky top-0 z-20 mb-6 flex flex-col gap-1 bg-[#fdfbf7]/95 py-2 backdrop-blur-md border-b border-[#e3dcd1]/30">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-[#1a1815]">
          <Clock className="h-4 w-4 text-[#1a1815]" />
          Itinerary
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#3a3530] font-bold">
          Bespoke day flow
        </p>
      </div>

      <div className="relative flex-1 mt-2">
        <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-[#8a7b63]/80 via-[#8a7b63]/60 to-[#8a7b63]/20"></div>

        <div className="space-y-6">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  filter: "blur(4px)",
                  transition: { duration: 0.3 },
                }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative pl-10",
                  item.status === "done" && "opacity-40",
                )}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                  if (item.status === "active") activeItemRef.current = el;
                }}
              >
                {item.status === "active" && (
                  <div className="absolute -left-2 -top-6 z-20 flex animate-pulse items-center gap-2 text-[#3d3833]">
                    <div className="h-[1px] w-8 bg-[#fcfaf6]/45"></div>
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold">
                      Now
                    </span>
                  </div>
                )}

                <div
                  className={cn(
                    "absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-[#fdfbf7] transition-colors duration-500",
                    item.status === "done"
                      ? "border-[#e3dcd1]/80 text-[#1a1815]"
                      : item.status === "active"
                        ? "border-[#e3dcd1] text-[#1a1815] shadow-sm"
                        : "border-[#e3dcd1]/70 text-[#3a3530]",
                  )}
                >
                  {item.status === "done" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : item.status === "active" ? (
                    <Navigation className="h-3.5 w-3.5" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                </div>

                <div
                  className={cn(
                    "rounded-xl border p-4 transition-all duration-300 backdrop-blur-md relative group cursor-pointer",
                    item.status === "active"
                      ? "scale-[1.02] border-[#e3dcd1]/80 bg-white shadow-[0_4px_25px_rgba(44,40,37,0.1)]"
                      : hoveredItemId === item.id
                        ? "scale-[1.01] border-[#e3dcd1] bg-white shadow-[0_4px_25px_rgba(44,40,37,0.1)]"
                        : "border-[#e3dcd1]/60 bg-white",
                  )}
                  onMouseEnter={() => onItemHover(item.id)}
                  onMouseLeave={() => onItemHover(null)}
                  onClick={() => onItemClick(item.id)}
                >
                  <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-[#3a3530] font-bold">
                    <span>{item.time}</span>
                    {item.status === "active" && (
                      <span className="flex animate-pulse items-center gap-1 text-[#1a1815]">
                        <Circle
                          fill="currentColor"
                          strokeWidth={0}
                          className="w-1.5 h-1.5"
                        />{" "}
                        Active
                      </span>
                    )}
                  </div>
                  <h3
                    className={cn(
                      "font-semibold text-sm mb-1 transition-colors duration-300",
                      item.status === "active"
                        ? "text-base text-[#1a1815]"
                        : "text-[#1a1815]",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#3a3530]">
                    {item.description}
                  </p>

                  {item.status === "active" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 flex items-center justify-between border-t border-[#e3dcd1]/30 pt-3"
                    >
                      <span className="font-mono text-[9px] uppercase font-bold text-[#1a1815]">
                        In progress
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onSkip(item.id)}
                          className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#3a3530] transition-colors hover:text-[#1a1815]"
                        >
                          <X className="h-3 w-3" /> Skip
                        </button>
                        <button className="rounded-md border border-[#e3dcd1]/80 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1a1815] transition-colors hover:bg-white">
                          Details &rarr;
                        </button>
                      </div>
                    </motion.div>
                  ) : item.status === "upcoming" ? (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onSkip(item.id)}
                        className="flex items-center gap-1 rounded-md border border-[#e3dcd1]/35 bg-white px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-[#5c554d] transition-colors hover:text-[#2c2825]"
                      >
                        Skip
                      </button>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
