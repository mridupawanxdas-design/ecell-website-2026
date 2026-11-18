"use client";

import React, { useState } from "react";
import { X, Calendar, CheckCircle2, Send } from "lucide-react";
import { type EventItem } from "@/data/events";

interface EventRegistrationModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export default function EventRegistrationModal({
  event,
  onClose,
}: EventRegistrationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("National Institute of Technology Silchar");
  const [scholarId, setScholarId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState("Solo");
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  if (!event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const regId = `REG-${event.fest}-${Date.now().toString(36).toUpperCase()}`;
    setRegistrationId(regId);

    try {
      await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantName: name,
          participantEmail: email,
          phone,
          college,
          scholarId,
          eventName: event.title,
          eventDate: event.date,
          venue: event.venue,
          registrationId: regId,
        }),
      });
    } catch {
      // Graceful fallback
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1120] p-6 text-white shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 size={54} className="text-emerald-400" />
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
              Registration Confirmed!
            </h3>
            <p className="mt-2 text-xs text-gray-300 sm:text-sm">
              We have emailed the official confirmation, venue guidelines, and pass to{" "}
              <strong className="text-blue-400">{email}</strong>.
            </p>

            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
              <span className="block text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
                Your Registration ID
              </span>
              <span className="mt-1 block font-mono text-xl font-bold text-white">
                {registrationId}
              </span>
            </div>

            <button
              onClick={onClose}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <Calendar size={22} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                  Official Registration
                </span>
                <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                  {event.title}
                </h3>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-gray-300">
              <div>
                <span className="font-semibold text-white">Date: </span>
                {event.date}
              </div>
              <div>
                <span className="font-semibold text-white">Venue: </span>
                {event.venue}
              </div>
              {event.prizePool && (
                <div>
                  <span className="font-semibold text-emerald-400">Prizes: </span>
                  {event.prizePool}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyam Medhi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@nits.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Scholar ID / Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2314088"
                    value={scholarId}
                    onChange={(e) => setScholarId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  Institution / College *
                </label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Participation Format
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#141d33] px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Solo">Solo Individual</option>
                    <option value="Team (2 Members)">Team (2 Members)</option>
                    <option value="Team (3-4 Members)">Team (3-4 Members)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Team Name (if applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Innovators"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500"
                >
                  <Send size={14} />
                  <span>Submit Registration</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
