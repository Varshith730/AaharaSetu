import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import RestaurantHome from './RestaurantHome';
import AddDonation from './AddDonation';
import DonationHistory from './DonationHistory';
import TrackDonation from './TrackDonation';
import FeedbackPage from './FeedbackPage';

export default function RestaurantDashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route index element={<RestaurantHome />} />
          <Route path="donate" element={<AddDonation />} />
          <Route path="history" element={<DonationHistory />} />
          <Route path="track" element={<TrackDonation />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Routes>
      </div>
    </div>
  );
}
