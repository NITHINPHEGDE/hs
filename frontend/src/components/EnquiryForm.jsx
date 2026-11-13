import { useState } from 'react';
import api from '../api';

export default function EnquiryForm() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', website: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <section id="enquire" className="bg-ivory px-6 py-16 md:py-24">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl text-charcoal-text mb-3">Get your free quote</h2>
        <p className="text-charcoal-text/60 text-base md:text-lg mb-10">Leave your details and our team will call you back within minutes.</p>

        {status === 'success' ? (
          <div className="flex flex-col items-center py-10">
            <div className="success-circle w-20 h-20 rounded-full bg-oxblood flex items-center justify-center mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  className="success-check"
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-display text-2xl text-charcoal-text mb-2">Request Received</p>
            <p className="text-charcoal-text/60">We'll call you back shortly.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 text-sm text-oxblood hover:underline"
            >
              Submit another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              autoComplete="off"
              tabIndex="-1"
              className="absolute opacity-0 h-0 w-0 -z-10"
              aria-hidden="true"
            />

            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-charcoal-text/20 bg-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors duration-150"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              required
              className="border border-charcoal-text/20 bg-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors duration-150"
            />
            <input
              type="text"
              name="city"
              placeholder="City (optional)"
              value={form.city}
              onChange={handleChange}
              className="border border-charcoal-text/20 bg-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors duration-150"
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-shine bg-oxblood text-cream-text py-3 rounded-sm hover:bg-oxblood/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {status === 'sending' ? 'Sending...' : 'Request Callback'}
            </button>

            {status === 'error' && (
              <p className="text-sm text-red-700">Something went wrong. Please try calling us directly.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
