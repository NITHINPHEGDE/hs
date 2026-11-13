import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MessageSquarePlus } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Branches from './components/Branches';
import FAQ from './components/FAQ';
import EnquiryForm from './components/EnquiryForm';
import EnquiryPopup from './components/EnquiryPopup';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import LoadingScreen from './components/LoadingScreen';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import NotFound from './pages/NotFound';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [hasAutoShown, setHasAutoShown] = useState(false);

  useEffect(() => {
    if (loading) return;
    const handleScroll = () => {
      if (!hasAutoShown && window.scrollY > window.innerHeight * 1.2) {
        setPopupOpen(true);
        setHasAutoShown(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasAutoShown]);

  return (
    <div>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <div className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <Branches />
        <FAQ />
        <EnquiryForm />
        <Footer />
        <FloatingButtons />
        <button
          onClick={() => setPopupOpen(true)}
          className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gold rounded-full shadow-lg active:scale-90 transition-transform duration-150"
          aria-label="Get a quote"
        >
          <MessageSquarePlus size={26} className="text-ink" />
        </button>
        <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hs-gold-panel" element={<AdminLogin />} />
      <Route path="/hs-gold-panel/dashboard" element={<AdminDashboard />} />
      <Route path="/hs-gold-panel/settings" element={<AdminSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
