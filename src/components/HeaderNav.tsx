import React from 'react';
import { ArrowRight } from 'lucide-react';
import beyondSalaryLogo from '../assets/beyond-salary-logo.png';

interface HeaderNavProps {
  onStartScorecard: () => void;
  showCta?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onStartScorecard, showCta = true }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#F8F4EC]/95 backdrop-blur-md border-b border-[#E1D5C5]">
      <div className="max-w-[1080px] mx-auto px-5 py-3 md:py-3.5 flex items-center justify-between">
        <div 
          onClick={onStartScorecard}
          className="cursor-pointer flex items-center select-none"
        >
          <img 
            src={beyondSalaryLogo} 
            alt="Beyond Salary Movement" 
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {showCta && (
          <button 
            onClick={onStartScorecard}
            className="group flex items-center gap-2 bg-[#C9A227] hover:bg-[#D4AF37] text-[#2B1B14] font-bold text-xs md:text-sm px-4 md:px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
          >
            <span>Take the Scorecard</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </header>
  );
};
