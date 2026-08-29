"use client";

import React from "react";
import { Mail, Phone, Smartphone, Building, MapPin } from "lucide-react";
import { Customer } from "../lib/types";
import {
  SentryIcon,
  ClarityIcon,
  InstagramIcon,
  XTwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  StylizedMapGraphic
} from "./Icons";

interface CustomerHeaderProps {
  customer: Customer;
  compact?: boolean;
}

export default function CustomerHeader({ customer, compact = false }: CustomerHeaderProps) {
  if (compact) {
    return (
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-3">
        {/* Top line with Avatar and Socials */}
        <div className="flex items-start justify-between">
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
          <div className="flex items-center gap-2 text-teal-600">
            <InstagramIcon className="w-3.5 h-3.5 hover:text-teal-800 cursor-pointer transition" />
            <XTwitterIcon className="w-3.5 h-3.5 hover:text-teal-800 cursor-pointer transition" />
            <FacebookIcon className="w-3.5 h-3.5 hover:text-teal-800 cursor-pointer transition" />
            <LinkedinIcon className="w-3.5 h-3.5 hover:text-teal-800 cursor-pointer transition" />
          </div>
        </div>

        {/* Customer Name and Status */}
        <div>
          <h2 className="font-bold text-base text-slate-900 leading-tight">
            {customer.name}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-500">
            <span>Last seen {customer.lastSeen}</span>
            {customer.sentryConnected && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium">
                <SentryIcon className="w-3 h-3" />
                <span>Sentry</span>
              </span>
            )}
            {customer.clarityConnected && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium">
                <ClarityIcon className="w-3 h-3" />
                <span>Clarity</span>
              </span>
            )}
          </div>
        </div>

        {/* Contact list for compact view */}
        <div className="space-y-1.5 text-[12px] text-slate-700 pt-1 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{customer.phone1}</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{customer.phone2}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{customer.company}</span>
          </div>
        </div>

        {/* Mini Map Widget */}
        <div className="relative rounded-lg overflow-hidden border border-slate-200 h-28 mt-2 bg-slate-100">
          <StylizedMapGraphic className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 text-[10px] font-medium text-slate-600 bg-white/90 px-2 py-0.5 rounded shadow-2xs backdrop-blur-xs">
            Last IP: {customer.lastIp}
          </div>
          {/* Map Pin Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-md">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="mt-1 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
              {customer.timezone}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      
      {/* Left Area: Customer Details */}
      <div className="flex-1 space-y-3">
        
        {/* Top: Avatar, Name, Badges, Socials */}
        <div className="flex items-start justify-between flex-wrap gap-2">
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={customer.avatarUrl}
                alt={customer.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
              />
              {customer.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            <div>
              <h2 className="font-bold text-[17px] text-slate-900 leading-tight">
                {customer.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                <span>Last seen {customer.lastSeen}</span>
                {customer.sentryConnected && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 cursor-pointer transition">
                    <SentryIcon className="w-3 h-3" />
                    <span>Sentry</span>
                  </span>
                )}
                {customer.clarityConnected && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 cursor-pointer transition">
                    <ClarityIcon className="w-3 h-3" />
                    <span>Clarity</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Social Media Links from Screenshot */}
          <div className="flex items-center gap-3 text-teal-600 pt-1">
            <button className="hover:text-teal-800 transition p-1 hover:bg-slate-50 rounded" title="Instagram">
              <InstagramIcon className="w-3.5 h-3.5" />
            </button>
            <button className="hover:text-teal-800 transition p-1 hover:bg-slate-50 rounded" title="X (Twitter)">
              <XTwitterIcon className="w-3.5 h-3.5" />
            </button>
            <button className="hover:text-teal-800 transition p-1 hover:bg-slate-50 rounded" title="Facebook">
              <FacebookIcon className="w-3.5 h-3.5" />
            </button>
            <button className="hover:text-teal-800 transition p-1 hover:bg-slate-50 rounded" title="LinkedIn">
              <LinkedinIcon className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Contact Info Row with Dividers matching screenshot */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-slate-700 pt-1 border-t border-slate-100/80">
          
          <div className="flex items-center gap-1.5 hover:text-teal-700 transition cursor-pointer">
            <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{customer.email}</span>
          </div>

          <span className="text-slate-200 hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5 hover:text-teal-700 transition cursor-pointer">
            <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{customer.phone1}</span>
          </div>

          <span className="text-slate-200 hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5 hover:text-teal-700 transition cursor-pointer">
            <Smartphone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{customer.phone2}</span>
          </div>

          <span className="text-slate-200 hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{customer.company}</span>
          </div>

        </div>

      </div>

      {/* Right Area: Map Preview Widget from Screenshot */}
      <div className="w-full lg:w-[220px] xl:w-[240px] h-[92px] rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 flex-shrink-0 shadow-2xs">
        <StylizedMapGraphic className="w-full h-full object-cover" />
        
        {/* Top Left IP */}
        <div className="absolute top-1.5 left-2 text-[9px] font-medium text-slate-600 bg-white/95 px-1.5 py-0.5 rounded shadow-2xs backdrop-blur-xs">
          Last IP: {customer.lastIp}
        </div>

        {/* Center Marker Pin + Time Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-1">
          <div className="w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-md">
            <MapPin className="w-3 h-3" />
          </div>
          <div className="mt-0.5 bg-slate-900 text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-tight">
            {customer.timezone}
          </div>
        </div>
      </div>

    </div>
  );
}
