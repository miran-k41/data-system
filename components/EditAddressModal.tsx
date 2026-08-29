"use client";

import React, { useState } from "react";
import { X, Home, Check } from "lucide-react";

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: {
    name: string;
    street: string;
    cityStateZip: string;
    phone: string;
  };
  onSaveAddress: (newAddress: {
    name: string;
    street: string;
    cityStateZip: string;
    phone: string;
  }) => void;
}

export default function EditAddressModal({
  isOpen,
  onClose,
  currentAddress,
  onSaveAddress
}: EditAddressModalProps) {
  const [name, setName] = useState(currentAddress.name);
  const [street, setStreet] = useState(currentAddress.street);
  const [cityStateZip, setCityStateZip] = useState(currentAddress.cityStateZip);
  const [phone, setPhone] = useState(currentAddress.phone);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAddress({ name, street, cityStateZip, phone });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Edit Shipping Address</h3>
              <p className="text-[11px] text-slate-500">Destination for passport delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs text-slate-700">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Recipient Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Street Address</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">City, State | Zip Code</label>
            <input
              type="text"
              value={cityStateZip}
              onChange={(e) => setCityStateZip(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Contact Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
              required
            />
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saved}
              className="px-5 py-2 rounded-lg bg-[#00897B] hover:bg-[#00796B] text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-xs"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Address</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
