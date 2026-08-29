"use client";

import React, { useState, useMemo } from "react";
import { LetterRecord, DEFAULT_MINISTRIES, DEFAULT_DIRECTED_TO_LIST } from "../lib/types";
import { downloadDocxLetter } from "../lib/templateConfig";
import {
  Search,
  Filter,
  Download,
  Printer,
  FileText,
  Trash2,
  Edit3,
  Building2,
  FileSpreadsheet,
  RefreshCw,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  X,
  FileDown,
} from "lucide-react";

interface DataEntryHistoryProps {
  records: LetterRecord[];
  onOpenPrintModal: (record: LetterRecord) => void;
  onUpdateRecord: (updatedRecord: LetterRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
  onReloadDemoData: () => void;
}

const inputCls =
  "w-full p-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00897B]/30 focus:border-[#00897B] text-right transition";

export default function DataEntryHistory({
  records,
  onOpenPrintModal,
  onUpdateRecord,
  onDeleteRecord,
  onClearAll,
  onReloadDemoData,
}: DataEntryHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterReceiving, setFilterReceiving] = useState("ALL");
  const [filterDirected, setFilterDirected] = useState("ALL");
  const [sortField, setSortField] = useState<keyof LetterRecord>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [editingRecord, setEditingRecord] = useState<LetterRecord | null>(null);

