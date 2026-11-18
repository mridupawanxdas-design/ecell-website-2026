"use client";

import React, { useState } from "react";
import { X, Sparkles, Send, CheckCircle2, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { type ProjectItem, type ProjectCategory } from "@/data/projects";

interface ShareIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newProject: ProjectItem) => void;
}

export default function ShareIdeaModal({
  isOpen,
  onClose,
  onSubmit,
}: ShareIdeaModalProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("FYP");
  const [department, setDepartment] = useState("");
  const [leadName, setLeadName] = useState(user?.name ?? "");
  const [leadEmail, setLeadEmail] = useState(user?.email ?? "");
  const [summary, setSummary] = useState("");
  const [commercialPotential, setCommercialPotential] = useState("");
  const [hasCallForIntern, setHasCallForIntern] = useState(false);
  const [internRole, setInternRole] = useState("");
  const [hasCallForFunding, setHasCallForFunding] = useState(false);
  const [targetFunding, setTargetFunding] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !department) return;

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title,
      category,
      department,
      leadName: leadName || "Anonymous Innovator",
      leadRole: category === "FYP" ? "Student Researcher" : category === "PhD Project" ? "Doctoral Scholar" : "Project Lead",
      leadEmail: leadEmail || "innovation@nits.ac.in",
      summary,
      commercialPotential: commercialPotential || "High commercialization and spin-off viability.",
      stage: "Prototype Ready",
      tags: tagsInput ? tagsInput.split(",").map((t) => t.trim()) : ["Innovation", "NIT Silchar"],
      hasCallForIntern,
      internshipRoles: hasCallForIntern && internRole ? [internRole] : undefined,
      hasCallForFunding,
      fundingStage: "Grant / Prototype Funding",
      targetFunding: hasCallForFunding && targetFunding ? targetFunding : undefined,
    };

    onSubmit(newProject);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1120] p-6 text-white shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 size={56} className="text-emerald-400" />
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
              Idea Submitted Successfully!
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Your project has been listed on the E-Cell Innovations Portal.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <Sparkles size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Share Your Idea or Working Project
                </h3>
                <p className="text-xs text-gray-400 sm:text-sm">
                  List your FYP, PhD research, or lab project with commercial potential.
                </p>
              </div>
            </div>

            {!user && (
              <div className="mb-6 flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/10 p-3.5 text-xs text-blue-300">
                <div className="flex items-center gap-2">
                  <Lock size={15} />
                  <span>Not logged in? You can still submit, or sign in to manage listings later.</span>
                </div>
                <Link
                  href="/login"
                  className="rounded-lg bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-500"
                >
                  Login
                </Link>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Agri-Drone Sensor for Tea Estates"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className="w-full rounded-xl border border-white/10 bg-[#141d33] px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="FYP">Final Year Project (FYP)</option>
                    <option value="PhD Project">PhD Research Work</option>
                    <option value="Professor Innovation">Professor Lab Innovation</option>
                    <option value="Student Startup">Student Startup / Idea</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mechanical / ECE / CSE"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Lead Name / Team *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyam Medhi & Team"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. lead@nits.ac.in"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  Project Abstract & Technical Summary *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the problem, prototype, and current working status..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  Commercial Potential & Business Viability
                </label>
                <textarea
                  rows={2}
                  placeholder="How can this convert into a business? Target market, customer segment, revenue model..."
                  value={commercialPotential}
                  onChange={(e) => setCommercialPotential(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  Domain Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="AgriTech, Hardware, AI/ML, CleanTech"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <span className="block font-semibold text-gray-200">
                  Recruitment & Capital Needs
                </span>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer text-gray-300">
                    <input
                      type="checkbox"
                      checked={hasCallForIntern}
                      onChange={(e) => setHasCallForIntern(e.target.checked)}
                      className="h-4 w-4 rounded accent-blue-600"
                    />
                    <span>Enable &quot;Call for Intern&quot;</span>
                  </label>

                  {hasCallForIntern && (
                    <input
                      type="text"
                      placeholder="Role (e.g. Firmware Intern)"
                      value={internRole}
                      onChange={(e) => setInternRole(e.target.value)}
                      className="w-full sm:w-64 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer text-gray-300">
                    <input
                      type="checkbox"
                      checked={hasCallForFunding}
                      onChange={(e) => setHasCallForFunding(e.target.checked)}
                      className="h-4 w-4 rounded accent-blue-600"
                    />
                    <span>Enable &quot;Call for Funding&quot;</span>
                  </label>

                  {hasCallForFunding && (
                    <input
                      type="text"
                      placeholder="Target Ask (e.g. ₹5,00,000)"
                      value={targetFunding}
                      onChange={(e) => setTargetFunding(e.target.value)}
                      className="w-full sm:w-64 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500"
                >
                  <Send size={14} />
                  <span>Submit Listing</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
