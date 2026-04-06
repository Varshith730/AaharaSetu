import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Gift, Coins, Award, Ticket, Star, ChevronRight } from 'lucide-react';

const rewardsCatalog = [
  { id: 'cash1', type: 'cash',  title: '₹50 Cash Reward', cost: 100, icon: Coins, color: '#10B981', desc: 'Convert points directly to your wallet balance.' },
  { id: 'cash2', type: 'cash',  title: '₹120 Cash Reward', cost: 200, icon: Coins, color: '#10B981', desc: 'Bonus ₹20 for saving up!' },
  { id: 'food1', type: 'food',  title: 'Swiggy ₹100 Voucher', cost: 150, icon: Ticket, color: '#F97316', desc: 'Valid on orders above ₹300' },
  { id: 'food2', type: 'food',  title: 'Zomato ₹250 Voucher', cost: 350, icon: Ticket, color: '#EF4444', desc: 'Valid on orders above ₹800' },
  { id: 'cert1', type: 'cert',  title: '"Community Hero" Certificate', cost: 500, icon: Award, color: '#8B5CF6', desc: 'Official Gov-verified certificate for 50+ deliveries.' }
];

export default function Rewards() {
  const { user, fetchProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRedeem = async (reward) => {
    if (!user || user.reward_points < reward.cost) return;
    setLoading(true);
    setSuccess('');
    setErrorMsg('');

    try {
      // Deduct points and add to wallet if cash
      let newBalance = user.wallet_balance || 0;
      if (reward.type === 'cash') {
        const cashValue = reward.id === 'cash1' ? 50 : 120;
        newBalance += cashValue;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          reward_points: user.reward_points - reward.cost,
          wallet_balance: newBalance 
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Log transaction
      const { error: txError } = await supabase
        .from('reward_transactions')
        .insert({
          volunteer_id: user.id,
          reward_type: reward.type,
          points_deducted: reward.cost,
          value_credited: reward.type === 'cash' ? (reward.id === 'cash1' ? 50 : 120) : 0
        });

      if (txError) throw txError;

      setSuccess(`Successfully redeemed ${reward.title}!`);
      // Refresh user profile points
      await fetchProfile(user.id);
      
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(''), 4000);
    }
  };

  const points = user?.reward_points || 0;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Rewards Market</h1>
          <p className="page-subtitle">Exchange your hard-earned points for rewards</p>
        </div>
        <div style={{ display:'flex', gap:12 }}>
          <div style={{ background:'rgba(244,162,97,0.1)', border:'1px solid #F4A261', borderRadius:12, padding:'10px 16px', display:'flex', alignItems:'center', gap:8 }}>
            <Star color="#F4A261" size={16} />
            <div>
              <div style={{ fontSize:10, color:'#F4A261', textTransform:'uppercase', fontWeight:700 }}>Available Points</div>
              <div style={{ fontSize:15, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{points}</div>
            </div>
          </div>
          <div style={{ background:'rgba(82,183,136,0.1)', border:'1px solid #52B788', borderRadius:12, padding:'10px 16px', display:'flex', alignItems:'center', gap:8 }}>
            <Coins color="#52B788" size={16} />
            <div>
              <div style={{ fontSize:10, color:'#52B788', textTransform:'uppercase', fontWeight:700 }}>Wallet Balance</div>
              <div style={{ fontSize:15, fontWeight:800, color:'var(--text)', lineHeight:1 }}>₹{user?.wallet_balance || '0.00'}</div>
            </div>
          </div>
        </div>
      </div>

      {success && <div style={{ background:'rgba(16,185,129,0.1)', color:'#10B981', padding:16, borderRadius:12, marginBottom:24, border:'1px solid rgba(16,185,129,0.2)' }}>{success}</div>}
      {errorMsg && <div style={{ background:'rgba(239,68,68,0.1)', color:'#EF4444', padding:16, borderRadius:12, marginBottom:24, border:'1px solid rgba(239,68,68,0.2)' }}>{errorMsg}</div>}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:20 }}>
        {rewardsCatalog.map(r => {
          const Icon = r.icon;
          const canAfford = points >= r.cost;
          return (
            <div key={r.id} className="card" style={{ display:'flex', flexDirection:'column' }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:`${r.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={22} color={r.color} />
                </div>
                <div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{r.title}</h3>
                  <div style={{ fontSize:12, color:'var(--text-muted)' }}>{r.desc}</div>
                </div>
              </div>
              
              <div style={{ marginTop:'auto', display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid var(--border)', paddingTop:16 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <Star size={14} color={canAfford ? "#F4A261" : "var(--text-muted)"} />
                  <span style={{ fontSize:15, fontWeight:800, color: canAfford ? 'var(--text)' : 'var(--text-muted)' }}>{r.cost} pts</span>
                </div>
                <button 
                  onClick={() => handleRedeem(r)} 
                  disabled={!canAfford || loading}
                  className="btn btn-sm" 
                  style={{ background: canAfford ? r.color : 'var(--bg-card2)', color: canAfford ? 'white' : 'var(--text-muted)', border:'none', opacity: canAfford ? 1 : 0.5 }}>
                  {loading ? 'Processing...' : 'Redeem'} <ChevronRight size={14} style={{ marginLeft:4 }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
