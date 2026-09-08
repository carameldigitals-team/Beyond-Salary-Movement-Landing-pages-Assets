import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Compass, 
  Target, 
  TrendingUp,
  Layers,
  Clock,
  Award,
  Zap,
  Check
} from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  const billChips = [
    'Rent', 'Food', 'Transport', 'School fees', 
    'Family responsibilities', 'Utility bills', 'Savings, if anything is left'
  ];

  const familiarItems = [
    'You depend almost entirely on your monthly salary.',
    'Your salary barely stretches to the end of the month.',
    'You worry about what would happen if you lost your job.',
    'You have little or no emergency savings.',
    "You've tried side hustles that didn't work consistently.",
    'You see people making money online and wonder what you are missing.',
    'You want a skill that creates income, but do not know where to start.',
    'You are interested in digital skills or AI, but not sure you are "techy enough".',
    'You are tired of jumping from one opportunity to another.',
    'You want something practical, real, and buildable.'
  ];

  const pillars = [
    {
      num: 1,
      title: 'Salary Dependency Level',
      desc: 'How dependent you are on one single employer or income source.'
    },
    {
      num: 2,
      title: 'Financial Safety Level',
      desc: 'How prepared you are for emergencies, unexpected health bills, or job loss.'
    },
    {
      num: 3,
      title: 'Income Readiness Level',
      desc: 'Whether you have a marketable skill or pathway to earn outside your job.'
    },
    {
      num: 4,
      title: 'Your Execution Gap',
      desc: 'What is stopping you from turning intention and knowledge into consistent income.'
    }
  ];

  const resultCards = [
    {
      tag: 'Profile 1',
      title: 'The Salary Survivor',
      desc: 'Heavily dependent on one income source. Highest priority: safety cushion, clarity, and stopping random distractions.'
    },
    {
      tag: 'Profile 2',
      title: 'The Income Explorer',
      desc: 'You know you need more income — still searching for the right single pathway without spreading yourself thin.'
    },
    {
      tag: 'Profile 3',
      title: 'The Ready But Stuck',
      desc: 'You have valuable skills, but struggle with packaging an offer and finding paying clients.'
    },
    {
      tag: 'Profile 4',
      title: 'The Income Builder',
      desc: 'Already generating extra revenue. Your next frontier: consistency, systems, and productized scale.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Answer 20 simple questions',
      desc: 'About your income stability, financial runway, skills, and current execution.'
    },
    {
      num: '02',
      title: 'Get your personalised score',
      desc: 'A comprehensive 0–100 score benchmarked across four income security pillars.'
    },
    {
      num: '03',
      title: 'Discover your biggest bottleneck',
      desc: 'Pinpoint the single greatest constraint keeping you tied to one paycheck.'
    },
    {
      num: '04',
      title: 'Get your 7-day action plan',
      desc: 'Practical, milestone-driven guidance and structured next steps.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-10 pb-16 md:py-20 bg-[radial-gradient(640px_360px_at_85%_-10%,rgba(0,163,255,0.12),transparent_70%)]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#03037E] bg-[#F3F8FF] border border-[#E1E7F7] px-3.5 py-1.5 rounded-full mb-5">
                <span className="w-2 h-2 rounded-full bg-[#FFBE4D] animate-pulse"></span>
                <span>The Beyond Salary Scorecard™ — Free, 5 minutes</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#101040] leading-[1.12] tracking-tight">
                How safe is your <span className="text-[#03037E]">income?</span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-[#4A4C78] leading-relaxed max-w-xl">
                Take the 5-minute Beyond Salary Scorecard™ to discover how financially vulnerable you are when your life depends on one income source, identify what's keeping you stuck, and find your clearest next step toward building income beyond your salary.
              </p>

              <div className="mt-6 space-y-2 text-sm text-[#7476A6]">
                <div className="flex items-center gap-2">
                  <span className="text-[#00A3FF] font-bold">•</span>
                  <span>You don't need to quit your job.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00A3FF] font-bold">•</span>
                  <span>You don't need another random side hustle.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00A3FF] font-bold">•</span>
                  <span>You don't need to figure everything out overnight.</span>
                </div>
                <div className="pt-1 text-[#101040] font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00A3FF]" />
                  <span>You simply need to understand where you are right now, and identify the smartest next step.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button 
                  onClick={onStart}
                  className="group flex items-center justify-center gap-2.5 bg-[#03037E] hover:bg-[#020254] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-[#03037E]/25 transition-all duration-200 active:scale-95 w-full sm:w-auto"
                >
                  <span>Take the Free Scorecard</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="mt-3 text-xs text-[#8082AC]">
                Free. Takes less than 5 minutes. <strong className="text-[#03037E]">Get your personalised result instantly.</strong>
              </div>
            </div>

            {/* Gauge Preview Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] bg-[#F3F8FF] border border-[#E1E7F7] rounded-2xl p-7 text-center shadow-sm relative overflow-hidden">
                <div className="text-xs font-bold tracking-wider uppercase text-[#03037E] mb-2">
                  Your Beyond Salary Score
                </div>

                <div className="my-4 relative flex justify-center">
                  <svg viewBox="0 0 220 130" className="w-full max-w-[240px]" role="img" aria-label="Income safety gauge preview">
                    <defs>
                      <linearGradient id="arcGradPreview" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#03037E" />
                        <stop offset="55%" stopColor="#00A3FF" />
                        <stop offset="100%" stopColor="#FFBE4D" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M 14 118 A 96 96 0 0 1 206 118" 
                      fill="none" 
                      stroke="#E1E7F7" 
                      strokeWidth="16" 
                      strokeLinecap="round"
                    />
                    <path 
                      d="M 14 118 A 96 96 0 0 1 206 118" 
                      fill="none" 
                      stroke="url(#arcGradPreview)" 
                      strokeWidth="16" 
                      strokeLinecap="round" 
                      strokeDasharray="302" 
                      strokeDashoffset="90"
                    />
                    <g style={{ transformOrigin: '110px 118px', transform: 'rotate(20deg)', transition: 'transform 1s ease' }}>
                      <line x1="110" y1="118" x2="110" y2="42" stroke="#101040" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="110" cy="118" r="7" fill="#101040" />
                    </g>
                  </svg>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-[#8082AC] bg-white border border-[#E1E7F7] px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFBE4D]" />
                  <span>Personalised to your 20 answers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bill & Risk Section */}
      <section className="py-14 md:py-18 bg-white border-t border-[#E1E7F7]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="flex flex-wrap gap-2 mb-6">
            {billChips.map((chip, idx) => (
              <span 
                key={idx} 
                className="bg-[#F3F8FF] border border-[#E1E7F7] rounded-lg px-3.5 py-1.5 text-xs md:text-sm font-medium text-[#101040]"
              >
                {chip}
              </span>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101040] leading-snug max-w-2xl">
            Your salary isn't the problem. Depending on only one income source is the risk.
          </h2>

          <p className="mt-4 text-base text-[#4A4C78] max-w-3xl leading-relaxed">
            Most people work hard every month, receive their salary, and immediately start calculating. Then the next month comes and the cycle begins again. The problem isn't that you're lazy or haven't worked hard enough.
          </p>

          <div className="mt-5 p-4 rounded-xl bg-[#F3F8FF] border-l-4 border-[#03037E] max-w-2xl">
            <div className="text-lg md:text-xl font-bold text-[#03037E]">
              What happens if that one income suddenly stops?
            </div>
            <p className="mt-2 text-sm text-[#4A4C78] leading-relaxed">
              If your job disappeared tomorrow, how long could you realistically survive? Would you have options — or would you be forced straight into survival mode? The Beyond Salary Scorecard™ helps you see the answer clearly.
            </p>
          </div>
        </div>
      </section>

      {/* Does Any Of This Sound Familiar */}
      <section className="py-14 md:py-18 bg-[#F3F8FF]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] mb-2">Self-Diagnostic</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101040]">Does any of this sound familiar?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {familiarItems.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-3.5 bg-white border border-[#E1E7F7] rounded-xl text-sm text-[#101040] hover:border-[#00A3FF]/40 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#00A3FF] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  ✓
                </div>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-base md:text-lg font-bold text-[#03037E]">
            If you nodded while reading this, this scorecard was created for you.
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] mb-2">The Framework</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101040]">
              Introducing the Beyond Salary Scorecard™
            </h2>
            <p className="mt-3 text-base text-[#4A4C78]">
              A simple diagnostic to help you understand how vulnerable or prepared you currently are when it comes to your income. In less than 5 minutes, you'll discover:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar) => (
              <div 
                key={pillar.num}
                className="bg-white border border-[#E1E7F7] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 rounded-full bg-[#03037E] text-white flex items-center justify-center font-bold text-sm mb-4">
                  {pillar.num}
                </div>
                <h3 className="font-bold text-[#101040] text-base mb-2">{pillar.title}</h3>
                <p className="text-xs md:text-sm text-[#4A4C78] leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not another quiz callout */}
      <section className="py-14 md:py-18 bg-[#F3F8FF] border-y border-[#E1E7F7]">
        <div className="max-w-[720px] mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101040]">
            This is not another side hustle quiz.
          </h2>
          <p className="mt-4 text-base text-[#4A4C78] leading-relaxed">
            The internet is full of opportunities — learn this, try that, trade this, sell that, use this AI tool. Many people become more confused than when they started.
          </p>
          <p className="mt-3 text-base text-[#4A4C78] leading-relaxed">
            The Beyond Salary Scorecard™ is different. It doesn't tell you to jump into another opportunity — it helps you understand your current position first.
          </p>
          <p className="font-accent text-xl md:text-2xl text-[#03037E] mt-6">
            "Because you can't create a clear plan if you don't know where you're starting from."
          </p>
        </div>
      </section>

      {/* Result Profiles Preview */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] mb-2">Four Clear Profiles</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101040]">
              By the end, you'll know exactly where you stand
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resultCards.map((card, idx) => (
              <div 
                key={idx}
                className="border border-[#E1E7F7] rounded-2xl p-5 bg-white hover:border-[#00A3FF]/50 transition-colors"
              >
                <span className="inline-block text-[11px] font-bold text-white bg-[#00A3FF] px-2.5 py-0.5 rounded-full mb-3">
                  {card.tag}
                </span>
                <h3 className="font-bold text-[#101040] text-base mb-2">{card.title}</h3>
                <p className="text-xs text-[#4A4C78] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Callout */}
      <section className="py-10">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="bg-[#03037E] text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold !text-[#FFBE4D] max-w-2xl leading-snug"
                style={{ color: '#FFBE4D', fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
              >
                The goal isn't to panic. It's to build options before you desperately need them.
              </h2>
              <p className="mt-4 text-sm md:text-base text-[#C7CBF5] max-w-2xl leading-relaxed">
                Your salary can be your foundation while you build something else. The goal is to stop letting one paycheck be the only thing standing between you and financial difficulty.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                <div className="flex items-start gap-2.5 text-sm text-[#E7E9FB]">
                  <span className="text-[#FFBE4D] font-bold text-lg leading-none">+</span>
                  <span>You have a skill you can use to earn.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#E7E9FB]">
                  <span className="text-[#FFBE4D] font-bold text-lg leading-none">+</span>
                  <span>You have another reliable way to create income.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#E7E9FB]">
                  <span className="text-[#FFBE4D] font-bold text-lg leading-none">+</span>
                  <span>You're building an asset that belongs directly to you.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#E7E9FB]">
                  <span className="text-[#FFBE4D] font-bold text-lg leading-none">+</span>
                  <span>You're no longer fully dependent on one employer's decision.</span>
                </div>
              </div>

              <div className="mt-8 text-base font-bold text-[#FFBE4D]">
                Not hype. Not overnight success. Building options.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-14 md:py-18 bg-[#F3F8FF]">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-2xl mx-auto bg-white border border-[#E1E7F7] rounded-2xl p-7 md:p-9 shadow-sm">
            <h3 className="text-xl font-bold text-[#03037E] mb-5">
              The scorecard is for you if...
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-[#101040]">
                <span className="text-[#00A3FF] font-bold text-base leading-none">✓</span>
                <span>You're employed and want another income stream, without quitting.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#101040]">
                <span className="text-[#00A3FF] font-bold text-base leading-none">✓</span>
                <span>You've recently experienced job uncertainty and want more financial runway.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#101040]">
                <span className="text-[#00A3FF] font-bold text-base leading-none">✓</span>
                <span>You feel vulnerable depending on one salary every month.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#101040]">
                <span className="text-[#00A3FF] font-bold text-base leading-none">✓</span>
                <span>You've tried side hustles before, but nothing has stuck consistently.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#101040]">
                <span className="text-[#00A3FF] font-bold text-base leading-none">✓</span>
                <span>You want a real, sellable skill and a practical system you can build step-by-step.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="max-w-xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] mb-2">Process</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101040]">
              How the Beyond Salary Scorecard™ works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-3xl font-extrabold text-[#00A3FF]/30 mb-2">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[#101040] mb-2">{step.title}</h3>
                <p className="text-xs md:text-sm text-[#4A4C78] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="bg-gradient-to-b from-[#03037E] to-[#020254] text-white text-center rounded-3xl p-10 md:p-16 shadow-xl">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold !text-[#FFBE4D] max-w-xl mx-auto leading-snug"
              style={{ color: '#FFBE4D', fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
            >
              You can't change what you haven't clearly identified.
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#C7CBF5] max-w-lg mx-auto leading-relaxed">
              Right now, you may be more prepared than you think — or more vulnerable than you realise. There's only one way to find out.
            </p>
            <div className="mt-8">
              <button 
                onClick={onStart}
                className="group inline-flex items-center gap-2 bg-[#FFBE4D] hover:bg-[#ffb336] text-[#03037E] font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-[#FFBE4D]/25 transition-all duration-200 active:scale-95"
              >
                <span>Take the Free Scorecard Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="mt-4 text-xs text-[#AEB3E8]">
              It's 100% free. Takes less than 5 minutes. Your result is personalised.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
