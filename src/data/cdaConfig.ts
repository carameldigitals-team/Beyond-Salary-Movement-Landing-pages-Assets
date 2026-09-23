import { ProfileKey, OfferKey, BottleneckKey } from '../types';

export interface ValueStackItem {
  name: string;
  value: number; // in NGN
  isBonus?: boolean;
}

export type PricingStage = 'preLaunch' | 'launch' | 'standard';

export interface Tier1PricingConfig {
  preLaunch: number;
  launch: number;
  standard: number;
}

export interface Tier1Config {
  name: string;
  stage: string;
  pricing: Tier1PricingConfig;
  pricingStage: PricingStage;
  launchDate: string;
  standardPriceDate: string;
  selarUrl: string;
  paystackUrl: string;
}

/**
 * Centralized Tier 1 Offer Configuration
 * Edit pricing, pricingStage, dates, and checkout URLs here.
 */
export const CDA_TIER1_CONFIG: Tier1Config = {
  name: 'Beyond Salary Foundation: Career to Cash Live Training™',
  stage: 'Beyond Salary Foundation',

  pricing: {
    preLaunch: 10999,
    launch: 14999,
    standard: 24999
  },

  pricingStage: 'preLaunch', // Options: 'preLaunch' | 'launch' | 'standard'

  launchDate: '', // Enter official launch date when available
  standardPriceDate: '', // Enter standard price activation date when available

  selarUrl: 'https://selar.com/beyond-salaryfoundation',
  paystackUrl: ''
};

// Aliased as tier1 matching requested configuration convention
export const tier1 = CDA_TIER1_CONFIG;

/**
 * Returns the currently active Tier 1 price based on active pricingStage.
 */
export function getTier1ActivePrice(config: Tier1Config = CDA_TIER1_CONFIG): number {
  switch (config.pricingStage) {
    case 'launch':
      return config.pricing.launch;
    case 'standard':
      return config.pricing.standard;
    case 'preLaunch':
    default:
      return config.pricing.preLaunch;
  }
}

export interface Tier1StageDisplay {
  stage: PricingStage;
  stageBadge: string;
  price: number;
  headline: string;
  supportingMessage: string;
  positioningTag: string;
  comparisonPrice?: number;
  comparisonLabel?: string;
  dateNote?: string;
}

/**
 * Returns UI display messaging and metadata according to the active pricing stage.
 */
export function getTier1StageDisplay(config: Tier1Config = CDA_TIER1_CONFIG): Tier1StageDisplay {
  const price = getTier1ActivePrice(config);

  if (config.pricingStage === 'launch') {
    return {
      stage: 'launch',
      stageBadge: 'LAUNCHING PRICE',
      price: config.pricing.launch,
      headline: 'LAUNCHING PRICE',
      supportingMessage: 'Main launch price.',
      positioningTag: 'OFFICIAL LAUNCH PRICING',
      comparisonPrice: config.pricing.standard,
      comparisonLabel: 'Standard Price',
      dateNote: config.standardPriceDate ? `Standard price takes effect ${config.standardPriceDate}` : undefined
    };
  }

  if (config.pricingStage === 'standard') {
    return {
      stage: 'standard',
      stageBadge: 'STANDARD PRICE',
      price: config.pricing.standard,
      headline: 'STANDARD PRICE',
      supportingMessage: 'Regular pricing.',
      positioningTag: 'STANDARD PRICING',
      comparisonPrice: undefined,
      comparisonLabel: undefined,
      dateNote: undefined
    };
  }

  // Default: preLaunch
  return {
    stage: 'preLaunch',
    stageBadge: 'PRE-LAUNCH PRICE',
    price: config.pricing.preLaunch,
    headline: 'PRE-LAUNCH PRICE',
    supportingMessage: `Lock in your spot before the main launch at ₦${config.pricing.standard.toLocaleString()}`,
    positioningTag: 'LOCK IN BEFORE THE MAIN LAUNCH',
    comparisonPrice: config.pricing.standard,
    comparisonLabel: 'Standard Price',
    dateNote: config.launchDate ? `Official launch begins ${config.launchDate}` : undefined
  };
}

