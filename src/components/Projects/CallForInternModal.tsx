"use client";

import React, { useState } from "react";
import { X, Users, CheckCircle2, Send } from "lucide-react";
import { type ProjectItem } from "@/data/projects";

interface CallForInternModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function CallForInternModal({
  project,
  onClose,
}: CallForInternModalProps) {
  const [name, setName] = useState("");
  const [scholarId, setScholarId] = useState("");
  const [branchYear, setBranchYear] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [statement, setStatement] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1120] p-6 text-white shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 size={52} className="text-emerald-400" />
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
              Application Dispatched!
            </h3>
            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              Your internship application has been sent to {project.leadName}.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
                <Users size={22} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">
                  Call for Intern Application
                </span>
                <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                  {project.title}
                </h3>
              </div>
            </div>

            {project.internshipRoles && (
              <div className="mb-4 rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 text-xs text-purple-300">
                <span className="font-semibold">Open Roles: </span>
                {project.internshipRoles.join(", ")}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
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
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Branch & Current Year *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ECE, 3rd Year"
                    value={branchYear}
                    onChange={(e) => setBranchYear(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Resume / GitHub / LinkedIn Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  Key Skills & Tech Stack *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Embedded C, ROS2, Python, CAD"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  Why do you want to work on this project? *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Briefly state your relevant experience and how you can contribute..."
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-600/30 transition-all hover:bg-purple-500"
                >
                  <Send size={14} />
                  <span>Send Application</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
