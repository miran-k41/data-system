"use client";

import React from "react";
import { X, Download, CheckCircle2, FileText, Printer, ExternalLink } from "lucide-react";
import { RequirementItem } from "../lib/types";

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  requirement: RequirementItem | null;
}

export default function DocumentModal({ isOpen, onClose, requirement }: DocumentModalProps) {
  if (!isOpen || !requirement) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{requirement.title}</h3>
              <p className="text-[11px] text-slate-500">Document Verification Viewer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body preview */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          
          {/* Verification Badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2">
              {requirement.completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800">Status: Verified & Authenticated</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="font-semibold text-slate-800">Status: Pending Upload / Review</span>
                </>
              )}
            </div>
            <span className="text-[11px] text-slate-500">
              {requirement.updatedAt || "Updated recently"}
            </span>
          </div>

          {/* Render stylized document artifact */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-inner space-y-3 font-mono text-[11px]">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900 uppercase">OFFICIAL DOCUMENT RECORD</span>
              <span className="text-teal-700 font-bold">DOC-ID: #8921-DOS</span>
            </div>

            <div className="space-y-1.5 text-slate-600 font-sans">
              <div className="flex justify-between">
                <span className="text-slate-400">Document Type:</span>
                <span className="font-semibold text-slate-800">{requirement.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Hash:</span>
                <span className="font-mono text-slate-800">SHA256: e8b9...44a1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Audit Timestamp:</span>
                <span className="text-slate-800">2026-08-28 06:15:22 EDT</span>
              </div>
              {requirement.verifiedBy && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Auditor:</span>
                  <span className="text-emerald-700 font-semibold">{requirement.verifiedBy}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100 text-center font-sans text-xs text-slate-600">
              ✓ Digital Certificate Validated by Department of State Registry Gateway
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-white flex items-center gap-1.5 transition"
            >
              <Printer className="w-3 h-3" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#00897B] text-white font-semibold text-xs hover:bg-[#00796B] transition shadow-xs"
            >
              Confirm
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
