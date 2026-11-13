import { useState } from 'react';
import Reveal from './Reveal';

const services = [
  {
    mark: 'I',
    title: 'Sell Your Gold',
    description: 'Get instant payment for your gold jewellery, coins, or bars at the best market rate, with transparent weighing and testing in front of you.',
    list: null,
  },
  {
    mark: 'II',
    title: 'Release Pledged Gold',
    description: "Struggling with a bank or NBFC loan on your gold? We help you release it and settle your dues, often at better terms.",
    list: null,
  },
  {
    mark: 'III',
    title: 'Documents Required',
    description: null,
    list: ['Aadhaar Card (or any valid Photo ID)', 'Local Address Proof', 'Phone Verification Call', 'Purchase Invoice', 'Passport'],
  },
  {
    mark: 'IV',
    title: 'Release Gold Loan',
    description: 'Carry your pledge copy, which is provided by your gold loan bank or NBFC.',
    list: null,
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-ivory px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl text-charcoal-text mb-2">What we offer</h2>
          <p className="text-charcoal-text/60 text-base md:text-lg mb-10 md:mb-16 max-w-md">Straightforward services built around getting you fair value, quickly.</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-charcoal-text/10 items-stretch">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <button
                onClick={() => setActive(i)}
                className={`w-full h-full text-left p-5 md:p-7 bg-ivory active:bg-gold/20 active:scale-[0.98] transition-all duration-150 border-l-4 ${
                  active === i ? 'border-oxblood' : 'border-transparent'
                }`}
              >
                <div
                  style={{ animationDelay: `${i * 0.3}s` }}
                  className={`animate-float-slow w-8 h-8 md:w-9 md:h-9 rounded-full border flex items-center justify-center font-display text-xs md:text-sm mb-3 md:mb-4 ${
                    active === i ? 'border-oxblood text-oxblood' : 'border-gold text-gold'
                  }`}
                >
                  {service.mark}
                </div>
                <p className={`font-display text-base md:text-lg mb-2 md:mb-3 ${active === i ? 'text-oxblood' : 'text-charcoal-text'}`}>
                  {service.title}
                </p>
                {service.description && (
                  <p className="text-xs md:text-base text-charcoal-text/70 leading-relaxed">{service.description}</p>
                )}
                {service.list && (
                  <ul className="text-xs md:text-base text-charcoal-text/70 leading-relaxed list-disc list-inside space-y-1">
                    {service.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
