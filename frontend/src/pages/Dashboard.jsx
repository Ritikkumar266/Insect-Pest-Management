import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [selectedStat, setSelectedStat] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(http://localhost:5000/uploads/backgrounds/farm.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-emerald-800/30 to-lime-700/40"></div>
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-lime-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-lime-200/20 to-green-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Agricultural Icons */}
        <div className="absolute top-20 right-1/4 text-6xl opacity-20 animate-bounce text-white drop-shadow-lg" style={{ animationDelay: '1s' }}>🌾</div>
        <div className="absolute bottom-32 left-1/3 text-5xl opacity-20 animate-bounce text-white drop-shadow-lg" style={{ animationDelay: '3s' }}>🚜</div>
        <div className="absolute top-1/3 right-10 text-4xl opacity-20 animate-bounce text-white drop-shadow-lg" style={{ animationDelay: '5s' }}>🌱</div>
        <div className="absolute bottom-1/4 left-10 text-5xl opacity-20 animate-bounce text-white drop-shadow-lg" style={{ animationDelay: '6s' }}>🐛</div>
        <div className="absolute top-2/3 right-1/3 text-4xl opacity-20 animate-bounce text-white drop-shadow-lg" style={{ animationDelay: '7s' }}>🍃</div>
      </div>
      
      {/* Content */}
      <div className="relative z-20">
        <Navbar />
      
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .stat-card {
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-full shadow-2xl animate-float border-4 border-white/30">
                  <span className="text-5xl">🌾</span>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border border-green-200/50 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🏡</span>
              </div>
              <span className="text-sm font-semibold text-green-700">Agricultural Dashboard</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
              Welcome back, {user?.name || 'Farmer'}!
            </h1>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-white/20">
              <p className="text-xl text-white leading-relaxed font-medium drop-shadow-lg">
                Your comprehensive agricultural pest management dashboard. Protect your crops with AI-powered insights and advanced monitoring tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          
          {/* Browse Crops Card */}
          <Link 
            to="/crops" 
            className="group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-green-200/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-200 rounded-full -ml-12 -mb-12 opacity-20"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">🌱</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                  Crops
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                Browse Crops
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Explore detailed information about different crops and their common pests. Learn about cultivation and protection strategies.
              </p>
              <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                <span>Explore Crops</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Pest Library Card */}
          <Link 
            to="/pest-library" 
            className="group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-blue-200/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full -ml-12 -mb-12 opacity-20"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-4 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">📚</span>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                  Library
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                Pest Library
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Browse comprehensive pest knowledge base with advanced search and filtering. Your complete pest reference guide.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                <span>Browse Library</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Identify Pest Card */}
          <Link 
            to="/identify" 
            className="group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-purple-200/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200 rounded-full -ml-12 -mb-12 opacity-20"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-4 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">🔍</span>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                  AI Powered
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                Identify Pest
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Upload images to identify pests using advanced AI technology. Get instant results with management recommendations.
              </p>
              <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                <span>Start Identification</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Feedback Card */}
          <Link 
            to="/feedback" 
            className="group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-orange-200/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-full -ml-12 -mb-12 opacity-20"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-4 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">💬</span>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                  Your Voice
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                Give Feedback
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Share your thoughts and help us improve. Your feedback matters and helps us create a better experience.
              </p>
              <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700">
                <span>Share Feedback</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Admin Panel Card (if admin) */}
          {user?.role === 'admin' && (
            <Link 
              to="/admin" 
              className="group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-red-200/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-red-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                    <span className="text-3xl">⚙️</span>
                  </div>
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Admin Only
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                  Admin Panel
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Manage crops and pests information. Add new entries, update existing data, and maintain the system.
                </p>
                <div className="flex items-center text-red-600 font-medium group-hover:text-red-700">
                  <span>Manage System</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-8 animate-slide-in border-2 border-gray-200/50" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📊</span> Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500 hover:bg-green-100 transition">
              <span className="text-2xl">✅</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Pest Identified Successfully</p>
                <p className="text-sm text-gray-600">Detected Aphid on Wheat crop - 2 hours ago</p>
              </div>
              <span className="text-xs text-gray-500">Today</span>
            </div>
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500 hover:bg-blue-100 transition">
              <span className="text-2xl">🌱</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">New Crop Added</p>
                <p className="text-sm text-gray-600">Added Maize crop to your monitoring list</p>
              </div>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500 hover:bg-purple-100 transition">
              <span className="text-2xl">📸</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">3 Images Analyzed</p>
                <p className="text-sm text-gray-600">AI analysis completed for your uploaded images</p>
              </div>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-600 rounded-2xl shadow-lg p-8 text-white animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">💡</span>
            <h2 className="text-2xl font-bold">Pro Tips for Better Pest Management</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <span className="text-2xl mr-3 flex-shrink-0">🔍</span>
              <div>
                <h3 className="font-semibold mb-1 text-lg">Early Detection</h3>
                <p className="text-green-50">Regular monitoring helps catch pest problems before they become severe and widespread.</p>
              </div>
            </div>
            <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <span className="text-2xl mr-3 flex-shrink-0">🌱</span>
              <div>
                <h3 className="font-semibold mb-1 text-lg">Integrated Management</h3>
                <p className="text-green-50">Combine cultural, biological, and chemical controls for best results and sustainability.</p>
              </div>
            </div>
            <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <span className="text-2xl mr-3 flex-shrink-0">📊</span>
              <div>
                <h3 className="font-semibold mb-1 text-lg">Record Keeping</h3>
                <p className="text-green-50">Document all pest sightings and treatments for better decision making and planning.</p>
              </div>
            </div>
            <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <span className="text-2xl mr-3 flex-shrink-0">🤖</span>
              <div>
                <h3 className="font-semibold mb-1 text-lg">Use AI Tools</h3>
                <p className="text-green-50">Leverage our AI-powered pest identification for quick and accurate detection results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
