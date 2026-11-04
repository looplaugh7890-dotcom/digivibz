import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle, Mail, Phone, Globe, User, Building2, Loader2, ShieldAlert } from 'lucide-react';
import { Reveal } from './Reveal';
import { CountUp } from './CountUp';
import { submitContact } from '../lib/api';

export const AuditContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    website: '',
    service: 'Full 5D AI Revenue System',
    description: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      description: formData.description || 'Requested a custom AI growth plan from the homepage form.',
      source: 'home-audit',
    });
    setIsSubmitting(false);
    if (result.ok) {
      setIsSubmitted(true);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact-audit" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Proposition, Stats & Social Proof */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Start Scaling Your Revenue With a Proven Growth Plan From the{' '}
                <span className="text-[#C61A1A]">Best Online Marketing Company</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-900">DIGIVIBZ</span> builds AI-powered, systems-led growth engines for US businesses.
                Not random campaigns. Not empty promises. Real leads, real sales, real growth, all connected in one Smart system.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div>
                <a
                  href="#audit-form-card"
                  className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  <span>Get My Free Custom AI Growth Plan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xs sm:text-sm text-slate-500 italic">
                See exactly how your business can scale with a system that works, guided by an online marketing agency.
              </p>
            </Reveal>

            {/* 3 Metric Badges */}
            <Reveal delay={0.26} className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center hover:border-red-200 hover:bg-white transition-colors">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums"><CountUp value="250+" /></div>
                <div className="text-[11px] text-slate-500 font-medium">Brands served</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center hover:border-red-200 hover:bg-white transition-colors">
                <div className="text-xl sm:text-2xl font-extrabold text-[#C61A1A] tabular-nums"><CountUp value="4X" /></div>
                <div className="text-[11px] text-slate-500 font-medium">Avg revenue growth</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center hover:border-red-200 hover:bg-white transition-colors">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums"><CountUp value="95%" /></div>
                <div className="text-[11px] text-slate-500 font-medium">Client satisfaction</div>
              </div>
            </Reveal>

            {/* Avatar Cluster — monograms (same style as Testimonials) */}
            <Reveal delay={0.32} className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-white bg-[#C61A1A] text-white text-[11px] font-extrabold" aria-hidden="true">
                  JB
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-white bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-extrabold" aria-hidden="true">
                  PR
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-white bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-extrabold" aria-hidden="true">
                  KW
                </span>
              </div>
              <span className="text-xs sm:text-sm text-slate-700 font-medium">
                Join <span className="font-bold text-slate-900">250+ US businesses</span> already growing with DIGIVIBZ.
              </span>
            </Reveal>
          </div>

          {/* Right Column: Complete Interactive Form Card */}
          <Reveal direction="right" delay={0.1} className="lg:col-span-6">
          <div id="audit-form-card" className="bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative">
            
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Ready to Turn Your Marketing Into Predictable Revenue?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Stop guessing your marketing results. Share your details, and we’ll provide a free, personalised Growth Audit to uncover opportunities, fix gaps, and boost revenue.
              </p>
            </div>

            <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="py-10 text-center space-y-4 bg-white p-6 rounded-xl border border-red-100"
              >
                <div className="w-14 h-14 bg-red-50 text-[#C61A1A] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Growth Audit Request Received!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. One of our senior growth strategists will review <span className="font-semibold text-slate-900">{formData.website || formData.businessName}</span> and contact you shortly at <span className="font-semibold text-slate-900">{formData.email}</span>.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 text-xs font-semibold text-[#C61A1A] hover:underline cursor-pointer"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                
                {/* Full Name & Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Alex Henderson"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Henderson Dental Group"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@hendersondental.com"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 234-5678"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Website (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Website (optional)
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://yourbrand.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] transition-all"
                    />
                  </div>
                </div>

                {/* Interested Service(s) Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Interested Service(s)
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] transition-all"
                  >
                    <option value="Full 5D AI Revenue System">Full 5D AI Revenue System (Recommended)</option>
                    <option value="High-Intent SEO & Content">High-Intent SEO & Content</option>
                    <option value="Paid Media (PPC / Social)">Paid Media (PPC / Social)</option>
                    <option value="Conversion Web Design & Development">Conversion Web Design & Development</option>
                    <option value="AI Marketing Automation">AI Marketing Automation</option>
                  </select>
                </div>

                {/* Brief Project Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brief Project Description
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Share your revenue goals, current ad spend, or conversion bottlenecks..."
                      className="w-full p-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Inline error */}
                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-[#9E1414] font-medium">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="dz-btn-shine w-full py-3.5 px-6 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer group disabled:opacity-80"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Audit Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

              </motion.form>
            )}
            </AnimatePresence>

          </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
