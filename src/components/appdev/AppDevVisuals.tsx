import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, CircleX, Cloud, Cpu, Monitor, Server } from 'lucide-react';
import { CountUp } from '../CountUp';
import { APP_ASSETS, APP_FRAMEWORK, APP_SHIFT, APP_SYSTEM } from '../../data/appDevContent';

/* ==========================================================================
   1. HERO — "System Blueprint": a dark editor window with four hoverable
   architecture layers, data packets rising between them, and a timeline
   readout. The page's thesis in one visual: not an app — a system.
   ========================================================================== */

const BLUEPRINT_LAYERS = [
  { id: 'L1', name: 'Experience', icon: Monitor, chips: ['Web', 'iOS', 'Android'] },
  { id: 'L2', name: 'Intelligence', icon: Cpu, chips: ['OpenAI', 'TensorFlow', 'ML Models'] },
  { id: 'L3', name: 'Services', icon: Server, chips: ['APIs', 'Node', 'Python'] },
  { id: 'L4', name: 'Infrastructure', icon: Cloud, chips: ['AWS', 'Docker', 'CI/CD'] },
];

/** Timeline readout — figures taken from the page's own FAQ copy. */
const BLUEPRINT_METRICS = [
  { value: '6–8 WKS', label: 'Simple app' },
  { value: '4–6 MO', label: 'Complex build' },
  { value: '3–6 MO', label: 'Post-launch' },
];

