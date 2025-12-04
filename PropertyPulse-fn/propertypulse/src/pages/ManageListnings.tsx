import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchIcon, TrashIcon, EyeIcon, SquareIcon, ToggleLeftIcon, ToggleRightIcon, PlusIcon, BedIcon, BathIcon, MapPinIcon, EditIcon } from '../components/Icons';

export default function ManageListings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('You must be logged in.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/v1/listning/agent', {
          headers: { Authorization: `Bearer ${token}` }
        });

          
        console.log("Fetched listings response:", res.data);
        setListings(res.data.listings);

        // Map MongoDB _id to id
        const fetchedListings = res.data.listings.map((listing: any) => ({
          ...listing,
          id: listing._id
        }));

        setListings(fetchedListings);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter(l => l.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setListings(listings.map(l => 
      l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l
    ));
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location?.address?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || listing.propertyType === filterType;

    return matchesSearch && matchesType;
  });

  const stats = {
    total: listings.length,
    active: listings.filter(l => l.status === 'active').length,
    inactive: listings.filter(l => l.status === 'inactive').length,
    totalViews: listings.reduce((acc, l) => acc + (l.views || 0), 0),
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading listings...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Listings</h1>
            <p className="text-gray-500 mt-1">View, edit, and manage all your property listings</p>
          </div>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors font-semibold"
            onClick={() => window.location.href = '/createListnings'}
          >
            <PlusIcon />
            New Listing
          </button>
        </div>

        {/* Stats */}
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

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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

            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'grid' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'list' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        <div className="text-gray-600">
          <span className="font-semibold text-gray-900">{filteredListings.length}</span> listings found
        </div>

        {/* Listings */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img src={listing.images?.[0]} alt={listing.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${listing.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {listing.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium">{listing.propertyType}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <MapPinIcon />
                    {listing.location?.address || 'No address'}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{listing.title}</h3>
                  <p className="text-teal-600 font-bold text-lg mb-3">LKR {listing.price.toLocaleString()}</p>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1"><BedIcon /> {listing.bedrooms}</span>
                    <span className="flex items-center gap-1"><BathIcon /> {listing.bathrooms}</span>
                    <span className="flex items-center gap-1"><SquareIcon /> {listing.size} sqft</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><EyeIcon /> {listing.views || 0} views</span>
                    <span>{listing.inquiries || 0} inquiries</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStatus(listing.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${listing.status === 'active' ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-green-100 hover:bg-green-200 text-green-700'}`}
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
                  <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={listing.images?.[0]} alt={listing.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{listing.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${listing.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {listing.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                          <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">{listing.propertyType}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPinIcon />
                          {listing.location?.address || 'No address'}
                        </div>
                      </div>
                      <div className="text-right text-2xl font-bold text-teal-600">LKR {listing.price.toLocaleString()}</div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-gray-500 text-sm">
                        <span className="flex items-center gap-1"><BedIcon /> {listing.bedrooms}</span>
                        <span className="flex items-center gap-1"><BathIcon /> {listing.bathrooms}</span>
                        <span className="flex items-center gap-1"><SquareIcon /> {listing.size} sqft</span>
                        <span className="flex items-center gap-1"><EyeIcon /> {listing.views || 0} views</span>
                        <span>{listing.inquiries || 0} inquiries</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(listing.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${listing.status === 'active' ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-green-100 hover:bg-green-200 text-green-700'}`}
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
