import { Question, ResultProfile, BottleneckInfo, CategoryId } from '../types';

export const QUESTIONS: Question[] = [
  // Salary Dependency
  {
    id: 1,
    cat: 'dependency',
    catLabel: 'Salary Dependency',
    text: 'How many reliable sources of income do you currently have?',
    opts: [
      'One source of income',
      'Two sources of income',
      'Three sources of income',
      'Four or more sources of income'
    ]
  },
  {
    id: 2,
    cat: 'dependency',
    catLabel: 'Salary Dependency',
    text: 'If your primary income stopped today, how long could you realistically cover your essential expenses?',
    opts: [
      'Less than one month',
      'One to three months',
      'Four to six months',
      'More than six months'
    ]
  },
  {
    id: 3,
    cat: 'dependency',
    catLabel: 'Salary Dependency',
    text: 'How much of your monthly living expenses currently depend on your primary income?',
    opts: [
      'Almost all of it',
      'Most of it',
      'About half of it',
      'Less than half of it'
    ]
  },
  {
    id: 4,
    cat: 'dependency',
    catLabel: 'Salary Dependency',
    text: 'If you lost your job tomorrow, how confident are you that you could generate income within the next 30 days?',
    opts: [
      'Not confident at all',
      'Slightly confident',
      'Fairly confident',
      'Very confident'
    ]
  },
  {
    id: 5,
    cat: 'dependency',
    catLabel: 'Salary Dependency',
    text: 'Which statement best describes your current situation?',
    opts: [
      'My salary is currently my only financial safety net.',
      'I have small additional income but it is inconsistent.',
      'I have another income stream but it does not cover much yet.',
      'I have reliable income outside my salary.'
    ]
  },

  // Financial Safety
  {
    id: 6,
    cat: 'safety',
    catLabel: 'Financial Safety',
    text: 'How many months of essential expenses do you currently have saved?',
    opts: [
      'Less than one month',
      'One to three months',
      'Four to six months',
      'More than six months'
    ]
  },
  {
    id: 7,
    cat: 'safety',
    catLabel: 'Financial Safety',
    text: 'How often do you run out of money before your next income arrives?',
    opts: [
      'Almost every month',
      'Sometimes',
      'Rarely',
      'Almost never'
    ]
  },
  {
    id: 8,
    cat: 'safety',
    catLabel: 'Financial Safety',
    text: 'If an unexpected financial emergency happened today, what would you most likely do?',
    opts: [
      'Borrow money',
      'Use most or all of my available money',
      'Use my emergency savings',
      'Handle it comfortably without disrupting my finances'
    ]
  },
  {
    id: 9,
    cat: 'safety',
    catLabel: 'Financial Safety',
    text: 'How would you describe your current financial stress level?',
    opts: [
      'Extremely high',
      'High',
      'Moderate',
      'Low'
    ]
  },
  {
    id: 10,
    cat: 'safety',
    catLabel: 'Financial Safety',
    text: 'How much financial responsibility do you currently carry?',
    opts: [
      'I support myself and several other people.',
      'I support myself and at least one other person.',
      'I mainly support myself.',
      'I have relatively low financial responsibilities.'
    ]
  },

  // Skill Readiness
  {
    id: 11,
    cat: 'skill',
    catLabel: 'Skill Readiness',
    text: 'Do you currently have a skill you believe someone would pay you for?',
    opts: [
      'No, I am not sure what skill I could sell.',
      'I have some skills but I am not sure people would pay for them.',
      'I have a skill but I have not yet made money from it.',
      'Yes, I have a skill that has already generated income.'
    ]
  },
  {
    id: 12,
    cat: 'skill',
    catLabel: 'Skill Readiness',
    text: 'How confident are you in learning a new digital or AI-powered skill?',
    opts: [
      'Not confident. I feel like I am not techy enough.',
      'Slightly confident but I do not know where to start.',
      'Fairly confident if I have the right guidance.',
      'Very confident.'
    ]
  },
  {
    id: 13,
    cat: 'skill',
    catLabel: 'Skill Readiness',
    text: 'Have you ever earned money independently from a skill?',
    opts: [
      'Never',
      'Once or twice',
      'Occasionally',
      'Consistently'
    ]
  },
  {
    id: 14,
    cat: 'skill',
    catLabel: 'Skill Readiness',
    text: 'How clear are you about which skill or income pathway you should focus on?',
    opts: [
      'I have no idea.',
      'I have several ideas and feel confused.',
      'I have an idea but need direction.',
      'I know exactly what I want to focus on.'
    ]
  },
  {
    id: 15,
    cat: 'skill',
    catLabel: 'Skill Readiness',
    text: 'Which statement best describes your current skill situation?',
    opts: [
      'I need to identify a skill I can learn.',
      'I am currently learning a skill.',
      'I have learned a skill but need practical experience.',
      'I have a marketable skill and want to grow it.'
    ]
  },

  // Execution System
  {
    id: 16,
    cat: 'execution',
    catLabel: 'Execution System',
    text: 'Do you currently have a clear plan for building income beyond your salary?',
    opts: [
      'No plan at all.',
      'I have ideas but no clear plan.',
      'I have a plan but struggle to stay consistent.',
      'I have a clear system that I am actively following.'
    ]
  },
  {
    id: 17,
    cat: 'execution',
    catLabel: 'Execution System',
    text: 'Have you tried side hustles or income opportunities before?',
    opts: [
      'Yes, several times, but nothing worked.',
      'Yes, but I gave up because I became overwhelmed or discouraged.',
      'Yes, and I made some progress.',
      'Yes, and I successfully earned income.'
    ]
  },
  {
    id: 18,
    cat: 'execution',
    catLabel: 'Execution System',
    text: 'What is currently your biggest challenge?',
    opts: [
      'I do not know where to start.',
      'I do not know which skill or opportunity to focus on.',
      'I have a skill but do not know how to make money from it.',
      'I struggle with consistency, systems or scaling.'
    ]
  },
  {
    id: 19,
    cat: 'execution',
    catLabel: 'Execution System',
    text: 'Do you know how you would find your first paying client or customer?',
    opts: [
      'No idea.',
      'I have some ideas but I am not sure.',
      'I understand some ways to find clients.',
      'Yes, I have a clear strategy.'
    ]
  },
  {
    id: 20,
    cat: 'execution',
    catLabel: 'Execution System',
    text: 'Which statement best describes you right now?',
    opts: [
      'I need clarity.',
      'I need a skill.',
      'I need help turning my skill into income.',
      'I need help building and scaling my income system.'
    ]
  }
];

