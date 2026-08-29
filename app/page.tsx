"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import DailyDataEntry from "../components/DailyDataEntry";
import DataEntryHistory from "../components/DataEntryHistory";
import LetterPrintModal from "../components/LetterPrintModal";
import { LetterRecord } from "../lib/types";
import {
  FileText,
  History,
  Menu,
} from "lucide-react";
import krgLogoImg from "./krg_logo.webp";

// ─── Kurdish Demo Sample Data ──────────────────────────────────────────────────
const INITIAL_DEMO_RECORDS: LetterRecord[] = [
  {
    id: "LTR-1001",
    name: "د. سارا مەحموود عەلی",
    code: 94021,
    receivingMinistry: "وەزارەتی تەندروستی",
    letterNumber: 7842,
    date: "2026-08-20",
    subject: "ڕێگەپێدانی دابینکردنی پێداویستی و دەرمانی پزیشکی بۆ نەخۆشخانەکان",
    details:
      "داواکاری فەرمی بۆ دابینکردن و گواستنەوەی دەستبەجێی پێداویستی و ئامێرە پزیشکییە تایبەتمەندەکان و دەرمانە سەرەکییەکان بۆ مەڵبەند و بنکە تەندروستییەکانی پارێزگاکان.",
    directedTo: "وەزارەتی دارایی و ئابووری",
    purpose: "پەسەندکردنی بوودجەی کڕینی پێداویستی تەندروستی بەپەلە",
    dateOfForwarding: "2026-08-22",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: "نێردراوە",
  },
  {
    id: "LTR-1002",
    name: "ئەندازیار تاریق مەنسوور حەمەد",
    code: 55104,
    receivingMinistry: "وەزارەتی پەروەردە",
    letterNumber: 8190,
    date: "2026-08-22",
    subject: "پەرەپێدانی پڕۆگرامی دیجیتاڵی و نۆژەنکردنەوەی ژێرخانی قوتابخانەکان",
    details:
      "پێشکەشکردنی نەخشە و پلانە ئەندازیارییە گشتگیرەکان و پێداویستییەکانی تەکنەلۆژیای زانیاری بۆ ٤٥ قوتابخانەی سەرەتایی لە پارێزگا بە مەبەستی بەستنەوەیان بە تۆڕی ئینتەرنێت.",
    directedTo: "وەزارەتی پلاندانان",
    purpose: "تەرخانکردنی بوودجە بۆ هۆڵەکانی کۆمپیوتەر و ژێرخانی تەکنەلۆژیا",
    dateOfForwarding: "2026-08-25",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: "تۆمارکراوە",
  },
  {
    id: "LTR-1003",
    name: "حەسەن ئیبراهیم کەریم",
    code: 33890,
    receivingMinistry: "وەزارەتی ڕۆشنبیری و لاوان",
    letterNumber: 6205,
    date: "2026-08-24",
    subject: "نۆژەنکردنەوەی شوێنەوارە مێژووییەکان و پاراستنی کەلەپووری نیشتمانی",
    details:
      "پێشنیازی چاودێری هاوبەش و ڕێنماییە تەکنیکییەکان بۆ پاراستنی شوێنەوارە دێرینەکان و قەڵا مێژووییەکان کە پێویستیان بە بەهێزکردنی پێکهاتەیی هەیە لەگەڵ ڕێکخراوی یونسکۆ.",
    directedTo: "فەرمانگەی پەیوەندییەکانی دەرەوە",
    purpose: "هەماهەنگی لەگەڵ شاندی نێودەوڵەتی و ڕێکخراوی یونسکۆ",
    dateOfForwarding: "2026-08-27",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: "تۆمارکراوە",
  },
];

