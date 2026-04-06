import { useState } from 'react';
import { mockDeliveries, getStatusBadge } from '../../data/mockData';
import { Truck, MapPin, Check, Package } from 'lucide-react';

const STATUS_ACTIONS = {
  assigned: { label: 'Mark as Picked Up', next: 'picked' },
  picked: { label: 'Mark In Transit', next: 'in_transit' },
  in_transit: { label: 'Mark as Delivered', next: 'delivered' },
};

export default function AssignedTasks() {
  const [tasks, setTasks] = useState(mockDeliveries);

  const advance = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const next = STATUS_ACTIONS[t.status]?.next;
      return next ? { ...t, status: next } : t;
    }));
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Tasks</h1>
          <p className="page-subtitle">Your assigned delivery tasks</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tasks.map(task => {
          const sb = getStatusBadge(task.status);
          const action = STATUS_ACTIONS[task.status];
          const isDone = task.status === 'delivered';

          return (
            <div key={task.id} className="card" style={{ opacity: isDone ? 0.7 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{task.food_name}</h3>
                  <div style={{ color: '#8B8FA8', fontSize: 13, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Package size={13} /> {task.quantity} meals
                  </div>
                </div>
                <span className={`badge ${sb.class}`}>{sb.label}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: 'rgba(244,162,97,0.08)', border: '1px solid rgba(244,162,97,0.2)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: '#F4A261', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>📍 Pickup</div>
                  <div style={{ fontSize: 13 }}>{task.pickup_address}</div>
                </div>
                <div style={{ background: 'rgba(82,183,136,0.08)', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: '#52B788', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>🏁 Drop</div>
                  <div style={{ fontSize: 13 }}>{task.drop_address}</div>
                </div>
              </div>

              {isDone ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#52B788', fontWeight: 600 }}>
                  <Check size={16} /> Delivered Successfully! +10 points earned
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10 }}>
                  {action && (
                    <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => advance(task.id)}>
                      <Truck size={16} /> {action.label}
                    </button>
                  )}
                  <button className="btn btn-secondary">
                    <MapPin size={16} /> Navigate
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