export const SystemBlueprint: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#101013] overflow-hidden shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)]">
      {/* editor window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="flex items-center gap-2" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C61A1A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
          <span className="ml-2 font-mono text-[10px] font-bold tracking-wider text-white/50">
            app-blueprint.dz
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C61A1A]/50 bg-[#C61A1A]/15 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-[#E83535]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
          System, not app
        </span>
      </div>

      {/* layered stack */}
      <div className="px-4 sm:px-5 py-5">
        {BLUEPRINT_LAYERS.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <div key={layer.id}>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 transition-all duration-300 hover:border-[#C61A1A]/60 hover:bg-white/[0.07] hover:-translate-y-0.5"
              >
                <span className="font-mono text-[10px] font-bold text-[#C61A1A] shrink-0">
                  {layer.id}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white/70 transition-colors group-hover:border-[#C61A1A]/50 group-hover:text-[#E83535]">
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-sm font-extrabold uppercase tracking-wider text-white/90">
                  {layer.name}
                </span>
                <span className="ml-auto hidden sm:flex items-center gap-1.5">
                  {layer.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[9px] font-bold tracking-wide text-white/55 transition-colors group-hover:border-white/25 group-hover:text-white/85"
                    >
                      {chip}
                    </span>
                  ))}
                </span>
              </motion.div>

              {/* spine with rising data packet between layers */}
              {i < BLUEPRINT_LAYERS.length - 1 && (
                <div className="relative mx-auto h-6 w-0" aria-hidden="true">
                  <span className="absolute left-0 top-0 h-full w-px -translate-x-1/2 bg-white/15" />
                  {!reduce && (
                    <motion.span
                      className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#C61A1A] shadow-[0_0_8px_rgba(198,26,26,0.9)]"
                      animate={{ y: [0, 20], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.7, repeat: Infinity, delay: 0.5 + i * 0.45, ease: 'easeInOut' }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* timeline readout */}
      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[0.02]">
        {BLUEPRINT_METRICS.map((m) => (
          <div key={m.label} className="px-2 py-3.5 text-center">
            <div className="text-sm sm:text-base font-extrabold text-white tabular-nums leading-none">
              <CountUp value={m.value} />
            </div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/45">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   2. PROBLEM — drop-off funnel: ideas collapse at the thinking stage,
   the exact failure the section's copy describes.
   ========================================================================== */

const FUNNEL_STAGES = [
  { label: 'Ideas', w: 100, slate: true },
  { label: 'Thinking', w: 38, mark: true },
  { label: 'Design', w: 30 },
  { label: 'Build', w: 24 },
  { label: 'Launch', w: 18 },
  { label: 'Growth', w: 12 },
];

export const FailureFunnel: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Where applications die
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Ideas → Growth
        </span>
      </div>

      <div className="space-y-1.5">
        {FUNNEL_STAGES.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-3">
            <span className="w-16 sm:w-20 shrink-0 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {stage.label}
            </span>
            <div className="relative flex-1 h-5 sm:h-6">
              <motion.div
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${stage.w}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-md ${stage.slate ? 'bg-slate-300' : 'bg-[#C61A1A]/85'}`}
              />
            </div>
            {stage.mark && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-[#C61A1A]">
                <span className="w-1 h-1 rounded-full bg-[#C61A1A]" />
                Most fail here
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   3. SHIFT — a code-diff viewer: old thinking struck through, the system
   mindset added in red. The page's argument rendered the way devs read it.
   ========================================================================== */

export const ShiftDiff: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-3xl border border-white/10 bg-[#101013] overflow-hidden shadow-[0_40px_90px_-50px_rgba(0,0,0,0.85)]">
      {/* window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="flex items-center gap-2" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C61A1A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
          <span className="ml-2 font-mono text-[10px] font-bold tracking-wider text-white/50">
            mindset.shift
          </span>
        </span>
        <span className="font-mono text-[10px] font-bold text-white/45">+4 −4</span>
      </div>

      <div className="p-4 sm:p-5 space-y-2">
        {APP_SHIFT.rows.map((row, i) => {
          const [from, to] = row.split('→').map((s) => s.trim());
          return (
            <motion.div
              key={row}
              initial={reduce ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-xs font-bold text-slate-500 select-none">−</span>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-500 line-through decoration-slate-600/70">
                  {from}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2.5">
                <span className="font-mono text-xs font-bold text-[#E83535] select-none">+</span>
                <span className="text-[11px] sm:text-xs font-extrabold text-white">{to}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ==========================================================================
   4. SYSTEM — the pillar manifest: five always-open spec rows, index and
   accent rule lighting up on hover. Reads like a system bill of materials.
   ========================================================================== */

export const SystemManifest: React.FC = () => (
  <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.4)]">
    <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-slate-100 bg-slate-50/70">
      <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
        system-manifest
      </span>
      <span className="font-mono text-[10px] font-bold text-slate-400">5 modules</span>
    </div>

    {APP_SYSTEM.pillars.map((pillar, i) => (
      <div
        key={pillar.title}
        className="group relative border-b border-slate-100 px-5 sm:px-7 py-6 transition-colors last:border-0 hover:bg-red-50/30"
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-5 bottom-5 w-1 origin-top scale-y-0 rounded-r bg-[#C61A1A] transition-transform duration-300 group-hover:scale-y-100"
        />
        <div className="flex items-start gap-4">
          <span className="mt-0.5 font-mono text-xs font-bold tabular-nums text-slate-400 transition-colors group-hover:text-[#C61A1A]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-3xl">{pillar.body}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ==========================================================================
   5. FRAMEWORK — a dark pipeline rail: five phase gates on a drawing
   progress line, each swapping a detail panel (checklist + outcome).
   ========================================================================== */

export const PipelineRail: React.FC = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const stage = APP_FRAMEWORK.stages[active];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
      {/* rail */}
      <div className="relative">
        <div className="absolute left-[6%] right-[6%] top-9 h-px bg-white/10 hidden sm:block" aria-hidden="true" />
        <motion.div
          className="absolute left-[6%] top-9 h-px bg-[#C61A1A] hidden sm:block origin-left"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ right: '6%' }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col sm:flex-row gap-2.5 sm:gap-2">
          {APP_FRAMEWORK.stages.map((s, i) => {
            const isActive = active === i;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`group flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-xl border px-3 py-3.5 text-center transition-all ${
                  isActive
                    ? 'border-[#C61A1A]/70 bg-[#C61A1A]/15'
                    : 'border-white/10 bg-[#0C0C0D] hover:border-white/30'
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold tabular-nums transition-colors ${
                    isActive ? 'bg-[#C61A1A] text-white' : 'bg-white/10 text-white/70'
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-xs font-extrabold uppercase tracking-wider ${
                    isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                  }`}
                >
                  {s.key}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* detail panel */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#0C0C0D] p-5 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.key}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                Phase {String(active + 1).padStart(2, '0')}
              </span>
              <span className="rounded-full border border-[#C61A1A]/60 bg-[#C61A1A]/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-[#E83535]">
                {stage.key}
              </span>
            </div>

            <h3 className="mt-3 text-lg sm:text-xl font-extrabold text-white leading-snug">
              {stage.title}
            </h3>
            <p className="mt-2.5 text-sm text-slate-400 leading-relaxed max-w-3xl">{stage.body}</p>

            <div className="mt-5">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                What this includes:
              </span>
              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {stage.includes.map((item) => (
                  <span key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-3.5 h-3.5 mt-1 shrink-0 text-[#C61A1A]" strokeWidth={3} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-r-xl border-l-2 border-[#C61A1A] bg-[#C61A1A]/10 px-4 py-3.5">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E83535]">
                Outcome:
              </span>
              <p className="mt-1 text-sm font-semibold text-white leading-relaxed">{stage.outcome}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. ASSETS — four ledger rows: the gap, the approach, then a benefit
   track that fills from "just software" to "business asset" on scroll.
   ========================================================================== */

const ASSET_FILL = [80, 85, 90, 95];

export const AssetMeters: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-5 sm:px-8 py-2 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.4)]">
      {APP_ASSETS.items.map((item, i) => (
        <div
          key={item.problem}
          className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5 border-b border-slate-100 py-7 last:border-0"
        >
          {/* the gap */}
          <div className="lg:col-span-5">
            <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
              <CircleX className="w-3.5 h-3.5" />
              The gap
            </span>
            <h3 className="mt-2 text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {item.problem}
            </h3>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.body}</p>
          </div>

          {/* the fix */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#C61A1A]">
              Our Approach
            </span>
            <p className="mt-2.5 text-sm font-medium text-slate-700 leading-relaxed">
              {item.approach}
            </p>

            {/* asset track */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                <span>Just software</span>
                <span className="text-[#C61A1A]">Business asset</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width: `${ASSET_FILL[i]}%` }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-[#C61A1A]"
                />
              </div>
            </div>

            <div className="mt-3.5 flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C61A1A]">
                <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-extrabold text-slate-900">Benefit: </span>
                {item.benefit}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
