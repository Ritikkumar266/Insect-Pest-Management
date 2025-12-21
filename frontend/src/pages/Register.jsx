import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';

const Register = () => {
  const [step, setStep] = useState(1); // 1: Registration form, 2: OTP verification
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', {
        name,
        email,
        password
      });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        name,
        email,
        password,
        otp
      });
      
      // Store token and user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setResendLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/resend-otp', { email });
      setError(''); // Clear any previous errors
      // Show success message temporarily
      setError('New OTP sent to your email!');
      setTimeout(() => setError(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
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
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(34, 197, 94, 0.3); }
          50% { border-color: rgba(34, 197, 94, 0.8); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .input-focus {
          position: relative;
        }
        .input-focus::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 3s infinite;
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
        {step === 1 ? (
          <>
            {/* Header with gradient */}
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Create Account</h2>
              <p className="text-center text-gray-500 text-sm">Join our farming community today</p>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-3 rounded-xl mb-6 flex items-start gap-3 animate-bounce">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSendOTP} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition duration-300 bg-gray-50/50 hover:bg-white placeholder-gray-400"
                    placeholder="John Farmer"
                    required
                  />
                  <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

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
                    minLength="6"
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
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  Minimum 6 characters
                </p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-shimmer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Send OTP
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl mb-4 animate-pulse">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
              <p className="text-gray-500">We've sent a 6-digit verification code to</p>
              <p className="text-blue-600 font-bold break-all">{email}</p>
            </div>

            {error && (
              <div className={`border-2 px-4 py-3 rounded-xl mb-5 flex items-start gap-3 ${
                error.includes('sent') 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${error.includes('sent') ? 'text-green-600' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d={error.includes('sent') ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"} clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-sm">Enter 6-Digit Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition duration-300 text-center text-4xl font-bold tracking-widest bg-gray-50/50 hover:bg-white placeholder-gray-300"
                  placeholder="000000"
                  maxLength="6"
                  required
                />
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs text-gray-500">Code expires in 5 minutes</p>
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < otp.length ? 'bg-blue-500' : 'bg-gray-300'} transition-all duration-300`}></div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading || otp.length !== 6}
                className="w-full btn-shimmer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Verify & Register
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <p className="text-gray-600 mb-3 text-sm text-center">Didn't receive the code?</p>
              <button
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:text-gray-400 disabled:bg-gray-50 flex items-center justify-center gap-2"
              >
                {resendLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Resend OTP
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Registration
            </button>
          </>
        )}
        
        <div className="mt-7 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account? 
            <Link to="/login" className="text-green-600 hover:text-green-700 font-bold ml-1 hover:underline transition duration-300">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
