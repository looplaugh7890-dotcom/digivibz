import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Eye,
  Filter,
  Inbox,
  Layers,
  MailOpen,
  Send,
  ShieldAlert,
  ShoppingCart,
  Target,
  TrendingUp,
  Type,
  X,
  Zap,
} from 'lucide-react';

const RED = '#C61A1A';

/* ==========================================================================
   1. HERO — "MailComposer": someone writing an email. The subject and body
   type themselves while segment chips check into the targeting row and the
   recipient count climbs — then Send fires and the status flips to
   "delivered to inbox". The whole sequence loops.
   ========================================================================== */

const SEGMENTS = [
  { label: 'New subscribers', count: 2140 },
  { label: 'Cart abandoners', count: 1860 },
  { label: 'Past buyers', count: 2030 },
  { label: 'VIP repeat customers', count: 1000 },
];

const SUBJECT = 'Your cart misses you, Sarah — 10% inside';
const BODY =
  'Hi Sarah, you left something great behind. Your cart is still saved — complete your order today and take 10% off, just for you.';

const LOOP_MS = 9600;
const CHIP_AT = SEGMENTS.map((_, i) => 600 + i * 500);
const SUBJECT_AT = 400;
const SUBJECT_STEP = 45;
const BODY_AT = 2500;
const BODY_STEP = 22;
const CTA_AT = 5300;
const SEND_AT = 5600;
const SENT_AT = 6600;

const HERO_CHIPS = [
  { label: 'Automated sequences', Icon: Zap, tone: 'red' },
  { label: 'Inbox-first delivery', Icon: Inbox, tone: 'plain' },
  { label: '42% avg open rate', Icon: MailOpen, tone: 'plain' },
] as const;

