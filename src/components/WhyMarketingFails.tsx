import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';
import { Reveal, staggerContainer, staggerItem } from './Reveal';

interface WhyMarketingFailsProps {
  onOpenAudit: () => void;
  onScrollToFramework: () => void;
}

const CHALLENGES = [
  'Inconsistent leads and low-quality traffic',
  'Wasting money on marketing that doesn’t work',
  'Competitors are winning your customers online',
  'Your online presence isn’t driving leads or sales',
];

const SOLUTIONS = [
  'Generate consistent, high-intent leads with our AI-powered 5D Growth Framework.',
  'Maximize ROI with AI-optimized digital marketing systems.',
  'Dominate your market with AI-powered growth systems.',
  'Turn visitors into clients with end-to-end AI-driven digital growth systems.',
];

export const WhyMarketingFails: React.FC<WhyMarketingFailsProps> = ({ onOpenAudit }) => {
  return (
    <section id="why-fails" className="py-20 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Stop Losing Leads, Start Scaling Your Business
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Most Marketing <span className="text-[#C61A1A]">Fails</span> to Generate <span className="text-[#C61A1A]">Revenue</span>
            </h2>
          </Reveal>
        </div>

        {/* 2-Column comparison */}
        <Reveal delay={0.12} className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

              {/* Pain points */}
              <div className="p-6 sm:p-8 bg-slate-50/70">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#18181B] shrink-0 animate-pulse" />
                  Are you facing these challenges?
                </h3>
                <motion.div
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {CHALLENGES.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={staggerItem}
                      className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300 transition-all"
                    >
                      <XCircle className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Solutions */}
              <div className="p-6 sm:p-8 bg-red-50/40">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C61A1A] shrink-0 animate-pulse" />
                  How DIGIVIBZ Works for You?
                </h3>
                <motion.div
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {SOLUTIONS.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={staggerItem}
                      className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-red-100/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-red-200 transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#C61A1A] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <div className="mt-10 text-center space-y-4">
          <Reveal delay={0.08}>
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <span>Show Me Growth Opportunities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-xs sm:text-sm text-slate-500 italic max-w-lg mx-auto">
              Most agencies treat the symptoms. We fix the system. Here's exactly how it works.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
