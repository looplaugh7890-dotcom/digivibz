import React, { useEffect, useRef, useState } from 'react';
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
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { CupsNChaiCaseStudyPage } from './pages/CupsNChaiCaseStudyPage';
import { RevivalResearchCaseStudyPage } from './pages/RevivalResearchCaseStudyPage';
import { SchaeferLyndonCaseStudyPage } from './pages/SchaeferLyndonCaseStudyPage';
import { AllAboutConcreteCaseStudyPage } from './pages/AllAboutConcreteCaseStudyPage';
import { RoofClaimCaseStudyPage } from './pages/RoofClaimCaseStudyPage';
import { LungNSleepCaseStudyPage } from './pages/LungNSleepCaseStudyPage';
import { PlumbexCaseStudyPage } from './pages/PlumbexCaseStudyPage';
import { BrightSparkCaseStudyPage } from './pages/BrightSparkCaseStudyPage';
import { BkIndustrialCaseStudyPage } from './pages/BkIndustrialCaseStudyPage';
import { UavCoachCaseStudyPage } from './pages/UavCoachCaseStudyPage';
import { LumiereCaseStudyPage } from './pages/LumiereCaseStudyPage';
import { KeyGuardCaseStudyPage } from './pages/KeyGuardCaseStudyPage';
import { RapidRestoreCaseStudyPage } from './pages/RapidRestoreCaseStudyPage';
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

import { WebDesignServicePage } from './pages/WebDesignServicePage';

import { EmailServicePage } from './pages/EmailServicePage';
import { VideoEditingServicePage } from './pages/VideoEditingServicePage';
import { InfluencerMarketingServicePage } from './pages/InfluencerMarketingServicePage';

import { AiAutomationServicePage } from './pages/AiAutomationServicePage';
import { GoogleAdsServicePage } from './pages/GoogleAdsServicePage';
import { SeoServicePage } from './pages/SeoServicePage';
import { AiSeoServicePage } from './pages/AiSeoServicePage';
import { CaseStudy } from './types';
import { ROUTE_EVENT, navigate, readLocation, type AppLocation } from './router';
import { applySeo } from './seo';

type Route = 'home' | 'about' | 'contact' | 'portfolio' | 'services' | 'service' | 'caseStudies' | 'caseStudy' | 'admin' | 'refundPolicy' | 'privacyPolicy' | 'terms' | 'disclaimer' | 'legalNotice';

/** Clean-path routes (vs. in-page anchors like `#faqs`). */
const routeFromPath = (path: string): Route =>
  path === '/about'
    ? 'about'
    : path === '/contact'
      ? 'contact'
      : path === '/portfolio'
        ? 'portfolio'
        : path === '/services'
          ? 'services'
          : path.startsWith('/service/')
            ? 'service'
            : path === '/case-studies'
              ? 'caseStudies'
              : path.startsWith('/case-study/')
                ? 'caseStudy'
                : path === '/admin'
                  ? 'admin'
                  : path === '/refund-policy'
                    ? 'refundPolicy'
                    : path === '/privacy-policy'
                      ? 'privacyPolicy'
                      : path === '/terms'
                        ? 'terms'
                        : path === '/marketing-disclaimer'
                          ? 'disclaimer'
                          : path === '/legal-notice'
                            ? 'legalNotice'
                            : 'home';

/** Slug after `/case-study/` (empty string when absent). */
const caseStudySlugFromPath = (path: string): string =>
  path.startsWith('/case-study/') ? path.slice('/case-study/'.length) : '';

/** Slug after `/service/` (empty string when absent). */
const serviceSlugFromPath = (path: string): string =>
  path.startsWith('/service/') ? path.slice('/service/'.length) : '';

export default function App() {
  const [loc, setLoc] = useState<AppLocation>(() => readLocation());
  const route = routeFromPath(loc.path);
  /** Current case-study slug — lets `/case-study/a` → `/case-study/b` re-render. */
  const caseStudySlug = caseStudySlugFromPath(loc.path);
  /** Current service slug — `/service/<slug>` detail pages. */
  const serviceSlug = serviceSlugFromPath(loc.path);
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

  // Keep the rendered route in sync with the address bar (back/forward + navigate()).
  useEffect(() => {
    const sync = () => setLoc(readLocation());
    window.addEventListener('popstate', sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  // Legacy hash URLs (/#/about, #home) keep working — rewrite once to the clean path.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) navigate(hash.slice(1), { replace: true });
    else if (hash === '#home') navigate('/', { replace: true });
  }, []);

  // Same-origin path links navigate inside the SPA; anchors & external stay native.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('/') || link.hasAttribute('download')) return;
      if (link.target && link.target !== '_self') return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Scroll policy on path change: sub-pages jump to top, home resolves its anchor.
  const prevPath = useRef(loc.path);
  useEffect(() => {
    if (prevPath.current === loc.path) return; // anchor-only move: browser scrolls natively
    prevPath.current = loc.path;
    if (route === 'home') {
      setPendingAnchor(loc.anchor || 'home');
    } else {
      setPendingAnchor(null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [loc, route]);

  // Per-route document SEO — title, description, canonical, OG/Twitter tags.
  useEffect(() => {
    applySeo(loc.path);
  }, [loc.path]);

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
              ) : serviceSlug === 'web-designing' ? (
                <WebDesignServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'email-marketing' ? (
                <EmailServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'video-editing' ? (
                <VideoEditingServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'influencer-marketing' ? (
                <InfluencerMarketingServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'ai-automation' ? (
                <AiAutomationServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'google-ads-agency' ? (
                <GoogleAdsServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'seo-services' ? (
                <SeoServicePage onOpenAudit={handleOpenAudit} />
              ) : serviceSlug === 'ai-seo-services' ? (
                <AiSeoServicePage onOpenAudit={handleOpenAudit} />
              ) : (
                /* Unknown service slug → the catalog, so 404-ish URLs stay useful. */
                <ServicesPage onOpenAudit={handleOpenAudit} />
              )
            ) : route === 'caseStudies' ? (
              <CaseStudiesPage onOpenAudit={handleOpenAudit} />
            ) : route === 'caseStudy' ? (
              caseStudySlug === 'revival-research' ? (
                <RevivalResearchCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'cups-n-chai' ? (
                <CupsNChaiCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'schaefer-lyndon' ? (
                <SchaeferLyndonCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'all-about-concrete' ? (
                <AllAboutConcreteCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'roof-claim' ? (
                <RoofClaimCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'lung-n-sleep' ? (
                <LungNSleepCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'plumbex' ? (
                <PlumbexCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'brightspark-electrical' ? (
                <BrightSparkCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'bk-industrial-coatings' ? (
                <BkIndustrialCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'uav-coach-academy' ? (
                <UavCoachCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'lumiere-fine-jewelry' ? (
                <LumiereCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'keyguard-locksmith' ? (
                <KeyGuardCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : caseStudySlug === 'rapidrestore' ? (
                <RapidRestoreCaseStudyPage onOpenAudit={handleOpenAudit} />
              ) : (
                <CaseStudyPage slug={caseStudySlug} onOpenAudit={handleOpenAudit} />
              )
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
