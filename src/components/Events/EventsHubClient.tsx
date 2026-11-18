"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { eventsList, type EventItem } from "@/data/events";
import EventRegistrationModal from "./EventRegistrationModal";
import CertificateGeneratorModal from "./CertificateGeneratorModal";
import CertificateVerifier from "./CertificateVerifier";

export default function EventsHubClient() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedRegEvent, setSelectedRegEvent] = useState<EventItem | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const filteredEvents = eventsList.filter((ev) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "ACTIVE") return ev.registrationOpen;
    if (activeFilter === "COMPLETED") return ev.status === "Completed";
    return true;
  });

  return (
    <div className="relative min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-600/10 to-transparent blur-3xl" />

        <div className="container mx-auto px-6 max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
            <Sparkles size={14} />
            <span>Flagship Summits & Challenges</span>
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tighter text-white uppercase italic sm:text-5xl md:text-6xl lg:text-7xl">
            Events & Competitions
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
            Participate in North-East India&apos;s most prestigious entrepreneurship summits, hackathons, and venture pitching conclaves.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-3 text-xs font-bold tracking-wide text-amber-300 shadow-xl shadow-amber-600/15 transition-all hover:bg-amber-500/20 sm:text-sm"
            >
              <ShieldCheck size={18} />
              <span>Event Heads: Certificate Generation Portal</span>
            </button>
            <Link
              href="/gallery"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold tracking-wide text-gray-300 transition-all hover:bg-white/10 hover:text-white sm:text-sm"
            >
              <span>View Photo Gallery</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-6 max-w-7xl pb-8">
        <div className="flex gap-2 border-b border-white/10 pb-4">
          {[
            { id: "ALL", label: "All Conclaves & Fests" },
            { id: "ACTIVE", label: "Open for Registration" },
            { id: "COMPLETED", label: "Completed (Certificates Ready)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeFilter === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "border border-white/5 bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="container mx-auto px-6 max-w-7xl pb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0c1324]/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-white/20"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={event.banner}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-blue-400 uppercase backdrop-blur-md">
                      {event.fest}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase backdrop-blur-md ${
                        event.registrationOpen
                          ? "bg-emerald-600/80 text-white"
                          : "bg-gray-800/80 text-gray-300"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors sm:text-2xl">
                    {event.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-blue-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-blue-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-blue-400" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-gray-300 sm:text-sm">
                    {event.description}
                  </p>

                  {event.prizePool && (
                    <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-xs text-emerald-300">
                      <Trophy size={15} className="text-emerald-400" />
                      <span className="font-semibold">Prize Pool: {event.prizePool}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 p-6 pt-4">
                <span className="text-xs text-gray-400">
                  Coordinator: {event.coordinatorName}
                </span>

                {event.registrationOpen ? (
                  <button
                    onClick={() => setSelectedRegEvent(event)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500"
                  >
                    <span>Register Now</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCertModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10"
                  >
                    <Award size={14} className="text-amber-400" />
                    <span>Get Certificate</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Public Certificate Verifier Section */}
      <section className="container mx-auto px-6 max-w-7xl pb-24">
        <CertificateVerifier />
      </section>

      {/* Modals */}
      <EventRegistrationModal
        event={selectedRegEvent}
        onClose={() => setSelectedRegEvent(null)}
      />

      <CertificateGeneratorModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />
    </div>
  );
}
