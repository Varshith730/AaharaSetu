import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import FreshnessBadge from '../../components/FreshnessBadge';
import StatusTracker from '../../components/StatusTracker';
import { mockDonations, mockFeedback, getStatusBadge } from '../../data/mockData';
import { UtensilsCrossed, PackageCheck, Star, TrendingUp, PlusCircle, Clock, ChevronRight, ArrowUpRight, Zap, CheckCircle } from 'lucide-react';

export default function RestaurantHome() {
  const { user } = useAuth();
  const recentDonations = mockDonations.slice(0, 3);
  const activeDonations = mockDonations.filter(d => !['delivered','expired'].includes(d.status));

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* ── Header ── */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#34d07f', textTransform: 'uppercase', letterSpacing: 0.8, background: 'rgba(52,208,127,0.08)', border: '1px solid rgba(52,208,127,0.2)', borderRadius: 20, padding: '3px 10px' }}>
              🟢 Platform Live
            </div>
          </div>
          <h1 className="page-title">
            Good morning, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p className="page-subtitle">Here's your food donation impact for today — Sunday, Apr 6</p>
        </div>
        <Link to="/restaurant/donate" className="btn btn-primary">
          <PlusCircle size={16} /> Add Donation
        </Link>
      </div>

      {/* ── Stats ── */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard icon={UtensilsCrossed} iconColor="#fb923c" iconBg="rgba(251,146,60,0.12)" label="Total Donations" value="47" change="+3 this week" changeType="up" />
        <StatCard icon={PackageCheck} iconColor="#34d07f" iconBg="rgba(52,208,127,0.12)" label="Meals Saved" value="3,240" change="+180 today" changeType="up" />
        <StatCard icon={TrendingUp} iconColor="#60A5FA" iconBg="rgba(96,165,250,0.12)" label="Active Requests" value={String(activeDonations.length)} />
        <StatCard icon={Star} iconColor="#fbbf24" iconBg="rgba(251,191,36,0.12)" label="Avg NGO Rating" value="4.8" change="+0.2 this month" changeType="up" />
      </div>

      {/* ── Quick action banner ── */}
      <div style={{ background: 'linear-gradient(135deg, rgba(26,107,71,0.15) 0%, rgba(52,208,127,0.06) 100%)', border: '1px solid rgba(52,208,127,0.2)', borderRadius: 14, padding: '18px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(52,208,127,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={22} color="#34d07f" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>You have surplus food today?</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>Post it in under 60 seconds — nearby NGOs will be notified instantly</div>
          </div>
        </div>
        <Link to="/restaurant/donate" className="btn btn-primary btn-sm"><PlusCircle size={14} /> Post Donation Now</Link>
      </div>

      {/* ── Main grid ── */}
      <div className="grid-2" style={{ marginBottom: 20 }}>

        {/* Recent Donations */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>Recent Donations</h3>
            <Link to="/restaurant/history" style={{ color: '#34d07f', fontSize: 12.5, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600 }}>
              View all <ChevronRight size={13} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentDonations.map(d => {
              const sb = getStatusBadge(d.status);
              return (
                <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px', background: 'rgba(255,255,255,0.025)', borderRadius: 12, gap: 10, border: '1px solid var(--border)', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(52,208,127,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{d.food_name}</div>
                    <FreshnessBadge expiryTime={d.expiry_time} foodType={d.food_type} />
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <PackageCheck size={10} /> {d.quantity} meals
                      {d.ngo_name && <span style={{ color: '#34d07f' }}>· {d.ngo_name}</span>}
                    </div>
                  </div>
                  <span className={`badge ${sb.class}`}>{sb.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Status Tracker */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>Live Donation Status</h3>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#34d07f', fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d07f', display: 'inline-block', animation: 'pulse-glow 1.5s infinite' }} />
              Real-time
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {recentDonations.slice(0, 2).map(d => (
              <div key={d.id} style={{ padding: '14px', background: 'rgba(255,255,255,0.025)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontWeight: 600, fontSize: 13.5 }}>{d.food_name}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.quantity} meals</span>
                </div>
                <StatusTracker status={d.status} />
                {d.ngo_name && (
                  <div style={{ fontSize: 11.5, color: '#60A5FA', marginTop: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle size={11} /> Accepted by <strong>{d.ngo_name}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Feedback ── */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Feedback from NGOs</h3>
          <Link to="/restaurant/feedback" style={{ color: '#34d07f', fontSize: 12.5, textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>See all <ChevronRight size={13} /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {mockFeedback.map(f => (
            <div key={f.id} style={{ display: 'flex', gap: 12, padding: '14px', background: 'rgba(255,255,255,0.025)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(52,208,127,0.12)', border: '1px solid rgba(52,208,127,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                🤝
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{f.from}</div>
                <div style={{ color: '#fbbf24', fontSize: 12, marginBottom: 4 }}>{'★'.repeat(f.rating)}{'☆'.repeat(5-f.rating)}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.4 }}>"{f.comment}"</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
