import React, { useState } from 'react';
import { LeadData } from '../types';
import { ArrowRight, CheckCircle2, Lock, Sparkles } from 'lucide-react';

interface LeadCaptureViewProps {
  onSubmit: (leadData: LeadData) => void;
  initialLead: LeadData;
}

export const LeadCaptureView: React.FC<LeadCaptureViewProps> = ({ onSubmit, initialLead }) => {
  const [firstName, setFirstName] = useState(initialLead.firstName);
  const [email, setEmail] = useState(initialLead.email);
  const [whatsapp, setWhatsapp] = useState(initialLead.whatsapp);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFirstName = firstName.trim();
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanFirstName) {
      setError('Please enter your first name.');
      return;
    }

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    onSubmit({
      firstName: cleanFirstName,
      email: cleanEmail,
      whatsapp: whatsapp.trim()
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-5 py-12 bg-[#F8F4EC]">
      <div className="w-full max-w-[480px] bg-[#FFFFFF] border border-[#E1D5C5] rounded-3xl p-7 sm:p-10 shadow-sm text-center text-[#211A17]">
        <div className="inline-flex items-center gap-2 bg-[#EFE6D6] border border-[#E1D5C5] px-4 py-1.5 rounded-full text-xs font-bold text-[#2B1B14] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>Your result is ready</span>
        </div>

        <h1 className="text-2xl sm:text-[1.7rem] font-bold text-[#2B1B14] leading-snug">
          Your personalised Beyond Salary Score is ready
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
          We've analysed your answers and identified your score, your strongest area, your biggest bottleneck, and your personalised next step.
        </p>

        <div className="my-6 p-4 rounded-2xl bg-[#F8F4EC] border border-[#E1D5C5] text-left">
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#211A17]">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span className="font-bold text-[#2B1B14]">Your Beyond Salary Score (0-100)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span className="font-bold text-[#2B1B14]">Your biggest income bottleneck breakdown</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span className="font-bold text-[#2B1B14]">Your personalised action roadmap</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-xs font-bold text-[#2B1B14] uppercase tracking-wider mb-2">
              First name *
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setError(null); }}
              placeholder="e.g. Tunde or Amara"
              className="w-full px-4 py-3.5 border-2 border-[#E1D5C5] rounded-xl text-sm font-semibold text-[#211A17] bg-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B1B14] uppercase tracking-wider mb-2">
              Email address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              placeholder="you@email.com"
              className="w-full px-4 py-3.5 border-2 border-[#E1D5C5] rounded-xl text-sm font-semibold text-[#211A17] bg-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B1B14] uppercase tracking-wider mb-2">
              WhatsApp number <span className="text-[#5C514B] font-normal lowercase">(optional)</span>
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full px-4 py-3.5 border-2 border-[#E1D5C5] rounded-xl text-sm font-semibold text-[#211A17] bg-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
            />
          </div>

          {error && (
            <div className="text-xs text-[#8B3E1E] font-bold bg-[#8B3E1E]/10 p-3 rounded-xl border border-[#8B3E1E]/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="group mt-2 w-full flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#D4AF37] text-[#2B1B14] font-bold text-sm sm:text-base py-4 px-6 rounded-xl shadow-lg transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Unlock My Results</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex items-start gap-2 text-[11px] text-[#5C514B] mt-2 font-medium">
            <Lock className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
            <span>Your information will only be used to send you your personalised result and relevant Beyond Salary Movement resources. No spam.</span>
          </div>
        </form>
      </div>
    </div>
  );
};
