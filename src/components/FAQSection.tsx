import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/content';
import { Reveal } from './Reveal';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-[#C61A1A]" />
              <span>FAQs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked <span className="text-[#C61A1A]">Questions</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Find quick answers to the most commonly asked questions about our services and features.
            </p>
          </Reveal>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <Reveal key={item.id} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  className={`bg-white border rounded-xl overflow-hidden shadow-2xs transition-all duration-300 ${
                    isOpen ? 'border-red-200 shadow-md' : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {item.id}. {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`p-1.5 rounded-full shrink-0 transition-colors ${
                        isOpen ? 'bg-red-50 text-[#C61A1A]' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
