import { 
  SectionScores, 
  ProfileKey, 
  OfferKey, 
  LeadTemperature, 
  BottleneckKey, 
  DimensionRating, 
  AssessmentResult 
} from '../types';

/**
 * Calculates raw and normalized section scores from 20 assessment answers.
 * 
 * Answers are 0-indexed option choices (0, 1, 2, 3) for Q1–Q20.
 * 
 * Section 1: Q1–Q5  (Salary Dependency) — Higher score = greater dependency/exposure
 * Section 2: Q6–Q10 (Financial Resilience / Vulnerability) — Higher score = greater vulnerability / lower resilience
 * Section 3: Q11–Q15 (Skill Readiness) — Higher score = greater skill readiness
 * Section 4: Q16–Q20 (Execution System) — Higher score = greater execution readiness
 */
export function calculateSectionScores(answers: (number | null)[]): {
  raw: SectionScores;
  normalized: SectionScores;
} {
  // Normalize answer safely (fallback to 1 if null)
  const getAns = (idx: number): number => {
    const val = answers[idx];
    return typeof val === 'number' && val >= 0 && val <= 3 ? val : 1;
  };

  // Section 1: Salary Dependency (Q1..Q5, indices 0..4)
  // Options: 0 = Highest dependency (e.g. 1 income source), 3 = Lowest (4+ sources)
  // We invert so higher raw = greater salary dependency
  let depRaw = 0;
  for (let i = 0; i <= 4; i++) {
    depRaw += 3 - getAns(i);
  }

  // Section 2: Financial Vulnerability (Q6..Q10, indices 5..9)
  // Options: 0 = Highest vulnerability (e.g. <1 mo saved), 3 = Lowest (>6 mo)
  // We invert so higher raw = greater financial vulnerability / lower resilience
  let vulnRaw = 0;
  for (let i = 5; i <= 9; i++) {
    vulnRaw += 3 - getAns(i);
  }

  // Section 3: Skill Readiness (Q11..Q15, indices 10..14)
  // Options: 0 = No skill / no confidence, 3 = Marketable skill / already generated income
  // Direct sum so higher raw = greater skill readiness
  let skillRaw = 0;
  for (let i = 10; i <= 14; i++) {
    skillRaw += getAns(i);
  }

  // Section 4: Execution System (Q16..Q20, indices 15..19)
  // Options: 0 = No plan / nothing worked, 3 = Clear system / actively earning
  // Direct sum so higher raw = greater execution readiness
  let execRaw = 0;
  for (let i = 15; i <= 19; i++) {
    execRaw += getAns(i);
  }

  const raw: SectionScores = {
    salaryDependency: depRaw,
    financialResilience: vulnRaw,
    skillReadiness: skillRaw,
    executionSystem: execRaw
  };

  // Normalized to 0–100 scale (each section has max raw of 15: 5 questions * 3 points)
  const normalized: SectionScores = {
    salaryDependency: Math.round((depRaw / 15) * 100),
    financialResilience: Math.round((vulnRaw / 15) * 100),
    skillReadiness: Math.round((skillRaw / 15) * 100),
    executionSystem: Math.round((execRaw / 15) * 100)
  };

  return { raw, normalized };
}

/**
 * Maps a normalized score (0–100) to a user-friendly qualitative label.
 */
export function getDimensionRating(score: number): DimensionRating {
  if (score < 35) return 'Emerging';
  if (score < 65) return 'Developing';
  if (score < 85) return 'Strong';
  return 'Advanced';
}

/**
 * Maps diagnostic dimensions and critical routing signals to EXACTLY ONE primary profile.
 */
