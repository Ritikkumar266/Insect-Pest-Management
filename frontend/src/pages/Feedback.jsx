import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import BackButton from '../components/BackButton.jsx';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 5,
    category: 'general',
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    { value: 'general', label: 'General Feedback', icon: '💬' },
    { value: 'bug-report', label: 'Bug Report', icon: '🐛' },
    { value: 'feature-request', label: 'Feature Request', icon: '✨' },
    { value: 'crop-info', label: 'Crop Information', icon: '🌾' },
    { value: 'pest-info', label: 'Pest Information', icon: '🦗' },
    { value: 'ui-ux', label: 'User Interface', icon: '🎨' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('📝 Submitting feedback:', formData);

      const response = await axios.post('http://localhost:5000/api/feedback', formData);

      console.log('✅ Feedback submitted successfully:', response.data);

      setSubmitStatus({
        type: 'success',
        message: response.data.message || 'Thank you for your feedback!'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        rating: 5,
        category: 'general',
        isAnonymous: false
      });

    } catch (error) {
      console.error('❌ Feedback submission error:', error);
      
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit feedback. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, onRatingChange) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-3xl transition-all duration-200 hover:scale-110 ${
              star <= rating 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            ⭐
          </button>
        ))}
        <span className="ml-3 text-sm font-medium text-gray-600">
          {rating === 1 && '😞 Poor'}
          {rating === 2 && '😐 Fair'}
          {rating === 3 && '🙂 Good'}
          {rating === 4 && '😊 Very Good'}
          {rating === 5 && '🤩 Excellent'}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Feedback Icons */}
        <div className="absolute top-20 right-1/4 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>💬</div>
        <div className="absolute bottom-32 left-1/3 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '3s' }}>⭐</div>
        <div className="absolute top-1/3 right-10 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '5s' }}>📝</div>
      </div>

      <Navbar />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-green-200/50 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">💬</span>
            </div>
            <span className="text-sm font-semibold text-green-700">Your Voice Matters</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Feedback & Suggestions
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Help us improve AgroGuard by sharing your thoughts, suggestions, and experiences
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <div className={`mb-8 p-4 rounded-xl border ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {submitStatus.type === 'success' ? '✅' : '❌'}
              </span>
              <p className="font-medium">{submitStatus.message}</p>
            </div>
          </div>
        )}

        {/* Feedback Form */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">📝</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Share Your Feedback</h2>
                <p className="text-gray-600 mt-1">
                  Your feedback helps us create a better agricultural management experience
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Anonymous Toggle */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="isAnonymous" className="text-sm font-medium text-gray-700">
                  Submit feedback anonymously
                </label>
                <span className="text-xs text-gray-500">
                  (Your personal information will not be stored)
                </span>
              </div>

              {/* Personal Information */}
              {!formData.isAnonymous && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white"
                      required={!formData.isAnonymous}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white"
                      required={!formData.isAnonymous}
                    />
                  </div>
                </div>
              )}

              {/* Category Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Feedback Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                        formData.category === category.value
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-xs">{category.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Overall Rating *</label>
                <div className="p-4 bg-gray-50 rounded-xl">
                  {renderStars(formData.rating, (rating) => 
                    setFormData(prev => ({ ...prev, rating }))
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief summary of your feedback"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please share your detailed feedback, suggestions, or report any issues you've encountered..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[150px] resize-y transition-all duration-300 bg-white"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden w-full px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Submitting Feedback...
                    </>
                  ) : (
                    <>
                      <span className="text-lg">📤</span>
                      Submit Feedback
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">🚀</span>
              </div>
              <h3 className="font-bold text-gray-800">Feature Requests</h3>
            </div>
            <p className="text-sm text-gray-600">
              Suggest new features or improvements to make AgroGuard even better for farmers and agricultural professionals.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-xl">🐛</span>
              </div>
              <h3 className="font-bold text-gray-800">Bug Reports</h3>
            </div>
            <p className="text-sm text-gray-600">
              Found a bug or technical issue? Let us know so we can fix it quickly and improve your experience.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">💡</span>
              </div>
              <h3 className="font-bold text-gray-800">General Feedback</h3>
            </div>
            <p className="text-sm text-gray-600">
              Share your overall experience, thoughts, or any other feedback about using AgroGuard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;