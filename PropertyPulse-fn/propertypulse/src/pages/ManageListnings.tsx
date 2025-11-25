import { useState } from 'react';

// SVG Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
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

const SquareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" />
  </svg>
);

const ToggleRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
    <circle cx="16" cy="12" r="2" />
  </svg>
);

const ToggleLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
    <circle cx="8" cy="12" r="2" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function ManageListings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock listings data
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'Cinnamon Gardens Villa',
      description: 'Spacious villa with modern amenities and beautiful garden',
      aiSummary: 'Luxurious 4-bed villa in Colombo 7 with pool and garden. Perfect family home.',
      price: 85000000,
      location: { address: 'Colombo 7, Western Province', lat: 6.9271, lng: 79.8612 },
      propertyType: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      size: 3200,
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop'],
      status: 'active',
      views: 245,
      inquiries: 12,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Marine Drive Luxury Suite',
      description: 'Stunning oceanview apartment with premium finishes',
      aiSummary: 'Modern 4-bed luxury apartment with ocean views in Colombo 4.',
      price: 95000000,
      location: { address: 'Colombo 4, Western Province', lat: 6.8935, lng: 79.8555 },
      propertyType: 'Apartment',
      bedrooms: 4,
      bathrooms: 3,
      size: 2800,
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'],
      status: 'active',
      views: 328,
      inquiries: 18,
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      title: 'Galle Fort Heritage Home',
      description: 'Restored colonial home in historic Galle Fort',
      aiSummary: 'Historic 3-bed home in Galle Fort with authentic colonial features.',
      price: 72000000,
      location: { address: 'Galle, Southern Province', lat: 6.0328, lng: 80.2168 },
      propertyType: 'House',
      bedrooms: 3,
      bathrooms: 2,
      size: 2400,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'],
      status: 'inactive',
      views: 156,
      inquiries: 8,
      createdAt: '2024-01-10'
    },
    {
      id: 4,
      title: 'Kandy Lake View Apartment',
      description: 'Modern apartment with stunning lake views',
      aiSummary: '2-bed apartment with Kandy lake views and modern amenities.',
      price: 45000000,
      location: { address: 'Kandy, Central Province', lat: 7.2906, lng: 80.6337 },
      propertyType: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      size: 1600,
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'],
      status: 'active',
      views: 189,
      inquiries: 15,
      createdAt: '2024-01-25'
    },
    {
      id: 5,
      title: 'Mount Lavinia Beach Villa',
      description: 'Beachfront villa with private pool and direct beach access',
      aiSummary: 'Luxurious 5-bed beachfront villa in Mount Lavinia with pool.',
      price: 120000000,
      location: { address: 'Mount Lavinia, Western Province', lat: 6.8379, lng: 79.8635 },
      propertyType: 'Villa',
      bedrooms: 5,
      bathrooms: 4,
      size: 4200,
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'],
      status: 'active',
      views: 412,
      inquiries: 24,
      createdAt: '2024-02-01'
    },
  ]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter(l => l.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setListings(listings.map(l => 
      l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l
    ));
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || listing.propertyType === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: listings.length,
    active: listings.filter(l => l.status === 'active').length,
    inactive: listings.filter(l => l.status === 'inactive').length,
    totalViews: listings.reduce((acc, l) => acc + l.views, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Listings</h1>
            <p className="text-gray-500 mt-1">View, edit, and manage all your property listings</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors font-semibold">
            <PlusIcon />
            New Listing
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-gray-500 text-sm mt-1">Total Listings</div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="text-3xl font-bold text-green-600">{stats.active}</div>
            <div className="text-gray-500 text-sm mt-1">Active</div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="text-3xl font-bold text-gray-600">{stats.inactive}</div>
            <div className="text-gray-500 text-sm mt-1">Inactive</div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="text-3xl font-bold text-blue-600">{stats.totalViews}</div>
            <div className="text-gray-500 text-sm mt-1">Total Views</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Filter by Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condo</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-gray-600">
          <span className="font-semibold text-gray-900">{filteredListings.length}</span> listings found
        </div>

        {/* Listings Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative h-48">
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {listing.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {listing.propertyType}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <MapPinIcon />
                    {listing.location.address}
                  </div>

                  <h3 className="font-bold text-gray-900 text-base mb-2">{listing.title}</h3>
                  <p className="text-teal-600 font-bold text-lg mb-3">
                    LKR {listing.price.toLocaleString()}
                  </p>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1"><BedIcon /> {listing.bedrooms}</span>
                    <span className="flex items-center gap-1"><BathIcon /> {listing.bathrooms}</span>
                    <span className="flex items-center gap-1"><SquareIcon /> {listing.size} sqft</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <EyeIcon /> {listing.views} views
                    </span>
                    <span>{listing.inquiries} inquiries</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStatus(listing.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        listing.status === 'active'
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          : 'bg-green-100 hover:bg-green-200 text-green-700'
                      }`}
                    >
                      {listing.status === 'active' ? <ToggleLeftIcon /> : <ToggleRightIcon />}
                      {listing.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{listing.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            listing.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {listing.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                          <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                            {listing.propertyType}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPinIcon />
                          {listing.location.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-teal-600">
                          LKR {listing.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-gray-500 text-sm">
                        <span className="flex items-center gap-1"><BedIcon /> {listing.bedrooms} beds</span>
                        <span className="flex items-center gap-1"><BathIcon /> {listing.bathrooms} baths</span>
                        <span className="flex items-center gap-1"><SquareIcon /> {listing.size} sqft</span>
                        <span className="flex items-center gap-1"><EyeIcon /> {listing.views} views</span>
                        <span>{listing.inquiries} inquiries</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(listing.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                            listing.status === 'active'
                              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              : 'bg-green-100 hover:bg-green-200 text-green-700'
                          }`}
                        >
                          {listing.status === 'active' ? <ToggleLeftIcon /> : <ToggleRightIcon />}
                          {listing.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(listing.id)}
                          className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}