"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
  Tag,
  Home,
  Check,
  Eye,
  Download,
  Mail,
  Phone,
  Smartphone,
  Building,
  MapPin
} from "lucide-react";
import { Customer, PassportOrder, RequirementItem } from "../lib/types";
import {
  SentryIcon,
  ClarityIcon,
  InstagramIcon,
  XTwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  StylizedMapGraphic
} from "./Icons";
import ActiveCallBanner from "./ActiveCallBanner";

interface MobilePortalViewProps {
  customer: Customer;
  order: PassportOrder;
  onOpenReviewModal: () => void;
  onOpenDocumentModal: (req: RequirementItem) => void;
  onOpenEditAddressModal: () => void;
  onDownloadPacket: () => void;
  onToggleRequirement: (reqId: string) => void;
}

export default function MobilePortalView({
  customer,
  order,
  onOpenReviewModal,
  onOpenDocumentModal,
  onOpenEditAddressModal,
  onDownloadPacket,
  onToggleRequirement
}: MobilePortalViewProps) {
  const [activeMobileTab, setActiveMobileTab] = useState<"orders" | "activity" | "communications">("orders");
  const [statusAccordionOpen, setStatusAccordionOpen] = useState(false);
  const [reviewAccordionOpen, setReviewAccordionOpen] = useState(false);
  const [progressAccordionOpen, setProgressAccordionOpen] = useState(false);

  // Dynamic requirements calculation
  const completedCount = order.requirements.filter((r) => r.completed).length;
  const totalCount = order.requirements.length;
  const dynamicReqProgress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="w-full max-w-[380px] sm:max-w-[400px] mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col font-sans select-none">
      
      {/* Mobile Top App Header */}
      <div className="p-4 pb-2 flex items-center justify-between border-b border-slate-50">
        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#008378] hover:text-teal-800 transition">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to orders</span>
        </button>

        {/* Social Icons at top right */}
        <div className="flex items-center gap-2 text-teal-600">
          <InstagramIcon className="w-3.5 h-3.5" />
          <XTwitterIcon className="w-3.5 h-3.5" />
          <FacebookIcon className="w-3.5 h-3.5" />
          <LinkedinIcon className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Mobile Scrollable Body */}
      <div className="p-4 space-y-4 max-h-[820px] overflow-y-auto scrollbar-none text-[12px]">
        
        {/* Customer Profile Section */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <img
                src={customer.avatarUrl}
                alt={customer.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
              />
              {customer.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            <div>
              <h2 className="font-bold text-[16px] text-slate-900 leading-tight">
                {customer.name}
              </h2>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500 flex-wrap">
                <span>Last seen {customer.lastSeen}</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[10px]">
                  <SentryIcon className="w-2.5 h-2.5" />
                  <span>Sentry</span>
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[10px]">
                  <ClarityIcon className="w-2.5 h-2.5" />
                  <span>Clarity</span>
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details List */}
          <div className="space-y-1 text-[11px] text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span className="truncate">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span>{customer.phone1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span>{customer.phone2}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span className="truncate">{customer.company}</span>
            </div>
          </div>

          {/* Map Preview Widget */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-100">
            <StylizedMapGraphic className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 text-[9px] font-medium text-slate-600 bg-white/90 px-1.5 py-0.5 rounded shadow-2xs backdrop-blur-xs">
              Last IP: {customer.lastIp}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-md">
                <MapPin className="w-3 h-3" />
              </div>
              <div className="mt-0.5 bg-slate-900 text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow">
                {customer.timezone}
              </div>
            </div>
          </div>
        </div>

        {/* Green/Teal Active Call Banner from Screenshot */}
        <ActiveCallBanner agentName="Philip" />

        {/* Mobile Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-100 pb-1">
          <button
            onClick={() => setActiveMobileTab("orders")}
            className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg transition ${
              activeMobileTab === "orders"
                ? "bg-[#D7F3ED] text-[#008378]"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveMobileTab("activity")}
            className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg transition ${
              activeMobileTab === "activity"
                ? "bg-[#D7F3ED] text-[#008378]"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveMobileTab("communications")}
            className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg transition ${
              activeMobileTab === "communications"
                ? "bg-[#D7F3ED] text-[#008378]"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            Communications
          </button>
        </div>

        {/* Mobile Accordions from Screenshot */}
        <div className="space-y-2">
          
          {/* Accordion 1: Application status */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setStatusAccordionOpen(!statusAccordionOpen)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50"
            >
              <span>Application status</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-teal-600 transition-transform ${
                  statusAccordionOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {statusAccordionOpen && (
              <div className="px-3.5 pb-3 pt-1 border-t border-slate-100 text-xs space-y-2">
                <span className="inline-block bg-[#E0F7F2] text-[#00897B] font-semibold text-xs px-3 py-0.5 rounded-full">
                  {order.status}
                </span>
                <p className="text-slate-600 text-[11px]">
                  Expected delivery: {order.expectedDelivery}
                </p>
              </div>
            )}
          </div>

          {/* Accordion 2: Review Sydney's application */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setReviewAccordionOpen(!reviewAccordionOpen)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50"
            >
              <span>Review Sydney&apos;s application</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-teal-600 transition-transform ${
                  reviewAccordionOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {reviewAccordionOpen && (
              <div className="px-3.5 pb-3 pt-1 border-t border-slate-100 space-y-2">
                <button
                  onClick={onOpenReviewModal}
                  className="w-full py-1.5 rounded-lg bg-[#00897B] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Review application</span>
                </button>
                <button
                  onClick={onDownloadPacket}
                  className="w-full py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download application packet</span>
                </button>
              </div>
            )}
          </div>

          {/* Accordion 3: Application progress */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setProgressAccordionOpen(!progressAccordionOpen)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50"
            >
              <span>Application progress</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-teal-600 transition-transform ${
                  progressAccordionOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {progressAccordionOpen && (
              <div className="px-3.5 pb-3 pt-1 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2 text-teal-700 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-teal-600" />
                  <span>Assign to courier</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border border-slate-300" />
                  <span>Print shipping label and LOA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border border-slate-300" />
                  <span>Submit to DOS</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Order Details & Checklist in Mobile View */}
        <div className="space-y-3 pt-1">
          
          {/* Breadcrumb */}
          <div className="text-[11px] text-slate-600">
            <span className="text-[#008378] font-medium">Sydney&apos;s orders</span> &gt;{" "}
            <span className="text-[#008378] font-medium">Order #{order.orderNumber}</span>
          </div>

          {/* Applicant Info Header */}
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                {order.applicantInitials}
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">
                  {order.applicantName}
                </h4>
                <p className="text-[10px] text-slate-500">
                  DOB: {order.applicantDob} · {order.applicantType}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-slate-400 uppercase">Travel date</div>
              <div className="text-xs font-bold text-slate-800">{order.travelDate}</div>
            </div>
          </div>

          {/* New passport application */}
          <div className="border border-slate-100 rounded-xl p-3 bg-white space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-bold text-xs text-slate-900">New passport application</span>
              </div>
              <button
                onClick={onOpenReviewModal}
                className="px-2.5 py-0.5 rounded border border-slate-300 text-xs font-semibold hover:bg-slate-50 text-slate-700"
              >
                View
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00897B] rounded-full"
                  style={{ width: `${order.applicationProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-slate-600">
                {order.applicationProgress}%
              </span>
            </div>
          </div>

          {/* New passport requirements */}
          <div className="border border-slate-100 rounded-xl p-3 bg-white space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-bold text-xs text-slate-900">New passport requirements</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00897B] rounded-full"
                  style={{ width: `${dynamicReqProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-slate-600">
                {dynamicReqProgress}%
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-1 pt-1">
              {order.requirements.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between py-1 border-b border-slate-50 text-[11px]"
                >
                  <div
                    onClick={() => onToggleRequirement(req.id)}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    {req.completed ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Check className="w-2 h-2 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                    )}
                    <span className={req.completed ? "text-slate-800 font-medium" : "text-slate-500"}>
                      {req.title}
                    </span>
                  </div>
                  {req.viewable && (
                    <button
                      onClick={() => onOpenDocumentModal(req)}
                      className="px-2 py-0.5 rounded border border-slate-200 text-[10px] font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
