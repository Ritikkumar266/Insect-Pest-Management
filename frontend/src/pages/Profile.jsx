import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import BackButton from '../components/BackButton.jsx';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validation
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put('http://localhost:5000/api/user/change-password', {
        currentPassword,
        newPassword
      });

      setMessage(res.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Profile Icons */}
        <div className="absolute top-20 right-1/4 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>👤</div>
        <div className="absolute bottom-32 left-1/3 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '3s' }}>🔒</div>
        <div className="absolute top-1/3 right-10 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '5s' }}>⚙️</div>
      </div>

      <Navbar />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BackButton />
        </div>
        
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-indigo-200/50 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">👤</span>
            </div>
            <span className="text-sm font-semibold text-indigo-700">User Profile Management</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Profile Settings
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your account information and security settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enhanced User Info Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl">👤</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">User Information</h2>
                  <p className="text-gray-600 mt-1">Your account details and role</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                  <label className="text-sm font-bold text-gray-600 uppercase tracking-wide">Name</label>
                  <div className="mt-2 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200/50">
                    <p className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">🏷️</span>
                      {user?.name}
                    </p>
                  </div>
                </div>
                
                <div className="group">
                  <label className="text-sm font-bold text-gray-600 uppercase tracking-wide">Email</label>
                  <div className="mt-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                    <p className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">📧</span>
                      {user?.email}
                    </p>
                  </div>
                </div>
                
                <div className="group">
                  <label className="text-sm font-bold text-gray-600 uppercase tracking-wide">Role</label>
                  <div className="mt-2 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{user?.role === 'admin' ? '👑' : '👨‍💼'}</span>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        user?.role === 'admin' 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      }`}>
                        {user?.role === 'admin' ? 'Administrator' : 'User'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Change Password Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl">🔒</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Change Password</h2>
                  <p className="text-gray-600 mt-1">Update your account security</p>
                </div>
              </div>
              
              {message && (
                <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg animate-pulse">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <span className="font-semibold">{message}</span>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-lg animate-pulse">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">❌</span>
                    <span className="font-semibold">{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-bold text-sm uppercase tracking-wide">Current Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm pl-12"
                      required
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔐</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-bold text-sm uppercase tracking-wide">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm pl-12"
                      required
                      minLength="6"
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🆕</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <span className="text-lg">ℹ️</span>
                    Minimum 6 characters required
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-bold text-sm uppercase tracking-wide">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm pl-12"
                      required
                      minLength="6"
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">✅</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Changing Password...
                      </>
                    ) : (
                      <>
                        <span className="text-xl">🔄</span>
                        Change Password
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Enhanced Security Tips */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200/50 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900">Password Security Tips</h3>
                <p className="text-blue-700">Keep your account secure with these best practices</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '🔢', text: 'Use at least 8 characters (minimum 6 required)' },
                { icon: '🔤', text: 'Include uppercase and lowercase letters' },
                { icon: '🎯', text: 'Add numbers and special characters' },
                { icon: '🚫', text: "Don't use common words or personal information" },
                { icon: '🔄', text: 'Change your password regularly' },
                { icon: '🔐', text: 'Use unique passwords for different accounts' }
              ].map((tip, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-200/50 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                  <span className="text-2xl">{tip.icon}</span>
                  <span className="text-blue-800 font-medium">{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
