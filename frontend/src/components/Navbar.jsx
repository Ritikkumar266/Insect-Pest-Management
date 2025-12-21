import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl sticky top-0 z-50">
      <style>{`
        @keyframes pulse-logo {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .logo-container:hover {
          animation: pulse-logo 0.6s ease-in-out;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="logo-container flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
            <div className="relative">
              {/* Shield Logo Background */}
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                {/* Shield Icon protecting crops */}
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              {/* Crop Protection Badge */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs">🌾</span>
              </div>
            </div>
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">AgroGuard</span>
              <span className="text-xs text-green-400 font-medium">Smart Pest Management</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-1">
            <li><Link to="/dashboard" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Dashboard</Link></li>
            <li><Link to="/crops" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Crops</Link></li>
            <li><Link to="/pest-library" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Pest Library</Link></li>
            <li><Link to="/identify" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Identify</Link></li>
            <li><Link to="/feedback" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Feedback</Link></li>
            {user?.role === 'admin' && (
              <li><Link to="/admin" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Admin</Link></li>
            )}
            <li><Link to="/profile" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Profile</Link></li>
            <li>
              <button 
                onClick={handleLogout} 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-green-400 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
