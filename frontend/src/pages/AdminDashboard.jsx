import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function AdminDashboard() {
  const [rates, setRates] = useState({ rate_24k: '', rate_22k: '', rate_18k: '' });
  const [leads, setLeads] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('admin_token');
  const role = localStorage.getItem('admin_role');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) {
      navigate('/hs-gold-panel');
      return;
    }
    api.get('/rates').then((res) => setRates(res.data));
    api.get('/leads', authHeader).then((res) => setLeads(res.data)).catch(() => navigate('/hs-gold-panel'));
  }, []);

  const handleRateChange = (e) => setRates({ ...rates, [e.target.name]: e.target.value });

  const handleSaveRates = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await api.put('/rates', rates, authHeader);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleLeadStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'contacted' ? 'not_contacted' : 'contacted';
    await api.patch(`/leads/${id}`, { status: newStatus }, authHeader);
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  const handleDownloadCSV = () => {
    const headers = ['Name', 'Phone', 'City', 'Status', 'Date'];
    const rows = leads.map((l) => [
      l.name,
      l.phone,
      l.city || '',
      l.status === 'contacted' ? 'Contacted' : 'Not Contacted',
      new Date(l.created_at).toLocaleString('en-IN'),
    ]);
    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hs-gold-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_role');
    navigate('/hs-gold-panel');
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="font-display text-2xl text-slate-100">Admin Dashboard</h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{role === 'owner' ? 'Owner' : 'Staff'} Access</p>
          </div>
          <div className="flex gap-4">
            <Link to="/hs-gold-panel/settings" className="text-sm text-emerald-400 hover:underline">Settings</Link>
            <button onClick={handleLogout} className="text-sm text-red-400 hover:underline">Log Out</button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-sm p-6 mb-10">
          <h2 className="font-display text-lg text-slate-100 mb-4">Today's Gold Rate (per gram)</h2>
          <form onSubmit={handleSaveRates} className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-500 block mb-1">24K</label>
              <input type="number" name="rate_24k" value={rates.rate_24k} onChange={handleRateChange} className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-3 py-2 rounded-sm focus:outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">22K</label>
              <input type="number" name="rate_22k" value={rates.rate_22k} onChange={handleRateChange} className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-3 py-2 rounded-sm focus:outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">18K</label>
              <input type="number" name="rate_18k" value={rates.rate_18k} onChange={handleRateChange} className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-3 py-2 rounded-sm focus:outline-none focus:border-emerald-400" />
            </div>
            <button type="submit" disabled={saving} className="md:col-span-3 bg-emerald-500 text-slate-950 font-medium py-2 rounded-sm hover:bg-emerald-400 transition-colors">
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Update Rate'}
            </button>
          </form>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-lg text-slate-100">Customer Enquiries ({leads.length})</h2>
            <button onClick={handleDownloadCSV} disabled={leads.length === 0} className="text-xs bg-emerald-500 text-slate-950 font-medium px-3 py-2 rounded-sm hover:bg-emerald-400 transition-colors disabled:opacity-40">
              Download Leads (CSV)
            </button>
          </div>
          {leads.length === 0 ? (
            <p className="text-slate-500 text-sm">No enquiries yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {leads.map((lead) => (
                <div key={lead.id} className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <p className="text-slate-100">{lead.name} — {lead.phone}</p>
                    <p className="text-xs text-slate-500">{lead.city || 'No city'} · {new Date(lead.created_at).toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    onClick={() => toggleLeadStatus(lead.id, lead.status)}
                    className={`text-xs px-3 py-1 rounded-full ${
                      lead.status === 'contacted' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                    }`}
                  >
                    {lead.status === 'contacted' ? 'Contacted' : 'Not Contacted'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
