import { mockDeliveries, getStatusBadge } from '../../data/mockData';
import { Truck, MapPin, Clock, Package } from 'lucide-react';

export default function IncomingDeliveries() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Incoming Deliveries</h1>
          <p className="page-subtitle">Track volunteer deliveries in real-time</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {mockDeliveries.map(d => {
          const sb = getStatusBadge(d.status);
          return (
            <div key={d.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{d.food_name}</h3>
                  <div style={{ fontSize: 13, color: '#8B8FA8', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Package size={13} /> {d.quantity} meals
                  </div>
                </div>
                <span className={`badge ${sb.class}`}>{sb.label}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: '#8B8FA8', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Pickup From</div>
                  <div style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={12} color="#F4A261" /> {d.pickup_address}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: '#8B8FA8', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Drop To</div>
                  <div style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={12} color="#52B788" /> {d.drop_address}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#8B8FA8', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Truck size={13} color="#A78BFA" /> Volunteer: <span style={{ color: '#A78BFA', fontWeight: 600 }}>{d.volunteer_name}</span>
                </div>
                {d.picked_at && <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> Picked up: {new Date(d.picked_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
