"use client";

import React, { useState } from "react";
import { X, TrendingUp, CheckCircle2, Send } from "lucide-react";
import { type ProjectItem } from "@/data/projects";

interface CallForFundingModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function CallForFundingModal({
  project,
  onClose,
}: CallForFundingModalProps) {
  const [investorName, setInvestorName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [ticketSize, setTicketSize] = useState("");
  const [note, setNote] = useState("");
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
              Inquiry Dispatched!
            </h3>
            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              Your investment and incubation interest has been routed to the project lead & E-Cell Incubation Desk.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400">
                <TrendingUp size={22} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                  Funding & Incubation Connect
                </span>
                <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-300">
              {project.fundingStage && (
                <div>
                  <span className="font-semibold">Stage: </span>
                  {project.fundingStage}
                </div>
              )}
              {project.targetFunding && (
                <div>
                  <span className="font-semibold">Seeking: </span>
                  {project.targetFunding}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Investor / Mentor Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Angel Investor / Alumni"
                    value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Firm / Institution
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Venture Fund / Alumni Syndicate"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="investor@fund.vc"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-gray-300">
                    Indicative Ticket / Grant Offer
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹5 - 15 Lakhs"
                    value={ticketSize}
                    onChange={(e) => setTicketSize(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-300">
                  Message & Strategic Support Offered *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Outline how you would like to support or back this project (Capital, Mentorship, Market Access)..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
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
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500"
                >
                  <Send size={14} />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
