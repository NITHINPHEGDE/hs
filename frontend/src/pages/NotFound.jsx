import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink text-cream-text flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl text-gold-light mb-4">404</p>
      <p className="text-lg mb-2">This page doesn't exist</p>
      <p className="text-cream-text/60 mb-8 max-w-sm">The page you're looking for may have been moved or the link is incorrect.</p>
      <Link to="/" className="px-6 py-3 bg-gold text-ink rounded-sm hover:bg-gold-light transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
