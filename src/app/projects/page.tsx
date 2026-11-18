"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import ProjectCard from "@/components/Projects/ProjectCard";
import ShareIdeaModal from "@/components/Projects/ShareIdeaModal";
import CallForInternModal from "@/components/Projects/CallForInternModal";
import CallForFundingModal from "@/components/Projects/CallForFundingModal";
import { initialProjects, type ProjectItem, type ProjectCategory } from "@/data/projects";
import { Sparkles, Search, PlusCircle, Filter } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [filterInternOnly, setFilterInternOnly] = useState(false);
  const [filterFundingOnly, setFilterFundingOnly] = useState(false);

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeInternProject, setActiveInternProject] = useState<ProjectItem | null>(null);
  const [activeFundingProject, setActiveFundingProject] = useState<ProjectItem | null>(null);

  const categories = ["ALL", "FYP", "PhD Project", "Professor Innovation", "Student Startup"];

  const handleAddProject = (newProj: ProjectItem) => {
    setProjects((prev) => [newProj, ...prev]);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "ALL" || p.category === selectedCategory;

      const matchesIntern = !filterInternOnly || p.hasCallForIntern;
      const matchesFunding = !filterFundingOnly || p.hasCallForFunding;

      return matchesSearch && matchesCategory && matchesIntern && matchesFunding;
    });
  }, [projects, searchQuery, selectedCategory, filterInternOnly, filterFundingOnly]);

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-600/10 to-transparent blur-3xl" />
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <Sparkles size={14} />
              <span>Campus Innovation & Venture Desk</span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tighter text-white uppercase italic sm:text-5xl md:text-6xl lg:text-7xl">
              Working Projects & Ideas
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
              Explore cutting-edge Final Year Projects (FYP), PhD research, and professor innovations with commercial potential. Connect with student ventures hiring interns or raising early-stage funding.
            </p>

            {/* Action Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-xs font-bold tracking-wide text-white shadow-xl shadow-blue-600/25 transition-all hover:scale-[1.02] hover:shadow-blue-600/40 sm:text-sm"
              >
                <PlusCircle size={18} />
                <span>Share Your Idea / Project</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search Controls */}
      <section className="container mx-auto px-6 max-w-7xl pb-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0c1324]/60 p-4 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search projects by title, department, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-xs text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Toggle Flags */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterInternOnly((prev) => !prev)}
              className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
                filterInternOnly
                  ? "border-purple-500 bg-purple-500/20 text-purple-300"
                  : "border-white/10 bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              Hiring Interns
            </button>
            <button
              onClick={() => setFilterFundingOnly((prev) => !prev)}
              className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
                filterFundingOnly
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                  : "border-white/10 bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              Seeking Funding
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "border border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat === "ALL" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6 max-w-7xl pb-24">
        {filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <Filter size={40} className="mx-auto text-gray-500" />
            <h4 className="mt-4 text-lg font-bold text-white">No projects found</h4>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Try adjusting your search query or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onCallForIntern={(p) => setActiveInternProject(p)}
                onCallForFunding={(p) => setActiveFundingProject(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      <ShareIdeaModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onSubmit={handleAddProject}
      />

      <CallForInternModal
        project={activeInternProject}
        onClose={() => setActiveInternProject(null)}
      />

      <CallForFundingModal
        project={activeFundingProject}
        onClose={() => setActiveFundingProject(null)}
      />

      <Footer />
    </main>
  );
}
