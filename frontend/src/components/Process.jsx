import Reveal from './Reveal';

const steps = [
  {
    number: '01',
    title: 'Walk in or call ahead',
    description: 'Visit your nearest branch, or call us to check today\'s rate before you come in.',
  },
  {
    number: '02',
    title: 'Free purity testing',
    description: 'We test your gold\'s purity in front of you using certified equipment, no guesswork.',
  },
  {
    number: '03',
    title: 'Transparent weighing',
    description: 'Your gold is weighed on a calibrated scale, and the value is calculated right in front of you.',
  },
  {
    number: '04',
    title: 'Instant Payment',
    description: 'Once you\'re satisfied with the quotation, get on-the-spot payment.',
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-ink text-cream-text px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl mb-10 md:mb-16">How it works</h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8 md:gap-10">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="border-t border-gold/30 pt-6">
                <p className="font-display text-3xl text-gold-light mb-4">{step.number}</p>
                <p className="text-lg text-cream-text mb-3">{step.title}</p>
                <p className="text-base text-cream-text/60 leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
