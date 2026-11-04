import React from 'react';
import { Reveal } from './Reveal';
import { CountUp } from './CountUp';

const METRICS = [
  { value: '250+', label: 'businesses generating consistent leads with our system' },
  { value: '4X', label: 'average revenue growth for clients in the last 12 months' },
  { value: '1000+', label: 'AI-driven campaigns optimising sales and conversions' },
  { value: '95%', label: 'client satisfaction rate with measurable business results' },
];

export const MetricsBanner: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle dotted world-network texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
            The 5D Revenue System{' '}
            <span className="text-[#C61A1A]">Trusted by 250+ Businesses</span> for 4× Revenue Growth
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed space-y-1">
          <p className="font-semibold text-slate-800">
            Proven results from an award-winning internet marketing agency helping brands scale faster with data-driven systems
          </p>
          <p>
            We help businesses scale revenue, generate leads, and grow consistently using our AI-powered 5D Growth Framework.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {METRICS.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.09}>
              <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-red-200 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center h-full">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#C61A1A] tracking-tight tabular-nums">
                  <CountUp value={item.value} />
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-snug">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16 pt-8 border-t border-slate-100">
          <p className="text-xs sm:text-sm text-slate-500 italic max-w-md mx-auto">
            You probably still have questions. Good, here are the ones we hear most.
          </p>
        </Reveal>

      </div>
    </section>
  );
};
