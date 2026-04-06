import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import NgoHome from './NgoHome';
import NearbyDonations from './NearbyDonations';
import IncomingDeliveries from './IncomingDeliveries';
import EmergencyRequest from './EmergencyRequest';
import DistributionRecords from './DistributionRecords';

export default function NgoDashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route index element={<NgoHome />} />
          <Route path="nearby" element={<NearbyDonations />} />
          <Route path="deliveries" element={<IncomingDeliveries />} />
          <Route path="emergency" element={<EmergencyRequest />} />
          <Route path="records" element={<DistributionRecords />} />
        </Routes>
      </div>
    </div>
  );
}
