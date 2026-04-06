import { getFreshness } from '../data/mockData';
import { Clock, Leaf, Drumstick } from 'lucide-react';

export default function FreshnessBadge({ expiryTime, foodType, showTime = true }) {
  const freshness = getFreshness(expiryTime);
  const now = new Date();
  const expiry = new Date(expiryTime);
  const diffMins = Math.max(0, Math.floor((expiry - now) / 60000));
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  const timeStr = hours > 0 ? `${hours}h ${mins}m left` : `${mins}m left`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <span className={`badge ${freshness.class}`} style={{ fontSize: '11px' }}>
        ● {freshness.label}
      </span>
      {foodType && (
        <span className={`badge ${foodType === 'veg' ? 'badge-green' : 'badge-orange'}`} style={{ fontSize: '11px' }}>
          {foodType === 'veg' ? <Leaf size={10} /> : <Drumstick size={10} />}
          {foodType === 'veg' ? 'Veg' : 'Non-Veg'}
        </span>
      )}
      {showTime && diffMins > 0 && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#8B8FA8' }}>
          <Clock size={10} /> {timeStr}
        </span>
      )}
    </div>
  );
}
