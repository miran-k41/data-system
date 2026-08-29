"use client";

import React, { useState } from "react";
import { PhoneCall, PhoneOff, Mic, Volume2 } from "lucide-react";

interface ActiveCallBannerProps {
  agentName?: string;
  duration?: string;
  className?: string;
}

export default function ActiveCallBanner({
  agentName = "Philip",
  duration = "04:18",
  className = ""
}: ActiveCallBannerProps) {
  const [isOnCall, setIsOnCall] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOnCall) {
    return (
      <div className={`bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs flex items-center justify-between border border-slate-200 ${className}`}>
        <span>Call with {agentName} ended.</span>
        <button
          onClick={() => setIsOnCall(true)}
          className="text-teal-700 font-semibold hover:underline"
        >
          Reconnect
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#00897B] text-white px-4 py-2.5 rounded-xl shadow-xs flex items-center justify-between transition-all ${className}`}
    >
      <div className="flex items-center gap-2.5 text-[12px] font-medium">
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 animate-pulse">
          <PhoneCall className="w-3 h-3 text-white" />
        </div>
        <span>
          <strong className="font-semibold">{agentName}</strong> is actively on a call with this customer.
        </span>
      </div>

      {/* Action controls */}
      <div className="hidden sm:flex items-center gap-2 text-xs">
        <span className="bg-black/20 px-2 py-0.5 rounded text-[11px] font-mono">
          {duration}
        </span>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-1.5 rounded-lg hover:bg-white/20 transition ${
            isMuted ? "bg-red-500/80 text-white" : "text-white/90"
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          <Mic className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setIsOnCall(false)}
          className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          title="End Call"
        >
          <PhoneOff className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