export interface OfferConfig {
  id: OfferKey;
  tierNumber: 1 | 2 | 3 | 4;
  profileId: ProfileKey;
  productName: string;
  pathwayName: string;
  stage?: string;
  tagline: string;
  duration?: string;
  delivery?: string;
  trainingModel?: string;
  primaryTransformation: string;
  pricing?: Tier1PricingConfig;
  pricingStage?: PricingStage;
  launchDate?: string;
  standardPriceDate?: string;
  foundingPrice: number;
  standardPrice: number;
  cohortStatus: string;
  cohortCapacityText?: string;
  // Configurable payment gateways (no fake links; empty string indicates direct booking or pending URL)
  selarUrl: string;
  paystackUrl: string;
  existingSiteUrl?: string;
  valueStack: ValueStackItem[];
  totalAttributedValue: number;
  whatYouWillWorkOn: string[];
  whatYouWillBuild: string[];
  curriculumHighlights?: { period: string; focus: string; project: string }[];
}

export interface ProfileConfig {
  id: ProfileKey;
  name: string;
  sub: string;
  primaryNeed: string;
  message: string;
  recommendedOfferId: OfferKey;
  recommendedPathway: string;
  futurePathwayName: string;
  coreSituation: string;
  keyAdvice: string;
  // Personalized 7-point diagnosis architecture
  whereYouAre: string;
  whatThisMeans: string;
  keyChallenge: string;
  opportunity: string;
  focusFirst: string;
  whatNotToWorry: string;
  whyClarity: string;
  specificUnderstandings: string[];
}

export interface BottleneckConfig {
  id: BottleneckKey;
  name: string;
  subtitle: string;
  explain: string;
  actionStep: string;
}

export const CDA_BRAND_CONFIG = {
  brandName: 'Caramel Digital Academy',
  brandShort: 'CDA',
  flagshipMovement: 'Beyond Salary Movement™',
  tagline: 'Building Resilient Income Options Beyond One Salary',
  academyWebsiteUrl: 'https://carameldigitals.com',
  colors: {
    primaryBlue: '#03037E',
    pureWhite: '#FFFFFF',
    caramelGold: '#FFBE4D',
    antiqueGold: '#C9A227',
    espressoDark: '#2B1B14',
    warmIvory: '#F8F4EC',
    softCream: '#EFE6D6'
  },
  supportEmail: 'support@carameldigitalacademy.com',
  supportWhatsApp: '+2348000000000',
  supportWhatsAppLink: 'https://wa.me/2348000000000?text=Hello%2C%20I%20completed%20the%20Beyond%20Salary%20Scorecard%20and%20have%20a%20question.',
  guaranteeDisclaimer:
    'This program is designed to give you the knowledge, practical tools, implementation experience and support to take your next step with greater clarity. Your actual results will depend on your implementation, market, offer and circumstances.'
};

