"use client";

import React, { useRef } from "react";
import { Award, CheckCircle2, Download, Printer } from "lucide-react";

export interface CertificateData {
  recipientName: string;
  eventName: string;
  eventDate: string;
  certificateType: "Participation" | "Achievement";
  rankOrPosition?: string;
  certificateId: string;
  signatory1Title?: string;
  signatory2Title?: string;
}

interface CertificateCanvasProps {
  data: CertificateData;
}

export default function CertificateCanvas({ data }: CertificateCanvasProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const isAchievement = data.certificateType === "Achievement";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Printable Certificate Sheet */}
      <div
        ref={certRef}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border-4 border-[#bf9b30] bg-[#080d1a] p-8 text-center shadow-2xl sm:p-12"
        style={{
          boxShadow: "0 0 50px rgba(191, 155, 48, 0.2)",
        }}
      >
        {/* Decorative Corner Ornaments */}
        <div className="pointer-events-none absolute top-3 left-3 h-12 w-12 border-t-2 border-l-2 border-[#bf9b30]" />
        <div className="pointer-events-none absolute top-3 right-3 h-12 w-12 border-t-2 border-r-2 border-[#bf9b30]" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-12 w-12 border-b-2 border-l-2 border-[#bf9b30]" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-12 w-12 border-b-2 border-r-2 border-[#bf9b30]" />

        {/* Center Seal Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#bf9b30] bg-[#bf9b30]/10 text-[#bf9b30] shadow-lg">
          <Award size={36} />
        </div>

        {/* Institution Header */}
        <h3 className="text-xs font-bold tracking-[0.3em] text-[#bf9b30] uppercase sm:text-sm">
          National Institute of Technology Silchar
        </h3>
        <h4 className="mt-1 text-sm font-semibold tracking-wider text-gray-300 uppercase sm:text-base">
          Entrepreneurship Cell & Institution&apos;s Innovation Council (IIC)
        </h4>

        {/* Certificate Title */}
        <h1 className="mt-6 text-3xl font-black tracking-tight text-white uppercase italic sm:text-4xl md:text-5xl">
          {isAchievement ? "Certificate of Achievement" : "Certificate of Participation"}
        </h1>

        <div className="mx-auto my-4 h-0.5 w-32 bg-gradient-to-r from-transparent via-[#bf9b30] to-transparent" />

        {/* Presentation Statement */}
        <p className="text-xs tracking-widest text-gray-400 uppercase sm:text-sm">
          This is proudly presented to
        </p>

        {/* Recipient Name */}
        <div className="my-4">
          <span className="font-serif text-3xl font-bold tracking-tight text-white italic sm:text-4xl md:text-5xl">
            {data.recipientName}
          </span>
        </div>

        {/* Details Statement */}
        <p className="mx-auto max-w-2xl text-xs leading-relaxed text-gray-300 sm:text-sm md:text-base">
          {isAchievement ? (
            <>
              for securing <strong className="text-[#bf9b30]">{data.rankOrPosition ?? "1st Place"}</strong> in{" "}
              <strong className="text-white">{data.eventName}</strong> held on{" "}
              <span className="text-gray-200">{data.eventDate}</span>.
            </>
          ) : (
            <>
              for active and enthusiastic participation in{" "}
              <strong className="text-white">{data.eventName}</strong> conducted by E-Cell, NIT Silchar on{" "}
              <span className="text-gray-200">{data.eventDate}</span>.
            </>
          )}
        </p>

        {/* Signatures & Verification Row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <div className="h-9 font-serif text-lg text-gray-400 italic">Dr. Wasim Arif</div>
            <div className="border-t border-gray-600 pt-1 text-[11px] text-gray-400 uppercase tracking-wider">
              Faculty Advisor, E-Cell
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#bf9b30]">
              <CheckCircle2 size={13} />
              <span>ID: {data.certificateId}</span>
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">
              Verified by E-Cell Central Portal
            </span>
          </div>

          <div className="text-center sm:text-right">
            <div className="h-9 font-serif text-lg text-gray-400 italic">President, E-Cell</div>
            <div className="border-t border-gray-600 pt-1 text-[11px] text-gray-400 uppercase tracking-wider">
              E-Cell NIT Silchar
            </div>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500"
        >
          <Printer size={15} />
          <span>Print / Save as PDF</span>
        </button>
      </div>
    </div>
  );
}
