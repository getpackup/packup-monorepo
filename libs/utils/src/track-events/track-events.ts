/**
 * Need to make sure window and window.analytics are available before firing off track(),
 * so this utility saves us a few lines of code each time
 *
 * @param event
 * @param properties
 */
export default function trackEvent(
  event: string, properties?: Record<string, any>
) {
  if (window && window.analytics) {
    return window.analytics.track(event, properties);
  }

  return null;
}