export const CALCULATING_MESSAGES = [
  'Analysing your income dependency...',
  'Checking your financial safety level...',
  'Identifying your skill readiness...',
  'Finding your biggest bottleneck...',
  'Preparing your personalised next step...',
  'Your personalised result is ready.'
];

export const RESULT_CATEGORIES: Record<string, ResultProfile> = {
  survivor: {
    min: 0,
    max: 39,
    name: 'The Salary Survivor',
    sub: 'Your financial life is currently heavily dependent on one income source.',
    body: "Right now, your biggest priority is not trying another random opportunity — it's building safety, clarity and options. Your assessment suggests that your income, financial safety or skill readiness may leave you vulnerable if your primary income suddenly stops. This does not mean you have failed. It means you now have clarity, and clarity gives you a starting point.",
    priorities: [
      'Understand your financial position with complete clarity.',
      'Build a stronger financial safety cushion where possible.',
      'Identify one realistic income pathway.',
      'Stop jumping between random opportunities.',
      'Begin developing a practical, sellable skill.'
    ],
    quickWin: 'Choose one skill or income pathway to explore instead of chasing multiple opportunities at once.',
    plan: [
      'Calculate your essential monthly expenses and current runway.',
      'Identify your current income dependencies and monthly cash leaks.',
      'Review your existing skills, strengths, and professional knowledge.',
      'Research one practical digital skill that solves a real business problem.',
      'Identify one specific problem people or companies pay to solve.',
      'Choose one primary skill pathway to explore and focus on.',
      'Create your first Beyond Salary action plan and block 45 minutes daily.'
    ]
  },
  explorer: {
    min: 40,
    max: 59,
    name: 'The Income Explorer',
    sub: 'You know you need income beyond your salary, but you are still searching for the right path.',
    body: "You're aware of the problem — you know depending on one income source is risky, and you may have explored side hustles, online opportunities or different skills. But your biggest challenge appears to be clarity and focus. The problem may not be lack of opportunities — it may be trying too many things without a structured system.",
    priorities: [
      'Choose one realistic, high-leverage pathway.',
      'Stop jumping between scattered opportunities.',
      'Identify a marketable skill with proven demand.',
      'Follow a structured, milestone-driven learning plan.',
      'Start building practical proof of your skills.'
    ],
    quickWin: 'Write down three skills or income pathways you are interested in, then choose the ONE that best matches your interests, market demand, time and willingness to learn.',
    plan: [
      'Write down the income opportunities you are currently considering.',
      'Filter options based on your available time, natural strengths, and interests.',
      'Research real market demand and check what businesses are paying for.',
      'Choose ONE single pathway to commit to for the next 90 days.',
      'Identify the exact first core skill or tool you need to master.',
      'Create a simple, non-negotiable weekly learning schedule.',
      'Commit to your first focused action and share your goal with an accountability partner.'
    ]
  },
  stuck: {
    min: 60,
    max: 79,
    name: 'The Ready But Stuck',
    sub: 'You are closer than you think, but you may be struggling to turn what you know into income.',
    body: 'You already understand the importance of building additional income, and may already be learning or have learned a skill. But knowledge alone does not automatically create income. Your biggest opportunity is likely moving from learning to executing — building practical experience, creating proof of your skills, and finding your first client.',
    priorities: [
      'Stop collecting more information and tutorials.',
      'Start creating practical proof and case studies.',
      'Develop a clear, outcome-focused offer.',
      'Learn how to approach and find your first paying client.',
      'Turn your skill into a repeatable income system.'
    ],
    quickWin: 'Choose one problem your skill can solve, and identify one type of person or business that urgently needs that solution.',
    plan: [
      'Identify your strongest, most market-ready skill.',
      'Pinpoint one high-value problem that skill reliably solves.',
      'Choose one specific target audience or business niche.',
      'Create one practical, undeniable sample or mini case study of your work.',
      'Package your solution into a simple, tangible service or offer.',
      'Identify three potential clients, founders, or business owners in your network.',
      'Take one outreach action towards getting your first or next paying client.'
    ]
  },
  builder: {
    min: 80,
    max: 100,
    name: 'The Income Builder',
    sub: 'You have already started building options beyond your salary.',
    body: 'You are ahead of many people because you have started developing skills, generating income or creating additional options. Your next challenge is not simply starting — it is building consistency. Your opportunity is to create systems that make your income more sustainable, resilient and scalable.',
    priorities: [
      'Strengthen and protect your existing income stream.',
      'Build repeatable weekly client-acquisition consistency.',
      'Improve your delivery systems, templates and workflows.',
      'Increase your earning capacity and average deal value.',
      'Reduce your dependence on any single client or employer.'
    ],
    quickWin: 'Identify your strongest current income skill and ask: how can I productize or systemize this to make it easier to deliver and scale?',
    plan: [
      'Audit your strongest income-producing skill and client deliverables.',
      'Review your current income sources and calculate effective hourly rates.',
      'Identify your primary delivery bottleneck or operational friction.',
      'Document and streamline one repetitive client or delivery process.',
      'Identify one clear way to increase your value or package retainers.',
      'Create a weekly consistency calendar for business development.',
      'Set your next 6-month income goal and reinvestment strategy.'
    ]
  }
};