export const MailComposer: React.FC = () => {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setT((x) => (x + 40) % LOOP_MS), 40);
    return () => window.clearInterval(id);
  }, [reduce]);

  const done = Boolean(reduce);
  const checked = SEGMENTS.filter((_, i) => done || t >= CHIP_AT[i]);
  const recipients = checked.reduce((sum, s) => sum + s.count, 0);
  const subjChars = done
    ? SUBJECT.length
    : Math.max(0, Math.min(SUBJECT.length, Math.floor((t - SUBJECT_AT) / SUBJECT_STEP)));
  const bodyChars = done
    ? BODY.length
    : Math.max(0, Math.min(BODY.length, Math.floor((t - BODY_AT) / BODY_STEP)));
  const ctaVisible = done || t >= CTA_AT;
  const sending = !done && t >= SEND_AT && t < SENT_AT;
  const sent = done || t >= SENT_AT;

  return (
    <motion.div
      className="relative w-full"
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={reduce ? undefined : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="absolute inset-2 sm:inset-6 bg-[radial-gradient(ellipse_at_50%_45%,rgba(198,26,26,0.12),transparent_70%)] blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* chips above the visual */}
      <div className="relative mb-3 flex flex-wrap items-center gap-2">
        {HERO_CHIPS.map(({ label, Icon, tone }, i) => (
          <motion.span
            key={label}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-extrabold shadow-[0_14px_30px_-18px_rgba(15,23,42,0.45)] ${
              tone === 'red'
                ? 'border-red-200 bg-red-50 text-[#C61A1A]'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: [0, -7, 0] }}
            transition={
              reduce
                ? undefined
                : {
                    opacity: { duration: 0.5, delay: 0.5 + i * 0.15 },
                    y: { duration: 3.4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' },
                  }
            }
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </motion.span>
        ))}
      </div>

      <div
        className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_36px_80px_-42px_rgba(15,23,42,0.6)]"
        role="img"
        aria-label="An email composer writing a personalised campaign while audience segments are selected for targeting, ending with delivery to the inbox"
      >
        {/* title bar */}
        <div className="flex items-center gap-2.5 border-b border-slate-200 bg-slate-50/70 px-3 sm:px-4 py-2.5">
          <span className="hidden sm:flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </span>
          <span className="ml-1 font-mono text-[10.5px] font-bold text-slate-600">
            campaign-047.compose
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={sent ? 'sent' : 'draft'}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className={`ml-auto rounded-md border px-2 py-0.5 font-mono text-[9.5px] font-extrabold ${
                sent
                  ? 'border-red-200 bg-red-50 text-[#C61A1A]'
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              {sent ? 'SENT' : 'DRAFT'}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row">
          {/* composer */}
          <div className="flex-1 border-b sm:border-b-0 sm:border-r border-slate-200 px-3.5 sm:px-4 py-3.5 min-w-0">
            {/* from */}
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-10 shrink-0 font-mono font-bold uppercase tracking-wide text-slate-400">
                From
              </span>
              <span className="truncate font-mono font-bold text-slate-700">
                hello@digivibz.com
              </span>
            </div>

            {/* targeting row */}
            <div className="mt-2.5 flex items-start gap-2">
              <span className="mt-0.5 w-10 shrink-0 font-mono text-[11px] font-bold uppercase tracking-wide text-slate-400">
                To
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SEGMENTS.map((s, i) => {
                  const on = done || t >= CHIP_AT[i];
                  return (
                    <span
                      key={s.label}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-extrabold transition-colors duration-300 ${
                        on
                          ? 'border-red-200 bg-red-50 text-[#C61A1A]'
                          : 'border-slate-200 bg-white text-slate-400'
                      }`}
                    >
                      <span
                        className={`flex h-3 w-3 items-center justify-center rounded-full ${
                          on ? 'bg-[#C61A1A] text-white' : 'bg-slate-200'
                        }`}
                      >
                        {on && <Check className="w-2 h-2" strokeWidth={4} />}
                      </span>
                      {s.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* subject */}
            <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3">
              <span className="mt-0.5 w-10 shrink-0 font-mono text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Subj
              </span>
              <p className="min-h-[1.25rem] flex-1 text-[13px] font-extrabold leading-snug text-slate-900">
                {SUBJECT.slice(0, subjChars)}
                {!done && subjChars > 0 && subjChars < SUBJECT.length && (
                  <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] bg-[#C61A1A]" aria-hidden="true" />
                )}
              </p>
            </div>

            {/* body */}
            <div className="mt-2 min-h-[86px] rounded-lg border border-slate-100 bg-slate-50/70 px-3 py-2.5">
              <p className="text-[12px] leading-relaxed text-slate-600">
                {BODY.slice(0, bodyChars)}
                {!done && bodyChars > 0 && bodyChars < BODY.length && (
                  <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-[2px] bg-slate-400" aria-hidden="true" />
                )}
              </p>
              <AnimatePresence>
                {ctaVisible && (
                  <motion.span
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2.5 inline-block rounded-md bg-[#C61A1A] px-3 py-1.5 text-[10.5px] font-extrabold text-white"
                  >
                    Complete my order
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* targeting panel */}
          <div className="w-full sm:w-[218px] shrink-0 px-3.5 sm:px-4 py-3.5 bg-slate-50/50">
            <p className="font-mono text-[9.5px] font-extrabold uppercase tracking-widest text-slate-400">
              Audience matched
            </p>
            <p className="mt-1.5 text-2xl font-extrabold tabular-nums leading-none text-slate-900">
              {recipients.toLocaleString('en-US')}
            </p>
            <p className="mt-1 text-[10px] font-bold text-slate-500">recipients, right person only</p>

            <div className="mt-3 space-y-1.5" aria-hidden="true">
              {SEGMENTS.map((s, i) => {
                const on = done || t >= CHIP_AT[i];
                return (
                  <div key={s.label} className="flex items-center justify-between gap-2">
                    <span
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                        on ? 'bg-[#C61A1A]' : 'bg-slate-200'
                      }`}
                    />
                    <span
                      className={`font-mono text-[9.5px] tabular-nums font-bold transition-colors ${
                        on ? 'text-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {on ? s.count.toLocaleString('en-US') : '—'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* send / status */}
            <div className="mt-3.5 min-h-[34px]">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-lg border border-red-200 bg-white px-2.5 py-2"
                  >
                    <p className="flex items-center gap-1.5 text-[10.5px] font-extrabold text-[#C61A1A]">
                      <Check className="w-3 h-3" strokeWidth={4} />
                      Delivered to inbox
                    </p>
                    <p className="mt-0.5 font-mono text-[9.5px] font-bold text-slate-500">
                      opened 42% · clicked 9.6%
                    </p>
                  </motion.div>
                ) : (
                  <motion.button
                    key="send"
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    initial={false}
                    animate={
                      sending
                        ? { scale: [1, 0.96, 1] }
                        : !reduce
                          ? { boxShadow: ['0_0_0_0_rgba(198,26,26,0.35)', '0_0_0_7px_rgba(198,26,26,0)'] }
                          : undefined
                    }
                    transition={
                      sending
                        ? { duration: 0.3 }
                        : { duration: 1.6, repeat: Infinity, ease: 'easeOut' }
                    }
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#C61A1A] px-3 py-2 text-[11px] font-extrabold text-white"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {sending ? 'Sending…' : 'Send campaign'}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/70 px-4 py-2 font-mono text-[10px]">
          <span className="text-slate-500">right message · right person · right time</span>
          <span className="font-bold text-[#C61A1A]">{sent ? 'inbox ✓' : 'composing…'}</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   2. PROBLEM — "InboxSort": incoming emails split between inbox and spam
   folders while the inbox-placement meter sits far below the healthy line.
   ========================================================================== */

const FLOW = [
  { subject: 'Welcome to Digivibz', dest: 'inbox' as const, time: '09:12' },
  { subject: 'Your cart misses you', dest: 'spam' as const, time: '09:14' },
  { subject: 'Weekly newsletter #12', dest: 'inbox' as const, time: '09:18' },
  { subject: 'Re: your quote request', dest: 'spam' as const, time: '09:21' },
  { subject: 'Flash sale ends tonight', dest: 'spam' as const, time: '09:26' },
];

export const InboxSort: React.FC = () => {
  const reduce = useReducedMotion();
  const [k, setK] = useState(() => (reduce ? FLOW.length + 3 : 0));

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setK((x) => (x > FLOW.length + 2 ? 0 : x + 1)),
      1150,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  const visible = FLOW.slice(0, Math.min(k, FLOW.length));
  const inboxRows = visible.filter((f) => f.dest === 'inbox');
  const spamRows = visible.filter((f) => f.dest === 'spam');
  const inboxPct = visible.length
    ? Math.round((inboxRows.length / visible.length) * 100)
    : 100;

  const row = (f: (typeof FLOW)[number], dest: 'inbox' | 'spam') => (
    <motion.div
      key={`${f.subject}-${dest}`}
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, x: dest === 'inbox' ? -14 : 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${
        dest === 'inbox'
          ? 'border-slate-200 bg-white'
          : 'border-red-200 bg-red-50/60'
      }`}
    >
      <span
        className={`shrink-0 font-mono text-[8.5px] font-bold tabular-nums ${
          dest === 'inbox' ? 'text-slate-400' : 'text-[#C61A1A]'
        }`}
      >
        {f.time}
      </span>
      <span className="truncate text-[11px] font-bold text-slate-700">{f.subject}</span>
      {dest === 'spam' && (
        <ShieldAlert className="ml-auto w-3 h-3 shrink-0 text-[#C61A1A]" />
      )}
    </motion.div>
  );

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.55)]"
      role="img"
      aria-label="A deliverability board where incoming campaign emails are sorted, most landing in spam, leaving inbox placement far below the healthy line"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-3">
        <span className="font-mono text-[11px] font-bold text-slate-500">
          deliverability.board
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2 py-1 font-mono text-[10px] font-extrabold text-[#C61A1A]">
          <Filter className="w-3 h-3" />
          spam filter on
        </span>
      </div>

      <div className="px-4 pt-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {/* inbox */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
            <p className="flex items-center gap-1.5 font-mono text-[9.5px] font-extrabold uppercase tracking-widest text-slate-500">
              <Inbox className="w-3 h-3" />
              Inbox
            </p>
            <div className="mt-2 space-y-1.5 min-h-[110px]">
              <AnimatePresence mode="popLayout">
                {inboxRows.map((f) => row(f, 'inbox'))}
              </AnimatePresence>
            </div>
          </div>

          {/* spam */}
          <div className="rounded-xl border border-red-200 bg-red-50/40 p-2.5">
            <p className="flex items-center gap-1.5 font-mono text-[9.5px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
              <ShieldAlert className="w-3 h-3" />
              Spam
            </p>
            <div className="mt-2 space-y-1.5 min-h-[110px]">
              <AnimatePresence mode="popLayout">
                {spamRows.map((f) => row(f, 'spam'))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* placement meter */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5">
          <div className="flex items-baseline justify-between font-mono text-[10px] font-bold text-slate-500">
            <span>Inbox placement</span>
            <span className="text-[#C61A1A] tabular-nums">{inboxPct}%</span>
          </div>
          <div className="relative mt-1.5 h-2.5 rounded-full bg-slate-200 overflow-hidden">
            <motion.span
              className="block h-full rounded-full bg-[#C61A1A]"
              animate={{ width: `${inboxPct}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* healthy target marker at 95% */}
            <span className="absolute top-0 bottom-0 left-[95%] w-0.5 bg-slate-700" aria-hidden="true" />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[9px] text-slate-400">
            <span>0%</span>
            <span>healthy: 95%+</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. SERVICES — "ServiceThumb": a bespoke mini email preview per service.
   ========================================================================== */

const G1 = '#E2E8F0';
const G2 = '#F1F5F9';
const G3 = '#CBD5E1';

export const ServiceThumb: React.FC<{ variant: string }> = ({ variant }) => {
  const bar = (x: number, y: number, w: number, h: number, fill = G1, key?: React.Key) => (
    <rect key={key} x={x} y={y} width={w} height={h} rx="3" fill={fill} />
  );

  switch (variant) {
    case 'campaign':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {/* schedule rows */}
          {[
            ['Mon', 'Welcome', 0],
            ['Wed', 'Cart nudge', 1],
            ['Fri', 'Newsletter', 2],
          ].map(([day, name, i]) => (
            <g key={String(day)}>
              {bar(8, 10 + Number(i) * 26, 144, 20, Number(i) === 1 ? '#F8D7D7' : G2)}
              <text x="14" y={23 + Number(i) * 26} fontSize="7.5" fontWeight="800" fill={Number(i) === 1 ? RED : '#64748B'} style={{ fontFamily: 'monospace' }}>
                {day}
              </text>
              {bar(42, 16 + Number(i) * 26, 60, 5, G3)}
              {bar(42, 24 + Number(i) * 26, 40, 3, G1)}
              <circle cx="142" cy={20 + Number(i) * 26} r="4" fill={Number(i) === 1 ? RED : G3} />
            </g>
          ))}
        </svg>
      );
    case 'automation':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {/* timed sequence list */}
          {[
            ['+0m', 'Welcome email', true],
            ['+1d', 'Follow-up', true],
            ['+3d', 'Reminder', false],
          ].map(([t, name, on], i) => (
            <g key={String(t)}>
              <rect x="8" y={12 + i * 25} width="26" height="14" rx="7" fill={on ? RED : '#F8D7D7'} />
              <text x="21" y={22 + i * 25} fontSize="7" fontWeight="800" fill={on ? '#FFFFFF' : RED} textAnchor="middle" style={{ fontFamily: 'monospace' }}>
                {t}
              </text>
              {bar(40, 13 + i * 25, 74, 6, '#334155')}
              {bar(40, 22 + i * 25, 52, 3, G3)}
              <path d={`M126 ${19 + i * 25} h14 M134 ${13 + i * 25} l6 6 -6 6`} stroke={on ? RED : G3} strokeWidth="1.6" fill="none" />
            </g>
          ))}
        </svg>
      );
    case 'ecommerce':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {bar(8, 8, 50, 6, '#334155')}
          {bar(8, 20, 144, 8, G1)}
          {/* product row */}
          {bar(8, 34, 34, 26, G2)}
          {bar(48, 38, 62, 6, G3)}
          {bar(48, 48, 44, 5, G1)}
          <text x="148" y="44" fontSize="8" fontWeight="800" fill={RED} textAnchor="end" style={{ fontFamily: 'monospace' }}>
            $48
          </text>
          {bar(8, 66, 66, 14, RED)}
          <text x="41" y="75.5" fontSize="7" fontWeight="800" fill="#FFFFFF" textAnchor="middle" style={{ fontFamily: 'monospace' }}>
            CHECKOUT
          </text>
          {bar(84, 70, 68, 5, G2)}
        </svg>
      );
    case 'b2b':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          <circle cx="16" cy="16" r="7" fill={G3} />
          {bar(28, 12, 44, 5, '#334155')}
          {bar(28, 20, 30, 3, G3)}
          {[34, 43, 52, 61].map((y, i) => (
            <g key={y}>
              {bar(8, y, i % 2 === 0 ? 144 : 120, 4, i === 1 ? G3 : G1)}
            </g>
          ))}
          {bar(8, 70, 40, 6, RED)}
          {bar(8, 79, 56, 4, G2)}
          <path d="M120 74 h30 M144 68 l6 6 -6 6" stroke={G3} strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'newsletter':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {bar(8, 8, 144, 12, '#334155')}
          <text x="14" y="17" fontSize="7" fontWeight="800" fill="#FFFFFF" style={{ fontFamily: 'monospace' }}>
            THE WEEKLY
          </text>
          {bar(8, 26, 90, 6, '#334155')}
          {bar(8, 36, 144, 3, G1)}
          {[46, 64].map((y, i) => (
            <g key={y}>
              {bar(8, y, 34, 14, i === 0 ? '#F8D7D7' : G2)}
              {bar(48, y + 2, 96, 4, G3)}
              {bar(48, y + 9, 74, 3, G1)}
            </g>
          ))}
          {bar(118, 8, 34, 5, RED)}
        </svg>
      );
    case 'copy':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          <text x="8" y="16" fontSize="7.5" fontWeight="800" fill="#64748B" style={{ fontFamily: 'monospace' }}>
            SUBJECT A
          </text>
          {bar(8, 20, 144, 10, G2)}
          <text x="8" y="44" fontSize="7.5" fontWeight="800" fill={RED} style={{ fontFamily: 'monospace' }}>
            SUBJECT B
          </text>
          {bar(8, 48, 144, 10, '#F8D7D7')}
          <rect x="8" y="48" width="144" height="10" rx="3" fill="none" stroke={RED} strokeWidth="1.4" />
          {bar(8, 66, 110, 4, G3)}
          {bar(8, 74, 84, 4, G1)}
          <text x="152" y="78" fontSize="7.5" fontWeight="800" fill={RED} textAnchor="end" style={{ fontFamily: 'monospace' }}>
            +42% opens
          </text>
        </svg>
      );
    case 'list':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx={20 + i * 26} cy="26" r="10" fill={i < 4 ? G3 : '#F8D7D7'} />
              <circle cx={20 + i * 26} cy="22" r="3.6" fill="#FFFFFF" />
              <path d={`M${13 + i * 26} 34 a7 7 0 0 1 14 0`} fill="#FFFFFF" />
            </g>
          ))}
          <circle cx="124" cy="26" r="10" fill={RED} />
          <text x="124" y="29" fontSize="9" fontWeight="800" fill="#FFFFFF" textAnchor="middle" style={{ fontFamily: 'monospace' }}>
            +
          </text>
          {bar(8, 50, 144, 6, '#334155')}
          {bar(8, 62, 144, 4, G1)}
          {bar(8, 71, 100, 4, G2)}
          <text x="152" y="80" fontSize="7.5" fontWeight="800" fill={RED} textAnchor="end" style={{ fontFamily: 'monospace' }}>
            real subscribers
          </text>
        </svg>
      );
    case 'template':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {/* desktop block */}
          <rect x="8" y="10" width="94" height="68" rx="4" fill="#FFFFFF" stroke={G3} strokeWidth="1.6" />
          {bar(14, 16, 82, 8, '#334155')}
          {bar(14, 28, 82, 16, G2)}
          {bar(14, 48, 38, 10, RED)}
          {bar(14, 62, 60, 4, G1)}
          {/* mobile block */}
          <rect x="114" y="18" width="38" height="56" rx="5" fill="#FFFFFF" stroke={G3} strokeWidth="1.6" />
          {bar(119, 24, 28, 5, '#334155')}
          {bar(119, 33, 28, 12, G2)}
          {bar(119, 49, 18, 7, RED)}
          {bar(119, 60, 24, 3, G1)}
          <path d="M104 44 h6" stroke={RED} strokeWidth="1.4" strokeDasharray="3 3" />
        </svg>
      );
    case 'segment':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {/* grouped dots */}
          <text x="8" y="16" fontSize="7.5" fontWeight="800" fill="#64748B" style={{ fontFamily: 'monospace' }}>
            BUYERS
          </text>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={`a${i}`} cx={14 + (i % 6) * 14} cy="30" r="5" fill={G3} />
          ))}
          <text x="8" y="52" fontSize="7.5" fontWeight="800" fill={RED} style={{ fontFamily: 'monospace' }}>
            BROWSERS
          </text>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={`b${i}`} cx={14 + i * 14} cy="66" r="5" fill="#F8D7D7" />
          ))}
          <rect x="96" y="46" width="56" height="14" rx="7" fill={RED} />
          <text x="124" y="55.5" fontSize="7" fontWeight="800" fill="#FFFFFF" textAnchor="middle" style={{ fontFamily: 'monospace' }}>
            RIGHT MESSAGE
          </text>
          {bar(96, 66, 56, 5, G2)}
          {bar(96, 74, 40, 4, G1)}
        </svg>
      );
    case 'report':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {bar(8, 8, 60, 6, '#334155')}
          {/* bars */}
          {[
            [24, 'Mon'],
            [38, 'Tue'],
            [30, 'Wed'],
            [52, 'Thu'],
            [64, 'Fri'],
          ].map(([h, d], i) => (
            <g key={String(d)}>
              <rect x={12 + i * 20} y={74 - Number(h)} width="12" height={Number(h)} rx="2" fill={i >= 3 ? RED : G3} />
              <text x={18 + i * 20} y="84" fontSize="6" fontWeight="700" fill="#94A3B8" textAnchor="middle" style={{ fontFamily: 'monospace' }}>
                {d}
              </text>
            </g>
          ))}
          <path d="M14 56 L34 44 L54 50 L74 32 L94 24" stroke={RED} strokeWidth="1.8" fill="none" />
          <circle cx="94" cy="24" r="3" fill={RED} />
          <text x="152" y="20" fontSize="8" fontWeight="800" fill={RED} textAnchor="end" style={{ fontFamily: 'monospace' }}>
            42% open
          </text>
          {bar(114, 34, 38, 5, G2)}
          {bar(114, 43, 30, 4, G1)}
          {bar(114, 54, 38, 5, G2)}
          {bar(114, 63, 24, 4, G1)}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {bar(8, 8, 144, 72, G2)}
        </svg>
      );
  }
};

