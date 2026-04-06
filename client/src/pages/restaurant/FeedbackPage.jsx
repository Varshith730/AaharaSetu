import { mockFeedback } from '../../data/mockData';
import { Star } from 'lucide-react';

export default function FeedbackPage() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Feedback & Ratings</h1>
          <p className="page-subtitle">What NGOs say about your donations</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
        {/* Score summary */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52, fontWeight: 800, fontFamily: 'Poppins', background: 'linear-gradient(135deg, #F4A261, #52B788)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4.8</div>
          <div style={{ color: '#F4A261', fontSize: 20, margin: '4px 0' }}>★★★★★</div>
          <div style={{ color: '#8B8FA8', fontSize: 12 }}>Based on {mockFeedback.length} reviews</div>
        </div>

        {/* Feedback list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mockFeedback.map(f => (
            <div key={f.id} className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{f.from}</span>
                  <span style={{ color: '#8B8FA8', fontSize: 12, marginLeft: 8 }}>on {f.donation}</span>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= f.rating ? '#F4A261' : 'none'} color={s <= f.rating ? '#F4A261' : '#8B8FA8'} />)}
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#8B8FA8' }}>{f.comment}</p>
              <div style={{ fontSize: 11, color: '#8B8FA8', marginTop: 6 }}>{f.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
