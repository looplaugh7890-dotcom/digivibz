/**
 * Per-route document SEO for the SPA.
 *
 * The site renders every route from one index.html, so the static head only
 * ever describes the home page. `applySeo` rewrites title / description /
 * canonical / Open Graph tags whenever the router changes path, so each
 * route ships crawlable, shareable metadata (Google renders the JS, and the
 * tags are also present for link unfurlers that execute scripts).
 *
 * Static crawlers that don't execute JS still see the home-page defaults in
 * index.html — the full route list is mirrored for them in public/sitemap.xml.
 */

import { CASE_STUDIES } from './data/content';
import { SERVICES } from './data/servicesContent';

const SITE_NAME = 'DIGIVIBZ';
const SITE_URL = 'https://digivibz.com';

export interface RouteSeo {
  title: string;
  description: string;
  /** `index` = follow + include in sitemap; `noindex` = admin/preview routes. */
  robots: 'index, follow' | 'noindex, nofollow';
}

const HOME: RouteSeo = {
  title: `${SITE_NAME} - AI-Powered Digital Marketing Agency`,
  description:
    "America's AI-Powered Digital Marketing Agency for Revenue Growth. Scale leads, sales, and predictable revenue with the 5D Growth Framework.",
  robots: 'index, follow',
};

/** Fixed routes that aren't data-driven. */
const STATIC_ROUTES: Record<string, RouteSeo> = {
  '/': HOME,
  '/about': {
    title: `About ${SITE_NAME} — The Team Behind the 5D Growth Framework`,
    description:
      'Meet DIGIVIBZ: an AI-powered digital marketing agency that builds connected revenue systems across SEO, ads, content, and web for US businesses.',
    robots: 'index, follow',
  },
  '/services': {
    title: `Digital Marketing Services — SEO, Ads, Web & AI | ${SITE_NAME}`,
    description:
      'Explore 15 services across marketing, creative, web, and reputation — each one a stage of the DIGIVIBZ 5D Growth Framework.',
    robots: 'index, follow',
  },
  '/case-studies': {
    title: `Case Studies — Real Results Across 13 Industries | ${SITE_NAME}`,
    description:
      'Read the full story behind 13 client engagements: the challenge, the 5D Growth Framework in action, and the measured results after launch.',
    robots: 'index, follow',
  },
  '/portfolio': {
    title: `Portfolio — The Work Behind Real Business Growth | ${SITE_NAME}`,
    description:
      'A look at selected DIGIVIBZ projects across industries — websites, campaigns, and brand systems built to generate revenue.',
    robots: 'index, follow',
  },
  '/contact': {
    title: `Contact ${SITE_NAME} — Book a Free Growth Audit`,
    description:
      'Tell us about your business and goals. We reply within one business day with a free growth audit and a clear next step.',
    robots: 'index, follow',
  },
  '/refund-policy': {
    title: `Refund Policy | ${SITE_NAME}`,
    description: 'The DIGIVIBZ refund policy — how cancellations, refunds, and billing adjustments are handled.',
    robots: 'index, follow',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'How DIGIVIBZ collects, uses, and protects personal data across this website and our services.',
    robots: 'index, follow',
  },
  '/terms': {
    title: `Terms of Service | ${SITE_NAME}`,
    description: 'The terms governing use of the DIGIVIBZ website and engagement of our digital marketing services.',
    robots: 'index, follow',
  },
  '/marketing-disclaimer': {
    title: `Marketing Disclaimer | ${SITE_NAME}`,
    description: 'Results disclaimers and marketing disclosures for DIGIVIBZ services and case-study figures.',
    robots: 'index, follow',
  },
  '/legal-notice': {
    title: `Legal Notice | ${SITE_NAME}`,
    description: 'Legal identification and contact details for the DIGIVIBZ agency website.',
    robots: 'index, follow',
  },
  '/admin': {
    title: `Admin | ${SITE_NAME}`,
    description: 'Internal inbox.',
    robots: 'noindex, nofollow',
  },
};

/** Trims a description to a safe meta length (~155 chars). */
const metaDescription = (text: string) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= 160) return clean;
  return clean.slice(0, 157).replace(/\s+\S*$/, '') + '…';
};

/** Resolves the SEO entry for a normalized pathname. */
export function seoForPath(path: string): RouteSeo {
  const fixed = STATIC_ROUTES[path];
  if (fixed) return fixed;

  if (path.startsWith('/service/')) {
    const slug = path.slice('/service/'.length);
    const service = SERVICES.find((s) => s.slug === slug);
    if (service) {
      return {
        title: `${service.name} Services — ${SITE_NAME}`,
        description: metaDescription(service.description),
        robots: 'index, follow',
      };
    }
  }

  if (path.startsWith('/case-study/')) {
    const slug = path.slice('/case-study/'.length);
    const study = CASE_STUDIES.find((s) => s.id === slug);
    if (study) {
      return {
        title: `${study.title} | ${SITE_NAME} Case Study`,
        description: metaDescription(study.summary),
        robots: 'index, follow',
      };
    }
    // Unknown study slug — the router bounces it to /portfolio.
    return { title: `${SITE_NAME} Case Study`, description: HOME.description, robots: 'noindex, nofollow' };
  }

  // Unrecognized path (router shows home) — don't index a duplicate.
  return { title: HOME.title, description: HOME.description, robots: 'noindex, nofollow' };
}

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
};

/** Applies title/description/canonical/OG for the current pathname. */
export function applySeo(path: string): void {
  const { title, description, robots } = seoForPath(path);
  const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  document.title = title;
  setMeta('name', 'name', 'description', description);
  setMeta('name', 'name', 'robots', robots);
  setCanonical(url);

  setMeta('property', 'property', 'og:title', title);
  setMeta('property', 'property', 'og:description', description);
  setMeta('property', 'property', 'og:url', url);
  setMeta('property', 'property', 'og:site_name', SITE_NAME);
  setMeta('name', 'name', 'twitter:title', title);
  setMeta('name', 'name', 'twitter:description', description);
}
