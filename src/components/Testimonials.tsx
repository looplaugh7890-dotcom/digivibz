import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { Reveal } from './Reveal';

export const Testimonials: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((step: number) => {
    setDirection(step);
    setStartIndex((curr) => (curr + step + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const visibleTestimonials = [
    TESTIMONIALS[startIndex % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 2) % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 3) % TESTIMONIALS.length],
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Growth Stories From Businesses Like Yours - Powered by a{' '}
              <span className="text-[#C61A1A]">B2B Digital Marketing Agency</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={startIndex}
              initial={{ opacity: 0, x: direction * 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -48 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visibleTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-4 text-[#C61A1A]">
                      {[...Array(t.rating)].map((_, starI) => (
                        <motion.span
                          key={starI}
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.12 + starI * 0.06, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </motion.span>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      “{t.quote}”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800 shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
                        {t.author}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls + dots */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            className="w-9 h-9 rounded-full bg-black text-white hover:bg-[#27272A] hover:scale-105 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setDirection(i > startIndex ? 1 : -1);
                  setStartIndex(i);
                }}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === startIndex ? 'w-6 bg-[#C61A1A]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-9 h-9 rounded-full bg-black text-white hover:bg-[#27272A] hover:scale-105 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 italic max-w-xl mx-auto">
            Every result you just read was built on the same revenue system. Here's every piece of it, and what it does for your business.
          </p>
        </Reveal>

      </div>
    </section>
  );
};