export const CDA_PROFILES: Record<ProfileKey, ProfileConfig> = {
  salary_survivor: {
    id: 'salary_survivor',
    name: 'Salary Survival',
    sub: 'You currently depend heavily on your salary and have limited financial breathing room outside your primary income.',
    primaryNeed: 'CLARITY & FOUNDATION',
    message:
      'Your first priority is not to rush into multiple income streams. Your first priority is clarity.',
    recommendedOfferId: 'tier_1',
    recommendedPathway: 'Beyond Salary Foundation: Career to Cash Live Training™',
    futurePathwayName: 'Beyond Salary Income Foundation',
    coreSituation:
      'You are significantly dependent on salary and/or financially exposed and do not yet have sufficient skill or execution readiness to confidently build an additional income pathway.',
    keyAdvice:
      'Stop jumping between scattered opportunities. Establish your financial safety baseline, audit your existing professional capabilities, and build a single realistic Career-to-Cash plan.',
    whereYouAre:
      'You may currently depend heavily on your salary and have limited financial breathing room outside your primary income.',
    whatThisMeans:
      'Your financial livelihood is tied to a single employer or paycheck. A sudden disruption in employment, medical emergency, or living cost inflation directly threatens your personal peace of mind.',
    keyChallenge:
      'Vulnerability and the temptation to rush into multiple random, high-risk side hustles out of urgency or financial anxiety.',
    opportunity:
      'Auditing your transferable professional skills, plugging financial leaks, and methodically building an income foundation that protects your career instead of jeopardizing it.',
    focusFirst:
      'Building complete clarity on your current income vulnerability, identifying realistic options that match your job hours, and developing a calm, step-by-step foundation.',
    whatNotToWorry:
      'Do not worry about launching 3 different businesses, registering corporate entities, building complex websites, or quitting your day job.',
    whyClarity:
      'Before you build more income, you need clarity on what to build, why to build it, and where to start without disrupting your existing career.',
    specificUnderstandings: [
      'Your current income vulnerability and actual financial runway',
      'Your core strengths and transferable professional capabilities',
      'Your available digital and commercial opportunities',
      'What type of additional income path makes sense for your schedule',
      'How to start without unnecessarily disrupting your existing career'
    ]
  },
  income_explorer: {
    id: 'income_explorer',
    name: 'Income Explorer',
    sub: 'You are aware that you need income beyond salary, and you may already be exploring different ideas, skills, tools, or opportunities.',
    primaryNeed: 'CLARITY & DIRECTION',
    message:
      'Your biggest challenge may not be lack of opportunity. It may be lack of direction and focus. Your first priority is clarity.',
    recommendedOfferId: 'tier_1',
    recommendedPathway: 'Beyond Salary Foundation: Career to Cash Live Training™',
    futurePathwayName: 'Beyond Salary Skill-to-Income™',
    coreSituation:
      'You recognize the need for income diversification and are actively exploring possibilities, but need focused direction to turn interest into market-ready capability.',
    keyAdvice:
      'Knowledge without focus leads to burnout. Identify which single opportunity aligns with your strengths, resources, and career goals, then build your foundation first.',
    whereYouAre:
      'You are aware that you need income beyond salary, and you may already be exploring different ideas, skills, tools, or opportunities.',
    whatThisMeans:
      'You have high initiative and curiosity, but without a disciplined filter, you risk wasting months consuming tutorials, chasing new AI tools, and starting initiatives you never finish.',
    keyChallenge:
      'Lack of clear direction, information overload, and shiny-object syndrome. Your biggest challenge is not lack of opportunity—it is lack of direction and focus.',
    opportunity:
      'Isolating one high-value digital or AI capability that matches your natural affinity and turning it into tangible, client-valued proof-of-work.',
    focusFirst:
      'Establishing total clarity on your ideal income path, filtering out distractions, and committing to a structured roadmap before investing time or money in random courses.',
    whatNotToWorry:
      'Do not worry about learning every new AI tool, building complicated sales funnels, or scaling multiple offers before your first one is validated.',
    whyClarity:
      'You need to identify which opportunities align with your skills, interests, resources, and goals so you can focus your energy with complete confidence.',
    specificUnderstandings: [
      'How to evaluate and filter competing digital income ideas',
      'The exact commercial digital skills most valued by businesses today',
      'How AI is reshaping modern work and where you fit in',
      'How to translate raw curiosity into a focused, monetization-ready capability',
      'The exact sequence: Clarity first, Skill second, Offer third'
    ]
  },
  ready_but_stuck: {
    id: 'ready_but_stuck',
    name: 'Ready but Stuck',
    sub: 'You have moved beyond simply thinking about additional income. You are closer to taking action, but need the right direction, structure, and confidence.',
    primaryNeed: 'FOUNDATIONAL STRUCTURE & PACKAGING',
    message:
      'You are not starting from zero. Your first priority is to establish a clear income-building foundation before investing significant time or money.',
    recommendedOfferId: 'tier_1',
    recommendedPathway: 'Beyond Salary Foundation: Career to Cash Live Training™',
    futurePathwayName: 'Beyond Salary Income Accelerator™',
    coreSituation:
      'You have skills, ideas, experience, or previous attempts, but need the right direction, structure, and operational confidence before investing significant resources.',
    keyAdvice:
      'You do not need more random tutorials. You need to establish a clear income-building foundation, validate your positioning, and map out your execution roadmap.',
    whereYouAre:
      'You have moved beyond simply thinking about additional income. You are closer to taking action, but you need the right direction, structure, and confidence before investing significant time or money.',
    whatThisMeans:
      'You are positioned in the "Ready but Stuck" stage of your journey. You possess real capability, but hesitate because you lack a reliable structure and predictable path to follow.',
    keyChallenge:
      'The monetization and packaging gap: turning abstract capabilities or past attempts into clearly structured, market-ready offers that clients eagerly pay for.',
    opportunity:
      'Packaging your existing capabilities into a clear, compelling offer and deploying a repeatable system for attracting and serving clients without job disruption.',
    focusFirst:
      'Establishing a clear income-building foundation, auditing your positioning, and building the strategic roadmap needed to turn your readiness into income.',
    whatNotToWorry:
      'Do not worry about expensive paid ads, hiring staff, or complex automation tools before your foundational offer and positioning are crystal clear.',
    whyClarity:
      'You have the capability. Clarity will give you the certainty and step-by-step structure required to launch without second-guessing yourself.',
    specificUnderstandings: [
      'The critical difference between having a skill and packaging an offer',
      'Why past attempts may have stalled and how to avoid the same friction',
      'How to position your capabilities so clients see immediate value',
      'How to build consistent client attraction alongside a demanding 9-to-5',
      'How to establish an initial Beyond Salary roadmap that produces momentum'
    ]
  },
  income_builder: {
    id: 'income_builder',
    name: 'Income Builder',
    sub: 'You already have some level of experience generating income beyond your primary salary, and are ready for intentional, sustainable growth.',
    primaryNeed: 'SYSTEMS, AI & STRATEGIC SCALE',
    message:
      'Even experienced income builders benefit from clarity around positioning, systems, digital skills, AI opportunities, and sustainable growth.',
    recommendedOfferId: 'tier_1',
    recommendedPathway: 'Beyond Salary Foundation: Career to Cash Live Training™',
    futurePathwayName: 'Sovereign Income Multiplier System™',
    coreSituation:
      'You already have active income beyond salary, but need clearer positioning, streamlined systems, and leveraged workflows to scale sustainably without burnout.',
    keyAdvice:
      'Do not just add more hours or another disconnected hustle. Use the Clarity & Foundation experience to audit your revenue streams, integrate modern AI workflows, and design your multiplication roadmap.',
    whereYouAre:
      'You already have some level of experience generating income beyond your primary salary.',
    whatThisMeans:
      'You have broken through the hardest barrier—earning your first independent dollars. However, your second income may still rely heavily on manual labor and unpredictable hours.',
    keyChallenge:
      'Trading time for dollars, operational friction, and lack of systemized positioning, AI-assisted workflows, or strategic leverage.',
    opportunity:
      'Refining your positioning, adopting AI-powered business workflows, productizing your services, and building an intentional multi-stream ecosystem.',
    focusFirst:
      'Gaining clarity on your overall positioning, identifying automation opportunities, and structuring your long-term Sovereign Income architecture.',
    whatNotToWorry:
      'Do not worry about launching a third or fourth disconnected side hustle. Focus on systematizing, productizing, and multiplying what already works.',
    whyClarity:
      'Even experienced income builders benefit from clarity around positioning, systems, digital skills, AI opportunities, and sustainable growth before investing in scaling.',
    specificUnderstandings: [
      'How to audit your existing income streams for hidden leverage and profit leaks',
      'How AI workflows can reduce your operational hours by 50% or more',
      'The transition from active labor trading to productized services and retainers',
      'How to protect your energy and day job while growing a multi-stream portfolio',
      'How your Scorecard profile maps to the advanced Sovereign Income Multiplier System™'
    ]
  }
};

