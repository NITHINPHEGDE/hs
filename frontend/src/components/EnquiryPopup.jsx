import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import api from '../api';

export default function EnquiryPopup({ open, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', city: '', website: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus('sending');
    try {
      await api.post('/leads', form);
      setStatus('success');
      setForm({ name: '', phone: '', city: '', website: '' });
    } catch {
      setStatus('error');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-ivory rounded-sm p-8 max-w-md w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-charcoal-text/50 hover:text-charcoal-text" aria-label="Close">
          <X size={22} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="success-circle w-16 h-16 rounded-full bg-oxblood flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path className="success-check" d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-display text-xl text-charcoal-text mb-1">Request Received</p>
            <p className="text-charcoal-text/60 text-sm">We'll call you back shortly.</p>
          </div>
        ) : (
          <>
            <p className="font-display text-2xl text-charcoal-text mb-2">Get your free quote</p>
            <p className="text-charcoal-text/60 text-sm mb-6">Leave your details and our team will call you back.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" name="website" value={form.website} onChange={handleChange} autoComplete="off" tabIndex="-1" className="absolute opacity-0 h-0 w-0 -z-10" aria-hidden="true" />
              <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required className="border border-charcoal-text/20 bg-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold" />
              <input type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required className="border border-charcoal-text/20 bg-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold" />
              <input type="text" name="city" placeholder="City (optional)" value={form.city} onChange={handleChange} className="border border-charcoal-text/20 bg-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold" />
              <button type="submit" disabled={status === 'sending'} className="btn-shine bg-oxblood text-cream-text py-3 rounded-sm mt-2 disabled:opacity-50">
                {status === 'sending' ? 'Sending...' : 'Request Callback'}
              </button>
              {status === 'error' && <p className="text-sm text-red-700">Something went wrong. Please try calling us directly.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
