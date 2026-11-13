import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('admin_token', res.data.token);
      localStorage.setItem('admin_role', res.data.role);
      navigate('/hs-gold-panel/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <form onSubmit={handleLogin} className="bg-white/5 border border-slate-700 p-8 rounded-sm w-full max-w-sm">
        <h1 className="font-display text-2xl text-slate-100 mb-6">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full mb-4 px-4 py-3 bg-slate-900 border border-slate-700 text-slate-100 rounded-sm focus:outline-none focus:border-emerald-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full mb-4 px-4 py-3 bg-slate-900 border border-slate-700 text-slate-100 rounded-sm focus:outline-none focus:border-emerald-400"
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-medium py-3 rounded-sm hover:bg-emerald-400 transition-colors">
          Log In
        </button>
      </form>
    </div>
  );
}
