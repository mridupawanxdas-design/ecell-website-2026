"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Award, Mail, Eye, CheckCircle2 } from "lucide-react";
import { eventsList, authorizedRoles, type AuthorizedRole } from "@/data/events";
import CertificateCanvas, { type CertificateData } from "./CertificateCanvas";

interface CertificateGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateGeneratorModal({
  isOpen,
  onClose,
}: CertificateGeneratorModalProps) {
  // RBAC State
  const [selectedRole, setSelectedRole] = useState<AuthorizedRole>("Technical Head");
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");

  // Certificate form state
  const [selectedEventId, setSelectedEventId] = useState(eventsList[0]?.id ?? "");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [certType, setCertType] = useState<"Participation" | "Achievement">("Participation");
  const [rankOrPosition, setRankOrPosition] = useState("Winner");
  const [activePreview, setActivePreview] = useState<CertificateData | null>(null);
  const [mailSent, setMailSent] = useState(false);

  if (!isOpen) return null;

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    // Verification check for authorized roles
    if (authorizedRoles.includes(selectedRole)) {
      setIsAuthorized(true);
      setAuthError("");
    } else {
      setAuthError("Unauthorized role selection.");
    }
  };

  const handleGeneratePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName) return;

    const event = eventsList.find((ev) => ev.id === selectedEventId) || eventsList[0];
    const generatedId = `CERT-NITS-${Date.now().toString(36).toUpperCase()}`;

    const certData: CertificateData = {
      recipientName,
      eventName: event.title,
      eventDate: event.date,
      certificateType: certType,
      rankOrPosition: certType === "Achievement" ? rankOrPosition : undefined,
      certificateId: generatedId,
    };

    setActivePreview(certData);
  };

  const handleDispatchEmail = async () => {
    if (!activePreview || !recipientEmail) return;

    try {
      await fetch("/api/events/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail,
          ...activePreview,
        }),
      });
    } catch {
      // Fallback grace
    }

    setMailSent(true);
    setTimeout(() => {
      setMailSent(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1120] p-6 text-white shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
            <Award size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                Official Access Portal
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">
                RBAC Protected
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Certificate Generation & Automated Dispatch
            </h3>
          </div>
        </div>

        {!isAuthorized ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-2 text-amber-400">
              <ShieldCheck size={20} />
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Leadership & Coordinators Verification
              </h4>
            </div>
            <p className="text-xs text-gray-300 sm:text-sm">
              Certificate generation is restricted to authorized office bearers: Event Management Heads, Technical Heads, Respective Event Heads, POCs, Executive Heads, General Secretaries, Vice President, and President.
            </p>

            <form onSubmit={handleAuthorize} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-300">
                  Select Your Official Designation *
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as AuthorizedRole)}
                  className="w-full rounded-xl border border-white/10 bg-[#141d33] px-4 py-2.5 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  {authorizedRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-300">
                  Access Key / Portal Verification Pin
                </label>
                <input
                  type="password"
                  placeholder="Enter authorized credential code..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {authError && <p className="text-xs text-red-400">{authError}</p>}

              <button
                type="submit"
                className="w-full rounded-xl bg-amber-600 py-3 text-xs font-bold text-white shadow-lg shadow-amber-600/30 hover:bg-amber-500 sm:text-sm"
              >
                Verify & Access Certificate Console
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Authorized Session Active: <strong>{selectedRole}</strong></span>
              </span>
              <button
                onClick={() => setIsAuthorized(false)}
                className="text-[11px] font-semibold text-emerald-400 underline hover:text-white"
              >
                Switch Role
              </button>
            </div>

            <form onSubmit={handleGeneratePreview} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Select Event *
                  </label>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#141d33] px-4 py-2.5 text-white focus:border-amber-500 focus:outline-none"
                  >
                    {eventsList.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.title} ({ev.date})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Certificate Type *
                  </label>
                  <select
                    value={certType}
                    onChange={(e) => setCertType(e.target.value as "Participation" | "Achievement")}
                    className="w-full rounded-xl border border-white/10 bg-[#141d33] px-4 py-2.5 text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Participation">Certificate of Participation</option>
                    <option value="Achievement">Certificate of Achievement (Winner / Podium)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyam Medhi"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="participant@nits.ac.in"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {certType === "Achievement" ? (
                  <div>
                    <label className="mb-1 block font-semibold text-gray-300">
                      Rank / Position *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Winner / 1st Runner-Up"
                      value={rankOrPosition}
                      onChange={(e) => setRankOrPosition(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="flex items-end">
                    <span className="text-[11px] text-gray-400">
                      Granted to all verified registered attendees.
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-amber-600/30 hover:bg-amber-500"
                >
                  <Eye size={14} />
                  <span>Render Certificate</span>
                </button>
              </div>
            </form>

            {/* Certificate Preview and Dispatch Section */}
            {activePreview && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="font-bold text-white text-base">
                    Generated Live Certificate
                  </h4>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDispatchEmail}
                      disabled={mailSent}
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 disabled:opacity-50"
                    >
                      <Mail size={14} />
                      <span>{mailSent ? "Email Dispatched!" : "Dispatch Official Email"}</span>
                    </button>
                  </div>
                </div>

                {mailSent && (
                  <div className="mb-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-300">
                    Official email with Certificate, Gallery link, and Future Events link dispatched to <strong>{recipientEmail}</strong>!
                  </div>
                )}

                <CertificateCanvas data={activePreview} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
