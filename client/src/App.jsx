import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import NgoDashboard from './pages/ngo/NgoDashboard';
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={`/${user.role}`} /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to={`/${user.role}`} /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={`/${user.role}`} /> : <Register />} />
      <Route path="/restaurant/*" element={
        <ProtectedRoute role="restaurant">
          <RestaurantDashboard />
        </ProtectedRoute>
      } />
      <Route path="/ngo/*" element={
        <ProtectedRoute role="ngo">
          <NgoDashboard />
        </ProtectedRoute>
      } />
      <Route path="/volunteer/*" element={
        <ProtectedRoute role="volunteer">
          <VolunteerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/*" element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
