# 🚀 AgroGuard Deployment Guide

## Backend Deployment on Vercel

### Step 1: Deploy Backend to Vercel

1. **Push your backend code to GitHub** (if not already done)
2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project:**
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** Leave empty (not needed for Node.js)
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

### Step 2: Set Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables and add:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pest_management?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_for_production
NODE_ENV=production
ROBOFLOW_API_KEY=rf_RTydfz2TCDhJOaE6uJ12dajMzUG2
EMAIL_USER=ritik2662004@gmail.com
EMAIL_PASS=yayx mkey yfub vltx
CROP_DOCTOR_SUPABASE_URL=https://zsxgupudydqvjulkrrtl.supabase.co
CROP_DOCTOR_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeGd1cHVkeWRxdmp1bGtycnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODQ2MTcsImV4cCI6MjA4MDk2MDYxN30.jG2wekOyS6sPTXHQFyItbit9OADqs-lgWV0ooKv1NSE
DISABLE_SSL_VERIFICATION=false
```

### Step 3: Update Frontend Configuration

1. **Get your backend Vercel URL** (e.g., `https://your-backend-app.vercel.app`)
2. **Update `frontend/src/config/api.js`:**
   ```javascript
   production: {
     API_BASE_URL: 'https://your-actual-backend-url.vercel.app',
   }
   ```

### Step 4: Update Frontend API Calls

Replace all hardcoded `http://localhost:5000` URLs in your frontend with the new API configuration.

## Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster

### Step 2: Configure Database Access
1. **Database Access:** Create a database user
2. **Network Access:** Add `0.0.0.0/0` (allow from anywhere) for Vercel
3. **Get Connection String:** Replace `<username>` and `<password>`

### Step 3: Import Your Data
1. Use MongoDB Compass or mongoimport to transfer your local data
2. Or run your seed scripts against the Atlas database

## Frontend Updates Needed

After backend deployment, update these files to use the API configuration:

### Files to Update:
- `frontend/src/pages/AdminPanel.jsx`
- `frontend/src/pages/Feedback.jsx`
- `frontend/src/components/Chatbot.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/Profile.jsx`
- Any other files making API calls

### Example Update:
```javascript
// Before
const response = await axios.get('http://localhost:5000/api/crops');

// After
import { getApiUrl, API_ENDPOINTS } from '../config/api.js';
const response = await axios.get(getApiUrl(API_ENDPOINTS.CROPS));
```

## Testing Deployment

### Backend Health Check:
Visit: `https://your-backend-url.vercel.app/api/health`

Should return:
```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": "2025-12-20T10:30:00.000Z",
  "environment": "production"
}
```

### Frontend Testing:
1. Test login/register functionality
2. Test crop and pest data loading
3. Test feedback submission
4. Test chatbot functionality
5. Test admin panel (if you have admin access)

## Common Issues & Solutions

### CORS Issues:
- Make sure your frontend URL is added to CORS origins in `server.js`
- Check that credentials are properly configured

### Database Connection:
- Verify MongoDB Atlas connection string
- Check network access settings
- Ensure database user has proper permissions

### Environment Variables:
- Double-check all environment variables in Vercel
- Make sure sensitive data is not exposed in frontend

### File Uploads:
- Note: Vercel has limitations on file storage
- Consider using cloud storage (AWS S3, Cloudinary) for production

## Next Steps After Deployment

1. **Update API URLs** in frontend configuration
2. **Test all functionality** thoroughly
3. **Set up monitoring** and error tracking
4. **Configure custom domain** (optional)
5. **Set up CI/CD pipeline** for automatic deployments

## Security Checklist

- ✅ Strong JWT secret in production
- ✅ CORS properly configured
- ✅ Environment variables secured
- ✅ Database access restricted
- ✅ API rate limiting (consider adding)
- ✅ Input validation on all endpoints
- ✅ HTTPS enforced

---

**Need Help?** Check the Vercel documentation or create an issue in the repository.