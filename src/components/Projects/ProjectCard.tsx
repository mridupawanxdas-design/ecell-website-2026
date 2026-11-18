"use client";

import React from "react";
import { Users, TrendingUp, Sparkles, Building2, User } from "lucide-react";
import { type ProjectItem } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectItem;
  onCallForIntern: (project: ProjectItem) => void;
  onCallForFunding: (project: ProjectItem) => void;
}

export default function ProjectCard({
  project,
  onCallForIntern,
  onCallForFunding,
}: ProjectCardProps) {
  const getCategoryBadgeClass = (category: ProjectItem["category"]) => {
    switch (category) {
      case "FYP":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";
      case "PhD Project":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "Professor Innovation":
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
      default:
        return "border-purple-500/30 bg-purple-500/10 text-purple-400";
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c1324]/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl sm:p-7">
      <div>
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase ${getCategoryBadgeClass(
              project.category,
            )}`}
          >
            {project.category}
          </span>
          <span className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-gray-400">
            {project.stage}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors sm:text-xl">
          {project.title}
        </h3>

        {/* Lead & Department */}
        <div className="mt-3 flex flex-col gap-1.5 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <User size={13} className="text-gray-500" />
            <span className="font-semibold text-gray-300">{project.leadName}</span>
            <span className="text-gray-500">({project.leadRole})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 size={13} className="text-gray-500" />
            <span>{project.department}</span>
          </div>
        </div>

        {/* Technical Summary */}
        <p className="mt-4 text-xs leading-relaxed text-gray-300 sm:text-sm">
          {project.summary}
        </p>

        {/* Commercial Potential highlight box */}
        <div className="mt-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-3 text-xs text-blue-200">
          <div className="flex items-center gap-1.5 font-bold tracking-wide text-blue-400 uppercase">
            <Sparkles size={12} />
            <span>Commercial Potential</span>
          </div>
          <p className="mt-1 text-gray-300">{project.commercialPotential}</p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-white/5 px-2.5 py-0.5 text-[11px] text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons for Call for Intern & Call for Funding */}
      <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-4">
        {project.hasCallForIntern && (
          <button
            onClick={() => onCallForIntern(project)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-600/20 px-3.5 py-2 text-xs font-semibold text-purple-300 transition-all hover:border-purple-400 hover:bg-purple-600/30 hover:text-white"
          >
            <Users size={14} />
            <span>Call for Intern</span>
          </button>
        )}

        {project.hasCallForFunding && (
          <button
            onClick={() => onCallForFunding(project)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-600/20 px-3.5 py-2 text-xs font-semibold text-emerald-300 transition-all hover:border-emerald-400 hover:bg-emerald-600/30 hover:text-white"
          >
            <TrendingUp size={14} />
            <span>Call for Funding</span>
          </button>
        )}
      </div>
    </div>
  );
}
