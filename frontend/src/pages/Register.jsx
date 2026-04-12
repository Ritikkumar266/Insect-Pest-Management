import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';

const Register = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ SEND OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log("Sending request to:", `${API_URL}/api/auth/send-otp`);

      const res = await axios.post(`${API_URL}/api/auth/send-otp`, {
        name,
        email,
        password
      });

      console.log("OTP RESPONSE:", res.data);

      setStep(2);

    } catch (err) {
      console.log("FULL ERROR:", err);

      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Failed to send OTP'
      );

    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/verify-otp`, {
        name,
        email,
        password,
        otp
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      navigate('/dashboard');

    } catch (err) {
      console.log("VERIFY ERROR:", err);

      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Invalid OTP'
      );

    } finally {
      setLoading(false);
    }
  };

  // ✅ RESEND OTP
  const handleResendOTP = async () => {
    setError('');
    setResendLoading(true);

    try {
      await axios.post(`${API_URL}/api/auth/resend-otp`, { email });

      setError('New OTP sent to your email!');
      setTimeout(() => setError(''), 3000);

    } catch (err) {
      console.log("RESEND ERROR:", err);

      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Failed to resend OTP'
      );

    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
              required
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-blue-500 mb-3"
            >
              Toggle Password
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              className="w-full mt-2 text-blue-500"
            >
              Resend OTP
            </button>

          </form>
        )}

        <p className="text-sm text-center mt-4">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;