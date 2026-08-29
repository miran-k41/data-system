"use client";

import React, { useState } from "react";
import { NoteItem } from "../lib/types";
import { Plus, Tag, AlertCircle, Pin } from "lucide-react";

interface NotesViewProps {
  notes: NoteItem[];
  onAddNote: (content: string, tag: string, isUrgent: boolean) => void;
}

export default function NotesView({ notes, onAddNote }: NotesViewProps) {
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("Processing");
  const [isUrgent, setIsUrgent] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    onAddNote(newContent, newTag, isUrgent);
    setNewContent("");
    setIsUrgent(false);
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-sm text-slate-900">Internal Case Notes</h3>
          <p className="text-xs text-slate-500">Confidential team notes & DOS submission instructions</p>
        </div>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleAdd} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2.5">
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Add an internal note about Sydney or Hazel's passport application..."
          rows={2}
          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-3">
            <select
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-medium"
            >
              <option value="Processing">Processing</option>
              <option value="Compliance">Compliance</option>
              <option value="Expedited Travel">Expedited Travel</option>
              <option value="DOS Agency">DOS Agency</option>
            </select>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <span>Mark Urgent</span>
            </label>
          </div>

          <button
            type="submit"
            className="px-4 py-1.5 bg-[#00897B] hover:bg-[#00796B] text-white font-semibold rounded-lg text-xs flex items-center gap-1 shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Note</span>
          </button>
        </div>
      </form>

      {/* Notes List */}
      <div className="space-y-3 pt-1">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-xl border ${
              note.isUrgent
                ? "bg-amber-50/50 border-amber-200 text-amber-950"
                : "bg-white border-slate-100 text-slate-800"
            } shadow-2xs space-y-2`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs">{note.author}</span>
                <span className="text-[11px] text-slate-400">({note.authorRole})</span>
                {note.tag && (
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                    {note.tag}
                  </span>
                )}
                {note.isUrgent && (
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    Urgent
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{note.createdAt}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
