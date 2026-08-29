"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileText,
  User,
  Calendar,
  MapPin,
  Download,
  AlertTriangle,
  FileCheck,
  Printer
} from "lucide-react";
import { Customer, PassportOrder } from "../lib/types";

interface ReviewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  order: PassportOrder;
  onApprove: () => void;
}

export default function ReviewApplicationModal({
  isOpen,
  onClose,
  customer,
  order,
  onApprove
}: ReviewApplicationModalProps) {
  const [approved, setApproved] = useState(false);
  const [notes, setNotes] = useState("All parental signatures and consular records validated. Ready for courier hand-carry to DOS agency.");

  if (!isOpen) return null;

  const handleApprove = () => {
    setApproved(true);
    onApprove();
    setTimeout(() => {
      onClose();
      setApproved(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00897B] text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Department of State Application Pre-Check
              </h3>
              <p className="text-xs text-slate-500">
                Order #{order.orderNumber} · {order.passportType}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* Status Banner */}
          <div className="bg-teal-50 border border-teal-200/80 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00897B] animate-ping" />
              <span className="font-semibold text-teal-900">
                Applicant: {order.applicantName} ({order.applicantType})
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white text-teal-800 font-bold text-[10px] border border-teal-200">
              Expedited 3-Day Relay
            </span>
          </div>

          {/* Form DS-11 Verification Summary Grid */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Full Name</span>
              <p className="font-semibold text-slate-800 text-xs mt-0.5">{order.applicantName}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Date of Birth</span>
              <p className="font-semibold text-slate-800 text-xs mt-0.5">{order.applicantDob}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Primary Parent / Sponsor</span>
              <p className="font-semibold text-slate-800 text-xs mt-0.5">{customer.name}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Target Travel Date</span>
              <p className="font-semibold text-teal-700 text-xs mt-0.5">{order.travelDate}</p>
            </div>
            <div className="col-span-2 pt-2 border-t border-slate-200/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Delivery Address</span>
              <p className="font-medium text-slate-700 text-xs mt-0.5">
                {order.shippingAddress.street}, {order.shippingAddress.cityStateZip}
              </p>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-800">Compliance & Requirements Verification</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 p-2 bg-emerald-50/60 border border-emerald-100 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium text-emerald-900">Government Fee Payment Verified ($135.00 Auth #GOV-99214)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-emerald-50/60 border border-emerald-100 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium text-emerald-900">Proof of US Citizenship (FS-240 Consular Record Uploaded)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-amber-50/70 border border-amber-200/60 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="font-medium text-amber-900">Passport Photo: In-studio photo upload scheduled for 9:00 AM</span>
              </div>
            </div>
          </div>

          {/* Reviewer Note Input */}
          <div className="space-y-1.5">
            <label className="font-bold text-xs text-slate-800">Reviewer Notes & Authorization</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-white flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Packet</span>
            </button>

            <button
              onClick={handleApprove}
              disabled={approved}
              className="px-5 py-2 rounded-lg bg-[#00897B] hover:bg-[#00796B] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{approved ? "✓ Application Approved!" : "Approve & Certify Packet"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