/* ==========================================================================
   4. PLATFORMS — four platform groups as chip cards.
   ========================================================================== */

const GROUP_ICONS = [Layers, ShoppingCart, Send, Type];

export const PlatformGroups: React.FC<{
  groups: readonly {
    key: string;
    note: string;
    platforms: readonly string[];
  }[];
}> = ({ groups }) => {
  const reduce = useReducedMotion();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {groups.map((g, gi) => {
        const Icon = GROUP_ICONS[gi] ?? Layers;
        return (
          <motion.div
            key={g.key}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-red-300 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.5)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C61A1A] text-white">
                <Icon className="w-4 h-4" />
              </span>
              <h3 className="text-[15px] font-extrabold text-slate-900 leading-snug">{g.key}</h3>
              <span className="ml-auto rounded-md border border-red-200 bg-red-50 px-2 py-1 font-mono text-[10px] font-extrabold text-[#C61A1A] tabular-nums">
                {String(g.platforms.length).padStart(2, '0')}
              </span>
            </div>

            <p className="mt-2.5 text-[13px] leading-relaxed text-slate-500">{g.note}</p>

            <div className="mt-3.5 flex flex-wrap gap-2">
              {g.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-slate-200 bg-slate-50/70 px-2.5 py-1.5 text-[11.5px] font-extrabold text-slate-700 transition-colors group-hover:border-red-200 group-hover:text-slate-900"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   5. PROCESS — "StageCanvas": stage chips drive a campaign board showing
   each stage's artifact: strategy brief, template pair, automation rules,
   A/B test, analytics.
   ========================================================================== */

const ARTIFACTS = [
  { file: 'strategy.brief', tool: 'Discover' },
  { file: 'template.html', tool: 'Design' },
  { file: 'rules.json', tool: 'Develop' },
  { file: 'ab-test.split', tool: 'Deploy' },
  { file: 'analytics.live', tool: 'Detect' },
];

const BRIEF_ROWS = [
  { k: 'Goal', v: 'repeat revenue' },
  { k: 'Audience', v: '3 matched segments' },
  { k: 'Cadence', v: '2 sends / week' },
  { k: 'Promise', v: '10% return offer' },
];

const RULES = [
  { cond: 'cart abandoned', action: 'send recovery email', on: true },
  { cond: 'new subscriber', action: 'start welcome series', on: true },
  { cond: '90 days inactive', action: 'trigger win-back', on: false },
];

export const StageCanvas: React.FC<{
  stages: readonly { key: string; hint: string; body: string }[];
}> = ({ stages }) => {
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();
  const artifact = ARTIFACTS[stage];

  return (
    <div>
      {/* stage chips */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
        {stages.map((s, i) => {
          const active = stage === i;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setStage(i)}
              aria-expanded={active}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                active
                  ? 'bg-[#C61A1A] text-white shadow-[0_16px_34px_-18px_rgba(198,26,26,0.9)]'
                  : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-700'
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] ${
                  active ? 'bg-white text-[#C61A1A]' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.key}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 items-start">
        {/* description */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-[0_28px_60px_-45px_rgba(15,23,42,0.5)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-extrabold leading-none text-red-100">
                  {String(stage + 1).padStart(2, '0')}
                </span>
                <span className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-[#C61A1A]">
                  {stages[stage].key}
                </span>
              </div>
              <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {stages[stage].hint}
              </p>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {stages[stage].body}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-1.5" aria-hidden="true">
            {stages.map((s, i) => (
              <span
                key={s.key}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i <= stage ? 'bg-[#C61A1A]' : 'bg-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* campaign board window */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.55)]">
          <div className="flex items-center gap-2.5 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            </span>
            <span className="ml-1 font-mono text-[10.5px] font-bold text-slate-600">
              {artifact.file}
            </span>
            <span className="ml-auto rounded-md border border-red-200 bg-red-50 px-2 py-0.5 font-mono text-[9.5px] font-extrabold text-[#C61A1A]">
              {artifact.tool}
            </span>
          </div>

          <div className="min-h-[264px] px-4 py-4 sm:px-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* 0 — strategy brief */}
                {stage === 0 && (
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      email marketing strategy
                    </p>
                    <div className="mt-3 space-y-2">
                      {BRIEF_ROWS.map((r, i) => (
                        <motion.div
                          key={r.k}
                          initial={reduce ? false : { opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: 0.08 * i }}
                          className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5"
                        >
                          <span className="w-16 shrink-0 font-mono text-[9.5px] font-extrabold uppercase tracking-wide text-slate-400">
                            {r.k}
                          </span>
                          <span className="text-[12.5px] font-bold text-slate-800">{r.v}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg border border-red-100 bg-red-50/60 px-3 py-2">
                      <p className="font-mono text-[10px] font-bold text-[#C61A1A]">
                        who · what they hear · when — decided before writing
                      </p>
                    </div>
                  </div>
                )}

                {/* 1 — template pair */}
                {stage === 1 && (
                  <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-3 sm:gap-4">
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
                      <span className="font-mono text-[9.5px] font-extrabold text-[#C61A1A]">
                        desktop
                      </span>
                      <div className="mt-2 space-y-1.5" aria-hidden="true">
                        <span className="block h-3 w-full rounded bg-slate-900" />
                        <span className="block h-10 w-full rounded bg-slate-100 border border-slate-200" />
                        <span className="block h-3 w-1/2 rounded-sm bg-[#C61A1A]" />
                        <span className="block h-2 w-4/5 rounded bg-slate-200" />
                        <span className="block h-2 w-3/5 rounded bg-slate-200" />
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
                      <span className="font-mono text-[9.5px] font-extrabold text-slate-400">
                        mobile
                      </span>
                      <div className="mt-2 space-y-1.5" aria-hidden="true">
                        <span className="block h-2.5 w-3/4 rounded bg-slate-900" />
                        <span className="block h-8 w-full rounded bg-slate-100 border border-slate-200" />
                        <span className="block h-3 w-2/3 rounded-sm bg-[#C61A1A]" />
                        <span className="block h-2 w-full rounded bg-slate-200" />
                        <span className="block h-2 w-4/5 rounded bg-slate-200" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2 — automation rules */}
                {stage === 2 && (
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      automation rules
                    </p>
                    <div className="mt-3 space-y-2">
                      {RULES.map((r, i) => (
                        <motion.div
                          key={r.cond}
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                          className="flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5"
                        >
                          <span className="rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-white">
                            IF
                          </span>
                          <span className="text-[11.5px] font-bold text-slate-700">{r.cond}</span>
                          <ArrowRight className="w-3 h-3 shrink-0 text-[#C61A1A]" />
                          <span className="rounded bg-[#C61A1A] px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-white">
                            THEN
                          </span>
                          <span className="text-[11.5px] font-bold text-slate-700">{r.action}</span>
                          <span
                            className={`ml-auto flex h-4 w-7 items-center rounded-full px-0.5 ${
                              r.on ? 'bg-[#C61A1A]' : 'bg-slate-300'
                            }`}
                            aria-hidden="true"
                          >
                            <span
                              className={`h-3 w-3 rounded-full bg-white transition-transform ${
                                r.on ? 'translate-x-3' : ''
                              }`}
                            />
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['Segmented', 'Automated', 'Personalised'].map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10.5px] font-extrabold text-slate-600"
                        >
                          <Check className="w-3 h-3 text-[#C61A1A]" strokeWidth={3.4} />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3 — A/B test */}
                {stage === 3 && (
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      subject line · 50/50 split
                    </p>
                    <div className="mt-3 space-y-3">
                      {[
                        { tag: 'A', text: 'Your cart misses you — 10% inside', pct: 34.1, w: '58%', win: false },
                        { tag: 'B', text: 'Sarah, your items are still waiting', pct: 42.0, w: '72%', win: true },
                      ].map((v) => (
                        <div
                          key={v.tag}
                          className={`rounded-lg border px-3 py-2.5 ${
                            v.win
                              ? 'border-red-300 bg-red-50/50'
                              : 'border-slate-200 bg-slate-50/70'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] font-extrabold ${
                                v.win
                                  ? 'bg-[#C61A1A] text-white'
                                  : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              {v.tag}
                            </span>
                            <span className="truncate text-[12px] font-bold text-slate-700">
                              {v.text}
                            </span>
                            {v.win && (
                              <span className="ml-auto rounded bg-[#C61A1A] px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold text-white">
                                WINNER
                              </span>
                            )}
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-slate-200 overflow-hidden">
                            <motion.span
                              className={`block h-full rounded ${v.win ? 'bg-[#C61A1A]' : 'bg-slate-400'}`}
                              initial={reduce ? false : { width: 0 }}
                              animate={{ width: v.w }}
                              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                          <p className="mt-1 font-mono text-[9.5px] font-bold tabular-nums text-slate-500">
                            {v.pct.toFixed(1)}% open rate
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4 — analytics */}
                {stage === 4 && (
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { k: 'Open rate', v: '42%' },
                        { k: 'Click rate', v: '9.6%' },
                        { k: 'ROI', v: '5X' },
                      ].map((s, i) => (
                        <motion.span
                          key={s.k}
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.08 * i }}
                          className="flex-1 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2"
                        >
                          <span className="block font-mono text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                            {s.k}
                          </span>
                          <span className="mt-0.5 block text-lg font-extrabold tabular-nums leading-none text-[#C61A1A]">
                            {s.v}
                          </span>
                        </motion.span>
                      ))}
                    </div>

                    <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-3">
                      <svg viewBox="0 0 300 110" className="block w-full h-auto" aria-hidden="true">
                        {/* grid */}
                        {[20, 45, 70, 95].map((y) => (
                          <line key={y} x1="8" y1={y} x2="292" y2={y} stroke={G1} strokeWidth="1" />
                        ))}
                        {/* clicks bars */}
                        {[38, 52, 44, 66, 78, 70, 88].map((h, i) => (
                          <rect
                            key={i}
                            x={16 + i * 40}
                            y={95 - h * 0.7}
                            width="16"
                            height={h * 0.7}
                            rx="2"
                            fill={G3}
                          />
                        ))}
                        {/* open-rate trend */}
                        <motion.path
                          d="M24 74 L64 64 L104 68 L144 50 L184 42 L224 46 L264 28"
                          stroke={RED}
                          strokeWidth="2.2"
                          fill="none"
                          strokeLinecap="round"
                          initial={reduce ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                        <circle cx="264" cy="28" r="4.5" fill={RED} />
                        <text x="256" y="18" fontSize="10" fontWeight="800" fill={RED} textAnchor="end" style={{ fontFamily: 'monospace' }}>
                          42% open
                        </text>
                      </svg>
                    </div>

                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50/60 px-3 py-2">
                      <TrendingUp className="w-3.5 h-3.5 text-[#C61A1A]" />
                      <span className="text-[11px] font-extrabold text-slate-700">
                        improving every campaign that follows
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/70 px-4 py-2 font-mono text-[10px]">
            <span className="text-slate-500">stage: {stages[stage].key.toLowerCase()}</span>
            <span className="font-bold text-[#C61A1A]">built to get results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. CHANGES — before → after flip rows.
   ========================================================================== */

export const ChangeRows: React.FC<{
  items: readonly { before: string; after: string }[];
}> = ({ items }) => {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={item.before}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="group grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4 rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 py-4 transition-colors hover:border-red-300"
        >
          {/* before */}
          <span className="flex items-start gap-2 min-w-0">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <X className="w-2.5 h-2.5" strokeWidth={4} />
            </span>
            <span className="text-[13px] sm:text-sm font-bold text-slate-400 leading-snug line-through decoration-slate-300 decoration-2">
              {item.before}
            </span>
          </span>

          {/* arrow */}
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C61A1A] text-white shadow-[0_10px_22px_-14px_rgba(198,26,26,0.9)] transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>

          {/* after */}
          <span className="flex items-start gap-2 min-w-0">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#C61A1A] text-white">
              <Check className="w-2.5 h-2.5" strokeWidth={4} />
            </span>
            <span className="text-[13px] sm:text-sm font-extrabold text-slate-900 leading-snug">
              {item.after}
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
};

/* ==========================================================================
   7. WHY — icon set for the four trust cards.
   ========================================================================== */

export const WHY_ICONS = [Target, Inbox, Eye, TrendingUp];
