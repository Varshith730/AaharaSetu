import { mockVolunteers } from '../../data/mockData';
import { Trophy, Medal } from 'lucide-react';

const RANK_STYLES = {
  1: { bg: 'rgba(255,215,0,0.1)', border: 'rgba(255,215,0,0.3)', color: '#FFD700', label: '🥇' },
  2: { bg: 'rgba(192,192,192,0.1)', border: 'rgba(192,192,192,0.3)', color: '#C0C0C0', label: '🥈' },
  3: { bg: 'rgba(205,127,50,0.1)', border: 'rgba(205,127,50,0.3)', color: '#CD7F32', label: '🥉' },
};

export default function Leaderboard() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Volunteer Leaderboard</h1>
          <p className="page-subtitle">Top volunteers making the biggest impact</p>
        </div>
      </div>

      {/* Top 3 podium */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
        {mockVolunteers.slice(0, 3).map(v => {
          const rs = RANK_STYLES[v.rank] ?? {};
          return (
            <div key={v.id} className="card" style={{ textAlign: 'center', border: `1px solid ${rs.border}`, background: rs.bg, padding: '24px 16px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{rs.label}</div>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, margin: '0 auto 10px', color: rs.color }}>
                {v.name[0]}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{v.name}</div>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Poppins', color: rs.color, margin: '6px 0' }}>{v.points}</div>
              <div style={{ fontSize: 12, color: '#8B8FA8' }}>pts • {v.deliveries} deliveries</div>
            </div>
          );
        })}
      </div>

      {/* All rankings */}
      <div className="card">
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Full Rankings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockVolunteers.map(v => (
            <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
              <div style={{ fontSize: 18, width: 28, textAlign: 'center', fontWeight: 800, color: RANK_STYLES[v.rank]?.color ?? '#8B8FA8' }}>
                {RANK_STYLES[v.rank]?.label ?? `#${v.rank}`}
              </div>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(82,183,136,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                {v.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{v.name}</div>
                <div style={{ fontSize: 12, color: '#8B8FA8' }}>{v.deliveries} deliveries completed</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="points-badge">{v.points} pts</span>
                <div style={{ marginTop: 4 }}>
                  <span className={`badge ${v.status === 'online' ? 'badge-green' : 'badge-red'}`} style={{ fontSize: 10 }}>{v.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
