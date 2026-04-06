import { CheckCircle, Circle, Clock } from 'lucide-react';

const STEPS = ['Pending', 'Accepted', 'Picked Up', 'Delivered'];
const STATUS_INDEX = { pending: 0, accepted: 1, picked: 2, delivered: 3 };

export default function StatusTracker({ status }) {
  const currentStep = STATUS_INDEX[status] ?? 0;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0', width: '100%' }}>
      {STEPS.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;

        return (
          <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            {/* Connector line */}
            {i > 0 && (
              <div style={{ position: 'absolute', top: 14, left: '-50%', width: '100%', height: 2,
                background: done ? 'linear-gradient(90deg, #2D6A4F, #52B788)' : 'rgba(255,255,255,0.1)' }} />
            )}

            {/* Dot */}
            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, marginBottom: 6,
              background: done ? 'linear-gradient(135deg, #2D6A4F, #52B788)' : active ? 'rgba(82,183,136,0.15)' : 'rgba(255,255,255,0.06)',
              border: active ? '2px solid #52B788' : done ? 'none' : '2px solid rgba(255,255,255,0.15)' }}>
              {done ? <CheckCircle size={14} color="white" /> : active ? <Clock size={12} color="#52B788" /> : <Circle size={12} color="rgba(255,255,255,0.3)" />}
            </div>

            {/* Label */}
            <span style={{ fontSize: '10px', fontWeight: active ? 700 : 500, color: done ? '#52B788' : active ? '#52B788' : '#8B8FA8', textAlign: 'center', lineHeight: 1.3 }}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
