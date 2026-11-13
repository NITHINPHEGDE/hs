import Reveal from './Reveal';

export default function Hero() {
  return (
    <section className="bg-ink text-cream-text px-6 py-16 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-gold-light text-base tracking-wide mb-5">Bengaluru's Trusted Gold Buyer</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.1] mb-6 md:mb-8">
            Sell your gold for the best price, get instant payment, on the spot
          </h1>
          <p className="text-cream-text/70 text-base md:text-lg mb-8 md:mb-10 max-w-md leading-relaxed">
            Transparent weighing, certified purity testing, and instant payment at any of our branches across the city.
          </p>
          <div className="flex gap-4">
            <a href="#enquire" className="btn-shine px-7 py-4 bg-gold text-ink font-medium text-base md:text-lg rounded-sm active:scale-95 active:bg-gold-light transition-transform duration-150">
              Get Your Quote
            </a>
            <a href="tel:+916363117960" className="btn-shine px-7 py-4 border border-gold-light/40 text-cream-text text-base md:text-lg rounded-sm active:scale-95 active:bg-white/10 transition-transform duration-150">
              Call Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
