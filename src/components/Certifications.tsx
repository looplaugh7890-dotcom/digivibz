import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { Reveal } from './Reveal';

const BADGES = [
  { key: 'excellence', render: <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-[#C61A1A] flex items-center justify-center mb-2 font-black text-xs">2024</div>, title: 'Agency Of Excellence', sub: 'Global Standard' },
  { key: 'google', render: <div className="flex items-center gap-1 mb-2"><span className="font-extrabold text-sm text-slate-800">Google</span></div>, title: 'Premier Partner', sub: 'Top 3% Tier' },
  { key: 'clutch', render: <div className="w-10 h-10 rounded-full bg-[#18181B] text-white flex items-center justify-center mb-2 font-extrabold text-xs">Clutch</div>, title: 'Top Agency USA', sub: '5.0 Star Rated' },
  { key: 'meta', render: <div className="w-8 h-8 rounded-full bg-[#C61A1A] text-white flex items-center justify-center mb-2 font-black text-xs">∞</div>, title: 'Meta Business', sub: 'Certified Partner' },
  { key: 'stevie', render: <Award className="w-9 h-9 text-[#C61A1A] mb-1" />, title: 'Stevie Winner', sub: 'American Business' },
  { key: 'drum', render: <ShieldCheck className="w-9 h-9 text-[#C61A1A] mb-1" />, title: 'The Drum Awards', sub: "Digital Growth '25" },
];

export const Certifications: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <Reveal>
          <span className="text-xs font-bold text-[#C61A1A] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            TRUSTED BY INDUSTRY LEADERS
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Certified For Excellence In <span className="text-[#C61A1A]">Digital Marketing</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our certifications reflect our commitment to delivering measurable results and ethical marketing practices. DIGIVIBZ combines AI-driven strategies with proven expertise to help US businesses scale revenue and achieve consistent growth.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-center">
          {BADGES.map((badge, i) => (
            <Reveal key={badge.key} delay={i * 0.07} direction="zoom">
              <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md hover:-translate-y-1 hover:border-red-200 hover:bg-white transition-all duration-300 cursor-default h-full">
                {badge.render}
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-tight leading-tight">
                  {badge.title}
                </span>
                <span className="text-[9px] text-slate-500 font-medium mt-0.5">{badge.sub}</span>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