export const BOTTLENECKS: Record<CategoryId, BottleneckInfo> = {
  dependency: {
    name: 'Income Concentration',
    explain: 'Too much of your financial life currently depends on one single income source, creating high vulnerability to unexpected disruptions.'
  },
  safety: {
    name: 'Financial Safety Gap',
    explain: 'Your current financial cushion may not provide enough runway against sudden emergency expenses or job market transitions.'
  },
  skill: {
    name: 'Skill Readiness Gap',
    explain: 'You need to identify, sharpen, and package a marketable, high-demand skill that businesses or clients readily pay for.'
  },
  execution: {
    name: 'Execution Gap',
    explain: 'You know that you need income beyond your salary, but you lack a structured execution system for turning intentions and capabilities into consistent income.'
  }
};

export const PATHWAYS = [
  {
    tier: 'Beginner Pathway',
    tag: 'Foundation & Clarity',
    name: 'The Clarity & Skill Foundation',
    desc: 'A structured starting point for professionals who need clarity, focus, and a proven roadmap to select the right skill without confusion.',
    badgeClass: 'bg-[#00A3FF] text-white',
    features: [
      'Clear roadmap for African professionals',
      'Skill selection diagnostic matrix',
      'Step-by-step foundation curriculum',
      'Focus & time management blueprint'
    ]
  },
  {
    tier: 'Mid-Level Pathway',
    tag: 'Skill to Income',
    name: 'The Marketable Skill Accelerator',
    desc: 'A practical, hands-on programme designed to help you master an in-demand digital/AI skill and land your first paying freelance or consulting clients.',
    badgeClass: 'bg-[#03037E] text-white',
    features: [
      'Practical digital & AI skill training',
      'Portfolio & proof-of-work builder',
      'Client outreach & pitch templates',
      'First-client acquisition sprint'
    ]
  },
  {
    tier: 'Premium Pathway',
    tag: 'Systems & Scaling',
    name: 'The Beyond Salary Mastery Circle',
    desc: 'High-level implementation mentorship, operational systems, personal brand positioning, and scaling models to build resilient multi-stream income.',
    badgeClass: 'bg-[#FFBE4D] text-[#03037E]',
    features: [
      'Direct guidance & strategic feedback',
      'Client retainer packaging frameworks',
      'Productized services & leverage systems',
      'Exclusive private cohort community'
    ]
  }
];