/**
 * Profile-specific personalized transition copy
 */
export interface ProfileNextMove {
  nextMove: string;
  recommendedOffer: string;
}

export const CDA_PROFILE_NEXT_MOVES: Record<ProfileKey, ProfileNextMove> = {
  salary_survivor: {
    nextMove: 'Build your income foundation before trying to build multiple income streams.',
    recommendedOffer: 'Beyond Salary Foundation — Career to Cash Live Training™'
  },
  income_explorer: {
    nextMove: 'Turn your curiosity into a clear income direction and identify an opportunity you can actually act on.',
    recommendedOffer: 'Beyond Salary Foundation — Career to Cash Live Training™'
  },
  ready_but_stuck: {
    nextMove: "You don't necessarily need more information. You need a clearer path and practical implementation.",
    recommendedOffer: 'Beyond Salary Foundation — Career to Cash Live Training™'
  },
  income_builder: {
    nextMove: 'Strengthen your foundation, sharpen your positioning and identify the next opportunity to build around your existing income strategy.',
    recommendedOffer: 'Beyond Salary Foundation — Career to Cash Live Training™'
  }
};

/**
 * 6 Core Benefits for the Recommended Next Step Section
 */
export const CDA_RECOMMENDED_STEP_BENEFITS: string[] = [
  'Identify digital skills and income opportunities that fit your strengths',
  'Discover how your existing knowledge and experience can become an income-generating asset',
  'Position yourself for opportunities beyond your 9–5',
  'Use AI tools to accelerate your journey from skill to income',
  'Build a simple path toward your first ₦100K beyond salary',
  'Take practical action instead of remaining stuck in information overload'
];

