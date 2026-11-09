import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  PhoneOff,
  Search,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { CountUp } from '../components/CountUp';
import { ContactForm } from '../components/ContactForm';
import { CHOOSE_REASONS, CONNECT_WAYS, CONTACT_STEPS } from '../data/contactContent';

/** Step icons, keyed by contactContent icon names. */
const STEP_ICONS = {
  search: Search,
  target: Target,
  file: FileText,
  clock: Clock,
} as const;

/** Connect-card icons, keyed by contactContent icon names. */
const WAY_ICONS = {
  mail: Mail,
  phone: Phone,
  calendar: CalendarClock,
  linkedin: Linkedin,
} as const;

/** Q3-style chart values: three muted bars, then the red DIGIVIBZ ramp. */
const ROI_BARS = [
  { label: 'M1', height: 46, red: false },
  { label: 'M2', height: 58, red: false },
  { label: 'M3', height: 52, red: false },
  { label: 'M4', height: 96, red: true },
  { label: 'M5', height: 138, red: true },
  { label: 'M6', height: 182, red: true },
];

const ROI_FOOTER = [
  { value: '4X', label: 'Avg revenue growth', red: true },
  { value: '95%', label: 'Client satisfaction', red: false },
  { value: '250+', label: 'US brands served', red: false },
];

const HERO_STATS = [
  { value: '24–48h', label: 'First reply', red: true },
  { value: '250+', label: 'US businesses', red: false },
  { value: '4X', label: 'Avg growth', red: false },
];

/** Resting/peak heights (%) of the call-waveform bars in the hero phone. */
const CALL_WAVE = [45, 80, 55, 100, 65, 90, 50, 75, 40];

/**
 * Contact page (`/contact`) — client brief: hero → audit form → what
 * happens next → why choose us → ways to connect → closing CTA.
 * Red/white/black only; every visual is a chart, funnel-style timeline,
 * or dashboard panel (no decorative AI-style art).
 */