// ─── Full-Height Right-Aligned RTL Sidebar ─────────────────────────────────────
function Sidebar({
  activeTab,
  onTabChange,
  recordCount,
  isMobileOpen,
  onCloseMobile,
}: {
  activeTab: "entry" | "history";
  onTabChange: (tab: "entry" | "history") => void;
  recordCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-xs" onClick={onCloseMobile} />
      )}

      <aside
        className={`
          fixed top-0 right-0 z-50 h-screen w-64 md:w-72 bg-white border-l border-slate-100 flex flex-col justify-between transition-transform duration-300 select-none
          lg:sticky lg:top-0 lg:translate-x-0 lg:z-30 lg:flex-shrink-0 shadow-xs
          ${isMobileOpen ? "translate-x-0 shadow-2xl" : "translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Top: KRG Official Logo Branding */}
        <div>
          <div className="p-5 border-b border-slate-100/80 bg-slate-50/40">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-xs border border-slate-100 p-1">
                <Image
                  src={krgLogoImg}
                  alt="KRG Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="min-w-0 text-right">
                <span className="font-bold text-[15px] text-slate-900 tracking-tight block leading-snug">
                  حکومەتی هەرێمی کوردستان
                </span>
                <span className="text-[11px] text-[#00897B] font-semibold block">
                  سیستەمی نووسراوە فەرمییەکان
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-4 space-y-2">
            <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right">
              لیستی سەرەکی
            </div>

            {/* Tab 1: Daily data entry */}
            <button
              onClick={() => {
                onTabChange("entry");
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-right transition text-[14px] ${
                activeTab === "entry"
                  ? "bg-[#D7F3ED] text-[#008378] font-bold shadow-2xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <span className="flex items-center gap-3">
                <FileText
                  className={`w-5 h-5 flex-shrink-0 ${
                    activeTab === "entry" ? "text-[#008378]" : "text-slate-400"
                  }`}
                />
                <span>تۆمارکردنی نووسراوی ڕۆژانە</span>
              </span>
            </button>

            {/* Tab 2: Data entry history */}
            <button
              onClick={() => {
                onTabChange("history");
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-right transition text-[14px] ${
                activeTab === "history"
                  ? "bg-[#D7F3ED] text-[#008378] font-bold shadow-2xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <span className="flex items-center gap-3">
                <History
                  className={`w-5 h-5 flex-shrink-0 ${
                    activeTab === "history" ? "text-[#008378]" : "text-slate-400"
                  }`}
                />
                <span>مێژووی تۆمارەکان</span>
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  activeTab === "history"
                    ? "bg-[#008378] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {recordCount}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom System Status */}
        <div className="p-4 border-t border-slate-100 text-[12px] text-slate-500 bg-slate-50/50 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-700">سیستەم چالاکە</span>
          </span>
          <span className="font-mono text-[11px] text-slate-400">v2.5 PRO</span>
        </div>
      </aside>
    </>
  );
}

// ─── Top Header (RTL) ──────────────────────────────────────────────────────────
function TopHeader({
  activeTab,
  onOpenSidebar,
}: {
  activeTab: "entry" | "history";
  onOpenSidebar: () => void;
}) {
  return (
    <header className="no-print sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-4 sm:px-8 h-16 flex items-center justify-between gap-4 shadow-2xs select-none">
      {/* Right side: Mobile Toggle + Kurdish Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm sm:text-base">
          <span className="text-slate-400 hidden sm:inline font-medium">سیستەمی نووسراوەکان</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="font-bold text-slate-900 tracking-tight">
            {activeTab === "entry" ? "تۆمارکردنی نووسراوی ڕۆژانە" : "مێژووی تۆمارەکان"}
          </span>
        </div>
      </div>

      {/* Left side: Date */}
      <div className="flex items-center gap-3 text-xs text-slate-500 flex-shrink-0">
        <span className="font-medium text-slate-600 font-mono">
          {new Date().toLocaleDateString('en-CA')}
        </span>
      </div>
    </header>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState<"entry" | "history">("entry");
  const [records, setRecords] = useState<LetterRecord[]>([]);
  const [printModalRecord, setPrintModalRecord] = useState<LetterRecord | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load records from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("krg_letter_system_history");
      if (saved) {
        setRecords(JSON.parse(saved));
      } else {
        setRecords(INITIAL_DEMO_RECORDS);
        localStorage.setItem("krg_letter_system_history", JSON.stringify(INITIAL_DEMO_RECORDS));
      }
    } catch {
      setRecords(INITIAL_DEMO_RECORDS);
    }
    setIsLoaded(true);
  }, []);

  const saveRecordsToStorage = (next: LetterRecord[]) => {
    setRecords(next);
    try {
      localStorage.setItem("krg_letter_system_history", JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleSaveRecord   = (r: LetterRecord)  => saveRecordsToStorage([r, ...records]);
  const handleUpdateRecord = (r: LetterRecord)  => saveRecordsToStorage(records.map((x) => (x.id === r.id ? r : x)));
  const handleDeleteRecord = (id: string)       => saveRecordsToStorage(records.filter((x) => x.id !== id));
  const handleClearAll     = ()                 => saveRecordsToStorage([]);
  const handleReloadDemo   = ()                 => saveRecordsToStorage(INITIAL_DEMO_RECORDS);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0FAF8]">
        <div className="flex items-center gap-3 text-slate-700">
          <div className="w-6 h-6 border-2 border-[#00897B] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold">سیستەم لە بارکردندایە...</span>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen flex bg-[#F0FAF8] text-slate-900 font-sans antialiased text-right">

      {/* ─── Full-Height RTL Sidebar (Right side) ─── */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        recordCount={records.length}
        isMobileOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* ─── Main Column ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* Top Header */}
        <TopHeader
          activeTab={activeTab}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        {/* Page Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className={activeTab === "history" ? "w-full" : "max-w-5xl mx-auto"}>
            {activeTab === "entry" ? (
              <DailyDataEntry
                onOpenPrintModal={(rec) => setPrintModalRecord(rec)}
              />
            ) : (
              <DataEntryHistory
                records={records}
                onOpenPrintModal={(rec) => setPrintModalRecord(rec)}
                onUpdateRecord={handleUpdateRecord}
                onDeleteRecord={handleDeleteRecord}
                onClearAll={handleClearAll}
                onReloadDemoData={handleReloadDemo}
              />
            )}
          </div>
        </main>

        {/* Clean Kurdish RTL Footer */}
        <footer className="no-print border-t border-slate-200/70 bg-white py-4 px-6 sm:px-8 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} حکومەتی هەرێمی کوردستان · سیستەمی بەڕێوەبردنی نووسراوەکان و چاپکردن. هەموو مافەکان پارێزراون.</span>
          <div className="flex items-center gap-3 font-medium">
            <button onClick={() => setActiveTab("entry")} className="hover:text-[#008378] transition">فۆڕمی تۆمارکردنی نووسراو</button>
            <span>·</span>
            <button onClick={() => setActiveTab("history")} className="hover:text-[#008378] transition">بینینی مێژوو ({records.length})</button>
          </div>
        </footer>
      </div>

      {/* ─── Print Modal ─────────────────────────────────────────────── */}
      <LetterPrintModal
        letter={printModalRecord}
        onClose={() => setPrintModalRecord(null)}
        onSave={(rec) => {
          handleSaveRecord(rec);
          setPrintModalRecord(null);
        }}
      />
    </div>
  );
}
