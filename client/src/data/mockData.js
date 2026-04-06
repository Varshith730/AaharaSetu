// Mock data for frontend demo — replace with Supabase calls later

export const mockUser = {
  restaurant: { id: '1', name: 'Spice Garden Restaurant', email: 'spice@example.com', role: 'restaurant', avatar: null, address: 'Banjara Hills, Hyderabad', status: 'approved' },
  ngo: { id: '2', name: 'Feeding Hyderabad NGO', email: 'ngo@example.com', role: 'ngo', avatar: null, address: 'Jubilee Hills, Hyderabad', status: 'approved' },
  volunteer: { id: '3', name: 'Arjun Kumar', email: 'arjun@example.com', role: 'volunteer', avatar: null, reward_points: 240, status: 'approved', volunteer_type: 'independent' },
  admin: { id: '4', name: 'Admin User', email: 'admin@example.com', role: 'admin', avatar: null, status: 'approved' },
};

export const mockDonations = [
  { id: 'd1', food_name: 'Biryani & Curry (Surplus)', food_type: 'non-veg', quantity: 80, prep_time: new Date(Date.now() - 3600000).toISOString(), expiry_time: new Date(Date.now() + 10800000).toISOString(), status: 'accepted', donor_name: 'Spice Garden Restaurant', ngo_name: 'Feeding Hyderabad', lat: 17.43, lng: 78.44, notes: 'Freshly cooked wedding leftovers' },
  { id: 'd2', food_name: 'Pulao & Dal', food_type: 'veg', quantity: 120, prep_time: new Date(Date.now() - 1800000).toISOString(), expiry_time: new Date(Date.now() + 14400000).toISOString(), status: 'pending', donor_name: 'Paradise Hotel', ngo_name: null, lat: 17.45, lng: 78.47, notes: 'Large event surplus' },
  { id: 'd3', food_name: 'Chapati & Sabzi', food_type: 'veg', quantity: 60, prep_time: new Date(Date.now() - 7200000).toISOString(), expiry_time: new Date(Date.now() + 3600000).toISOString(), status: 'delivered', donor_name: 'Ohri\'s Restaurant', ngo_name: 'CRY Foundation', lat: 17.41, lng: 78.42, notes: '' },
  { id: 'd4', food_name: 'Rice & Sambar', food_type: 'veg', quantity: 200, prep_time: new Date(Date.now() - 5400000).toISOString(), expiry_time: new Date(Date.now() + 7200000).toISOString(), status: 'picked_up', donor_name: 'Hotel Taj Deccan', ngo_name: 'Roti Bank', lat: 17.44, lng: 78.48, notes: 'Daily lunch surplus' },
  { id: 'd5', food_name: 'Sweets & Snacks', food_type: 'veg', quantity: 45, prep_time: new Date(Date.now() - 900000).toISOString(), expiry_time: new Date(Date.now() + 18000000).toISOString(), status: 'pending', donor_name: 'Chutneys', ngo_name: null, lat: 17.46, lng: 78.45, notes: 'Festival sweets remaining' },
];

export const mockDeliveries = [
  { id: 'del1', donation_id: 'd1', volunteer_name: 'Arjun Kumar', status: 'in_transit', pickup_address: 'Spice Garden, Banjara Hills', drop_address: 'Feeding Hyderabad NGO, Jubilee Hills', food_name: 'Biryani & Curry (Surplus)', quantity: 80, picked_at: new Date(Date.now() - 1800000).toISOString() },
  { id: 'del2', donation_id: 'd4', volunteer_name: 'Priya Sharma', status: 'assigned', pickup_address: 'Hotel Taj Deccan, Secunderabad', drop_address: 'Roti Bank, Begumpet', food_name: 'Rice & Sambar', quantity: 200, picked_at: null },
];

export const mockVolunteers = [
  { id: 'v1', name: 'Arjun Kumar', status: 'online', deliveries: 48, points: 480, rank: 1 },
  { id: 'v2', name: 'Priya Sharma', status: 'online', deliveries: 35, points: 350, rank: 2 },
  { id: 'v3', name: 'Mohammed Rafi', status: 'offline', deliveries: 29, points: 290, rank: 3 },
  { id: 'v4', name: 'Sneha Reddy', status: 'online', deliveries: 24, points: 240, rank: 4 },
  { id: 'v5', name: 'Karthik Naidu', status: 'offline', deliveries: 18, points: 180, rank: 5 },
];

export const mockUsers = [
  { id: '1', name: 'Spice Garden Restaurant', email: 'spice@example.com', role: 'restaurant', status: 'approved', created_at: '2026-04-01' },
  { id: '2', name: 'Feeding Hyderabad NGO', email: 'feeding@example.com', role: 'ngo', status: 'approved', created_at: '2026-04-01' },
  { id: '3', name: 'Arjun Kumar', email: 'arjun@example.com', role: 'volunteer', status: 'approved', created_at: '2026-04-02' },
];
export const mockAnalytics = {
  totalMealsSaved: 14820,
  activeUsers: 87,
  donationsToday: 23,
  wasteReduced: '2.4 tons',
  weeklyData: [],
  foodTypes: [],
  areaData: [],
};
export const mockNotifications = [
  { id: 'n1', type: 'donation', message: 'Your donation of Biryani was accepted by Feeding Hyderabad', time: '5 mins ago', read: false },
  { id: 'n2', type: 'delivery', message: 'Volunteer Arjun picked up your donation', time: '1 hour ago', read: false },
  { id: 'n3', type: 'delivered', message: 'Food delivered successfully to 80 people!', time: '3 hours ago', read: true },
];
export const mockFeedback = [
  { id: 'f1', from: 'Feeding Hyderabad NGO', rating: 5, comment: 'Excellent quality food, arrived on time!', donation: 'Biryani & Curry', date: '2026-04-05' },
  { id: 'f2', from: 'Roti Bank', rating: 4, comment: 'Good quantity, packaging could be better', donation: 'Rice & Sambar', date: '2026-04-04' },
];

// Freshness calculator
export function getFreshness(expiryTime) {
  const now = new Date();
  const expiry = new Date(expiryTime);
  const diffMs = expiry - now;
  const diffMins = diffMs / 60000;
  if (diffMins > 90) return { label: 'Safe', color: 'safe', class: 'freshness-safe badge-green' };
  if (diffMins > 30) return { label: 'Warning', color: 'warning', class: 'freshness-warning badge-yellow' };
  return { label: 'Expired', color: 'expired', class: 'freshness-expired badge-red' };
}

export function getStatusBadge(status) {
  const map = {
    pending: { label: 'Pending', class: 'badge-yellow' },
    accepted: { label: 'Accepted', class: 'badge-blue' },
    picked: { label: 'Picked Up', class: 'badge-purple' },
    in_transit: { label: 'In Transit', class: 'badge-orange' },
    delivered: { label: 'Delivered', class: 'badge-green' },
    expired: { label: 'Expired', class: 'badge-red' },
    approved: { label: 'Approved', class: 'badge-green' },
    rejected: { label: 'Rejected', class: 'badge-red' },
    open: { label: 'Open', class: 'badge-yellow' },
    fulfilled: { label: 'Fulfilled', class: 'badge-green' },
    assigned: { label: 'Assigned', class: 'badge-blue' },
    online: { label: 'Online', class: 'badge-green' },
    offline: { label: 'Offline', class: 'badge-red' },
  };
  return map[status] || { label: status, class: 'badge-blue' };
}
