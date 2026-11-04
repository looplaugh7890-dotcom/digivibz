import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, CheckCircle2, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenAudit: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose, onOpenAudit }) => {
  const isOpen = caseStudy !== null;

  // Escape to close + lock page scroll while the modal is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {caseStudy && (
        <motion.div
          key="case-study-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={caseStudy.title}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-slate-900 bg-white/80 backdrop-blur rounded-full transition-colors shadow-sm cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with image */}
            <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden">
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent flex flex-col justify-end p-6">
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-[#C61A1A] text-white w-max mb-2">
                  {caseStudy.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {caseStudy.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto scrollbar-thin space-y-6">
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {caseStudy.results.map((res, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.08, duration: 0.35 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#C61A1A] tracking-tight">
                      {res.value}
                    </div>
                    <div className="text-xs text-slate-600 font-medium mt-0.5">
                      {res.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  <AlertTriangle className="w-4 h-4 text-[#C61A1A]" />
                  Prior Challenges
                </h4>
                <div className="space-y-2">
                  {caseStudy.challenges.map((c, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#C61A1A]" />
                  What DIGIVIBZ Built & Deployed
                </h4>
                <div className="space-y-2">
                  {caseStudy.whatWeDid.map((w, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C61A1A] mt-0.5 shrink-0" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Want similar results for your business?
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAudit();
                  }}
                  className="dz-btn-shine w-full sm:w-auto px-5 py-2.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-medium rounded-lg text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Get My Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
