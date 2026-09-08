import React from 'react';
import { ArrowRight, ArrowLeft, Clock, HelpCircle, CheckCircle, Sparkles } from 'lucide-react';

interface WelcomeViewProps {
  onStart: () => void;
  onBackToHome: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart, onBackToHome }) => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-5 py-12 bg-[#F8F4EC]">
      <div className="w-full max-w-[540px] text-center bg-[#FFFFFF] border border-[#E1D5C5] rounded-3xl p-8 sm:p-12 shadow-sm text-[#211A17]">
        <div className="inline-flex items-center gap-2 bg-[#EFE6D6] border border-[#E1D5C5] px-4 py-1.5 rounded-full text-xs font-bold text-[#2B1B14] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>The Beyond Salary Scorecard™</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1B14] leading-snug">
          Let's discover your Beyond Salary Score
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#211A17] leading-relaxed">
          This assessment will help you understand how dependent you currently are on one income source, and identify the biggest gap standing between you and building additional income options.
        </p>

        <p className="mt-3 text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
          There are no right or wrong answers. Answer honestly — your result will be calculated specifically from your current situation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 py-4 border-y border-[#E1D5C5] text-xs sm:text-sm text-[#211A17]">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#C9A227]" />
            <span><strong className="text-[#2B1B14]">20</strong> quick questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C9A227]" />
            <span><strong className="text-[#2B1B14]">~5</strong> minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#C9A227]" />
            <span><strong className="text-[#2B1B14]">100%</strong> free</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onStart}
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#DFB943] via-[#C9A227] to-[#B88E18] hover:from-[#E8C654] hover:to-[#C9A227] text-[#2B1B14] font-bold text-base px-8 py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(201,162,39,0.38),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-200 active:scale-95 w-full cursor-pointer"
          >
            <span className="tracking-wide">Start My Assessment</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onBackToHome}
            className="flex items-center justify-center gap-1.5 text-xs text-[#5C514B] hover:text-[#2B1B14] py-2 font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to overview</span>
          </button>
        </div>
      </div>
    </div>
  );
};
