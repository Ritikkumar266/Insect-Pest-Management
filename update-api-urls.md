# 🔄 API URL Update Guide

## Quick Steps to Update Your Frontend

### 1. First, get your backend Vercel URL
After deploying your backend to Vercel, you'll get a URL like:
`https://your-backend-name.vercel.app`

### 2. Update the API configuration
Edit `frontend/src/config/api.js` and replace:
```javascript
production: {
  API_BASE_URL: 'https://your-backend-app.vercel.app',
}
```
With your actual backend URL.

### 3. Files that need updating:

#### AdminPanel.jsx ✅ (Already updated)
- Uses `getApiUrl(API_ENDPOINTS.CROPS)`
- Uses `getApiUrl(API_ENDPOINTS.PESTS)`
- Uses `getApiUrl(API_ENDPOINTS.FEEDBACK)`

#### Files still needing updates:

**frontend/src/pages/Feedback.jsx**
```javascript
// Replace this line:
const response = await axios.post('http://localhost:5000/api/feedback', formData);

// With:
import { getApiUrl, API_ENDPOINTS } from '../config/api.js';
const response = await axios.post(getApiUrl(API_ENDPOINTS.FEEDBACK), formData);
```

**frontend/src/components/Chatbot.jsx**
```javascript
// Replace these lines:
const apiUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api/chatbot/chat'
  : '/api/chatbot/chat';

// With:
import { getApiUrl, API_ENDPOINTS } from '../config/api.js';
const apiUrl = getApiUrl(API_ENDPOINTS.CHATBOT_CHAT);
```

**Other files to check:**
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/Profile.jsx`
- `frontend/src/pages/CropList.jsx`
- `frontend/src/pages/CropDetail.jsx`
- `frontend/src/pages/PestLibrary.jsx`
- `frontend/src/pages/PestDetails.jsx`
- `frontend/src/pages/PestIdentification.jsx`

### 4. Search and Replace Pattern

Use your IDE's find and replace feature:

**Find:** `http://localhost:5000/api/`
**Replace:** `getApiUrl('/api/`

Then add the import at the top of each file:
```javascript
import { getApiUrl } from '../config/api.js';
```

### 5. Test Your Deployment

1. Deploy your updated frontend to Vercel
2. Test all functionality:
   - Login/Register
   - Crop browsing
   - Pest identification
   - Feedback submission
   - Admin panel (if applicable)
   - Chatbot functionality

### 6. Environment Variables for Frontend (if needed)

If you need environment-specific variables in your frontend, create:

**frontend/.env.production**
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

**frontend/.env.development**
```env
REACT_APP_API_URL=http://localhost:5000
```

Then update your config:
```javascript
const config = {
  development: {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'https://your-backend-url.vercel.app',
  }
};
```

## Deployment Checklist

- [ ] Backend deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] MongoDB Atlas configured
- [ ] Frontend API configuration updated
- [ ] All API calls updated to use new configuration
- [ ] Frontend redeployed to Vercel
- [ ] All functionality tested
- [ ] CORS configured properly
- [ ] Health check endpoint working

## Common Issues

**CORS Error:**
- Make sure your frontend URL is in the CORS origins in `backend/server.js`

**404 API Errors:**
- Check that your backend is deployed correctly
- Verify the API endpoints are working: `https://your-backend-url.vercel.app/api/health`

**Environment Variables:**
- Make sure all required environment variables are set in Vercel
- Check that sensitive data is not exposed in frontend code