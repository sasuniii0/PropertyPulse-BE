import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ActionCard from "../components/ActionCard";
import StatCard from "../components/StatCard";
import InquiryCard from "../components/InquiryCard";
import ActivityCard from "../components/ActivityCard";
import { PulseIcon,SearchIcon,HeartIcon,PlusIcon,HomeIconSmall,EditIcon,ChartIcon,UserIcon,BedIcon,BathIcon,MapPinIcon } from "../components/Icons";


export default function Home() {
  const { user, loading } = useAuth();

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

  const navigate = useNavigate()

  // CLIENT DASHBOARD
  if (user.role === "CLIENT") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500 mt-1">Find your dream property today</p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4">
            <ActionCard icon={<SearchIcon />} title="Search Properties" desc="Browse all listings" color="bg-teal-100" onClick={() => navigate("/search")} />
            <ActionCard icon={<HeartIcon />} title="Saved Properties" desc="View your favorites" color="bg-red-100" onClick={() => navigate("/favourites")}/>
            <ActionCard icon={<UserIcon />} title="My Profile" desc="Update your details" color="bg-blue-100" onClick={() => navigate("/editme")}/>
            <ActionCard icon={<HomeIconSmall />} title="My Inquiries" desc="Track your requests" color="bg-purple-100" onClick={() => navigate("/inquaries")}/>
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
          <ActionCard icon={<PlusIcon />} title="Create New Listing" desc="Add a new property" color="bg-green-100" onClick={() => navigate("/createListnings")}/>
          <ActionCard icon={<EditIcon />} title="Manage Listings" desc="Edit or remove properties" color="bg-blue-100" onClick={() => navigate("/manageListnings")}/>
          <ActionCard icon={<ChartIcon />} title="View Analytics" desc="Track performance" color="bg-orange-100" onClick={() => navigate("/viewAll")}/>
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






