import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { SERVICE_CATEGORIES, SERVICES } from '../data/servicesContent';
import { CASE_STUDIES } from '../data/content';
import { ROUTE_EVENT } from '../router';

interface NavbarProps {
  onOpenAudit: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact', href: '/contact' },
];

/** Paths that are not nav destinations — nothing stays highlighted there. */
const LEGAL_PATHS = [
  '/refund-policy',
  '/privacy-policy',
  '/terms',
  '/marketing-disclaimer',
  '/legal-notice',
  '/admin',
];

const normalizePath = (p: string) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p);

type MenuId = 'services' | 'cases';

/** Nav links that open a desktop dropdown panel (and a mobile accordion). */
const DROPDOWN_FOR: Record<string, MenuId> = {
  '/services': 'services',
  '/case-studies': 'cases',
};

/** All 15 services grouped into their four catalog disciplines, for the mega menu. */
const MEGA_COLUMNS = SERVICE_CATEGORIES.map((cat) => ({
  ...cat,
  items: SERVICES.filter((s) => s.category === cat.id),
}));

/** Flat link lists behind the two mobile accordions. */
const MOBILE_LISTS: Record<
  MenuId,
  { items: { href: string; label: string; note?: string }[]; allHref: string; allLabel: string }
> = {
  services: {
    items: SERVICES.map((s) => ({ href: `/service/${s.slug}`, label: s.name })),
    allHref: '/services',
    allLabel: 'View all services',
  },
  cases: {
    items: CASE_STUDIES.map((s, i) => ({
      href: `/case-study/${s.id}`,
      label: s.category,
      note: String(i + 1).padStart(2, '0'),
    })),
    allHref: '/case-studies',
    allLabel: 'View all case studies',
  },
};

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
  const [mobileExpand, setMobileExpand] = useState<MenuId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const activeHref =
    path === '/case-studies' || path.startsWith('/case-study/')
      ? '/case-studies'
      : LEGAL_PATHS.includes(path)
        ? ''
        : path;
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const closeTimer = useRef<number | null>(null);

  // Hover-intent helpers: open instantly, close after a short grace period so
  // the pointer can travel from the nav link down into the panel.
  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNav = (menu: MenuId) => {
    clearCloseTimer();
    setOpenMenu(menu);
  };
  const closeNav = () => {
    clearCloseTimer();
    setOpenMenu(null);
  };
  const scheduleCloseNav = (delay = 180) => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), delay);
  };

  // The dropdown panels close on navigation and on Escape.
  useEffect(() => {
    const onRoute = () => setOpenMenu(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    window.addEventListener(ROUTE_EVENT, onRoute);
    window.addEventListener('popstate', onRoute);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(ROUTE_EVENT, onRoute);
      window.removeEventListener('popstate', onRoute);
      window.removeEventListener('keydown', onKey);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, []);

  // Follow the address bar so the active underline tracks SPA navigation.
  useEffect(() => {
    const sync = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener(ROUTE_EVENT, sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener(ROUTE_EVENT, sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  // Shadow once the page is scrolled
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer automatically when the viewport grows to desktop nav
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
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
      onMouseLeave={() => scheduleCloseNav()}
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
          href="/"
          className="shrink-0 flex items-center py-2 transition-transform hover:scale-[1.02]"
          onMouseEnter={closeNav}
        >
          <Logo size="lg" />
        </a>

        <nav className="hidden lg:flex items-center gap-2.5 xl:gap-7 text-sm xl:text-[15px] font-medium text-slate-800">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            const menu = DROPDOWN_FOR[link.href];
            const isOpen = menu !== undefined && openMenu === menu;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-haspopup={menu ? 'true' : undefined}
                aria-expanded={menu ? isOpen : undefined}
                onMouseEnter={() => (menu ? openNav(menu) : closeNav())}
                onFocus={() => menu && openNav(menu)}
                className={`relative py-1 whitespace-nowrap transition-colors ${
                  isActive ? 'text-[#C61A1A]' : 'hover:text-[#C61A1A]'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  {link.label}
                  {menu && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
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
            onMouseEnter={closeNav}
            className="dz-btn-shine px-5 xl:px-6 py-2.5 text-sm font-semibold text-white bg-[#C61A1A] hover:bg-[#9E1414] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer active:scale-[0.99]"
          >
            Get Free Growth Audit
          </button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenAudit}
            className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-[#C61A1A] rounded-md"
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
        {openMenu === 'services' && (
          <motion.div
            key="services-mega-menu"
            variants={megaPanel}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden lg:block absolute left-0 right-0 top-full"
          >
            <div className="mx-auto w-[min(1152px,calc(100%_-_2rem))] rounded-b-2xl border border-t-0 border-slate-200 bg-white shadow-[0_28px_56px_-28px_rgba(15,23,42,0.3)]">
              <div className="px-6 pt-4 pb-3.5">
                <div className="grid grid-cols-5 gap-x-6">
                  {MEGA_COLUMNS.map((col) => (
                    <motion.div
                      key={col.id}
                      variants={megaColumn}
                      className={col.id === 'growth' ? 'col-span-2' : undefined}
                    >
                      <p className="flex items-baseline justify-between gap-2 border-b border-slate-100 pb-1.5 mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        <span>{col.label}</span>
                        <span className="text-[#C61A1A]">{col.items.length}</span>
                      </p>
                      <div className={col.id === 'growth' ? 'grid grid-cols-2 gap-x-5' : undefined}>
                        {col.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <motion.a
                              key={item.slug}
                              href={`/service/${item.slug}`}
                              variants={megaItem}
                              onClick={closeNav}
                              title={item.description}
                              className="group -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-[6px] transition-colors hover:bg-red-50/70"
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500 ring-1 ring-slate-200 transition-all group-hover:bg-[#C61A1A] group-hover:text-white group-hover:ring-[#C61A1A]">
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-slate-700 transition-colors group-hover:text-[#C61A1A]">
                                {item.name}
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-[#C61A1A] group-hover:opacity-100" />
                            </motion.a>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <a
                    href="/services"
                    onClick={closeNav}
                    className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#C61A1A]"
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
                        closeNav();
                        onOpenAudit();
                      }}
                      className="dz-btn-shine rounded-lg bg-[#C61A1A] px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#9E1414] cursor-pointer"
                    >
                      Get Free Growth Audit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop case-studies menu — every study, compact like the services one */}
      <AnimatePresence>
        {openMenu === 'cases' && (
          <motion.div
            key="cases-mega-menu"
            variants={megaPanel}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden lg:block absolute left-0 right-0 top-full"
          >
            <div className="mx-auto w-[min(1152px,calc(100%_-_2rem))] rounded-b-2xl border border-t-0 border-slate-200 bg-white shadow-[0_28px_56px_-28px_rgba(15,23,42,0.3)]">
              <div className="px-6 pt-4 pb-3.5">
                <p className="flex items-baseline justify-between gap-2 border-b border-slate-100 pb-1.5 mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  <span>Full case studies · measured on the client account</span>
                  <span className="text-[#C61A1A]">{CASE_STUDIES.length}</span>
                </p>

                <motion.div variants={megaColumn} className="grid grid-cols-4 gap-x-5">
                  {CASE_STUDIES.map((study, i) => (
                    <motion.a
                      key={study.id}
                      href={`/case-study/${study.id}`}
                      variants={megaItem}
                      onClick={closeNav}
                      title={study.title}
                      className="group -mx-2 flex items-start gap-2 rounded-lg px-2 py-[6px] transition-colors hover:bg-red-50/70"
                    >
                      <span className="mt-[3px] shrink-0 text-[10px] font-extrabold tabular-nums text-slate-300 transition-colors group-hover:text-[#C61A1A]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-semibold leading-snug text-slate-700 transition-colors group-hover:text-[#C61A1A]">
                          {study.category}
                        </span>
                        <span className="mt-0.5 block truncate text-[10.5px] font-bold tabular-nums text-slate-400 transition-colors group-hover:text-[#C61A1A]/70">
                          {study.results
                            .slice(0, 3)
                            .map((r) => r.value)
                            .join(' · ')}
                        </span>
                      </span>
                    </motion.a>
                  ))}
                </motion.div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <a
                    href="/case-studies"
                    onClick={closeNav}
                    className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#C61A1A]"
                  >
                    <span>View all case studies</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <div className="flex items-center gap-4">
                    <span className="hidden xl:inline text-xs text-slate-400">
                      Every number here was measured, not projected.
                    </span>
                    <button
                      onClick={() => {
                        closeNav();
                        onOpenAudit();
                      }}
                      className="dz-btn-shine rounded-lg bg-[#C61A1A] px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#9E1414] cursor-pointer"
                    >
                      Get Free Growth Audit
                    </button>
                  </div>
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
            className="lg:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {NAV_LINKS.map((link, i) => {
                const menu = DROPDOWN_FOR[link.href];
                const expanded = menu !== undefined && mobileExpand === menu;
                const list = menu ? MOBILE_LISTS[menu] : undefined;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.3 }}
                    className="border-b border-slate-50"
                  >
                    <div className="flex items-center">
                      <a
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex-1 py-2.5 text-base font-medium transition-colors ${
                          activeHref === link.href ? 'text-[#C61A1A]' : 'text-slate-800 hover:text-[#C61A1A]'
                        }`}
                      >
                        {link.label}
                      </a>
                      {menu && (
                        <button
                          onClick={() => setMobileExpand(expanded ? null : menu)}
                          aria-label={`Toggle ${link.label} list`}
                          aria-expanded={expanded}
                          className="-mr-2 p-2 text-slate-400 hover:text-[#C61A1A] cursor-pointer"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {expanded && list && (
                        <motion.div
                          key={`${menu}-mobile-list`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="max-h-[55vh] overflow-y-auto pb-2.5">
                            <div className="rounded-xl bg-slate-50 px-2.5 py-2 space-y-0.5">
                              {list.items.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13.5px] font-medium text-slate-700 transition-colors hover:bg-white hover:text-[#C61A1A]"
                                >
                                  {item.note && (
                                    <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-slate-300">
                                      {item.note}
                                    </span>
                                  )}
                                  <span className="min-w-0 flex-1">{item.label}</span>
                                </a>
                              ))}
                              <a
                                href={list.allHref}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-1.5 border-t border-slate-200 px-2 pt-2 mt-1 text-[13px] font-bold text-[#C61A1A]"
                              >
                                {list.allLabel}
                                <ArrowRight className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
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
