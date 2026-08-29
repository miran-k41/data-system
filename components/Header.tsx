"use client";

import React from "react";
import { CheckSquare, Monitor, Smartphone, SplitSquareVertical, Sparkles } from "lucide-react";

interface HeaderProps {
  viewMode: "dual" | "desktop" | "mobile";
  onViewModeChange: (mode: "dual" | "desktop" | "mobile") => void;
  operatorStatus?: {
    name: string;
    status: string;
    avatar: string;
  };
}

export default function Header({
  viewMode,
  onViewModeChange,
  operatorStatus = {
    name: "Adam",
    status: "On break",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
  }
}: HeaderProps) {
  return (
    <header className="h-12 border-b border-slate-100 bg-white px-4 sm:px-6 flex items-center justify-between select-none">
      
      {/* Left: Breadcrumb / Section Header */}
      <div className="flex items-center gap-2 text-slate-800">
        <div className="w-5 h-5 rounded flex items-center justify-center text-slate-500">
          <CheckSquare className="w-4 h-4" />
        </div>
        <h1 className="font-bold text-[13px] tracking-tight text-slate-900">
          Orders
        </h1>
      </div>

      {/* Center / Right: View Mode Toggle & Operator Status */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* Screenshot / Layout View Switcher Pill */}
        <div className="flex items-center bg-slate-100/90 p-0.5 rounded-lg text-slate-600 text-[11px] font-medium border border-slate-200/60 shadow-2xs">
          <button
            onClick={() => onViewModeChange("dual")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition ${
              viewMode === "dual"
                ? "bg-white text-teal-800 shadow-xs font-semibold"
                : "hover:text-slate-900"
            }`}
            title="Side-by-Side Dual View (Exact Screenshot Presentation)"
          >
            <SplitSquareVertical className="w-3 h-3 text-teal-600" />
            <span className="hidden sm:inline">Screenshot Dual View</span>
            <span className="sm:hidden">Dual</span>
          </button>

          <button
            onClick={() => onViewModeChange("desktop")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition ${
              viewMode === "desktop"
                ? "bg-white text-teal-800 shadow-xs font-semibold"
                : "hover:text-slate-900"
            }`}
            title="Full Desktop Portal"
          >
            <Monitor className="w-3 h-3 text-slate-600" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => onViewModeChange("mobile")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition ${
              viewMode === "mobile"
                ? "bg-white text-teal-800 shadow-xs font-semibold"
                : "hover:text-slate-900"
            }`}
            title="Mobile Responsive Portal"
          >
            <Smartphone className="w-3 h-3 text-slate-600" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Operator Badge from screenshot: "Adam: On break" */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
          <span className="text-[12px] text-slate-800 font-medium">
            {operatorStatus.name}:{" "}
            <span className="text-[#C05621] font-semibold">
              {operatorStatus.status}
            </span>
          </span>
          <div className="relative">
            <img
              src={operatorStatus.avatar}
              alt={operatorStatus.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-amber-500 ring-1.5 ring-white" />
          </div>
        </div>

      </div>

    </header>
  );
}
