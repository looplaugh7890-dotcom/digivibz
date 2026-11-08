import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { SERVICE_CATEGORIES, SERVICES } from '../data/servicesContent';

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

/** All 15 services grouped into their four catalog disciplines, for the mega menu. */
const MEGA_COLUMNS = SERVICE_CATEGORIES.map((cat) => ({
  ...cat,
  items: SERVICES.filter((s) => s.category === cat.id),
}));

/* Staggered entrance for the mega menu: panel → columns → items. */
const megaPanel: Variants = {
  hidden: { opacity: 0, y: -10, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};
const megaColumn: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028 } },
};
const megaItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenAudit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const [megaOpen, setMegaOpen] = useState(false);
  const megaCloseTimer = useRef<number | null>(null);

  // Hover-intent helpers: open instantly, close after a short grace period so
  // the pointer can travel from the nav link down into the panel.
  const clearMegaClose = () => {
    if (megaCloseTimer.current !== null) {
      window.clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
  };
  const openMega = () => {
    clearMegaClose();
    setMegaOpen(true);
  };
  const closeMega = () => {
    clearMegaClose();
    setMegaOpen(false);
  };
  const scheduleCloseMega = (delay = 180) => {
    clearMegaClose();
    megaCloseTimer.current = window.setTimeout(() => setMegaOpen(false), delay);
  };

  // The mega menu closes on navigation (any route/anchor change) and on Escape.
  useEffect(() => {
    const onHash = () => setMegaOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('keydown', onKey);
      if (megaCloseTimer.current !== null) window.clearTimeout(megaCloseTimer.current);
    };
  }, []);

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
      onMouseLeave={() => scheduleCloseMega()}
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
        <a
          href="#home"
          className="shrink-0 flex items-center py-2 transition-transform hover:scale-[1.02]"
          onMouseEnter={closeMega}
        >
          <Logo size="lg" />
        </a>

        <nav className="hidden lg:flex items-center gap-2.5 xl:gap-7 text-sm xl:text-[15px] font-medium text-slate-800">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            const isServices = link.label === 'Services';
            return (
              <a
                key={link.label}
                href={link.href}
                aria-haspopup={isServices ? 'true' : undefined}
                aria-expanded={isServices ? megaOpen : undefined}
                onMouseEnter={() => (isServices ? openMega() : closeMega())}
                onFocus={() => isServices && openMega()}
                className={`relative py-1 whitespace-nowrap transition-colors ${
                  isActive ? 'text-[#C61A1A]' : 'hover:text-[#C61A1A]'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  {link.label}
                  {isServices && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        megaOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </span>
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
            onMouseEnter={closeMega}
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

      {/* Desktop mega menu — all fifteen services, grouped by discipline */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            key="mega-menu"
            variants={megaPanel}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-[0_28px_56px_-28px_rgba(15,23,42,0.3)]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-5">
              <div className="grid grid-cols-4 gap-x-6 xl:gap-x-9 gap-y-1">
                {MEGA_COLUMNS.map((col) => (
                  <motion.div key={col.id} variants={megaColumn}>
                    <p className="flex items-baseline justify-between gap-2 border-b border-slate-100 pb-2 mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <span>{col.label}</span>
                      <span className="text-[#C61A1A]">{col.items.length}</span>
                    </p>
                    {col.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <motion.a
                          key={item.slug}
                          href={`#/service/${item.slug}`}
                          variants={megaItem}
                          onClick={closeMega}
                          className="group -mx-2 flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-red-50/70"
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 ring-1 ring-slate-200 transition-all group-hover:bg-[#C61A1A] group-hover:text-white group-hover:ring-[#C61A1A]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-1.5 text-[13.5px] font-semibold leading-tight text-slate-800 transition-colors group-hover:text-[#C61A1A]">
                              {item.name}
                              <ArrowRight className="h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                            <span className="mt-0.5 block text-[12px] leading-snug text-slate-500 line-clamp-2">
                              {item.description}
                            </span>
                          </span>
                        </motion.a>
                      );
                    })}
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <a
                  href="#/services"
                  onClick={closeMega}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-[#C61A1A]"
                >
                  <span>View all services</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
                <div className="flex items-center gap-4">
                  <span className="hidden xl:inline text-xs text-slate-400">
                    Not sure where to start? The audit will tell you.
                  </span>
                  <button
                    onClick={() => {
                      closeMega();
                      onOpenAudit();
                    }}
                    className="dz-btn-shine rounded-lg bg-[#C61A1A] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#9E1414] cursor-pointer"
                  >
                    Get Free Growth Audit
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
