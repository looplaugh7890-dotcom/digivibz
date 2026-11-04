import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, CheckCircle, ArrowRight, FileText, Loader2, Lock } from 'lucide-react';
import { submitContact } from '../lib/api';

interface GrowthAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrowthAuditModal: React.FC<GrowthAuditModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    website: '',
    service: 'AI Growth System (Full 5D)',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    // Persist to MongoDB via the API so the admin panel sees it.
    const result = await submitContact({
      fullName: formData.fullName,
      businessName: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      services: [formData.service],
      description: formData.description || 'Requested a growth audit via the site popup.',
      source: 'modal-audit',
    });
    setIsSubmitting(false);
    if (result.ok) {
      setIsSubmitted(true);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="audit-overlay"
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
            aria-label="Free custom growth audit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto scrollbar-thin">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="p-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-red-50 text-[#C61A1A] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Growth Audit Reserved!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Our growth strategy team is analyzing <span className="font-semibold text-slate-900">{formData.businessName || 'your business'}</span>. We will deliver your bespoke 5D Growth Audit to <span className="font-semibold text-slate-900">{formData.email}</span> within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-[#C61A1A] text-white font-medium rounded-lg hover:bg-[#9E1414] transition-colors text-sm shadow-sm cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="p-6 md:p-8">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                      <FileText className="w-3.5 h-3.5" /> Free Custom Growth Audit
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Turn Your Marketing Into Predictable Revenue
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Share your details below to uncover gaps, examine competitor vulnerabilities, and receive your tailored 5D growth model.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="audit-name">
                          Full Name <span className="text-[#C61A1A]">*</span>
                        </label>
                        <input
                          id="audit-name"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. John Miller"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="audit-business">
                          Business Name <span className="text-[#C61A1A]">*</span>
                        </label>
                        <input
                          id="audit-business"
                          type="text"
                          required
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="e.g. Summit Dental Group"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="audit-email">
                          Work Email <span className="text-[#C61A1A]">*</span>
                        </label>
                        <input
                          id="audit-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="audit-phone">
                          Phone Number <span className="text-[#C61A1A]">*</span>
                        </label>
                        <input
                          id="audit-phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="audit-website">
                        Website URL (Optional)
                      </label>
                      <input
                        id="audit-website"
                        type="text"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="audit-service">
                        Interested Service Focus
                      </label>
                      <select
                        id="audit-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:bg-white transition-all"
                      >
                        <option value="AI Growth System (Full 5D)">AI Growth System (Full 5D Framework)</option>
                        <option value="Lead Generation & High-Intent SEO">Lead Generation & High-Intent SEO</option>
                        <option value="Paid Media (PPC / Social Ads)">Paid Media (PPC / Social Ads)</option>
                        <option value="Conversion Web Design & Development">Conversion Web Design & Development</option>
                        <option value="AI Automation & Funnels">AI Automation & Funnels</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="audit-goal">
                        Brief Project or Growth Goal
                      </label>
                      <textarea
                        id="audit-goal"
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Tell us about your current challenges and revenue targets..."
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:bg-white transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-[#9E1414] font-medium">
                        <span>{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="dz-btn-shine w-full py-3 px-6 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 text-sm group cursor-pointer disabled:opacity-80"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Preparing your audit…</span>
                        </>
                      ) : (
                        <>
                          <span>Build My AI-Powered 5D Growth System</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-500 pt-1">
                      <Lock className="w-3 h-3 inline -mt-0.5" /> 100% Confidential. No obligation. Join 250+ businesses scaling with DIGIVIBZ.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
