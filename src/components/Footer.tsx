import React from 'react';
import beyondSalaryLogo from '../assets/beyond-salary-logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B1B14] text-[#F3EDE3] py-12 md:py-16 border-t border-[#4A3026]">
      <div className="max-w-[1080px] mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-[#4A3026]">
          <div className="max-w-md">
            <div className="mb-4">
              <img 
                src={beyondSalaryLogo} 
                alt="Beyond Salary Movement" 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-sm text-[#EFE6D6] leading-relaxed">
              Helping African professionals build practical skills, systems, and resilient income options beyond one salary.
            </p>
          </div>

          <div className="md:text-right">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-2">The Philosophy</div>
            <p className="text-lg md:text-xl font-bold text-[#F8F4EC] leading-snug">
              "Your salary can be your foundation. It doesn't have to be your ceiling."
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFE6D6]">
          <div>© 2026 Beyond Salary Movement. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Free 5-minute diagnostic</span>
            <span>•</span>
            <span>Strict privacy & security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
