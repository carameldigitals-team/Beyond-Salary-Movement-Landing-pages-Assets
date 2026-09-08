import React, { useEffect, useState } from 'react';
import { LeadData, SurvivalCalc, CategoryId } from '../types';
import { 
  RESULT_CATEGORIES, 
  BOTTLENECKS, 
  PATHWAYS 
} from '../data/scorecardData';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  Printer, 
  Check, 
  ShieldAlert, 
  AlertTriangle,
  Lightbulb,
  Calendar,
  Layers,
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
    <div className="w-full bg-white">
      {/* Results Hero Header */}
      <section className="bg-[#F3F8FF] border-b border-[#E1E7F7] py-12 md:py-16 text-center">
        <div className="max-w-[1080px] mx-auto px-5">
          {leadData.firstName && (
            <div className="inline-flex items-center gap-2 bg-white border border-[#E1E7F7] px-4 py-1.5 rounded-full text-xs font-bold text-[#03037E] mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>Diagnostic Report for {leadData.firstName}</span>
            </div>
          )}

          {/* Radial Circular Score Gauge */}
          <div className="relative w-[220px] h-[220px] mx-auto mb-6">
            <svg viewBox="0 0 220 220" className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#03037E" />
                  <stop offset="55%" stopColor="#00A3FF" />
                  <stop offset="100%" stopColor="#FFBE4D" />
                </linearGradient>
              </defs>
              <circle
                cx="110"
                cy="110"
                r="94"
                fill="none"
                stroke="#E1E7F7"
                strokeWidth="16"
              />
              <circle
                cx="110"
                cy="110"
                r="94"
                fill="none"
                stroke="url(#ringGrad)"
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
              <span className="font-extrabold text-5xl text-[#FFBE4D] tracking-tight">
                {animatedScore}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4A4C78] mt-0.5">
                out of 100
              </span>
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-widest text-[#00A3FF] mb-2">
            Your Income Safety Classification
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#101040]">
            {result.name}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#4A4C78] max-w-xl mx-auto leading-relaxed font-medium">
            {result.sub}
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F3F8FF] border border-[#E1E7F7] text-xs sm:text-sm font-bold text-[#03037E] px-4 py-2 rounded-xl transition-colors shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Summary Copied!' : 'Share Result'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F3F8FF] border border-[#E1E7F7] text-xs sm:text-sm font-bold text-[#03037E] px-4 py-2 rounded-xl transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Summary</span>
            </button>
          </div>
        </div>
      </section>

      {/* Strategic Breakdown & Priorities */}
      <section className="py-12 md:py-16">
        <div className="max-w-[720px] mx-auto px-5">
          <div className="text-sm sm:text-base text-[#101040] leading-relaxed">
            {result.body}
          </div>

          {/* Priorities */}
          <div className="mt-10">
            <h2 className="text-lg sm:text-xl font-bold text-[#03037E] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#00A3FF]" />
              <span>Your Highest Strategic Priorities</span>
            </h2>

            <div className="space-y-3">
              {result.priorities.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3.5 bg-[#F3F8FF] border border-[#E1E7F7] rounded-xl text-xs sm:text-sm text-[#101040]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#00A3FF] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    ✓
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Win Card */}
          <div className="mt-8 p-5 bg-gradient-to-r from-[#F3F8FF] to-white border-2 border-[#00A3FF]/40 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#03037E] mb-2">
              <Lightbulb className="w-4 h-4 text-[#FFBE4D]" />
              <span>Your Immediate Quick Win</span>
            </div>
            <p className="text-sm text-[#101040] leading-relaxed font-medium">
              {result.quickWin}
            </p>
          </div>
        </div>
      </section>

      {/* Pillar Breakdown & Bottleneck */}
      <section className="py-12 md:py-16 bg-[#F3F8FF] border-y border-[#E1E7F7]">
        <div className="max-w-[720px] mx-auto px-5">
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] mb-1">
              Diagnostic Audit
            </div>
            <h2 className="text-2xl font-bold text-[#101040]">Your Score Breakdown</h2>
          </div>

          {/* 4 Pillars Progress Bars */}
          <div className="space-y-5 bg-white border border-[#E1E7F7] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[#101040] mb-2">
                <span>Salary Dependency</span>
                <span className="text-[#03037E]">{categoryPercentages.dependency}%</span>
              </div>
              <div className="h-2.5 bg-[#E1E7F7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#03037E] to-[#00A3FF] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${categoryPercentages.dependency}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[#101040] mb-2">
                <span>Financial Safety</span>
                <span className="text-[#03037E]">{categoryPercentages.safety}%</span>
              </div>
              <div className="h-2.5 bg-[#E1E7F7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#03037E] to-[#00A3FF] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${categoryPercentages.safety}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[#101040] mb-2">
                <span>Skill Readiness</span>
                <span className="text-[#03037E]">{categoryPercentages.skill}%</span>
              </div>
              <div className="h-2.5 bg-[#E1E7F7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#03037E] to-[#00A3FF] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${categoryPercentages.skill}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[#101040] mb-2">
                <span>Execution System</span>
                <span className="text-[#03037E]">{categoryPercentages.execution}%</span>
              </div>
              <div className="h-2.5 bg-[#E1E7F7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#03037E] to-[#00A3FF] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${categoryPercentages.execution}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottleneck Card */}
          <div className="mt-8 bg-[#03037E] text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFBE4D] mb-3">
              <ShieldAlert className="w-4 h-4 text-[#FFBE4D]" />
              <span>Your Primary Beyond Salary Bottleneck</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {bottleneck.name}
            </h3>
            <p className="text-sm text-[#C7CBF5] leading-relaxed">
              {bottleneck.explain}
            </p>
          </div>

          {/* Survival Runway Box (if completed) */}
          {survivalData && (
            <div className="mt-6 bg-white border border-[#E1E7F7] rounded-2xl p-6 text-center shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#03037E] mb-1">
                Your Calculated Financial Survival Runway
              </div>
              <div className="text-3xl font-extrabold text-[#FFBE4D] my-1">
                {survivalData.months < 0.1 ? '< 0.1' : survivalData.months.toFixed(1)} Months
              </div>
              <div className="text-xs text-[#4A4C78]">
                of essential living expenses covered by your current liquid emergency reserves ({survivalData.currency || ''}{survivalData.savings.toLocaleString()} vs. {survivalData.currency || ''}{survivalData.expenses.toLocaleString()}/mo).
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7-Day Action Plan */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[720px] mx-auto px-5">
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] mb-1">
              Structured Roadmap
            </div>
            <h2 className="text-2xl font-bold text-[#101040]">
              Your Personalised 7-Day Action Plan
            </h2>
            <p className="mt-2 text-sm text-[#4A4C78]">
              One bite-sized focus area per day to build momentum without disrupting your day job.
            </p>
          </div>

          <div className="divide-y divide-[#E1E7F7] border-y border-[#E1E7F7]">
            {result.plan.map((dayText, idx) => (
              <div key={idx} className="py-4.5 flex items-start gap-4">
                <div className="w-16 h-10 rounded-xl bg-[#F3F8FF] border border-[#E1E7F7] flex items-center justify-center shrink-0 font-bold text-xs text-[#03037E]">
                  DAY {idx + 1}
                </div>
                <div className="pt-2 text-sm text-[#101040] font-medium leading-snug">
                  {dayText}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Next Steps / Pathways */}
      <section id="pathways-section" className="py-14 md:py-20 bg-[#F3F8FF] border-t border-[#E1E7F7]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] mb-2">
              Next Step Options
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101040]">
              Your Recommended Next Step
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#4A4C78]">
              Practical pathways to help you build income beyond your salary — no fake urgency, just structured direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATHWAYS.map((p, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E1E7F7] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-4 ${p.badgeClass}`}>
                    {p.tier}
                  </span>
                  <h3 className="text-lg font-bold text-[#101040] mb-2">{p.name}</h3>
                  <p className="text-xs sm:text-sm text-[#4A4C78] leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#E1E7F7] mb-6">
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-[#101040]">
                        <Check className="w-3.5 h-3.5 text-[#00A3FF] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Thank you ${leadData.firstName || ''}! Our team has registered your interest in ${p.name}. Check your email (${leadData.email || 'provided'}) for onboarding details.`)}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border-2 border-[#03037E] text-[#03037E] hover:bg-[#03037E] hover:text-white transition-colors"
                >
                  Explore {p.tier}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Results Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="bg-gradient-to-b from-[#03037E] to-[#020254] text-white text-center rounded-3xl p-10 md:p-14 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto leading-snug">
              You now know where you are. The next step is deciding what you'll do with that clarity.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToPathways}
                className="group flex items-center justify-center gap-2 bg-[#FFBE4D] hover:bg-[#ffb336] text-[#03037E] font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95 w-full sm:w-auto"
              >
                <span>See My Recommended Next Step</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onRetake}
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all active:scale-95 w-full sm:w-auto"
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
