import { useState } from 'react';
import Reveal from './Reveal';

const faqs = [
  {
    question: 'How is the gold rate decided?',
    answer: 'We follow the daily market rate for gold, updated regularly to reflect current prices. The rate you see is the rate you get, with no hidden deductions.',
  },
  {
    question: 'What documents do I need to bring?',
    answer: 'A valid government ID (Aadhaar, PAN, passport, or voter ID) is required for any gold transaction, as per regulations.',
  },
  {
    question: 'Is the purity testing done in front of me?',
    answer: 'Yes, every test is done in front of you using certified equipment, so you can see exactly how your gold is valued.',
  },
  {
    question: 'How quickly will I get paid?',
    answer: 'On the spot payment.',
  },
  {
    question: 'Can I sell gold that has stones or other metals attached?',
    answer: 'Yes. Any kind of stones, beads, or enamel weight will be deducted for valuation, as we take into consideration only the weight of gold.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="bg-ivory px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl text-charcoal-text mb-10 md:mb-16">Common questions</h2>
        </Reveal>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 60}>
              <div className="border-b border-charcoal-text/10">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left py-5 md:py-6 flex justify-between items-center gap-4 hover:bg-gold/10 active:bg-gold/20 hover:px-3 transition-all duration-200"
                >
                  <span className="text-base md:text-lg text-charcoal-text">{faq.question}</span>
                  <span className={`text-gold text-2xl flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                  <p className="text-charcoal-text/60 text-sm md:text-base leading-relaxed px-3">{faq.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
