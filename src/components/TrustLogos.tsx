import React from 'react';
import { Reveal } from './Reveal';

export const TrustLogos: React.FC = () => {
  const logos = [
    { name: 'PENG', sub: 'CAPITAL' },
    { name: 'Amplitude', sub: 'ANALYTICS' },
    { name: 'VOICEFLOW', sub: 'CONVERSATIONAL' },
    { name: 'REPUBLICA', sub: 'MEDIA' },
    { name: 'AppLovin', sub: 'GROWTH' },
    { name: 'Invoice2go', sub: 'FINTECH' },
    { name: 'PENG', sub: 'VENTURES' },
    { name: 'Amplitude', sub: 'ENTERPRISE' },
  ];

  // The track is duplicated once so the -50% translate loops seamlessly
  const marqueeItems = [...logos, ...logos];

  return (
    <section id="why-they-trust" className="py-14 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <Reveal>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto">
            Trusted And Proven As The{' '}
            <span className="text-[#C61A1A]">Best Digital Marketing Agency</span> Across Leading Businesses In The US
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From small startups to established enterprises, DIGIVIBZ has helped brands in every industry scale revenue with our AI-powered 5D Growth Framework. Here are just a few of the brands that trust us to drive real results.
          </p>
        </Reveal>

        {/* Infinite logo marquee, pauses on hover */}
        <Reveal delay={0.15} className="mt-10 dz-marquee">
          <div className="dz-marquee-track flex w-max items-center gap-10 sm:gap-14 pr-10 sm:pr-14">
            {marqueeItems.map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-2 shrink-0 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer group"
              >
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-800 group-hover:text-slate-900 transition-colors">
                  {logo.name}
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase">
                  {logo.sub}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Transitional bridge note */}
        <Reveal delay={0.1} className="mt-12 pt-6 border-t border-slate-100">
          <p className="text-xs sm:text-sm font-medium text-slate-500 italic max-w-xl mx-auto">
            “But trust alone doesn't grow your business. The problem runs deeper, and most agencies are missing it entirely.”
          </p>
        </Reveal>

      </div>
    </section>
  );
};
