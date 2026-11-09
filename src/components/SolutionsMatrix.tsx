import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown, Layers } from 'lucide-react';
import { SOLUTIONS_SERVICES } from '../data/content';
import { Reveal } from './Reveal';

interface SolutionsMatrixProps {
  onOpenAudit: () => void;
}

export const SolutionsMatrix: React.FC<SolutionsMatrixProps> = ({ onOpenAudit }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [websiteInput, setWebsiteInput] = useState('');
  const [websiteAuditSubmitted, setWebsiteAuditSubmitted] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleQuickAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteInput.trim()) {
      setWebsiteAuditSubmitted(true);
      setTimeout(() => {
        onOpenAudit();
      }, 400);
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left column */}
          <Reveal className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" /> Full-Service Capabilities
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              See How a{' '}
              <span className="text-[#C61A1A]">Full-Service Digital Marketing Agency</span>{' '}
              Builds an AI-Powered Revenue System to Grow Your Business
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We don’t just provide services. We deliver solutions that work together to increase leads, drive sales, and scale revenue.
            </p>

            <form onSubmit={handleQuickAudit} className="space-y-3 pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your website"
                  value={websiteInput}
                  onChange={(e) => setWebsiteInput(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:bg-white focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                className="dz-btn-shine w-full py-3 px-5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>
                  {websiteAuditSubmitted ? 'Opening your audit…' : 'Get Your Free Growth Audit Today'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-xs text-slate-500 font-medium italic pt-2">
              “Every service connects back to one goal, 'predictable revenue.' The proof is in the numbers.”
            </p>

            <a
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-[#C61A1A] transition-colors group pt-1"
            >
              Browse all 15 services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>

          {/* Center column: accordion */}
          <div className="lg:col-span-5 space-y-3">
            {SOLUTIONS_SERVICES.map((cat, idx) => {
              const isOpen = openIndex === idx;
              return (
                <Reveal key={idx} delay={idx * 0.06}>
                  <div
                    className={`border rounded-xl overflow-hidden bg-white shadow-xs transition-all duration-300 ${
                      isOpen ? 'border-red-200 shadow-md' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-sm sm:text-[15px] text-slate-900 leading-tight pr-3">
                        {cat.category}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={`p-1 rounded-full shrink-0 ${isOpen ? 'bg-red-50 text-[#C61A1A]' : 'bg-slate-100 text-slate-400'}`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/40">
                            <div className="flex flex-wrap gap-2 pt-2">
                              {cat.items.map((item, itemIdx) => (
                                <span
                                  key={itemIdx}
                                  className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-2xs hover:border-red-200 hover:text-[#C61A1A] transition-colors cursor-default"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: cat.color }} />
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right column: 3D funnel */}
          <Reveal direction="right" delay={0.15} className="lg:col-span-3 flex flex-col items-center justify-center pt-4 lg:pt-0">
            <div className="w-full max-w-[240px] flex flex-col items-center dz-float">
              <svg viewBox="0 0 240 340" className="w-full drop-shadow-md select-none">
                <defs>
                  <linearGradient id="brandGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D92121" />
                    <stop offset="100%" stopColor="#C61A1A" />
                  </linearGradient>
                  <linearGradient id="brandGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C61A1A" />
                    <stop offset="100%" stopColor="#A51615" />
                  </linearGradient>
                  <linearGradient id="brandGrad3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A51615" />
                    <stop offset="100%" stopColor="#8A1111" />
                  </linearGradient>
                  <linearGradient id="brandGrad4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8A1111" />
                    <stop offset="100%" stopColor="#6E0D0D" />
                  </linearGradient>
                  <linearGradient id="brandGrad5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6E0D0D" />
                    <stop offset="100%" stopColor="#4A0909" />
                  </linearGradient>
                </defs>

                {/* 5 banded cone segments (same red gradient ramp as before) */}
                <path d="M 20 30 A 100 24 0 0 0 220 30 L 190 116 A 70 17 0 0 1 50 116 Z" fill="url(#brandGrad1)" />
                <path d="M 50 120 A 70 17 0 0 0 190 120 L 176 174 A 56 14 0 0 1 64 174 Z" fill="url(#brandGrad2)" />
                <path d="M 64 178 A 56 14 0 0 0 176 178 L 164 228 A 44 12 0 0 1 76 228 Z" fill="url(#brandGrad3)" />
                <path d="M 76 232 A 44 12 0 0 0 164 232 L 154 278 A 34 10 0 0 1 86 278 Z" fill="url(#brandGrad4)" />
                <path d="M 86 282 A 34 10 0 0 0 154 282 L 146 318 A 26 8 0 0 1 94 318 Z" fill="url(#brandGrad5)" />

                {/* 3D rim: bright lip + dark interior opening */}
                <ellipse cx="120" cy="30" rx="100" ry="24" fill="#D92121" />
                <ellipse cx="120" cy="33" rx="84" ry="16" fill="#6E0D0D" />

                <text x="120" y="90" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">DISCOVER ↓</text>
                <text x="120" y="164" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">DESIGN ↓</text>
                <text x="120" y="220" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">DEVELOP ↓</text>
                <text x="120" y="270" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">DEPLOY ↓</text>
                <text x="120" y="312" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle">DETECT ↓</text>
              </svg>

              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-3">
                Full-Funnel Alignment
              </span>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
};
