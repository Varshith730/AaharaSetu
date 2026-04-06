import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import AdminHome from './AdminHome';
import UserManagement from './UserManagement';
import ActivityMonitor from './ActivityMonitor';
import Reports from './Reports';

export default function AdminDashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="activity" element={<ActivityMonitor />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}