export const CDA_OFFERS: Record<OfferKey, OfferConfig> = {
  tier_1: {
    id: 'tier_1',
    tierNumber: 1,
    profileId: 'salary_survivor',
    productName: CDA_TIER1_CONFIG.name,
    pathwayName: CDA_TIER1_CONFIG.stage,
    stage: CDA_TIER1_CONFIG.stage,
    tagline: 'Before you build more income, you need clarity on what to build, why to build it, and where to start.',
    delivery: 'Live Interactive Masterclass + Practical Action Labs',
    trainingModel: 'Diagnose → Establish Clarity → Build Foundation → Personalized Roadmap',
    primaryTransformation:
      'Understand your Beyond Salary Scorecard profile, audit your transferable skills, overcome information overload, and create your documented Beyond Salary Roadmap.',
    pricing: CDA_TIER1_CONFIG.pricing,
    pricingStage: CDA_TIER1_CONFIG.pricingStage,
    launchDate: CDA_TIER1_CONFIG.launchDate,
    standardPriceDate: CDA_TIER1_CONFIG.standardPriceDate,
    foundingPrice: getTier1ActivePrice(CDA_TIER1_CONFIG),
    standardPrice: CDA_TIER1_CONFIG.pricing.standard,
    cohortStatus: 'ENROLLMENT OPEN',
    selarUrl: CDA_TIER1_CONFIG.selarUrl,
    paystackUrl: CDA_TIER1_CONFIG.paystackUrl,
    totalAttributedValue: 37500,
    valueStack: [
      { name: 'Beyond Salary Career Compass', value: 7500 },
      { name: 'Beyond Salary Career to Cash', value: 7500 },
      { name: 'Beyond Salary AI Prompt Vault', value: 7500 },
      { name: 'Live Career to Cash Training', value: 15000 },
      { name: 'Community Support', value: 0, isBonus: true },
      { name: 'Accountability', value: 0, isBonus: true }
    ],
    whatYouWillWorkOn: [
      'Understanding your Beyond Salary Scorecard profile and current income vulnerability.',
      'Auditing your existing strengths and unmonetized transferable skills.',
      'Identifying realistic digital and commercial income opportunities that fit your schedule.',
      'Understanding how AI is fundamentally changing work and income opportunities.',
      'Overcoming confusion, shiny-object syndrome, and information overload.',
      'Mastering the difference between skills, offers, positioning, and monetization.',
      'Creating your documented, personalized Beyond Salary Roadmap.',
      'Determining your exact next practical development step in the Caramel Digital Academy.'
    ],
    whatYouWillBuild: [
      'Personalized Beyond Salary Roadmap',
      'Realistic Weekly Time-Allocation Framework',
      'Transferable Skill Monetization Matrix',
      'Documented 30-Day Implementation Plan'
    ]
  },

  tier_2: {
    id: 'tier_2',
    tierNumber: 2,
    profileId: 'income_explorer',
    productName: 'BEYOND SALARY SKILL-TO-INCOME™',
    pathwayName: 'BEYOND SALARY SKILL-TO-INCOME™',
    tagline: 'Turn modern digital & AI capabilities into market-valued portfolio assets.',
    duration: '6 Weeks',
    delivery: '6 Live Practical Sessions (Approx. 2–2.5 hours per session)',
    trainingModel: 'Teach → Build Together → Implement → Submit → Feedback → Improve',
    primaryTransformation:
      'From uncertainty about what skill to monetize to having a practical digital capability and tangible portfolio asset(s) that can be taken to the market.',
    foundingPrice: 59900,
    standardPrice: 89900,
    cohortStatus: 'ADVANCED ACADEMY PATHWAY',
    cohortCapacityText: 'Advanced Pathway (Explored during Cohort)',
    selarUrl: '',
    paystackUrl: '',
    totalAttributedValue: 230000,
    valueStack: [
      { name: 'Three Beyond Salary Digital Assets (Compass, Career to Cash, AI Prompt Vault)', value: 22500 },
      { name: 'AI Video Creation Lab', value: 25000 },
      { name: 'AI Website Building Lab', value: 25000 },
      { name: 'AI Automation Lab', value: 30000 },
      { name: 'eBook & Digital Productization Lab', value: 20000 },
      { name: '6 Live Hands-On Implementation Sessions', value: 40000 },
      { name: 'Weekly Project Reviews & Tailored Feedback', value: 25000 },
      { name: 'Final Skill-to-Income Competency Assessment', value: 15000 },
      { name: 'Private Cohort Community Access', value: 15000 },
      { name: 'Accountability Peer Pods', value: 10000 }
    ],
    curriculumHighlights: [
      {
        period: 'WEEK 1',
        focus: 'Skill-to-Income Strategy + AI Foundation',
        project: 'Personal Skill-to-Income Blueprint'
      },
      {
        period: 'WEEK 2',
        focus: 'AI Video Creation Lab',
        project: 'Complete client-ready social/video project'
      },
      {
        period: 'WEEK 3',
        focus: 'AI Website Building Lab',
        project: 'One functional landing page / website'
      },
      {
        period: 'WEEK 4',
        focus: 'AI Automation Lab',
        project: 'One working lead-capture and follow-up workflow'
      },
      {
        period: 'WEEK 5',
        focus: 'eBook & Digital Productization Lab',
        project: 'Mini digital product, workbook, checklist, or prompt pack'
      },
      {
        period: 'WEEK 6',
        focus: 'Portfolio + Monetization + Capstone',
        project: 'Capstone: Skill, Problem Solved, Audience, Portfolio & Offer'
      }
    ],
    whatYouWillWorkOn: [
      'Mastering practical AI and digital tools without needing complex technical background.',
      'Constructing real, tangible proof-of-work portfolio pieces businesses pay for.',
      'Learning the feedback-driven implementation cycle with experienced mentors.',
      'Positioning your new capability around urgent problems clients need solved.'
    ],
    whatYouWillBuild: [
      'Client-Ready AI Video Asset',
      'Functional Web/Landing Page Prototype',
      'Automated Lead-Capture & Email Follow-up Workflow',
      'Digital Micro-Product or Implementation Guide',
      'Capstone Portfolio Showcase'
    ]
  },

  tier_3: {
    id: 'tier_3',
    tierNumber: 3,
    profileId: 'ready_but_stuck',
    productName: 'BEYOND SALARY INCOME ACCELERATOR™',
    pathwayName: 'BEYOND SALARY INCOME ACCELERATOR™',
    tagline: 'Turn your existing capability into a validated offer and repeatable sales system.',
    duration: '8 Weeks',
    delivery: '8 Core Live Sessions + 2 Dedicated Implementation Clinics',
    primaryTransformation:
      'Move from having a skill/idea/capability but struggling to monetize it consistently to having a validated offer and a repeatable client-acquisition, sales and delivery system.',
    foundingPrice: 149900,
    standardPrice: 199900,
    cohortStatus: 'ADVANCED ACADEMY PATHWAY',
    cohortCapacityText: 'Advanced Pathway (Explored during Cohort)',
    selarUrl: '',
    paystackUrl: '',
    totalAttributedValue: 527500,
    valueStack: [
      { name: 'Three Beyond Salary Digital Assets (Compass, Career to Cash, AI Prompt Vault)', value: 22500 },
      { name: 'Offer Creation & Positioning System', value: 40000 },
      { name: 'Offer Validation Sprint Framework', value: 35000 },
      { name: 'Client Acquisition & Outreach Engine', value: 45000 },
      { name: 'Content-to-Client Conversion System', value: 35000 },
      { name: 'Sales & Closing Intensive Masterclass', value: 45000 },
      { name: 'Client Delivery & Retention Playbook', value: 30000 },
      { name: 'Revenue Tracking & Analytics Dashboard', value: 20000 },
      { name: '8 Live Implementation Sessions', value: 80000 },
      { name: '2 High-Impact Implementation Clinics', value: 40000 },
      { name: 'Individual Offer & Portfolio Audits', value: 35000 },
      { name: 'Sales Role-Play Clinics with Live Feedback', value: 30000 },
      { name: 'Private Accelerator Mastermind Community', value: 20000 },
      { name: 'Execution Accountability Partnership', value: 20000 },
      { name: 'Final Income System Capstone Assessment', value: 30000 }
    ],
    curriculumHighlights: [
      {
        period: 'WEEKS 1–2',
        focus: 'Offer + Positioning Architecture',
        project: 'Irresistible high-ticket or package offer definition'
      },
      {
        period: 'WEEKS 3–4',
        focus: 'Lead Generation + Content Engine',
        project: 'Multi-channel outbound & inbound client attraction system'
      },
      {
        period: 'WEEKS 5–6',
        focus: 'Sales + Conversion System',
        project: 'Consultative sales script & closing framework'
      },
      {
        period: 'WEEK 7',
        focus: 'Delivery + Client Experience',
        project: 'Streamlined onboarding & client satisfaction workflow'
      },
      {
        period: 'WEEK 8',
        focus: 'Revenue System + Capstone',
        project: 'Validated end-to-end sales engine & revenue dashboard'
      }
    ],
    whatYouWillWorkOn: [
      'Packaging what you know into a crystal-clear, high-value client offer.',
      'Executing outbound and inbound client-acquisition without sounding salesy.',
      'Mastering consultative conversations that convert prospects into paying clients.',
      'Setting up automated delivery systems so your day job remains completely protected.'
    ],
    whatYouWillBuild: [
      'Validated Offer Sheet & Pricing Strategy',
      'Client Outreach & Inbound Content Engine',
      'Consultative Sales Script & Objection-Handling Guide',
      'Client Onboarding & Project Delivery Workflow',
      'Capstone: Complete Prospect-to-Revenue Operating Engine'
    ]
  },

  tier_4: {
    id: 'tier_4',
    tierNumber: 4,
    profileId: 'income_builder',
    productName: 'SOVEREIGN INCOME MULTIPLIER SYSTEM™',
    pathwayName: 'SOVEREIGN INCOME MULTIPLIER SYSTEM™',
    tagline: 'Scale from single-stream freelance/side revenue into a resilient multi-stream ecosystem.',
    duration: '12 Weeks',
    delivery: '12 Strategic Implementation Sessions + 4 High-Touch Strategy/Mastermind Clinics',
    primaryTransformation:
      'Move from relying on one successful income activity to building a diversified, systemized and increasingly leveraged income ecosystem.',
    foundingPrice: 349900,
    standardPrice: 497000,
    cohortStatus: 'ADVANCED ACADEMY PATHWAY',
    cohortCapacityText: 'Advanced Pathway (Explored during Cohort)',
    existingSiteUrl: '',
    selarUrl: '',
    paystackUrl: '',
    totalAttributedValue: 997500,
    valueStack: [
      { name: 'Three Beyond Salary Digital Assets (Compass, Career to Cash, AI Prompt Vault)', value: 22500 },
      { name: 'Comprehensive Income Stream Audit', value: 50000 },
      { name: 'Sovereign Income Architecture', value: 75000 },
      { name: 'Productization System (Turning services into recurring assets)', value: 60000 },
      { name: 'Revenue Expansion Strategy', value: 60000 },
      { name: 'Automation & Systems Architecture Blueprint', value: 75000 },
      { name: 'Delegation & Fractional Leverage Framework', value: 50000 },
      { name: 'Multiple Revenue Stream Blueprint', value: 60000 },
      { name: 'Revenue Optimization & Pricing Strategy', value: 50000 },
      { name: '12 Strategic Implementation Sessions', value: 120000 },
      { name: '4 High-Touch Executive Strategy Clinics', value: 100000 },
      { name: 'Direct Business Model & Offer Audits', value: 75000 },
      { name: 'Sovereign Income Executive Dashboard', value: 30000 },
      { name: '90-Day Implementation Scalability Roadmap', value: 40000 },
      { name: 'Private Executive Mastermind Community', value: 50000 },
      { name: 'High-Level Execution Accountability Protocol', value: 30000 }
    ],
    curriculumHighlights: [
      {
        period: 'PHASE 1 (WEEKS 1–3)',
        focus: 'Income Audit + Architecture',
        project: 'Complete revenue audit & sovereign income model design'
      },
      {
        period: 'PHASE 2 (WEEKS 4–6)',
        focus: 'Productization + Revenue Expansion',
        project: 'Packaging retainers, productized services, & digital assets'
      },
      {
        period: 'PHASE 3 (WEEKS 7–9)',
        focus: 'Systems + Automation',
        project: 'End-to-end CRM, automated funnels, and delivery workflows'
      },
      {
        period: 'PHASE 4 (WEEKS 10–12)',
        focus: 'Leverage + Multiplication',
        project: 'Sovereign Income Ecosystem Blueprint™ & 90-day scale roadmap'
      }
    ],
    whatYouWillWorkOn: [
      'Decoupling your time from your second income stream.',
      'Architecting productized services, retainers, and leveraged assets.',
      'Deploying automated workflows to handle client inquiry, billing, and fulfillment.',
      'Building a multi-tiered income structure that protects you against economic volatility.'
    ],
    whatYouWillBuild: [
      'Sovereign Income Ecosystem Blueprint™',
      'Productized Retainer Service Package',
      'Automated Inbound/Outbound Engine',
      'Delegation & Fractional Team Sourcing SOPs',
      '90-Day Multiplication Execution Roadmap'
    ]
  }
};

