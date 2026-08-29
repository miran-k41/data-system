"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  FileSpreadsheet,
  Tag,
  Zap,
  RotateCcw,
  FileCheck,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Bot,
  Store,
  Settings,
  Sparkles,
  Layers
} from "lucide-react";
import { HelloGovLogo } from "./Icons";

interface SidebarProps {
  activeNav?: string;
  onSelectNav?: (nav: string) => void;
  className?: string;
}

export default function Sidebar({ activeNav = "ai-orders", onSelectNav, className = "" }: SidebarProps) {
  const [aiAssistantsOpen, setAiAssistantsOpen] = useState(false);
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);

  const handleNavClick = (id: string) => {
    if (onSelectNav) onSelectNav(id);
  };

  return (
    <aside className={`w-[210px] lg:w-[225px] flex-shrink-0 bg-white border-r border-slate-100/90 flex flex-col justify-between select-none ${className}`}>
      
      {/* Top Organization Switcher */}
      <div className="p-3.5 pb-2">
        <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group">
          <div className="flex items-center gap-2.5">
            <HelloGovLogo className="w-6 h-6 rounded-lg" />
            <span className="font-bold text-[13px] text-slate-800 tracking-tight group-hover:text-teal-700 transition">
              HelloGov
            </span>
          </div>
          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-4 py-1 scrollbar-none text-[12px]">
        
        {/* Section: Dashboard */}
        <div>
          <div className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Dashboard
          </div>
          <div className="space-y-0.5 mt-0.5">
            <button
              onClick={() => handleNavClick("dashboard")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition ${
                activeNav === "dashboard"
                  ? "bg-[#D7F3ED] text-[#008378] font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => handleNavClick("tasks")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                activeNav === "tasks"
                  ? "bg-[#D7F3ED] text-[#008378] font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Tasks</span>
              </div>
              <span className="bg-[#E0F2FE] text-[#0284C7] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                127
              </span>
            </button>

            <button
              onClick={() => handleNavClick("customers")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition ${
                activeNav === "customers"
                  ? "bg-[#D7F3ED] text-[#008378] font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => handleNavClick("manifest")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition ${
                activeNav === "manifest"
                  ? "bg-[#D7F3ED] text-[#008378] font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
              <span>Manifest</span>
            </button>

            <button
              onClick={() => handleNavClick("orders-dash")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition ${
                activeNav === "orders-dash"
                  ? "bg-[#D7F3ED] text-[#008378] font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-slate-500" />
              <span>Orders</span>
            </button>
          </div>
        </div>

        {/* Section: AI WORKFLOWS */}
        <div>
          <div className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            AI Workflows
          </div>
          <div className="space-y-0.5 mt-0.5">
            <button
              onClick={() => handleNavClick("lead-nurture")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition ${
                activeNav === "lead-nurture"
                  ? "bg-[#D7F3ED] text-[#008378] font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-slate-500" />
              <span>Lead nurture</span>
            </button>

            {/* Active Highlighted Menu item from screenshot */}
            <button
              onClick={() => handleNavClick("ai-orders")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition ${
                activeNav === "ai-orders"
                  ? "bg-[#D7F3ED] text-[#008378] font-semibold shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-[#008378]" />
              <span className="font-semibold text-[#008378]">Orders</span>
            </button>

            <button
              onClick={() => handleNavClick("app-review")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition ${
                activeNav === "app-review"
                  ? "bg-[#D7F3ED] text-[#008378] font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Application review</span>
            </button>

            <button
              onClick={() => handleNavClick("refunds")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition ${
                activeNav === "refunds"
                  ? "bg-[#D7F3ED] text-[#008378] font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Refunds</span>
            </button>
          </div>
        </div>

        {/* Collapsible Section: AI Assistants */}
        <div>
          <button
            onClick={() => setAiAssistantsOpen(!aiAssistantsOpen)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <div className="flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-slate-400" />
              <span>AI Assistants</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                aiAssistantsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {aiAssistantsOpen && (
            <div className="pl-6 pr-2 py-1 space-y-1 text-[11px] text-slate-500 border-l border-slate-100 ml-4 mt-0.5">
              <div className="py-0.5 hover:text-teal-700 cursor-pointer">Document OCR Bot</div>
              <div className="py-0.5 hover:text-teal-700 cursor-pointer">DOS Expedite Helper</div>
              <div className="py-0.5 hover:text-teal-700 cursor-pointer">Photo Validator</div>
            </div>
          )}
        </div>

        {/* Collapsible Section: Marketplace */}
        <div>
          <button
            onClick={() => setMarketplaceOpen(!marketplaceOpen)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <div className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-slate-400" />
              <span>Marketplace</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                marketplaceOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {marketplaceOpen && (
            <div className="pl-6 pr-2 py-1 space-y-1 text-[11px] text-slate-500 border-l border-slate-100 ml-4 mt-0.5">
              <div className="py-0.5 hover:text-teal-700 cursor-pointer">Courier Plugins</div>
              <div className="py-0.5 hover:text-teal-700 cursor-pointer">State Dept APIs</div>
            </div>
          )}
        </div>

        {/* Section: Settings */}
        <div>
          <button
            onClick={() => handleNavClick("settings")}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>Settings</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

      </div>

      {/* Bottom Subtle Badge */}
      <div className="p-3 border-t border-slate-50 text-[10px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Sync Active</span>
        </span>
        <span className="text-slate-400 font-mono">v3.2</span>
      </div>

    </aside>
  );
}