export const ContactPage: React.FC = () => {
  const reduceMotion = useReducedMotion();

  /**
   * Scroll to a section WITHOUT changing the hash — a raw `#audit-form`
   * hash change would make App's router unmount this page (it only knows
   * `/contact` and home anchors).
   */
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  /* Direct-line phone: idle → connecting → live → idle. */
  const [call, setCall] = useState<'idle' | 'connecting' | 'live'>('idle');
  const [callSeconds, setCallSeconds] = useState(0);

  useEffect(() => {
    if (call !== 'live') return;
    const tick = window.setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(tick);
  }, [call]);

  useEffect(() => {
    if (call !== 'connecting') return;
    const t = window.setTimeout(() => setCall('live'), 1100);
    return () => window.clearTimeout(t);
  }, [call]);

  const toggleCall = () => {
    if (call === 'idle') {
      setCallSeconds(0);
      setCall('connecting');
    } else if (call === 'live') {
      setCall('idle');
      setCallSeconds(0);
    }
  };

  const callClock = `${String(Math.floor(callSeconds / 60)).padStart(2, '0')}:${String(
    callSeconds % 60,
  ).padStart(2, '0')}`;

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — h1 + contact desk radar panel
      =================================================================== */}
      <section id="contact-hero" className="relative pt-6 pb-12 md:pt-8 md:pb-14 overflow-hidden bg-white">
        {/* Perspective grid floor (same texture as home/about heroes) */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_38%,#000_70%,transparent_100%)] opacity-70 -z-10 pointer-events-none"
        />
        {!reduceMotion && (
          <div
            className="absolute top-1/3 right-[6%] w-[420px] h-[420px] rounded-full -z-10 pointer-events-none opacity-50 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)',
              animation: 'dz-drift 14s ease-in-out infinite',
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 lg:items-stretch">
            {/* ---------------------------------------------------------- */}
            {/* Left column: headline + CTA + proof                        */}
            {/* ---------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-5">
              <motion.div
                {...rise(0.05)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-xs font-bold text-[#C61A1A] uppercase tracking-widest shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                Contact Us
              </motion.div>

              <motion.h1
                {...rise(0.12)}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.14]"
              >
                Contact Us — Let’s Take Your Business to{' '}
                <span className="text-[#C61A1A]">New Heights</span>
                <span className="sr-only"> digital marketing agency</span>
              </motion.h1>

              <motion.p {...rise(0.24)} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Have a project in mind? We’d love to hear about it. Tell us your goals, and we’ll show you a clear,
                step-by-step path to growth, powered by our 5D Growth Framework that has helped US businesses scale
                and dominate their market.
              </motion.p>

              <motion.div {...rise(0.34)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <a
                  href="#audit-form"
                  onClick={scrollToSection('audit-form')}
                  className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.99] group cursor-pointer"
                >
                  <span>Get Your Personalized Growth Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="mailto:hello@digivibz.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base rounded-xl border border-slate-300 shadow-2xs hover:border-slate-400 hover:-translate-y-0.5 transition-all"
                >
                  <Mail className="w-4 h-4 text-[#C61A1A]" />
                  <span>hello@digivibz.com</span>
                </a>
              </motion.div>

              {/* Proof strip */}
              <motion.div {...rise(0.44)} className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C61A1A]" />
                  <strong className="text-slate-800">24–48h</strong>&nbsp;response time
                </span>
                <span className="hidden sm:inline w-px h-4 bg-slate-200" />
                <span>
                  <strong className="text-slate-800">250+</strong>&nbsp;US businesses served
                </span>
              </motion.div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* Right column: interactive direct-line phone panel           */}
            {/* ---------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col w-full">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full"
              >
                {/* Direct-line panel — same white family as the other hero cards */}
                <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
                  {/* Panel header */}
                  <div className="flex items-center justify-between px-5 sm:px-6 pt-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        Digivibz Direct Line
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                      24–48h Response
                    </span>
                  </div>

                  {/* Phone body */}
                  <div className="relative flex flex-col items-center px-5 sm:px-6 pt-6 pb-6">
                    {/* dot-grid texture */}
                    <span
                      className="absolute inset-0 opacity-60 pointer-events-none bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:18px_18px]"
                      aria-hidden="true"
                    />

                    <div
                      className={`relative ${call === 'idle' && !reduceMotion ? 'dz-float' : ''}`}
                    >
                      {/* ringing halo */}
                      {call !== 'live' && !reduceMotion && (
                        <>
                          <span className="absolute -inset-3 rounded-[2.6rem] border-2 border-[#C61A1A]/35 dz-pulse-ring pointer-events-none" />
                          <span
                            className="absolute -inset-3 rounded-[2.6rem] border-2 border-[#C61A1A]/20 dz-pulse-ring pointer-events-none"
                            style={{ animationDelay: '1.2s' }}
                          />
                        </>
                      )}

                      {/* device */}
                      <div className="relative w-[156px] sm:w-[168px] h-[300px] sm:h-[320px] rounded-[2.2rem] bg-[#18181B] border border-white/10 p-2.5 shadow-[0_30px_60px_-25px_rgba(15,23,42,0.55)]">
                        <div className="flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white">
                          {/* status bar */}
                          <div className="flex items-center justify-between px-3.5 pt-2.5 pb-1 text-[8px] font-extrabold text-slate-400 tabular-nums">
                            <span>9:41</span>
                            <span className="flex items-center gap-1" aria-hidden="true">
                              <span className="flex h-2 items-end gap-px">
                                {[3, 5, 7, 9].map((h) => (
                                  <span
                                    key={h}
                                    className="w-[2px] rounded-sm bg-slate-400"
                                    style={{ height: h }}
                                  />
                                ))}
                              </span>
                              <span className="relative h-1.5 w-3.5 rounded-[2px] border border-slate-400">
                                <span className="absolute inset-[1px] right-[3px] rounded-[1px] bg-slate-400" />
                              </span>
                            </span>
                          </div>

                          {/* call view */}
                          <div className="flex flex-1 flex-col items-center justify-center px-3 text-center">
                            {/* avatar */}
                            <span
                              className={`relative flex h-12 w-12 items-center justify-center rounded-full ${
                                call === 'live'
                                  ? 'bg-[#C61A1A] text-white'
                                  : 'border border-red-100 bg-red-50 text-[#C61A1A]'
                              }`}
                            >
                              <Phone className="h-5 w-5" />
                              {call === 'live' && !reduceMotion && (
                                <span className="absolute inset-0 rounded-full border-2 border-[#C61A1A]/50 dz-pulse-ring" />
                              )}
                            </span>

                            <span className="mt-2.5 text-[13px] font-extrabold leading-tight text-slate-900">
                              Digivibz Growth Team
                            </span>
                            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                              {call === 'live'
                                ? 'Connected · strategy call'
                                : call === 'connecting'
                                  ? 'Connecting…'
                                  : 'Free growth line'}
                            </span>

                            {/* waveform */}
                            <span
                              className="mt-3.5 flex h-6 items-end gap-[3px]"
                              aria-hidden="true"
                            >
                              {CALL_WAVE.map((h, i) => (
                                <motion.span
                                  key={i}
                                  className="w-[3px] rounded-full bg-[#C61A1A]"
                                  style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                                  animate={
                                    call === 'live' && !reduceMotion
                                      ? { scaleY: [0.4, 1, 0.45] }
                                      : { scaleY: 0.55 }
                                  }
                                  transition={
                                    call === 'live' && !reduceMotion
                                      ? {
                                          duration: 0.85 + i * 0.06,
                                          repeat: Infinity,
                                          repeatType: 'mirror',
                                          ease: 'easeInOut',
                                        }
                                      : { duration: 0.25 }
                                  }
                                />
                              ))}
                            </span>

                            {/* call clock */}
                            <span className="mt-1 text-[11px] font-bold tabular-nums text-slate-500">
                              {callClock}
                            </span>

                            {/* action button */}
                            <button
                              type="button"
                              onClick={toggleCall}
                              aria-label={call === 'live' ? 'End call' : 'Connect call'}
                              className={`mt-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors active:scale-95 ${
                                call === 'live'
                                  ? 'bg-[#18181B] text-white hover:bg-black'
                                  : `bg-[#C61A1A] text-white hover:bg-[#9E1414]${
                                      call === 'idle' && !reduceMotion ? ' dz-glow-pulse' : ''
                                    }`
                              }`}
                            >
                              {call === 'live' ? (
                                <PhoneOff className="h-5 w-5" />
                              ) : (
                                <Phone className="h-5 w-5" />
                              )}
                            </button>
                            <span className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">
                              {call === 'live'
                                ? 'End call'
                                : call === 'connecting'
                                  ? 'Ringing…'
                                  : 'Tap to connect'}
                            </span>
                          </div>

                          {/* home indicator */}
                          <div className="flex justify-center pb-2">
                            <span className="h-1 w-16 rounded-full bg-slate-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats strip */}
                  <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/60">
                    {HERO_STATS.map((stat) => (
                      <div key={stat.label} className="py-3.5 px-2 text-center">
                        <div
                          className={`text-base sm:text-lg font-extrabold leading-none tabular-nums ${
                            stat.red ? 'text-[#C61A1A]' : 'text-slate-900'
                          }`}
                        >
                          {stat.value}
                        </div>
                        <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacer — pushes the pill to bottom-align with the copy column */}
                <div className="hidden lg:block flex-1" />

                {/* Under-card pill (light — matches the white panel) */}
                <div className="mt-3 mx-auto w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-red-200 text-slate-700 text-xs font-semibold shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                  Serving B2B Businesses Across the US
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. FORM — h2 + h3 + ContactForm
      =================================================================== */}
      <section id="audit-form" className="py-14 md:py-16 bg-white border-t border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: proposition + checklist + stats */}
            <div className="lg:col-span-5 space-y-5">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" /> Get Your Personalized Growth Audit
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  Get Your Free Growth Audit From Our US{' '}
                  <span className="text-[#C61A1A]">Digital Marketing Experts</span>
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <ul className="space-y-3">
                  {[
                    { icon: FileText, text: 'A personalized digital growth plan tailored to your business.' },
                    { icon: Clock, text: 'We reach out within 24–48 hours with clear next steps.' },
                    { icon: TrendingUp, text: 'Built on the 5D Growth Framework that has helped US businesses scale.' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="p-1 rounded-md bg-red-50 text-[#C61A1A] mt-0.5 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.18} className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900 tabular-nums">
                    <CountUp value="250+" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Brands served</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-[#C61A1A] tabular-nums">
                    <CountUp value="4X" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Avg revenue growth</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900">24–48h</div>
                  <div className="text-[11px] text-slate-500 font-medium">Reply time</div>
                </div>
              </Reveal>
            </div>

            {/* Right: h3 + form */}
            <Reveal direction="right" delay={0.1} className="lg:col-span-7">
              <div className="flex items-end justify-between gap-4 mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Tell Us About Your Business Goals{' '}
                  <span className="inline-block text-[#C61A1A]" aria-hidden="true">↓</span>
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 shrink-0 pb-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C61A1A]" />
                  Free · No obligation
                </span>
              </div>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. WHAT HAPPENS NEXT — 4-step timeline
      =================================================================== */}
      <section id="what-next" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-red-200 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" /> What Happens Next
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                What Happens <span className="text-[#C61A1A]">After You Submit the Form</span>
              </h2>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* connector line (desktop) */}
            <div className="hidden lg:block absolute top-[30px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-red-200 via-red-300 to-red-200" />
            {CONTACT_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[step.icon];
              return (
                <Reveal key={step.title} delay={0.08 * i} className="relative">
                  <div className="h-full bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-red-200/70 transition-shadow">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-full bg-[#C61A1A] text-white flex items-center justify-center shadow-md relative z-10">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-2xl font-extrabold text-slate-200 tabular-nums leading-none">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-sm font-extrabold text-slate-900 tracking-tight">{step.title}</h3>
                    <p className="mt-1.5 text-sm font-bold text-[#C61A1A]">{step.heading}</p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Closing band */}
          <Reveal delay={0.2} className="mt-8">
            <div className="rounded-2xl bg-[#C61A1A] px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#C61A1A] text-xs font-bold uppercase tracking-widest shrink-0">
                5D Growth Framework
              </span>
              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                Your business growth becomes{' '}
                <span className="text-white font-extrabold underline decoration-white/50 underline-offset-4">
                  structured, measurable, and unstoppable.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          4. WHY CHOOSE US — bullets + ROI chart panel
      =================================================================== */}
      <section id="why-digivibz" className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: copy + bullets */}
            <div className="lg:col-span-6 space-y-4">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Trusted by US Businesses for Measurable Growth
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  Why US Businesses Choose{' '}
                  <span className="text-[#C61A1A]">Digivibz Digital Marketing Agency</span>
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-sm sm:text-base font-semibold text-slate-800">
                  At Digivibz, we don’t just run campaigns, we grow businesses.
                </p>
                <p className="text-sm text-slate-600 mt-1">Our clients choose us because we deliver:</p>
              </Reveal>

              <Reveal delay={0.18}>
                <ul className="space-y-3">
                  {CHOOSE_REASONS.map((reason) => (
                    <li key={reason} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="p-0.5 rounded-full bg-red-100 text-[#C61A1A] mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  When you work with us, you’re not taking a chance; you’re partnering with a team committed to
                  scaling your business and maximizing revenue.
                </p>
              </Reveal>
            </div>

            {/* Right: ROI chart panel */}
            <Reveal direction="right" delay={0.1} className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-32px_rgba(15,23,42,0.25)] overflow-hidden">
                {/* Panel header */}
                <div className="flex items-center justify-between px-5 sm:px-6 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      Measurable ROI
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" /> Typical agency
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#C61A1A]" /> With DIGIVIBZ
                    </span>
                  </div>
                </div>

                {/* Bar chart */}
                <svg viewBox="0 0 420 250" className="w-full select-none" role="img" aria-label="Bar chart: revenue growth with DIGIVIBZ reaches 4X versus typical agencies">
                  {/* grid lines */}
                  {[40, 80, 120, 160, 200].map((y) => (
                    <line key={y} x1="46" y1={y} x2="404" y2={y} stroke="#F1F5F9" strokeWidth="1.5" />
                  ))}
                  {/* axis */}
                  <line x1="46" y1="210" x2="404" y2="210" stroke="#E2E8F0" strokeWidth="2" />
                  <text x="40" y="214" textAnchor="end" fontSize="10" fontWeight="700" fill="#94A3B8">0</text>
                  <text x="40" y="164" textAnchor="end" fontSize="10" fontWeight="700" fill="#94A3B8">1X</text>
                  <text x="40" y="124" textAnchor="end" fontSize="10" fontWeight="700" fill="#94A3B8">2X</text>
                  <text x="40" y="84" textAnchor="end" fontSize="10" fontWeight="700" fill="#94A3B8">3X</text>
                  <text x="40" y="44" textAnchor="end" fontSize="10" fontWeight="700" fill="#94A3B8">4X</text>

                  {/* 4X target line */}
                  <line x1="46" y1="40" x2="404" y2="40" stroke="#C61A1A" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.55" />

                  {/* bars */}
                  {ROI_BARS.map((bar, i) => {
                    const x = 66 + i * 58;
                    const y = 210 - bar.height;
                    return (
                      <g key={bar.label}>
                        <rect
                          x={x}
                          y={y}
                          width="38"
                          height={bar.height}
                          rx="6"
                          fill={bar.red ? (i === 5 ? '#C61A1A' : i === 4 ? '#A51615' : '#D92121') : '#E2E8F0'}
                        />
                        <text x={x + 19} y="228" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748B">
                          {bar.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* 4X callout on the final bar */}
                  <g>
                    <rect x="316" y="14" width="52" height="24" rx="12" fill="#FFFFFF" stroke="#C61A1A" strokeWidth="1.5" />
                    <text x="342" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill="#C61A1A">4X</text>
                    <path d="M342 38 L342 44" stroke="#C61A1A" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  <text x="225" y="246" textAnchor="middle" fontSize="10" fontWeight="700" fill="#94A3B8" letterSpacing="1.5">
                    REVENUE GROWTH ACROSS A 6-MONTH ENGAGEMENT
                  </text>
                </svg>

                {/* Footer stats */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/60">
                  {ROI_FOOTER.map((stat) => (
                    <div key={stat.label} className="py-3.5 px-2 text-center">
                      <div
                        className={`text-lg sm:text-xl font-extrabold leading-none tabular-nums ${
                          stat.red ? 'text-[#C61A1A]' : 'text-slate-900'
                        }`}
                      >
                        {stat.value}
                      </div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. WAYS TO CONNECT — 4 cards + closing
      =================================================================== */}
      <section id="connect" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-red-200 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" /> Get in Touch
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Multiple Ways to Connect With Our{' '}
                <span className="text-[#C61A1A]">Digital Marketing Team</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONNECT_WAYS.map((way, i) => {
              const Icon = WAY_ICONS[way.icon as keyof typeof WAY_ICONS];
              const external = way.href.startsWith('http');
              const internal = way.href.startsWith('#');
              return (
                <Reveal key={way.title} delay={0.06 * i}>
                  <div
                    className={`h-full flex flex-col p-5 rounded-2xl border transition-shadow ${
                      way.highlight
                        ? 'bg-[#C61A1A] border-[#C61A1A] shadow-md hover:shadow-lg text-white'
                        : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:border-red-200/70'
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        way.highlight ? 'bg-white/15 text-white' : 'bg-red-50 text-[#C61A1A]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className={`mt-4 text-sm font-extrabold ${way.highlight ? 'text-white' : 'text-slate-900'}`}>
                      {way.title}
                    </h3>
                    <p
                      className={`mt-1 text-sm font-semibold break-words ${
                        way.highlight ? 'text-white' : 'text-[#C61A1A]'
                      }`}
                    >
                      {way.detail}
                    </p>
                    <p className={`mt-2 text-xs leading-relaxed flex-1 ${way.highlight ? 'text-white/85' : 'text-slate-500'}`}>
                      {way.note}
                    </p>
                    <a
                      href={way.href}
                      onClick={internal ? scrollToSection('audit-form') : undefined}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                        way.highlight
                          ? 'text-white hover:gap-2.5'
                          : 'text-slate-700 hover:text-[#C61A1A]'
                      } transition-all`}
                    >
                      {way.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Location + closing */}
          <Reveal delay={0.2} className="mt-8 text-center space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs">
              <MapPin className="w-4 h-4 text-[#C61A1A]" />
              Serving B2B businesses across the US
            </span>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
              We’re ready to review your goals, uncover growth opportunities, and show you how our 5D Growth
              Framework can take your business to the next level.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          6. CLOSING CTA — brand red band
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-[#C61A1A] overflow-hidden">
        {/* white corner rails */}
        <div className="absolute top-0 left-0 w-40 h-1 bg-white/70" />
        <div className="absolute top-0 right-0 w-40 h-1 bg-white/70" />
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Contact Our Digital Marketing Agency to Take Your Business to{' '}
              <span className="text-white underline decoration-white/50 underline-offset-4">New Heights</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#audit-form"
              onClick={scrollToSection('audit-form')}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-[#C61A1A] font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>Get My Free Growth Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+18005553444"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-xl border border-white/30 hover:border-white/60 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>+1 (800) 555-DIGI</span>
            </a>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-xs text-white/75">
              24–48 hour response · Free personalized plan · Zero obligation
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
