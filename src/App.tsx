import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustLogos } from './components/TrustLogos';
import { WhyMarketingFails } from './components/WhyMarketingFails';
import { Framework5D } from './components/Framework5D';
import { AgencyComparison } from './components/AgencyComparison';
import { SolutionsMatrix } from './components/SolutionsMatrix';
import { CaseStudies } from './components/CaseStudies';
import { Certifications } from './components/Certifications';
import { Testimonials } from './components/Testimonials';
import { MetricsBanner } from './components/MetricsBanner';
import { FAQSection } from './components/FAQSection';
import { AuditContactForm } from './components/AuditContactForm';
import { Footer } from './components/Footer';
import { GrowthAuditModal } from './components/GrowthAuditModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ServicesPage } from './pages/ServicesPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { AdminPage } from './pages/AdminPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { MarketingDisclaimerPage } from './pages/MarketingDisclaimerPage';
import { LegalNoticePage } from './pages/LegalNoticePage';
import { SocialMediaServicePage } from './pages/SocialMediaServicePage';
import { AppDevelopmentServicePage } from './pages/AppDevelopmentServicePage';
import { ContentWritingServicePage } from './pages/ContentWritingServicePage';
import { OrmServicePage } from './pages/OrmServicePage';

import { DesignServicePage } from './pages/DesignServicePage';

import { GmbServicePage } from './pages/GmbServicePage';

import { WebServicePage } from './pages/WebServicePage';
import { CaseStudy } from './types';

type Route = 'home' | 'about' | 'contact' | 'portfolio' | 'services' | 'service' | 'caseStudy' | 'admin' | 'refundPolicy' | 'privacyPolicy' | 'terms' | 'disclaimer' | 'legalNotice';

/** Hash routes (vs. home-page anchors like `#services`). */
const routeFromHash = (hash: string): Route =>
  hash === '#/about' || hash.startsWith('#/about?')
    ? 'about'
    : hash === '#/contact' || hash.startsWith('#/contact?')
      ? 'contact'
      : hash === '#/portfolio' || hash.startsWith('#/portfolio?')
        ? 'portfolio'
        : hash === '#/services' || hash.startsWith('#/services?')
          ? 'services'
          : hash.startsWith('#/service/')
            ? 'service'
            : hash.startsWith('#/case-study/')
              ? 'caseStudy'
            : hash === '#/admin' || hash.startsWith('#/admin?')
              ? 'admin'
              : hash === '#/refund-policy' || hash.startsWith('#/refund-policy?')
                ? 'refundPolicy'
                : hash === '#/privacy-policy' || hash.startsWith('#/privacy-policy?')
                  ? 'privacyPolicy'
                  : hash === '#/terms' || hash.startsWith('#/terms?')
                    ? 'terms'
                    : hash === '#/marketing-disclaimer' || hash.startsWith('#/marketing-disclaimer?')
                      ? 'disclaimer'
                      : hash === '#/legal-notice' || hash.startsWith('#/legal-notice?')
                        ? 'legalNotice'
                        : 'home';

/** Slug after `#/case-study/` (empty string when absent). */
const caseStudySlugFromHash = (hash: string): string =>
  hash.startsWith('#/case-study/') ? hash.slice('#/case-study/'.length).split('?')[0] : '';

