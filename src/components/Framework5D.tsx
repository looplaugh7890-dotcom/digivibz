import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Search, Palette, Code2, Rocket, LineChart } from 'lucide-react';
import { FRAMEWORK_STEPS } from '../data/content';
import { Reveal } from './Reveal';

interface Framework5DProps {
  onOpenAudit: () => void;
}

// Funnel slice geometry — strict brand palette: white idle slices, brand-red active
const FUNNEL_SLICES = [
  { label: '1. Discover', active: '#C61A1A', idle: '#FFFFFF', textActive: '#FFFFFF', textIdle: '#64748B', points: '20,10 300,10 270,55 50,55', textY: 38, fontSize: 13 },
  { label: '2. Design', active: '#C61A1A', idle: '#FFFFFF', textActive: '#FFFFFF', textIdle: '#64748B', points: '52,60 268,60 240,105 80,105', textY: 88, fontSize: 13 },
  { label: '3. Develop', active: '#C61A1A', idle: '#FFFFFF', textActive: '#FFFFFF', textIdle: '#64748B', points: '82,110 238,110 210,155 110,155', textY: 138, fontSize: 13 },
  { label: '4. Deploy', active: '#C61A1A', idle: '#FFFFFF', textActive: '#FFFFFF', textIdle: '#64748B', points: '112,160 208,160 185,205 135,205', textY: 188, fontSize: 12 },
  { label: '5. Detect', active: '#C61A1A', idle: '#FFFFFF', textActive: '#FFFFFF', textIdle: '#64748B', points: '137,210 183,210 168,255 152,255', textY: 238, fontSize: 11 },
];

export const Framework5D: React.FC<Framework5DProps> = ({ onOpenAudit }) => {
  const [activeStepId, setActiveStepId] = useState(1);
  const activeStep = FRAMEWORK_STEPS.find(s => s.id === activeStepId) || FRAMEWORK_STEPS[0];

  const getStepIcon = (id: number) => {
    switch (id) {
      case 1: return <Search className="w-5 h-5 text-[#C61A1A]" />;
      case 2: return <Palette className="w-5 h-5 text-[#C61A1A]" />;
      case 3: return <Code2 className="w-5 h-5 text-[#C61A1A]" />;
      case 4: return <Rocket className="w-5 h-5 text-[#C61A1A]" />;
      case 5: return <LineChart className="w-5 h-5 text-[#C61A1A]" />;
      default: return <Search className="w-5 h-5" />;
    }
  };

  return (
    <section id="framework" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold text-[#C61A1A] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              REVENUE SYSTEM VISUAL
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              The Proven System Behind 250+ Businesses Growing Predictably With{' '}
              <span className="text-[#C61A1A]">Full-Service Digital Marketing</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              A smarter way to grow your business with AI-powered systems and expert execution.
              Most agencies jump straight into ads, SEO, or design. <span className="font-semibold text-slate-800">We don’t.</span> At DIGIVIBZ, we follow a clear, proven system that removes guesswork and turns digital efforts into consistent leads, sales, and predictable revenue growth.
            </p>
          </Reveal>
        </div>

        {/* 5 Step Selector Cards */}
        <Reveal delay={0.18} className="mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {FRAMEWORK_STEPS.map((step) => {
              const isActive = step.id === activeStepId;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  aria-pressed={isActive}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#18181B] text-white border-[#18181B] shadow-md scale-[1.02]'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-bold tracking-wider uppercase ${
                        isActive ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {step.stepNumber}
                      </span>
                      <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-[#27272A]' : 'bg-slate-100'}`}>
                        {getStepIcon(step.id)}
                      </div>
                    </div>
                    <h3 className="font-bold text-base leading-tight">
                      {step.name}
                    </h3>
                    <p className={`text-xs mt-1.5 leading-snug line-clamp-2 ${
                      isActive ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {step.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Interactive Funnel & Step Detail */}
        <Reveal delay={0.1} className="mt-10">
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left: Inverted funnel */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="w-full max-w-[340px] relative">
                  <div className="text-center mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Interactive 5D Funnel
                    </span>
                  </div>
                  <svg viewBox="0 0 320 260" className="w-full filter drop-shadow-sm select-none">
                    {FUNNEL_SLICES.map((slice, idx) => {
                      const stepId = idx + 1;
                      const isActive = activeStepId === stepId;
                      return (
                        <g key={slice.label} className="cursor-pointer" onClick={() => setActiveStepId(stepId)}>
                          <polygon
                            points={slice.points}
                            fill={isActive ? slice.active : slice.idle}
                            stroke={isActive ? '#C61A1A' : '#E4E4E7'}
                            strokeWidth="1"
                            className="transition-all duration-300 hover:opacity-90"
                            style={{
                              transformOrigin: '160px 130px',
                              transform: isActive ? 'scale(1.035)' : 'scale(1)',
                            }}
                          />
                          <text
                            x="160"
                            y={slice.textY}
                            fill={isActive ? slice.textActive : slice.textIdle}
                            fontSize={slice.fontSize}
                            fontWeight="700"
                            textAnchor="middle"
                            className="pointer-events-none"
                          >
                            {slice.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Right: Selected step details (animates between steps) */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs min-h-[420px] sm:min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-50 text-[#C61A1A]">
                        {getStepIcon(activeStep.id)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#C61A1A] tracking-wider uppercase">
                          {activeStep.stepNumber}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                          {activeStep.name}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-700 font-medium">
                      {activeStep.description}
                    </p>

                    <div className="mt-4 space-y-2.5">
                      {activeStep.features.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + idx * 0.07, duration: 0.35 }}
                          className="flex items-start gap-2.5 text-sm text-slate-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#C61A1A] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-0.5">
                        Expected Outcome:
                      </span>
                      <p className="text-sm font-semibold text-slate-800">
                        {activeStep.result}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </Reveal>

        {/* Summary & CTA */}
        <div className="mt-14 max-w-3xl mx-auto text-center space-y-5">
          <Reveal>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              AI gives us speed and data. Our experts give direction and strategy.<br className="hidden sm:inline" />
              Together, they create a growth system that is transparent, scalable, and built for results not promises.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <span>Build My AI-Powered 5D Growth System</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-xs sm:text-sm text-slate-500 italic">
              Here's how it compares to the way most agencies work.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
