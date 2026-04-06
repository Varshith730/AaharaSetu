import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Leaf, LayoutDashboard, PlusCircle, History, MapPin,
  Truck, Users, BarChart3, LogOut, HandHeart,
  Trophy, AlertTriangle, ClipboardList, ShieldCheck, Activity,
  Bell, Sun, Moon, Gift
} from 'lucide-react';

const navConfig = {
  restaurant: [
    { to:'/restaurant',          icon:LayoutDashboard, label:'Dashboard',        end:true },
    { to:'/restaurant/donate',   icon:PlusCircle,      label:'Add Donation' },
    { to:'/restaurant/history',  icon:History,         label:'Donation History' },
    { to:'/restaurant/track',    icon:MapPin,          label:'Track Status' },
    { to:'/restaurant/feedback', icon:ClipboardList,   label:'Feedback & Ratings' },
  ],
  ngo: [
    { to:'/ngo',          icon:LayoutDashboard, label:'Dashboard',          end:true },
    { to:'/ngo/nearby',   icon:MapPin,          label:'Nearby Donations' },
    { to:'/ngo/deliveries',icon:Truck,          label:'Incoming Deliveries' },
    { to:'/ngo/emergency',icon:AlertTriangle,   label:'Emergency Request' },
    { to:'/ngo/records',  icon:ClipboardList,   label:'Distribution Records' },
  ],
  volunteer: [
    { to:'/volunteer',             icon:LayoutDashboard, label:'Dashboard',  end:true },
    { to:'/volunteer/tasks',       icon:ClipboardList,   label:'My Tasks' },
    { to:'/volunteer/map',         icon:MapPin,          label:'Delivery Map' },
    { to:'/volunteer/leaderboard', icon:Trophy,          label:'Leaderboard' },
    { to:'/volunteer/rewards',     icon:Gift,            label:'Rewards Market' },
  ],
  admin: [
    { to:'/admin',          icon:LayoutDashboard, label:'Overview',         end:true },
    { to:'/admin/users',    icon:Users,           label:'User Management' },
    { to:'/admin/activity', icon:Activity,        label:'Live Activity' },
    { to:'/admin/reports',  icon:BarChart3,       label:'Reports' },
  ],
};

const roleTheme = {
  restaurant: { color:'#ea580c', label:'Restaurant Portal', emoji:'🍽️' },
  ngo:        { color:'#2563eb', label:'NGO Portal',        emoji:'🤝' },
  volunteer:  { color:'#7c3aed', label:'Volunteer Portal',  emoji:'🚚' },
  admin:      { color:'#16a34a', label:'Admin Portal',      emoji:'🛡️' },
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  if (!user) return null;
  const navItems = navConfig[user.role] || [];
  const rt = roleTheme[user.role] || roleTheme.admin;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="sidebar" style={{ justifyContent:'space-between' }}>
      <div>
        {/* Logo */}
        <div style={{ padding:'18px 16px 14px', borderBottom:'1px solid var(--border)' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:32, height:32, background:'linear-gradient(135deg, var(--primary-deep), var(--primary-light))', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 3px 10px var(--primary-glow)', flexShrink:0 }}>
                <Leaf size={15} color="white" />
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:800, fontFamily:'Poppins', lineHeight:1 }} className="gradient-text">AaharSetu</div>
                <div style={{ fontSize:9, color:'var(--text-muted)', fontWeight:500, marginTop:2, letterSpacing:0.3 }}>Bridging Food to Lives</div>
              </div>
            </div>
            {/* Theme toggle in sidebar */}
            <button className="theme-toggle" onClick={toggle} title={isDark?'Light mode':'Dark mode'} style={{ width:32, height:32, borderRadius:8, flexShrink:0 }}>
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Profile card */}
          <div style={{ background:`${rt.color}08`, border:`1px solid ${rt.color}20`, borderRadius:12, padding:'11px 12px', display:'flex', alignItems:'center', gap:9 }}>
            <div style={{ width:34, height:34, borderRadius:'50%', background:`${rt.color}14`, border:`2px solid ${rt.color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }}>
              {rt.emoji}
            </div>
            <div style={{ overflow:'hidden', minWidth:0 }}>
              <div style={{ fontSize:12.5, fontWeight:700, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color:'var(--text)' }}>{user.name}</div>
              <div style={{ fontSize:11, color:rt.color, fontWeight:600, marginTop:1 }}>{rt.label}</div>
            </div>
          </div>
        </div>

        {/* Notification pill */}
        <div style={{ margin:'10px 10px 4px', background:'var(--primary-glow)', border:'1px solid var(--border-accent)', borderRadius:10, padding:'8px 11px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', transition:'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background='var(--border-accent)'}
          onMouseLeave={e => e.currentTarget.style.background='var(--primary-glow)'}>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.5, color:'var(--text-dim)' }}>
            <Bell size={12} color="var(--primary)" />
            <span>3 new notifications</span>
          </div>
          <div style={{ width:18, height:18, borderRadius:'50%', background:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'white' }}>3</div>
        </div>

        {/* Nav section label */}
        <div style={{ padding:'12px 14px 5px' }}>
          <span style={{ fontSize:9.5, fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:1 }}>Navigation</span>
        </div>

        {/* Nav items */}
        <nav style={{ padding:'0 8px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.end}
                className={({isActive}) => `nav-item${isActive ? ' active' : ''}`}>
                <Icon size={16} />
                <span style={{ flex:1 }}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div style={{ padding:'10px 8px 16px', borderTop:'1px solid var(--border)' }}>
        {/* Today's impact */}
        <div style={{ background:'var(--bg-card2)', border:'1px solid var(--border)', borderRadius:12, padding:'12px 13px', margin:'0 0 8px', fontSize:12 }}>
          <div style={{ color:'var(--text-muted)', fontWeight:600, marginBottom:7, fontSize:9.5, textTransform:'uppercase', letterSpacing:0.5 }}>📊 Today's Impact</div>
          <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text-dim)', marginBottom:4 }}>
            <span>Meals saved</span>
            <span style={{ color:'var(--primary)', fontWeight:700 }}>420</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text-dim)' }}>
            <span>Active pickups</span>
            <span style={{ color:'#2563eb', fontWeight:700 }}>7</span>
          </div>
        </div>

        <button onClick={handleLogout} className="nav-item" style={{ width:'100%', background:'none', border:'none', color:'#dc2626', fontSize:13.5 }}>
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