export const CDA_BOTTLENECKS: Record<BottleneckKey, BottleneckConfig> = {
  clarity: {
    id: 'clarity',
    name: 'Foundation & Clarity',
    subtitle: 'Uncertainty about where to start and what fits your current life.',
    explain:
      'You are currently feeling overwhelmed by too many options or a lack of clear direction. Chasing random side hustles will only burn out your limited time. You need a structured blueprint to isolate one realistic pathway.',
    actionStep:
      'Establish a clear Career-to-Cash plan that fits your exact work schedule and focuses on one specific capability.'
  },
  skill: {
    id: 'skill',
    name: 'Skill Development Gap',
    subtitle: 'Needing a modern, practical digital/AI capability the market values.',
    explain:
      'You recognize the risk of relying solely on salary, but you do not yet possess a sharpened, market-ready digital skill that businesses urgently pay for. Your immediate lever is hands-on capability building.',
    actionStep:
      'Master an in-demand capability (such as AI content creation, workflow automation, or digital asset creation) and build undeniable proof-of-work.'
  },
  monetization: {
    id: 'monetization',
    name: 'Monetization & Packaging Gap',
    subtitle: 'Possessing valuable skills but struggling to turn them into paying customers.',
    explain:
      'You have capabilities, ideas, or professional experience, but have not yet translated them into a clearly positioned offer with a defined target audience. Having a skill is not enough—clients buy solved problems, not abstract capabilities.',
    actionStep:
      'Package your strongest skill into a concrete offer solving one urgent problem for a specific client group.'
  },
  execution: {
    id: 'execution',
    name: 'Action & Execution Gap',
    subtitle: 'Having knowledge and plans, but struggling with follow-through and consistency.',
    explain:
      'You understand what needs to be done, but day-to-day fatigue from your primary job, fear of failure, or lack of structured accountability stops you from taking consistent daily action.',
    actionStep:
      'Block 45 protected minutes daily and use a milestone-based accountability structure to build unstoppable momentum.'
  },
  consistency: {
    id: 'consistency',
    name: 'Sales & Client Consistency',
    subtitle: 'Experiencing unpredictable, one-off earnings without a reliable pipeline.',
    explain:
      'You have made some money, but your income fluctuates wildly because you lack a systematic client attraction and sales pipeline. When client work comes in, marketing stops.',
    actionStep:
      'Implement a repeatable weekly outreach and inbound content engine that continually fills your prospect pipeline.'
  },
  systems: {
    id: 'systems',
    name: 'Systems & Operational Friction',
    subtitle: 'Manual delivery and time constraints threatening your day-job balance.',
    explain:
      'You are earning outside your job, but every dollar requires heavy manual time and attention. Without standard operating procedures and software automation, your second stream threatens your day-job performance.',
    actionStep:
      'Streamline client onboarding, project delivery templates, and communications into an automated operating workflow.'
  },
  leverage: {
    id: 'leverage',
    name: 'Multiplication & Leverage',
    subtitle: 'Relying on a single secondary stream without asset-based or recurring scale.',
    explain:
      'You have achieved reliable income beyond salary, but you are still trading hours for dollars in your side venture. The next level requires productization, retainers, and ecosystem leverage.',
    actionStep:
      'Deploy the Sovereign Income Architecture to create productized services, retainers, and scalable digital assets.'
  }
};
