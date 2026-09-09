import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  ChevronDown,
  Sparkles, 
  Check,
  HelpCircle,
  ShieldCheck,
  Clock,
  Lock
} from 'lucide-react';
import { ResilientArchitectureIcons } from './ResilientArchitectureIcons';
import { SalaryDrainCategories } from './SalaryDrainCategories';
import { IncomeOpportunityFinder } from './IncomeOpportunityFinder';
import { SocialProofSection } from './SocialProofSection';
import { FaqSection } from './FaqSection';
import { StickyScorecardBar } from './StickyScorecardBar';

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToReality = () => {
    const el = document.getElementById('relatable-reality');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const frustratedAttempts = [
    'Tried a side hustle',
    'Joined an online training',
    'Explored Forex or Crypto',
    'Network marketing / MLM',
    'Buying and selling products',
    'Started a business that drained time',
    'Chased an opportunity promising quick income'
  ];

  const benefits = [
    'How dependent you are on your current salary',
    'Where your financial safety gap may be',
    'How ready you are to build an additional income stream',
    'What may be holding you back',
    'Your biggest Beyond Salary bottleneck',
    'The practical next step you should consider'
  ];

  const resultCards = [
    {
      tag: 'Profile 01',
      title: 'The Salary Survivor',
      desc: 'Heavily dependent on one paycheck. Your first priority is creating a safety runway, protecting your family, and cutting out distracting shiny objects.'
    },
    {
      tag: 'Profile 02',
      title: 'The Income Explorer',
      desc: 'You know one salary is risky and are actively searching for the right single pathway without spreading yourself thin or wasting money.'
    },
    {
      tag: 'Profile 03',
      title: 'The Ready But Stuck',
      desc: 'You already possess valuable professional knowledge and skills, but struggle with packaging an offer and converting ability into paying income.'
    },
    {
      tag: 'Profile 04',
      title: 'The Income Builder',
      desc: 'Already earning outside your job. Your next focus is stability, repeatable operating systems, and scalable digital leverage.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Answer a few simple questions',
      desc: 'Tell us about your current income situation, financial safety, skills and readiness.'
    },
    {
      num: '02',
      title: 'Get your personalised score',
      desc: 'Your answers will be analysed across four important areas of income security.'
    },
    {
      num: '03',
      title: 'Discover your biggest bottleneck',
      desc: 'Find out what may be keeping you dependent on one income source.'
    },
    {
      num: '04',
      title: 'Get your recommended next step',
      desc: 'Receive practical guidance based on your current situation.'
    }
  ];

  const whoItsFor = [
    "You're employed and want another income stream, without quitting your job.",
    "You carry responsibilities for your family or dependents and feel the monthly squeeze.",
    "You've recently experienced job uncertainty or company restructuring and want more financial runway.",
    "You feel vulnerable knowing that if your one salary stops, survival mode begins.",
    "You've tried side hustles before, but nothing has stuck consistently.",
    "You want a real, sellable skill and a practical system you can build step-by-step."
  ];

  const notForYou = [
    "Looking for a get-rich-quick opportunity",
    "Expecting guaranteed income without learning, effort or consistency",
    "Looking for someone to magically solve your financial problems for you",
    "Only interested in shortcuts, hype or overnight success",
    "Unwilling to honestly assess your current situation",
    "Looking for a reason to quit your job without a practical plan",
    "Not ready to take responsibility for building additional income options"
  ];

  return (
    <div className="w-full text-[#211A17] font-['Montserrat']">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION
          Background: Rich Espresso Brown #2B1B14
          Focus: High contrast, warm dark luxury, empathy, no premature quiz CTA
      ========================================================================= */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-[#2B1B14] text-[#F3EDE3] border-b border-[#4A3026]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              {/* Eyebrow with Premium Subtle Sequence Animation */}
              <div className="flex items-center gap-3 mb-6">
                {/* 1 & 2: Thin Antique Gold line #C9A227 expanding smoothly into place */}
                <motion.div
                  initial={shouldReduceMotion ? { width: 32, opacity: 1 } : { width: 0, opacity: 0 }}
                  animate={{ width: 32, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] bg-[#C9A227] rounded-full shrink-0 shadow-[0_0_8px_rgba(201,162,39,0.4)]"
                  aria-hidden="true"
                />

                {/* 3 & 4: Eyebrow badge container with soft drop shadow and fade/upward motion */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                  className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm font-semibold bg-[#38231A] border border-[#C9A227]/40 px-3.5 sm:px-4 py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#C9A227] shadow-[0_0_6px_#C9A227] shrink-0" />
                  <span className="tracking-wider uppercase text-[11px] md:text-xs font-semibold text-[#F8F4EC]">
                    FOR AFRICAN PROFESSIONALS WHO WANT
                  </span>
                  <motion.span
                    initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    animate={
                      shouldReduceMotion
                        ? { scale: 1, opacity: 1 }
                        : {
                            scale: [0.5, 1.25, 0.94, 1.06, 1],
                            opacity: [0, 1, 1, 1, 1],
                          }
                    }
                    transition={{
                      duration: 0.9,
                      delay: 0.55,
                      times: [0, 0.45, 0.7, 0.88, 1],
                      ease: "easeOut",
                    }}
                    className="inline-flex items-center origin-center"
                  >
                    <motion.span
                      animate={
                        shouldReduceMotion
                          ? { scale: 1 }
                          : {
                              scale: [1, 1.07, 1],
                            }
                      }
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2.4,
                        delay: 1.6,
                        ease: "easeInOut",
                      }}
                      className="inline-flex items-center gap-1 font-bold text-[11px] md:text-xs tracking-wider uppercase text-[#C9A227]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A227] shrink-0 inline-block drop-shadow-[0_0_6px_rgba(201,162,39,0.7)]" />
                      <span className="shimmer-gold-text">
                        MORE FINANCIAL OPTIONS
                      </span>
                    </motion.span>
                  </motion.span>
                </motion.div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-bold text-[#F8F4EC] leading-[1.15] tracking-tight">
                YOU'VE DONE EVERYTHING RIGHT.
                <span className="block mt-2 text-[#EFE6D6]">
                  SO WHY DOES ONE SALARY STILL FEEL SO UNSAFE?
                </span>
              </h1>

              {/* Subheadline */}
              <div className="mt-6 space-y-3 text-base md:text-lg text-[#F3EDE3] leading-relaxed">
                <p>
                  You went to school. You got the job. You work hard and carry your responsibilities.
                </p>
                <p>
                  But somehow, the money comes in, the bills take over, and before the month ends, you are waiting for the next salary again.
                </p>
                <p className="text-[#E1D5C5] text-sm md:text-base font-medium">
                  And deep down, there is a question you may not always say out loud:
                </p>
              </div>

              {/* Emphasized Question */}
              <div className="mt-5 p-5 rounded-2xl bg-[#38241B] border-l-4 border-[#C9A227] shadow-sm">
                <p className="text-lg md:text-xl font-bold text-[#C9A227] italic">
                  "What happens if this one income suddenly stops?"
                </p>
              </div>

              {/* Supporting Text */}
              <div className="mt-6 space-y-2 text-sm md:text-base text-[#F3EDE3] leading-relaxed">
                <p className="font-semibold text-[#F8F4EC]">
                  You are not lazy. You are not failing. And you are not wrong for having a job.
                </p>
                <p className="text-[#E1D5C5]">
                  But when too much of your life depends on one source of income, even a good salary can start to feel unsafe.
                </p>
              </div>

              {/* Primary CTA Buttons & Trust Signals */}
              <div className="mt-8 space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    onClick={onStart}
                    className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#DFB943] via-[#C9A227] to-[#B88E18] hover:from-[#E8C654] hover:to-[#C9A227] text-[#2B1B14] font-bold text-base px-8 py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(201,162,39,0.38),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-200 active:scale-98 cursor-pointer"
                  >
                    <span className="tracking-wide">START FREE SCORECARD</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={scrollToReality}
                    className="flex items-center justify-center gap-2 bg-[#38241B] hover:bg-[#452D22] text-[#EFE6D6] font-semibold text-sm px-6 py-4 rounded-xl border border-[#C9A227]/30 transition-all cursor-pointer"
                  >
                    <span>Read The Story</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#E1D5C5] font-medium pt-1">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
                    100% Free
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                    ~5 Minutes
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-[#C9A227]" />
                    100% Confidential
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                    Instant Result
                  </span>
                </div>
              </div>
            </div>

            {/* Calm, Relatable Visual Hero Concept */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[420px] bg-[#FFFFFF] border border-[#E1D5C5] rounded-3xl p-6 sm:p-7 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.45)] text-[#211A17]">
                <div className="flex items-center justify-between pb-4 border-b border-[#E1D5C5]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2B1B14]">
                    The Reality of One Salary
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2B1B14] bg-[#EFE6D6] px-2.5 py-0.5 rounded-full border border-[#E1D5C5]">
                    <Sparkles className="w-3 h-3 text-[#C9A227]" />
                    <span>The Shift</span>
                  </span>
                </div>

                {/* Conceptual Graphic: Single Point of Failure vs Multiple Options */}
                <div className="my-5 space-y-4">
                  {/* Vulnerable State */}
                  <div className="p-4 rounded-2xl bg-[#F8F4EC] border border-[#E1D5C5]">
                    <div className="flex items-center justify-between text-xs font-bold text-[#5C514B] mb-2">
                      <span className="tracking-wider uppercase text-[11px]">The Current Reality</span>
                      <span className="inline-flex items-center gap-1 text-[#8B3E1E] bg-[#8B3E1E]/10 px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#8B3E1E]/20">
                        1 Single Dependency
                      </span>
                    </div>
                    <div className="w-full bg-[#E1D5C5] h-3 rounded-full overflow-hidden mb-2.5">
                      <div className="bg-[#2B1B14] h-full w-[95%] rounded-full"></div>
                    </div>
                    <p className="text-xs text-[#5C514B] leading-relaxed font-medium">
                      One employer carrying 100% of your rent, family, bills, and lifestyle. If this stops, everything stalls.
                    </p>
                  </div>

                  {/* Transition Indicator */}
                  <div className="flex justify-center text-[#C9A227]">
                    <div className="w-8 h-8 rounded-full bg-[#EFE6D6] border border-[#C9A227]/40 flex items-center justify-center text-xs font-bold text-[#2B1B14] shadow-xs">
                      ↓
                    </div>
                  </div>

                  {/* Built Options State */}
                  <div className="p-4 rounded-2xl bg-[#F8F4EC] border border-[#C9A227]/70 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-[#2B1B14] mb-2.5">
                      <span className="tracking-wider uppercase text-[11px]">The Resilient Architecture</span>
                      <span className="inline-flex items-center gap-1 text-[#2B1B14] bg-[#C9A227]/25 px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#C9A227]/40">
                        3 Built Options
                      </span>
                    </div>
                    
                    {/* 3D Animated Resilient Architecture Pillars */}
                    <ResilientArchitectureIcons />
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-xs text-[#5C514B] font-medium leading-normal">
                    No panic. No quitting your job. <strong className="text-[#2B1B14] block sm:inline">Building options before you desperately need them.</strong>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: RELATABLE REALITY
          Background: Warm Ivory #F8F4EC
          Focus: High readability, Deep Charcoal text #211A17, Rich Espresso Headings #2B1B14
      ========================================================================= */}
      <section id="relatable-reality" className="py-16 md:py-24 bg-[#F8F4EC] border-b border-[#E1D5C5]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-3 block">
              Step 1 • The Daily Reality
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B14] leading-tight">
              YOUR SALARY COMES IN.
              <span className="block mt-1">YOUR RESPONSIBILITIES TAKE IT.</span>
              <span className="block mt-1 text-[#5C514B]">THEN YOU WAIT FOR THE NEXT ONE.</span>
            </h2>

            <div className="mt-6 space-y-4 text-base md:text-lg text-[#211A17] leading-relaxed">
              <p>Every month, the same cycle begins.</p>
              <p>You work hard. You wait for your salary.</p>
              <p>And when it finally arrives, you already know where most of it is going:</p>
            </div>

            {/* 3D Animated Expense Responsibilities Taking The Salary */}
            <SalaryDrainCategories />

            <p className="mt-8 text-base md:text-lg text-[#211A17] leading-relaxed">
              Before you know it, you are counting down to the next salary again.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E1D5C5] max-w-2xl shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wider text-[#5C514B] mb-1">
                And sometimes, you may quietly ask yourself:
              </p>
              <p className="text-xl md:text-2xl font-bold text-[#2B1B14] italic mb-4">
                "What exactly am I doing wrong?"
              </p>

              <div className="pt-4 border-t border-[#E1D5C5]">
                <p className="text-sm font-bold text-[#C9A227] uppercase tracking-wide mb-1">
                  The truth?
                </p>
                <p className="text-base text-[#211A17] leading-relaxed font-medium">
                  You may not be doing anything wrong. You may simply be operating with <strong className="text-[#2B1B14]">only one financial option</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE HIDDEN FEAR
          Background: Soft Cream #EFE6D6
          Focus: What happens if salary stops tomorrow? Dependents & responsibilities
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#EFE6D6] border-b border-[#E1D5C5]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-3 block">
              Step 2 • The Hidden Vulnerability
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B14] leading-tight">
              THE QUESTION MOST PEOPLE DON'T WANT TO ASK OUT LOUD
            </h2>

            <div className="mt-6 space-y-4 text-base md:text-lg text-[#211A17] leading-relaxed">
              <p className="font-bold text-[#2B1B14] text-lg sm:text-xl">
                If your salary stopped tomorrow...
              </p>
              <p>
                How long could you realistically survive without borrowing money?
              </p>
            </div>

            {/* Realistic Questions Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E1D5C5] shadow-2xs">
                <span className="text-xs font-bold text-[#C9A227] block mb-1">Impact #1</span>
                <span className="text-sm font-bold text-[#211A17]">What happens to your rent?</span>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E1D5C5] shadow-2xs">
                <span className="text-xs font-bold text-[#C9A227] block mb-1">Impact #2</span>
                <span className="text-sm font-bold text-[#211A17]">What happens to your family?</span>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E1D5C5] shadow-2xs">
                <span className="text-xs font-bold text-[#C9A227] block mb-1">Impact #3</span>
                <span className="text-sm font-bold text-[#211A17]">What happens to your children?</span>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E1D5C5] shadow-2xs">
                <span className="text-xs font-bold text-[#C9A227] block mb-1">Impact #4</span>
                <span className="text-sm font-bold text-[#211A17]">What happens to your bills?</span>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E1D5C5] shadow-2xs">
                <span className="text-xs font-bold text-[#C9A227] block mb-1">Impact #5</span>
                <span className="text-sm font-bold text-[#211A17]">What happens to your plans?</span>
              </div>
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E1D5C5] shadow-2xs">
                <span className="text-xs font-bold text-[#C9A227] block mb-1">Impact #6</span>
                <span className="text-sm font-bold text-[#211A17]">How long before stress peaks?</span>
              </div>
            </div>

            <div className="mt-8 space-y-3 text-base md:text-lg text-[#211A17] leading-relaxed">
              <p>
                For most professionals, losing one job does not only affect them. It affects everyone who depends on them.
              </p>
              <p>
                And that is why depending on only one source of income can feel frightening.
              </p>
              <p className="font-bold text-[#2B1B14]">
                Not because your salary is useless — but because one income source may be carrying too much.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE FRUSTRATION / FAILED ATTEMPTS
          Background: Warm Ivory #F8F4EC
          Focus: Validating fatigue from courses, forex, MLM, tiredness of hype
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#F8F4EC] border-b border-[#E1D5C5]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-3 block">
              Step 3 • The Frustration
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B14] leading-tight">
              MAYBE YOU HAVE ALREADY TRIED TO FIX IT.
            </h2>

            <div className="mt-6 space-y-4 text-base md:text-lg text-[#211A17] leading-relaxed">
              <p>Maybe you have tried a side hustle.</p>
              <p>Maybe you joined a training or bought a course online.</p>
              <p>Maybe you tried forex, network marketing, buying and selling, a business, or another opportunity someone promised would change your life.</p>
            </div>

            {/* List of past attempts */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {frustratedAttempts.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-[#FFFFFF] p-3 rounded-xl border border-[#E1D5C5] text-sm text-[#211A17] font-medium shadow-2xs">
                  <span className="text-[#C9A227] font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 text-base md:text-lg text-[#211A17] leading-relaxed">
              <p>
                Maybe you spent money. Maybe you spent valuable time. Maybe nothing really worked consistently.
              </p>
              <p className="font-bold text-[#2B1B14]">
                And now you are tired:
              </p>
              <ul className="space-y-2.5 text-[#211A17] pl-1">
                <li className="flex items-center gap-2.5 font-medium">
                  <span className="text-[#C9A227] font-bold">✕</span>
                  <span>Tired of starting over from scratch.</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <span className="text-[#C9A227] font-bold">✕</span>
                  <span>Tired of wasting money on empty theories.</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <span className="text-[#C9A227] font-bold">✕</span>
                  <span>Tired of jumping from one opportunity to another.</span>
                </li>
              </ul>

              <div className="pt-4 p-5 rounded-2xl bg-[#FFFFFF] border border-[#E1D5C5] shadow-sm">
                <p className="text-base md:text-lg font-bold text-[#2B1B14]">
                  You do not want another random promise. You want something practical. Something real. Something you can actually build without quitting your job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THE CORE REFRAME / CLARITY
          Background: Soft Cream #EFE6D6
          Focus: Don't need another opportunity, you need clarity
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#EFE6D6] border-b border-[#E1D5C5]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-3 block">
              Step 4 • The Core Reframe
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B14] leading-tight">
              YOU DO NOT NEED ANOTHER RANDOM OPPORTUNITY.
              <span className="block mt-1 text-[#C9A227]">YOU NEED CLARITY.</span>
            </h2>

            <div className="mt-6 space-y-4 text-base md:text-lg text-[#211A17] leading-relaxed">
              <p className="font-bold text-[#2B1B14]">
                Before you start another side hustle... Before you pay for another training... Before you chase another opportunity...
              </p>
              <p>
                You need to understand where you are right now.
              </p>
            </div>

            {/* Reflection questions cards */}
            <div className="mt-6 space-y-3">
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E1D5C5] flex items-start gap-3 shadow-2xs">
                <HelpCircle className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <span className="text-sm md:text-base font-semibold text-[#211A17]">
                  What is currently making you financially vulnerable?
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E1D5C5] flex items-start gap-3 shadow-2xs">
                <HelpCircle className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <span className="text-sm md:text-base font-semibold text-[#211A17]">
                  What is keeping you dependent on one single employer or income source?
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E1D5C5] flex items-start gap-3 shadow-2xs">
                <HelpCircle className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <span className="text-sm md:text-base font-semibold text-[#211A17]">
                  Do you already have a marketable skill you can build on, or do you need a new one?
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E1D5C5] flex items-start gap-3 shadow-2xs">
                <HelpCircle className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <span className="text-sm md:text-base font-semibold text-[#211A17]">
                  Do you already have knowledge, but struggle to package it into paying income?
                </span>
              </div>
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-[#FFFFFF] border-l-4 border-[#C9A227] shadow-sm">
              <p className="text-base md:text-lg font-bold text-[#2B1B14]">
                Because you cannot create a clear plan if you do not clearly understand your starting point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          QUICK WIN: THE 10-MINUTE INCOME OPPORTUNITY FINDER™
          Background: Warm Ivory #F8F4EC
          Includes: 4 Steps, Interactive Challenge Card, Micro-Win & Transition
      ========================================================================= */}
      <IncomeOpportunityFinder onTakeScorecard={onStart} />

      {/* =========================================================================
          SECTION 6: INTRODUCE THE BEYOND SALARY SCORECARD™ (FIRST MAJOR CTA)
          Background: Rich Espresso Brown #2B1B14
          Focus: High-impact dark luxury presentation, Antique Gold CTA
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#2B1B14] text-[#F3EDE3] border-b border-[#4A3026]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-2 block">
                The Practical Solution
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F8F4EC] leading-tight">
                THE BEYOND SALARY SCORECARD™
                <span className="block mt-1 text-[#EFE6D6]">WILL HELP YOU SEE THE BIGGER PICTURE.</span>
              </h2>

              <p className="mt-4 text-base md:text-lg text-[#F3EDE3] leading-relaxed">
                In about 5 minutes, discover:
              </p>

              <div className="mt-6">
                <div className="space-y-2.5">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[#FFFFFF] p-3 rounded-xl border border-[#E1D5C5] shadow-2xs">
                      <div className="w-5 h-5 rounded-full bg-[#EFE6D6] text-[#2B1B14] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#C9A227] stroke-[3]" />
                      </div>
                      <span className="text-sm md:text-base text-[#211A17] font-semibold leading-snug">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FIRST MAJOR ASSESSMENT CTA */}
              <div className="mt-8">
                <motion.button
                  id="cta-discover-score-1"
                  onClick={onStart}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1 }
                      : {
                          scale: [1, 1.04, 1],
                          boxShadow: [
                            '0 8px 22px -5px rgba(201,162,39,0.35), inset 0 1px 1px rgba(255,255,255,0.35)',
                            '0 14px 30px -4px rgba(201,162,39,0.55), inset 0 1px 1px rgba(255,255,255,0.5)',
                            '0 8px 22px -5px rgba(201,162,39,0.35), inset 0 1px 1px rgba(255,255,255,0.35)',
                          ],
                        }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.055 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#DFB943] via-[#C9A227] to-[#B88E18] hover:from-[#E8C654] hover:to-[#C9A227] text-[#2B1B14] font-bold text-base px-8 py-4 rounded-xl w-full sm:w-auto cursor-pointer select-none origin-center"
                >
                  <span className="tracking-wide">TAKE THE FREE BEYOND SALARY SCORECARD™</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <p className="mt-3 text-xs text-[#EFE6D6] font-medium">
                  It takes approximately 5 minutes.
                </p>
              </div>
            </div>

            {/* Gauge Graphic Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[370px] bg-[#FFFFFF] border border-[#E1D5C5] rounded-3xl p-7 text-center shadow-[0_16px_36px_-10px_rgba(0,0,0,0.45)] text-[#211A17]">
                <div className="flex items-center justify-between pb-3 border-b border-[#E1D5C5] mb-4">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#2B1B14]">
                    Diagnostic Output
                  </span>
                  <span className="text-[11px] font-bold text-[#C9A227] bg-[#EFE6D6] px-2.5 py-0.5 rounded-full border border-[#E1D5C5]">
                    0 — 100 Index
                  </span>
                </div>

                <div className="my-3 relative flex justify-center">
                  <svg viewBox="0 0 240 145" className="w-full max-w-[260px]" role="img" aria-label="Income safety gauge preview">
                    <defs>
                      <linearGradient id="arcGradPrecision" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#8B3E1E" />
                        <stop offset="35%" stopColor="#4A3026" />
                        <stop offset="70%" stopColor="#C9A227" />
                        <stop offset="100%" stopColor="#2E6F40" />
                      </linearGradient>
                    </defs>
                    {/* Background track */}
                    <path 
                      d="M 22 130 A 98 98 0 0 1 218 130" 
                      fill="none" 
                      stroke="#E1D5C5" 
                      strokeWidth="16" 
                      strokeLinecap="round"
                    />
                    {/* Colored calibrated arc */}
                    <path 
                      d="M 22 130 A 98 98 0 0 1 218 130" 
                      fill="none" 
                      stroke="url(#arcGradPrecision)" 
                      strokeWidth="16" 
                      strokeLinecap="round" 
                      strokeDasharray="308" 
                      strokeDashoffset="90"
                    />
                    {/* Calibrated Tick Marks */}
                    <line x1="22" y1="130" x2="34" y2="130" stroke="#FFFFFF" strokeWidth="2" />
                    <line x1="120" y1="32" x2="120" y2="44" stroke="#FFFFFF" strokeWidth="2" />
                    <line x1="218" y1="130" x2="206" y2="130" stroke="#FFFFFF" strokeWidth="2" />

                    {/* Needle with Gold Pivot */}
                    <g style={{ transformOrigin: '120px 130px', transform: 'rotate(22deg)' }}>
                      <line x1="120" y1="130" x2="120" y2="46" stroke="#2B1B14" strokeWidth="4.5" strokeLinecap="round" />
                      <circle cx="120" cy="130" r="10" fill="#2B1B14" />
                      <circle cx="120" cy="130" r="5" fill="#C9A227" />
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-4 gap-1 text-[10px] font-bold text-[#5C514B] mb-4 pb-3 border-b border-[#E1D5C5]">
                  <span>Vulnerable</span>
                  <span>Strained</span>
                  <span className="text-[#C9A227]">Strategic</span>
                  <span className="text-[#2E6F40]">Sovereign</span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-[#2B1B14] bg-[#F8F4EC] border border-[#E1D5C5] px-3.5 py-1.5 rounded-full mb-2.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Personalised to your 20 answers</span>
                </div>

                <p className="text-xs text-[#5C514B] leading-relaxed font-medium">
                  Identifies your primary bottleneck across Dependency, Safety, Skill, and Execution.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 & 8: CORE BRAND MANIFESTO & PHILOSOPHY
          Background: Rich Espresso Brown #2B1B14
          Focus: High-impact unified statement, Antique Gold accents, 4 Option Pillars
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#2B1B14] text-[#F3EDE3] border-b border-[#4A3026]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DFB943] mb-3 block">
              The Beyond Salary Manifesto
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F8F4EC] leading-tight">
              YOUR SALARY IS NOT THE PROBLEM.
              <span className="block mt-1 text-[#DFB943]">THE PROBLEM IS HAVING NO OPTIONS BEYOND IT.</span>
            </h2>

            <div className="mt-6 p-6 sm:p-7 rounded-2xl bg-[#38241B] border border-[#C9A227]/40 shadow-md my-8">
              <p 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-[#DFB943] leading-snug italic"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                "The goal isn't to panic. It's to build options before you desperately need them."
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#EFE6D6] font-medium">
                Not hype. Not overnight promises. Grounded, practical skill and system building.
              </p>
            </div>

            <div className="text-left bg-[#FFFFFF] text-[#211A17] rounded-2xl p-6 sm:p-7 border border-[#E1D5C5] shadow-lg">
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#2B1B14] mb-4 pb-3 border-b border-[#E1D5C5] flex items-center justify-between">
                <span>The 4 Pillars of Resilient Options:</span>
                <span className="text-xs font-medium text-[#5C514B]">What we help you build</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EFE6D6] text-[#2B1B14] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5 text-[#C9A227] stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-[#2B1B14] block">A High-Value Marketable Skill:</strong>
                    <span className="text-xs text-[#5C514B]">Monetizing expertise you already possess.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EFE6D6] text-[#2B1B14] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5 text-[#C9A227] stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-[#2B1B14] block">A Repeatable Operating System:</strong>
                    <span className="text-xs text-[#5C514B]">Predictable delivery that doesn't burn you out.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EFE6D6] text-[#2B1B14] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5 text-[#C9A227] stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-[#2B1B14] block">A 3–6 Month Safety Runway:</strong>
                    <span className="text-xs text-[#5C514B]">A financial buffer so you never panic.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EFE6D6] text-[#2B1B14] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5 text-[#C9A227] stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-[#2B1B14] block">Professional Sovereignty:</strong>
                    <span className="text-xs text-[#5C514B]">Never having to negotiate from fear.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: HOW THE SCORECARD WORKS
          Background: Soft Cream #EFE6D6
          Focus: 4 clear steps on white cards with Antique Gold numerals
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#EFE6D6] border-b border-[#E1D5C5]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-2 block">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B14]">
              HOW THE BEYOND SALARY SCORECARD™ WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-[#FFFFFF] border border-[#E1D5C5] rounded-2xl p-6 shadow-sm hover:border-[#C9A227] transition-colors"
              >
                <div className="text-3xl font-extrabold text-[#C9A227] mb-3">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[#2B1B14] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-[#5C514B] leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              id="cta-discover-score-2"
              onClick={onStart}
              animate={
                shouldReduceMotion
                  ? { scale: 1 }
                  : {
                      scale: [1, 1.04, 1],
                      boxShadow: [
                        '0 8px 22px -5px rgba(201,162,39,0.35), inset 0 1px 1px rgba(255,255,255,0.35)',
                        '0 14px 30px -4px rgba(201,162,39,0.55), inset 0 1px 1px rgba(255,255,255,0.5)',
                        '0 8px 22px -5px rgba(201,162,39,0.35), inset 0 1px 1px rgba(255,255,255,0.35)',
                      ],
                    }
              }
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.055 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#DFB943] via-[#C9A227] to-[#B88E18] hover:from-[#E8C654] hover:to-[#C9A227] text-[#2B1B14] font-bold text-base px-9 py-4 rounded-xl cursor-pointer select-none origin-center"
            >
              <span className="tracking-wide">DISCOVER MY BEYOND SALARY SCORE</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <p className="mt-3 text-xs text-[#5C514B] font-semibold">
              Takes 5 minutes • 100% Free • No obligation
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: EXECUTIVE FIT MATRIX (WHO IT IS FOR VS WHO IT IS NOT FOR)
          Background: Soft Cream #EFE6D6
          Focus: High-impact 2-column comparison, scannable, eliminates mobile scroll fatigue
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#EFE6D6] border-b border-[#E1D5C5]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-2 block">
              Honest Qualification
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B14] leading-tight">
              IS THE BEYOND SALARY SCORECARD™ RIGHT FOR YOU?
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#5C514B] font-medium">
              We built this for professionals ready to build real assets, not those looking for overnight shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Column 1: Built Specifically For You */}
            <div className="bg-[#FFFFFF] border-2 border-[#2E6F40]/30 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-[#E1D5C5] mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#2E6F40]/10 flex items-center justify-center text-[#2E6F40]">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#2B1B14]">
                      This Is Built For You If:
                    </h3>
                    <p className="text-xs text-[#5C514B]">
                      High alignment with sustainable option-building
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {whoItsFor.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#211A17] font-medium leading-relaxed"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#EAF5ED] text-[#2E6F40] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E1D5C5] text-xs font-bold text-[#2E6F40] flex items-center gap-2">
                <span>✓ Perfect fit for the 5-minute diagnostic</span>
              </div>
            </div>

            {/* Column 2: Respectfully Not For You */}
            <div className="bg-[#F8F4EC] border border-[#E1D5C5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-[#E1D5C5] mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#8B3E1E]/10 flex items-center justify-center text-[#8B3E1E] font-bold">
                    ✕
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#2B1B14]">
                      This May Not Be For You If:
                    </h3>
                    <p className="text-xs text-[#5C514B]">
                      Honest expectations to protect your time
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {notForYou.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#5C514B] font-medium leading-relaxed"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#F3EDE3] text-[#8B3E1E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✕
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E1D5C5] text-xs text-[#5C514B] font-medium">
                The Beyond Salary Movement is grounded in practical systems, not hype.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: RESULT PREVIEW
          Background: Warm Ivory #F8F4EC
          Focus: 4 profiles with short preview to maintain curiosity
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#F8F4EC] border-b border-[#E1D5C5]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-2 block">
              Result Profiles Preview
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B14]">
              By The End, You'll Know Exactly Where You Stand
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#5C514B] font-medium">
              Your result will help you understand which stage best describes where you are today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resultCards.map((card, idx) => (
              <div 
                key={idx}
                className="border border-[#E1D5C5] rounded-2xl p-5 bg-[#FFFFFF] shadow-2xs hover:border-[#C9A227] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold text-[#F8F4EC] bg-[#2B1B14] px-2.5 py-0.5 rounded-full mb-3">
                    {card.tag}
                  </span>
                  <h3 className="font-bold text-[#2B1B14] text-base mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#5C514B] leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E1D5C5] text-[11px] font-bold text-[#C9A227]">
                  Detailed breakdown in score report →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SOCIAL PROOF: VOICES OF AFRICAN PROFESSIONALS
          Background: Pure White #FFFFFF
          Focus: High-credibility authentic case reflections & 5-star ratings
      ========================================================================= */}
      <SocialProofSection />

      {/* =========================================================================
          FAQ SECTION: FREQUENTLY ASKED QUESTIONS
          Background: Warm Ivory #F8F4EC
          Focus: Accordion objection busters (job safety, privacy, cost, time)
      ========================================================================= */}
      <FaqSection />

      {/* =========================================================================
          SECTION 13: FINAL CTA
          Background: Rich Espresso Brown #2B1B14
          Focus: Headline in Antique Gold #C9A227, Montserrat Bold, high contrast, decisive CTA
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#2B1B14] text-[#F3EDE3]">
        <div className="max-w-[1080px] mx-auto px-5 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[#C9A227] leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              YOU CAN'T CHANGE WHAT YOU HAVEN'T CLEARLY IDENTIFIED.
            </h2>

            <div className="mt-6 space-y-3 text-sm md:text-base text-[#F3EDE3] leading-relaxed max-w-xl mx-auto font-medium">
              <p>Right now, you may be more prepared than you think.</p>
              <p>Or you may be more financially vulnerable than you realise.</p>
              <p className="text-[#F8F4EC] font-bold">There is only one way to find out.</p>
              <p className="text-[#E1D5C5]">
                Take the free Beyond Salary Scorecard™ and discover where you currently stand. Identify your biggest gap. See your next best move. And start building options beyond your salary.
              </p>
            </div>

            <div className="mt-8">
              <motion.button
                id="cta-discover-score-3"
                onClick={onStart}
                animate={
                  shouldReduceMotion
                    ? { scale: 1 }
                    : {
                        scale: [1, 1.04, 1],
                        boxShadow: [
                          '0 10px 24px -5px rgba(201,162,39,0.4), inset 0 1px 1px rgba(255,255,255,0.35)',
                          '0 16px 34px -4px rgba(201,162,39,0.62), inset 0 1px 1px rgba(255,255,255,0.5)',
                          '0 10px 24px -5px rgba(201,162,39,0.4), inset 0 1px 1px rgba(255,255,255,0.35)',
                        ],
                      }
                }
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.055 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#DFB943] via-[#C9A227] to-[#B88E18] hover:from-[#E8C654] hover:to-[#C9A227] text-[#2B1B14] font-bold text-base md:text-lg px-9 py-4 rounded-xl cursor-pointer select-none origin-center"
              >
                <span className="tracking-wide">DISCOVER MY BEYOND SALARY SCORE</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>

            <p className="mt-4 text-xs text-[#EFE6D6] font-semibold">
              Free • Approximately 5 minutes • Personalised to your answers
            </p>
          </div>
        </div>
      </section>

      {/* Floating Sticky Bar on deep scroll */}
      <StickyScorecardBar onStart={onStart} />

    </div>
  );
};
