import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Leaf, ArrowRight, UtensilsCrossed, HandHeart, Truck, ShieldCheck,
  Zap, Clock, MapPin, Star, Check,
  TrendingUp, Package, Users, Globe, Sun, Moon
} from 'lucide-react';

/* ── Animated counter hook */
function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

const stats = [
  { end: 14820, suffix: '+', label: 'Meals Redistributed',   icon: Package,    color: '#16a34a' },
  { end: 87,    suffix: '',  label: 'Partner Organizations', icon: Users,      color: '#2563eb' },
  { end: 48,    suffix: '',  label: 'Active Volunteers',     icon: Truck,      color: '#7c3aed' },
  { end: 24,    suffix: 't', label: 'Food Waste Prevented',  icon: TrendingUp, color: '#ea580c' },
];

const howItWorks = [
  { step:'01', icon:UtensilsCrossed, color:'#ea580c', title:'Restaurant Posts Surplus',       desc:'Add food details in under 60 seconds — quantity, type, and pickup window. NGOs are instantly notified.' },
  { step:'02', icon:Zap,             color:'#d97706', title:'Smart NGO Matching',             desc:'Our system matches the donation to the nearest NGO by capacity, food type, and urgency score.' },
  { step:'03', icon:Truck,           color:'#7c3aed', title:'Volunteer Picks Up',            desc:'A nearby verified volunteer accepts the task, navigates to the pickup point, and collects the food.' },
  { step:'04', icon:HandHeart,       color:'#16a34a', title:'Community Receives Food',       desc:'Food reaches the NGO within the freshness window. Every meal is logged for transparent impact reporting.' },
];

const features = [
  { icon:Zap,        color:'#d97706', title:'Smart Matching Engine',  desc:'Automatically pairs donations to the right NGO based on real-time distance, capacity, and urgency scoring.' },
  { icon:Clock,      color:'#2563eb', title:'Food Freshness Tracker', desc:'Every donation shows a live freshness status — Safe 🟢, Warning 🟡, or Expired 🔴 — calculated from prep time.' },
  { icon:MapPin,     color:'#7c3aed', title:'Live Delivery Tracking', desc:'Track every pickup and delivery on an interactive map. All parties stay in sync in real-time.' },
  { icon:Star,       color:'#ea580c', title:'Gamified Volunteering',  desc:'Volunteers earn reward points per delivery, unlock badges, and compete on a live leaderboard.' },
  { icon:ShieldCheck,color:'#16a34a', title:'Emergency Mode',         desc:'NGOs trigger emergency alerts that instantly notify all nearby restaurants of urgent food needs.' },
  { icon:Globe,      color:'#0891b2', title:'Impact Dashboard',       desc:'Detailed analytics on meals saved, waste reduced, and community impact — updated in real-time.' },
];

const roles = [
  { icon:UtensilsCrossed, color:'#ea580c', border:'rgba(234,88,12,0.2)',   bg:'rgba(234,88,12,0.07)',   role:'Restaurants & Donors', tagline:'Post in 60 seconds', desc:'Add surplus food, track acceptance, receive volunteer ETAs, and rate NGO partners.',   points:['Post food donations instantly','Auto-expiry calculation','Real-time pickup tracking','NGO rating & feedback'] },
  { icon:HandHeart,       color:'#2563eb', border:'rgba(37,99,235,0.2)',   bg:'rgba(37,99,235,0.07)',   role:'NGOs & Charities',     tagline:'Never miss a meal',  desc:'Browse nearby donations on a live map, accept requests, raise emergency alerts, and maintain distribution records.', points:['Map-based donation discovery','Accept or reject donations','Emergency food requests','Distribution records & reports'] },
  { icon:Truck,           color:'#7c3aed', border:'rgba(124,58,237,0.2)',  bg:'rgba(124,58,237,0.07)',  role:'Volunteers',           tagline:'Deliver. Earn. Repeat.', desc:'Set availability, accept tasks, navigate with maps, earn reward points per delivery.', points:['Set online/offline status','Accept delivery tasks','Navigate with live maps','Earn reward points & badges'] },
];

