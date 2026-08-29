import React from "react";

export function HelloGovLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-[#00897B] flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="#00796B" fillOpacity="0.3" />
        <circle cx="12" cy="11" r="3" />
        <path d="M9 16c1-1 5-1 6 0" />
      </svg>
    </div>
  );
}

export function SentryIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 66" className={className} fill="none">
      <path
        d="M34.78 4.29C35.25 3.24 36.75 3.24 37.22 4.29L70.47 62.33C70.92 63.38 70.08 64.6 68.95 64.6H3.05C1.92 64.6 1.08 63.38 1.53 62.33L34.78 4.29Z"
        fill="#362D59"
      />
      <path
        d="M26.4 20.8L45.6 54.4H19.2L26.4 20.8Z"
        fill="#E1567C"
      />
    </svg>
  );
}

export function ClarityIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect x="4" y="4" width="10" height="10" rx="3" fill="#F25022" />
      <rect x="18" y="4" width="10" height="10" rx="3" fill="#7FBA00" />
      <rect x="4" y="18" width="10" height="10" rx="3" fill="#00A4EF" />
      <rect x="18" y="18" width="10" height="10" rx="3" fill="#FFB900" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function XTwitterIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function FacebookIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function StylizedMapGraphic({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} preserveAspectRatio="none" fill="none">
      {/* Soft map landmass background */}
      <rect width="200" height="120" fill="#E6EEEC" />
      {/* Light water body */}
      <path d="M0,0 Q60,30 90,0 L200,0 L200,40 Q150,60 130,20 Q100,5 60,35 Q30,50 0,25 Z" fill="#D2E8E4" opacity="0.6" />
      {/* Map road lines */}
      <path d="M-10,40 Q80,50 210,35" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20,-10 Q40,60 60,130" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <path d="M140,-10 Q120,70 160,130" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <path d="M-10,95 Q100,80 210,105" stroke="#E2E8F0" strokeWidth="3" />
      <path d="M80,30 L160,90" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 2" />
      {/* Small place names */}
      <text x="30" y="32" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">Oak St</text>
      <text x="145" y="70" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">Luella Ave</text>
      <text x="75" y="112" fill="#94A3B8" fontSize="6.5" fontFamily="sans-serif">South Holland</text>
    </svg>
  );
}
