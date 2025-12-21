import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import BackButton from '../components/BackButton.jsx';

const CropList = () => {
  const [crops, setCrops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/crops');
      setCrops(res.data);
      const uniqueCategories = [...new Set(res.data.map(crop => crop.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching crops:', err);
      setLoading(false);
    }
  };

  const filteredCrops = selectedCategory === 'all' 
    ? crops 
    : crops.filter(crop => crop.category === selectedCategory);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin text-6xl mb-4">🌾</div>
        <p className="text-xl text-green-600 font-medium">Loading crops...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
        {/* Gradient Orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-lime-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Animated Floating Crops */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Row 1 - Moving Right */}
          <div className="absolute top-20 left-0 animate-float-right-slow opacity-20">
            <span className="text-6xl">🌾</span>
          </div>
          <div className="absolute top-32 left-0 animate-float-right-medium opacity-15" style={{ animationDelay: '2s' }}>
            <span className="text-5xl">🌽</span>
          </div>
          <div className="absolute top-44 left-0 animate-float-right-fast opacity-25" style={{ animationDelay: '4s' }}>
            <span className="text-4xl">🍅</span>
          </div>
          
          {/* Row 2 - Moving Left */}
          <div className="absolute top-60 right-0 animate-float-left-slow opacity-20" style={{ animationDelay: '1s' }}>
            <span className="text-5xl">🥔</span>
          </div>
          <div className="absolute top-72 right-0 animate-float-left-medium opacity-15" style={{ animationDelay: '3s' }}>
            <span className="text-6xl">🥕</span>
          </div>
          <div className="absolute top-84 right-0 animate-float-left-fast opacity-25" style={{ animationDelay: '5s' }}>
            <span className="text-4xl">🌶️</span>
          </div>
          
          {/* Row 3 - Moving Right */}
          <div className="absolute top-96 left-0 animate-float-right-slow opacity-20" style={{ animationDelay: '6s' }}>
            <span className="text-5xl">🍆</span>
          </div>
          <div className="absolute top-108 left-0 animate-float-right-medium opacity-15" style={{ animationDelay: '8s' }}>
            <span className="text-4xl">🥒</span>
          </div>
          <div className="absolute top-120 left-0 animate-float-right-fast opacity-25" style={{ animationDelay: '10s' }}>
            <span className="text-6xl">🍎</span>
          </div>
          
          {/* Row 4 - Moving Left */}
          <div className="absolute bottom-32 right-0 animate-float-left-slow opacity-20" style={{ animationDelay: '7s' }}>
            <span className="text-5xl">🍊</span>
          </div>
          <div className="absolute bottom-44 right-0 animate-float-left-medium opacity-15" style={{ animationDelay: '9s' }}>
            <span className="text-4xl">🥭</span>
          </div>
          <div className="absolute bottom-56 right-0 animate-float-left-fast opacity-25" style={{ animationDelay: '11s' }}>
            <span className="text-6xl">🌻</span>
          </div>
          
          {/* Vertical Floating Crops */}
          <div className="absolute left-20 top-0 animate-float-up-down opacity-20" style={{ animationDelay: '12s' }}>
            <span className="text-5xl">🌱</span>
          </div>
          <div className="absolute right-20 top-0 animate-float-up-down opacity-15" style={{ animationDelay: '14s' }}>
            <span className="text-4xl">🌿</span>
          </div>
          <div className="absolute left-1/3 top-0 animate-float-up-down opacity-25" style={{ animationDelay: '16s' }}>
            <span className="text-6xl">🍇</span>
          </div>
          <div className="absolute right-1/3 top-0 animate-float-up-down opacity-20" style={{ animationDelay: '18s' }}>
            <span className="text-5xl">🫐</span>
          </div>
          
          {/* Diagonal Moving Crops */}
          <div className="absolute top-0 left-0 animate-diagonal-move opacity-15" style={{ animationDelay: '20s' }}>
            <span className="text-4xl">🥬</span>
          </div>
          <div className="absolute bottom-0 right-0 animate-diagonal-move-reverse opacity-20" style={{ animationDelay: '22s' }}>
            <span className="text-5xl">🥦</span>
          </div>
          <div className="absolute top-0 right-0 animate-diagonal-move-alt opacity-25" style={{ animationDelay: '24s' }}>
            <span className="text-6xl">🌰</span>
          </div>
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
                <span className="text-4xl">🌾</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Crop Library
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of crops with detailed information about cultivation, pest management, and agricultural best practices.
            </p>
          </div>
          
          {/* Enhanced Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button 
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium shadow-lg ${
                selectedCategory === 'all' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500 shadow-green-200' 
                  : 'bg-white/80 backdrop-blur-sm text-green-600 border-green-300 hover:bg-green-50 hover:border-green-400 hover:shadow-xl'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              🌍 All Crops
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium shadow-lg ${
                  selectedCategory === cat 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500 shadow-green-200' 
                    : 'bg-white/80 backdrop-blur-sm text-green-600 border-green-300 hover:bg-green-50 hover:border-green-400 hover:shadow-xl'
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {getCategoryIcon(cat)} {cat}
              </button>
            ))}
          </div>
          
          {/* Enhanced Crop Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCrops.map(crop => (
              <Link 
                to={`/crops/${crop._id}`} 
                key={crop._id} 
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50"
              >
                <div className="relative overflow-hidden">
                  {crop.image && (
                    <img 
                      src={crop.image} 
                      alt={crop.name} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                    {crop.name}
                  </h3>
                  <span className={`inline-block text-white text-sm px-4 py-2 rounded-full mb-3 font-medium ${getCategoryColor(crop.category)}`}>
                    {getCategoryIcon(crop.category)} {crop.category}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {crop.description}
                  </p>
                  <div className="mt-4 flex items-center text-green-600 font-medium group-hover:text-green-700">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Results Count */}
          <div className="text-center mt-12">
            <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50">
              <span className="text-gray-600 font-medium">
                Showing {filteredCrops.length} of {crops.length} crops
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced CSS for animations */}
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
        
        /* Horizontal Movement Animations */
        @keyframes float-right-slow {
          0% { transform: translateX(-100px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(25vw) translateY(-10px) rotate(5deg); }
          50% { transform: translateX(50vw) translateY(0px) rotate(0deg); }
          75% { transform: translateX(75vw) translateY(10px) rotate(-5deg); }
          100% { transform: translateX(100vw) translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-right-medium {
          0% { transform: translateX(-100px) translateY(0px) rotate(0deg); }
          33% { transform: translateX(33vw) translateY(-15px) rotate(8deg); }
          66% { transform: translateX(66vw) translateY(15px) rotate(-8deg); }
          100% { transform: translateX(100vw) translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-right-fast {
          0% { transform: translateX(-100px) translateY(0px) rotate(0deg); }
          50% { transform: translateX(50vw) translateY(-20px) rotate(10deg); }
          100% { transform: translateX(100vw) translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-left-slow {
          0% { transform: translateX(100px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(-25vw) translateY(-10px) rotate(-5deg); }
          50% { transform: translateX(-50vw) translateY(0px) rotate(0deg); }
          75% { transform: translateX(-75vw) translateY(10px) rotate(5deg); }
          100% { transform: translateX(-100vw) translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-left-medium {
          0% { transform: translateX(100px) translateY(0px) rotate(0deg); }
          33% { transform: translateX(-33vw) translateY(-15px) rotate(-8deg); }
          66% { transform: translateX(-66vw) translateY(15px) rotate(8deg); }
          100% { transform: translateX(-100vw) translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-left-fast {
          0% { transform: translateX(100px) translateY(0px) rotate(0deg); }
          50% { transform: translateX(-50vw) translateY(-20px) rotate(-10deg); }
          100% { transform: translateX(-100vw) translateY(0px) rotate(0deg); }
        }
        
        /* Vertical Movement Animations */
        @keyframes float-up-down {
          0% { transform: translateY(-100px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(25vh) translateX(-10px) rotate(3deg); }
          50% { transform: translateY(50vh) translateX(0px) rotate(0deg); }
          75% { transform: translateY(75vh) translateX(10px) rotate(-3deg); }
          100% { transform: translateY(100vh) translateX(0px) rotate(0deg); }
        }
        
        /* Diagonal Movement Animations */
        @keyframes diagonal-move {
          0% { transform: translateX(-100px) translateY(-100px) rotate(0deg); }
          50% { transform: translateX(50vw) translateY(50vh) rotate(180deg); }
          100% { transform: translateX(100vw) translateY(100vh) rotate(360deg); }
        }
        
        @keyframes diagonal-move-reverse {
          0% { transform: translateX(100px) translateY(100px) rotate(0deg); }
          50% { transform: translateX(-50vw) translateY(-50vh) rotate(-180deg); }
          100% { transform: translateX(-100vw) translateY(-100vh) rotate(-360deg); }
        }
        
        @keyframes diagonal-move-alt {
          0% { transform: translateX(100px) translateY(-100px) rotate(0deg); }
          50% { transform: translateX(-50vw) translateY(50vh) rotate(180deg); }
          100% { transform: translateX(-100vw) translateY(100vh) rotate(360deg); }
        }
        
        /* Animation Classes */
        .animate-float-right-slow { animation: float-right-slow 25s linear infinite; }
        .animate-float-right-medium { animation: float-right-medium 20s linear infinite; }
        .animate-float-right-fast { animation: float-right-fast 15s linear infinite; }
        .animate-float-left-slow { animation: float-left-slow 25s linear infinite; }
        .animate-float-left-medium { animation: float-left-medium 20s linear infinite; }
        .animate-float-left-fast { animation: float-left-fast 15s linear infinite; }
        .animate-float-up-down { animation: float-up-down 30s linear infinite; }
        .animate-diagonal-move { animation: diagonal-move 35s linear infinite; }
        .animate-diagonal-move-reverse { animation: diagonal-move-reverse 35s linear infinite; }
        .animate-diagonal-move-alt { animation: diagonal-move-alt 35s linear infinite; }
      `}</style>
    </div>
  );

  // Helper functions for category styling
  function getCategoryIcon(category) {
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

export default CropList;
