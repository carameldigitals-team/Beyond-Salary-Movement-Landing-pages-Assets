import { LeadData, AssessmentResult } from '../types';
import { QUESTIONS } from '../data/scorecardData';
import { CDA_PROFILES } from '../data/cdaConfig';

export const BACKEND_WEB_APP_URL = 
  'https://script.google.com/macros/s/AKfycbwnLt33xGJQgqPgRwjaM4KCzOLlIFA3y0Qwoua_2FDskmD83ov-XuNHs_1PATV78XX_ww/exec';

export interface ScorecardBackendPayload {
  assessmentId: string;
  name: string;
  email: string;
  whatsapp: string;
  profession: string;
  score: string;
  profile: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q12: string;
  q13: string;
  q14: string;
  q15: string;
  q16: string;
  q17: string;
  q18: string;
  q19: string;
  q20: string;
  offerClicked: 'NO' | 'YES';
}

// In-memory registry to prevent duplicate network calls in active session
const inMemorySubmittedAssessments = new Set<string>();
const inMemoryOfferClickedAssessments = new Set<string>();

/**
 * Builds the exact JSON payload expected by the Google Apps Script backend.
 */
export function buildScorecardPayload(
  lead: LeadData,
  assessmentResult: AssessmentResult,
  answers: (number | null)[],
  offerClicked: 'NO' | 'YES'
): ScorecardBackendPayload {
  const profileName = CDA_PROFILES[assessmentResult.profile]?.name || 'Salary Survival';

  const questionResponses: Record<string, string> = {};
  for (let i = 0; i < 20; i++) {
    const qKey = `q${i + 1}`;
    const ansIdx = answers[i];
    if (typeof ansIdx === 'number' && ansIdx >= 0 && QUESTIONS[i]?.opts[ansIdx]) {
      questionResponses[qKey] = QUESTIONS[i].opts[ansIdx];
    } else {
      questionResponses[qKey] = '';
    }
  }

  return {
    assessmentId: assessmentResult.assessmentId,
    name: lead.fullName || lead.firstName || '',
    email: lead.email || '',
    whatsapp: lead.whatsapp || '',
    profession: lead.profession || '',
    score: String(assessmentResult.totalScore),
    profile: profileName,
    q1: questionResponses.q1 || '',
    q2: questionResponses.q2 || '',
    q3: questionResponses.q3 || '',
    q4: questionResponses.q4 || '',
    q5: questionResponses.q5 || '',
    q6: questionResponses.q6 || '',
    q7: questionResponses.q7 || '',
    q8: questionResponses.q8 || '',
    q9: questionResponses.q9 || '',
    q10: questionResponses.q10 || '',
    q11: questionResponses.q11 || '',
    q12: questionResponses.q12 || '',
    q13: questionResponses.q13 || '',
    q14: questionResponses.q14 || '',
    q15: questionResponses.q15 || '',
    q16: questionResponses.q16 || '',
    q17: questionResponses.q17 || '',
    q18: questionResponses.q18 || '',
    q19: questionResponses.q19 || '',
    q20: questionResponses.q20 || '',
    offerClicked
  };
}

/**
 * Sends scorecard assessment data to Google Apps Script backend silently in background.
 * Prevents duplicates on page refresh and handles network status cleanly.
 */
export async function sendAssessmentToGoogleSheets(
  lead: LeadData,
  assessmentResult: AssessmentResult,
  answers: (number | null)[],
  offerClicked: 'NO' | 'YES'
): Promise<boolean> {
  const assessmentId = assessmentResult.assessmentId;
  const isOfferUpdate = offerClicked === 'YES';

  // Duplicate prevention check
  if (isOfferUpdate) {
    if (inMemoryOfferClickedAssessments.has(assessmentId)) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Backend Sync] Offer click already registered in memory for:', assessmentId);
      }
      return false;
    }
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const sessionKey = `cda_sheet_offer_clicked_${assessmentId}`;
        if (sessionStorage.getItem(sessionKey)) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('[Backend Sync] Offer click already registered in session for:', assessmentId);
          }
          return false;
        }
        sessionStorage.setItem(sessionKey, 'true');
      }
    } catch {
      // Storage unavailable in restricted mode, continue
    }
    inMemoryOfferClickedAssessments.add(assessmentId);
  } else {
    if (inMemorySubmittedAssessments.has(assessmentId)) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Backend Sync] Assessment already submitted in memory for:', assessmentId);
      }
      return false;
    }
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const sessionKey = `cda_sheet_submitted_${assessmentId}`;
        if (sessionStorage.getItem(sessionKey)) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('[Backend Sync] Assessment already submitted in session for:', assessmentId);
          }
          return false;
        }
        sessionStorage.setItem(sessionKey, 'true');
      }
    } catch {
      // Storage unavailable in restricted mode, continue
    }
    inMemorySubmittedAssessments.add(assessmentId);
  }

  const payload = buildScorecardPayload(lead, assessmentResult, answers, offerClicked);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Backend Sync] Dispatching ${offerClicked === 'YES' ? 'Offer Click (YES)' : 'Initial Assessment (NO)'}:`, payload);
  }

  try {
    // Send browser-safe simple POST with Content-Type: text/plain to avoid CORS preflight (OPTIONS),
    // allowing Google Apps Script Web Apps to receive the payload directly in e.postData.contents as JSON text.
    await fetch(BACKEND_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log('[Backend Sync] Transmission completed.');
    }
    return true;
  } catch (err) {
    // In browsers, Google Apps Script redirects (302) to script.googleusercontent.com,
    // which may trigger a browser notice on following the redirect even though the POST payload was received.
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Backend Sync] Background transmission dispatched (redirect notice is normal for Apps Script):', err);
    }
    return false;
  }
}
