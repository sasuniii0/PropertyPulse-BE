import { useAuth } from "../context/AuthContext";
import { useState } from "react";

// SVG Icons
const PulseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 16L8 8L12 20L16 12L20 18L24 10L28 16" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const HomeIconSmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
  </svg>
);

const BathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <line x1="10" x2="8" y1="5" y2="7" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <line x1="7" x2="7" y1="19" y2="21" />
    <line x1="17" x2="17" y1="19" y2="21" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function Home() {
  const { user, loading, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  // Mock properties data
  const properties = [
    {
      id: 1,
      name: 'Cinnamon Gardens Villa',
      price: '85,000,000',
      address: 'Colombo 7, Western Province',
      beds: 4,
      baths: 3,
      img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Nuwara Eliya Hill Plot',
      price: '18,500,000',
      address: 'Nuwara Eliya, Central Province',
      beds: 3,
      baths: 2,
      img: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Marine Drive Luxury Suite',
      price: '95,000,000',
      address: 'Colombo 4, Western Province',
      beds: 4,
      baths: 3,
      img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'
    },
  ];

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-gray-700 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-gray-700 text-xl font-semibold">
        Unauthorized — please log in.
      </div>
    );
  }

  // CLIENT DASHBOARD
  if (user.role === "CLIENT") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PulseIcon />
              <span className="font-bold text-xl text-gray-800">PropertyPulse</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, <strong>{user.name}</strong></span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
              >
                <LogoutIcon /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500 mt-1">Find your dream property today</p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4">
            <ActionCard icon={<SearchIcon />} title="Search Properties" desc="Browse all listings" color="bg-teal-100" />
            <ActionCard icon={<HeartIcon />} title="Saved Properties" desc="View your favorites" color="bg-red-100" />
            <ActionCard icon={<UserIcon />} title="My Profile" desc="Update your details" color="bg-blue-100" />
            <ActionCard icon={<HomeIconSmall />} title="My Inquiries" desc="Track your requests" color="bg-purple-100" />
          </div>

          {/* Available Properties */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Available Properties</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {properties.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer group border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                      <MapPinIcon />
                      {p.address}
                    </div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">{p.name}</h3>
                        <p className="text-teal-600 font-bold text-lg mt-1">LKR {p.price}</p>
                      </div>
                      <div className="flex gap-3 text-gray-500 text-sm">
                        <span className="flex items-center gap-1"><BedIcon /> {p.beds}</span>
                        <span className="flex items-center gap-1"><BathIcon /> {p.baths}</span>
                      </div>
                    </div>
                    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition-all text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Overview */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <PulseIcon /> Market Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard label="Properties Available" value="452" />
              <StatCard label="Average Price" value="LKR 320M" />
              <StatCard label="New Listings This Week" value="38" />
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Recent Inquiries</h2>
            <div className="space-y-4">
              <InquiryCard name="Oceanview Apartment" date="2 days ago" />
              <InquiryCard name="Lakeside Villa" date="5 days ago" />
              <InquiryCard name="City Center Studio" date="1 week ago" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // AGENT DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PulseIcon />
            <span className="font-bold text-xl text-gray-800">PropertyPulse</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Agent: <strong>{user.name}</strong></span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
            >
              <LogoutIcon /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your property listings and track performance</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-6 rounded-xl shadow-lg text-white">
            <div className="text-3xl font-bold">12</div>
            <div className="text-teal-100 mt-1">Active Listings</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
            <div className="text-3xl font-bold">328</div>
            <div className="text-blue-100 mt-1">Total Views</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
            <div className="text-3xl font-bold">15</div>
            <div className="text-purple-100 mt-1">Inquiries</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white">
            <div className="text-3xl font-bold">3</div>
            <div className="text-orange-100 mt-1">Sold This Month</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <ActionCard icon={<PlusIcon />} title="Create New Listing" desc="Add a new property" color="bg-green-100" />
          <ActionCard icon={<EditIcon />} title="Manage Listings" desc="Edit or remove properties" color="bg-blue-100" />
          <ActionCard icon={<ChartIcon />} title="View Analytics" desc="Track performance" color="bg-orange-100" />
        </div>

        {/* My Active Listings */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Active Listings</h2>
            <button className="text-teal-600 text-sm font-medium hover:underline">View All</button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer group border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <MapPinIcon />
                    {p.address}
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{p.name}</h3>
                      <p className="text-teal-600 font-bold text-lg mt-1">LKR {p.price}</p>
                    </div>
                    <div className="flex gap-3 text-gray-500 text-sm">
                      <span className="flex items-center gap-1"><BedIcon /> {p.beds}</span>
                      <span className="flex items-center gap-1"><BathIcon /> {p.baths}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all text-sm font-medium">
                      Edit
                    </button>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityCard activity="New inquiry for Cinnamon Gardens Villa" time="2 hours ago" />
            <ActivityCard activity="Marine Drive Suite viewed 15 times" time="5 hours ago" />
            <ActivityCard activity="Nuwara Eliya Plot listing updated" time="1 day ago" />
          </div>
        </div>
      </main>
    </div>
  );
}

// REUSABLE COMPONENTS
const ActionCard = ({ icon, title, desc, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
    <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

const StatCard = ({ label, value }: any) => (
  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
    <p className="text-sm text-gray-500">{label}</p>
    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
  </div>
);

const InquiryCard = ({ name, date }: any) => (
  <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-all">
    <div>
      <h4 className="font-semibold text-gray-900">{name}</h4>
      <p className="text-sm text-gray-500">Inquired {date}</p>
    </div>
    <button className="text-sm font-medium text-teal-600 hover:underline">View</button>
  </div>
);

const ActivityCard = ({ activity, time }: any) => (
  <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-all">
    <div>
      <h4 className="font-semibold text-gray-900 text-sm">{activity}</h4>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);