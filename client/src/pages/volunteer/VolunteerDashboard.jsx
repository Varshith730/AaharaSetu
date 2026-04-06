import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import VolunteerHome from './VolunteerHome';
import AssignedTasks from './AssignedTasks';
import DeliveryMap from './DeliveryMap';
import Leaderboard from './Leaderboard';

import Rewards from './Rewards';

export default function VolunteerDashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route index element={<VolunteerHome />} />
          <Route path="tasks" element={<AssignedTasks />} />
          <Route path="map" element={<DeliveryMap />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="rewards" element={<Rewards />} />
        </Routes>
      </div>
    </div>
  );
}
