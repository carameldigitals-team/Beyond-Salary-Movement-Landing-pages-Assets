import React, { useEffect, useState } from 'react';
import { LeadData, SurvivalCalc, CategoryId } from '../types';
import { 
  RESULT_CATEGORIES, 
  BOTTLENECKS, 
  PATHWAYS 
} from '../data/scorecardData';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  Printer, 
  Check, 
  ShieldAlert, 
  Lightbulb,
  Award
} from 'lucide-react';

interface ResultsViewProps {
  totalScore: number;
  categoryPercentages: Record<CategoryId, number>;
  bottleneckCategory: CategoryId;
  resultKey: string;
  leadData: LeadData;
  survivalData: SurvivalCalc | null;
  onRetake: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  totalScore,
  categoryPercentages,
  bottleneckCategory,
  resultKey,
  leadData,
  survivalData,
  onRetake
}) => {
  const result = RESULT_CATEGORIES[resultKey] || RESULT_CATEGORIES.survivor;
  const bottleneck = BOTTLENECKS[bottleneckCategory] || BOTTLENECKS.dependency;

  const [animatedScore, setAnimatedScore] = useState(0);
  const [copied, setCopied] = useState(false);

  // SVG ring calculation
  // Radius = 94 => circumference = 2 * PI * 94 ≈ 590.6
  const circumference = 590;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = totalScore / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= totalScore) {
        setAnimatedScore(totalScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [totalScore]);

  const handleShare = async () => {
    const text = `My Beyond Salary Score is ${totalScore}/100 (${result.name})! Discover your income safety with the Beyond Salary Scorecard.`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToPathways = () => {
    const el = document.getElementById('pathways-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#F8F4EC] text-[#211A17]">
      {/* Results Hero Header */}
      <section className="bg-[#2B1B14] text-[#F3EDE3] border-b border-[#4A3026] py-12 md:py-16 text-center">
        <div className="max-w-[1080px] mx-auto px-5">
          {leadData.firstName && (
            <div className="inline-flex items-center gap-2 bg-[#3B261D] border border-[#C9A227]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#C9A227] mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Diagnostic Report for {leadData.firstName}</span>
            </div>
          )}

          {/* Radial Circular Score Gauge */}
          <div className="relative w-[220px] h-[220px] mx-auto mb-6">
            <svg viewBox="0 0 220 220" className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="ringGradWarm" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4A3026" />
                  <stop offset="60%" stopColor="#C9A227" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              <circle
                cx="110"
                cy="110"
                r="94"
                fill="none"
                stroke="#4A3026"
                strokeWidth="16"
              />
              <circle
                cx="110"
                cy="110"
                r="94"
                fill="none"
                stroke="url(#ringGradWarm)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{
                  strokeDashoffset,
                  transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-extrabold text-5xl text-[#C9A227] tracking-tight">
                {animatedScore}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E1D5C5] mt-0.5">
                out of 100
              </span>
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-2">
            Your Income Safety Classification
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8F4EC]">
            {result.name}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#F3EDE3] max-w-xl mx-auto leading-relaxed font-medium">
            {result.sub}
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-[#3B261D] hover:bg-[#4A3026] border border-[#C9A227]/40 text-xs sm:text-sm font-bold text-[#F8F4EC] px-4 py-2 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#C9A227]" /> : <Share2 className="w-4 h-4 text-[#C9A227]" />}
              <span>{copied ? 'Summary Copied!' : 'Share Result'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-[#3B261D] hover:bg-[#4A3026] border border-[#C9A227]/40 text-xs sm:text-sm font-bold text-[#F8F4EC] px-4 py-2 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#C9A227]" />
              <span>Print Summary</span>
            </button>
          </div>
        </div>
      </section>

      {/* Strategic Breakdown & Priorities */}
      <section className="py-12 md:py-16 bg-[#F8F4EC]">
        <div className="max-w-[720px] mx-auto px-5">
          <div className="text-sm sm:text-base text-[#211A17] leading-relaxed bg-[#FFFFFF] p-6 rounded-2xl border border-[#E1D5C5] shadow-xs">
            {result.body}
          </div>

          {/* Priorities */}
          <div className="mt-10">
            <h2 className="text-lg sm:text-xl font-bold text-[#2B1B14] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C9A227]" />
              <span>Your Highest Strategic Priorities</span>
            </h2>

            <div className="space-y-3">
              {result.priorities.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-4 bg-[#FFFFFF] border border-[#E1D5C5] rounded-xl text-xs sm:text-sm text-[#211A17] shadow-2xs font-medium"
                >
                  <div className="w-5 h-5 rounded-full bg-[#EFE6D6] text-[#2B1B14] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#C9A227] stroke-[3]" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Win Card */}
          <div className="mt-8 p-5 bg-[#FFFFFF] border-2 border-[#C9A227] rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1B14] mb-2">
              <Lightbulb className="w-4 h-4 text-[#C9A227]" />
              <span>Your Immediate Quick Win</span>
            </div>
            <p className="text-sm text-[#211A17] leading-relaxed font-semibold">
              {result.quickWin}
            </p>
          </div>
        </div>
      </section>

      {/* Pillar Breakdown & Bottleneck */}
      <section className="py-12 md:py-16 bg-[#EFE6D6] border-y border-[#E1D5C5]">
        <div className="max-w-[720px] mx-auto px-5">
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1">
              Diagnostic Audit
            </div>
            <h2 className="text-2xl font-bold text-[#2B1B14]">Your Score Breakdown</h2>
          </div>

          {/* 4 Pillars Progress Bars */}
          <div className="space-y-5 bg-[#FFFFFF] border border-[#E1D5C5] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[#2B1B14] mb-2">
                <span>Salary Dependency</span>
                <span className="text-[#C9A227] font-extrabold">{categoryPercentages.dependency}%</span>
              </div>
              <div className="h-2.5 bg-[#E1D5C5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2B1B14] to-[#C9A227] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${categoryPercentages.dependency}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[#2B1B14] mb-2">
                <span>Financial Safety</span>
                <span className="text-[#C9A227] font-extrabold">{categoryPercentages.safety}%</span>
              </div>
              <div className="h-2.5 bg-[#E1D5C5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2B1B14] to-[#C9A227] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${categoryPercentages.safety}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[#2B1B14] mb-2">
                <span>Skill Readiness</span>
                <span className="text-[#C9A227] font-extrabold">{categoryPercentages.skill}%</span>
              </div>
              <div className="h-2.5 bg-[#E1D5C5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2B1B14] to-[#C9A227] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${categoryPercentages.skill}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[#2B1B14] mb-2">
                <span>Execution System</span>
                <span className="text-[#C9A227] font-extrabold">{categoryPercentages.execution}%</span>
              </div>
              <div className="h-2.5 bg-[#E1D5C5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2B1B14] to-[#C9A227] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${categoryPercentages.execution}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottleneck Card */}
          <div className="mt-8 bg-[#2B1B14] text-[#F3EDE3] rounded-2xl p-6 sm:p-8 shadow-md border border-[#4A3026]">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-3">
              <ShieldAlert className="w-4 h-4 text-[#C9A227]" />
              <span>Your Primary Beyond Salary Bottleneck</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F8F4EC] mb-2">
              {bottleneck.name}
            </h3>
            <p className="text-sm text-[#EFE6D6] leading-relaxed">
              {bottleneck.explain}
            </p>
          </div>

          {/* Survival Runway Box (if completed) */}
          {survivalData && (
            <div className="mt-6 bg-[#FFFFFF] border border-[#E1D5C5] rounded-2xl p-6 text-center shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#2B1B14] mb-1">
                Your Calculated Financial Survival Runway
              </div>
              <div className="text-3xl font-extrabold text-[#2B1B14] my-1">
                {survivalData.months < 0.1 ? '< 0.1' : survivalData.months.toFixed(1)} Months
              </div>
              <div className="text-xs text-[#5C514B] font-medium">
                of essential living expenses covered by your current liquid emergency reserves ({survivalData.currency || ''}{survivalData.savings.toLocaleString()} vs. {survivalData.currency || ''}{survivalData.expenses.toLocaleString()}/mo).
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7-Day Action Plan */}
      <section className="py-12 md:py-16 bg-[#F8F4EC]">
        <div className="max-w-[720px] mx-auto px-5">
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1">
              Structured Roadmap
            </div>
            <h2 className="text-2xl font-bold text-[#2B1B14]">
              Your Personalised 7-Day Action Plan
            </h2>
            <p className="mt-2 text-sm text-[#5C514B] font-medium">
              One bite-sized focus area per day to build momentum without disrupting your day job.
            </p>
          </div>

          <div className="divide-y divide-[#E1D5C5] border-y border-[#E1D5C5] bg-[#FFFFFF] rounded-2xl overflow-hidden border px-5 shadow-2xs">
            {result.plan.map((dayText, idx) => (
              <div key={idx} className="py-4.5 flex items-start gap-4">
                <div className="w-16 h-10 rounded-xl bg-[#EFE6D6] border border-[#E1D5C5] flex items-center justify-center shrink-0 font-bold text-xs text-[#2B1B14]">
                  DAY {idx + 1}
                </div>
                <div className="pt-2 text-sm text-[#211A17] font-semibold leading-snug">
                  {dayText}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Next Steps / Pathways */}
      <section id="pathways-section" className="py-14 md:py-20 bg-[#EFE6D6] border-t border-[#E1D5C5]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-2">
              Next Step Options
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2B1B14]">
              Your Recommended Next Step
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#5C514B] font-medium">
              Practical pathways to help you build income beyond your salary — no fake urgency, just structured direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATHWAYS.map((p, idx) => (
              <div 
                key={idx}
                className="bg-[#FFFFFF] border border-[#E1D5C5] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#C9A227] transition-all"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-4 bg-[#EFE6D6] text-[#2B1B14] border border-[#E1D5C5]">
                    {p.tier}
                  </span>
                  <h3 className="text-lg font-bold text-[#2B1B14] mb-2">{p.name}</h3>
                  <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed mb-6 font-medium">
                    {p.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#E1D5C5] mb-6">
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-[#211A17] font-medium">
                        <Check className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Thank you ${leadData.firstName || ''}! Our team has registered your interest in ${p.name}. Check your email (${leadData.email || 'provided'}) for onboarding details.`)}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border-2 border-[#2B1B14] text-[#2B1B14] hover:bg-[#2B1B14] hover:text-[#F8F4EC] transition-colors cursor-pointer"
                >
                  Explore {p.tier}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Results Call to Action */}
      <section className="py-16 bg-[#F8F4EC]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="bg-[#2B1B14] text-[#F3EDE3] text-center rounded-3xl p-10 md:p-14 shadow-xl border border-[#4A3026]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8F4EC] max-w-xl mx-auto leading-snug">
              You now know where you are. The next step is deciding what you'll do with that clarity.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToPathways}
                className="group flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#D4AF37] text-[#2B1B14] font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95 w-full sm:w-auto cursor-pointer"
              >
                <span>See My Recommended Next Step</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onRetake}
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#C9A227]/50 hover:border-[#C9A227] text-[#F8F4EC] font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all active:scale-95 w-full sm:w-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake the Scorecard</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
