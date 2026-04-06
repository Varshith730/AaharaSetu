import { mockDonations } from '../../data/mockData';
import StatusTracker from '../../components/StatusTracker';
import FreshnessBadge from '../../components/FreshnessBadge';
import { MapPin, Users, Clock } from 'lucide-react';

export default function TrackDonation() {
  const activeDonations = mockDonations.filter(d => !['delivered', 'expired'].includes(d.status));

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Track Donations</h1>
          <p className="page-subtitle">Real-time status of your active food donations</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {activeDonations.map(d => (
          <div key={d.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{d.food_name}</h3>
                <FreshnessBadge expiryTime={d.expiry_time} foodType={d.food_type} />
              </div>
              <div style={{ display: 'flex', gap: 12, fontSize: 13, color: '#8B8FA8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={14} /> {d.quantity} meals</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {d.lat?.toFixed(2)}, {d.lng?.toFixed(2)}</span>
              </div>
            </div>

            <StatusTracker status={d.status} />

            {d.ngo_name && (
              <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 8, fontSize: 13, color: '#60A5FA', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={14} /> Accepted by: <strong>{d.ngo_name}</strong>
              </div>
            )}
            {!d.ngo_name && (
              <div style={{ marginTop: 16, fontSize: 13, color: '#8B8FA8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={14} /> Waiting for an NGO to accept your donation...
              </div>
            )}
          </div>
        ))}
        {activeDonations.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '48px', color: '#8B8FA8' }}>
            No active donations at the moment
          </div>
        )}
      </div>
    </div>
  );
}
