export type CategoryId = 'dependency' | 'safety' | 'skill' | 'execution';

export interface Question {
  id: number;
  cat: CategoryId;
  catLabel: string;
  text: string;
  opts: string[];
}

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

export interface SurvivalCalc {
  currency: string;
  expenses: number;
  savings: number;
  months: number;
}

export interface LeadData {
  firstName: string;
  email: string;
  whatsapp: string;
}

export type ScreenType = 
  | 'landing' 
  | 'welcome' 
  | 'assessment' 
  | 'calculator' 
  | 'calculating' 
  | 'lead' 
  | 'results';
