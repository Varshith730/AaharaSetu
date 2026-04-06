import { useState } from 'react';
import { mockUsers, getStatusBadge } from '../../data/mockData';
import { Check, X, Search, UserCheck, Users } from 'lucide-react';

const ROLE_FILTERS = ['All', 'restaurant', 'ngo', 'volunteer'];

export default function UserManagement() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const filtered = users.filter(u => {
    const matchRole = filter === 'All' || u.role === filter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const approve = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  const reject = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'rejected' } : u));

  const pending = users.filter(u => u.status === 'pending').length;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Approve registrations and manage accounts</p>
        </div>
        {pending > 0 && (
          <div style={{ background: 'rgba(244,162,97,0.12)', border: '1px solid rgba(244,162,97,0.3)', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserCheck size={16} color="#F4A261" />
            <span style={{ fontSize: 13, color: '#F4A261', fontWeight: 600 }}>{pending} pending approval</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#8B8FA8' }} />
          <input className="form-input" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {ROLE_FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '7px 14px', borderRadius: 20, border: '1px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filter === f ? 'rgba(82,183,136,0.15)' : 'rgba(255,255,255,0.05)', borderColor: filter === f ? '#52B788' : 'rgba(255,255,255,0.1)', color: filter === f ? '#52B788' : '#8B8FA8', textTransform: 'capitalize' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const sb = getStatusBadge(u.status);
              return (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(82,183,136,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                        {u.name[0]}
                      </div>
                      <span style={{ fontWeight: 600 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: '#8B8FA8' }}>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'restaurant' ? 'badge-orange' : u.role === 'ngo' ? 'badge-blue' : 'badge-purple'}`} style={{ textTransform: 'capitalize' }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ color: '#8B8FA8', fontSize: 13 }}>{u.created_at}</td>
                  <td><span className={`badge ${sb.class}`}>{sb.label}</span></td>
                  <td>
                    {u.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => approve(u.id)}><Check size={12} /> Approve</button>
                        <button className="btn btn-danger btn-sm" onClick={() => reject(u.id)}><X size={12} /> Reject</button>
                      </div>
                    ) : (
                      <button className="btn btn-secondary btn-sm">View</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
