import React, { useState } from "react";
import { ContextPanel } from "./components/ContextPanel";
import { TopBar } from "./components/TopBar";
import { TimelinePanel } from "./components/TimelinePanel";
import { ChatInterface } from "./components/ChatInterface";
import { MapPanel } from "./components/MapPanel";
import { FloatingActionBar } from "./components/FloatingActionBar";
import { Onboarding, OnboardingData } from "./components/Onboarding";
import { ExploreMode } from "./components/ExploreMode";
import { SuggestionToast } from "./components/SuggestionToast";
import { LandingPage } from "./components/landing/LandingPage";
import { motion, AnimatePresence } from "motion/react";
import { TimelineItem } from "./types";

type AppState = "landing" | "onboarding" | "dashboard";

const initialItems: TimelineItem[] = [
  {
    id: "1",
    time: "09:00 AM",
    title: "Arrival & Check-In",
    description: "Settle into your chalet suite and refresh.",
    status: "done",
    location: { lat: 35.6762, lng: 139.6503 },
  },
  {
    id: "2",
    time: "10:30 AM",
    title: "Village Promenade",
    description: "Stroll the central avenue and discover artisan boutiques.",
    status: "active",
    location: { lat: 35.6983, lng: 139.7731 },
  },
  {
    id: "3",
    time: "01:00 PM",
    title: "Private Dining",
    description: "Enjoy a curated tasting menu in a quiet lounge setting.",
    status: "upcoming",
    location: { lat: 35.702, lng: 139.7753 },
  },
  {
    id: "4",
    time: "03:30 PM",
    title: "Sunset Panorama",
    description: "Golden-hour mountain views from a scenic overlook.",
    status: "upcoming",
    location: { lat: 35.71, lng: 139.8107 },
  },
];

export default function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [tripContext, setTripContext] = useState<string>("");
  const [timelineItems, setTimelineItems] =
    useState<TimelineItem[]>(initialItems);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [clickedItemId, setClickedItemId] = useState<string | null>(null);

  const handleSkip = (id: string) => {
    setTimelineItems((prevItems) => prevItems.filter((i) => i.id !== id));
    setTimeout(() => {
      setTimelineItems((prevItems) => {
        let foundActive = false;
        return prevItems.map((item) => {
          if (item.status === "upcoming" && !foundActive) {
            foundActive = true;
            return { ...item, status: "active" };
          }
          return item;
        });
      });
    }, 400);
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setTripContext(
      `Location: ${data.location}, Budget: ${data.budget}, Vibe: ${data.vibe}, Duration: ${data.duration}`,
    );
    setAppState("dashboard");
  };

  if (appState === "landing") {
    return <LandingPage onPlanStay={() => setAppState("onboarding")} />;
  }

  if (appState === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-[#fdfbf7] text-[#2c2825] font-sans">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548625361-ecacbd7f462a?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/80 to-[#fdfbf7]/90" />
      <TopBar onOpenContext={() => setIsContextOpen(true)} />

      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* LEFT PANEL: 30% */}
        <section className="relative z-20 hidden w-[30%] flex-col border-r border-[#e3dcd1]/20 bg-[#fdfbf7]/55 backdrop-blur-xl lg:flex">
          <TimelinePanel
            items={timelineItems}
            onSkip={handleSkip}
            hoveredItemId={hoveredItemId}
            onItemHover={setHoveredItemId}
            clickedItemId={clickedItemId}
            onItemClick={setClickedItemId}
          />
        </section>

        {/* CENTER PANEL: 40% */}
        <section className="relative z-10 flex w-full flex-col bg-[#fdfbf7]/65 shadow-2xl shadow-black/50 lg:w-[40%]">
          <ChatInterface 
            tripContext={tripContext} 
            setInputText={setTripContext}
            timelineItems={timelineItems}
            setTimelineItems={setTimelineItems}
          />
        </section>

        {/* RIGHT PANEL: 30% */}
        <section className="relative z-0 hidden w-[30%] flex-col border-l border-[#e3dcd1]/20 bg-[#fdfbf7] lg:flex">
          <MapPanel
            items={timelineItems}
            hoveredItemId={hoveredItemId}
            onMarkerHover={setHoveredItemId}
            clickedItemId={clickedItemId}
            onMarkerClick={setClickedItemId}
          />
        </section>
      </div>

      <FloatingActionBar
        onFixPlan={() => setTripContext("Fixing my plan")}
        onFindFood={() => setTripContext("Finding food")}
        onSurprise={() => setIsExploreOpen(true)}
        onOptimize={() => setTripContext("Optimizing schedule")}
      />

      <AnimatePresence>
        {isExploreOpen && (
          <ExploreMode
            onClose={() => setIsExploreOpen(false)}
            onSelect={(item) => {
              setTripContext(`Add this to my timeline: ${item.title}`);
              setIsExploreOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <SuggestionToast />

      <ContextPanel
        isOpen={isContextOpen}
        onClose={() => setIsContextOpen(false)}
        onSaveContext={setTripContext}
      />
    </main>
  );
}
