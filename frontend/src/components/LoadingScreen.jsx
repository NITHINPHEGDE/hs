import { useEffect, useState } from 'react';
import logo from '../assets/logo.jpeg';

export default function LoadingScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 500);
    }, 1400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <img
        src={logo}
        alt="HS Gold Company"
        className="h-40 w-40 md:h-28 md:w-28 rounded-full object-cover animate-pulse"
      />
    </div>
  );
}
