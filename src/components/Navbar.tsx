import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenAudit: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#/about' },
  { label: 'Portfolio', href: '#/portfolio' },
  { label: 'Services', href: '#/services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: '5D Framework', href: '#framework' },
  { label: 'Resources', href: '#faqs' },
  { label: 'Contact', href: '#/contact' },
];

/** True while a dedicated page route (hash-based) is active. */
const isPageHash = (hash: string, page: string) => hash === page || hash.startsWith(page + '?');

export const Navbar: React.FC<NavbarProps> = ({ onOpenAudit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  // Shadow once the page is scrolled + scrollspy for the active link
  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > 8);

      // On page routes only their own link can be active — those pages'
      // sections (home anchors) aren't in the DOM while the route is mounted.
      const hash = window.location.hash;
      if (isPageHash(hash, '#/about')) {
        setActiveHref('#/about');
        ticking = false;
        return;
      }
      if (isPageHash(hash, '#/portfolio') || hash.startsWith('#/case-study/')) {
        // Case-study pages belong to the Portfolio nav item.
        setActiveHref('#/portfolio');
        ticking = false;
        return;
      }
      if (isPageHash(hash, '#/services')) {
        setActiveHref('#/services');
        ticking = false;
        return;
      }
      if (isPageHash(hash, '#/contact')) {
        setActiveHref('#/contact');
        ticking = false;
        return;
      }
      if (isPageHash(hash, '#/refund-policy')) {
        // Legal page — not a nav destination, so nothing stays highlighted.
        setActiveHref('');
        ticking = false;
        return;
      }
      if (isPageHash(hash, '#/privacy-policy')) {
        // Legal page — not a nav destination, so nothing stays highlighted.
        setActiveHref('');
        ticking = false;
        return;
      }
      if (isPageHash(hash, '#/terms')) {
        // Legal page — not a nav destination, so nothing stays highlighted.
        setActiveHref('');
        ticking = false;
        return;
      }
      if (isPageHash(hash, '#/marketing-disclaimer')) {
        // Legal page — not a nav destination, so nothing stays highlighted.
        setActiveHref('');
        ticking = false;
        return;
      }
      if (isPageHash(hash, '#/legal-notice')) {
        // Legal page — not a nav destination, so nothing stays highlighted.
        setActiveHref('');
        ticking = false;
        return;
      }

      const probe = window.scrollY + 160;
      let current = '#home';
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.href.slice(1));
        if (el && el.offsetTop <= probe) current = link.href;
      }
      setActiveHref(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    const onHashChange = () => {
      update();
      // Route switches don't always produce a scroll event (e.g. instant
      // jump to top) — re-run on the next frame so the underline moves.
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  // Close the drawer automatically when the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? 'border-slate-200 shadow-[0_4px_24px_-12px_rgba(15,23,42,0.25)]' : 'border-slate-100'
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-black text-white text-xs sm:text-[13px] py-2 px-4 font-normal text-center flex flex-wrap items-center justify-center gap-2 tracking-tight">
        <span className="bg-[#C61A1A] text-white px-3 py-0.5 rounded-full text-[11px] font-bold shadow-xs">
          Limited Time Offer
        </span>
        <span className="text-slate-200">
          Get Your Free AI-Powered Growth Audit & Discover How to 4X Your Revenue
        </span>
        <button
          onClick={onOpenAudit}
          className="inline-flex items-center gap-1 font-semibold text-white underline underline-offset-2 hover:text-red-300 transition-colors ml-1 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 xl:gap-6">
        <a href="#home" className="shrink-0 flex items-center py-2 transition-transform hover:scale-[1.02]">
          <Logo size="lg" />
        </a>

        <nav className="hidden lg:flex items-center gap-2.5 xl:gap-7 text-sm xl:text-[15px] font-medium text-slate-800">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1 whitespace-nowrap transition-colors ${
                  isActive ? 'text-[#C61A1A]' : 'hover:text-[#C61A1A]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C61A1A] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
          <span className="hidden xl:inline text-slate-200 font-light select-none text-lg">|</span>
        </nav>

        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenAudit}
            className="dz-btn-shine px-5 xl:px-6 py-2.5 text-sm font-semibold text-white bg-[#C61A1A] hover:bg-[#9E1414] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer active:scale-[0.99]"
          >
            Get Free Growth Audit
          </button>
        </div>

        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenAudit}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#C61A1A] rounded-md"
          >
            Audit
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="sm:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.3 }}
                  className={`block py-2.5 text-base font-medium border-b border-slate-50 transition-colors ${
                    activeHref === link.href ? 'text-[#C61A1A]' : 'text-slate-800 hover:text-[#C61A1A]'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAudit();
                  }}
                  className="w-full py-3 text-center text-sm font-semibold text-white bg-[#C61A1A] rounded-lg shadow-sm"
                >
                  Get Free Growth Audit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
