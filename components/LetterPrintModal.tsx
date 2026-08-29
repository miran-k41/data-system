"use client";

import React, { useRef } from "react";
import { LetterRecord } from "../lib/types";
import { downloadDocxLetter } from "../lib/templateConfig";
import { FileDown, X, ShieldCheck } from "lucide-react";

interface LetterPrintModalProps {
  letter: LetterRecord | null;
  onClose: () => void;
  onSave: (record: LetterRecord) => void;
}

function formatHeaderDate(dateStr?: string): string {
  if (!dateStr) return "14/08/2026";
  if (dateStr.includes("-")) {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }
  return dateStr;
}

export default function LetterPrintModal({ letter, onClose, onSave }: LetterPrintModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!letter) return null;

  const handleDocxDownload = () => {
    downloadDocxLetter(letter);
    onSave(letter);
  };

  return (
    <div
      dir="rtl"
      className="modal-backdrop-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 md:p-4 overflow-y-auto"
    >
      <div className="modal-card-print relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-4 flex flex-col max-h-[96vh]">
        
        {/* Modal Toolbar */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-600/20 text-[#00897B] rounded-lg">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-base text-slate-100">پێشبینین و داگرتنی نووسراو (A5)</h3>
              <p className="text-xs text-slate-400">
                نووسراوی ژمارە #{letter.letterNumber ?? 0} — قەبارەی فەرمی: A5
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDocxDownload}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] rounded-xl transition shadow-md shadow-teal-600/20 cursor-pointer"
              title="داگرتنی دۆکیومێنتی Word بە قەبارەی A5"
            >
              <FileDown className="w-4 h-4" />
              <span>داگرتنی Word (A5 .docx)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition mr-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Letter Document Viewer */}
        <div className="modal-body-print p-4 md:p-8 overflow-y-auto flex-1 bg-slate-200/80 flex justify-center items-start">
          
          {/* Official Document Frame strictly mirroring the screenshot in A5 proportion */}
          <div
            ref={printRef}
            dir="rtl"
            className="printable-letter w-full max-w-[560px] bg-white text-black rounded-none shadow-xl border-2 border-black min-h-[760px] flex flex-col font-sans select-text text-right"
            style={{
              fontFamily: "'Calibri', 'Segoe UI', Tahoma, 'Arial', sans-serif",
            }}
          >
            
            {/* 1. Header Banner (Blue Background) */}
            <div
              data-blue-bg="true"
              style={{ backgroundColor: '#A4C2E6' }}
              className="bg-[#A4C2E6] border-b-2 border-black p-2.5 md:p-3 grid grid-cols-3 items-center text-center"
            >
              {/* Arabic Header (Left) */}
              <div className="text-center font-bold text-black leading-tight space-y-0.5">
                <div className="text-xs md:text-sm font-extrabold">حكومة اقليم كوردستان</div>
                <div className="text-[11px] md:text-xs font-bold">مجلس الوزراء</div>
              </div>

              {/* Central Eagle Crest */}
              <div className="flex items-center justify-center">
                <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                  {/* Standard img tag guarantees instant display in browser print engine */}
                  <img
                    src="/krg_logo.png"
                    alt="Kurdistan Regional Government"
                    className="w-14 h-14 md:w-16 md:h-16 object-contain"
                  />
                </div>
              </div>

              {/* Kurdish Header (Right) */}
              <div className="text-center font-bold text-black leading-tight space-y-0.5">
                <div className="text-xs md:text-sm font-extrabold">حکومەتی هەرێمی کوردستان</div>
                <div className="text-[11px] md:text-xs font-bold">ئەنجومەنی وەزیران</div>
              </div>
            </div>

            {/* 2. Salutation Row */}
            <div className="border-b-2 border-black p-3 md:p-4 bg-white space-y-2">
              <div className="font-bold text-sm md:text-base text-black">
                بەڕێز سەرۆکی دیوانی ئەنجومەنی وەزیران
              </div>
              <div className="font-bold text-sm md:text-base text-black">
                سڵاو و ڕێز....
              </div>
            </div>

            {/* 3. Reference Row (نووسراوی, ژمارە, لە) */}
            <div className="border-b-2 border-black grid grid-cols-3 text-center bg-white py-1.5 font-bold text-xs md:text-sm text-black">
              <div className="border-l-2 border-black px-2 text-center truncate">
                نووسراوی : {letter.receivingMinistry || "---"}
              </div>
              <div className="border-l-2 border-black px-2 text-center">
                ژمارە : {letter.letterNumber ?? 0}
              </div>
              <div className="px-2 text-center">
                له : {formatHeaderDate(letter.date)}
              </div>
            </div>

            {/* 4. Subject Section (Header + Content) */}
            <div className="border-b-2 border-black">
              <div
                data-blue-bg="true"
                style={{ backgroundColor: '#A4C2E6' }}
                className="bg-[#A4C2E6] px-3 py-1 font-bold text-xs md:text-sm text-black border-b-2 border-black"
              >
                بابەت :
              </div>
              <div className="p-2.5 md:p-3 bg-white text-xs md:text-sm text-black min-h-[38px] font-medium leading-relaxed">
                {letter.subject || "0"}
              </div>
            </div>

            {/* 5. Details Section (Header + Content) */}
            <div className="border-b-2 border-black">
              <div
                data-blue-bg="true"
                style={{ backgroundColor: '#A4C2E6' }}
                className="bg-[#A4C2E6] px-3 py-1 font-bold text-xs md:text-sm text-black border-b-2 border-black"
              >
                ووردەکاری :
              </div>
              <div className="p-2.5 md:p-3.5 bg-white text-xs md:text-sm text-black min-h-[160px] md:min-h-[200px] font-normal leading-relaxed whitespace-pre-wrap">
                {letter.details || "0"}
              </div>
            </div>

            {/* 6. Directed To Section (Header + Content + Signatures) */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div
                  data-blue-bg="true"
                  style={{ backgroundColor: '#A4C2E6' }}
                  className="bg-[#A4C2E6] px-3 py-1 font-bold text-xs md:text-sm text-black border-b-2 border-black"
                >
                  ئاراستە بکریت بۆ :
                </div>
                <div className="p-2.5 md:p-3 bg-white text-xs md:text-sm text-black font-medium leading-relaxed">
                  {letter.directedTo || "0"}
                </div>
              </div>

              {/* Center Purpose & Salutation */}
              <div className="px-3 py-3 text-center space-y-4">
                <div className="text-xs md:text-sm text-black font-normal">
                  {letter.purpose ? letter.purpose : "0"}
                </div>
                <div className="font-bold text-sm md:text-base text-black">
                  ...لەگەڵ ڕێزدا
                </div>
              </div>

              {/* Bottom Signatory Name & Date (Left-aligned) */}
              <div className="p-3 md:p-4 pt-1 flex items-end justify-end">
                <div className="text-left space-y-0.5">
                  <div className="font-bold text-sm md:text-base text-black">
                    {letter.name || "چنار اسماعیل"}
                  </div>
                  <div className="text-xs md:text-sm text-black font-mono">
                    {letter.dateOfForwarding || letter.date || "2026-08-26"}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
