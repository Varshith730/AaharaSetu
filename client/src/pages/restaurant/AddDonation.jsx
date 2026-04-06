import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Clock, MapPin, FileText, CheckCircle } from 'lucide-react';

export default function AddDonation() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ food_name: '', food_type: 'veg', quantity: '', prep_time: '', notes: '', address: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const calcExpiry = () => {
    if (!form.prep_time) return '';
    const prep = new Date(form.prep_time);
    const hours = form.food_type === 'non-veg' ? 2 : 4;
    prep.setHours(prep.getHours() + hours);
    return prep.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/restaurant'), 2500);
  };

  if (submitted) return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(82,183,136,0.15)', border: '2px solid #52B788', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircle size={40} color="#52B788" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700 }}>Donation Posted!</h2>
      <p style={{ color: '#8B8FA8', textAlign: 'center' }}>Nearby NGOs are being notified. You'll receive a confirmation soon.</p>
      <div className="badge badge-green">Redirecting to dashboard...</div>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Add Food Donation</h1>
          <p className="page-subtitle">Post your surplus food so NGOs can collect it</p>
        </div>
      </div>

      <div style={{ maxWidth: 680 }}>
        <form onSubmit={handleSubmit}>
          {/* Food Details */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(244,162,97,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UtensilsCrossed size={18} color="#F4A261" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Food Details</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Food Name / Description</label>
              <input className="form-input" name="food_name" placeholder="e.g. Biryani, Chapati, Rice & Dal..." value={form.food_name} onChange={handleChange} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Food Type</label>
                <select className="form-input" name="food_type" value={form.food_type} onChange={handleChange}>
                  <option value="veg">🌿 Vegetarian</option>
                  <option value="non-veg">🍗 Non-Vegetarian</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity (Meals)</label>
                <input className="form-input" type="number" name="quantity" placeholder="e.g. 50" min="1" value={form.quantity} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* Timing */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(96,165,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} color="#60A5FA" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Timing</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Food Preparation Time</label>
              <input className="form-input" type="datetime-local" name="prep_time" value={form.prep_time} onChange={handleChange} required />
            </div>

            {form.prep_time && (
              <div style={{ background: 'rgba(82,183,136,0.08)', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#52B788', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={14} />
                Auto-calculated expiry: <strong>{calcExpiry()}</strong> ({form.food_type === 'non-veg' ? '2 hrs' : '4 hrs'} from prep time for {form.food_type})
              </div>
            )}
          </div>

          {/* Location */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={18} color="#A78BFA" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Pickup Location</h3>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input className="form-input" name="address" placeholder="Restaurant address for pickup" value={form.address} onChange={handleChange} required />
            </div>
          </div>

          {/* Notes */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(82,183,136,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} color="#52B788" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Additional Notes</h3>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Special Instructions (Optional)</label>
              <textarea className="form-input" name="notes" placeholder="e.g. Packed in containers, requires refrigeration..." rows={3} value={form.notes} onChange={handleChange} style={{ resize: 'vertical' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/restaurant')}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              <CheckCircle size={18} /> Post Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