const testimonials = [
  { name:'Lakshmi Devi',  role:'Director, Feeding Hyderabad NGO', quote:'"Before AaharSetu, we spent hours calling restaurants every day. Now food just comes to us. Last month alone we served 4,200 additional meals."', rating:5, avatar:'🤝' },
  { name:'Ravi Shankar',  role:'Owner, Spice Garden Restaurant',  quote:'"We used to throw away 30 kg of food every weekend. Now it reaches communities in need within 2 hours. Incredibly easy to use."', rating:5, avatar:'🍽️' },
  { name:'Arjun Kumar',   role:'Volunteer — 48 deliveries',       quote:'"I do 2–3 deliveries a week on my way home. The rewards keep me motivated, but honestly, seeing those faces is enough."', rating:5, avatar:'🚲' },
];

const tickerItems = [
  '14,820+ meals redistributed','Zero hunger initiative','87 partner organizations',
  '48 active volunteers across Hyderabad','Real-time food tracking',
  '2.4 tons of food waste prevented','Open source platform','Community powered',
];

/* ── Proper component for animated counter card */
function StatCounterCard({ stat, delay, visible }) {
  const count = useCounter(stat.end, 2000 + delay, visible);
  const Icon = stat.icon;
  return (
    <div className="card" style={{ textAlign:'center', padding:'32px 20px', position:'relative', overflow:'hidden', transition:'all 0.3s', cursor:'default' }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor=stat.color+'40'; e.currentTarget.style.boxShadow=`0 20px 50px rgba(0,0,0,0.12)`; }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor=''; e.currentTarget.style.boxShadow=''; }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,transparent,${stat.color},transparent)` }} />
      <div style={{ width:54, height:54, borderRadius:16, background:`${stat.color}10`, border:`1px solid ${stat.color}25`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px' }}>
        <Icon size={24} color={stat.color} />
      </div>
      <div style={{ fontSize:'clamp(30px,4vw,46px)', fontWeight:900, fontFamily:'Poppins', color:stat.color, letterSpacing:-1, lineHeight:1 }}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:8, fontWeight:500 }}>{stat.label}</div>
    </div>
  );
}

export default function Landing() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  /* helper: themed card style */
  const S = {
    section:   { padding:'80px 48px', maxWidth:1200, margin:'0 auto' },
    divider:   { borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background: isDark ? 'rgba(255,255,255,0.016)' : 'rgba(0,0,0,0.016)' },
    featureCard: (c) => ({
      background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, padding:24,
      cursor:'default', transition:'all 0.3s cubic-bezier(.16,1,.3,1)', boxShadow:'var(--shadow-sm)',
    }),
  };

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh', overflowX:'hidden' }}>

      {/* ── NAV ── */}
      <nav className="landing-nav">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, background:'linear-gradient(135deg,#15803d,#22c55e)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(22,163,74,0.25)' }}>
            <Leaf size={18} color="white" />
          </div>
          <span style={{ fontSize:19, fontWeight:800, fontFamily:'Poppins' }} className="gradient-text">AaharSetu</span>
        </div>

        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          {/* Theme toggle */}
          <button className="theme-toggle" onClick={toggle} title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
          <Link to="/register" className="btn btn-primary btn-sm"><Leaf size={13} /> Join Free</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-image-bg" style={{ backgroundImage:'url(/hero.png)' }} />
        <div className="hero-content animate-fadeUp">
          <div className="live-counter">
            <span className="live-dot" />
            Live Now — 23 donations active across Hyderabad
          </div>
          <h1 className="hero-headline">
            Every Plate Saved<br />
            <span className="gradient-text">Is a Life Changed.</span>
          </h1>
          <p className="hero-sub">
            AaharSetu connects restaurants with surplus food to nearby NGOs and a network of verified volunteers — ensuring meals reach communities within hours, not days.
          </p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:40 }}>
            <Link to="/register" className="btn btn-primary btn-lg"><ArrowRight size={18} /> Start Donating Food</Link>
            <Link to="/login"    className="btn btn-secondary btn-lg">Explore Dashboards →</Link>
          </div>
          <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
            {['Free to join','Real-time tracking','Verified volunteers','Zero food waste goal'].map(b => (
              <div key={b} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.5, color:'var(--text-dim)' }}>
                <Check size={13} color="var(--primary)" /> {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: isDark ? 'rgba(34,197,94,0.05)' : 'rgba(22,163,74,0.04)', borderTop:'1px solid var(--border-accent)', borderBottom:'1px solid var(--border-accent)', padding:'14px 0', overflow:'hidden' }}>
        <div className="ticker-wrapper">
          <div className="ticker-inner">
            {[...tickerItems,...tickerItems].map((item,i) => (
              <span key={i} className="ticker-item"><span className="ticker-dot" /> {item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section id="impact" ref={statsRef} style={S.section}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div className="section-chip chip-green">Our Impact</div>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:900, letterSpacing:-1, marginBottom:12, color:'var(--text)' }}>
            Real Numbers.<br /><span className="gradient-text">Real Change.</span>
          </h2>
          <p style={{ color:'var(--text-muted)', fontSize:15, maxWidth:460, margin:'0 auto' }}>Every statistic represents a meal that reached someone in need instead of a landfill.</p>
        </div>
        <div className="grid-4">
          {stats.map((s, i) => <StatCounterCard key={s.label} stat={s} delay={i*200} visible={statsVisible} />)}
        </div>
      </section>

      {/* ── IMAGE STORY ── */}
      <section style={{ padding:'0 48px 80px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center' }}>
          <div>
            <div className="section-chip chip-orange">The Problem</div>
            <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', fontWeight:900, letterSpacing:-0.8, lineHeight:1.15, marginBottom:18, color:'var(--text)' }}>
              40% of Food in India<br />is <span className="gradient-text-warm">Never Eaten.</span>
            </h2>
            <p style={{ fontSize:15, color:'var(--text-dim)', lineHeight:1.7, marginBottom:16 }}>
              In cities like Hyderabad and Mumbai, restaurants discard thousands of meals daily. Meanwhile, just a few kilometers away, families skip meals. The food exists — the <strong style={{ color:'var(--text)' }}>connection doesn't.</strong>
            </p>
            <p style={{ fontSize:15, color:'var(--text-dim)', lineHeight:1.7, marginBottom:28 }}>
              AaharSetu is that connection. A real-time bridge between surplus and survival, coordinating the entire food redistribution chain from one platform.
            </p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {['Real-time coordination','Verified NGO network','Zero food left behind'].map(t => (
                <span key={t} style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(22,163,74,0.07)', border:'1px solid rgba(22,163,74,0.18)', borderRadius:20, padding:'6px 14px', fontSize:12.5, color:'var(--primary-deep)', fontWeight:600 }}>
                  <Check size={11} /> {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ position:'relative' }}>
            <div className="img-card" style={{ aspectRatio:'3/2' }}>
              <img src="/food.png" alt="Surplus food ready for redistribution" />
              <div className="img-card-overlay" />
              <div style={{ position:'absolute', bottom:20, left:20, right:20, zIndex:2 }}>
                <div style={{ background:'rgba(0,0,0,0.8)', backdropFilter:'blur(12px)', border:'1px solid rgba(22,163,74,0.3)', borderRadius:12, padding:'12px 16px' }}>
                  <div style={{ fontSize:12, color:'#4ade80', fontWeight:700, marginBottom:4 }}>🟢 FRESHNESS ALERT</div>
                  <div style={{ fontSize:13, color:'white' }}>Biryani &amp; Curry — 80 meals — Spice Garden</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', marginTop:2 }}>Available for pickup · Expires in 3h 20m</div>
                </div>
              </div>
            </div>
            <div style={{ position:'absolute', top:-16, right:-16, background:'linear-gradient(135deg,#15803d,#22c55e)', borderRadius:12, padding:'10px 16px', fontSize:12, fontWeight:700, color:'white', boxShadow:'0 8px 24px rgba(22,163,74,0.35)', zIndex:3 }}>
              🎯 Smart Matched in 4s
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ ...S.divider, padding:'80px 0' }}>
        <div style={S.section}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div className="section-chip chip-purple">How It Works</div>
            <h2 style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:900, letterSpacing:-0.8, marginBottom:12, color:'var(--text)' }}>
              From Kitchen to Community<br /><span className="gradient-text">In Under 2 Hours.</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
            {howItWorks.map((step,i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className={i < 3 ? 'step-line' : ''} style={{ padding:'0 24px', textAlign:'center' }}>
                  <div style={{ width:54, height:54, borderRadius:16, background:`${step.color}10`, border:`1px solid ${step.color}25`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px', position:'relative', zIndex:1 }}>
                    <Icon size={24} color={step.color} />
                  </div>
                  <div style={{ fontSize:11, fontWeight:800, color:step.color, textTransform:'uppercase', letterSpacing:1, marginBottom:6 }}>Step {step.step}</div>
                  <h3 style={{ fontSize:14.5, fontWeight:700, marginBottom:8, lineHeight:1.3, color:'var(--text)' }}>{step.title}</h3>
                  <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.6 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NGO + VOLUNTEER IMAGES ── */}
      <section style={{ padding:'80px 48px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div className="img-card" style={{ aspectRatio:'4/3' }}>
            <img src="/ngo.png" alt="NGO food distribution" />
            <div className="img-card-overlay" />
            <div style={{ position:'absolute', bottom:20, left:20, zIndex:2 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'white', marginBottom:4 }}>Community First</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.7)' }}>600+ families served weekly across Hyderabad</div>
            </div>
          </div>
          <div className="img-card" style={{ aspectRatio:'4/3' }}>
            <img src="/volunteer.png" alt="Volunteer delivering food" />
            <div className="img-card-overlay" />
            <div style={{ position:'absolute', bottom:20, left:20, zIndex:2 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'white', marginBottom:4 }}>Volunteer Heroes</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.7)' }}>Average delivery time: 28 minutes</div>
            </div>
            <div style={{ position:'absolute', top:16, right:16, background:'linear-gradient(135deg,#d97706,#ea580c)', borderRadius:10, padding:'8px 14px', fontSize:12, fontWeight:700, color:'white', zIndex:2, boxShadow:'0 4px 16px rgba(234,88,12,0.35)' }}>
              🏆 +10 pts per delivery
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding:'0 48px 80px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div className="section-chip chip-blue">Platform Features</div>
          <h2 style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:900, letterSpacing:-0.8, marginBottom:12, color:'var(--text)' }}>
            Built for Speed.<br /><span className="gradient-text">Designed for Impact.</span>
          </h2>
          <p style={{ color:'var(--text-muted)', fontSize:15, maxWidth:440, margin:'0 auto' }}>Every feature was built with one goal: get food from donor to recipient as fast as possible.</p>
        </div>
        <div className="grid-3">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} style={S.featureCard(f.color)}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor=f.color+'35'; e.currentTarget.style.boxShadow='var(--shadow-xl)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor=''; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}>
                <div style={{ width:46, height:46, borderRadius:12, background:`${f.color}10`, border:`1px solid ${f.color}20`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                  <Icon size={22} color={f.color} />
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, marginBottom:8, color:'var(--text)' }}>{f.title}</h3>
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.65 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ROLE CARDS ── */}
      <section style={{ padding:'0 48px 80px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <h2 style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:900, letterSpacing:-0.8, marginBottom:12, color:'var(--text)' }}>
            One Platform.<br /><span className="gradient-text">Every Role Covered.</span>
          </h2>
        </div>
        <div className="grid-3">
          {roles.map(r => {
            const Icon = r.icon;
            return (
              <div key={r.role} style={{ background:'var(--bg-card)', border:`1px solid ${r.border}`, borderRadius:18, padding:28, display:'flex', flexDirection:'column', transition:'all 0.3s', position:'relative', overflow:'hidden', boxShadow:'var(--shadow-sm)' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='var(--shadow-xl)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,transparent,${r.color},transparent)` }} />
                <div style={{ width:50, height:50, borderRadius:14, background:r.bg, border:`1px solid ${r.border}`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                  <Icon size={24} color={r.color} />
                </div>
                <div style={{ fontSize:10.5, color:r.color, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:5 }}>{r.tagline}</div>
                <h3 style={{ fontSize:16, fontWeight:800, marginBottom:8, color:'var(--text)' }}>{r.role}</h3>
                <p style={{ fontSize:13.5, color:'var(--text-muted)', lineHeight:1.6, marginBottom:18 }}>{r.desc}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:22 }}>
                  {r.points.map(p => (
                    <div key={p} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13 }}>
                      <Check size={12} color={r.color} style={{ flexShrink:0 }} />
                      <span style={{ color:'var(--text-dim)' }}>{p}</span>
                    </div>
                  ))}
                </div>
                <Link to="/login" className="btn btn-sm" style={{ marginTop:'auto', background:r.bg, color:r.color, border:`1px solid ${r.border}`, width:'100%', justifyContent:'center' }}>
                  Get Started <ArrowRight size={12} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ ...S.divider, padding:'80px 0' }}>
        <div style={S.section}>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', fontWeight:900, letterSpacing:-0.8, marginBottom:10, color:'var(--text)' }}>
              Stories That <span className="gradient-text">Matter.</span>
            </h2>
            <p style={{ color:'var(--text-muted)', fontSize:15 }}>From the people building a hunger-free city</p>
          </div>
          <div className="grid-3">
            {testimonials.map((t,i) => (
              <div key={i} className="testimonial-card">
                <div style={{ fontSize:28, marginBottom:10 }}>{t.avatar}</div>
                <div style={{ color:'#d97706', fontSize:14, marginBottom:12 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ fontSize:14, color:'var(--text-dim)', lineHeight:1.7, fontStyle:'italic', marginBottom:18 }}>{t.quote}</p>
                <div style={{ borderTop:'1px solid var(--border)', paddingTop:14 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>{t.name}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'100px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(22,163,74,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:580, margin:'0 auto' }}>
          <div style={{ fontSize:52, marginBottom:18 }}>🌿</div>
          <h2 style={{ fontSize:'clamp(26px,4vw,46px)', fontWeight:900, letterSpacing:-1, marginBottom:16, lineHeight:1.1, color:'var(--text)' }}>
            Ready to Bridge<br /><span className="gradient-text">Food to Lives?</span>
          </h2>
          <p style={{ color:'var(--text-muted)', fontSize:16, lineHeight:1.7, marginBottom:32 }}>
            Join 87 organizations already using AaharSetu to eliminate food waste and feed communities in Hyderabad. Free to join. No credit card. Instant access.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg" style={{ minWidth:200, justifyContent:'center' }}><Leaf size={18} /> Join AaharSetu Free</Link>
            <Link to="/login"    className="btn btn-secondary btn-lg">Explore Demo →</Link>
          </div>
          <div style={{ marginTop:22, fontSize:12.5, color:'var(--text-muted)' }}>✓ Free forever &nbsp;&nbsp; ✓ No technical setup &nbsp;&nbsp; ✓ Verified by 87 organizations</div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:'1px solid var(--border)', padding:'40px 48px', background:'var(--bg-card)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <div style={{ width:30, height:30, background:'linear-gradient(135deg,#15803d,#22c55e)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Leaf size={15} color="white" />
              </div>
              <span style={{ fontSize:16, fontWeight:800, fontFamily:'Poppins' }} className="gradient-text">AaharSetu</span>
            </div>
            <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.7, maxWidth:280 }}>A real-time food redistribution platform connecting restaurants, NGOs and volunteers across India.</p>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:14 }}>Built for Hackathon 2026 · Open Source</div>
          </div>
          {[
            { title:'Platform', links:['How It Works','Features','Impact','Security'] },
            { title:'For Users', links:['Restaurants','NGOs','Volunteers','Admins'] },
            { title:'Support',   links:['Documentation','GitHub','Contact Us','Community'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:0.8, marginBottom:14 }}>{col.title}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize:13.5, color:'var(--text-dim)', marginBottom:9, cursor:'pointer', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='var(--primary)'}
                  onMouseLeave={e => e.target.style.color=''}>
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth:1200, margin:'28px auto 0', paddingTop:20, borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12.5, color:'var(--text-muted)', flexWrap:'wrap', gap:8 }}>
          <span>© 2026 AaharSetu. Bridging Food to Lives.</span>
          <span>Made with 💚 to fight hunger</span>
        </div>
      </footer>
    </div>
  );
}
