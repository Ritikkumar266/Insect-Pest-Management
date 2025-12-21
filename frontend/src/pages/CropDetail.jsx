import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import BackButton from '../components/BackButton.jsx';

const CropDetail = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrop();
  }, [id]);

  const fetchCrop = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/crops/${id}`);
      setCrop(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching crop:', err);
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin text-6xl mb-4">🌾</div>
        <p className="text-xl text-green-600 font-medium">Loading crop details...</p>
      </div>
    </div>
  );
  
  if (!crop) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex justify-center items-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <p className="text-xl text-gray-600 font-medium">Crop not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      {/* Attractive Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-lime-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
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
          
          {/* Enhanced Crop Header */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg mb-8 border border-white/50">
            <div className="flex flex-col lg:flex-row gap-8">
              {crop.image && (
                <div className="lg:w-96 flex-shrink-0">
                  <img 
                    src={crop.image} 
                    alt={crop.name} 
                    className="w-full h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full shadow-lg">
                    <span className="text-3xl">{getCropIcon(crop.category)}</span>
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      {crop.name}
                    </h1>
                    <span className={`inline-block text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg ${getCategoryColor(crop.category)}`}>
                      {getCropIcon(crop.category)} {crop.category}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                    <span>📖</span> About This Crop
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{crop.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Common Pests Section */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-full shadow-lg">
                <span className="text-3xl">🐛</span>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Common Pests
              </h2>
            </div>
            
            {crop.commonPests && crop.commonPests.length > 0 ? (
              <div className="grid gap-8">
                {crop.commonPests.map(pest => (
                  <div key={pest._id} className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-6">
                      {pest.images && pest.images.length > 0 && (
                        <div className="flex-shrink-0">
                          <img 
                            src={pest.images[0]} 
                            alt={pest.name}
                            className="w-32 h-32 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🚨</span>
                          <h3 className="text-2xl font-bold text-red-700">{pest.name}</h3>
                        </div>
                        {pest.scientificName && (
                          <p className="italic text-red-600 mb-4 font-medium text-lg">{pest.scientificName}</p>
                        )}
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">{pest.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {pest.symptoms && pest.symptoms.length > 0 && (
                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-red-200">
                              <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                                <span>⚠️</span> Symptoms
                              </h4>
                              <ul className="space-y-2">
                                {pest.symptoms.map((symptom, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                                    <span className="text-red-500 mt-1">•</span>
                                    <span>{symptom}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {pest.management && (
                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-200">
                              <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                                <span>💡</span> Management
                              </h4>
                              <p className="text-gray-700 leading-relaxed">{pest.management}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-12 border border-green-200">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Great News!</h3>
                  <p className="text-green-600 text-lg">No common pests recorded for this crop.</p>
                </div>
              </div>
            )}
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

  // Helper functions for styling
  function getCropIcon(category) {
    const icons = {
      'Cereal': '🌾',
      'Vegetable': '🥬',
      'Fruit': '🍎',
      'Legume': '🫘',
      'Fiber': '🌿',
      'Cash Crop': '💰'
    };
    return icons[category] || '🌱';
  }

  function getCategoryColor(category) {
    const colors = {
      'Cereal': 'bg-gradient-to-r from-yellow-500 to-orange-500',
      'Vegetable': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'Fruit': 'bg-gradient-to-r from-red-500 to-pink-500',
      'Legume': 'bg-gradient-to-r from-purple-500 to-indigo-500',
      'Fiber': 'bg-gradient-to-r from-teal-500 to-cyan-500',
      'Cash Crop': 'bg-gradient-to-r from-amber-500 to-yellow-500'
    };
    return colors[category] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  }
};

export default CropDetail;
