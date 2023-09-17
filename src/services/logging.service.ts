import * as Sentry from "@sentry/node";

/**
 * A production loging module
 * @module Sentry
 */

Sentry.init({
  dsn: "https://1ccd2a192be549188f67030deeb23759@o1261709.ingest.sentry.io/6439746",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

/** Log to Sentry */
export default Sentry;
