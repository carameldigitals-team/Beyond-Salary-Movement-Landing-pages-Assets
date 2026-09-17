import React, { useState, useEffect } from 'react';
import { LeadData } from '../types';
import { ArrowRight, CheckCircle2, Lock, Sparkles, Phone, Mail, User } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface LeadCaptureViewProps {
  onSubmit: (leadData: LeadData) => void;
  initialLead: LeadData;
}

export const LeadCaptureView: React.FC<LeadCaptureViewProps> = ({ onSubmit, initialLead }) => {
  const [fullName, setFullName] = useState(initialLead.fullName || initialLead.firstName || '');
  const [email, setEmail] = useState(initialLead.email);
  const [whatsapp, setWhatsapp] = useState(initialLead.whatsapp);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('lead_capture_started');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanWhatsApp = whatsapp.trim();

    // 1. Full name validation
    if (!cleanFullName || cleanFullName.length < 2) {
      setError('Please enter your full name (e.g. Tunde Balogun or Amara Okafor).');
      return;
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address so we can send your diagnostic report.');
      return;
    }

    // 3. WhatsApp validation
    // Strip non-digit characters except leading plus
    const digitsOnly = cleanWhatsApp.replace(/[^\d]/g, '');
    if (!cleanWhatsApp || digitsOnly.length < 8) {
      setError('Please enter a valid WhatsApp number (e.g. +234 800 000 0000) for priority delivery.');
      return;
    }

    setError(null);

    // Extract first name
    const firstName = cleanFullName.split(' ')[0] || cleanFullName;

    const leadPayload: LeadData = {
      fullName: cleanFullName,
      firstName,
      email: cleanEmail,
      whatsapp: cleanWhatsApp
    };

    trackEvent('lead_captured', {
      emailDomain: cleanEmail.split('@')[1] || '',
      hasWhatsApp: Boolean(cleanWhatsApp)
    });

    onSubmit(leadPayload);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16 bg-[#F8F4EC]">
      <div className="w-full max-w-[500px] bg-[#FFFFFF] border border-[#E1D5C5] rounded-3xl p-6 sm:p-10 shadow-sm text-center text-[#211A17]">
        {/* Diagnostic Status Badge */}
        <div className="inline-flex items-center gap-2 bg-[#EFE6D6] border border-[#E1D5C5] px-4 py-1.5 rounded-full text-xs font-bold text-[#2B1B14] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>Diagnostic Evaluation Complete</span>
        </div>

        <h1 className="text-2xl sm:text-[1.75rem] font-extrabold text-[#2B1B14] leading-tight">
          Where Should We Send Your Personalized Scorecard & Action Plan?
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
          We have calculated your four income dimensions and identified your primary Beyond Salary Profile and custom next step.
        </p>

        {/* Deliverables Checklist */}
        <div className="my-6 p-4.5 rounded-2xl bg-[#F8F4EC] border border-[#E1D5C5] text-left">
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#211A17]">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span className="font-bold text-[#2B1B14]">Your Primary Beyond Salary Profile</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span className="font-bold text-[#2B1B14]">4-Dimension Diagnostic Snapshot Breakdown</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span className="font-bold text-[#2B1B14]">Your Primary Bottleneck & Recommended Next Step</span>
            </li>
          </ul>
        </div>

        {/* Lead Capture Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left" noValidate>
          <div>
            <label className="block text-xs font-bold text-[#2B1B14] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setError(null); }}
              placeholder="e.g. Tunde Balogun"
              className="w-full px-4 py-3.5 border-2 border-[#E1D5C5] rounded-xl text-sm font-semibold text-[#211A17] bg-[#FFFFFF] focus:outline-hidden focus:border-[#C9A227] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B1B14] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              placeholder="you@example.com"
              className="w-full px-4 py-3.5 border-2 border-[#E1D5C5] rounded-xl text-sm font-semibold text-[#211A17] bg-[#FFFFFF] focus:outline-hidden focus:border-[#C9A227] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B1B14] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>WhatsApp Number *</span>
            </label>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value); setError(null); }}
              placeholder="+234 800 000 0000"
              className="w-full px-4 py-3.5 border-2 border-[#E1D5C5] rounded-xl text-sm font-semibold text-[#211A17] bg-[#FFFFFF] focus:outline-hidden focus:border-[#C9A227] transition-colors"
            />
            <span className="text-[11px] text-[#5C514B] font-medium block mt-1">
              Used strictly for private scorecard delivery and confidential results summary.
            </span>
          </div>

          {error && (
            <div className="text-xs text-[#8B3E1E] font-bold bg-[#8B3E1E]/10 p-3 rounded-xl border border-[#8B3E1E]/20 text-left">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="group mt-2 w-full flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#D4AF37] text-[#2B1B14] font-bold text-sm sm:text-base py-4 px-6 rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Unlock My Complete Diagnostic Result</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex items-start gap-2 text-[11px] text-[#5C514B] mt-2 font-medium text-left">
            <Lock className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
            <span>
              <strong>100% Confidential.</strong> Caramel Digital Academy will never contact your employer, spam your inbox, or sell your personal information.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
