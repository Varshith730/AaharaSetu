import { useState } from 'react';
import { AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export default function EmergencyRequest() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ quantity: '', message: '', urgency: 'high' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16, textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(82,183,136,0.15)', border: '2px solid #52B788', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircle size={40} color="#52B788" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700 }}>Emergency Request Sent!</h2>
      <p style={{ color: '#8B8FA8', maxWidth: 360 }}>All restaurants within 10km have been notified of your urgent food requirement.</p>
      <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Request</button>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Emergency Food Request</h1>
          <p className="page-subtitle">Send an urgent food request to nearby restaurants</p>
        </div>
      </div>

      {/* Warning banner */}
      <div style={{ background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.3)', borderRadius: 12, padding: '14px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Zap size={20} color="#E63946" />
        <div>
          <div style={{ fontWeight: 700, color: '#E63946', fontSize: 14 }}>Emergency Mode</div>
          <div style={{ fontSize: 13, color: '#8B8FA8' }}>This will immediately alert all registered restaurants within 10km of your location</div>
        </div>
      </div>

      <div style={{ maxWidth: 560 }}>
        <form onSubmit={handleSubmit} className="card">
          <div className="form-group">
            <label className="form-label">Meals Required</label>
            <input className="form-input" type="number" placeholder="How many meals do you need?" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Urgency Level</label>
            <select className="form-input" value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })}>
              <option value="critical">🔴 Critical — Need within 30 minutes</option>
              <option value="high">🟠 High — Need within 1 hour</option>
              <option value="medium">🟡 Medium — Need within 2 hours</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Message to Restaurants</label>
            <textarea className="form-input" rows={4} placeholder="Describe the situation and specific food requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: 'vertical' }} />
          </div>
          <button type="submit" className="btn btn-danger" style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: 15 }}>
            <AlertTriangle size={18} /> Send Emergency Alert
          </button>
        </form>
      </div>
    </div>
  );
}
