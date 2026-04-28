import React, { useState } from 'react';
import { SlidersHorizontal, X, User, Map, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface ContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveContext: (contextStr: string) => void;
}

export function ContextPanel({ isOpen, onClose, onSaveContext }: ContextPanelProps) {
  const [profile, setProfile] = useState({
    name: '',
    style: 'explorer',
    budget: 'medium',
    preferences: '',
    energy: 'medium',
    pace: 'balanced',
  });

  const [trip, setTrip] = useState({
    location: '',
    duration: '',
    travelMode: 'walking',
  });

  const [state, setState] = useState({
    mood: 'curious',
    completed: '',
    missed: '',
  });

  const handleSave = () => {
    const contextString = `
USER PROFILE:
- Name: ${profile.name || 'Anonymous'}
- Travel Style: ${profile.style}
- Budget: ${profile.budget}
- Preferences: ${profile.preferences}
- Energy Level: ${profile.energy}
- Pace: ${profile.pace}

TRIP CONTEXT:
- Location: ${trip.location || 'Unknown'}
- Duration Available: ${trip.duration}
- Travel Mode: ${trip.travelMode}

REAL-TIME STATE:
- Completed Activities: ${state.completed || 'None'}
- Missed Activities: ${state.missed || 'None'}
- Current Mood: ${state.mood}
    `.trim();
    onSaveContext(contextString);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-premium-border/30 bg-premium-bg/80 backdrop-blur-3xl p-6 shadow-2xl shadow-neon-purple/5 overflow-y-auto"
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-purple/10 border border-neon-purple/30 shadow-[0_0_10px_rgba(44,40,37,0.04)]">
                  <SlidersHorizontal className="h-4 w-4 text-neon-purple drop-shadow-[0_0_5px_rgba(44,40,37,0.04)]" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium tracking-tight text-premium-text">Data Context</h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-premium-text-muted mt-0.5">Real-time Parameters</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-premium-text-muted transition-colors hover:bg-premium-surface hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* User Profile */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b border-premium-border/30 pb-2">
                  <User className="h-4 w-4 text-neon-purple" />
                  <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-premium-text">User Profile</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Travel Style</label>
                    <select
                      value={profile.style}
                      onChange={e => setProfile({ ...profile, style: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-purple/50 focus:bg-premium-surface transition-all backdrop-blur-md"
                    >
                      <option value="explorer">Explorer</option>
                      <option value="luxury">Luxury</option>
                      <option value="foodie">Foodie</option>
                      <option value="chill">Chill</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Budget</label>
                    <select
                      value={profile.budget}
                      onChange={e => setProfile({ ...profile, budget: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-purple/50 focus:bg-premium-surface transition-all backdrop-blur-md"
                    >
                      <option value="low">Low / Savvy</option>
                      <option value="medium">Medium</option>
                      <option value="high">High / Premium</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Energy Level</label>
                    <select
                      value={profile.energy}
                      onChange={e => setProfile({ ...profile, energy: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-purple/50 focus:bg-premium-surface transition-all backdrop-blur-md"
                    >
                      <option value="low">Low (Tired)</option>
                      <option value="medium">Medium (Balanced)</option>
                      <option value="high">High (Ready to go)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Pace</label>
                    <select
                      value={profile.pace}
                      onChange={e => setProfile({ ...profile, pace: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-purple/50 focus:bg-premium-surface transition-all backdrop-blur-md"
                    >
                      <option value="slow">Slow & Relaxed</option>
                      <option value="balanced">Balanced</option>
                      <option value="fast">Fast & Packed</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Preferences</label>
                    <input
                      type="text"
                      placeholder="e.g., veg, nightlife, history, shopping"
                      value={profile.preferences}
                      onChange={e => setProfile({ ...profile, preferences: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-purple/50 focus:bg-premium-surface transition-all backdrop-blur-md placeholder:text-premium-text-muted/40"
                    />
                  </div>
                </div>
              </section>

              {/* Trip Context */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b border-premium-border/30 pb-2">
                  <Map className="h-4 w-4 text-neon-cyan" />
                  <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-premium-text">Trip Context</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Location</label>
                    <input
                      type="text"
                      placeholder="e.g., Rome, Italy"
                      value={trip.location}
                      onChange={e => setTrip({ ...trip, location: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-cyan/50 focus:bg-premium-surface transition-all backdrop-blur-md placeholder:text-premium-text-muted/40"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 4 hours"
                      value={trip.duration}
                      onChange={e => setTrip({ ...trip, duration: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-cyan/50 focus:bg-premium-surface transition-all backdrop-blur-md placeholder:text-premium-text-muted/40"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Travel Mode</label>
                    <select
                      value={trip.travelMode}
                      onChange={e => setTrip({ ...trip, travelMode: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-cyan/50 focus:bg-premium-surface transition-all backdrop-blur-md"
                    >
                      <option value="walking">Walking</option>
                      <option value="car">Car / Taxi</option>
                      <option value="public transport">Public Transport</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Real-time State */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b border-premium-border/30 pb-2">
                  <Activity className="h-4 w-4 text-neon-pink" />
                  <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-premium-text">Real-Time State</h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Current Mood</label>
                    <select
                      value={state.mood}
                      onChange={e => setState({ ...state, mood: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-pink/50 focus:bg-premium-surface transition-all backdrop-blur-md"
                    >
                      <option value="curious">Curious / Exploratory</option>
                      <option value="hungry">Hungry</option>
                      <option value="tired">Tired / Need Coffee</option>
                      <option value="energetic">Energetic / Adventurous</option>
                      <option value="bored">Bored / Impress Me</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Completed Activities</label>
                    <input
                      type="text"
                      placeholder="e.g., Visited Colosseum, Had lunch"
                      value={state.completed}
                      onChange={e => setState({ ...state, completed: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-pink/50 focus:bg-premium-surface transition-all backdrop-blur-md placeholder:text-premium-text-muted/40"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-premium-text-muted">Missed Activities</label>
                    <input
                      type="text"
                      placeholder="e.g., Vatican Museum (sold out)"
                      value={state.missed}
                      onChange={e => setState({ ...state, missed: e.target.value })}
                      className="w-full rounded-md border border-premium-border/40 bg-premium-surface/50 px-3 py-2 text-premium-text outline-none focus:border-neon-pink/50 focus:bg-premium-surface transition-all backdrop-blur-md placeholder:text-premium-text-muted/40"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-10">
              <button
                onClick={handleSave}
                className="w-full rounded-md bg-neon-purple/90 backdrop-blur-md border border-neon-purple/50 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(44,40,37,0.04)] transition-all hover:bg-neon-purple hover:shadow-[0_0_30px_rgba(44,40,37,0.04)] active:scale-[0.98]"
              >
                Sync Data & Update
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
