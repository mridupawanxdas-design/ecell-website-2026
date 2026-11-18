"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Headphones,
  Video,
  Instagram,
  FileText,
  ExternalLink,
  Search,
  Sparkles,
  ArrowRight,
  Bookmark,
} from "lucide-react";
import {
  booksData,
  podcastsData,
  videosData,
  instagramData,
  type BookResource,
  type PodcastResource,
  type VideoResource,
  type InstagramResource,
} from "@/data/resources";

type TabType = "ALL" | "BLOGS" | "BOOKS" | "PODCASTS" | "VIDEOS" | "INSTAGRAM";

export default function ResourcesHubClient() {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    return booksData.filter(
      (b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredPodcasts = useMemo(() => {
    return podcastsData.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredVideos = useMemo(() => {
    return videosData.filter(
      (v) =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredInstagram = useMemo(() => {
    return instagramData.filter(
      (ig) =>
        ig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ig.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ig.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <div className="relative min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-600/10 to-transparent blur-3xl" />
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
            <Sparkles size={14} />
            <span>The Founder&apos;s Knowledge Base</span>
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tighter text-white uppercase italic sm:text-5xl md:text-6xl lg:text-7xl">
            Entrepreneurship Resources
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
            A curated reservoir of must-read books, masterclass podcasts, campus & international startup video lectures, and viral business infographics.
          </p>
        </div>
      </section>

      {/* Navigation Controls */}
      <section className="container mx-auto px-6 max-w-7xl pb-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0c1324]/60 p-4 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search books, podcasts, videos, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-xs text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Quick link to Blogs */}
          <Link
            href="/blogs"
            className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-600/20 px-4 py-2.5 text-xs font-semibold text-blue-300 transition-colors hover:bg-blue-600/30 hover:text-white"
          >
            <FileText size={15} />
            <span>Visit The Startup Chronicles (Blogs)</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tab Filters */}
        <div className="mt-4 flex flex-wrap gap-2 overflow-x-auto pb-2">
          {[
            { id: "ALL", label: "All Hub", icon: Sparkles },
            { id: "BLOGS", label: "Blogs & Articles", icon: FileText },
            { id: "BOOKS", label: "Curated Books", icon: BookOpen },
            { id: "PODCASTS", label: "Podcasts", icon: Headphones },
            { id: "VIDEOS", label: "Videos & YouTube", icon: Video },
            { id: "INSTAGRAM", label: "Instagram & Reels", icon: Instagram },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "border border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 max-w-7xl pb-24 space-y-16">
        {/* BLOGS BANNER SECTION */}
        {(activeTab === "ALL" || activeTab === "BLOGS") && (
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <FileText size={20} className="text-blue-400" />
                <h3 className="text-xl font-bold tracking-tight text-white uppercase italic sm:text-2xl">
                  Featured Articles & Blogs
                </h3>
              </div>
              <Link
                href="/blogs"
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                <span>View Full Blog Engine</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-[#0c1324]/80 p-6 flex flex-col justify-between">
                <div>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-400 uppercase">
                    Ecosystem Insight
                  </span>
                  <h4 className="mt-3 text-base font-bold text-white">
                    Navigating Angel Syndicates & Pre-Seed Due Diligence in India
                  </h4>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                    Essential checkpoints every student entrepreneur should prepare before entering an angel investor room.
                  </p>
                </div>
                <Link
                  href="/blogs"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white"
                >
                  <span>Read Article</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0c1324]/80 p-6 flex flex-col justify-between">
                <div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 uppercase">
                    Case Study
                  </span>
                  <h4 className="mt-3 text-base font-bold text-white">
                    The Bootstrapping Playbook: Scaling on Customer Cash Flow
                  </h4>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                    Why profitability from day one is the ultimate moat for hardware and deep-tech ventures emerging from engineering colleges.
                  </p>
                </div>
                <Link
                  href="/blogs"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white"
                >
                  <span>Read Article</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0c1324]/80 p-6 flex flex-col justify-between">
                <div>
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-bold text-purple-400 uppercase">
                    Founders Toolkit
                  </span>
                  <h4 className="mt-3 text-base font-bold text-white">
                    Protecting IP: Provisional Patents for Final Year Projects
                  </h4>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                    How students and professors at NIT Silchar can leverage the IIC and institute IP cell to secure patent priorities.
                  </p>
                </div>
                <Link
                  href="/blogs"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white"
                >
                  <span>Read Article</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* BOOKS SECTION */}
        {(activeTab === "ALL" || activeTab === "BOOKS") && (
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <BookOpen size={20} className="text-amber-400" />
                <h3 className="text-xl font-bold tracking-tight text-white uppercase italic sm:text-2xl">
                  Recommended Reading List
                </h3>
              </div>
              <span className="text-xs text-gray-400">
                Foundational Books for Every Startup Founder
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c1324]/80 p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20"
                >
                  <div>
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5 rounded-full bg-black/60 p-1.5 backdrop-blur-md text-amber-400">
                        <Bookmark size={14} />
                      </div>
                    </div>

                    <span className="mt-3 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 uppercase">
                      {book.category}
                    </span>

                    <h4 className="mt-2 text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-xs font-medium text-gray-400">{book.author}</p>

                    <p className="mt-2 text-[11px] leading-relaxed text-gray-300">
                      {book.synopsis}
                    </p>

                    <div className="mt-3 rounded-xl border border-white/5 bg-white/5 p-2 text-[11px] text-gray-300">
                      <span className="font-semibold text-amber-400">Key Takeaway: </span>
                      {book.keyTakeaway}
                    </div>
                  </div>

                  <Link
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <span>Goodreads & Preview</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PODCASTS SECTION */}
        {(activeTab === "ALL" || activeTab === "PODCASTS") && (
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <Headphones size={20} className="text-purple-400" />
                <h3 className="text-xl font-bold tracking-tight text-white uppercase italic sm:text-2xl">
                  Startup & Founder Podcasts
                </h3>
              </div>
              <span className="text-xs text-gray-400">
                Listen to Masterclasses on Spotify & YouTube
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {filteredPodcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c1324]/80 p-6 backdrop-blur-md"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                      <Image
                        src={podcast.coverImage}
                        alt={podcast.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <span className="mt-3 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold text-purple-300 uppercase">
                      {podcast.category}
                    </span>

                    <h4 className="mt-2 text-base font-bold text-white">
                      {podcast.title}
                    </h4>
                    <p className="text-xs font-medium text-gray-400">{podcast.host}</p>

                    <p className="mt-3 text-xs leading-relaxed text-gray-300">
                      {podcast.description}
                    </p>

                    <div className="mt-3 rounded-xl border border-purple-500/20 bg-purple-500/5 p-2.5 text-xs text-purple-200">
                      <span className="font-semibold text-purple-400">Must-Listen: </span>
                      {podcast.highlightEpisode}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      href={podcast.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/40 py-2 text-xs font-semibold text-[#1DB954] hover:bg-[#1DB954]/30"
                    >
                      <Headphones size={13} />
                      <span>Spotify</span>
                    </Link>
                    {podcast.youtubeUrl && (
                      <Link
                        href={podcast.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-600/20 border border-red-500/40 py-2 text-xs font-semibold text-red-300 hover:bg-red-600/30"
                      >
                        <Video size={13} />
                        <span>YouTube</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIDEOS & YOUTUBE */}
        {(activeTab === "ALL" || activeTab === "VIDEOS") && (
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <Video size={20} className="text-red-400" />
                <h3 className="text-xl font-bold tracking-tight text-white uppercase italic sm:text-2xl">
                  Video Hub & E-Cell YouTube Sessions
                </h3>
              </div>
              <Link
                href="https://www.youtube.com/@ecellnitsilchar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-white"
              >
                <span>Official E-Cell YouTube Channel</span>
                <ExternalLink size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c1324]/80 p-5 backdrop-blur-md"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white">
                        {video.duration}
                      </span>
                    </div>

                    <span className="mt-3 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-bold text-red-400 uppercase">
                      {video.category}
                    </span>

                    <h4 className="mt-2 text-sm font-bold text-white">
                      {video.title}
                    </h4>
                    <p className="text-xs text-gray-400">{video.channel}</p>

                    <p className="mt-2 text-xs leading-relaxed text-gray-300">
                      {video.description}
                    </p>
                  </div>

                  <Link
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-600/30 hover:bg-red-500"
                  >
                    <Video size={13} />
                    <span>Watch on YouTube</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INSTAGRAM & SOCIALS */}
        {(activeTab === "ALL" || activeTab === "INSTAGRAM") && (
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <Instagram size={20} className="text-pink-400" />
                <h3 className="text-xl font-bold tracking-tight text-white uppercase italic sm:text-2xl">
                  Instagram Carousels & Reels
                </h3>
              </div>
              <Link
                href="https://www.instagram.com/ecell.nits/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-white"
              >
                <span>Follow @ecell.nits</span>
                <ExternalLink size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {filteredInstagram.map((ig) => (
                <div
                  key={ig.id}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c1324]/80 p-5 backdrop-blur-md"
                >
                  <div>
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                      <Image
                        src={ig.thumbnail}
                        alt={ig.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-pink-600/80 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase backdrop-blur-md">
                        {ig.category}
                      </span>
                    </div>

                    <h4 className="mt-3 text-sm font-bold text-white">
                      {ig.title}
                    </h4>
                    <p className="text-xs text-pink-400">{ig.handle}</p>

                    <p className="mt-2 text-xs leading-relaxed text-gray-300">
                      {ig.summary}
                    </p>
                  </div>

                  <Link
                    href={ig.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-pink-500/30 bg-pink-500/10 py-2 text-xs font-semibold text-pink-300 transition-colors hover:bg-pink-500/20 hover:text-white"
                  >
                    <Instagram size={13} />
                    <span>View on Instagram</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
