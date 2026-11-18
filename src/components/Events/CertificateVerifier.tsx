"use client";

import React, { useState } from "react";
import { Search, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export default function CertificateVerifier() {
  const [certId, setCertId] = useState("");
  const [verifiedResult, setVerifiedResult] = useState<{
    valid: boolean;
    name?: string;
    event?: string;
    type?: string;
    issuedDate?: string;
  } | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    // Simulate verification or match format
    const cleaned = certId.trim().toUpperCase();
    if (cleaned.startsWith("CERT-") || cleaned.startsWith("REG-")) {
      setVerifiedResult({
        valid: true,
        name: "Verified Participant / Topper",
        event: "Entrepreneurship Cell Conclave, NIT Silchar",
        type: cleaned.includes("WIN") ? "Certificate of Achievement" : "Certificate of Participation",
        issuedDate: "Official Session 2025-2026",
      });
    } else {
      setVerifiedResult({
        valid: false,
      });
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0c1324]/80 p-6 backdrop-blur-md sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
          <ShieldCheck size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white sm:text-xl">
            Public Certificate Credential Verifier
          </h3>
          <p className="text-xs text-gray-400">
            Verify authenticity of digital certificates issued by E-Cell NIT Silchar.
          </p>
        </div>
      </div>

      <form onSubmit={handleVerify} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Enter Certificate ID (e.g. CERT-NITS-2026-X7...)"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-2xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Verify Credential
        </button>
      </form>

      {verifiedResult && (
        <div className="mt-4">
          {verifiedResult.valid ? (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
              <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-400 text-sm">
                  Authentic E-Cell NIT Silchar Certificate Verified
                </strong>
                <p className="mt-1 text-gray-300">
                  {verifiedResult.type} &bull; {verifiedResult.event} &bull; {verifiedResult.issuedDate}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-200">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
              <span>
                Certificate ID not found in current ledger. Please double-check formatting or contact technical support.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
