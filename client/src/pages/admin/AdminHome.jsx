import StatCard from '../../components/StatCard';
import { mockAnalytics } from '../../data/mockData';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { Users, UtensilsCrossed, Leaf, Activity } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const COLORS = ['#34d07f', '#fb923c'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', fontSize: 12 }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600 }}>{label}</div>
        {payload.map(p => (
          <div key={p.dataKey} style={{ color: p.color, fontWeight: 700 }}>{p.name}: {p.value.toLocaleString()}</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminHome() {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="page-header">
        <div>
          <div style={{ fontSize: 11, color: '#34d07f', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, background: 'rgba(52,208,127,0.08)', border: '1px solid rgba(52,208,127,0.2)', borderRadius: 20, padding: '3px 10px', display: 'inline-block', marginBottom: 8 }}>🛡️ Admin Control Panel</div>
          <h1 className="page-title">Platform Overview</h1>
          <p className="page-subtitle">Real-time analytics across all users and donations</p>
        </div>
        <RouterLink to="/admin/reports" className="btn btn-primary">Generate Report</RouterLink>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard icon={UtensilsCrossed} iconColor="#34d07f" iconBg="rgba(52,208,127,0.12)" label="Total Meals Saved" value={mockAnalytics.totalMealsSaved.toLocaleString()} change="+420 today" changeType="up" />
        <StatCard icon={Users} iconColor="#60A5FA" iconBg="rgba(96,165,250,0.12)" label="Active Users" value={String(mockAnalytics.activeUsers)} change="+5 this week" changeType="up" />
        <StatCard icon={Activity} iconColor="#a78bfa" iconBg="rgba(167,139,250,0.12)" label="Donations Today" value={String(mockAnalytics.donationsToday)} change="+8 vs yesterday" changeType="up" />
        <StatCard icon={Leaf} iconColor="#fb923c" iconBg="rgba(251,146,60,0.12)" label="Waste Prevented" value={mockAnalytics.wasteReduced} change="+0.3 tons today" changeType="up" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid-2" style={{ marginBottom: 20 }}>

        {/* Area chart — meals trend */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Weekly Meals Saved</h3>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Past 7 days performance</div>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Poppins', background: 'linear-gradient(135deg, #34d07f, #27ae72)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>13,820</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockAnalytics.weeklyData}>
              <defs>
                <linearGradient id="mealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d07f" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#34d07f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="meals" stroke="#34d07f" strokeWidth={2.5} fill="url(#mealGrad)" name="Meals" dot={false} activeDot={{ r: 5, fill: '#34d07f' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut — food types */}
        <div className="card">
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Food Type Distribution</h3>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>All-time breakdown</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={mockAnalytics.foodTypes} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={5} dataKey="value" startAngle={90} endAngle={-270}>
                  {mockAnalytics.foodTypes.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {mockAnalytics.foodTypes.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < mockAnalytics.foodTypes.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i], display: 'inline-block' }} />
                    <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{d.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: COLORS[i] }}>{d.value}%</span>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: '10px 0', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Total this week</div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Poppins', color: 'var(--text)' }}>13,820 <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>meals</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal bar chart — areas */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Meals Distributed by Area — Hyderabad</h3>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Top performing regions this month</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockAnalytics.areaData} layout="vertical">
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a6b47" />
                <stop offset="100%" stopColor="#34d07f" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
            <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis dataKey="area" type="category" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} width={90} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="meals" fill="url(#barGrad)" radius={[0, 6, 6, 0]} name="Meals" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
