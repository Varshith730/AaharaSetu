import { mockDonations } from '../../data/mockData';
import { ClipboardList, TrendingUp } from 'lucide-react';

const delivered = mockDonations.filter(d => d.status === 'delivered');
const totalMeals = delivered.reduce((sum, d) => sum + d.quantity, 0);

export default function DistributionRecords() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Distribution Records</h1>
          <p className="page-subtitle">History of all food collections and distributions</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Total Meals Distributed', value: totalMeals.toLocaleString(), color: '#52B788' },
          { label: 'Total Donations', value: String(delivered.length), color: '#60A5FA' },
          { label: 'Families Helped (est.)', value: String(Math.floor(totalMeals / 4)), color: '#A78BFA' },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Poppins', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#8B8FA8', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Donor</th>
              <th>Meals</th>
              <th>Food Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockDonations.map(d => (
              <tr key={d.id}>
                <td style={{ fontWeight: 600 }}>{d.food_name}</td>
                <td style={{ color: '#8B8FA8' }}>{d.donor_name}</td>
                <td><strong>{d.quantity}</strong></td>
                <td><span className={`badge ${d.food_type === 'veg' ? 'badge-green' : 'badge-orange'}`}>{d.food_type === 'veg' ? '🌿 Veg' : '🍗 Non-Veg'}</span></td>
                <td><span className={`badge ${d.status === 'delivered' ? 'badge-green' : 'badge-blue'}`}>{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
