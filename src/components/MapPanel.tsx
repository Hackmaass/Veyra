import React, { useMemo, useState, useEffect } from "react";
import { Map, MapPin, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  GoogleMap,
  useJsApiLoader,
  OverlayView,
  Polyline,
} from "@react-google-maps/api";
import { TimelineItem } from "../types";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 35.6762,
  lng: 139.6503,
};

const mapOptions = {
  disableDefaultUI: true,
  backgroundColor: "#fdfbf7",
  styles: [
    { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#dadada" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9c9c9" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
  ],
};

export function MapPanel({
  items = [],
  hoveredItemId,
  onMarkerHover,
  clickedItemId,
  onMarkerClick,
}: {
  items?: TimelineItem[];
  hoveredItemId?: string | null;
  onMarkerHover?: (id: string | null) => void;
  clickedItemId?: string | null;
  onMarkerClick?: (id: string) => void;
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
  });

  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const activeIndex = items.findIndex((i) => i.status === "active");
  const startIndex = activeIndex >= 0 ? activeIndex : 0;

  // Show path for next 2-3 stops only
  const routeItems = items.slice(startIndex, startIndex + 3);
  const path = routeItems.map((m) => m.location);

  const activeItem = items[startIndex] || items[0];
  const activeLocation = activeItem?.location || center;

  // React to current active location with smooth panning
  useEffect(() => {
    if (mapInstance && activeLocation && !clickedItemId) {
      mapInstance.panTo(activeLocation);
      // Ensure we are zoomed in enough to see the current area
      if (mapInstance.getZoom()! < 13) {
        mapInstance.setZoom(14);
      }
    }
  }, [mapInstance, activeLocation, clickedItemId]);

  useEffect(() => {
    if (mapInstance && clickedItemId) {
      const clickedItem = items.find((i) => i.id === clickedItemId);
      if (clickedItem) {
        mapInstance.panTo(clickedItem.location);
        mapInstance.setZoom(15);
      }
    }
  }, [mapInstance, clickedItemId, items]);

  const computedMarkers = items.map((item) => {
    let color = "slate";
    if (item.status === "active") color = "gold";
    if (item.status === "upcoming") color = "sage";
    // For "done", we might fade them out or use a different color.
    if (item.status === "done") color = "slate";

    return {
      id: item.id,
      position: item.location,
      label: item.title,
      color,
      ring: item.status === "active",
      status: item.status,
    };
  });

  if (!apiKey || !isLoaded) {
    return (
      <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Grid & Noise */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

        {/* Simulation of a Map */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <Map
            className="h-[120%] w-[120%] text-[#3d3833] drop-shadow-[0_0_15px_rgba(44,40,37,0.04)]"
            strokeWidth={0.2}
          />
        </div>

        <div className="relative z-10 w-full max-w-xs rounded-2xl border border-[#e3dcd1]/35 bg-white/85 p-6 text-center shadow-[0_0_30px_rgba(44,40,37,0.04)] backdrop-blur-xl">
          <div className="mb-4 inline-flex items-center justify-center rounded-full border border-[#e3dcd1]/45 bg-white p-3">
            <Compass className="h-6 w-6 animate-pulse text-[#3d3833]" />
          </div>
          <h3 className="mb-2 font-display text-lg font-bold text-[#2c2825]">
            Map Preview Mode
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-widest leading-relaxed text-[#5c554d]">
            API key required for live overlay.
            <br />
            Showing schematic route...
          </p>
        </div>

        {/* Floating map pins simulation */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 flex flex-col items-center group cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute h-6 w-6 rounded-full border border-[#b09e80]/50 animate-ping opacity-75"></div>
            <div className="h-3 w-3 rounded-full bg-[#b09e80] shadow-[0_0_15px_rgba(176,158,128,0.5)]"></div>
          </div>
          <div className="mt-2 rounded border border-[#b09e80]/30 bg-white/80 px-2 py-1 font-mono text-[9px] text-[#5c554d] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            START_NODE
          </div>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.9, 0.7] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/3 right-1/4 flex flex-col items-center group cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#8b8070] shadow-[0_0_10px_rgba(139,128,112,0.5)]"></div>
          </div>
          <div className="mt-2 rounded border border-[#8b8070]/30 bg-white/80 px-2 py-1 font-mono text-[9px] text-[#5c554d] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            WAYPOINT_01
          </div>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.9, 0.7] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/3 flex flex-col items-center group cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#2c2825] shadow-[0_0_10px_rgba(44,40,37,0.3)]"></div>
          </div>
          <div className="mt-2 rounded border border-[#2c2825]/30 bg-white/80 px-2 py-1 font-mono text-[9px] text-[#2c2825] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            WAYPOINT_02
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col">
      {/* Noise overlay over the map */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fdfbf7] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fdfbf7] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fdfbf7] to-transparent z-10 pointer-events-none"></div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
        onLoad={setMapInstance}
      >
        {path.length > 1 && (
          <Polyline
            path={path}
            options={{
              strokeColor: "#b09e80", // gold
              strokeOpacity: 0.8,
              strokeWeight: 3,
              geodesic: true,
            }}
          />
        )}

        {computedMarkers.map((marker) => {
          const colorClasses = {
            "gold": {
              border: "border-[#b09e80]",
              bg: "bg-[#b09e80]",
              text: "text-[#5c554d]",
              shadow: "shadow-[0_0_15px_rgba(176,158,128,0.5)]",
              border30: "border-[#b09e80]/30",
              border50: "border-[#b09e80]/50",
            },
            "sage": {
              border: "border-[#8b8070]",
              bg: "bg-[#8b8070]",
              text: "text-[#5c554d]",
              shadow: "shadow-[0_0_15px_rgba(139,128,112,0.5)]",
              border30: "border-[#8b8070]/30",
              border50: "border-[#8b8070]/50",
            },
            "slate": {
              border: "border-[#2c2825]",
              bg: "bg-[#2c2825]",
              text: "text-[#2c2825]",
              shadow: "shadow-[0_0_15px_rgba(44,40,37,0.3)]",
              border30: "border-[#2c2825]/30",
              border50: "border-[#2c2825]/50",
            },
          }[marker.color as "gold" | "sage" | "slate"];

          return (
            <OverlayView
              key={marker.id}
              position={marker.position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="absolute -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{
                    scale: [1, marker.ring ? 1.2 : 1.1, 1],
                    opacity: [
                      marker.status === "done" ? 0.3 : 0.8,
                      marker.status === "done" ? 0.5 : 1,
                      marker.status === "done" ? 0.3 : 0.8,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center group cursor-pointer relative z-20"
                  onMouseEnter={() => onMarkerHover?.(marker.id)}
                  onMouseLeave={() => onMarkerHover?.(null)}
                  onClick={() => onMarkerClick?.(marker.id)}
                >
                  <div className="relative flex items-center justify-center">
                    {(marker.ring || hoveredItemId === marker.id) && (
                      <div
                        className={`absolute h-8 w-8 rounded-full border ${colorClasses.border50} animate-ping opacity-75`}
                      ></div>
                    )}
                    <div
                      className={`h-4 w-4 rounded-full ${colorClasses.bg} ${colorClasses.shadow} relative z-10`}
                    ></div>
                  </div>
                  <div
                    className={`absolute top-full mt-2 rounded border ${colorClasses.border30} bg-white/90 px-2 py-1 font-mono text-[9px] ${colorClasses.text} backdrop-blur-sm transition-opacity whitespace-nowrap ${hoveredItemId === marker.id ? "opacity-100 z-30" : "opacity-0 group-hover:opacity-100 z-20"}`}
                  >
                    {marker.label}
                  </div>
                </motion.div>
              </div>
            </OverlayView>
          );
        })}
      </GoogleMap>
    </div>
  );
}
