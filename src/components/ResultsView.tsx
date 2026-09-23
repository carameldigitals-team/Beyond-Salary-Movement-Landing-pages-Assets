import React, { useEffect, useState } from 'react';
import { 
  AssessmentResult, 
  LeadData, 
  SurvivalCalc 
} from '../types';
import { 
  CDA_BRAND_CONFIG, 
  CDA_PROFILES, 
  CDA_OFFERS, 
  CDA_BOTTLENECKS,
  CDA_TIER1_CONFIG,
  CDA_PROFILE_NEXT_MOVES,
  CDA_RECOMMENDED_STEP_BENEFITS,
  getTier1ActivePrice,
  getTier1StageDisplay
} from '../data/cdaConfig';
import { getDimensionRating } from '../utils/scoringEngine';
import { trackEvent } from '../utils/analytics';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  Printer, 
  Check, 
  ShieldAlert, 
  Layers,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Info,
  CreditCard,
  Zap,
  Target,
  AlertTriangle,
  Lightbulb,
  Compass,
  Milestone,
  Clock,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface ResultsViewProps {
  assessmentResult: AssessmentResult;
  leadData: LeadData;
  survivalData: SurvivalCalc | null;
  onRetake: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  assessmentResult,
  leadData,
  survivalData,
  onRetake
}) => {
  const profile = CDA_PROFILES[assessmentResult.profile] || CDA_PROFILES.salary_survivor;
  const profileNextMove = CDA_PROFILE_NEXT_MOVES[assessmentResult.profile] || CDA_PROFILE_NEXT_MOVES.salary_survivor;
  const offer = CDA_OFFERS.tier_1;
  const activePrice = getTier1ActivePrice(CDA_TIER1_CONFIG);
  const stageDisplay = getTier1StageDisplay(CDA_TIER1_CONFIG);
  const bottleneck = CDA_BOTTLENECKS[assessmentResult.primaryBottleneck] || CDA_BOTTLENECKS.clarity;

  const [animatedScore, setAnimatedScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState<string | null>(null);

  // SVG Gauge calculation
  const circumference = 590;
  const strokeDashoffset = circumference - (assessmentResult.totalScore / 100) * circumference;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    trackEvent('profile_assigned', {
      profile: assessmentResult.profile,
      offer: 'tier_1',
      bottleneck: assessmentResult.primaryBottleneck,
      leadTemperature: assessmentResult.leadTemperature
    });

    trackEvent('offer_recommended', {
      offerId: offer.id,
      productName: offer.productName,
      price: activePrice
    });

    // Score gauge animation
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = assessmentResult.totalScore / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= assessmentResult.totalScore) {
        setAnimatedScore(assessmentResult.totalScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [assessmentResult, offer]);

  const handleShare = async () => {
    const text = `I took The Beyond Salary Scorecard™ by Caramel Digital Academy. My profile: ${profile.name} (Primary Need: ${profile.primaryNeed}). Discover your Beyond Salary readiness!`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCtaClick = (platform: 'selar' | 'paystack' | 'direct') => {
    trackEvent('cta_clicked', { platform, offerId: offer.id });

    if (platform === 'selar') {
      trackEvent('selar_clicked', { offerId: offer.id });
      if (offer.selarUrl) {
        window.open(offer.selarUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    }

    if (platform === 'paystack') {
      trackEvent('paystack_clicked', { offerId: offer.id });
      if (offer.paystackUrl) {
        window.open(offer.paystackUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    }

    if (platform === 'direct' && offer.existingSiteUrl) {
      window.open(offer.existingSiteUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // If no direct payment URL configured yet, open clean enrollment confirmation modal
    setShowCheckoutModal(platform);
  };

  // Dimensions
  const dimDependency = {
    label: 'Salary Dependency',
    score: assessmentResult.normalizedScores.salaryDependency,
    rating: getDimensionRating(assessmentResult.normalizedScores.salaryDependency),
    desc: assessmentResult.normalizedScores.salaryDependency > 65 
      ? 'High salary dependency. Your living costs rely predominantly on your active employment income.'
      : assessmentResult.normalizedScores.salaryDependency > 35
      ? 'Moderate salary dependency with developing secondary avenues.'
      : 'Low salary dependency. You have active revenue streams protecting your baseline.'
  };

  const dimResilience = {
    label: 'Financial Resilience',
    score: assessmentResult.normalizedScores.financialResilience,
    rating: getDimensionRating(assessmentResult.normalizedScores.financialResilience),
    desc: assessmentResult.normalizedScores.financialResilience > 65
      ? 'High financial vulnerability. Emergency runway requires immediate buffer protection.'
      : assessmentResult.normalizedScores.financialResilience > 35
      ? 'Moderate resilience. Capable of weathering small disruptions with caution.'
      : 'Strong resilience. Solid liquid reserves in place for strategic investment.'
  };

  const dimSkill = {
    label: 'Skill Readiness',
    score: assessmentResult.normalizedScores.skillReadiness,
    rating: getDimensionRating(assessmentResult.normalizedScores.skillReadiness),
    desc: assessmentResult.normalizedScores.skillReadiness > 65
      ? 'High skill readiness. You possess marketable capabilities that the market is willing to pay for.'
      : assessmentResult.normalizedScores.skillReadiness > 35
      ? 'Developing skill capability. You have foundational strengths that need market-packaging.'
      : 'Emerging skill capability. Focused digital or AI skill acquisition will yield your fastest return.'
  };

  const dimExecution = {
    label: 'Execution System',
    score: assessmentResult.normalizedScores.executionSystem,
    rating: getDimensionRating(assessmentResult.normalizedScores.executionSystem),
    desc: assessmentResult.normalizedScores.executionSystem > 65
      ? 'Advanced execution readiness. You have tested client pathways or active operating consistency.'
      : assessmentResult.normalizedScores.executionSystem > 35
      ? 'Developing execution readiness. You have initiated attempts but lack a predictable client system.'
      : 'Emerging execution system. You need a structured step-by-step implementation framework.'
  };

  const dimensions = [dimDependency, dimResilience, dimSkill, dimExecution];

  // Helper for formatting Nigerian Naira
  const formatNaira = (val: number) => `₦${val.toLocaleString()}`;

  return (
    <div className="w-full bg-[#F8F4EC] text-[#211A17] selection:bg-[#C9A227]/30">
      {/* SECTION 1: Results Hero & Profile Display */}
      <section className="bg-[#2B1B14] text-[#F3EDE3] border-b border-[#4A3026] py-12 md:py-16 text-center relative overflow-hidden">
        {/* Subtle background ambient accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#03037E]/20 blur-3xl pointer-events-none" />

        <div className="max-w-[1080px] mx-auto px-5 relative z-10">
          {/* Header Tag / User Identity */}
          <div className="inline-flex items-center gap-2 bg-[#3B261D] border border-[#C9A227]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#C9A227] mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>
              {leadData.fullName ? `Diagnostic Assessment for ${leadData.fullName}` : 'Personalised Diagnostic Assessment'}
            </span>
          </div>

          {/* Circular Score Gauge */}
          <div className="relative w-[210px] h-[210px] mx-auto mb-6">
            <svg viewBox="0 0 220 220" className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="ringGradWarm" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4A3026" />
                  <stop offset="60%" stopColor="#C9A227" />
                  <stop offset="100%" stopColor="#FFBE4D" />
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
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E1D5C5] mt-0.5">
                Beyond Salary Index
              </span>
            </div>
          </div>

          {/* Primary Profile Announcement */}
          <div className="inline-block bg-[#03037E]/80 border border-[#C9A227]/50 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest text-[#FFBE4D] uppercase mb-3">
            YOUR SCORECARD RESULT
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8F4EC] tracking-tight">
            {profile.name}
          </h1>

          <div className="mt-3 inline-block bg-[#3B261D] border border-[#C9A227]/30 text-[#C9A227] px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            PRIMARY NEED: {profile.primaryNeed}
          </div>

          {/* Brief explanation of what the profile means */}
          <p className="mt-4 text-base sm:text-lg text-[#F3EDE3] max-w-2xl mx-auto leading-relaxed font-medium">
            "{profile.message}"
          </p>
          <p className="mt-2 text-xs sm:text-sm text-[#E1D5C5] max-w-xl mx-auto leading-relaxed">
            {profile.whatThisMeans}
          </p>

          {/* Profile-Specific Personalization Transition Card */}
          <div className="mt-6 bg-[#3B261D]/90 border border-[#C9A227]/50 rounded-2xl p-4 sm:p-5 max-w-xl mx-auto text-left shadow-lg">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-[#C9A227] text-[#2B1B14] shrink-0 mt-0.5 shadow-xs">
                <Target className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="text-xs font-black text-[#FFBE4D] uppercase tracking-wider">
                  Your next move:
                </div>
                <p className="text-sm sm:text-base font-bold text-[#FFFFFF] leading-snug">
                  {profileNextMove.nextMove}
                </p>
                <div className="pt-2 border-t border-[#C9A227]/25 flex flex-wrap items-baseline gap-1.5 text-xs text-[#E1D5C5]">
                  <span className="font-semibold text-[#FFBE4D]">Recommended for you:</span>
                  <span className="font-bold text-[#FFFFFF]">{profileNextMove.recommendedOffer}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Anchor Link to Action Plan */}
          <div className="mt-5">
            <a
              href="#recommended-next-step"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#FFBE4D] hover:text-[#FFFFFF] underline underline-offset-4 transition-colors"
            >
              <span>View your recommended next step below</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Actions (Share / Print) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-[#3B261D] hover:bg-[#4A3026] border border-[#C9A227]/40 text-xs sm:text-sm font-bold text-[#F8F4EC] px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#C9A227]" /> : <Share2 className="w-4 h-4 text-[#C9A227]" />}
              <span>{copied ? 'Summary Copied to Clipboard!' : 'Share Diagnostic'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-[#3B261D] hover:bg-[#4A3026] border border-[#C9A227]/40 text-xs sm:text-sm font-bold text-[#F8F4EC] px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#C9A227]" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: YOUR RECOMMENDED NEXT STEP */}
      <section id="recommended-next-step" className="py-12 sm:py-16 md:py-20 bg-[#F8F4EC] border-b border-[#E1D5C5]">
        <div className="max-w-[780px] mx-auto px-5">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 bg-[#03037E] text-[#FFBE4D] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFBE4D]" />
              <span>YOUR RECOMMENDED NEXT STEP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#03037E] tracking-tight">
              BEYOND SALARY FOUNDATION
            </h2>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#C9A227] mt-1.5 tracking-tight">
              Career to Cash Live Training™
            </div>

            {/* Supporting copy */}
            <div className="mt-6 text-sm sm:text-base text-[#5C514B] font-medium leading-relaxed space-y-3.5 text-left sm:text-center">
              <p>
                You now have a clearer picture of where you are on your Beyond Salary journey.
              </p>
              <p>
                The next step is to move from simply knowing what is possible to identifying a practical income opportunity you can begin building around your existing skills, experience and resources.
              </p>
              <p className="text-[#2B1B14] font-semibold">
                Inside the <strong>Beyond Salary Foundation: Career to Cash Live Training™</strong>, you'll learn how to identify an income opportunity, position what you already know, and use AI and digital tools to turn your knowledge and skills into a practical income pathway.
              </p>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-[#FFFFFF] border-2 border-[#C9A227] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-8">
            <h3 className="text-base sm:text-lg font-black text-[#03037E] mb-5 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0" />
              <span>Inside the training, you'll learn how to:</span>
            </h3>

            <div className="space-y-3">
              {CDA_RECOMMENDED_STEP_BENEFITS.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-[#2B1B14] font-medium leading-relaxed bg-[#F8F4EC] p-3.5 rounded-xl border border-[#E1D5C5]"
                >
                  <Check className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5 stroke-[3]" />
                  <span className="font-semibold text-[#2B1B14]">{benefit}</span>
                </div>
              ))}
            </div>

            {/* FOUNDING PRICE CTA */}
            <div className="mt-8 bg-[#2B1B14] text-[#F3EDE3] p-6 sm:p-8 rounded-2xl text-center border-2 border-[#C9A227] shadow-xl">
              {/* Small label */}
              <div className="inline-block text-[11px] font-black uppercase tracking-widest text-[#FFBE4D] bg-[#3B261D] border border-[#C9A227]/40 px-3.5 py-1 rounded-full mb-3">
                FOUNDING COHORT 1
              </div>

              {/* Price messaging */}
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#E1D5C5]">
                Join at the Founding Price
              </div>

              <div className="my-2">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-[#FFBE4D] tracking-tight">
                  ₦10,999
                </span>
              </div>

              {/* Subtle supporting line */}
              <p className="text-xs sm:text-sm text-[#E1D5C5] font-medium max-w-md mx-auto">
                Available to the first 25 participants at this founding price.
              </p>

              {/* CTA BUTTON */}
              <div className="mt-6 max-w-md mx-auto">
                <a
                  href="https://selar.com/beyond-salaryfoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('cta_clicked', { platform: 'selar', price: 10999, profile: assessmentResult.profile });
                    trackEvent('selar_clicked', { offerId: offer.id, price: 10999 });
                  }}
                  className="w-full group inline-flex items-center justify-center gap-2.5 bg-[#C9A227] hover:bg-[#D4AF37] text-[#2B1B14] font-black text-base sm:text-lg py-4 px-6 rounded-xl shadow-xl transition-all active:scale-[0.98] text-center"
                >
                  <span>GET ACCESS — ₦10,999</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Small reassurance underneath CTA */}
              <p className="mt-4 text-xs sm:text-sm text-[#FFBE4D] font-bold max-w-md mx-auto leading-relaxed">
                Secure your spot in the Founding Cohort and start building your path from career to cash.
              </p>

              <div className="mt-3.5 text-[11px] text-[#EFE6D6]/80 flex flex-wrap items-center justify-center gap-2">
                <span>🔒 Secure 256-bit encrypted checkout via Selar</span>
                <span>•</span>
                <span>Instant cohort confirmation</span>
              </div>
            </div>
          </div>

          {/* Smooth transition link to explore in-depth diagnostic breakdown */}
          <div className="text-center pt-2">
            <a
              href="#diagnostic-snapshot"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#03037E] hover:text-[#C9A227] uppercase tracking-wider transition-colors"
            >
              <span>Explore Your Full Diagnostic Breakdown & Dimensions Below</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-90 text-[#C9A227]" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: YOUR DIAGNOSTIC SNAPSHOT (Four Dimensions) */}
      <section id="diagnostic-snapshot" className="py-12 md:py-16 bg-[#FFFFFF] border-b border-[#E1D5C5]">
        <div className="max-w-[840px] mx-auto px-5">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Assessment Breakdown</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B1B14]">
              Your Diagnostic Snapshot
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#5C514B] font-medium">
              We evaluated your responses across four vital dimensions of income security and commercial readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {dimensions.map((dim, idx) => (
              <div 
                key={idx}
                className="bg-[#F8F4EC] border border-[#E1D5C5] rounded-2xl p-5 flex flex-col justify-between hover:border-[#C9A227]/60 transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-[#2B1B14]">{dim.label}</span>
                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      dim.rating === 'Advanced' || dim.rating === 'Strong'
                        ? 'bg-[#C9A227]/15 text-[#2B1B14] border-[#C9A227]'
                        : 'bg-[#EFE6D6] text-[#5C514B] border-[#E1D5C5]'
                    }`}>
                      {dim.rating}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#E1D5C5] rounded-full overflow-hidden my-3">
                    <div 
                      className="h-full bg-gradient-to-r from-[#2B1B14] to-[#C9A227] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.max(8, dim.score)}%` }}
                    />
                  </div>

                  <p className="text-xs text-[#5C514B] leading-relaxed font-medium mt-2">
                    {dim.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Survival Runway Box (if user completed the optional calculator) */}
          {survivalData && (
            <div className="mt-8 bg-[#F8F4EC] border-2 border-[#C9A227] rounded-2xl p-6 text-center shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#2B1B14] mb-1">
                Your Calculated Survival Runway
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#2B1B14] my-1">
                {survivalData.months < 0.1 ? '< 0.1' : survivalData.months.toFixed(1)} Months
              </div>
              <p className="text-xs sm:text-sm text-[#5C514B] font-medium max-w-lg mx-auto">
                Of essential monthly living expenses covered by your liquid savings reserves ({survivalData.currency}{survivalData.savings.toLocaleString()} savings vs. {survivalData.currency}{survivalData.expenses.toLocaleString()}/mo expenses).
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: PERSONALIZED PROFILE DEEP DIVE (The 7 Strategic Pillars) */}
      <section className="py-14 md:py-20 bg-[#F8F4EC]">
        <div className="max-w-[880px] mx-auto px-5">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 bg-[#2B1B14] text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
              <Compass className="w-3.5 h-3.5" />
              <span>Personalized Diagnostic Deep Dive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B1B14] tracking-tight">
              Understanding Your Current Position
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5C514B] font-medium">
              A comprehensive breakdown of where you stand as <strong>{profile.name}</strong>, what to prioritize, and what to set aside for now.
            </p>
          </div>

          {/* Pillar 1 & 2: Where You Currently Are & What This Means */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-[#FFFFFF] border border-[#E1D5C5] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#03037E] mb-2">
                <Target className="w-4 h-4 text-[#03037E]" />
                <span>1. Where You Currently Are</span>
              </div>
              <h3 className="text-lg font-bold text-[#2B1B14] mb-2">
                Your Current Reality
              </h3>
              <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
                {profile.whereYouAre}
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E1D5C5] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-2">
                <Info className="w-4 h-4 text-[#C9A227]" />
                <span>2. What This Means</span>
              </div>
              <h3 className="text-lg font-bold text-[#2B1B14] mb-2">
                The Practical Implication
              </h3>
              <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
                {profile.whatThisMeans}
              </p>
            </div>
          </div>

          {/* Pillar 3 & 4: Your Key Challenge & Your Opportunity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-[#FFFFFF] border-l-4 border-l-[#C9A227] border border-[#E1D5C5] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1B14] mb-2">
                <AlertTriangle className="w-4 h-4 text-[#C9A227]" />
                <span>3. Your Key Challenge</span>
              </div>
              <h3 className="text-lg font-bold text-[#2B1B14] mb-2">
                The Real Hurdle You Face
              </h3>
              <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
                {profile.keyChallenge}
              </p>
            </div>

            <div className="bg-[#FFFFFF] border-l-4 border-l-[#03037E] border border-[#E1D5C5] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#03037E] mb-2">
                <Lightbulb className="w-4 h-4 text-[#03037E]" />
                <span>4. Your Greatest Opportunity</span>
              </div>
              <h3 className="text-lg font-bold text-[#2B1B14] mb-2">
                Where Your Upside Lies
              </h3>
              <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
                {profile.opportunity}
              </p>
            </div>
          </div>

          {/* Pillar 5 & 6: What to Focus On First vs What NOT to Worry About Yet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-[#EFE6D6] border border-[#C9A227]/40 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1B14] mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                <span>5. What to Focus on First</span>
              </div>
              <h3 className="text-lg font-bold text-[#2B1B14] mb-2">
                Your Immediate Priority
              </h3>
              <p className="text-xs sm:text-sm text-[#2B1B14] leading-relaxed font-semibold">
                {profile.focusFirst}
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E1D5C5] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5C514B] mb-2">
                <ShieldCheck className="w-4 h-4 text-[#5C514B]" />
                <span>6. What NOT to Worry About Yet</span>
              </div>
              <h3 className="text-lg font-bold text-[#2B1B14] mb-2">
                Avoid Premature Complexity
              </h3>
              <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
                {profile.whatNotToWorry}
              </p>
            </div>
          </div>

          {/* Pillar 7: Why Clarity Is Your Next Step */}
          <div className="bg-[#FFFFFF] border-2 border-[#C9A227] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#C9A227] mb-2">
              <Zap className="w-4 h-4 text-[#C9A227]" />
              <span>7. Why Clarity Is Your Next Step</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2B1B14] mb-3">
              Before You Build More Income, You Need Clarity on What to Build
            </h3>
            <p className="text-sm sm:text-base text-[#2B1B14] leading-relaxed font-medium mb-5">
              {profile.whyClarity}
            </p>

            {/* Specific Key Understandings Tailored to This Profile */}
            <div className="p-5 bg-[#F8F4EC] rounded-xl border border-[#E1D5C5]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B1B14] mb-3">
                Key Insights You Need to Clarify Right Now:
              </h4>
              <div className="space-y-2">
                {profile.specificUnderstandings.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B1B14] font-medium">
                    <Check className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5 stroke-[3]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Bottleneck Card */}
          <div className="bg-[#2B1B14] text-[#F3EDE3] border border-[#4A3026] rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-2">
              <ShieldAlert className="w-4 h-4 text-[#C9A227]" />
              <span>YOUR PRIMARY DIAGNOSTIC BOTTLENECK</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC]">
              {bottleneck.name}
            </h3>
            <div className="text-xs sm:text-sm font-semibold text-[#FFBE4D] mt-1 mb-4">
              {bottleneck.subtitle}
            </div>
            <p className="text-sm text-[#EFE6D6] leading-relaxed mb-5">
              {bottleneck.explain}
            </p>
            <div className="p-4.5 bg-[#3B261D] border border-[#C9A227]/30 rounded-xl text-xs sm:text-sm text-[#F8F4EC]">
              <strong className="text-[#C9A227] block mb-1">Recommended Immediate Action Step:</strong>
              {bottleneck.actionStep}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE BEYOND SALARY TRANSFORMATION JOURNEY (Ecosystem Bridge) */}
      <section id="transformation-journey" className="py-14 md:py-20 bg-[#FFFFFF] border-t border-[#E1D5C5]">
        <div className="max-w-[880px] mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 bg-[#2B1B14] text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
              <Milestone className="w-3.5 h-3.5" />
              <span>The Beyond Salary Ecosystem Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B1B14] tracking-tight">
              Everyone Starts with Clarity.
              <span className="block text-[#C9A227]">Your Next Pathway Comes After the Foundation.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5C514B] font-medium leading-relaxed">
              You are not being asked to choose between four paid programs today. The Scorecard has revealed where you stand. The next step is establishing your personal roadmap through our foundational cohort.
            </p>
          </div>

          {/* 4-Step Ecosystem Pathway Graphic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {/* Step 1 */}
            <div className="bg-[#F8F4EC] border-2 border-[#C9A227] rounded-2xl p-5 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold text-[#C9A227] uppercase tracking-wider">Step 01</span>
                  <span className="bg-[#C9A227] text-[#2B1B14] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    COMPLETED
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#2B1B14] mb-1">
                  The Scorecard Diagnostic
                </h4>
                <p className="text-xs text-[#5C514B] leading-relaxed">
                  Revealed where you currently are ({profile.name}) and identified your primary bottleneck.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-bold text-[#2B1B14] flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#C9A227] stroke-[3]" />
                <span>Diagnosis Unlocked</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#2B1B14] text-[#F3EDE3] border-2 border-[#FFBE4D] rounded-2xl p-5 relative flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold text-[#FFBE4D] uppercase tracking-wider">Step 02</span>
                  <span className="bg-[#FFBE4D] text-[#2B1B14] text-[10px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse">
                    YOUR NEXT STEP
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#FFFFFF] mb-1">
                  {offer.productName}
                </h4>
                <p className="text-xs text-[#E1D5C5] leading-relaxed">
                  Live cohort training to understand your profile, audit your skills, and establish your Career-to-Cash foundation.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-extrabold text-[#FFBE4D]">
                Investment: {formatNaira(activePrice)}
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F8F4EC] border border-[#E1D5C5] rounded-2xl p-5 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold text-[#5C514B] uppercase tracking-wider">Step 03</span>
                  <span className="bg-[#EFE6D6] text-[#5C514B] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    IN TRAINING
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#2B1B14] mb-1">
                  Personal Beyond Salary Roadmap
                </h4>
                <p className="text-xs text-[#5C514B] leading-relaxed">
                  Formulated live during the cohort: your tailored 30-day plan matching your specific job schedule.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-semibold text-[#5C514B]">
                Live Mentorship Output
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F8F4EC] border border-[#E1D5C5] rounded-2xl p-5 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold text-[#5C514B] uppercase tracking-wider">Step 04</span>
                  <span className="bg-[#EFE6D6] text-[#5C514B] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    ADVANCED
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#2B1B14] mb-1">
                  Caramel Digital Academy Pathways
                </h4>
                <p className="text-xs text-[#5C514B] leading-relaxed">
                  Choose your practical development path (AI Video, AI Web, Productization, Accelerator, Multiplier).
                </p>
              </div>
              <div className="mt-3 text-[11px] font-semibold text-[#03037E]">
                Available at carameldigitals.com
              </div>
            </div>
          </div>

          {/* Reassurance Callout */}
          <div className="p-5 bg-[#F8F4EC] border border-[#E1D5C5] rounded-2xl text-center text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
            <strong className="text-[#2B1B14] block mb-1">The Caramel Digital Academy Principle:</strong>
            "Before you build more income, you need clarity on what to build. Advanced training without clarity creates confusion. That is why every participant begins with the {offer.productName} ({formatNaira(activePrice)})."
          </div>
        </div>
      </section>

      {/* SECTION 5: THE RECOMMENDED PROGRAM (Single Entry Cohort Offer) */}
      <section id="recommended-offer" className="py-14 md:py-20 bg-[#EFE6D6] border-t border-[#E1D5C5]">
        <div className="max-w-[880px] mx-auto px-5">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 bg-[#2B1B14] text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Single Recommended Next Step</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B1B14] tracking-tight">
              {offer.productName}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5C514B] font-medium leading-relaxed">
              Stage: <strong className="text-[#2B1B14]">{offer.stage || 'Beyond Salary Income Foundation'}</strong> • Your Scorecard showed you where you are. This training provides your structured pathway forward.
            </p>
          </div>

          {/* Primary Offer Card */}
          <div className="bg-[#FFFFFF] border-2 border-[#C9A227] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            {/* Top Accent Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E1D5C5]">
              <div>
                <span className="inline-block text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-[#2B1B14] text-[#C9A227] mr-2">
                  STAGE: {offer.stage || 'BEYOND SALARY INCOME FOUNDATION'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5C514B] mt-1 sm:mt-0">
                  <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                  Live Cohort Experience
                </span>
              </div>

              <div className="bg-[#FFBE4D]/20 border border-[#C9A227] px-3.5 py-1 rounded-full text-xs font-bold text-[#2B1B14]">
                {stageDisplay.stageBadge}
              </div>
            </div>

            {/* Product Title & Tagline */}
            <div className="my-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2B1B14] leading-tight">
                {offer.productName}
              </h3>
              <p className="text-sm sm:text-base text-[#5C514B] font-semibold mt-2">
                "{offer.tagline}"
              </p>
              <div className="mt-3 text-xs sm:text-sm font-medium text-[#2B1B14] bg-[#F8F4EC] p-3 rounded-xl border border-[#E1D5C5]">
                <strong>Delivery Format:</strong> {offer.delivery}
                {offer.trainingModel && (
                  <span className="block text-xs text-[#5C514B] mt-1">
                    <strong>Pedagogy:</strong> {offer.trainingModel}
                  </span>
                )}
              </div>
            </div>

            {/* Core Transformation */}
            <div className="p-5 rounded-2xl bg-[#03037E]/5 border border-[#03037E]/20 mb-8">
              <div className="text-xs font-bold uppercase tracking-wider text-[#03037E] mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#03037E]" />
                <span>Primary Transformation</span>
              </div>
              <p className="text-sm sm:text-base text-[#211A17] font-semibold leading-relaxed">
                {offer.primaryTransformation}
              </p>
            </div>

            {/* What You'll Experience Inside the Cohort */}
            <div className="mb-8">
              <h4 className="text-base font-bold text-[#2B1B14] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                <span>What You Will Experience Inside the Cohort:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {offer.whatYouWillWorkOn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#211A17] font-medium bg-[#F8F4EC] p-3 rounded-xl border border-[#E1D5C5]">
                    <Check className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5 stroke-[3]" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Will Leave With / Tangible Deliverables */}
            <div className="mb-8 p-5 bg-[#F8F4EC] border border-[#E1D5C5] rounded-2xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#2B1B14] mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#C9A227]" />
                <span>What You Will Leave With:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {offer.whatYouWillBuild.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#211A17] font-semibold bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E1D5C5]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Foundational 3-Asset Digital Bundle Callout */}
            <div className="mb-8 p-5 rounded-2xl bg-[#C9A227]/10 border border-[#C9A227]/40">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#C9A227] text-[#2B1B14] rounded-xl shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#2B1B14]">
                    Special Program Assets Included (₦22,500 Attributed Value)
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C514B] font-medium mt-1 leading-relaxed">
                    Every enrolled participant receives digital access to three foundational Beyond Salary resources:
                    <strong> Beyond Salary Career Compass</strong> (₦7,500), <strong>Beyond Salary Career to Cash</strong> (₦7,500), and <strong>Beyond Salary AI Prompt Vault</strong> (₦7,500).
                  </p>
                </div>
              </div>
            </div>

            {/* Complete Value Stack Breakdown */}
            <div className="mb-8 p-5 sm:p-6 bg-[#F8F4EC] border border-[#E1D5C5] rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-[#2B1B14] uppercase tracking-wider">
                  Comprehensive Curriculum Value Breakdown
                </h4>
                <span className="text-xs text-[#5C514B] font-semibold">
                  Standard Attributed Value
                </span>
              </div>

              <div className="space-y-2.5">
                {offer.valueStack.map((vItem, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs sm:text-sm text-[#5C514B] gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C9A227] shrink-0 stroke-[3]" />
                      <span>{vItem.name}</span>
                    </div>
                    <span className="font-bold text-[#2B1B14] whitespace-nowrap">
                      {vItem.isBonus ? (
                        <span className="text-[#C9A227] uppercase text-[11px] font-extrabold">BONUS</span>
                      ) : (
                        formatNaira(vItem.value)
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t-2 border-[#E1D5C5] flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#2B1B14]">
                <span>Total Attributed Value:</span>
                <span className="text-base sm:text-lg text-[#C9A227]">
                  {formatNaira(offer.totalAttributedValue)}
                </span>
              </div>
            </div>

            {/* Pricing Section & Single CTA Focus - Genuine Staged Pricing Structure */}
            <div className="bg-[#2B1B14] text-[#F3EDE3] p-6 sm:p-8 rounded-2xl text-center mb-8 border border-[#4A3026]">
              {/* Active Stage Indicator Badge */}
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#FFBE4D] bg-[#3B261D] border border-[#C9A227]/40 px-3.5 py-1 rounded-full mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FFBE4D] inline-block animate-pulse" />
                <span>{stageDisplay.stageBadge}</span>
              </div>

              {/* Pricing Display */}
              <div className="flex flex-wrap items-baseline justify-center gap-3 my-2">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFBE4D] tracking-tight">
                  {formatNaira(activePrice)}
                </span>
                {stageDisplay.comparisonPrice && (
                  <div className="text-xs sm:text-sm text-[#E1D5C5]/80 font-medium">
                    <span>Standard Price: </span>
                    <span className="line-through font-semibold text-[#E1D5C5]">
                      {formatNaira(stageDisplay.comparisonPrice)}
                    </span>
                  </div>
                )}
              </div>

              {/* Transparent Stage Supporting Messaging */}
              <p className="text-xs sm:text-sm text-[#E1D5C5] font-medium mt-1.5 max-w-md mx-auto">
                {stageDisplay.supportingMessage}
              </p>

              {stageDisplay.dateNote && (
                <p className="text-[11px] text-[#FFBE4D] font-semibold mt-1">
                  {stageDisplay.dateNote}
                </p>
              )}

              {/* Call-to-Action Buttons with Dynamic Active Price */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <a
                  href="https://selar.com/beyond-salaryfoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('cta_clicked', { platform: 'selar', price: 10999, profile: assessmentResult.profile });
                    trackEvent('selar_clicked', { offerId: offer.id, price: 10999 });
                  }}
                  className="w-full group inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#D4AF37] text-[#2B1B14] font-black text-sm sm:text-base py-4 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] text-center"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>GET ACCESS — ₦10,999</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="mt-3.5 text-[11px] text-[#EFE6D6] font-medium flex items-center justify-center gap-2">
                <span>🔒 Secure 256-bit encrypted checkout</span>
                <span>•</span>
                <span>Instant cohort confirmation</span>
              </div>
            </div>

            {/* Disclaimer / Guarantee Framing */}
            <div className="p-4.5 bg-[#F8F4EC] border border-[#E1D5C5] rounded-xl text-left text-xs text-[#5C514B] leading-relaxed font-medium">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2B1B14] block mb-0.5">Program Commitment & Integrity Disclaimer:</strong>
                  {CDA_BRAND_CONFIG.guaranteeDisclaimer}
                </div>
              </div>
            </div>
          </div>

          {/* Context Card: What Happens After the Foundation? (Academy Pathways) */}
          <div className="mt-8 p-6 bg-[#FFFFFF] border border-[#E1D5C5] rounded-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#03037E] mb-2">
              <Building2 className="w-4 h-4 text-[#03037E]" />
              <span>Caramel Digital Academy Ecosystem Context</span>
            </div>
            <h4 className="text-base font-bold text-[#2B1B14] mb-2">
              Where do you go after completing {offer.productName}?
            </h4>
            <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium mb-3">
              The next stage introduces practical implementation pathways—including <strong>AI Video Creation</strong>, <strong>AI Website Building</strong>, <strong>Digital Productization</strong>, the <strong>Income Accelerator™</strong>, and the <strong>Sovereign Income Multiplier System™</strong>.
            </p>
            <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium mb-4">
              During the live training, your mentor will help you interpret your personal Beyond Salary Roadmap and guide you toward the logical practical pathway that matches your readiness. You can explore all programs anytime on our main academy portal:
            </p>
            <a
              href={CDA_BRAND_CONFIG.academyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#03037E] hover:text-[#C9A227] transition-colors"
            >
              <span>Explore Caramel Digital Academy (carameldigitals.com)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Secondary Option: Admissions Assistance */}
          <div className="mt-8 text-center p-6 bg-[#FFFFFF] border border-[#E1D5C5] rounded-2xl">
            <h4 className="text-sm font-bold text-[#2B1B14] mb-1 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#C9A227]" />
              <span>Have specific questions before enrolling?</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#5C514B] font-medium max-w-md mx-auto mb-4">
              Want to discuss your diagnostic results or confirm details with our admissions team? We are here to guide you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={CDA_BRAND_CONFIG.supportWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#FFFFFF] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with CDA Admissions on WhatsApp</span>
              </a>
              <a
                href={`mailto:${CDA_BRAND_CONFIG.supportEmail}?subject=Beyond%20Salary%20Scorecard%20Inquiry%20-%20${encodeURIComponent(leadData.fullName || '')}`}
                className="inline-flex items-center gap-2 bg-[#F8F4EC] hover:bg-[#EFE6D6] border border-[#E1D5C5] text-[#2B1B14] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors"
              >
                <span>Email Admissions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Retake & Navigation Footer Section */}
      <section className="py-12 bg-[#F8F4EC] border-t border-[#E1D5C5]">
        <div className="max-w-[840px] mx-auto px-5 text-center">
          <button
            onClick={onRetake}
            className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#EFE6D6] border-2 border-[#2B1B14] text-[#2B1B14] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#C9A227]" />
            <span>Retake the Scorecard Diagnostic</span>
          </button>
        </div>
      </section>

      {/* Direct Enrollment Modal (shown when external payment links are pending configuration) */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-[#2B1B14]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E1D5C5] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A227] bg-[#F8F4EC] px-3 py-1 rounded-full border border-[#E1D5C5] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Priority Enrollment Reservation</span>
            </div>

            <h3 className="text-xl font-bold text-[#2B1B14] mb-2">
              Confirming Enrollment for {offer.productName}
            </h3>

            <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed mb-4">
              You are securing your registration at the {stageDisplay.stageBadge.toLowerCase()} of <strong>{formatNaira(activePrice)}</strong>.
            </p>

            <div className="bg-[#F8F4EC] p-4 rounded-xl border border-[#E1D5C5] text-xs space-y-1.5 mb-5">
              <div><strong>Name:</strong> {leadData.fullName || 'Participant'}</div>
              <div><strong>Email:</strong> {leadData.email || 'On file'}</div>
              <div><strong>WhatsApp:</strong> {leadData.whatsapp || 'On file'}</div>
              <div><strong>Gateway:</strong> {showCheckoutModal.toUpperCase()}</div>
              <div><strong>Program:</strong> {offer.productName}</div>
              <div><strong>Stage:</strong> {offer.stage || 'Beyond Salary Income Foundation'}</div>
            </div>

            <p className="text-[11px] text-[#5C514B] mb-5">
              Our admissions desk will immediately dispatch your secure payment invoice and onboarding instructions directly to <strong>{leadData.email}</strong> and <strong>{leadData.whatsapp}</strong>.
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href={`${CDA_BRAND_CONFIG.supportWhatsAppLink}&text=Hello%2C%20I%20want%20to%20complete%20my%20enrollment%20for%20${encodeURIComponent(offer.productName)}%20(${formatNaira(activePrice)})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#FFFFFF] font-bold text-sm py-3.5 px-4 rounded-xl transition-colors text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Instantly on WhatsApp</span>
              </a>

              <button
                onClick={() => setShowCheckoutModal(null)}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-[#5C514B] hover:text-[#2B1B14] transition-colors cursor-pointer"
              >
                Close & Return to Diagnostic Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
