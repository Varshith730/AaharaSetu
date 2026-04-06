import { useState, useEffect } from 'react';
import { Activity, UtensilsCrossed, Truck, HandHeart, AlertTriangle, CheckCircle } from 'lucide-react';

const EVENT_TYPES = {
  donation: { icon: UtensilsCrossed, color: '#F4A261', bg: 'rgba(244,162,97,0.12)' },
  delivery: { icon: Truck, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
  accepted: { icon: HandHeart, color: '#60A5FA', bg: 'rgba(96,165,250,0.12)' },
  emergency: { icon: AlertTriangle, color: '#E63946', bg: 'rgba(230,57,70,0.12)' },
  delivered: { icon: CheckCircle, color: '#52B788', bg: 'rgba(82,183,136,0.12)' },
};

const INITIAL_EVENTS = [
  { id: 1, type: 'donation', message: 'Spice Garden posted 80 meals of Biryani', time: 'just now' },
  { id: 2, type: 'accepted', message: 'Feeding Hyderabad NGO accepted a donation', time: '2 min ago' },
  { id: 3, type: 'delivery', message: 'Volunteer Arjun Kumar assigned to delivery #DEL001', time: '5 min ago' },
  { id: 4, type: 'emergency', message: 'EMERGENCY: Roti Bank requested 100 meals urgently', time: '8 min ago' },
  { id: 5, type: 'delivered', message: 'Delivery #DEL002 completed — 60 meals distributed', time: '15 min ago' },
  { id: 6, type: 'donation', message: 'Paradise Hotel posted 120 meals of Pulao', time: '18 min ago' },
  { id: 7, type: 'accepted', message: 'CRY Foundation accepted donation from Ohri\'s Restaurant', time: '22 min ago' },
];

export default function ActivityMonitor() {
  const [events, setEvents] = useState(INITIAL_EVENTS);

  // Simulate live new events
  useEffect(() => {
    const types = ['donation', 'accepted', 'delivery', 'delivered'];
    const messages = [
      'New restaurant registered — Ulavacharu verified',
      'NGO Hunger Free Zone accepted a donation',
      'Volunteer Priya completed delivery #DEL005',
      'Hotel Golkonda posted 200 meals for distribution',
    ];
    let counter = 8;
    const interval = setInterval(() => {
      const t = types[Math.floor(Math.random() * types.length)];
      setEvents(prev => [{ id: counter++, type: t, message: messages[Math.floor(Math.random() * messages.length)], time: 'just now' }, ...prev.slice(0, 19)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Activity Monitor</h1>
          <p className="page-subtitle">Real-time platform event feed</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#52B788' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#52B788', display: 'inline-block', animation: 'pulse-red 1.5s infinite' }} /> Live
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {events.map(event => {
          const { icon: Icon, color, bg } = EVENT_TYPES[event.type] ?? EVENT_TYPES.donation;
          return (
            <div key={event.id} className="card-sm fade-in" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color={color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{event.message}</div>
              </div>
              <div style={{ fontSize: 12, color: '#8B8FA8', whiteSpace: 'nowrap' }}>{event.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
