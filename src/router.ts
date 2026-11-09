/**
 * Minimal pathname router — clean URLs (`/about`, `/case-study/<slug>`)
 * with SPA navigation via the History API. Anchors (`#section`), external
 * links and `mailto:` stay native; only same-origin path links are intercepted.
 */

export const ROUTE_EVENT = 'digivibz:navigate';

export interface AppLocation {
  /** Normalized pathname, e.g. `/case-studies` (no trailing slash). */
  path: string;
  /** Fragment without the leading `#`, e.g. `faqs` (empty when absent). */
  anchor: string;
}

const normalize = (path: string) =>
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

export const readLocation = (): AppLocation => ({
  path: normalize(window.location.pathname),
  anchor: window.location.hash.slice(1),
});

/** Push (or replace) a clean URL and notify the app synchronously. */
export const navigate = (to: string, opts: { replace?: boolean } = {}) => {
  const url = to.startsWith('/') ? to : `/${to}`;
  if (opts.replace) window.history.replaceState(null, '', url);
  else window.history.pushState(null, '', url);
  window.dispatchEvent(new Event(ROUTE_EVENT));
};
