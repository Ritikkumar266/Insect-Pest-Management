import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-emerald-600 to-lime-600 relative overflow-hidden">
      {/* Back Button - Fixed position with highest z-index */}
      <div className="fixed top-8 left-8 z-[9999] pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-green-200 transition duration-300 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm pointer-events-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* Animated background elements */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .card-container {
          animation: slideIn 0.6s ease-out;
        }
        .btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.2);
          animation: shimmer 2s infinite;
        }
        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Floating background shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full opacity-20 floating-icon"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-400 rounded-full opacity-20 floating-icon" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-amber-300 rounded-full opacity-20 floating-icon" style={{animationDelay: '2s'}}></div>

      <div className="card-container bg-white/95 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 relative z-10">
        {/* Header with gradient */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h12.75M11 3H7a2 2 0 00-2 2v14a2 2 0 002 2h4m0-18v18m0-18l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 text-sm">Login to your farming account</p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-3 rounded-xl mb-6 flex items-start gap-3 animate-bounce">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition duration-300 bg-gray-50/50 hover:bg-white placeholder-gray-400"
                placeholder="you@example.com"
                required
              />
              <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition duration-300 bg-gray-50/50 hover:bg-white placeholder-gray-400"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-green-600 transition duration-300 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m7.538-1.8a3.375 3.375 0 001-4.753m0 0l-1.414 1.414M9.172 9.172L5.414 5.414" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-shimmer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 shadow-lg flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Logging in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h12.75M11 3H7a2 2 0 00-2 2v14a2 2 0 002 2h4m0-18v18m0-18l4-4m-4 4l-4-4" />
                </svg>
                Login
              </>
            )}
          </button>
        </form>

        <div className="mt-7 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account? 
            <Link to="/register" className="text-green-600 hover:text-green-700 font-bold ml-1 hover:underline transition duration-300">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
