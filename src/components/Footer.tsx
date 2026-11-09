import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, Check, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
import { staggerContainer, staggerItem } from './Reveal';

/** Site footer — brand blurb, quick links, services, contact, newsletter. */
export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const socials = [
    { label: 'Twitter / X', icon: Twitter, href: '#twitter' },
    { label: 'Facebook', icon: Facebook, href: '#facebook' },
    { label: 'Instagram', icon: Instagram, href: '#instagram' },
    { label: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
  ];

  return (
    <footer className="bg-black text-slate-300 pt-16 pb-12 border-t border-[#18181B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#27272A]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand */}
          <motion.div variants={staggerItem} className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              DIGIVIBZ is an AI-powered digital growth agency helping businesses generate leads, increase sales, and scale revenue with data-driven systems.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#C61A1A] hover:border-[#C61A1A] hover:-translate-y-0.5 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={staggerItem} className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Services', href: '/services' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="inline-flex items-center gap-1.5 hover:text-white transition-colors group">
                    <span className="w-0 group-hover:w-2 h-px bg-[#C61A1A] transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={staggerItem} className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {['SEO Services', 'Google Ads', 'Web Designing', 'Web Development', 'AI Automation'].map((service) => (
                <li key={service}>
                  <a href="/services" className="inline-flex items-center gap-1.5 hover:text-white transition-colors group">
                    <span className="w-0 group-hover:w-2 h-px bg-[#C61A1A] transition-all duration-300" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C61A1A]" />
                <a href="mailto:info@digivibz.com" className="hover:text-white transition-colors">
                  info@digivibz.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C61A1A]" />
                <span>+1 (800) 555-DIGI</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C61A1A]" />
                <span>Location: Florida, USA</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                Join our newsletter
              </span>
              <p className="text-[10px] text-slate-500 mb-2">
                We'll send you a letter every week.
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 text-xs text-red-300 py-1"
                >
                  <Check className="w-3.5 h-3.5" /> Subscribed successfully!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter or paste address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#18181B] border border-[#27272A] rounded text-white focus:outline-none focus:border-[#C61A1A] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white text-xs font-semibold rounded shrink-0 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Legal bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 DIGIVIBZ. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-300 transition-colors">Terms & Conditions</a>
            <a href="/refund-policy" className="hover:text-slate-300 transition-colors">Refund Policy</a>
            <a href="/marketing-disclaimer" className="hover:text-slate-300 transition-colors">Marketing Disclaimer</a>
            <a href="/legal-notice" className="hover:text-slate-300 transition-colors">Legal Notice</a>
            <a
              href="/"
              aria-label="Back to top"
              className="w-8 h-8 rounded-full border border-[#27272A] bg-[#18181B] flex items-center justify-center hover:bg-[#C61A1A] hover:border-[#C61A1A] hover:text-white transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
