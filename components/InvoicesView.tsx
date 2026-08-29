"use client";

import React from "react";
import { InvoiceItem } from "../lib/types";
import { Receipt, CheckCircle, Download, Printer } from "lucide-react";

interface InvoicesViewProps {
  invoices: InvoiceItem[];
}

export default function InvoicesView({ invoices }: InvoicesViewProps) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-sm text-slate-900">Billing & Government Invoices</h3>
          <p className="text-xs text-slate-500">Itemized fee receipts for Sydney Lockhead</p>
        </div>
      </div>

      <div className="space-y-4">
        {invoices.map((inv) => (
          <div key={inv.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-teal-700" />
                <span className="font-bold text-xs text-slate-900">{inv.invoiceNumber}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {inv.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400">Date: {inv.date}</span>
                <span className="font-bold text-slate-900 text-sm">${inv.amount.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-2 space-y-1 text-xs text-slate-600">
              {inv.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-0.5">
                  <span>{item.description}</span>
                  <span className="font-mono font-medium">${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/60">
              <button
                onClick={() => window.print()}
                className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1"
              >
                <Printer className="w-3 h-3" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
