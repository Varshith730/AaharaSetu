import { useState } from 'react';
import { mockDonations, getStatusBadge } from '../../data/mockData';
import FreshnessBadge from '../../components/FreshnessBadge';
import { Search, Filter } from 'lucide-react';

const FILTERS = ['All', 'Pending', 'Accepted', 'Picked', 'Delivered', 'Expired'];

export default function DonationHistory() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = mockDonations.filter(d => {
    const matchFilter = filter === 'All' || d.status === filter.toLowerCase();
    const matchSearch = d.food_name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Donation History</h1>
          <p className="page-subtitle">All your past and active food donations</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#8B8FA8' }} />
          <input className="form-input" placeholder="Search donations..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: filter === f ? 'rgba(82,183,136,0.15)' : 'rgba(255,255,255,0.05)',
                borderColor: filter === f ? '#52B788' : 'rgba(255,255,255,0.1)',
                color: filter === f ? '#52B788' : '#8B8FA8' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Freshness</th>
              <th>NGO / Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => {
              const sb = getStatusBadge(d.status);
              return (
                <tr key={d.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{d.food_name}</div>
                    {d.notes && <div style={{ fontSize: 11, color: '#8B8FA8', marginTop: 2 }}>{d.notes}</div>}
                  </td>
                  <td>
                    <span className={`badge ${d.food_type === 'veg' ? 'badge-green' : 'badge-orange'}`}>
                      {d.food_type === 'veg' ? '🌿 Veg' : '🍗 Non-Veg'}
                    </span>
                  </td>
                  <td><span style={{ fontWeight: 600 }}>{d.quantity}</span> meals</td>
                  <td><FreshnessBadge expiryTime={d.expiry_time} showTime={false} /></td>
                  <td>
                    {d.ngo_name ? <span style={{ color: '#60A5FA', fontSize: 13 }}>{d.ngo_name}</span>
                      : <span style={{ color: '#8B8FA8', fontSize: 13 }}>Awaiting NGO</span>}
                  </td>
                  <td><span className={`badge ${sb.class}`}>{sb.label}</span></td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#8B8FA8' }}>No donations found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