  const filteredRecords = useMemo(() => {
    return records
      .filter((r) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.code.toString().includes(q) ||
          r.letterNumber.toString().includes(q) ||
          r.subject.toLowerCase().includes(q) ||
          r.receivingMinistry.toLowerCase().includes(q) ||
          r.directedTo.toLowerCase().includes(q) ||
          r.purpose.toLowerCase().includes(q);
        const matchesReceiving = filterReceiving === "ALL" || r.receivingMinistry === filterReceiving;
        const matchesDirected = filterDirected === "ALL" || r.directedTo === filterDirected;
        return matchesSearch && matchesReceiving && matchesDirected;
      })
      .sort((a, b) => {
        const vA = a[sortField] ?? "";
        const vB = b[sortField] ?? "";
        if (vA < vB) return sortOrder === "asc" ? -1 : 1;
        if (vA > vB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [records, searchQuery, filterReceiving, filterDirected, sortField, sortOrder]);

  const ministryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    records.forEach((r) => { counts[r.receivingMinistry] = (counts[r.receivingMinistry] || 0) + 1; });
    return counts;
  }, [records]);

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const headers = ["کۆد", "ناو", "ژمارەی نووسراو", "وەزارەتی وەرگر", "بابەت", "ئاڕاستەکراوە بۆ", "مەبەست", "بەروار", "بەرواری هەناردەکردن"];
    const rows = filteredRecords.map((r) => [
      `"${r.code}"`, `"${r.name.replace(/"/g, '""')}"`, `"${r.letterNumber}"`,
      `"${r.receivingMinistry.replace(/"/g, '""')}"`, `"${r.subject.replace(/"/g, '""')}"`,
      `"${r.directedTo.replace(/"/g, '""')}"`, `"${r.purpose.replace(/"/g, '""')}"`,
      `"${r.date}"`, `"${r.dateOfForwarding}"`,
    ]);
    const csv = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `Mezhuwy_Nusrawekan_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    if (!filteredRecords.length) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(filteredRecords, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `Mezhuwy_Nusrawekan_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSort = (field: keyof LetterRecord) => {
    if (sortField === field) setSortOrder((p) => (p === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortOrder("desc"); }
  };

  return (
    <div dir="rtl" className="space-y-6 w-full text-right">

      {/* ── Page Heading ──────────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">مێژووی تۆمارەکان</h1>
        <p className="text-sm text-slate-500 mt-0.5">گەڕان، فلتەرکردن، دەستکاریکردن یاخود سەرلەنوێ چاپکردنەوەی نووسراوە تۆمارکراوەکان.</p>
      </div>

      {/* ── Summary Metric Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {[
          { icon: <FileText className="w-5 h-5" />, color: "text-[#00897B] bg-[#E0F7F2]", label: "کۆی گشتی تۆمارەکان", value: records.length },
          {
            icon: <Building2 className="w-5 h-5" />, color: "text-emerald-600 bg-emerald-50", label: "زۆرترین لایەنی وەرگر",
            value: Object.entries(ministryStats).sort((a, b) => b[1] - a[1])[0]?.[0]?.replace("وەزارەتی ", "") || "نییە",
            small: true,
          },
          {
            icon: <Clock className="w-5 h-5" />, color: "text-indigo-600 bg-indigo-50", label: "لە چاوەڕوانی هەناردەکردندا",
            value: records.filter((r) => new Date(r.dateOfForwarding) >= new Date()).length,
          },
          { icon: <CheckCircle2 className="w-5 h-5" />, color: "text-teal-700 bg-teal-50", label: "ئەنجامی فلتەرکراو", value: filteredRecords.length },
        ].map(({ icon, color, label, value, small }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${color} flex-shrink-0`}>{icon}</div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
              <p className={`font-bold text-slate-900 truncate ${small ? "text-sm mt-0.5" : "text-2xl"}`}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Controls Card ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden w-full">

        {/* Search + Filters Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="گەڕان بەپێی ناو، کۆد، ژمارەی نووسراو، بابەت، یاخود وەزارەت..."
              className="w-full pr-10 pl-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00897B]/30 focus:border-[#00897B] text-right transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters + Export */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={filterReceiving}
              onChange={(e) => setFilterReceiving(e.target.value)}
              className="px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00897B]/30 appearance-none text-right"
            >
              <option value="ALL">هەموو وەزارەتە وەرگرەکان</option>
              {DEFAULT_MINISTRIES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>

            <select
              value={filterDirected}
              onChange={(e) => setFilterDirected(e.target.value)}
              className="px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00897B]/30 appearance-none text-right"
            >
              <option value="ALL">هەموو وەزارەتە ئاڕاستەکراوەکان</option>
              {DEFAULT_MINISTRIES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>

            <button
              onClick={exportCSV}
              disabled={!filteredRecords.length}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition disabled:opacity-40"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              داگرتنی CSV
            </button>

            <button
              onClick={exportJSON}
              disabled={!filteredRecords.length}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5 text-[#00897B]" />
              JSON
            </button>
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-right text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] text-slate-500 uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5 cursor-pointer hover:text-[#008378] transition" onClick={() => toggleSort("letterNumber")}>
                  <span className="inline-flex items-center gap-1">ژمارەی نووسراو <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="px-5 py-3.5 cursor-pointer hover:text-[#008378] transition" onClick={() => toggleSort("code")}>
                  <span className="inline-flex items-center gap-1">کۆد <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="px-5 py-3.5 cursor-pointer hover:text-[#008378] transition" onClick={() => toggleSort("name")}>
                  <span className="inline-flex items-center gap-1">نێرەر / داواکار <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="px-5 py-3.5">نووسراوی وەرگیراو لە</th>
                <th className="px-5 py-3.5">بابەت و مەبەست</th>
                <th className="px-5 py-3.5">ئاڕاستەکراوە بۆ</th>
                <th className="px-5 py-3.5 cursor-pointer hover:text-[#008378] transition" onClick={() => toggleSort("date")}>
                  <span className="inline-flex items-center gap-1">بەروار <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="px-5 py-3.5">بەرواری هەناردە</th>
                <th className="px-5 py-3.5 text-left">کردارەکان</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-3">
                      <FileText className="w-10 h-10 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-600">هیچ نووسراوێک بەپێی ئەم فلتەرە نەدۆزرایەوە.</p>
                      <button
                        onClick={onReloadDemoData}
                        className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 bg-[#00897B] text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        بارکردنەوەی نموونەکان
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-3.5 font-mono font-bold text-[#00897B] whitespace-nowrap">#{r.letterNumber}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-800 font-semibold whitespace-nowrap">{r.code}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900 whitespace-nowrap">{r.name}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-medium whitespace-nowrap">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        {r.receivingMinistry}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 max-w-xs">
                      <p className="font-semibold text-slate-900 truncate" title={r.subject}>{r.subject}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5" title={r.purpose}>{r.purpose}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center px-2.5 py-1 bg-[#E0F7F2] text-[#007B6F] rounded-lg text-[11px] font-medium whitespace-nowrap">
                        {r.directedTo}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-600 whitespace-nowrap">{r.date}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-600 whitespace-nowrap">{r.dateOfForwarding}</td>
                    <td className="px-5 py-3.5 text-left whitespace-nowrap">
                      <div className="flex items-center justify-start gap-1.5">
                        <button
                          onClick={() => onOpenPrintModal(r)}
                          title="چاپکردن و بینینی نووسراو"
                          className="p-1.5 rounded-lg bg-[#00897B] text-white hover:bg-[#00796B] transition"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => downloadDocxLetter(r)}
                          title="داگرتنی فایلی وۆرد .DOCX"
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingRecord(r)}
                          title="دەستکاریکردنی تۆمار"
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`ئایا دڵنیایت لە سڕینەوەی نووسراوی ژمارە #${r.letterNumber} بۆ (${r.name})؟`)) onDeleteRecord(r.id);
                          }}
                          title="سڕینەوە"
                          className="p-1.5 rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>نیشاندانی <strong className="text-slate-700">{filteredRecords.length}</strong> لە کۆی <strong className="text-slate-700">{records.length}</strong> تۆمار</span>
          <div className="flex items-center gap-4">
            <button onClick={onReloadDemoData} className="flex items-center gap-1 font-semibold text-[#00897B] hover:underline">
              <RefreshCw className="w-3.5 h-3.5" />
              بارکردنەوەی نموونەکان
            </button>
            {records.length > 0 && (
              <button
                onClick={() => { if (confirm("ئایا دڵنیایت لە سڕینەوەی هەموو تۆمارەکان؟")) onClearAll(); }}
                className="flex items-center gap-1 font-semibold text-red-500 hover:underline"
              >
                سڕینەوەی هەمووی
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Edit Record Modal ─────────────────────────────────────── */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h3 className="font-bold text-sm text-slate-900">دەستکاریکردنی نووسراوی ژمارە #{editingRecord.letterNumber}</h3>
              <button onClick={() => setEditingRecord(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">ناوی نێرەر</label>
                <input type="text" value={editingRecord.name}
                  onChange={(e) => setEditingRecord({ ...editingRecord, name: e.target.value })}
                  className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">کۆد</label>
                  <input type="number" value={editingRecord.code}
                    onChange={(e) => setEditingRecord({ ...editingRecord, code: parseInt(e.target.value, 10) || 0 })}
                    className={inputCls} />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">ژمارەی نووسراو</label>
                  <input type="number" value={editingRecord.letterNumber}
                    onChange={(e) => setEditingRecord({ ...editingRecord, letterNumber: parseInt(e.target.value, 10) || 0 })}
                    className={inputCls} />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">بابەت</label>
                <input type="text" value={editingRecord.subject}
                  onChange={(e) => setEditingRecord({ ...editingRecord, subject: e.target.value })}
                  className={inputCls} />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">مەبەست</label>
                <input type="text" value={editingRecord.purpose}
                  onChange={(e) => setEditingRecord({ ...editingRecord, purpose: e.target.value })}
                  className={inputCls} />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">وردەکاری و دەق</label>
                <textarea rows={3} value={editingRecord.details}
                  onChange={(e) => setEditingRecord({ ...editingRecord, details: e.target.value })}
                  className={`${inputCls} resize-none`} />
              </div>
            </div>

            <div className="flex justify-end gap-2 px-5 py-4 border-t border-slate-100 bg-slate-50/60">
              <button onClick={() => setEditingRecord(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition">
                پەشیمانبوونەوە
              </button>
              <button
                onClick={() => { onUpdateRecord(editingRecord); setEditingRecord(null); }}
                className="px-5 py-2 rounded-xl bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-bold transition shadow-xs">
                پاشەکەوتکردنی گۆڕانکارییەکان
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
