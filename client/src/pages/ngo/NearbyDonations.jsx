import { useState } from 'react';
import { mockDonations } from '../../data/mockData';
import FreshnessBadge from '../../components/FreshnessBadge';
import { MapPin, List, Check, X } from 'lucide-react';

export default function NearbyDonations() {
  const [view, setView] = useState('list');
  const [accepted, setAccepted] = useState([]);
  const available = mockDonations.filter(d => d.status === 'pending');

  const handleAccept = (id) => setAccepted(prev => [...prev, id]);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Nearby Donations</h1>
          <p className="page-subtitle">Available food donations in your area</p>
        </div>
        <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 4 }}>
          {['list', 'map'].map(v => (
            <button key={v} onClick={() => setView(v)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
                background: view === v ? 'rgba(82,183,136,0.2)' : 'transparent', color: view === v ? '#52B788' : '#8B8FA8' }}>
              {v === 'list' ? <List size={14} /> : <MapPin size={14} />}
              {v === 'list' ? 'List View' : 'Map View'}
            </button>
          ))}
        </div>
      </div>

      {view === 'map' && (
        <div style={{ marginBottom: 20, background: 'rgba(30,34,53,0.7)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#8B8FA8' }}>
          <MapPin size={40} color="#52B788" />
          <div style={{ fontSize: 14, fontWeight: 600 }}>Interactive Map</div>
          <div style={{ fontSize: 12 }}>Leaflet.js map will render here with donation markers</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#52B788', display: 'inline-block' }} /> Safe</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F4A261', display: 'inline-block' }} /> Warning</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E63946', display: 'inline-block' }} /> Expired</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {available.map(d => {
          const isAccepted = accepted.includes(d.id);
          return (
            <div key={d.id} className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', opacity: isAccepted ? 0.6 : 1, transition: 'opacity 0.3s' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{d.food_name}</h3>
                  <FreshnessBadge expiryTime={d.expiry_time} foodType={d.food_type} />
                </div>
                <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#8B8FA8', flexWrap: 'wrap' }}>
                  <span><strong style={{ color: '#F0F2F5' }}>{d.quantity}</strong> meals available</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {d.donor_name}</span>
                  <span style={{ color: '#52B788' }}>~2.1 km away</span>
                </div>
                {d.notes && <div style={{ marginTop: 8, fontSize: 12, color: '#8B8FA8', background: 'rgba(255,255,255,0.03)', borderRadius: 6, padding: '6px 10px' }}>{d.notes}</div>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                {isAccepted ? (
                  <span className="badge badge-green"><Check size={10} /> Accepted</span>
                ) : (
                  <>
                    <button className="btn btn-primary btn-sm" onClick={() => handleAccept(d.id)}><Check size={14} /> Accept</button>
                    <button className="btn btn-danger btn-sm"><X size={14} /> Reject</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
