// API Configuration for React
// React only exposes env variables that start with REACT_APP_

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('🔧 API Base URL:', API_BASE_URL);

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  
  // Crops endpoints
  CROPS: '/api/crops',
  CROP_BY_ID: (id) => `/api/crops/${id}`,
  
  // Pests endpoints
  PESTS: '/api/pests',
  PEST_BY_ID: (id) => `/api/pests/${id}`,
  
  // Upload endpoints
  UPLOAD: '/api/upload',
  
  // User endpoints
  USER_PROFILE: '/api/user/profile',
  
  // Chatbot endpoints
  CHATBOT_CHAT: '/api/chatbot/chat',
  CHATBOT_ANALYZE_IMAGE: '/api/chatbot/analyze-image',
  CHATBOT_STATUS: '/api/chatbot/status',
  
  // Feedback endpoints
  FEEDBACK: '/api/feedback',
  FEEDBACK_BY_ID: (id) => `/api/feedback/${id}`,
  FEEDBACK_STATS: '/api/feedback/stats/summary',
  
  // Health check
  HEALTH: '/api/health'
};