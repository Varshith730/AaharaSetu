import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import FreshnessBadge from '../../components/FreshnessBadge';
import { mockDonations, mockDeliveries, getStatusBadge } from '../../data/mockData';
import { HandHeart, Truck, AlertTriangle, CheckCircle, MapPin, ChevronRight, Zap } from 'lucide-react';

export default function NgoHome() {
  const { user } = useAuth();
  const available = mockDonations.filter(d => d.status === 'pending');
  const active = mockDonations.filter(d => ['accepted', 'picked'].includes(d.status));

  return (
    <div className="fade-in">
      {/* Emergency banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(230,57,70,0.15), rgba(230,57,70,0.08))', border: '1px solid rgba(230,57,70,0.3)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(230,57,70,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="emergency-pulse">
            <Zap size={18} color="#E63946" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#E63946' }}>Emergency Alert Active</div>
            <div style={{ fontSize: 12, color: '#8B8FA8' }}>Roti Bank needs 100 meals urgently — 2km away</div>
          </div>
        </div>
        <Link to="/ngo/emergency" className="btn btn-danger btn-sm">View Emergency</Link>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">NGO Dashboard</h1>
          <p className="page-subtitle">Manage food collections and distributions</p>
        </div>
        <Link to="/ngo/nearby" className="btn btn-primary"><MapPin size={18} /> Find Food</Link>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard icon={HandHeart} iconColor="#60A5FA" iconBg="rgba(96,165,250,0.15)" label="Meals Received" value="8,450" change="+320 this week" changeType="up" />
        <StatCard icon={CheckCircle} iconColor="#52B788" iconBg="rgba(82,183,136,0.15)" label="Donations Accepted" value="124" change="+12 this month" changeType="up" />
        <StatCard icon={Truck} iconColor="#A78BFA" iconBg="rgba(167,139,250,0.15)" label="Active Deliveries" value={String(active.length)} />
        <StatCard icon={AlertTriangle} iconColor="#E63946" iconBg="rgba(230,57,70,0.15)" label="Emergency Requests" value="1" />
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Available Donations */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Available Donations</h3>
            <Link to="/ngo/nearby" style={{ color: '#52B788', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {available.slice(0, 3).map(d => (
              <div key={d.id} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{d.food_name}</div>
                  <FreshnessBadge expiryTime={d.expiry_time} foodType={d.food_type} />
                  <div style={{ fontSize: 12, color: '#8B8FA8', marginTop: 4 }}>
                    <MapPin size={10} style={{ display: 'inline', marginRight: 2 }} />{d.donor_name} • {d.quantity} meals
                  </div>
                </div>
                <button className="btn btn-primary btn-sm">Accept</button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Incoming Deliveries</h3>
            <Link to="/ngo/deliveries" style={{ color: '#52B788', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mockDeliveries.map(d => {
              const sb = getStatusBadge(d.status);
              return (
                <div key={d.id} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{d.food_name}</span>
                    <span className={`badge ${sb.class}`}>{sb.label}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8B8FA8' }}>
                    Volunteer: {d.volunteer_name} • {d.quantity} meals
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
