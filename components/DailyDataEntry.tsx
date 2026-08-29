"use client";

import React, { useState } from "react";
import { LetterRecord, DEFAULT_MINISTRIES, DEFAULT_DIRECTED_TO_LIST, FormErrors } from "../lib/types";
import { WORD_TEMPLATE_PLACEHOLDERS, downloadDocxLetter } from "../lib/templateConfig";
import {
  FileText,
  Building2,
  Hash,
  Sparkles,
  RotateCcw,
  Printer,
  FileDown,
  FileCode,
  CheckCircle,
  ChevronLeft,
  Link2,
  Target,
} from "lucide-react";

interface DailyDataEntryProps {
  onOpenPrintModal: (record: LetterRecord) => void;
}

const PURPOSE_OPTIONS = [
  "بۆ دیارسەکردن و رای بە رێزتان",
  "لە را و بۆچوونتان ئاگادارمان بکەنەوە",
  "بۆ بەدواداچوون و وەردبینیکردن / لە راتان ئاگادارمان بکەنەوە",
  "بۆ دیارسەکردن و بەدواداچوون و وەردبینیکردن / لە رای ئاگادارمان بکەنەوە",
  "بۆ دیارسەکردن و لە را و بۆچوونتان ئاگادارمان بکەنەوە",
  "ئایان داوە دەریاری بایەتکە",
  "بۆ وەگرتنی ڕایان",
  "پشتگیری لە رای بە رێزتان دەکەین، بۆ کاری پێویست",
];

const inputCls = (hasError?: boolean) =>
  `w-full py-2.5 px-4 rounded-xl border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 text-right transition ${
    hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-slate-200 focus:ring-[#00897B]/30 focus:border-[#00897B]"
  }`;

const iconInputCls = (hasError?: boolean) =>
  `w-full pr-10 pl-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 text-right transition ${
    hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-slate-200 focus:ring-[#00897B]/30 focus:border-[#00897B]"
  }`;

const labelCls = "block text-xs font-semibold text-slate-700 mb-1.5 text-right";

