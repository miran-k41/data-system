"use client";

import React, { useState } from "react";
import {
  FileText,
  Layers,
  Tag,
  Home,
  Check,
  Circle,
  Eye,
  Download,
  ChevronDown,
  Sparkles,
  Calendar,
  Truck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { PassportOrder, RequirementItem } from "../lib/types";
import { COURIER_OPTIONS, SERVICE_TYPES, SHIP_DATES } from "../lib/mockData";

interface OrderDetailViewProps {
  order: PassportOrder;
  onOpenReviewModal: () => void;
  onOpenDocumentModal: (req: RequirementItem) => void;
  onOpenEditAddressModal: () => void;
  onDownloadPacket: () => void;
  onToggleRequirement: (reqId: string) => void;
  onAssignCourier: (details: { shipDate: string; serviceType: string; courier: string }) => void;
}

export default function OrderDetailView({
  order,
  onOpenReviewModal,
  onOpenDocumentModal,
  onOpenEditAddressModal,
  onDownloadPacket,
  onToggleRequirement,
  onAssignCourier
}: OrderDetailViewProps) {
  // Courier selection state
  const [selectedShipDate, setSelectedShipDate] = useState("Tomorrow (Aug 29, 2026)");
  const [selectedServiceType, setSelectedServiceType] = useState("Expedited 3-Day DOS Hand Carry");
  const [selectedCourier, setSelectedCourier] = useState("FedEx Express (Morning Priority)");
  const [assignedSuccess, setAssignedSuccess] = useState(false);

  // Stepper active step state
  const [activeProgressStep, setActiveProgressStep] = useState(order.progressStep || 1);

  const handleAssignClick = () => {
    onAssignCourier({
      shipDate: selectedShipDate,
      serviceType: selectedServiceType,
      courier: selectedCourier
    });
    setAssignedSuccess(true);
    setTimeout(() => {
      setAssignedSuccess(false);
      setActiveProgressStep(2); // Advance to print shipping label and LOA
    }, 1200);
  };

  const progressSteps = [
    { id: 1, label: "Assign to courier" },
    { id: 2, label: "Print shipping label and LOA" },
    { id: 3, label: "Submit to DOS" },
    { id: 4, label: "Generate outbound label" },
    { id: 5, label: "Confirmation call" }
  ];

  // Calculate dynamic requirements percentage based on checked items
  const completedCount = order.requirements.filter((r) => r.completed).length;
  const totalCount = order.requirements.length;
  const dynamicReqProgress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      
      {/* ========================================================= */}
      {/* LEFT COLUMN: Order Details & Requirements (~65% / 7.5 cols) */}
      {/* ========================================================= */}
      <div className="lg:col-span-7 xl:col-span-8 space-y-4">
        
        {/* Breadcrumb Navigation matching screenshot */}
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-700 flex-wrap">
          <span className="text-[#008378] hover:underline cursor-pointer">
            Sydney&apos;s orders
          </span>
          <span className="text-slate-400">&gt;</span>
          <span className="text-[#008378] hover:underline cursor-pointer">
            Order #{order.orderNumber}
          </span>
          <span className="text-slate-400">&gt;</span>
          <span className="font-semibold text-slate-800">
            {order.passportType}
          </span>
        </div>

        {/* Applicant Header Card */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200/70">
              {order.applicantInitials}
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-slate-900 leading-tight">
                {order.applicantName}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                DOB: {order.applicantDob} · {order.applicantType}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-medium tracking-wide">
              Travel date
            </div>
            <div className="text-[13px] font-bold text-slate-900 mt-0.5">
              {order.travelDate}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Step 1: New passport application Card */}
        {/* ---------------------------------------------------- */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[13px] text-slate-900">
                New passport application
              </h4>
            </div>

            <button
              onClick={onOpenReviewModal}
              className="px-3.5 py-1 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shadow-2xs cursor-pointer"
            >
              View
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00897B] rounded-full transition-all duration-500"
                style={{ width: `${order.applicationProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 w-8 text-right">
              {order.applicationProgress}%
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Step 2: New passport requirements Card */}
        {/* ---------------------------------------------------- */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[13px] text-slate-900">
                New passport requirements
              </h4>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00897B] rounded-full transition-all duration-500"
                style={{ width: `${dynamicReqProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 w-8 text-right">
              {dynamicReqProgress}%
            </span>
          </div>

          {/* Checklist Items Rows from Screenshot */}
          <div className="space-y-1.5 pt-2">
            {order.requirements.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg border border-slate-100 bg-white hover:bg-slate-50/70 transition"
              >
                <div
                  onClick={() => onToggleRequirement(req.id)}
                  className="flex items-center gap-2.5 cursor-pointer flex-1"
                >
                  {req.completed ? (
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                  )}
                  <span
                    className={`text-[12px] font-medium ${
                      req.completed ? "text-slate-800" : "text-slate-600"
                    }`}
                  >
                    {req.title}
                  </span>
                </div>

                {req.viewable && (
                  <button
                    onClick={() => onOpenDocumentModal(req)}
                    className="px-3 py-0.5 rounded-md border border-slate-300 text-slate-700 text-[11px] font-semibold hover:bg-white hover:border-slate-400 transition shadow-2xs cursor-pointer ml-2"
                  >
                    View
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Step 3: Shipping label Card */}
        {/* ---------------------------------------------------- */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600">
                <Tag className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[13px] text-slate-900">
                Shipping label
              </h4>
            </div>

            <button
              onClick={() => {
                const labelReq = {
                  id: "req-label",
                  title: "FedEx Priority Inbound Label",
                  completed: true,
                  viewable: true,
                  documentType: "receipt" as const
                };
                onOpenDocumentModal(labelReq);
              }}
              className="px-3.5 py-1 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shadow-2xs cursor-pointer"
            >
              View
            </button>
          </div>

          {/* Progress Bar 100% */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00897B] rounded-full transition-all duration-500"
                style={{ width: `${order.shippingLabelProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 w-8 text-right">
              {order.shippingLabelProgress}%
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Step 4: Shipping address Card */}
        {/* ---------------------------------------------------- */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600">
                <Home className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[13px] text-slate-900">
                Shipping address
              </h4>
            </div>

            <button
              onClick={onOpenEditAddressModal}
              className="px-3.5 py-1 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shadow-2xs cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Address Content */}
          <div className="text-[12px] text-slate-600 space-y-0.5 pt-1 pl-1 font-medium">
            <p className="font-semibold text-slate-900">{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.cityStateZip}</p>
            <p>{order.shippingAddress.phone}</p>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* RIGHT COLUMN: Actions, Status & Progress Stepper (~35% / 4.5 cols) */}
      {/* ========================================================= */}
      <div className="lg:col-span-5 xl:col-span-4 space-y-4">
        
        {/* ---------------------------------------------------- */}
        {/* Card 1: Application status */}
        {/* ---------------------------------------------------- */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-2xs space-y-3">
          <h4 className="font-bold text-[13px] text-slate-900">
            Application status
          </h4>

          <div>
            <span className="inline-block bg-[#E0F7F2] text-[#00897B] font-semibold text-xs px-3.5 py-1 rounded-full border border-teal-100/60 shadow-2xs">
              {order.status}
            </span>
          </div>

          <div className="text-[11px] text-slate-600 font-medium">
            Expected delivery: <span className="font-semibold text-slate-800">{order.expectedDelivery}</span>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Card 2: Review Sydney's application */}
        {/* ---------------------------------------------------- */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-2xs space-y-3">
          <h4 className="font-bold text-[13px] text-slate-900">
            Review Sydney&apos;s application
          </h4>

          <div className="space-y-2 pt-1">
            {/* Primary Solid Teal Button */}
            <button
              onClick={onOpenReviewModal}
              className="w-full py-2 px-3 rounded-lg bg-[#00897B] hover:bg-[#00796B] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Review application</span>
            </button>

            {/* Secondary Outlined Button */}
            <button
              onClick={onDownloadPacket}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download application packet</span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Card 3: Application progress Stepper & Courier Form */}
        {/* ---------------------------------------------------- */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-2xs space-y-4">
          <h4 className="font-bold text-[13px] text-slate-900">
            Application progress
          </h4>

          <div className="space-y-3.5 text-[12px]">
            
            {/* Step 1: Assign to courier (Active in screenshot) */}
            <div className="space-y-2.5">
              <div
                onClick={() => setActiveProgressStep(1)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                {activeProgressStep > 1 ? (
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full bg-[#00897B] flex items-center justify-center flex-shrink-0 ring-2 ring-teal-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                )}
                <span className="font-semibold text-slate-900 group-hover:text-teal-800 transition">
                  Assign to courier
                </span>
              </div>

              {/* Nested Interactive Dropdowns Form */}
              {activeProgressStep === 1 && (
                <div className="pl-5 space-y-2 pt-1">
                  
                  {/* Select 1: Ship in date */}
                  <div className="relative">
                    <select
                      value={selectedShipDate}
                      onChange={(e) => setSelectedShipDate(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium pr-8 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                    >
                      {SHIP_DATES.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Select 2: Service type */}
                  <div className="relative">
                    <select
                      value={selectedServiceType}
                      onChange={(e) => setSelectedServiceType(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium pr-8 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                    >
                      {SERVICE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Select 3: Available couriers */}
                  <div className="relative">
                    <select
                      value={selectedCourier}
                      onChange={(e) => setSelectedCourier(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium pr-8 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                    >
                      {COURIER_OPTIONS.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({c.price})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleAssignClick}
                    disabled={assignedSuccess}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition ${
                      assignedSuccess
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {assignedSuccess ? "✓ Courier Assigned!" : "Assign to courier"}
                  </button>

                </div>
              )}
            </div>

            {/* Inactive Subsequent Steps */}
            {progressSteps.slice(1).map((step) => {
              const isPassed = activeProgressStep > step.id;
              const isCurrent = activeProgressStep === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveProgressStep(step.id)}
                  className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 transition group"
                >
                  {isPassed ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-[#00897B] flex items-center justify-center flex-shrink-0 ring-2 ring-teal-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0 group-hover:border-slate-400" />
                  )}
                  <span className={`${isCurrent ? "font-semibold text-slate-900" : "text-slate-600"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

      </div>

    </div>
  );
}
