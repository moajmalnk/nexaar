/**
 * Nexaar Analytics Utility
 * Handles cross-provider event tracking (Plausible/GA4).
 */

export const trackEvent = (eventName, props = {}) => {
  try {
    // 1. Plausible Tracking
    if (window.plausible) {
      window.plausible(eventName, { props });
    }

    // 2. Google Analytics (GA4) Tracking
    if (window.gtag) {
      window.gtag('event', eventName, props);
    }

    // Debug logging in development
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Event: ${eventName}`, props);
    }
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};

/**
 * Common Event Types for Nexaar
 */
export const ANALYTICS_EVENTS = {
  CONVERSION_WHATSAPP: 'Conversion: WhatsApp Click',
  CONVERSION_GET_STARTED: 'Conversion: Get Started Click',
  VIEW_PROJECT: 'View: Project Details',
  OFFLINE_MODE_ENGAGED: 'Status: Offline Mode Engaged',
};
