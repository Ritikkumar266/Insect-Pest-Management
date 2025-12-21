import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import BackButton from '../components/BackButton.jsx';

const PestLibrary = () => {
  const [pests, setPests] = useState([]);
  const [filteredPests, setFilteredPests] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Pest type categories
  const pestTypes = {
    'beetle': ['Colorado Potato Beetle', 'Leaf Beetle'],
    'fly': ['Whitefly', 'Fruit Fly'],
    'worm': ['Armyworm', 'Cutworm', 'Rice Stem Borer'],
    'aphid': ['Aphids'],
    'hopper': ['Brown Planthopper'],
    'moth': ['Cotton Bollworm'],
    'miner': ['Leaf Miner'],
    'thrips': ['Thrips'],
    'bug': ['Mealybug']
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterPests();
  }, [pests, searchTerm, selectedCrop, selectedType]);

  const fetchData = async () => {
    try {
      const [pestsRes, cropsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/pests'),
        axios.get('http://localhost:5000/api/crops')
      ]);
      
      setPests(pestsRes.data);
      setCrops(cropsRes.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  const filterPests = () => {
    let filtered = [...pests];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pest =>
        pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pest.scientificName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by crop
    if (selectedCrop !== 'all') {
      filtered = filtered.filter(pest =>
        pest.affectedCrops?.some(crop => crop._id === selectedCrop)
      );
    }

    // Filter by pest type
    if (selectedType !== 'all') {
      const typeNames = pestTypes[selectedType] || [];
      filtered = filtered.filter(pest =>
        typeNames.some(typeName => pest.name.includes(typeName))
      );
    }

    setFilteredPests(filtered);
  };

  const getPestType = (pestName) => {
    for (const [type, names] of Object.entries(pestTypes)) {
      if (names.some(name => pestName.includes(name))) {
        return type;
      }
    }
    return 'other';
  };

  const getPlaceholderImage = (pestName) => {
    // Generate a consistent color based on pest name
    const colors = [
      'from-green-400 to-green-600',
      'from-blue-400 to-blue-600', 
      'from-purple-400 to-purple-600',
      'from-red-400 to-red-600',
      'from-yellow-400 to-yellow-600',
      'from-indigo-400 to-indigo-600',
      'from-pink-400 to-pink-600',
      'from-teal-400 to-teal-600'
    ];
    
    const colorIndex = pestName.length % colors.length;
    return colors[colorIndex];
  };

  const getPestIcon = (pestName) => {
    if (pestName.includes('Beetle')) return '🪲';
    if (pestName.includes('Fly')) return '🪰';
    if (pestName.includes('worm')) return '🐛';
    if (pestName.includes('Aphid')) return '🦗';
    if (pestName.includes('hopper')) return '🦗';
    if (pestName.includes('Bollworm')) return '🐛';
    if (pestName.includes('Thrips')) return '🦟';
    if (pestName.includes('Miner')) return '🐛';
    if (pestName.includes('Mealybug')) return '🐛';
    return '🐛';
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin text-6xl mb-4">🐛</div>
        <p className="text-xl text-green-600 font-medium">Loading pest library...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      {/* Attractive Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-lime-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BackButton />
          
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full shadow-lg">
                <span className="text-4xl">🐛</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Pest Knowledge Base
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive library of agricultural pests with detailed information, identification guides, and management strategies.
            </p>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12 border border-white/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-lg">🔍</span> Search Pests
                </label>
                <input
                  type="text"
                  placeholder="Search by name or scientific name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
              </div>

              {/* Filter by Crop */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-lg">🌾</span> Filter by Crop
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                >
                  <option value="all">All Crops</option>
                  {crops.map(crop => (
                    <option key={crop._id} value={crop._id}>{crop.name}</option>
                  ))}
                </select>
              </div>

              {/* Filter by Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-lg">🐛</span> Filter by Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                >
                  <option value="all">All Types</option>
                  <option value="beetle">🪲 Beetles</option>
                  <option value="fly">🪰 Flies</option>
                  <option value="worm">🐛 Worms</option>
                  <option value="aphid">🦗 Aphids</option>
                  <option value="hopper">🦗 Hoppers</option>
                  <option value="moth">🦋 Moths</option>
                  <option value="thrips">🦟 Thrips</option>
                  <option value="bug">🐛 Bugs</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 text-center">
              <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full font-medium shadow-lg">
                Showing {filteredPests.length} of {pests.length} pests
              </div>
            </div>
          </div>

          {/* Enhanced Pest Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPests.map(pest => (
              <div key={pest._id} className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
                {/* Pest Image */}
                <div className="h-48 relative overflow-hidden">
                  {pest.images && pest.images.length > 0 ? (
                    <img 
                      src={pest.images[0]} 
                      alt={pest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`h-full bg-gradient-to-br ${getPlaceholderImage(pest.name)} flex items-center justify-center`}>
                      <div className="text-6xl opacity-80">
                        {getPestIcon(pest.name)}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-lg border border-white/50">
                    {getPestTypeIcon(getPestType(pest.name))} {getPestType(pest.name)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {pest.name}
                  </h3>
                  {pest.scientificName && (
                    <p className="text-sm italic text-gray-500 mb-3 font-medium">{pest.scientificName}</p>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{pest.description}</p>
                  
                  {/* Affected Crops */}
                  {pest.affectedCrops && pest.affectedCrops.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <span>🎯</span> Affects:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {pest.affectedCrops.slice(0, 3).map((crop) => (
                          <span key={crop._id} className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
                            {crop.name}
                          </span>
                        ))}
                        {pest.affectedCrops.length > 3 && (
                          <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium border border-gray-200">
                            +{pest.affectedCrops.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link
                    to={`/pest-details/${pest._id}`}
                    className="block w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-center py-3 px-4 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl group-hover:scale-105"
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced No Results */}
          {filteredPests.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-12 border border-white/50 max-w-md mx-auto">
                <div className="text-8xl mb-6 animate-bounce">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No pests found</h3>
                <p className="text-gray-600 leading-relaxed">
                  Try adjusting your search terms or filter criteria to find the pests you're looking for.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );

  // Helper function for pest type icons
  function getPestTypeIcon(type) {
    const icons = {
      'beetle': '🪲',
      'fly': '🪰',
      'worm': '🐛',
      'aphid': '🦗',
      'hopper': '🦗',
      'moth': '🦋',
      'miner': '⛏️',
      'thrips': '🦟',
      'bug': '🐛',
      'other': '🐛'
    };
    return icons[type] || '🐛';
  }
};

export default PestLibrary;