const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Production-ready CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://insect-pest-management.vercel.app', 'https://your-backend-domain.vercel.app']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AgroGuard Backend API is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/pests', require('./routes/pests'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/user', require('./routes/user'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/feedback', require('./routes/feedback'));

// Debug route to catch unmatched API calls
app.use('/api/*', (req, res) => {
  console.log('❌ UNMATCHED API ROUTE:', req.method, req.originalUrl);
  res.status(404).json({ 
    error: 'API endpoint not found', 
    method: req.method,
    url: req.originalUrl,
    availableRoutes: ['/api/auth', '/api/crops', '/api/pests', '/api/upload', '/api/user', '/api/chatbot', '/api/feedback']
  });
});

// Catch-all for non-API routes (return JSON instead of HTML)
app.use('*', (req, res) => {
  console.log('❌ UNMATCHED ROUTE:', req.method, req.originalUrl);
  res.status(404).json({ 
    error: 'Route not found', 
    method: req.method,
    url: req.originalUrl 
  });
});

const PORT = process.env.PORT || 5000;

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('📋 Available API routes:');
  console.log('  - /api/auth');
  console.log('  - /api/crops');
  console.log('  - /api/pests');
  console.log('  - /api/upload');
  console.log('  - /api/user');
  console.log('  - /api/chatbot');
  console.log('  - /api/feedback');
  console.log('✅ Backend ready for requests!');
});
