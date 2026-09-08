import React from 'react';
import { ArrowRight, ArrowLeft, Clock, HelpCircle, CheckCircle, Sparkles } from 'lucide-react';

interface WelcomeViewProps {
  onStart: () => void;
  onBackToHome: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart, onBackToHome }) => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-5 py-12 bg-[radial-gradient(600px_400px_at_50%_0%,rgba(0,163,255,0.08),transparent_70%)]">
      <div className="w-full max-w-[540px] text-center bg-white border border-[#E1E7F7] rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="inline-flex items-center gap-2 bg-[#F3F8FF] border border-[#E1E7F7] px-4 py-1.5 rounded-full text-xs font-bold text-[#03037E] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#00A3FF]" />
          <span>The Beyond Salary Scorecard™</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#101040] leading-snug">
          Let's discover your Beyond Salary Score
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#4A4C78] leading-relaxed">
          This assessment will help you understand how dependent you currently are on one income source, and identify the biggest gap standing between you and building additional income options.
        </p>

        <p className="mt-3 text-xs sm:text-sm text-[#7476A6] leading-relaxed">
          There are no right or wrong answers. Answer honestly — your result will be calculated specifically from your current situation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 py-4 border-y border-[#E1E7F7] text-xs sm:text-sm text-[#4A4C78]">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#00A3FF]" />
            <span><strong className="text-[#03037E]">20</strong> quick questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00A3FF]" />
            <span><strong className="text-[#03037E]">~5</strong> minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00A3FF]" />
            <span><strong className="text-[#03037E]">100%</strong> free</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onStart}
            className="group flex items-center justify-center gap-2 bg-[#03037E] hover:bg-[#020254] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-[#03037E]/25 transition-all duration-200 active:scale-95 w-full"
          >
            <span>Start My Assessment</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onBackToHome}
            className="flex items-center justify-center gap-1.5 text-xs text-[#8082AC] hover:text-[#03037E] py-2 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to overview</span>
          </button>
        </div>
      </div>
    </div>
  );
};
