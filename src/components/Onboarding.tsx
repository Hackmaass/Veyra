import React, { useState } from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, MapPin, Loader2, Mountain, Trees } from "lucide-react";
import { cn } from "../lib/utils";

export type OnboardingData = {
  location: string;
  budget: string;
  vibe: string;
  duration: string;
};

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

const vibes = ["Chill", "Explore", "Foodie", "Luxury", "Adventure", "Nightlife"];
const budgets = ["Savvy", "Balanced", "Premium", "No Limits"];
const stepTitles = [
  "Where should your alpine escape begin?",
  "How long is your stay?",
  "What atmosphere do you want?",
  "Choose your comfort level",
];
const stepHints = [
  "Pick any destination and we will shape a refined itinerary around it.",
  "A weekend retreat or a full week in the mountains.",
  "From slow wellness mornings to vibrant evening experiences.",
  "Tailored recommendations matched to your travel style.",
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    location: "",
    budget: "",
    vibe: "",
    duration: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleComplete();
  };

  const handleComplete = () => {
    setIsGenerating(true);
    setTimeout(() => {
      onComplete(data);
    }, 3000); // simulate generation
  };

  if (isGenerating) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#fdfbf7] text-[#2c2825]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/70 to-white/95" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-[#e3dcd1]/30 border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-[#e3dcd1]/40 border-dotted"
            />
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#e3dcd1]/50 bg-white/70 shadow-[0_0_40px_rgba(44,40,37,0.04)] backdrop-blur-xl">
              <Sparkles className="h-8 w-8 text-[#3d3833]" />
            </div>
          </div>
          <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight text-[#3d3833]">
            Curating your mountain itinerary...
          </h2>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#3d3833]">
            <Loader2 className="h-3 w-3 animate-spin text-[#3d3833]" />
            <span>Preparing your bespoke plan</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#fdfbf7] text-[#2c2825]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/80 to-[#fdfbf7]/95" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:8rem_8rem] opacity-20" />

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative z-10 grid w-full max-w-6xl gap-8 p-6 lg:grid-cols-[1.15fr_1fr] lg:p-10"
      >
        <section className="rounded-3xl border border-[#e3dcd1]/30 bg-[#fdfbf7]/60 p-8 backdrop-blur-md shadow-[0_20px_80px_rgba(44,40,37,0.06)]">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="h-6 w-6 text-[#3d3833]" />
              <span className="font-display text-xl font-semibold tracking-tight">
                VEYRA Chalet Journeys
              </span>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-[#e3dcd1]/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#3d3833] md:flex">
              <Mountain className="h-3.5 w-3.5" />
              Alpine luxury
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#3d3833]">
              Inspired by Swiss chalet elegance
            </p>
            <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
              {stepTitles[step]}
            </h1>
            <p className="max-w-xl text-[#3d3833]/85">{stepHints[step]}</p>
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3d3833]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g., Arosa, Interlaken, Zermatt"
                  value={data.location}
                  onChange={(e) => setData({ ...data, location: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && data.location && handleNext()}
                  className="w-full rounded-2xl border border-[#e3dcd1]/35 bg-white/70 py-4 pl-12 pr-6 text-lg outline-none transition-all focus:border-[#e3dcd1]/70 focus:bg-white"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <input
                type="text"
                autoFocus
                placeholder="e.g., 3 nights, 1 week"
                value={data.duration}
                onChange={(e) => setData({ ...data, duration: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && data.duration && handleNext()}
                className="w-full rounded-2xl border border-[#e3dcd1]/35 bg-white/70 px-6 py-4 text-center text-lg outline-none transition-all focus:border-[#e3dcd1]/70 focus:bg-white"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex flex-wrap justify-start gap-3">
                {vibes.map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      setData({ ...data, vibe: v });
                      setTimeout(handleNext, 300);
                    }}
                    className={cn(
                      "rounded-full border px-6 py-3 font-mono text-sm tracking-wide transition-all duration-300",
                      data.vibe === v
                        ? "border-[#e3dcd1] bg-[#fcfaf6]/20 text-[#2c2825] shadow-[0_0_18px_rgba(44,40,37,0.04)]"
                        : "border-[#e3dcd1]/35 bg-white/60 text-[#5c554d] hover:border-[#e3dcd1]/70 hover:text-[#2c2825]",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {budgets.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setData({ ...data, budget: b });
                      setTimeout(handleComplete, 300);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border p-4 font-mono text-sm tracking-wide transition-all duration-300",
                      data.budget === b
                        ? "border-[#e3dcd1] bg-[#fcfaf6]/20 text-[#2c2825] shadow-[0_0_18px_rgba(44,40,37,0.04)]"
                        : "border-[#e3dcd1]/35 bg-white/60 text-[#5c554d] hover:bg-[#fcfaf6] hover:text-[#2c2825]",
                    )}
                  >
                    <span>{b}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center justify-between px-1">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className={cn(
              "font-mono text-xs uppercase tracking-widest text-[#3d3833] transition-colors hover:text-[#2c2825]",
              step === 0 && "pointer-events-none opacity-0",
            )}
          >
            Back
          </button>

          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === step
                    ? "w-6 bg-[#fcfaf6]"
                    : i < step
                      ? "w-1.5 bg-[#fcfaf6]/55"
                      : "w-1.5 bg-[#fcfaf6]/18",
                )}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={
              (step === 0 && !data.location) ||
              (step === 1 && !data.duration) ||
              (step === 2 && !data.vibe) ||
              (step === 3 && !data.budget)
            }
            className="font-mono text-xs uppercase tracking-widest text-[#3d3833] transition-colors hover:text-[#2c2825] disabled:pointer-events-none disabled:opacity-30"
          >
            {step === 3 ? "Enter Veyra" : "Continue"}
          </button>
        </div>
        </section>

        <aside className="hidden rounded-3xl border border-[#e3dcd1]/25 bg-[#fdfbf7]/50 p-7 backdrop-blur-md shadow-[0_20px_80px_rgba(44,40,37,0.06)] lg:block">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#3d3833]">
            The Chalet Experience
          </p>
          <h2 className="mb-6 font-display text-3xl font-medium tracking-tight text-[#2c2825]">
            Space, serenity, and bespoke experiences.
          </h2>

          <div className="grid gap-3">
            {[
              { title: "Philosophy", text: "Modern luxury with privacy, warmth, and calm." },
              { title: "Residences", text: "Elegant stays with natural textures and mountain views." },
              { title: "Cuisine", text: "Private dining moments crafted around your preferences." },
              { title: "Wellness", text: "Sauna, poolside rituals, and mindful alpine recovery." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#e3dcd1]/20 bg-white/65 p-4"
              >
                <p className="mb-1 font-display text-lg text-[#3d3833]">{item.title}</p>
                <p className="text-sm text-[#3d3833]/85">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-[#e3dcd1]/30 bg-white/70 p-4 text-[#5c554d]">
            <Trees className="h-4 w-4" />
            <p className="text-sm">Designed to feel like your private mountain retreat.</p>
          </div>
        </aside>
      </motion.div>
    </div>
  );
}
