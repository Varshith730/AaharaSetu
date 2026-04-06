import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Leaf, UtensilsCrossed, HandHeart, Truck, Phone, MapPin, Building2, Eye, EyeOff, Sun, Moon } from 'lucide-react';

const roles = [
  { id: 'restaurant', label: 'Restaurant / Donor', icon: UtensilsCrossed, color: '#ea580c' },
  { id: 'ngo', label: 'NGO', icon: HandHeart, color: '#2563eb' },
  { id: 'volunteer', label: 'Volunteer', icon: Truck, color: '#7c3aed' },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', address: '', city: 'Hyderabad', volunteer_type: 'independent' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { signUp, demoBypass } = useAuth();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await signUp(form.email, form.password, { 
        name: form.name, 
        role: selectedRole, 
        volunteer_type: selectedRole === 'volunteer' ? form.volunteer_type : null 
      });
      // Will auto-redirect once user is active, or we can push to login
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ position:'absolute', top:24, right:24 }}>
        <button className="theme-toggle" onClick={toggle} title="Toggle theme">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '12px', textDecoration:'none' }}>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--primary-deep), var(--primary-light))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow:'var(--shadow-md)' }}>
              <Leaf size={24} color="white" />
            </div>
            <span style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'Poppins' }} className="gradient-text">AaharSetu</span>
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Join the movement to end food waste</p>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            {[1, 2].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700,
                  background: step >= s ? 'var(--primary)' : 'var(--bg-card)', border: `1px solid ${step >= s ? 'transparent' : 'var(--border)'}`, color: step >= s ? 'white' : 'var(--text-muted)' }}>{s}</div>
                <span style={{ fontSize: '12px', color: step >= s ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600 }}>{s === 1 ? 'Choose Role' : 'Your Details'}</span>
                {s < 2 && <div style={{ flex: 1, height: 2, background: step > s ? 'var(--primary)' : 'var(--border)', borderRadius: 2 }} />}
              </div>
            ))}
          </div>

          {errorMsg && <div style={{ color:'var(--danger)', fontSize:12, marginBottom:16, background:'rgba(220,38,38,0.1)', padding:'10px', borderRadius:8 }}>{errorMsg}</div>}

          {step === 1 && (
            <div className="fade-in">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color:'var(--text)' }}>I am a...</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Choose how you want to contribute</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {roles.map(role => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button key={role.id} onClick={() => setSelectedRole(role.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '16px', background: isSelected ? `${role.color}0c` : 'var(--bg-card2)',
                        border: `1px solid ${isSelected ? role.color : 'var(--border)'}`, borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', boxShadow: isSelected ? `0 0 0 3px ${role.color}14` : 'none' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '10px', background: isSelected ? `${role.color}20` : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={20} color={isSelected ? role.color : 'var(--text-muted)'} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: isSelected ? role.color : 'var(--text)' }}>{role.label}</div>
                      </div>
                      {isSelected && <div style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: '50%', background: role.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color:'white', fontWeight:700 }}>✓</div>}
                    </button>
                  );
                })}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={() => selectedRole && setStep(2)} disabled={!selectedRole}>
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="fade-in">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color:'var(--text)' }}>Your Details</h2>
              <div className="form-group">
                <label className="form-label"><Building2 size={12} style={{ display: 'inline', marginRight: 4 }} />{selectedRole === 'restaurant' ? 'Restaurant Name' : selectedRole === 'ngo' ? 'NGO Name' : 'Full Name'}</label>
                <input className="form-input" name="name" placeholder="Enter name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              
              {selectedRole === 'volunteer' && (
                <div className="form-group">
                  <label className="form-label">Volunteer Type</label>
                  <select className="form-input" name="volunteer_type" value={form.volunteer_type} onChange={handleChange}>
                    <option value="independent">Independent Delivery</option>
                    <option value="ngo">NGO Member</option>
                  </select>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <select className="form-input" name="city" value={form.city} onChange={handleChange}>
                    <option>Hyderabad</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div style={{ position:'relative' }}>
                    <input className="form-input" name="password" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={handleChange} required />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', display:'flex' }}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(1)} disabled={loading}>Back</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center', padding: '14px' }} disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
              </div>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
          </div>

          {/* Hackathon Demo bypass */}
          <div style={{ marginTop:24, paddingTop:24, borderTop:'1px dashed var(--border)', textAlign:'center' }}>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:12 }}>Experiencing API rate limits?</div>
            <button type="button" onClick={() => { demoBypass(selectedRole || 'volunteer'); navigate(`/${selectedRole || 'volunteer'}`); }} className="btn btn-secondary" style={{ width:'100%', justifyContent:'center', padding:10, borderColor:'var(--primary-deep)', color:'var(--primary-deep)' }}>
              ⚡ Insta-Login Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
