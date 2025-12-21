import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import BackButton from '../components/BackButton.jsx';
import PestManagementAdvisory from '../components/PestManagementAdvisory.jsx';

const PestIdentification = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post('http://localhost:5000/api/upload/identify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Attractive Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BackButton />
          
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-full shadow-lg">
                <span className="text-4xl">🔍</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              AI Pest Identification
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload an image of your crop to identify pests using advanced AI technology. Get instant results with management recommendations.
            </p>
          </div>

          {/* Enhanced Upload Section */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 mb-8">
            <div className="text-center">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileSelect}
                id="file-input"
                className="hidden"
              />
              
              {!preview ? (
                <div className="border-2 border-dashed border-purple-300 rounded-2xl p-12 hover:border-purple-400 transition-colors duration-300">
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-full mb-4">
                      <span className="text-4xl">📷</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Upload Crop Image</h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      Take a clear photo of the pest, damaged leaves, or affected crop area for accurate identification
                    </p>
                    <label 
                      htmlFor="file-input" 
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold px-8 py-4 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        <span>📁</span> Choose Image
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-w-full max-h-96 mx-auto rounded-2xl shadow-lg border-4 border-white" 
                    />
                    <button
                      onClick={() => {
                        setPreview(null);
                        setSelectedFile(null);
                        setResult(null);
                        setError('');
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <label 
                      htmlFor="file-input" 
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-xl cursor-pointer transition-all duration-300"
                    >
                      Change Image
                    </label>
                    <button 
                      onClick={handleUpload} 
                      disabled={loading} 
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold px-8 py-3 rounded-xl disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Analyzing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span>🔍</span> Identify Pest
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Enhanced Error Display */}
          {error && (
            <div className="bg-red-50/90 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-xl font-bold text-red-800">Error</h3>
              </div>
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {/* Enhanced Results Display */}
          {result && result.error && (
            <div className="bg-red-50/90 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-8 mb-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <span className="text-3xl">🚫</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-800">{result.error}</h2>
                  <p className="text-red-600">{result.note}</p>
                </div>
              </div>
              
              {result.detectedLabels && result.detectedLabels.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl mb-6 border border-red-200">
                  <p className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🏷️</span> Detected in image:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.detectedLabels.slice(0, 10).map((label, idx) => (
                      <span key={idx} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-medium border border-gray-300">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50/80 backdrop-blur-sm p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span>💡</span> Tips for better results:
                </h4>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Upload a clear photo of the pest or insect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Take a close-up photo of damaged leaves or crops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Ensure good lighting in the image</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Avoid uploading screenshots, text, or unrelated images</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Enhanced Success Results */}
          {result && result.primaryMatch && (
            <div className="space-y-8">
              {/* Comprehensive Pest Management Advisory */}
              <PestManagementAdvisory 
                pest={result.primaryMatch.pest} 
                confidence={result.primaryMatch.confidence} 
              />
              
              {/* Enhanced Pest Description */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-full">
                    <span className="text-2xl">📖</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Pest Description</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">{result.primaryMatch.pest.description}</p>
                
                {result.note && (
                  <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-xl border border-blue-200">
                    <p className="text-blue-800 text-sm">{result.note}</p>
                  </div>
                )}
              </div>
              
              {/* Enhanced Alternative Matches */}
              {result.alternativeMatches && result.alternativeMatches.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-3 rounded-full">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Alternative Matches</h3>
                  </div>
                  <div className="grid gap-4">
                    {result.alternativeMatches.map((match, idx) => (
                      match.pest && (
                        <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-xl font-bold text-gray-800">{match.pest.name}</h4>
                              {match.pest.scientificName && (
                                <p className="text-sm italic text-gray-600 font-medium">{match.pest.scientificName}</p>
                              )}
                            </div>
                            <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold">
                              {match.confidence.toFixed(1)}%
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{match.pest.description}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
              
              {/* Enhanced Note */}
              <div className="bg-blue-50/90 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">ℹ️</span>
                  <p className="font-bold text-blue-800">Note:</p>
                </div>
                <p className="text-blue-700">This is a simulated AI identification. For production use, integrate with a trained machine learning model for accurate pest detection.</p>
              </div>
            </div>
          )}
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
};

export default PestIdentification;
