"use client";

import React from "react";
import { ActivityItem } from "../lib/types";
import { Clock, CheckCircle2, User, Truck, CreditCard, Shield } from "lucide-react";

interface ActivityViewProps {
  activities: ActivityItem[];
}

export default function ActivityView({ activities }: ActivityViewProps) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-sm text-slate-900">Audit & Processing Activity</h3>
          <p className="text-xs text-slate-500">Live timestamped event history for Order #H245326</p>
        </div>
        <span className="text-[11px] font-semibold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full border border-teal-200">
          {activities.length} Recorded Events
        </span>
      </div>

      <div className="space-y-4 pt-1">
        {activities.map((act, index) => {
          return (
            <div key={act.id} className="flex items-start gap-3 text-xs relative">
              {/* Vertical connector line */}
              {index < activities.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-100" />
              )}

              {/* Actor icon / avatar */}
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 z-10">
                {act.type === "agent" && <User className="w-4 h-4 text-teal-600" />}
                {act.type === "courier" && <Truck className="w-4 h-4 text-blue-600" />}
                {act.type === "payment" && <CreditCard className="w-4 h-4 text-emerald-600" />}
                {act.type === "system" && <Shield className="w-4 h-4 text-purple-600" />}
              </div>

              <div className="flex-1 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="font-bold text-slate-900">{act.action}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{act.timestamp}</span>
                </div>
                <p className="text-slate-600 mt-1">{act.details}</p>
                <div className="mt-2 text-[10px] text-slate-400 font-medium">
                  Logged by: <span className="text-slate-700 font-semibold">{act.actor}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
