import React, { useState, useRef } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  // Controlled accordion state: only one open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Ref to prevent double-firing of touch and click events on mobile devices
  const lastClickRef = useRef<{ index: number; time: number }>({ index: -1, time: 0 });

  const faqs: FaqItem[] = [
    {
      question: 'Will this scorecard encourage me to quit my day job?',
      answer:
        'Never. The fundamental premise of the Beyond Salary Movement is that your salary is your stable bedrock. We believe nobody should ever quit a job out of panic, frustration, or unproven theories. This diagnostic helps you identify where your financial safety gap is and how to package a practical, high-value skill into a predictable second stream alongside your employment.',
    },
    {
      question: 'How long does the assessment actually take?',
      answer:
        'Approximately 4 to 5 minutes. You will answer 20 straightforward multiple-choice questions reflecting your real-world financial runway, responsibilities, marketable abilities, and current routines. No complicated math or preparation required.',
    },
    {
      question: 'Is my score and information confidential?',
      answer:
        '100% confidential. Your answers are strictly private and are never shared with your employer, recruiters, or public directories. Your responses are used solely to compute your 4 category percentages and generate your personalized bottleneck report.',
    },
    {
      question: 'What if I do not think I have a "business" or technical skill?',
      answer:
        'That is the single most common misconception professionals have. You do not need to code, trade, or build complex software. Skills like organizing chaotic processes, writing clear communication, financial analysis, project coordination, teaching, or Canva design are in huge demand by busy entrepreneurs who lack the time to do them. The diagnostic shows you how to bridge that exact gap.',
    },
    {
      question: 'Is there any hidden cost or credit card required?',
      answer:
        'No. The Beyond Salary Scorecard™ is completely free. There are no surprise paywalls, credit card inputs, or trials. You immediately unlock your composite score (0–100), your primary bottleneck breakdown, and practical next steps.',
    },
    {
      question: 'What happens immediately after I finish the assessment?',
      answer:
        'You receive an instant, full-screen diagnostic report detailing your overall Beyond Salary Index, your scores across Dependency, Safety, Skill, and Execution, your archetype profile (e.g., The Ready But Stuck, The Income Explorer), and targeted recommendations to begin building options.',
    },
  ];

  // Robust persistent toggle handler
  const handleToggle = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // Guard against rapid duplicate clicks/taps on the same item within 350ms
    const now = Date.now();
    if (lastClickRef.current.index === idx && now - lastClickRef.current.time < 350) {
      return;
    }
    lastClickRef.current = { index: idx, time: now };

    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F4EC] border-b border-[#E1D5C5]" id="faq-section">
      <div className="max-w-[1080px] mx-auto px-5">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFFFFF] px-3.5 py-1.5 rounded-full mb-3 border border-[#E1D5C5] shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B1B14]">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B14] leading-tight">
            EVERYTHING YOU NEED TO KNOW BEFORE TAKING THE SCORECARD
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#5C514B] font-medium max-w-lg mx-auto">
            Honest answers to the most common questions working professionals ask us.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors duration-250 bg-[#FFFFFF] overflow-hidden ${
                  isOpen
                    ? 'border-[#C9A227] shadow-sm'
                    : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
                }`}
              >
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  onClick={(e) => handleToggle(idx, e)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none touch-manipulation focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C9A227] rounded-2xl"
                >
                  <span className="text-sm sm:text-base font-bold text-[#2B1B14] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-out ${
                      isOpen
                        ? 'bg-[#2B1B14] text-[#DFB943] rotate-180'
                        : 'bg-[#F8F4EC] text-[#5C514B]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Persistent CSS Grid Accordion Container */}
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                  style={{
                    willChange: 'grid-template-rows, opacity',
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[#E1D5C5]/60 text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
                      <p className="mt-3">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy & Dignity Guarantee Notice */}
        <div className="max-w-2xl mx-auto mt-10 p-4 sm:p-5 rounded-2xl bg-[#EFE6D6] border border-[#E1D5C5] flex items-center gap-3.5 text-[#211A17]">
          <ShieldCheck className="w-6 h-6 text-[#2E6F40] shrink-0" />
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            <strong className="text-[#2B1B14]">Strict Professional Privacy:</strong> We never contact your workplace or sell your information. Your assessment data is strictly used to deliver your custom diagnosis.
          </p>
        </div>
      </div>
    </section>
  );
};
