import type { Metadata } from "next";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import ResourcesHubClient from "@/components/Resources/ResourcesHubClient";

export const metadata: Metadata = {
  title: "Resources & Founder Knowledge Base | E-Cell NIT Silchar",
  description:
    "Explore curated entrepreneurship resources: Books, podcasts, videos from our YouTube channel, and informative Instagram posts.",
};

export default function ResourcesPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />
      <ResourcesHubClient />
      <Footer />
    </main>
  );
}
