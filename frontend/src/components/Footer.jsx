import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream-text/60 px-6 py-14 border-t border-gold/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 text-base">
        <div>
          <p className="text-cream-text font-display text-2xl mb-3">HS Gold Company</p>
          <p>Bangalore's trusted gold buyer</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-cream-text text-lg mb-1">Contact</p>
          <a href="tel:+916363117960" className="flex items-center gap-2 hover:text-gold-light hover:translate-x-1 transition-all duration-200">
            <Phone size={16} /> +91 63631 17960
          </a>
          <a href="mailto:hsgoldcompany@gmail.com" className="flex items-center gap-2 hover:text-gold-light hover:translate-x-1 transition-all duration-200">
            <Mail size={16} /> hsgoldcompany@gmail.com
          </a>
          <div className="flex items-start gap-2 max-w-xs">
            <MapPin size={16} className="flex-shrink-0 mt-0.5" />
            <span>Yelahanka, Bengaluru, Karnataka 560064</span>
          </div>
        </div>

        <div>
          <p className="text-cream-text text-lg mb-3">Quick Links</p>
          <div className="flex flex-col gap-2">
            <a href="#services" className="hover:text-gold-light hover:translate-x-1 transition-all duration-200 inline-block w-fit">Services</a>
            <a href="#branches" className="hover:text-gold-light hover:translate-x-1 transition-all duration-200 inline-block w-fit">Branches</a>
            <a href="#faq" className="hover:text-gold-light hover:translate-x-1 transition-all duration-200 inline-block w-fit">FAQ</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between gap-2 text-sm text-cream-text/40">
        <p>© 2026 HS Gold Company. All rights reserved.</p>
        <p>Designed by GB</p>
      </div>
    </footer>
  );
}
