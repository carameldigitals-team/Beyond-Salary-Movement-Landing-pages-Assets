import React, { useEffect } from 'react';
import { Question } from '../types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface AssessmentViewProps {
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  onSelectOption: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  questions,
  currentIndex,
  answers,
  onSelectOption,
  onNext,
  onPrev
}) => {
  const currentQ = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const getSectionNum = (cat: string) => {
    switch (cat) {
      case 'dependency': return 1;
      case 'safety': return 2;
      case 'skill': return 3;
      case 'execution': return 4;
      default: return 1;
    }
  };

  const letters = ['A', 'B', 'C', 'D'];

  // Keyboard shortcut listener for options (1-4 or A-D), Enter to continue
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', 'a', 'A'].includes(e.key)) onSelectOption(1);
      if (['2', 'b', 'B'].includes(e.key)) onSelectOption(2);
      if (['3', 'c', 'C'].includes(e.key)) onSelectOption(3);
      if (['4', 'd', 'D'].includes(e.key)) onSelectOption(4);

      if (e.key === 'Enter' && selectedAnswer !== null) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAnswer, onNext, onSelectOption]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top sticky progress bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E1E7F7] px-5 py-4">
        <div className="max-w-[620px] mx-auto">
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-[#03037E] mb-2.5">
            <span className="font-bold">
              Question {currentIndex + 1} <span className="text-[#8082AC] font-normal">of {questions.length}</span>
            </span>
            <span className="text-[#00A3FF] font-bold tracking-wide">
              {currentQ.catLabel}
            </span>
          </div>

          <div className="h-2 w-full bg-[#E1E7F7] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#03037E] to-[#00A3FF] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="flex-1 flex items-center justify-center px-5 py-8 md:py-14">
        <div className="w-full max-w-[620px] mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] mb-3">
            Section {getSectionNum(currentQ.cat)} · {currentQ.catLabel}
          </div>

          <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-bold text-[#101040] leading-snug mb-8">
            {currentQ.text}
          </h2>

          <div className="flex flex-col gap-3">
            {currentQ.opts.map((optText, optIdx) => {
              const optionNumber = optIdx + 1;
              const isSelected = selectedAnswer === optionNumber;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => onSelectOption(optionNumber)}
                  className={`group w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl border-2 text-left transition-all duration-150 active:scale-[0.99] ${
                    isSelected
                      ? 'border-[#00A3FF] bg-[#F3F8FF] text-[#101040] shadow-sm'
                      : 'border-[#E1E7F7] bg-white hover:border-[#00A3FF]/60 text-[#101040]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#00A3FF] text-white'
                        : 'border-2 border-[#E1E7F7] text-[#4A4C78] group-hover:border-[#00A3FF]'
                    }`}
                  >
                    {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letters[optIdx]}
                  </div>

                  <span className="text-sm sm:text-base font-medium flex-1 leading-snug">
                    {optText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 z-40 bg-white border-t border-[#E1E7F7] px-5 py-4">
        <div className="max-w-[620px] mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#E1E7F7] font-bold text-sm text-[#4A4C78] transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-[#F3F8FF] hover:text-[#03037E]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={selectedAnswer === null}
            className={`flex-1 sm:flex-initial sm:min-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-md ${
              selectedAnswer === null
                ? 'bg-[#8082AC] opacity-50 cursor-not-allowed'
                : 'bg-[#03037E] hover:bg-[#020254] active:scale-95 shadow-[#03037E]/25'
            }`}
          >
            <span>{currentIndex === questions.length - 1 ? 'See My Result' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
