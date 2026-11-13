import { useState } from 'react';
import logo from '../assets/logo.jpeg';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Branches', href: '#branches' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-gold/20">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="HS Gold Company" className="animate-float-slow h-11 w-11 rounded-full object-cover" />
          <span className="font-display text-xl text-cream-text tracking-tight">HS Gold Company</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="relative text-sm text-cream-text/80 hover:text-gold-light transition-colors duration-150 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-gold-light hover:after:w-full after:transition-all after:duration-200">
              {link.label}
            </a>
          ))}
          <a href="tel:+916363117960" className="btn-shine px-4 py-2 border border-gold text-gold-light text-sm rounded-sm active:scale-95 active:bg-gold active:text-ink transition-transform duration-150">
            Call Now
          </a>
        </div>

        <button className="md:hidden text-cream-text" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-cream-text/80 hover:text-gold-light">
              {link.label}
            </a>
          ))}
          <a href="tel:+916363117960" className="text-gold-light">
            Call Now
          </a>
        </div>
      )}
    </header>
  );
}
