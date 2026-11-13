import { MapPin, Phone } from 'lucide-react';
import Reveal from './Reveal';

const branches = [
  {
    name: 'Yelahanka Branch',
    address: 'HS Gold Company, Ward No 03, NewTown BBMP, 2338, 16th B Cross Rd, near New Town Bus Stand, LIG 3rd Stage, Yelahanka Satellite Town, Yelahanka, Bengaluru, Karnataka 560064',
    phone: '+91 63631 17960',
    mapEmbed: 'https://www.google.com/maps?q=HS+Gold+Company+16th+B+Cross+Rd+Yelahanka+Bengaluru+560064&output=embed',
  },
];

export default function Branches() {
  return (
    <section id="branches" className="bg-ink text-cream-text px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl mb-2">Visit us</h2>
          <p className="text-cream-text/60 text-base md:text-lg mb-10 md:mb-16 max-w-md">Walk in during business hours, no appointment needed.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {branches.map((branch, i) => (
            <Reveal key={branch.name} delay={i * 100}>
              <div className="border border-gold/20 rounded-sm overflow-hidden active:border-gold/50 transition-colors duration-150">
                <iframe
                  title={branch.name}
                  src={branch.mapEmbed}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                />
                <div className="p-6">
                  <p className="font-display text-lg text-gold-light mb-3">{branch.name}</p>
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-cream-text/70 leading-relaxed">{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gold flex-shrink-0" />
                    <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="text-sm text-cream-text/70 active:text-gold-light">
                      {branch.phone}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
