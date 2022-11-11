import { AnalyticsBrowser } from '@segment/analytics-next'

const analytics = AnalyticsBrowser.load({ writeKey: process.env.NX_PROD_SEGMENT_API_KEY || '' })

/**
 * Send an event to Segment for analytics tracking
 * @param event Name of event
 * @param properties Any additional properties to pass along with the track call
 */
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'production') {
    return analytics.track(event, properties)
  }
  return null
}

export default trackEvent
