import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';

interface StickyScorecardBarProps {
  onStart: () => void;
}

export const StickyScorecardBar: React.FC<StickyScorecardBarProps> = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      // Show when scrolled past 600px
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:right-6 sm:max-w-md z-40 animate-fade-in">
      <div className="bg-[#2B1B14]/95 backdrop-blur-md border border-[#C9A227]/50 rounded-2xl p-3 sm:p-3.5 text-[#F8F4EC] shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#DFB943]/20 border border-[#DFB943]/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#DFB943]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#F8F4EC] truncate">
              Beyond Salary Scorecard™
            </p>
            <p className="text-[11px] text-[#DFB943] truncate font-medium">
              Free 5-Min Diagnostic • Instant Result
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#DFB943] to-[#C9A227] hover:brightness-105 text-[#2B1B14] font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            <span>Take Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss banner"
            className="p-1.5 text-[#EFE6D6]/60 hover:text-[#F8F4EC] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
