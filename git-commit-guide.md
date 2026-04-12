# 📝 Git Commit Guide for Deployment

## Step 1: Check What Files Have Changed
```bash
git status
```

## Step 2: Add the New/Modified Files
```bash
# Add backend deployment files
git add backend/vercel.json
git add backend/server.js
git add backend/.env.production

# Add frontend API configuration
git add frontend/src/config/api.js
git add frontend/src/pages/AdminPanel.jsx

# Add documentation (optional)
git add DEPLOYMENT_GUIDE.md
git add update-api-urls.md
git add git-commit-guide.md
```

## Step 3: Commit the Changes
```bash
git commit -m "🚀 Prepare for production deployment

- Add Vercel configuration for backend deployment
- Update server.js with production-ready CORS and health checks
- Create centralized API configuration for frontend
- Update AdminPanel to use new API configuration
- Add deployment guides and documentation

Ready for backend deployment on Vercel!"
```

## Step 4: Push to GitHub
```bash
git push origin main
```
(Replace `main` with your branch name if different, e.g., `master`)

## Alternative: Add All Changes at Once
If you want to add all changes:
```bash
# Add all changes
git add .

# Commit
git commit -m "🚀 Production deployment setup - backend and frontend ready for Vercel"

# Push
git push origin main
```

## What Happens After Push:

### For Backend Deployment:
1. **Vercel will detect the changes** in your GitHub repo
2. **If you haven't deployed backend yet:**
   - Go to Vercel Dashboard
   - Import your GitHub repository
   - Set root directory to `backend`
   - Deploy

3. **If backend is already deployed:**
   - Vercel will automatically redeploy with the new changes

### For Frontend Deployment:
1. **Update the API URL** in `frontend/src/config/api.js` with your actual backend URL
2. **Commit and push that change**
3. **Vercel will automatically redeploy your frontend**

## Important Notes:

⚠️ **Don't commit `.env` files with sensitive data!**
- The `.env.production` file I created is just a template
- Set actual environment variables in Vercel Dashboard, not in code

✅ **Files safe to commit:**
- `vercel.json` - No sensitive data
- `server.js` - Updated configuration
- `frontend/src/config/api.js` - API endpoints only
- Documentation files

❌ **Never commit:**
- `backend/.env` - Contains sensitive keys
- `node_modules/` - Should be in `.gitignore`
- Any files with actual passwords/secrets

## Quick Checklist:
- [ ] Added `backend/vercel.json`
- [ ] Updated `backend/server.js`
- [ ] Added `frontend/src/config/api.js`
- [ ] Updated `frontend/src/pages/AdminPanel.jsx`
- [ ] Committed and pushed to GitHub
- [ ] Ready to deploy backend on Vercel
- [ ] Will update API URL after backend deployment
- [ ] Will commit and push API URL update