/** Slug after `#/service/` (empty string when absent). */
const serviceSlugFromHash = (hash: string): string =>
  hash.startsWith('#/service/') ? hash.slice('#/service/'.length).split('?')[0] : '';

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash));
  /** Current case-study slug — lets `#/case-study/a` → `#/case-study/b` re-render. */
  const [caseStudySlug, setCaseStudySlug] = useState<string>(() =>
    caseStudySlugFromHash(window.location.hash)
  );
  /** Current service slug — `#/service/<slug>` detail pages. */
  const [serviceSlug, setServiceSlug] = useState<string>(() =>
    serviceSlugFromHash(window.location.hash)
  );
  /** Section id to scroll to once the home page has rendered (cross-page anchor). */
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const handleOpenAudit = () => {
    setIsAuditModalOpen(true);
  };

  const handleCloseAudit = () => {
    setIsAuditModalOpen(false);
  };

  const handleScrollToFramework = () => {
    const el = document.getElementById('framework');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cross-page navigation: #/about <-> home anchors (works with back/forward too).
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      const next = routeFromHash(hash);

      if (next !== route) {
        setRoute(next);
        if (next === 'caseStudy') {
          // Entering a case study: sync the slug and start at the top.
          setCaseStudySlug(caseStudySlugFromHash(hash));
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else if (next === 'service') {
          // Entering a service detail page: sync the slug and start at the top.
          setServiceSlug(serviceSlugFromHash(hash));
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else if (next === 'home') {
          // Landing on the home page from a sub-page: resolve the anchor after render.
          const id = hash.slice(1);
          setPendingAnchor(id || 'home');
        } else {
          // Page switches (about/contact/portfolio) jump instantly — a smooth
          // scroll across two full pages feels broken.
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else if (next === 'caseStudy') {
        // Same route, different slug (or back/forward between studies).
        const slug = caseStudySlugFromHash(hash);
        if (slug !== caseStudySlug) {
          setCaseStudySlug(slug);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else if (next === 'service') {
        // Same route, different service slug (or back/forward between services).
        const slug = serviceSlugFromHash(hash);
        if (slug !== serviceSlug) {
          setServiceSlug(slug);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else if (next === 'home' && hash && hash !== '#/') {
        // Same-page anchor clicks are handled natively by the browser.
        setPendingAnchor(null);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [route, caseStudySlug, serviceSlug]);

  // Scroll to the requested home-section once it exists in the DOM.
  useEffect(() => {
    if (route !== 'home' || !pendingAnchor) return;
    const id = pendingAnchor;
    setPendingAnchor(null);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'instant' });
  }, [route, pendingAnchor]);

  return (
    <MotionConfig reducedMotion="user">
      {route === 'admin' ? (
        /* Admin panel renders bare — no navbar, footer, or marketing modals. */
        <div className="min-h-screen selection:bg-[#C61A1A] selection:text-white">
          <AdminPage />
        </div>
      ) : (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-[#C61A1A] selection:text-white">
          {/* Top Bar & Navigation */}
          <Navbar onOpenAudit={handleOpenAudit} />

          <main>
            {route === 'about' ? (
              <AboutPage onOpenAudit={handleOpenAudit} />
            ) : route === 'contact' ? (
              <ContactPage />
            ) : route === 'portfolio' ? (
              <PortfolioPage onOpenAudit={handleOpenAudit} />
            ) : route === 'services' ? (
              <ServicesPage onOpenAudit={handleOpenAudit} />
            ) : route === 'service' ? (
              serviceSlug === 'social-media-marketing' ? (
                <SocialMediaServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'application-development' ? (
                <AppDevelopmentServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'content-writing' ? (
                <ContentWritingServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'online-reputation-management' ? (
                <OrmServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'graphic-designing' ? (
                <DesignServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'google-my-business' ? (
                <GmbServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'web-development' ? (
                <WebServicePage onOpenAudit={handleOpenAudit} />
              ) : (
                /* Unknown service slug → the catalog, so 404-ish URLs stay useful. */
                <ServicesPage onOpenAudit={handleOpenAudit} />
              )
            ) : route === 'caseStudy' ? (
              <CaseStudyPage slug={caseStudySlug} onOpenAudit={handleOpenAudit} />
            ) : route === 'refundPolicy' ? (
              <RefundPolicyPage />
            ) : route === 'privacyPolicy' ? (
              <PrivacyPolicyPage />
            ) : route === 'terms' ? (
              <TermsPage />
            ) : route === 'disclaimer' ? (
              <MarketingDisclaimerPage />
            ) : route === 'legalNotice' ? (
              <LegalNoticePage />
            ) : (
              <>
              {/* 1. Hero Section */}
              <Hero
                onOpenAudit={handleOpenAudit}
                onScrollToFramework={handleScrollToFramework}
              />

              {/* 2. Client Trust Logos */}
              <TrustLogos />

              {/* 3. Why Most Marketing Fails */}
              <WhyMarketingFails
                onOpenAudit={handleOpenAudit}
                onScrollToFramework={handleScrollToFramework}
              />

              {/* 4. 5D Growth Framework & Interactive Funnel */}
              <Framework5D onOpenAudit={handleOpenAudit} />

              {/* 5. Traditional Agencies vs DIGIVIBZ Revenue System */}
              <AgencyComparison onOpenAudit={handleOpenAudit} />

              {/* 6. Solutions & Services Matrix */}
              <SolutionsMatrix onOpenAudit={handleOpenAudit} />

              {/* 7. Case Studies Carousel & Proof */}
              <CaseStudies
                onOpenAudit={handleOpenAudit}
                onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
              />

              {/* 8. Industry Accreditations & Certifications */}
              <Certifications />

              {/* 9. Client Testimonials */}
              <Testimonials />

              {/* 10. The 5D Revenue System Metrics */}
              <MetricsBanner />

              {/* 11. Frequently Asked Questions */}
              <FAQSection />

              {/* 12. Final Custom Growth Plan & Contact Form */}
              <AuditContactForm />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Modals */}
        <GrowthAuditModal
          isOpen={isAuditModalOpen}
          onClose={handleCloseAudit}
        />

        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onOpenAudit={handleOpenAudit}
        />
        </div>
      )}
    </MotionConfig>
  );
}
