import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Leaf, UtensilsCrossed, HandHeart, Truck, ShieldCheck, Eye, EyeOff, ArrowRight, Sun, Moon } from 'lucide-react';

const roles = [
  { id:'restaurant', label:'Restaurant / Donor', icon:UtensilsCrossed, color:'#ea580c', desc:'Post surplus food donations' },
  { id:'ngo',        label:'NGO',                icon:HandHeart,       color:'#2563eb', desc:'Accept and distribute food' },
  { id:'volunteer',  label:'Volunteer',          icon:Truck,           color:'#7c3aed', desc:'Pick up and deliver food' },
  { id:'admin',      label:'Admin',              icon:ShieldCheck,     color:'#16a34a', desc:'Manage the platform' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login, demoBypass } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter email and password');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      await login(email, password);
      // Let AuthContext redirect or navigate to base role dynamically
      navigate('/');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sr = roles.find(r => r.id === selectedRole);

  return (
    <div style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', background:'var(--bg)' }}>

      {/* ── LEFT PANEL ── */}
      <div style={{ position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:40, background: 'var(--bg-card2)' }}>
        {/* Subtle background image */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/hero.png)', backgroundSize:'cover', backgroundPosition:'center', opacity: isDark ? 0.15 : 0.05, filter: 'grayscale(0.5)', zIndex:0 }} />
        {/* Gradient overlay */}
        <div style={{ position:'absolute', inset:0, background: isDark
          ? 'linear-gradient(135deg, rgba(8,12,16,0.97) 0%, rgba(59,130,246,0.1) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(37,99,235,0.08) 100%)', zIndex:1 }} />
        {/* Blue glow blob */}
        <div style={{ position:'absolute', bottom:-80, left:-80, width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)', zIndex:1 }} />

        {/* Logo */}
        <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, background:'linear-gradient(135deg, var(--primary-deep), var(--primary-light))', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px var(--primary-glow)' }}>
              <Leaf size={18} color="white" />
            </div>
            <span style={{ fontSize:18, fontWeight:800, fontFamily:'Poppins' }} className="gradient-text">AaharSetu</span>
          </Link>
          <button className="theme-toggle" onClick={toggle} title="Toggle theme">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Center */}
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ fontSize:46, marginBottom:16 }}>🌍</div>
          <h2 style={{ fontSize:'clamp(24px,3vw,34px)', fontWeight:900, fontFamily:'Poppins', lineHeight:1.15, marginBottom:12, letterSpacing:-0.5, color:'var(--text)' }}>
            Bridging Food<br />to <span className="gradient-text">Lives.</span>
          </h2>
          <p style={{ fontSize:14.5, color:'var(--text-dim)', lineHeight:1.7, maxWidth:320 }}>
            Every day, thousands of meals go to waste while families go hungry. AaharSetu closes that gap — in real time.
          </p>
        </div>

        {/* Stats */}
        <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', gap:8 }}>
          {[
            { v:'14,820+', l:'Meals redistributed' },
            { v:'87',      l:'Partner organizations' },
            { v:'< 2hrs',  l:'Average delivery time' },
          ].map(s => (
            <div key={s.l} style={{ display:'flex', alignItems:'center', gap:14, background: 'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:'11px 15px', boxShadow:'var(--shadow-sm)' }}>
              <span style={{ fontSize:17, fontWeight:800, fontFamily:'Poppins', color:'var(--primary)', minWidth:66 }}>{s.v}</span>
              <span style={{ fontSize:13, color:'var(--text-muted)' }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:40, overflowY:'auto', background:'var(--bg)' }}>
        <div style={{ width:'100%', maxWidth:420 }}>
          <div style={{ marginBottom:28 }}>
            <h1 style={{ fontSize:26, fontWeight:800, marginBottom:5, letterSpacing:-0.5, color:'var(--text)' }}>Welcome back</h1>
            <p style={{ color:'var(--text-muted)', fontSize:14 }}>Sign in to your AaharSetu account</p>
          </div>

          <form onSubmit={handleLogin}>
            {errorMsg && <div style={{ color:'var(--danger)', fontSize:12, marginBottom:16, background:'rgba(220,38,38,0.1)', padding:'10px', borderRadius:8 }}>{errorMsg}</div>}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position:'relative' }}>
                <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight:44 }} required />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', display:'flex' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:14, marginTop:6, fontSize:15 }} disabled={loading}>
              {loading ? 'Authenticating...' : <><ArrowRight size={17} /> Sign In</>}
            </button>
          </form>

          <div style={{ textAlign:'center', marginTop:18, fontSize:13, color:'var(--text-muted)' }}>
            New to AaharSetu?{' '}
            <Link to="/register" style={{ color:'var(--primary)', fontWeight:600 }}>Create an account</Link>
          </div>

          {/* Hackathon Demo bypass */}
          <div style={{ marginTop:24, paddingTop:24, borderTop:'1px dashed var(--border)', textAlign:'center' }}>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:12 }}>Presentation Mode / Email Rate Limit Bypass</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
               <button type="button" onClick={() => { demoBypass('restaurant'); navigate('/restaurant'); }} className="btn btn-sm btn-secondary" style={{ padding:6, fontSize:11 }}>Demo Restaurant</button>
               <button type="button" onClick={() => { demoBypass('ngo'); navigate('/ngo'); }} className="btn btn-sm btn-secondary" style={{ padding:6, fontSize:11 }}>Demo NGO</button>
               <button type="button" onClick={() => { demoBypass('volunteer'); navigate('/volunteer'); }} className="btn btn-sm btn-secondary" style={{ padding:6, fontSize:11 }}>Demo Volunteer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
