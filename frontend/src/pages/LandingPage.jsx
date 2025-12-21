import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-slide-in-down { animation: slideInDown 0.6s ease-out; }
        .animate-slide-in-up { animation: slideInUp 0.6s ease-out; }
        .gradient-bg {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        .hero-pattern {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(52, 211, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);
          background-size: 100% 100%;
        }
        
        /* Animated Crops - Floating Movements */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(5px) rotate(2deg); }
          50% { transform: translateY(-30px) translateX(0px) rotate(0deg); }
          75% { transform: translateY(-15px) translateX(-5px) rotate(-2deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-20px) translateX(8px) rotate(3deg); }
          66% { transform: translateY(-10px) translateX(-8px) rotate(-3deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-25px) translateX(10px) rotate(5deg); }
        }
        
        /* Animated Pests - Moving Patterns */
        @keyframes pest-move-1 {
          0% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(30px) translateY(-10px) rotate(90deg); }
          50% { transform: translateX(60px) translateY(0px) rotate(180deg); }
          75% { transform: translateX(30px) translateY(10px) rotate(270deg); }
          100% { transform: translateX(0px) translateY(0px) rotate(360deg); }
        }
        
        @keyframes pest-move-2 {
          0% { transform: translateX(0px) translateY(0px) scale(1); }
          33% { transform: translateX(-20px) translateY(-15px) scale(1.1); }
          66% { transform: translateX(20px) translateY(-15px) scale(0.9); }
          100% { transform: translateX(0px) translateY(0px) scale(1); }
        }
        
        @keyframes pest-move-3 {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          20% { transform: translateY(-8px) translateX(-15px) rotate(45deg); }
          40% { transform: translateY(-16px) translateX(0px) rotate(90deg); }
          60% { transform: translateY(-8px) translateX(15px) rotate(135deg); }
          80% { transform: translateY(0px) translateX(0px) rotate(180deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(360deg); }
        }
        
        /* Shield Protection Animation */
        @keyframes shield-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.2; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.4; }
        }
        
        /* Animation Classes */
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-pest-move-1 { animation: pest-move-1 12s linear infinite; }
        .animate-pest-move-2 { animation: pest-move-2 10s ease-in-out infinite; }
        .animate-pest-move-3 { animation: pest-move-3 14s linear infinite; }
        .animate-shield-pulse { animation: shield-pulse 6s ease-in-out infinite; }
        
        /* Modal Animations */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🌾</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">AgroGuard</span>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-green-600 px-4 py-2 rounded-md font-medium transition duration-300 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
        <div className="absolute inset-0 hero-pattern"></div>
        
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Crops */}
          <div className="absolute animate-float-slow" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>
            <span className="text-4xl opacity-30">🌾</span>
          </div>
          <div className="absolute animate-float-medium" style={{ top: '20%', right: '10%', animationDelay: '1s' }}>
            <span className="text-3xl opacity-40">🌽</span>
          </div>
          <div className="absolute animate-float-fast" style={{ top: '60%', left: '8%', animationDelay: '2s' }}>
            <span className="text-5xl opacity-25">🍅</span>
          </div>
          <div className="absolute animate-float-slow" style={{ bottom: '15%', right: '15%', animationDelay: '3s' }}>
            <span className="text-4xl opacity-35">🥔</span>
          </div>
          <div className="absolute animate-float-medium" style={{ top: '40%', left: '15%', animationDelay: '4s' }}>
            <span className="text-3xl opacity-30">🌱</span>
          </div>
          
          {/* Animated Pests (smaller and more subtle) */}
          <div className="absolute animate-pest-move-1" style={{ top: '25%', left: '20%', animationDelay: '0.5s' }}>
            <span className="text-2xl opacity-20">🐛</span>
          </div>
          <div className="absolute animate-pest-move-2" style={{ top: '70%', right: '25%', animationDelay: '1.5s' }}>
            <span className="text-xl opacity-15">🦗</span>
          </div>
          <div className="absolute animate-pest-move-3" style={{ top: '45%', right: '5%', animationDelay: '2.5s' }}>
            <span className="text-2xl opacity-20">🪰</span>
          </div>
          <div className="absolute animate-pest-move-1" style={{ bottom: '30%', left: '25%', animationDelay: '3.5s' }}>
            <span className="text-xl opacity-15">🦟</span>
          </div>
          
          {/* Shield Icons (representing protection) */}
          <div className="absolute animate-shield-pulse" style={{ top: '30%', left: '50%', animationDelay: '1s' }}>
            <span className="text-3xl opacity-20">🛡️</span>
          </div>
          <div className="absolute animate-shield-pulse" style={{ bottom: '40%', right: '40%', animationDelay: '4s' }}>
            <span className="text-2xl opacity-25">🛡️</span>
          </div>
        </div>
        
        {/* Floating shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

        <div className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-slide-in-down">
              <div className="inline-block mb-6">
                <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-green-200">
                  <span className="text-2xl">✨</span>
                  <span className="text-sm font-semibold text-green-700">AI-Powered Pest Management Platform</span>
                </div>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent">
                  AgroGuard
                </span>
                <br />
                <span className="text-gray-900">Smart Pest Management</span>
                <br />
                <span className="text-gray-700 text-4xl md:text-5xl">for Modern Agriculture</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Identify, manage, and control agricultural pests with AI-powered technology. 
                <br />
                <span className="text-green-700 font-semibold">Protect your crops and maximize your harvest</span> with our comprehensive pest management system.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-in-up">
                <Link 
                  to="/register" 
                  className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
                >
                  <span>Get Started Free</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <button 
                  onClick={openVideoModal}
                  className="group bg-white/90 backdrop-blur-sm border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl text-lg font-bold transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v1" />
                  </svg>
                  <span>Watch Demo</span>
                </button>
                <Link 
                  to="/login" 
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl text-lg font-bold transition duration-300 flex items-center justify-center gap-2"
                >
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Pest Management Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to protect your crops from harmful pests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Identification",
                description: "Upload images of pests or crop damage and get instant identification using advanced AI technology.",
                icon: "🤖",
                color: "from-purple-500 to-indigo-600",
                delay: "0s"
              },
              {
                title: "Comprehensive Database",
                description: "Access detailed information about crops, pests, symptoms, and proven management strategies.",
                icon: "📚",
                color: "from-blue-500 to-cyan-600",
                delay: "0.1s"
              },
              {
                title: "Smart Solutions",
                description: "Get personalized treatment recommendations and management strategies for effective pest control.",
                icon: "💡",
                color: "from-yellow-500 to-orange-600",
                delay: "0.2s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50 overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Pests Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Common Agricultural Pests
            </h2>
            <p className="text-xl text-gray-600">
              Learn about the most common pests affecting crops worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Aphids", description: "Small sap-sucking insects that damage leaves", icon: "🐛", color: "from-red-400 to-red-600" },
              { name: "Bollworm", description: "Caterpillars that damage cotton bolls", icon: "🐛", color: "from-orange-400 to-orange-600" },
              { name: "Whitefly", description: "Tiny insects that suck plant sap", icon: "🦟", color: "from-yellow-400 to-yellow-600" },
              { name: "Armyworm", description: "Destructive caterpillars that defoliate fields", icon: "🐛", color: "from-green-400 to-green-600" }
            ].map((pest, index) => (
              <div key={index} className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100/50 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${pest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{pest.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pest.name}</h3>
                  <p className="text-gray-600 text-sm">{pest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to identify and manage pests effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Upload Image", description: "Take a photo and upload it", icon: "📸" },
              { step: "2", title: "AI Analysis", description: "Our AI identifies the pest", icon: "🤖" },
              { step: "3", title: "Get Solutions", description: "Receive management strategies", icon: "💡" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 -right-12 w-24 h-1 bg-gradient-to-r from-green-600 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-lime-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">Why Choose AgroGuard?</h2>
              <div className="space-y-4">
                {[
                  "✅ Real-time pest identification with 95% accuracy",
                  "✅ Comprehensive database of 50+ pest species",
                  "✅ Personalized treatment recommendations",
                  "✅ 24/7 access to expert advice and resources",
                  "✅ Community of 10000+ farmers worldwide",
                  "✅ Mobile-friendly interface for field use"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center text-lg">
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-float">🌾</div>
                  <p className="text-white text-xl font-semibold">Protecting Crops Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of farmers using our AI-powered pest management system. Start protecting your harvest today!
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-5 rounded-xl text-lg font-bold transition transform hover:scale-105 shadow-2xl"
          >
            Start Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">🌾</span>
                </div>
                <span className="text-xl font-bold text-white">AgroGuard</span>
              </div>
              <p className="text-sm">Smart Pest Management for Modern Agriculture</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">About</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 AgroGuard. All rights reserved. Protecting crops with AI technology.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-lime-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden border border-gray-200/50 backdrop-blur-lg animate-scale-in">
            {/* Modal Header */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-lime-400/20"></div>
              <div className="relative flex items-center justify-between p-8 border-b border-gray-200/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">AgroGuard Demo</h3>
                    <p className="text-gray-600 mt-1 font-medium">Discover the power of AI-driven pest management</p>
                  </div>
                </div>
                <button
                  onClick={closeVideoModal}
                  className="group p-3 hover:bg-red-50 rounded-full transition-all duration-300 border border-gray-200 hover:border-red-200"
                >
                  <svg className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 bg-gradient-to-br from-gray-50/50 to-white/80">
              {/* Video Container with Enhanced Styling */}
              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
                  <video 
                    controls 
                    className="w-full h-full"
                    preload="metadata"
                  >
                    <source src="/videos/demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video Overlay Info */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Live Demo
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Demo Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl">📸</span>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2 text-lg">Upload Images</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">Capture or upload photos of pests, crop damage, or plant diseases for instant analysis</p>
                    <div className="mt-3 flex justify-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Instant Upload
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl">🤖</span>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2 text-lg">AI Analysis</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">Advanced machine learning algorithms identify pests and diseases with 95% accuracy</p>
                    <div className="mt-3 flex justify-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        95% Accuracy
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl">💡</span>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2 text-lg">Smart Solutions</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">Get personalized treatment plans and management strategies from agricultural experts</p>
                    <div className="mt-3 flex justify-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Expert Advice
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-lime-50 rounded-2xl p-6 mb-8 border border-green-200/50">
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Trusted by Farmers Worldwide</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">10K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">50+</div>
                    <div className="text-sm text-gray-600">Pest Species</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lime-600">95%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register"
                  onClick={closeVideoModal}
                  className="group flex-1 relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Start Free Trial
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
                
                <Link 
                  to="/login"
                  onClick={closeVideoModal}
                  className="group flex-1 relative overflow-hidden border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-bold transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Sign In
                  </span>
                </Link>
                
                <button
                  onClick={closeVideoModal}
                  className="px-8 py-4 text-gray-600 hover:text-gray-800 font-bold transition-all duration-300 hover:bg-gray-100 rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;