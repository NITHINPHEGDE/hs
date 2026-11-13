import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '../api';

export default function AdminSettings() {
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/hs-gold-panel');
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg('');
    try {
      await api.post('/auth/change-password', passwordForm, { headers: { Authorization: `Bearer ${token}` } });
      setPasswordMsg('Password updated successfully.');
      setPasswordForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setPasswordMsg(err.response?.data?.error || 'Failed to update password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-display text-2xl text-slate-100">Settings</h1>
          <Link to="/hs-gold-panel/dashboard" className="text-sm text-emerald-400 hover:underline">Back to Dashboard</Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-sm p-6">
          <h2 className="font-display text-lg text-slate-100 mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                placeholder="Current password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-4 py-2 pr-11 rounded-sm focus:outline-none focus:border-emerald-400"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                placeholder="New password (min 8 characters)"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-4 py-2 pr-11 rounded-sm focus:outline-none focus:border-emerald-400"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button type="submit" className="bg-emerald-500 text-slate-950 font-medium py-2 rounded-sm hover:bg-emerald-400 transition-colors">Update Password</button>
            {passwordMsg && <p className="text-sm text-slate-300">{passwordMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
