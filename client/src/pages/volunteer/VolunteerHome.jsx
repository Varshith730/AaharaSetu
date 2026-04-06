import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import StatCard from '../../components/StatCard';
import { Truck, Star, CheckCircle, Zap, Coins } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { getStatusBadge } from '../../data/mockData'; // keep badge helper

export default function VolunteerHome() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(user?.is_online || false);
  const [activeTask, setActiveTask] = useState(null);
  const [deliveriesCount, setDeliveriesCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    
    const fetchStats = async () => {
      // Fetch active delivery
      const { data: dData } = await supabase
        .from('deliveries')
        .select('*, donations(food_name, quantity, pickup_time:prep_time, dropoff_time:expiry_time, lat, lng)')
        .eq('volunteer_id', user.id)
        .in('status', ['assigned', 'picked_up'])
        .single();
      
      if (dData) setActiveTask(dData);

      // Fetch delivery count
      const { count } = await supabase
        .from('deliveries')
        .select('*', { count: 'exact', head: true })
        .eq('volunteer_id', user.id)
        .eq('status', 'delivered');
        
      setDeliveriesCount(count || 0);
    };

    fetchStats();
  }, [user]);

  const toggleOnline = async (val) => {
    setIsOnline(val);
    await supabase.from('profiles').update({ is_online: val }).eq('id', user.id);
  };

  const points = user?.reward_points || 0;
  const levelTarget = points < 100 ? 100 : points < 500 ? 500 : 1000;
  const levelName = points < 100 ? 'Bronze' : points < 500 ? 'Silver' : 'Gold';
  const progressPercent = Math.min((points / levelTarget) * 100, 100);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Volunteer Dashboard</h1>
          <p className="page-subtitle">Ready to make a difference today?</p>
        </div>
        {/* Toggle only for Independent volunteers */}
        {user?.volunteer_type === 'independent' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px' }}>
            <label className="toggle">
              <input type="checkbox" checked={isOnline} onChange={e => toggleOnline(e.target.checked)} />
              <span className="toggle-slider" />
            </label>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: isOnline ? 'var(--primary)' : 'var(--text-muted)' }}>{isOnline ? '🟢 Online' : '⚫ Offline'}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{isOnline ? 'Evaluating tasks' : 'Not available'}</div>
            </div>
          </div>
        )}
        {user?.volunteer_type === 'ngo' && (
          <div className="badge badge-blue">
            NGO Member — Assigned to {user?.assigned_ngo_id ? 'Partner' : 'Network'}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid-5" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:20, marginBottom: 24 }}>
        <StatCard icon={Truck} iconColor="#A78BFA" iconBg="rgba(167,139,250,0.15)" label="Deliveries" value={deliveriesCount} />
        <StatCard icon={Star} iconColor="#F4A261" iconBg="rgba(244,162,97,0.15)" label="Points" value={points} />
        <StatCard icon={Coins} iconColor="#52B788" iconBg="rgba(82,183,136,0.15)" label="Wallet" value={`₹${user?.wallet_balance || 0}`} />
        <StatCard icon={Zap} iconColor="#E63946" iconBg="rgba(230,57,70,0.15)" label="Level" value={levelName} />
        <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:16, gap:8 }}>
          <RouterLink to="/volunteer/rewards" className="btn btn-sm btn-primary" style={{ width:'100%', justifyContent:'center' }}>Redeem Rewards</RouterLink>
        </div>
      </div>

      {/* Active Task */}
      {activeTask && (
        <div className="card" style={{ marginBottom: 20, border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#A78BFA', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>🔴 Active Task</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color:'var(--text)' }}>{activeTask.donations?.food_name || 'Food Delivery'}</h3>
              <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{activeTask.donations?.quantity || '-'} meals to deliver</div>
            </div>
            <span className={`badge ${getStatusBadge(activeTask.status).class}`}>{getStatusBadge(activeTask.status).label}</span>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <RouterLink to="/volunteer/map" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}><Truck size={16} /> Open Navigation</RouterLink>
            <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Mark Picked Up</button>
          </div>
        </div>
      )}

      {/* Points progress */}
      <div className="card" style={{ background:'var(--bg-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color:'var(--text)' }}>Journey to {levelTarget === 100 ? 'Silver' : levelTarget === 500 ? 'Gold' : 'Diamond'}</h3>
          <span className="badge badge-purple" style={{ padding:'6px 12px', fontSize:12 }}>Current: {levelName}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
          <span>{points} pts</span>
          <span>{levelTarget} pts remaining</span>
        </div>
        <div className="progress-bar" style={{ height:10, background:'var(--border)', borderRadius:5, overflow:'hidden' }}>
          <div className="progress-fill" style={{ width: `${progressPercent}%`, background:'linear-gradient(90deg, #F4A261, #E63946)', height:'100%', transition:'width 1s ease' }} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, display:'flex', alignItems:'center', gap:6 }}>
          <Star size={12} color="#F4A261" /> Every successful delivery grants +10 points!
        </div>
      </div>
    </div>
  );
}