export function determineProfile(
  normalized: SectionScores,
  answers: (number | null)[]
): ProfileKey {
  const getAns = (idx: number): number => {
    const val = answers[idx];
    return typeof val === 'number' && val >= 0 && val <= 3 ? val : 1;
  };

  // Key routing signals from assessment
  const q5 = getAns(4);   // Q5: Income situation (3: reliable income outside salary)
  const q11 = getAns(10); // Q11: Skill people pay for (3: already generated income)
  const q13 = getAns(12); // Q13: Earned independently from skill (0: never, 1: once/twice, 2: occasionally, 3: consistently)
  const q15 = getAns(14); // Q15: Current skill situation (3: marketable skill and want to grow)
  const q17 = getAns(16); // Q17: Tried side hustles before (3: successfully earned income)
  const q18 = getAns(17); // Q18: Biggest obstacle (0: start, 1: skill, 2: monetize, 3: scaling)
  const q19 = getAns(18); // Q19: Finding first client (3: clear strategy)
  const q20 = getAns(19); // Q20: Need (0: clarity, 1: skill, 2: skill->income, 3: scaling system)

  const skillNorm = normalized.skillReadiness;
  const execNorm = normalized.executionSystem;
  const depNorm = normalized.salaryDependency;
  const vulnNorm = normalized.financialResilience;

  // Signal: Proven active income beyond salary
  const hasStrongIndependentIncome = 
    q13 === 3 || 
    (q13 >= 2 && q17 === 3) || 
    (q5 === 3 && q13 >= 2);

  // Signal: Has skills/experience or attempts, but monetization/consistency gap
  const hasSkillsOrAttempts = 
    q13 >= 1 || 
    q17 >= 1 || 
    q11 >= 2 || 
    q15 >= 2 || 
    skillNorm >= 45;

  // =========================================================================
  // 1. PROFILE 4: INCOME BUILDER
  // =========================================================================
  // Condition: Evidence of existing income beyond salary AND strong skill readiness AND strong execution.
  if (
    hasStrongIndependentIncome &&
    skillNorm >= 55 &&
    execNorm >= 48
  ) {
    return 'income_builder';
  }

  // =========================================================================
  // 2. PROFILE 3: READY BUT STUCK
  // =========================================================================
  // Condition: Existing skill, ideas, experience or previous attempts, moderate-to-high skill readiness,
  // BUT struggles to turn capability into customers, sales, consistency or systems.
  // CRITICAL RULE: Even if salary dependency is high, if they have proven skill/capability,
  // do NOT classify as Salary Survivor.
  if (
    hasSkillsOrAttempts &&
    skillNorm >= 40 &&
    (execNorm < 68 || q18 === 2 || q20 === 2 || q19 <= 1 || q17 <= 2)
  ) {
    return 'ready_but_stuck';
  }

  // If someone specifically answered that they have a skill but struggle to monetize it
  if (q18 === 2 || q20 === 2 || (q11 >= 2 && skillNorm >= 35)) {
    return 'ready_but_stuck';
  }

  // =========================================================================
  // 3. PROFILE 2: INCOME EXPLORER
  // =========================================================================
  // Condition: Recognizes need for diversification, some interest/skill readiness,
  // but not yet sufficient execution/monetization capability.
  // Primary need is developing a marketable skill.
  if (
    skillNorm >= 25 ||
    q18 === 1 ||
    q20 === 1 ||
    (depNorm < 75 && vulnNorm < 75)
  ) {
    // If execution is low and skill is emerging
    if (skillNorm < 45 && execNorm < 45) {
      // If dependency is overwhelming and no clear skill, check if Salary Survivor
      if (depNorm >= 70 && vulnNorm >= 70 && q13 === 0 && q17 <= 1) {
        return 'salary_survivor';
      }
      return 'income_explorer';
    }
    return 'income_explorer';
  }

  // =========================================================================
  // 4. PROFILE 1: SALARY SURVIVOR
  // =========================================================================
  // Significant salary dependence/exposure, low skill readiness, low execution readiness.
  return 'salary_survivor';
}

/**
 * Maps the profile to its recommended entry offer.
 * Under the unified entry funnel strategy, ALL profiles enter through
 * the Beyond Salary: Career to Cash Live Training™ (tier_1).
 */
export function getRecommendedOffer(_profile: ProfileKey): OfferKey {
  return 'tier_1';
}

/**
 * Calculates internal lead temperature based on readiness, attempts, and urgency.
 */
export function calculateLeadTemperature(
  profile: ProfileKey,
  normalized: SectionScores,
  answers: (number | null)[]
): LeadTemperature {
  const getAns = (idx: number): number => {
    const val = answers[idx];
    return typeof val === 'number' ? val : 1;
  };

  const q13 = getAns(12);
  const q16 = getAns(15);
  const q17 = getAns(16);
  const q20 = getAns(19);

  // HOT: Strong readiness, clear intention, previous attempts/income, eager to take action
  if (
    profile === 'income_builder' ||
    (profile === 'ready_but_stuck' && (q17 >= 2 || q13 >= 2 || q20 >= 2 || normalized.executionSystem >= 55)) ||
    normalized.executionSystem >= 65
  ) {
    return 'hot';
  }

  // COLD: Low readiness, low urgency, high uncertainty
  if (
    profile === 'salary_survivor' &&
    normalized.skillReadiness <= 25 &&
    q16 === 0 &&
    q17 <= 1
  ) {
    return 'cold';
  }

  // WARM: Default for engaged professionals who need direction
  return 'warm';
}

/**
 * Identifies the participant's primary bottleneck based on profile and diagnostic signals.
 */
export function determineBottleneck(
  profile: ProfileKey,
  normalized: SectionScores,
  answers: (number | null)[]
): BottleneckKey {
  const getAns = (idx: number): number => {
    const val = answers[idx];
    return typeof val === 'number' ? val : 1;
  };

  const q18 = getAns(17); // Biggest challenge

  if (profile === 'income_builder') {
    return normalized.executionSystem >= 70 ? 'leverage' : 'systems';
  }

  if (profile === 'ready_but_stuck') {
    if (q18 === 2) return 'monetization';
    if (q18 === 3) return 'consistency';
    return 'monetization';
  }

  if (profile === 'income_explorer') {
    if (q18 === 0) return 'clarity';
    return 'skill';
  }

  // Salary Survivor
  if (q18 === 0) return 'clarity';
  return 'clarity';
}

/**
 * Generates a full structured AssessmentResult object.
 */
export function generateAssessmentResult(answers: (number | null)[]): AssessmentResult {
  const { raw, normalized } = calculateSectionScores(answers);
  const profile = determineProfile(normalized, answers);
  const recommendedOffer = getRecommendedOffer(profile);
  const leadTemperature = calculateLeadTemperature(profile, normalized, answers);
  const primaryBottleneck = determineBottleneck(profile, normalized, answers);

  // Composite score: weighted index (0-100)
  // Higher readiness + lower dependency & lower vulnerability yields a higher composite score
  const totalScore = Math.min(
    100,
    Math.max(
      10,
      Math.round(
        normalized.skillReadiness * 0.35 +
        normalized.executionSystem * 0.35 +
        (100 - normalized.salaryDependency) * 0.15 +
        (100 - normalized.financialResilience) * 0.15
      )
    )
  );

  return {
    assessmentId: `cda_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    completedAt: new Date().toISOString(),
    scores: raw,
    normalizedScores: normalized,
    profile,
    primaryBottleneck,
    leadTemperature,
    recommendedOffer,
    totalScore,
    answers
  };
}
