import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import BackButton from '../components/BackButton.jsx';
import PestManagementAdvisory from '../components/PestManagementAdvisory.jsx';

const PestDetails = () => {
  const { id } = useParams();
  const [pest, setPest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPest();
  }, [id]);

  const fetchPest = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/pests/${id}`);
      setPest(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching pest:', err);
      setLoading(false);
    }
  };

  const getPlaceholderImage = (pestName) => {
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin text-6xl mb-4">🐛</div>
        <p className="text-xl text-red-600 font-medium">Loading pest details...</p>
      </div>
    </div>
  );
  
  if (!pest) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex justify-center items-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <p className="text-xl text-gray-600 font-medium">Pest not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      {/* Attractive Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BackButton />
          
          {/* Enhanced Pest Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden mb-8 border border-white/50">
            <div className="lg:flex">
              {/* Pest Image */}
              <div className="lg:w-2/5 h-80 lg:h-auto relative overflow-hidden">
                {pest.images && pest.images.length > 0 ? (
                  <img 
                    src={pest.images[0]} 
                    alt={pest.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className={`h-full bg-gradient-to-br ${getPlaceholderImage(pest.name)} flex items-center justify-center`}>
                    <div className="text-8xl opacity-80">
                      {getPestIcon(pest.name)}
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/50">
                  <span className="text-2xl">{getPestIcon(pest.name)}</span>
                </div>
              </div>
              
              {/* Pest Info */}
              <div className="lg:w-3/5 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-full shadow-lg">
                    <span className="text-3xl">🚨</span>
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                      {pest.name}
                    </h1>
                    {pest.scientificName && (
                      <p className="text-xl italic text-red-600 font-medium">{pest.scientificName}</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-200 mb-6">
                  <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
                    <span>📖</span> About This Pest
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{pest.description}</p>
                </div>
                
                {/* Affected Crops */}
                {pest.affectedCrops && pest.affectedCrops.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span>🎯</span> Commonly Affects:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {pest.affectedCrops.map((crop) => (
                        <span key={crop._id} className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                          🌱 {crop.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comprehensive Management Advisory */}
          <div className="mb-8">
            <PestManagementAdvisory pest={pest} confidence={100} />
          </div>

          {/* Enhanced Additional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Symptoms */}
            {pest.symptoms && pest.symptoms.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-full shadow-lg">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    Damage Symptoms
                  </h3>
                </div>
                <div className="space-y-4">
                  {pest.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                      <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700 leading-relaxed">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Management Summary */}
            {pest.management && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full shadow-lg">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Management Tips
                  </h3>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <p className="text-gray-700 text-lg leading-relaxed">{pest.management}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🔍</span>
                <h4 className="text-xl font-bold">Early Detection</h4>
              </div>
              <p className="text-green-100">Regular monitoring helps catch pest problems before they become severe.</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌱</span>
                <h4 className="text-xl font-bold">Integrated Control</h4>
              </div>
              <p className="text-blue-100">Combine multiple management strategies for best results and sustainability.</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📊</span>
                <h4 className="text-xl font-bold">Record Keeping</h4>
              </div>
              <p className="text-purple-100">Document pest sightings and treatments for better decision making.</p>
            </div>
          </div>
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
      `}</style>
    </div>
  );
};

export default PestDetails;