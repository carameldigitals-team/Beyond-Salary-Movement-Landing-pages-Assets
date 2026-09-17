// Safe analytics event tracking layer
// Structured for Google Analytics, Facebook Pixel, Mixpanel, or custom webhooks

export type AnalyticsEventType = 
  | 'assessment_started'
  | 'question_answered'
  | 'assessment_completed'
  | 'lead_capture_started'
  | 'lead_captured'
  | 'profile_assigned'
  | 'offer_recommended'
  | 'cta_clicked'
  | 'selar_clicked'
  | 'paystack_clicked';

export interface AnalyticsPayload {
  [key: string]: unknown;
}

export function trackEvent(eventType: AnalyticsEventType, data?: AnalyticsPayload): void {
  const timestamp = new Date().toISOString();
  const eventData = {
    event: eventType,
    timestamp,
    ...data
  };

  // 1. Safe development logging
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics Event: ${eventType}]`, eventData);
  }

  // 2. Safe GTM / dataLayer dispatch if present
  try {
    if (typeof window !== 'undefined' && Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push(eventData);
    }
  } catch (err) {
    console.debug('Analytics dispatch error:', err);
  }

  // 3. Store session events safely for diagnostics
  try {
    if (typeof sessionStorage !== 'undefined') {
      const existing = JSON.parse(sessionStorage.getItem('cda_analytics_events') || '[]');
      existing.push(eventData);
      sessionStorage.setItem('cda_analytics_events', JSON.stringify(existing.slice(-50)));
    }
  } catch {
    // Ignore storage issues in private browsing
  }
}
