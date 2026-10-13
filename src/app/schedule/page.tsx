import ScheduleClient from "./ScheduleClient";

export const metadata = {
  title: "Class Schedule",
  description:
    "Weekly class schedule for FIIT Co. in Leslieville, Toronto. Boxing, HIIT, strength, Muay Thai, yoga and more. Reserve through MindBody.",
  alternates: { canonical: "https://fiitco.ca/schedule" },
  openGraph: {
    title: "Class Schedule | FIIT Co.",
    description:
      "Boxing, HIIT, strength, Muay Thai and yoga at 1047 Gerrard St E. Updated weekly.",
    url: "https://fiitco.ca/schedule",
    images: [{ url: "/hero/home.webp", alt: "FIIT Co. training floor" }],
  },
};

export default function SchedulePage() {
  return <ScheduleClient />;
}
