import { MapPin, Navigation } from 'lucide-react';

export default function DeliveryMap() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Delivery Map</h1>
          <p className="page-subtitle">Navigate to your pickup and drop locations</p>
        </div>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 16, fontSize: 13, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#F4A261', display: 'inline-block' }} /> Pickup: Spice Garden, Banjara Hills</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#52B788', display: 'inline-block' }} /> Drop: Feeding Hyderabad NGO, Jubilee Hills</div>
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{ background: 'rgba(30,34,53,0.7)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', height: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, color: '#8B8FA8', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        {/* Decorative grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(82,183,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(82,183,136,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(82,183,136,0.15)', border: '2px solid #52B788', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <Navigation size={32} color="#52B788" />
        </div>
        <div style={{ zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#F0F2F5', marginBottom: 8 }}>Interactive Map</div>
          <div style={{ fontSize: 13 }}>Leaflet.js map with route overlay will render here</div>
          <div style={{ fontSize: 12, marginTop: 4, color: '#52B788' }}>OpenStreetMap • Free, no API key needed</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}><MapPin size={16} /> Start Navigation</button>
        <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Mark as Picked Up</button>
        <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Mark as Delivered</button>
      </div>
    </div>
  );
}
