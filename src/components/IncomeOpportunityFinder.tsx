import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb, 
  Target, 
  UserCheck, 
  Gift, 
  Copy, 
  Check,
  RotateCcw
} from 'lucide-react';
import { MonetizationLawVisual } from './MonetizationLawVisual';

interface IncomeOpportunityFinderProps {
  onTakeScorecard: () => void;
}

export const IncomeOpportunityFinder: React.FC<IncomeOpportunityFinderProps> = ({ onTakeScorecard }) => {
  const shouldReduceMotion = useReducedMotion();

  // Interactive challenge state (does NOT impact Scorecard scoring)
  const [skill, setSkill] = useState('');
  const [problem, setProblem] = useState('');
  const [person, setPerson] = useState('');
  const [offer, setOffer] = useState('');
  const [copied, setCopied] = useState(false);

  // Common skill suggestions
  const skillChips = [
    'Write',
    'Design',
    'Organize',
    'Teach',
    'Research',
    'Edit',
    'Plan',
    'Sell',
    'Manage social media',
    'Use technology',
    'Solve problems',
    'Explain complicated things simply'
  ];

  // Quick problem transformations
  const problemExamples = [
    {
      skill: 'Graphic design',
      problem: 'Small businesses need professional social media graphics.'
    },
    {
      skill: 'Writing',
      problem: 'Business owners need consistent content but do not have time to create it.'
    },
    {
      skill: 'Excel',
      problem: 'Small businesses need their information organised and easier to understand.'
    },
    {
      skill: 'Video editing',
      problem: 'Coaches and businesses need long videos turned into useful short-form content.'
    }
  ];

  // Quick audience prompts
  const audienceExamples = [
    '“I can help small business owners create better social media content.”',
    '“I can help busy professionals organise their spreadsheets.”',
    '“I can help coaches turn their long videos into short-form content.”',
    '“I can help small businesses create simple branded designs.”'
  ];

  const handleCopyChallenge = () => {
    const text = `MY 10-MINUTE INCOME OPPORTUNITY:\n\n1. Skill: ${skill || '(Not filled)'}\n2. Problem I Solve: ${problem || '(Not filled)'}\n3. Person Who Has It: ${person || '(Not filled)'}\n4. My Simple Offer: ${offer || '(Not filled)'}\n\nFramework: SKILL → PROBLEM → PERSON → OFFER\nCreated with the Beyond Salary Income Opportunity Finder™`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetChallenge = () => {
    setSkill('');
    setProblem('');
    setPerson('');
    setOffer('');
  };

  return (
    <div id="income-opportunity-finder" className="w-full">
      {/* =========================================================================
          SECTION: THE 10-MINUTE INCOME OPPORTUNITY FINDER™
          Background: Warm Ivory #F8F4EC
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#F8F4EC] border-b border-[#E1D5C5] text-[#211A17]">
        <div className="max-w-[1080px] mx-auto px-5">
          
          {/* Section Introduction Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border border-[#C9A227] px-3.5 py-1.5 rounded-full mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#2B1B14]">
                Quick Win • 10-Minute Exercise
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B1B14] tracking-tight leading-tight">
              THE 10-MINUTE INCOME OPPORTUNITY FINDER™
            </h2>

            <p className="mt-3 text-lg md:text-xl font-bold text-[#C9A227]">
              A simple exercise to uncover one skill you may already be able to turn into income.
            </p>

            <div className="mt-6 space-y-4 text-base md:text-lg text-[#211A17] leading-relaxed">
              <p className="font-bold text-[#2B1B14]">
                You may already have something people will pay you for.
              </p>
              <p className="text-[#4A3026] font-semibold text-lg md:text-xl italic">
                You just haven&apos;t packaged it yet.
              </p>
              <p>
                You do not need to start by searching for another random side hustle.
              </p>
              <p>
                Start by looking at what you already know, what you already do well, and what problems you can help someone solve.
              </p>
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E1D5C5] shadow-2xs">
                <p className="font-bold text-[#2B1B14] text-base md:text-lg flex items-center gap-2.5">
                  <Lightbulb className="w-5 h-5 text-[#C9A227] shrink-0" />
                  <span>This 10-minute exercise will help you find one possible income opportunity hiding in plain sight.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Guided Visual Pathway Steps Container */}
          <div className="mt-12 space-y-10">

            {/* -------------------------------------------------------------
                STEP 1: WHAT DO PEOPLE ALREADY ASK YOU FOR HELP WITH?
            ------------------------------------------------------------- */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E1D5C5] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E1D5C5]">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#2B1B14] text-[#DFB943] font-bold text-base flex items-center justify-center shrink-0 shadow-2xs">
                    1
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2B1B14]">
                    WHAT DO PEOPLE ALREADY ASK YOU FOR HELP WITH?
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#5C514B] bg-[#EFE6D6] px-3 py-1 rounded-full uppercase tracking-wider self-start md:self-auto">
                  Audit Existing Strengths
                </span>
              </div>

              <div className="mt-6 text-base text-[#211A17] leading-relaxed space-y-3">
                <p>
                  Think about the things colleagues, friends, family members or business owners already come to you for.
                </p>
                <p className="font-bold text-[#2B1B14]">
                  Maybe you can:
                </p>
              </div>

              {/* Skill chips */}
              <div className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
                {skillChips.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSkill(s)}
                    className={`text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer border ${
                      skill.toLowerCase().includes(s.toLowerCase())
                        ? 'bg-[#2B1B14] text-[#F8F4EC] border-[#2B1B14] shadow-xs'
                        : 'bg-[#F8F4EC] text-[#2B1B14] border-[#E1D5C5] hover:border-[#C9A227] hover:bg-[#FFFFFF]'
                    }`}
                  >
                    + {s}
                  </button>
                ))}
              </div>

              <div className="mt-5 p-4 rounded-xl bg-[#EFE6D6]/60 border border-[#E1D5C5]">
                <p className="text-sm sm:text-base text-[#2B1B14] font-medium leading-relaxed">
                  <strong className="text-[#2B1B14]">The Key Realization:</strong> Something that feels easy to you may be valuable to someone who does not know how to do it.
                </p>
              </div>

              {/* Interactive Step 1 Input */}
              <div className="mt-6">
                <label htmlFor="step-1-input" className="block text-sm font-bold text-[#2B1B14] mb-2">
                  What do people already ask you for help with?
                </label>
                <input
                  id="step-1-input"
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="For example: writing, Canva design, Excel, social media, teaching, organizing..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] focus:border-[#C9A227] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 text-[#211A17] font-medium text-sm sm:text-base transition-all placeholder:text-[#5C514B]/60"
                />
                <p className="mt-2 text-xs text-[#5C514B]">
                  * Optional scratchpad input. This does not affect your formal Scorecard calculation.
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------
                STEP 2: TURN THE SKILL INTO A PROBLEM YOU CAN SOLVE
            ------------------------------------------------------------- */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E1D5C5] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E1D5C5]">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#2B1B14] text-[#DFB943] font-bold text-base flex items-center justify-center shrink-0 shadow-2xs">
                    2
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2B1B14]">
                    TURN THE SKILL INTO A PROBLEM YOU CAN SOLVE
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#5C514B] bg-[#EFE6D6] px-3 py-1 rounded-full uppercase tracking-wider self-start md:self-auto">
                  Shift The Perspective
                </span>
              </div>

              <div className="mt-6 text-base text-[#211A17] leading-relaxed space-y-2">
                <p className="font-bold text-[#2B1B14]">This is where the thinking changes.</p>
                <p>
                  Don&apos;t start with: <span className="line-through text-[#5C514B]">“What skill do I have?”</span>
                </p>
                <p className="text-[#2B1B14] font-bold text-lg">
                  Ask: <span className="text-[#C9A227]">“What problem can I help someone solve with this skill?”</span>
                </p>
              </div>

              {/* Transformation Visual Cards */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {problemExamples.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#F8F4EC] border border-[#E1D5C5] hover:border-[#C9A227] transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#C9A227]">
                        Skill
                      </span>
                      <span className="text-xs font-bold text-[#2B1B14] bg-[#EFE6D6] px-2.5 py-0.5 rounded-md">
                        {item.skill}
                      </span>
                    </div>

                    <div className="my-2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-[#E1D5C5] text-[#2B1B14] flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-[#2B1B14] rotate-90 md:rotate-0" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#8B3E1E] block mb-1">
                        Problem Solved
                      </span>
                      <p className="text-sm font-semibold text-[#2B1B14] leading-snug">
                        {item.problem}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* HIGHLIGHTED VISUAL STORYTELLING: THE FUNDAMENTAL LAW OF MONETIZATION */}
              <MonetizationLawVisual />
            </div>

            {/* -------------------------------------------------------------
                STEP 3: FIND ONE PERSON WHO HAS THAT PROBLEM
            ------------------------------------------------------------- */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E1D5C5] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E1D5C5]">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#2B1B14] text-[#DFB943] font-bold text-base flex items-center justify-center shrink-0 shadow-2xs">
                    3
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2B1B14]">
                    FIND ONE PERSON WHO HAS THAT PROBLEM
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#5C514B] bg-[#EFE6D6] px-3 py-1 rounded-full uppercase tracking-wider self-start md:self-auto">
                  Specific Audience
                </span>
              </div>

              <div className="mt-6 text-base text-[#211A17] leading-relaxed space-y-3">
                <p>
                  You do not need thousands of followers.
                </p>
                <p className="font-bold text-[#2B1B14]">
                  You need to identify one type of person who has the problem you can solve.
                </p>
                <div className="p-4 rounded-xl bg-[#F8F4EC] border-l-4 border-[#C9A227]">
                  <p className="text-base sm:text-lg font-bold text-[#2B1B14]">
                    Complete this sentence:
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-[#C9A227] mt-1">
                    “I can help <span className="underline decoration-[#2B1B14] decoration-2">__________</span> solve <span className="underline decoration-[#2B1B14] decoration-2">__________</span>.”
                  </p>
                </div>
              </div>

              {/* Examples */}
              <div className="mt-5 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C514B] block">
                  Practical Real-Life Examples:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {audienceExamples.map((ex, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E1D5C5] text-sm text-[#211A17] font-semibold flex items-start gap-2.5 shadow-2xs"
                    >
                      <UserCheck className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Step 3 Input */}
              <div className="mt-6">
                <label htmlFor="step-3-input" className="block text-sm font-bold text-[#2B1B14] mb-2">
                  I can help...
                </label>
                <input
                  id="step-3-input"
                  type="text"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                  placeholder="A type of person + the problem you can help them solve"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] focus:border-[#C9A227] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 text-[#211A17] font-medium text-sm sm:text-base transition-all placeholder:text-[#5C514B]/60"
                />
                <p className="mt-2 text-xs text-[#5C514B]">
                  * Optional scratchpad input. This does not affect your formal Scorecard calculation.
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------
                STEP 4: TURN IT INTO ONE SIMPLE OFFER
            ------------------------------------------------------------- */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E1D5C5] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E1D5C5]">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#2B1B14] text-[#DFB943] font-bold text-base flex items-center justify-center shrink-0 shadow-2xs">
                    4
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2B1B14]">
                    TURN IT INTO ONE SIMPLE OFFER
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#5C514B] bg-[#EFE6D6] px-3 py-1 rounded-full uppercase tracking-wider self-start md:self-auto">
                  Package The Solution
                </span>
              </div>

              <div className="mt-6 text-base text-[#211A17] leading-relaxed space-y-3">
                <p className="font-bold text-[#2B1B14]">
                  Now make it specific.
                </p>
                <div className="p-4 rounded-xl bg-[#F8F4EC] border-l-4 border-[#C9A227]">
                  <p className="text-base sm:text-lg font-bold text-[#2B1B14]">
                    Complete this sentence:
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#C9A227] mt-1">
                    “I can help <span className="text-[#2B1B14] underline">[person]</span> achieve <span className="text-[#2B1B14] underline">[result]</span> by <span className="text-[#2B1B14] underline">[what you will do]</span>.”
                  </p>
                </div>
              </div>

              {/* Concrete Example Box */}
              <div className="mt-5 p-5 rounded-2xl bg-[#EFE6D6] border border-[#E1D5C5]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B3E1E] block mb-2">
                  Concrete Example:
                </span>
                <p className="text-base sm:text-lg font-semibold text-[#2B1B14] italic leading-relaxed">
                  “I can help small business owners create 12 professional social media posts each month so they can stay consistent online without having to create everything themselves.”
                </p>
              </div>

              {/* Highlighted Statement */}
              <div className="mt-6 p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#C9A227] shadow-xs text-center">
                <p className="text-base sm:text-lg font-bold text-[#2B1B14]">
                  You do not need to build the whole business today.
                  <span className="block text-[#C9A227] mt-0.5">
                    You just need to identify something useful you can offer.
                  </span>
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------
                YOUR 10-MINUTE CHALLENGE (Premium Interactive Card)
            ------------------------------------------------------------- */}
            <div className="relative p-7 sm:p-10 rounded-3xl bg-[#FFFFFF] border-2 border-[#C9A227] shadow-[0_16px_36px_-10px_rgba(43,27,20,0.18)]">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E1D5C5]">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#EFE6D6] px-3 py-1 rounded-full mb-2 border border-[#E1D5C5]">
                    <Target className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2B1B14]">
                      Interactive Blueprint
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2B1B14]">
                    YOUR 10-MINUTE CHALLENGE
                  </h3>
                  <p className="text-sm text-[#5C514B] font-medium mt-1">
                    Fill in the 4 fields below to formulate your first actionable income offer right now.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handleCopyChallenge}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8F4EC] hover:bg-[#EFE6D6] border border-[#E1D5C5] text-xs font-bold text-[#2B1B14] transition-all cursor-pointer"
                    title="Copy your 4 answers"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2E6F40]" />
                        <span className="text-[#2E6F40]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetChallenge}
                    className="p-2 rounded-xl bg-[#F8F4EC] hover:bg-[#EFE6D6] border border-[#E1D5C5] text-[#5C514B] transition-all cursor-pointer"
                    title="Clear fields"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4 Form Fields */}
              <div className="mt-8 space-y-5">
                {/* Field 1 */}
                <div>
                  <label htmlFor="challenge-skill" className="block text-sm font-bold text-[#2B1B14] mb-1.5 flex items-center justify-between">
                    <span>1. One skill I have:</span>
                    <span className="text-xs text-[#5C514B] font-normal">What you do well</span>
                  </label>
                  <input
                    id="challenge-skill"
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="e.g. Canva design, copywriting, bookkeeping, scheduling, Excel..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] focus:border-[#C9A227] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 text-[#211A17] font-semibold text-sm sm:text-base transition-all"
                  />
                </div>

                {/* Field 2 */}
                <div>
                  <label htmlFor="challenge-problem" className="block text-sm font-bold text-[#2B1B14] mb-1.5 flex items-center justify-between">
                    <span>2. One problem I can solve:</span>
                    <span className="text-xs text-[#5C514B] font-normal">The headache someone has</span>
                  </label>
                  <input
                    id="challenge-problem"
                    type="text"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="e.g. Inconsistent social media posts, messy records, slow client responses..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] focus:border-[#C9A227] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 text-[#211A17] font-semibold text-sm sm:text-base transition-all"
                  />
                </div>

                {/* Field 3 */}
                <div>
                  <label htmlFor="challenge-person" className="block text-sm font-bold text-[#2B1B14] mb-1.5 flex items-center justify-between">
                    <span>3. One person who has that problem:</span>
                    <span className="text-xs text-[#5C514B] font-normal">Specific recipient</span>
                  </label>
                  <input
                    id="challenge-person"
                    type="text"
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                    placeholder="e.g. Local gym owner, real estate agent, busy corporate executive..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] focus:border-[#C9A227] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 text-[#211A17] font-semibold text-sm sm:text-base transition-all"
                  />
                </div>

                {/* Field 4 */}
                <div>
                  <label htmlFor="challenge-offer" className="block text-sm font-bold text-[#2B1B14] mb-1.5 flex items-center justify-between">
                    <span>4. One simple service I could offer:</span>
                    <span className="text-xs text-[#5C514B] font-normal">Your concrete package</span>
                  </label>
                  <input
                    id="challenge-offer"
                    type="text"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder="e.g. I will design 10 ready-to-post banners each month for $150..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] focus:border-[#C9A227] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/20 text-[#211A17] font-semibold text-sm sm:text-base transition-all"
                  />
                </div>
              </div>

              {/* Prominent Framework Display: SKILL → PROBLEM → PERSON → OFFER */}
              <div className="mt-8 pt-6 border-t border-[#E1D5C5]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C514B] block text-center mb-3">
                  The Beyond Salary Monetization Chain
                </span>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-center">
                  <div className="bg-[#2B1B14] text-[#F8F4EC] p-3 rounded-xl border border-[#4A3026]">
                    <span className="text-[10px] uppercase font-bold text-[#DFB943] block">Step 01</span>
                    <span className="text-xs sm:text-sm font-bold">SKILL</span>
                    {skill ? (
                      <span className="text-[11px] text-[#DFB943] block truncate mt-0.5 font-medium">“{skill}”</span>
                    ) : (
                      <span className="text-[10px] text-[#EFE6D6]/70 block mt-0.5">What you know</span>
                    )}
                  </div>

                  <div className="bg-[#FFFFFF] text-[#2B1B14] p-3 rounded-xl border border-[#E1D5C5] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-[#C9A227] block">Step 02</span>
                    <span className="text-xs sm:text-sm font-bold">PROBLEM</span>
                    {problem ? (
                      <span className="text-[11px] text-[#2B1B14] block truncate mt-0.5 font-medium">“{problem}”</span>
                    ) : (
                      <span className="text-[10px] text-[#5C514B] block mt-0.5">What hurts them</span>
                    )}
                  </div>

                  <div className="bg-[#FFFFFF] text-[#2B1B14] p-3 rounded-xl border border-[#E1D5C5] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-[#C9A227] block">Step 03</span>
                    <span className="text-xs sm:text-sm font-bold">PERSON</span>
                    {person ? (
                      <span className="text-[11px] text-[#2B1B14] block truncate mt-0.5 font-medium">“{person}”</span>
                    ) : (
                      <span className="text-[10px] text-[#5C514B] block mt-0.5">Who has the pain</span>
                    )}
                  </div>

                  <div className="bg-[#DFB943]/20 border border-[#C9A227] text-[#2B1B14] p-3 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#8B3E1E] block">Step 04</span>
                    <span className="text-xs sm:text-sm font-bold">OFFER</span>
                    {offer ? (
                      <span className="text-[11px] text-[#2B1B14] block truncate mt-0.5 font-bold">“{offer}”</span>
                    ) : (
                      <span className="text-[10px] text-[#5C514B] block mt-0.5">How you fix it</span>
                    )}
                  </div>
                </div>
                
                <p className="mt-3 text-[11px] text-[#5C514B] text-center font-medium">
                  Free interactive worksheet. No login, sign-up, or card required. Does not alter your scorecard test results.
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------
                MICRO-WIN (Immediately below the challenge)
            ------------------------------------------------------------- */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#EFE6D6] border border-[#E1D5C5] text-[#211A17]">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#2B1B14] text-[#DFB943] flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-[#DFB943]" />
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-[#2B1B14]">
                  You may not have solved your income problem in 10 minutes.
                </h4>

                <p className="text-base text-[#4A3026] font-semibold">
                  But you have done something important.
                </p>

                <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E1D5C5] max-w-md mx-auto text-left shadow-2xs">
                  <div className="space-y-2 text-sm sm:text-base font-semibold">
                    <div className="flex items-center gap-2 text-[#5C514B]">
                      <span className="text-xs font-bold uppercase text-[#8B3E1E] bg-[#8B3E1E]/10 px-2 py-0.5 rounded">
                        From:
                      </span>
                      <span className="line-through">“I need another income.”</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2B1B14]">
                      <span className="text-xs font-bold uppercase text-[#2E6F40] bg-[#2E6F40]/10 px-2 py-0.5 rounded">
                        To:
                      </span>
                      <span className="text-[#2B1B14] font-bold">“I may already have something valuable I can offer.”</span>
                    </div>
                  </div>
                </div>

                <p className="text-base sm:text-lg font-bold text-[#C9A227] tracking-wide">
                  That shift matters.
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------
                TRANSITION TO SCORECARD: "BUT THERE'S ONE MORE PROBLEM..."
            ------------------------------------------------------------- */}
            <div className="p-7 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E1D5C5] shadow-sm">
              <div className="max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B3E1E] mb-2 block">
                  The Real Blindspot
                </span>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2B1B14] leading-tight">
                  BUT THERE&apos;S ONE MORE PROBLEM...
                </h3>

                <div className="mt-5 space-y-4 text-base md:text-lg text-[#211A17] leading-relaxed">
                  <p className="font-bold text-[#2B1B14]">
                    Finding one possible income opportunity is a good start.
                  </p>
                  <p>
                    But it does not answer the bigger questions:
                  </p>
                </div>

                {/* Big Questions Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] text-sm sm:text-base font-semibold text-[#211A17]">
                    • How dependent are you on your current salary?
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] text-sm sm:text-base font-semibold text-[#211A17]">
                    • How financially prepared are you if that income suddenly stops?
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] text-sm sm:text-base font-semibold text-[#211A17]">
                    • Do you have a skill that can realistically be turned into income?
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8F4EC] border border-[#E1D5C5] text-sm sm:text-base font-semibold text-[#211A17]">
                    • Is your biggest challenge skill, clarity, financial safety or execution?
                  </div>
                </div>

                <div className="mt-6 p-5 rounded-2xl bg-[#EFE6D6]/80 border-l-4 border-[#C9A227]">
                  <p className="text-base sm:text-lg font-bold text-[#2B1B14]">
                    And perhaps most importantly:
                  </p>
                  <p className="text-lg sm:text-xl font-extrabold text-[#C9A227] mt-1">
                    What should you focus on first?
                  </p>
                </div>

                <div className="mt-6 space-y-3 text-base md:text-lg text-[#211A17] leading-relaxed">
                  <p className="font-bold text-[#2B1B14]">
                    You cannot change what you have not clearly identified.
                  </p>
                  <p>
                    That&apos;s why the next step is not another list of side hustles.
                  </p>
                  <p className="font-extrabold text-[#2B1B14] text-lg sm:text-xl">
                    It is a personal diagnosis.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
