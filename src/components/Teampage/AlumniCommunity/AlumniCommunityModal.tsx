"use client";

import React, { useState } from "react";
import { X, Users, CheckCircle2, Send, Linkedin } from "lucide-react";
import { type AlumniCommunityMember } from "@/data/alumniCommunity";

interface AlumniCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: AlumniCommunityMember) => void;
}

export default function AlumniCommunityModal({
  isOpen,
  onClose,
  onSubmit,
}: AlumniCommunityModalProps) {
  const [name, setName] = useState("");
  const [passoutYear, setPassoutYear] = useState("2024");
  const [branch, setBranch] = useState("");
  const [formerRoleAtEcell, setFormerRoleAtEcell] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [domainsInput, setDomainsInput] = useState("Product Strategy, Tech, Mentorship");
  const [openToMentor, setOpenToMentor] = useState(true);
  const [openToHire, setOpenToHire] = useState(false);
  const [messageForNewcomers, setMessageForNewcomers] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !formerRoleAtEcell || !currentCompany) return;

    const newMember: AlumniCommunityMember = {
      id: `alum-${Date.now()}`,
      name,
      passoutYear,
      branch: branch || "Engineering",
      formerRoleAtEcell,
      currentCompany,
      currentRole: currentRole || "Leader",
      linkedinUrl: linkedinUrl || "https://www.linkedin.com/",
      domainsOfExpertise: domainsInput ? domainsInput.split(",").map((d) => d.trim()) : ["Entrepreneurship"],
      openToMentor,
      openToHire,
      messageForNewcomers: messageForNewcomers || "Glad to be part of the E-Cell NIT Silchar network. Reach out for any guidance!",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    };

    try {
      await fetch("/api/alumni/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
    } catch {
      // Graceful fallback
    }

    onSubmit(newMember);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1120] p-6 text-white shadow-2xl sm:p-8">
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
              Welcome Back to the E-Cell Network!
            </h3>
            <p className="mt-2 text-xs text-gray-300 sm:text-sm">
              Your details have been registered into the E-Cell Alumni Community directory. Thank you for empowering our newcomers!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <Users size={22} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                  E-Cell Alumni Registry
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Join the E-Cell Alumni Community
                </h3>
              </div>
            </div>

            <p className="mb-6 text-xs text-gray-300 sm:text-sm">
              Are you a past E-Cell NIT Silchar executive, lead, or volunteer? Register your current achievements and guide passionate newcomers on campus through office hours and mentorship.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Subhasish Saha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Passout Year / Batch *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2022"
                    value={passoutYear}
                    onChange={(e) => setPassoutYear(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Engineering Branch *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Electrical / CSE / Mechanical"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Former Role / Tenure at E-Cell *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. President (2021-22) / Tech Lead"
                    value={formerRoleAtEcell}
                    onChange={(e) => setFormerRoleAtEcell(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Current Company / Startup / University *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Razorpay / Startup Founder / NYU"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Current Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Product Manager / Co-Founder"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  LinkedIn Profile URL *
                </label>
                <div className="relative">
                  <Linkedin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                  <input
                    type="url"
                    required
                    placeholder="https://www.linkedin.com/in/username"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  Domains of Expertise (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Fundraising, Product Strategy, Tech Architecture, UI/UX, B2B Sales"
                  value={domainsInput}
                  onChange={(e) => setDomainsInput(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  A Word of Advice or Message for Current Students & Newcomers
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a guiding thought or what you learned during your journey..."
                  value={messageForNewcomers}
                  onChange={(e) => setMessageForNewcomers(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <span className="block font-semibold text-gray-200">
                  Community Engagement Preferences
                </span>

                <label className="flex items-center gap-2.5 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={openToMentor}
                    onChange={(e) => setOpenToMentor(e.target.checked)}
                    className="h-4 w-4 rounded accent-blue-600"
                  />
                  <span>I am open to mentoring newcomers and campus founders</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={openToHire}
                    onChange={(e) => setOpenToHire(e.target.checked)}
                    className="h-4 w-4 rounded accent-blue-600"
                  />
                  <span>I am open to hiring interns or offering referrals to E-Cell members</span>
                </label>
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
                  <span>Submit Details</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
