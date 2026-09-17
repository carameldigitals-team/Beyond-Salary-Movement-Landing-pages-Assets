export type CategoryId = 'dependency' | 'safety' | 'skill' | 'execution';

export type ProfileKey = 
  | 'salary_survivor' 
  | 'income_explorer' 
  | 'ready_but_stuck' 
  | 'income_builder';

export type OfferKey = 'tier_1' | 'tier_2' | 'tier_3' | 'tier_4';

export type LeadTemperature = 'cold' | 'warm' | 'hot';

export type BottleneckKey = 
  | 'clarity' 
  | 'skill' 
  | 'monetization' 
  | 'execution' 
  | 'consistency' 
  | 'systems' 
  | 'leverage';

export type DimensionRating = 'Emerging' | 'Developing' | 'Strong' | 'Advanced';

export interface ResultProfile {
  min: number;
  max: number;
  name: string;
  sub: string;
  body: string;
  priorities: string[];
  quickWin: string;
  plan: string[];
}

export interface BottleneckInfo {
  name: string;
  explain: string;
}

export interface Question {
  id: number;
  cat: CategoryId;
  catLabel: string;
  text: string;
  opts: string[];
}

export interface SectionScores {
  salaryDependency: number;
  financialResilience: number;
  skillReadiness: number;
  executionSystem: number;
}

export interface SurvivalCalc {
  currency: string;
  expenses: number;
  savings: number;
  months: number;
}

export interface LeadData {
  fullName: string;
  firstName: string;
  email: string;
  whatsapp: string;
}

export interface AssessmentResult {
  assessmentId: string;
  completedAt: string;
  scores: SectionScores;
  normalizedScores: SectionScores;
  profile: ProfileKey;
  primaryBottleneck: BottleneckKey;
  leadTemperature: LeadTemperature;
  recommendedOffer: OfferKey;
  totalScore: number;
  answers: (number | null)[];
  source?: string;
  campaign?: string;
  referrer?: string;
}

export type ScreenType = 
  | 'landing' 
  | 'welcome' 
  | 'assessment' 
  | 'calculator' 
  | 'calculating' 
  | 'lead' 
  | 'results';
