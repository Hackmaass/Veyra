export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  status: "done" | "active" | "upcoming";
  location: { lat: number; lng: number };
}
