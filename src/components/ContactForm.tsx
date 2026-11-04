import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle,
  Globe,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldAlert,
  User,
} from 'lucide-react';
import { SERVICE_OPTIONS } from '../data/contactContent';
import { submitContact } from '../lib/api';

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  company: string; // honeypot — hidden from real users
}

const EMPTY: FormState = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  website: '',
  description: '',
  company: '',
};

const fieldClass =
  'w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-[#C61A1A] transition-all placeholder:text-slate-400';

const labelClass = 'block text-xs font-semibold text-slate-700 mb-1';

/**
 * The contact form ("Get Your Personalized Growth Audit").
 * Submits to the Express API → MongoDB Atlas; the admin panel reads it back.
 */
export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [services, setServices] = useState<string[]>(['Full 5D AI Revenue System']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleService = (service: string) =>
    setServices((list) => (list.includes(service) ? list.filter((s) => s !== service) : [...list, service]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);

    if (services.length === 0) {
      setError('Please choose at least one service you are interested in.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitContact({
      fullName: form.fullName,
      businessName: form.businessName,
      email: form.email,
      phone: form.phone,
      website: form.website,
      services,
      description: form.description,
      source: 'contact-page',
      company: form.company,
    });
    setIsSubmitting(false);

    if (result.ok) {
      setIsSubmitted(true);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.25)] relative overflow-hidden">
      {/* Top accent — brand red rail */}
      <div className="absolute top-0 inset-x-0 h-1 bg-[#C61A1A]" />

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="py-12 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-red-50 text-[#C61A1A] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h4 className="text-2xl font-extrabold text-slate-900">Your Growth Audit Is Requested!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900">{form.fullName}</span>. A senior growth
              strategist will review <span className="font-semibold text-slate-900">{form.website || form.businessName}</span>{' '}
              and reach out within <span className="font-semibold text-slate-900">24–48 hours</span> at{' '}
              <span className="font-semibold text-slate-900">{form.email}</span>.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] text-white text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              {services.length} service{services.length === 1 ? '' : 's'} queued for review
            </div>
            <div>
              <button
                onClick={() => {
                  setForm(EMPTY);
                  setServices(['Full 5D AI Revenue System']);
                  setIsSubmitted(false);
                }}
                className="px-5 py-2 text-xs font-semibold text-[#C61A1A] hover:underline cursor-pointer"
              >
                Submit another request
              </button>
            </div>
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
                <label htmlFor="cf-name" className={labelClass}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="cf-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.fullName}
                    onChange={set('fullName')}
                    placeholder="e.g. Alex Henderson"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cf-business" className={labelClass}>
                  Business Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="cf-business"
                    type="text"
                    required
                    autoComplete="organization"
                    value={form.businessName}
                    onChange={set('businessName')}
                    placeholder="e.g. Henderson Dental Group"
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cf-email" className={labelClass}>
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="cf-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="alex@hendersondental.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cf-phone" className={labelClass}>
                  Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="cf-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+1 (555) 234-5678"
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>

            {/* Website (optional) */}
            <div>
              <label htmlFor="cf-website" className={labelClass}>
                Website (optional)
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  id="cf-website"
                  type="text"
                  value={form.website}
                  onChange={set('website')}
                  placeholder="https://yourbrand.com"
                  className={fieldClass}
                />
              </div>
            </div>

            {/* Interested Service(s) — multi-select chips */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass + ' mb-0'}>Interested Service(s)</label>
                <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
                  {services.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Interested services">
                {SERVICE_OPTIONS.map((service) => {
                  const active = services.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleService(service)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#C61A1A] border-[#C61A1A] text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-[#C61A1A]'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5" />}
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brief Project Description */}
            <div>
              <label htmlFor="cf-description" className={labelClass}>
                Brief Project Description
              </label>
              <textarea
                id="cf-description"
                rows={4}
                required
                value={form.description}
                onChange={set('description')}
                placeholder="Share your revenue goals, current ad spend, or conversion bottlenecks..."
                className="w-full p-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-[#C61A1A] transition-all resize-none placeholder:text-slate-400"
              />
            </div>

            {/* Honeypot — invisible to humans, catches bots */}
            <div className="absolute -left-[9999px] top-0" aria-hidden="true">
              <label htmlFor="cf-company">Company</label>
              <input
                id="cf-company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={set('company')}
              />
            </div>

            {/* Inline error */}
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-[#9E1414] font-medium">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="dz-btn-shine w-full py-3.5 px-6 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer group disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Your Request…</span>
                </>
              ) : (
                <>
                  <span>Get My Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Your details stay private — no spam, no sharing. Ever.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
