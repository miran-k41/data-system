"use client";

import React from "react";
import {
  Hexagon,
  AlignLeft,
  MessageSquare,
  FileText,
  Receipt,
  FileCheck
} from "lucide-react";

export type TabType = "orders" | "activity" | "communications" | "notes" | "invoices";

interface TabsNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  compact?: boolean;
}

export default function TabsNav({ activeTab, onTabChange, compact = false }: TabsNavProps) {
  const tabs = [
    { id: "orders" as TabType, label: "Orders", icon: Hexagon },
    { id: "activity" as TabType, label: "Activity", icon: AlignLeft },
    { id: "communications" as TabType, label: "Communications", icon: MessageSquare },
    ...(!compact
      ? [
          { id: "notes" as TabType, label: "Notes", icon: FileText },
          { id: "invoices" as TabType, label: "Invoices", icon: Receipt }
        ]
      : [])
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-100/90 pb-0.5 overflow-x-auto scrollbar-none select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              isActive
                ? "bg-[#D7F3ED] text-[#008378] font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 ${
                isActive ? "text-[#008378]" : "text-slate-400"
              }`}
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
