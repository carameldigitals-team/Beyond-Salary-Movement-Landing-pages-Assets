import React, { useEffect, useState } from 'react';
import { CALCULATING_MESSAGES } from '../data/scorecardData';
import { Sparkles } from 'lucide-react';

interface CalculatingViewProps {
  onComplete: () => void;
}

export const CalculatingView: React.FC<CalculatingViewProps> = ({ onComplete }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((prev) => {
          if (prev < CALCULATING_MESSAGES.length - 1) {
            setFade(true);
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              onComplete();
            }, 600);
            return prev;
          }
        });
      }, 200);
    }, 750);

    return () => clearInterval(interval);
  }, [onComplete]);

  const progressPercent = Math.min(100, Math.round(((msgIndex + 1) / CALCULATING_MESSAGES.length) * 100));

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-5 py-12 bg-[#F8F4EC]">
      <div className="w-full max-w-[460px] text-center bg-[#FFFFFF] border border-[#E1D5C5] rounded-3xl p-8 sm:p-12 shadow-sm text-[#211A17]">
        {/* Animated Custom Ring Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-[#E1D5C5]" />
          <div className="absolute inset-0 rounded-full border-4 border-[#2B1B14] border-t-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-[#C9A227] border-b-transparent animate-spin-slow opacity-90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#C9A227]" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#2B1B14] mb-2">
          Calculating your Beyond Salary Score...
        </h2>

        <div className="h-10 flex items-center justify-center px-2">
          <p
            className={`text-sm sm:text-base font-bold text-[#C9A227] transition-opacity duration-200 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {CALCULATING_MESSAGES[msgIndex]}
          </p>
        </div>

        <div className="mt-6 w-full bg-[#E1D5C5] h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2B1B14] to-[#C9A227] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mt-3 text-xs text-[#5C514B] uppercase tracking-wider font-bold">
          Step {msgIndex + 1} of {CALCULATING_MESSAGES.length}
        </div>
      </div>
    </div>
  );
};
