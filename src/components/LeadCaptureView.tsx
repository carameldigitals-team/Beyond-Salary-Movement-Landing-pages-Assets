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
    <div className="min-h-[85vh] flex items-center justify-center px-5 py-12 bg-[radial-gradient(600px_400px_at_50%_0%,rgba(0,163,255,0.08),transparent_70%)]">
      <div className="w-full max-w-[480px] bg-white border border-[#E1E7F7] rounded-3xl p-7 sm:p-10 shadow-sm text-center">
        <div className="inline-flex items-center gap-2 bg-[#F3F8FF] border border-[#E1E7F7] px-4 py-1.5 rounded-full text-xs font-bold text-[#03037E] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#00A3FF]" />
          <span>Your result is ready</span>
        </div>

        <h1 className="text-2xl sm:text-[1.7rem] font-bold text-[#101040] leading-snug">
          Your personalised Beyond Salary Score is ready
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-[#4A4C78] leading-relaxed">
          We've analysed your answers and identified your score, your strongest area, your biggest bottleneck, and your personalised next step.
        </p>

        <div className="my-6 p-4 rounded-2xl bg-[#F3F8FF] border border-[#E1E7F7] text-left">
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#101040]">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0" />
              <span className="font-semibold">Your Beyond Salary Score (0-100)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0" />
              <span className="font-semibold">Your biggest income bottleneck breakdown</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0" />
              <span className="font-semibold">Your personalised 7-day action plan</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-xs font-bold text-[#03037E] uppercase tracking-wider mb-2">
              First name *
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setError(null); }}
              placeholder="e.g. Tunde or Amara"
              className="w-full px-4 py-3.5 border-2 border-[#E1E7F7] rounded-xl text-sm text-[#101040] bg-white focus:outline-none focus:border-[#00A3FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#03037E] uppercase tracking-wider mb-2">
              Email address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              placeholder="you@email.com"
              className="w-full px-4 py-3.5 border-2 border-[#E1E7F7] rounded-xl text-sm text-[#101040] bg-white focus:outline-none focus:border-[#00A3FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#03037E] uppercase tracking-wider mb-2">
              WhatsApp number <span className="text-[#8082AC] font-normal lowercase">(optional)</span>
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full px-4 py-3.5 border-2 border-[#E1E7F7] rounded-xl text-sm text-[#101040] bg-white focus:outline-none focus:border-[#00A3FF]"
            />
          </div>

          {error && (
            <div className="text-xs text-[#E0913A] font-medium bg-[#E0913A]/10 p-3 rounded-xl border border-[#E0913A]/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="group mt-2 w-full flex items-center justify-center gap-2 bg-[#03037E] hover:bg-[#020254] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-xl shadow-lg shadow-[#03037E]/20 transition-all active:scale-[0.99]"
          >
            <span>Unlock My Results</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex items-start gap-2 text-[11px] text-[#8082AC] mt-2">
            <Lock className="w-3.5 h-3.5 text-[#00A3FF] shrink-0 mt-0.5" />
            <span>Your information will only be used to send you your personalised result and relevant Beyond Salary Movement resources. No spam.</span>
          </div>
        </form>
      </div>
    </div>
  );
};
