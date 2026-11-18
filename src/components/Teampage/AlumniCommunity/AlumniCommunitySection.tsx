"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Linkedin,
  Sparkles,
  Search,
  PlusCircle,
  Briefcase,
  GraduationCap,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import {
  initialAlumniCommunityMembers,
  type AlumniCommunityMember,
} from "@/data/alumniCommunity";
import AlumniCommunityModal from "./AlumniCommunityModal";

export default function AlumniCommunitySection() {
  const [members, setMembers] = useState<AlumniCommunityMember[]>(
    initialAlumniCommunityMembers,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [mentorOnly, setMentorOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMember = (newMem: AlumniCommunityMember) => {
    setMembers((prev) => [newMem, ...prev]);
  };

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.currentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.formerRoleAtEcell.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.domainsOfExpertise.some((d) =>
          d.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchMentor = !mentorOnly || m.openToMentor;
      return matchSearch && matchMentor;
    });
  }, [members, searchQuery, mentorOnly]);

  return (
    <div className="relative py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
            <Users size={14} />
            <span>Alumni Mentorship & Guidance Hub</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tighter text-white uppercase italic sm:text-4xl md:text-5xl lg:text-6xl">
            E-Cell Alumni Community
          </h2>

          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-gray-300 sm:text-sm md:text-base">
            Former E-Cell leaders and members who have scaled companies, joined top venture funds, and made waves across tech and business. Connecting directly to mentor newcomers.
          </p>

          {/* Action Button */}
          <div className="mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-xs font-bold tracking-wide text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] sm:text-sm"
            >
              <PlusCircle size={17} />
              <span>Are You an E-Cell Alum? Submit Details & Join</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0c1324]/60 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search alumni by name, company, former E-Cell role, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-xs text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none sm:text-sm"
            />
          </div>

          <button
            onClick={() => setMentorOnly((prev) => !prev)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-colors ${
              mentorOnly
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                : "border-white/10 bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            Available for Mentoring Only
          </button>
        </div>

        {/* Alumni Mentors Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c1324]/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
            >
              <div>
                {/* Header with Avatar & Status */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-gray-800">
                      {member.avatarUrl ? (
                        <Image
                          src={member.avatarUrl}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-bold text-gray-500">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <GraduationCap size={13} className="text-gray-500" />
                        <span>Batch of {member.passoutYear}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-blue-600/20 p-2 text-blue-400 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <Linkedin size={16} />
                  </Link>
                </div>

                {/* E-Cell Past Role Badge */}
                <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 text-xs text-blue-300">
                  <span className="font-semibold text-white">Former Role: </span>
                  {member.formerRoleAtEcell} ({member.branch})
                </div>

                {/* Current Role & Company */}
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-300">
                  <Briefcase size={14} className="text-gray-400" />
                  <span className="font-semibold text-white">{member.currentRole}</span>
                  <span className="text-gray-500">at</span>
                  <span className="font-semibold text-blue-400">{member.currentCompany}</span>
                </div>

                {/* Domains of Expertise */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {member.domainsOfExpertise.map((domain) => (
                    <span
                      key={domain}
                      className="rounded-lg bg-white/5 px-2.5 py-0.5 text-[10px] text-gray-400"
                    >
                      {domain}
                    </span>
                  ))}
                </div>

                {/* Advice for newcomers */}
                {member.messageForNewcomers && (
                  <div className="mt-4 rounded-xl border border-white/5 bg-white/5 p-3 text-xs text-gray-300 italic">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400 uppercase tracking-wider not-italic mb-1">
                      <MessageSquare size={11} />
                      <span>Advice to Newcomers:</span>
                    </div>
                    &ldquo;{member.messageForNewcomers}&rdquo;
                  </div>
                )}
              </div>

              {/* Mentorship & Hiring Status */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs">
                {member.openToMentor && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                    <CheckCircle2 size={13} />
                    <span>Open to Mentor</span>
                  </span>
                )}
                {member.openToHire && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-purple-400">
                    <Sparkles size={13} />
                    <span>Hiring from E-Cell</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Modal */}
      <AlumniCommunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMember}
      />
    </div>
  );
}
