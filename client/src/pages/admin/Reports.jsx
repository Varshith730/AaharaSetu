import { useState } from 'react';
import { mockAnalytics } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, FileText, Calendar } from 'lucide-react';

export default function Reports() {
  const [dateRange, setDateRange] = useState('week');

  const RANGES = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'custom', label: 'Custom' },
  ];

  const totalMeals = mockAnalytics.weeklyData.reduce((s, d) => s + d.meals, 0);
  const totalDonations = mockAnalytics.weeklyData.reduce((s, d) => s + d.donations, 0);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Generate detailed food redistribution reports</p>
        </div>
        <button className="btn btn-primary"><Download size={16} /> Export PDF</button>
      </div>

      {/* Date filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {RANGES.map(r => (
          <button key={r.id} onClick={() => setDateRange(r.id)}
            style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: dateRange === r.id ? 'rgba(82,183,136,0.2)' : 'transparent', color: dateRange === r.id ? '#52B788' : '#8B8FA8' }}>
            {r.label}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Total Meals', value: totalMeals.toLocaleString(), color: '#52B788' },
          { label: 'Donations', value: totalDonations, color: '#60A5FA' },
          { label: 'Waste Reduced', value: '2.4 tons', color: '#F4A261' },
          { label: 'Families Helped', value: Math.floor(totalMeals / 4).toLocaleString(), color: '#A78BFA' },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Poppins', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#8B8FA8', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Daily Donations vs Meals Saved</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={mockAnalytics.weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="day" stroke="#8B8FA8" fontSize={12} />
            <YAxis stroke="#8B8FA8" fontSize={12} />
            <Tooltip contentStyle={{ background: '#1A1D2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F0F2F5' }} />
            <Bar dataKey="meals" fill="#52B788" radius={[4, 4, 0, 0]} name="Meals" />
            <Bar dataKey="donations" fill="#60A5FA" radius={[4, 4, 0, 0]} name="Donations" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Downloadable reports */}
      <div className="card">
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Available Reports</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['Food Distribution Summary', 'Donor Activity Report', 'NGO Performance Report', 'Volunteer Impact Report'].map(r => (
            <div key={r} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileText size={16} color="#8B8FA8" />
                <span style={{ fontSize: 14 }}>{r}</span>
              </div>
              <button className="btn btn-secondary btn-sm"><Download size={12} /> Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
