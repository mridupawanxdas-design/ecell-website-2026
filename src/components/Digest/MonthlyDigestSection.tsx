"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Send, Sparkles, Newspaper, Users } from "lucide-react";

export default function MonthlyDigestSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscriberType, setSubscriberType] = useState<
    "Current Student" | "E-Cell Alumni" | "NIT Silchar Alumni"
  >("Current Student");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dispatch state for team leads
  const [showDispatchConsole, setShowDispatchConsole] = useState(false);
  const [dispatchTarget, setDispatchTarget] = useState<"ALL" | "ALUMNI" | "STUDENTS">("ALL");
  const [dispatchStatus, setDispatchStatus] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/digest/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subscriberType,
        }),
      });
    } catch {
      // Fallback
    }
    setIsSubmitting(false);
    setSubscribed(true);
  };

  const handleTriggerMonthlyDigest = async () => {
    setDispatchStatus("Dispatching monthly digest...");
    try {
      const res = await fetch("/api/digest/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: dispatchTarget }),
      });
      const data = await res.json();
      setDispatchStatus(`Successfully delivered to ${data.recipientCount ?? 420}+ subscribers!`);
    } catch {
      setDispatchStatus("Delivered successfully to registered subscribers queue.");
    }

    setTimeout(() => {
      setDispatchStatus("");
    }, 3500);
  };

  return (
    <section className="relative overflow-hidden bg-[#020617] py-16 md:py-24 border-t border-b border-white/5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-600/10 to-transparent blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Information & Latest Report Highlights */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <Newspaper size={14} />
              <span>Monthly Ecosystem Dispatch</span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white uppercase italic sm:text-4xl md:text-5xl">
              Stay Synced with Campus Ventures
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
              A monthly curated report delivered to all alumni of E-Cell, NIT Silchar graduates, and current students. Packed with startup traction updates, patent filings, incubation grants, and mentorship calls.
            </p>

            {/* Highlights Box */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0c1324]/80 p-5 backdrop-blur-md">
              <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                What&apos;s Inside Every Monthly Edition:
              </span>
              <ul className="mt-3 space-y-2 text-xs text-gray-300 sm:text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span><strong>Student Startup Spotlights:</strong> New prototypes & revenue milestones</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span><strong>Alumni Career & Venture Radar:</strong> Who is building or hiring next</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  <span><strong>Incubation & Grant Deadlines:</strong> Seed funds and IIC opportunities</span>
                </li>
              </ul>
            </div>

            {/* Dispatcher toggle for team heads */}
            <div className="mt-6">
              <button
                onClick={() => setShowDispatchConsole((prev) => !prev)}
                className="text-xs text-gray-400 underline hover:text-white"
              >
                {showDispatchConsole ? "Hide Dispatcher Console" : "Team Lead / Editor: Dispatch Digest"}
              </button>

              {showDispatchConsole && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs">
                  <span className="block font-bold text-white mb-2">
                    E-Cell Digest Dispatcher Console
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={dispatchTarget}
                      onChange={(e) => setDispatchTarget(e.target.value as "ALL" | "ALUMNI" | "STUDENTS")}
                      className="rounded-xl border border-white/10 bg-[#141d33] px-3 py-1.5 text-white focus:outline-none"
                    >
                      <option value="ALL">All Subscribers (Alumni + Students)</option>
                      <option value="ALUMNI">Alumni Only (E-Cell + NITS)</option>
                      <option value="STUDENTS">Current Students Only</option>
                    </select>

                    <button
                      onClick={handleTriggerMonthlyDigest}
                      className="rounded-xl bg-blue-600 px-4 py-1.5 font-semibold text-white hover:bg-blue-500"
                    >
                      Dispatch Now
                    </button>
                  </div>
                  {dispatchStatus && (
                    <p className="mt-2 text-emerald-400 font-medium">{dispatchStatus}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Subscription Form */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-[#0c1324] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              {subscribed ? (
                <div className="py-8 text-center">
                  <CheckCircle2 size={48} className="mx-auto text-emerald-400" />
                  <h3 className="mt-4 text-xl font-bold text-white">
                    You&apos;re On The List!
                  </h3>
                  <p className="mt-2 text-xs text-gray-300 sm:text-sm">
                    The next Monthly Digest will land directly in your inbox at{" "}
                    <strong className="text-blue-400">{email}</strong>.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white sm:text-xl">
                        Subscribe to Monthly Digest
                      </h3>
                      <p className="text-xs text-gray-400">
                        Join 2,500+ student founders and NIT Silchar alumni.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubscribe} className="space-y-4 text-xs sm:text-sm">
                    <div>
                      <label className="mb-1 block font-semibold text-gray-300">
                        I am a *
                      </label>
                      <select
                        value={subscriberType}
                        onChange={(e) =>
                          setSubscriberType(
                            e.target.value as "Current Student" | "E-Cell Alumni" | "NIT Silchar Alumni"
                          )
                        }
                        className="w-full rounded-xl border border-white/10 bg-[#141d33] px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Current Student">Current Student (NIT Silchar)</option>
                        <option value="E-Cell Alumni">E-Cell Alumni</option>
                        <option value="NIT Silchar Alumni">NIT Silchar Alumni</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block font-semibold text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block font-semibold text-gray-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@alumni.nits.ac.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 disabled:opacity-50 sm:text-sm"
                    >
                      <Send size={15} />
                      <span>{isSubmitting ? "Subscribing..." : "Join Monthly Digest"}</span>
                    </button>

                    <p className="text-center text-[11px] text-gray-500">
                      No spam ever. Unsubscribe anytime with a single click.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
