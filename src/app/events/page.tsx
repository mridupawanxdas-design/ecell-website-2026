import type { Metadata } from "next";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import EventsHubClient from "@/components/Events/EventsHubClient";

export const metadata: Metadata = {
  title: "Events & Competitions | E-Cell NIT Silchar",
  description:
    "Register for flagship entrepreneurship events, hackathons, and generate verified digital certificates.",
};

export default function EventsPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />
      <EventsHubClient />
      <Footer />
    </main>
  );
}
