import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ icon: Icon, iconColor, iconBg, label, value, change, changeType }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: iconBg }}>
        <Icon size={20} color={iconColor} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {change && (
        <div className={`stat-change ${changeType}`}>
          {changeType === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {change}
        </div>
      )}
    </div>
  );
}
