// Google tag (gtag.js) global, defined by the consent bootstrap in the root
// layout before Tag Manager loads.
interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
