"use client";

import React, { useState } from "react";
import { CommunicationMessage } from "../lib/types";
import { Send, PhoneCall, Mail, MessageSquare, Mic, Paperclip } from "lucide-react";

interface CommunicationsViewProps {
  messages: CommunicationMessage[];
  onSendMessage: (text: string) => void;
}

export default function CommunicationsView({ messages, onSendMessage }: CommunicationsViewProps) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-sm text-slate-900">Customer Communications</h3>
          <p className="text-xs text-slate-500">Live SMS, Email & Call Recordings with Sydney Lockhead</p>
        </div>
      </div>

      {/* Message List */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {messages.map((msg) => {
          const isAgent = msg.sender === "agent";
          const isSystem = msg.sender === "system";
          const isCustomer = msg.sender === "customer";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                isCustomer ? "items-start" : "items-end"
              } text-xs`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-800">{msg.senderName}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {msg.channel === "call" && (
                  <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded text-[10px] font-bold">
                    Call
                  </span>
                )}
                {msg.channel === "sms" && (
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded text-[10px] font-bold">
                    SMS
                  </span>
                )}
              </div>

              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  isCustomer
                    ? "bg-slate-100 text-slate-800 rounded-tl-xs"
                    : msg.channel === "call"
                    ? "bg-[#00897B] text-white rounded-tr-xs shadow-xs"
                    : "bg-teal-700 text-white rounded-tr-xs shadow-xs"
                }`}
              >
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply box */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type an SMS or email update to Sydney..."
          className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-[#00897B] hover:bg-[#00796B] text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-xs"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}
