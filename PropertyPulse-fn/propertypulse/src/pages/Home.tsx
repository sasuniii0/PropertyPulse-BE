import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// SVG Icons
const PulseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 16L8 8L12 20L16 12L20 18L24 10L28 16" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const HomeIconSmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export default function Home() {
  // Mock user data - replace with actual authentication
  const { user, setUser } = useAuth();
  console.log(user)

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  // Client Dashboard Functions
  const ClientDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h2>
          <p className="text-gray-500 mt-1">Find your dream property today</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <LogoutIcon />
          Logout
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <SearchIcon />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Search Properties</h3>
          <p className="text-sm text-gray-500">Browse all available listings</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <HeartIcon />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Saved Properties</h3>
          <p className="text-sm text-gray-500">View your favorites</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <UserIcon />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">My Profile</h3>
          <p className="text-sm text-gray-500">Update your details</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <HomeIconSmall />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">My Inquiries</h3>
          <p className="text-sm text-gray-500">Track your requests</p>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recently Viewed Properties</h3>
        <div className="text-gray-500 text-center py-8">
          No recently viewed properties yet. Start browsing!
        </div>
      </div>
    </div>
  );

  // Agent Dashboard Functions
  const AgentDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Agent Dashboard</h2>
          <p className="text-gray-500 mt-1">Manage your property listings</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <LogoutIcon />
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-6 rounded-xl shadow-lg text-white">
          <div className="text-3xl font-bold">12</div>
          <div className="text-teal-100 mt-1">Active Listings</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
          <div className="text-3xl font-bold">28</div>
          <div className="text-blue-100 mt-1">Total Views</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
          <div className="text-3xl font-bold">5</div>
          <div className="text-purple-100 mt-1">Inquiries</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white">
          <div className="text-3xl font-bold">3</div>
          <div className="text-orange-100 mt-1">Sold This Month</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-all">
            <PlusIcon />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Create New Listing</h3>
          <p className="text-sm text-gray-500">Add a new property</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-all">
            <EditIcon />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Manage Listings</h3>
          <p className="text-sm text-gray-500">Edit or remove properties</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-all">
            <ChartIcon />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">View Analytics</h3>
          <p className="text-sm text-gray-500">Track performance</p>
        </div>
      </div>

      {/* My Listings */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">My Active Listings</h3>
          <button className="text-teal-600 text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="text-gray-500 text-center py-8">
          Your property listings will appear here
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PulseIcon />
            <span className="font-bold text-xl text-gray-800">PropertyPulse</span>
          </div>
          
          {/* Role Toggle (for demo purposes - remove in production) */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Demo Mode:</span>
            <button
              onClick={() => setUser(user.role === 'client' ? 'agent' : 'client')}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-all"
            >
              Switch to {user.role === 'client' ? 'Agent' : 'Client'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {user.role === 'client' ? <ClientDashboard /> : <AgentDashboard />}
      </main>
    </div>
  );
}