export default function DailyDataEntry({ onOpenPrintModal }: DailyDataEntryProps) {
  const [formData, setFormData] = useState({
    name: "چنار اسماعیل",
    code: "0",
    receivingMinistry: "",
    customReceivingMinistry: "",
    letterNumber: "",
    date: new Date().toISOString().split("T")[0],
    subject: "",
    relatedLetter: "",
    details: "",
    directedTo: "",
    customDirectedTo: "",
    purpose: "",
    dateOfForwarding: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showTemplateGuide, setShowTemplateGuide] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAutoFillSample = () => {
    setFormData({
      name: "چنار اسماعیل",
      code: "0",
      receivingMinistry: "وەزارەتی تەندروستی",
      customReceivingMinistry: "",
      letterNumber: "0",
      date: "2026-08-14",
      subject: "داواکاری دابینکردنی پێداویستی پزیشکی بەپەلە",
      relatedLetter: "",
      details:
        "داواکارین لە بەڕێزتان بە مەبەستی پەرەپێدانی خزمەتگوزارییە تەندروستییەکان و دابینکردنی پێداویستییە سەرەکییەکان بۆ نەخۆشخانەکان، ڕەزامەندی بفەرموون لەسەر تەرخانکردنی بودجەی پێویست بەپێی یاسا و ڕێنماییە کارپێکراوەکان.",
      directedTo: "وەزارەتی دارایی و ئابووری",
      customDirectedTo: "",
      purpose: PURPOSE_OPTIONS[0],
      dateOfForwarding: "2026-08-26",
    });
    setErrors({});
  };

  const handleReset = () => {
    setFormData({
      name: "چنار اسماعیل",
      code: "0",
      receivingMinistry: "",
      customReceivingMinistry: "",
      letterNumber: "",
      date: new Date().toISOString().split("T")[0],
      subject: "",
      relatedLetter: "",
      details: "",
      directedTo: "",
      customDirectedTo: "",
      purpose: "",
      dateOfForwarding: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    });
    setErrors({});
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.receivingMinistry || formData.receivingMinistry === "")
      e.receivingMinistry = "تکایە وەزارەت/لایەنی نووسراوی وەرگیراو هەڵبژێرە";
    else if (formData.receivingMinistry === "Other" && !formData.customReceivingMinistry.trim())
      e.receivingMinistry = "تکایە ناوی وەزارەتەکە بنووسە";
    if (!formData.letterNumber && formData.letterNumber !== "0") e.letterNumber = "ژمارەی نووسراو پێویستە";
    else if (isNaN(Number(formData.letterNumber)) || !Number.isInteger(Number(formData.letterNumber)))
      e.letterNumber = "دەبێت ژمارەیەکی تەواو بێت";
    if (!formData.date) e.date = "بەروار پێویستە";
    if (!formData.subject.trim()) e.subject = "بابەت پێویستە";
    if (!formData.details.trim()) e.details = "ناوەڕۆکی نووسراو پێویستە";
    if (!formData.directedTo || formData.directedTo === "")
      e.directedTo = "تکایە وەزارەت/لایەنی ئاڕاستەکراو هەڵبژێرە";
    else if (formData.directedTo === "Other" && !formData.customDirectedTo.trim())
      e.directedTo = "تکایە ناوی وەزارەتی مەبەست بنووسە";
    if (!formData.purpose || formData.purpose === "")
      e.purpose = "تکایە مەبەستی ئاڕاستەکردن هەڵبژێرە";
    if (!formData.dateOfForwarding) e.dateOfForwarding = "بەرواری هەناردەکردن پێویستە";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildRecord = (id: string): LetterRecord => ({
    id,
    name: formData.name.trim() || "چنار اسماعیل",
    code: parseInt(formData.code, 10) || 0,
    receivingMinistry:
      formData.receivingMinistry === "Other" ? formData.customReceivingMinistry : formData.receivingMinistry,
    letterNumber: parseInt(formData.letterNumber, 10) || 0,
    date: formData.date,
    subject: formData.subject,
    details: formData.relatedLetter
      ? `نووسراوی پەیوەندیدار: ${formData.relatedLetter}\n\n${formData.details}`
      : formData.details,
    directedTo: formData.directedTo === "Other" ? formData.customDirectedTo : formData.directedTo,
    purpose: formData.purpose,
    dateOfForwarding: formData.dateOfForwarding,
    createdAt: new Date().toISOString(),
    status: "تۆمارکراوە",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const rec = buildRecord("LTR-" + Date.now());
    onOpenPrintModal(rec);
  };

  const handleDirectDocxExport = () => {
    if (!validate()) return;
    downloadDocxLetter(buildRecord("TEMP-" + Date.now()));
  };

  return (
    <div dir="rtl" className="space-y-6 max-w-5xl text-right">

      {/* ── Page Heading Row ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">تۆمارکردنی نووسراوی ڕۆژانە</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            زانیارییەکانی نووسراوی فەرمی پڕبکەرەوە. دەستبەجێ ئامادە دەبێت بۆ چاپکردن یاخود داگرتنی فایلی وۆرد.
          </p>
        </div>
      </div>

      {/* ── Success Alert ───────────────────────────────────────────── */}
      {saveSuccessNotice && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>نووسراوەکە بەسەرکەوتوویی لە مێژوودا پاشەکەوت کرا! پەنجەرەی چاپکردن دەکرێتەوە...</span>
        </div>
      )}

      {/* ── Form ────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">

        {/* Form header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00897B]" />
            زانیارییەکانی نووسراوی فەرمی
          </h2>
          <span className="text-[11px] text-slate-400">* بڕگە پێویستەکان نیشانکراون</span>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* 1. Receiving Ministry — full width */}
          <div className="md:col-span-2">
            <label className={labelCls}>نووسراوی وەرگیراو ( وەزارەت / لایەن ) <span className="text-red-500">*</span></label>
            <div className="relative">
              <Building2 className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                name="receivingMinistry"
                value={formData.receivingMinistry}
                onChange={handleChange}
                className={`${iconInputCls(!!errors.receivingMinistry)} appearance-none`}
              >
                <option value="" disabled>— وەزارەت / لایەن هەڵبژێرە —</option>
                {DEFAULT_MINISTRIES.map((m) => <option key={m} value={m}>{m}</option>)}
                <option value="Other">وەزارەت یاخود لایەنی تر...</option>
              </select>
            </div>
            {formData.receivingMinistry === "Other" && (
              <input
                type="text"
                name="customReceivingMinistry"
                value={formData.customReceivingMinistry}
                onChange={handleChange}
                placeholder="ناوی وەزارەت یاخود لایەنی پەیوەندیدار بنووسە"
                className={`${inputCls()} mt-2`}
              />
            )}
            {errors.receivingMinistry && <p className="text-xs text-red-500 mt-1">{errors.receivingMinistry}</p>}
          </div>

          {/* 2. Letter Number */}
          <div>
            <label className={labelCls}>ژمارەی نووسراوی وەرگیراو <span className="text-red-500">*</span></label>
            <div className="relative">
              <Hash className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="number"
                name="letterNumber"
                step="1"
                value={formData.letterNumber}
                onChange={handleChange}
                placeholder="بۆ نموونە: 7842"
                className={`${iconInputCls(!!errors.letterNumber)} font-mono`}
              />
            </div>
            {errors.letterNumber && <p className="text-xs text-red-500 mt-1">{errors.letterNumber}</p>}
          </div>

          {/* 3. Date */}
          <div>
            <label className={labelCls}>بەرواری نووسراوی وەرگیراو <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`${inputCls(!!errors.date)} cursor-pointer`}
            />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
          </div>

          {/* 4. Subject — full width */}
          <div className="md:col-span-2">
            <label className={labelCls}>بابەت <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="بابەتی سەرەکی نووسراوەکە بنووسە..."
              className={`${inputCls(!!errors.subject)} font-medium`}
            />
            {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
          </div>

          {/* 5. Related Letter — full width */}
          <div className="md:col-span-2">
            <label className={labelCls}>نووسراوی پەیوەندیدار</label>
            <div className="relative">
              <Link2 className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                name="relatedLetter"
                value={formData.relatedLetter}
                onChange={handleChange}
                placeholder="بۆ نموونە: نووسراوی ژمارە ٣٢١ / ٢٠٢٥"
                className={iconInputCls()}
              />
            </div>
          </div>

          {/* 6. Details — full width */}
          <div className="md:col-span-2">
            <label className={labelCls}>ناوەڕۆکی نووسراو <span className="text-red-500">*</span></label>
            <textarea
              name="details"
              rows={5}
              value={formData.details}
              onChange={handleChange}
              placeholder="ڕوونکردنەوە و تەواوی دەقی نووسراوەکە لێرە بنووسە بۆ ئەوەی لە بەڵگەنامەکەدا دەربکەوێت..."
              className={`${inputCls(!!errors.details)} leading-relaxed resize-none`}
            />
            {errors.details && <p className="text-xs text-red-500 mt-1">{errors.details}</p>}
          </div>

          {/* 7. Directed To — full width */}
          <div className="md:col-span-2">
            <label className={labelCls}>ئاڕاستەکراوە بۆ (وەزارەت / لایەنی مەبەست) <span className="text-red-500">*</span></label>
            <div className="relative">
              <Building2 className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                name="directedTo"
                value={formData.directedTo}
                onChange={handleChange}
                className={`${iconInputCls(!!errors.directedTo)} appearance-none`}
              >
                <option value="" disabled>— وەزارەت / لایەن هەڵبژێرە —</option>
                {DEFAULT_DIRECTED_TO_LIST.map((m) => <option key={m} value={m}>{m}</option>)}
                <option value="Other">وەزارەت یاخود لایەنی تر...</option>
              </select>
            </div>
            {formData.directedTo === "Other" && (
              <input
                type="text"
                name="customDirectedTo"
                value={formData.customDirectedTo}
                onChange={handleChange}
                placeholder="ناوی وەزارەت یاخود لایەنی ئاڕاستەکراو بنووسە"
                className={`${inputCls()} mt-2`}
              />
            )}
            {errors.directedTo && <p className="text-xs text-red-500 mt-1">{errors.directedTo}</p>}
          </div>

          {/* 8. Purpose dropdown — full width */}
          <div className="md:col-span-2">
            <label className={labelCls}>مەبەستی ئاڕاستەکردن <span className="text-red-500">*</span></label>
            <div className="relative">
              <Target className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={`${iconInputCls(!!errors.purpose)} appearance-none`}
              >
                <option value="" disabled>— مەبەست هەڵبژێرە —</option>
                {PURPOSE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            {errors.purpose && <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>}
          </div>

          {/* Date of Forwarding — mandatory */}
          <div className="md:col-span-2">
            <label className={labelCls}>بەرواری هەناردەکردن <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="dateOfForwarding"
              value={formData.dateOfForwarding}
              onChange={handleChange}
              className={`${inputCls(!!errors.dateOfForwarding)} cursor-pointer`}
            />
            {errors.dateOfForwarding && <p className="text-xs text-red-500 mt-1">{errors.dateOfForwarding}</p>}
          </div>

        </div>

        {/* ── Action footer ──────────────────────────────────────────── */}
        <div className="px-6 md:px-8 py-4 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl hover:bg-slate-100 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            بەتاڵکردنەوەی فۆڕم
          </button>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-bold rounded-xl shadow-sm transition active:scale-[0.98] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              پاشەکەوتکردن و نیشاندانی نووسراو
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
