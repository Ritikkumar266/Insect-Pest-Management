const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

console.log('🤖 CHATBOT ROUTES: Loading chatbot routes...');

/**
 * Chatbot API using your Crop Doctor AI Supabase function
 */
router.post('/chat', async (req, res) => {
  try {
    console.log('🤖 CHATBOT: New chat request received');
    
    const { message, conversationHistory = [], language = 'en' } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('💬 User message:', message);
    console.log('🌍 Language:', language);
    console.log('📚 Conversation history length:', conversationHistory.length);

    // Your Supabase credentials
    const supabaseUrl = process.env.CROP_DOCTOR_SUPABASE_URL;
    const supabaseKey = process.env.CROP_DOCTOR_SUPABASE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ 
        error: 'Chatbot service not configured. Please contact administrator.' 
      });
    }

    // Prepare conversation for AI with language-specific instructions
    const languageInstructions = {
      en: 'Respond in English.',
      es: 'Responde en español.',
      fr: 'Répondez en français.',
      hi: 'हिंदी में उत्तर दें।',
      zh: '用中文回答。'
    };

    const systemMessage = `You are AgroGuard AI Assistant, an expert agricultural advisor. Help farmers with:

🌱 CROP MANAGEMENT: Planting, growing, harvesting advice
🐛 PEST CONTROL: Identification, prevention, treatment methods  
🌿 DISEASE MANAGEMENT: Plant diseases, symptoms, solutions
🌾 FARMING TECHNIQUES: Best practices, organic methods
🌦️ WEATHER & SEASONS: Seasonal advice, climate considerations
🚜 EQUIPMENT & TOOLS: Farming equipment recommendations
💧 IRRIGATION: Water management, irrigation systems
🌱 SOIL HEALTH: Soil testing, fertilizers, composting

Be helpful, practical, and farmer-friendly. Provide actionable advice with specific steps. Include safety warnings for chemicals/pesticides. Use emojis to make responses engaging.

IMPORTANT: ${languageInstructions[language] || languageInstructions.en}`;

    const messages = [
      {
        role: 'system',
        content: systemMessage
      },
      // Add conversation history (last 5 messages for context)
      ...conversationHistory.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      // Add current user message
      {
        role: 'user',
        content: message
      }
    ];

    console.log('📤 Sending to Supabase function...');
    console.log('🔗 URL:', `${supabaseUrl}/functions/v1/pest-identify`);
    console.log('📝 Messages count:', messages.length);
    console.log('💬 User message:', message);

    // Call your Supabase function with SSL bypass for development
    const response = await axios.post(
      `${supabaseUrl}/functions/v1/pest-identify`,
      { 
        messages: messages,
        language: language
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`
        },
        timeout: 30000,
        responseType: 'text',
        // Bypass SSL certificate validation for development
        httpsAgent: process.env.NODE_ENV === 'development' ? 
          new (require('https').Agent)({ rejectUnauthorized: false }) : 
          undefined
      }
    );

    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', response.headers['content-type']);

    console.log('📥 Response received, parsing...');

    // Parse streaming response
    let aiResponse = '';
    const responseText = response.data;
    
    if (responseText) {
      const lines = responseText.split('\n');
      let fullContent = '';
      
      for (const line of lines) {
        if (line.startsWith('data: ') && !line.includes('[DONE]')) {
          try {
            const jsonStr = line.slice(6).trim();
            if (jsonStr && jsonStr !== '[DONE]') {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                fullContent += content;
              }
            }
          } catch (parseError) {
            continue;
          }
        }
      }
      
      aiResponse = fullContent || responseText;
    }

    if (!aiResponse || aiResponse.length < 5) {
      throw new Error('No response from AI service');
    }

    console.log('✅ CHATBOT: Response generated successfully');
    console.log('📝 Response length:', aiResponse.length);

    // Return the response
    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ CHATBOT ERROR:', error.message);
    console.error('❌ Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data?.substring(0, 200),
      config: {
        url: error.config?.url,
        method: error.config?.method
      }
    });
    
    // Provide helpful error responses
    let errorMessage = 'I apologize, but I\'m having trouble processing your request right now. ';
    
    if (error.response?.status === 401) {
      errorMessage += 'Authentication issue with AI service. Please contact administrator.';
    } else if (error.response?.status === 404) {
      errorMessage += 'AI service endpoint not found. Please contact administrator.';
    } else if (error.response?.status === 429) {
      errorMessage += 'Too many requests. Please wait a moment and try again.';
    } else if (error.message.includes('timeout')) {
      errorMessage += 'The service is taking longer than usual. Please try again in a moment.';
    } else if (error.message.includes('ECONNREFUSED')) {
      errorMessage += 'The AI service is temporarily unavailable. Please try again later.';
    } else {
      errorMessage += `Error: ${error.message}. Please try rephrasing your question.`;
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      debug: process.env.NODE_ENV === 'development' ? {
        originalError: error.message,
        status: error.response?.status
      } : undefined
    });
  }
});

/**
 * Image analysis endpoint for pest identification
 */
router.post('/analyze-image', upload.single('image'), async (req, res) => {
  try {
    console.log('📷 IMAGE ANALYSIS: New image analysis request');
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { message = 'Please analyze this image for pest identification', language = 'en', conversationHistory = '[]' } = req.body;
    
    console.log('📷 Image received:', {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    // Convert image to base64
    const imageBase64 = req.file.buffer.toString('base64');
    const imageDataUrl = `data:${req.file.mimetype};base64,${imageBase64}`;

    // Language instructions
    const languageInstructions = {
      en: 'Respond in English.',
      es: 'Responde en español.',
      fr: 'Répondez en français.',
      hi: 'हिंदी में उत्तर दें।',
      zh: '用中文回答。'
    };

    const systemMessage = `You are AgroGuard AI Assistant, an expert in agricultural pest identification and management. 

When analyzing images:
🔍 IDENTIFY: What pest, disease, or issue you see
🌱 CROP: What crop/plant is affected
⚠️ SEVERITY: How serious the problem is
🛡️ TREATMENT: Specific management recommendations
🕒 TIMING: When to take action
🌿 PREVENTION: How to prevent future occurrences

Be specific, practical, and provide actionable advice. If you can't clearly identify the pest/issue, explain what you see and suggest next steps.

IMPORTANT: ${languageInstructions[language] || languageInstructions.en}`;

    // Parse conversation history
    let parsedHistory = [];
    try {
      parsedHistory = JSON.parse(conversationHistory);
    } catch (e) {
      console.log('Could not parse conversation history');
    }

    const messages = [
      {
        role: 'system',
        content: systemMessage
      },
      // Add conversation history (last 3 messages for context)
      ...parsedHistory.slice(-3).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      // Add current message with image
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: message
          },
          {
            type: 'image_url',
            image_url: {
              url: imageDataUrl
            }
          }
        ]
      }
    ];

    console.log('📤 Sending image to AI service...');

    // Your Supabase credentials
    const supabaseUrl = process.env.CROP_DOCTOR_SUPABASE_URL;
    const supabaseKey = process.env.CROP_DOCTOR_SUPABASE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ 
        error: 'Image analysis service not configured. Please contact administrator.' 
      });
    }

    // Call your Supabase function
    const response = await axios.post(
      `${supabaseUrl}/functions/v1/pest-identify`,
      { 
        messages: messages,
        language: language,
        hasImage: true
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`
        },
        timeout: 45000, // Longer timeout for image analysis
        responseType: 'text',
        httpsAgent: process.env.NODE_ENV === 'development' ? 
          new (require('https').Agent)({ rejectUnauthorized: false }) : 
          undefined
      }
    );

    console.log('📥 Image analysis response received');

    // Parse streaming response
    let aiResponse = '';
    const responseText = response.data;
    
    if (responseText) {
      const lines = responseText.split('\n');
      let fullContent = '';
      
      for (const line of lines) {
        if (line.startsWith('data: ') && !line.includes('[DONE]')) {
          try {
            const jsonStr = line.slice(6).trim();
            if (jsonStr && jsonStr !== '[DONE]') {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                fullContent += content;
              }
            }
          } catch (parseError) {
            continue;
          }
        }
      }
      
      aiResponse = fullContent || responseText;
    }

    if (!aiResponse || aiResponse.length < 5) {
      throw new Error('No response from AI service');
    }

    console.log('✅ IMAGE ANALYSIS: Analysis completed successfully');

    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ IMAGE ANALYSIS ERROR:', error.message);
    
    let errorMessage = 'I apologize, but I\'m having trouble analyzing your image right now. ';
    
    if (error.message.includes('Only image files are allowed')) {
      errorMessage = 'Please upload a valid image file (JPG, PNG, etc.)';
    } else if (error.message.includes('File too large')) {
      errorMessage = 'Image file is too large. Please use an image smaller than 5MB.';
    } else if (error.response?.status === 429) {
      errorMessage += 'Too many requests. Please wait a moment and try again.';
    } else if (error.message.includes('timeout')) {
      errorMessage += 'Image analysis is taking longer than usual. Please try again.';
    } else {
      errorMessage += 'Please try uploading the image again or contact support.';
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Simple test endpoint
 */
router.post('/test', (req, res) => {
  console.log('🧪 TEST ENDPOINT: Received request');
  console.log('📝 Request body:', req.body);
  
  res.json({
    success: true,
    message: 'Chatbot backend is working!',
    receivedMessage: req.body.message || 'No message',
    timestamp: new Date().toISOString()
  });
});

/**
 * Get chatbot status/health check
 */
router.get('/status', (req, res) => {
  console.log('📊 STATUS ENDPOINT: Received request');
  const isConfigured = !!(process.env.CROP_DOCTOR_SUPABASE_URL && process.env.CROP_DOCTOR_SUPABASE_KEY);
  
  res.json({
    status: 'online',
    configured: isConfigured,
    supabaseUrl: process.env.CROP_DOCTOR_SUPABASE_URL ? 'Configured' : 'Missing',
    supabaseKey: process.env.CROP_DOCTOR_SUPABASE_KEY ? 'Configured' : 'Missing',
    features: [
      'Crop Management Advice',
      'Pest Identification Help', 
      'Disease Management',
      'Farming Best Practices',
      'Seasonal Guidance'
    ],
    timestamp: new Date().toISOString()
  });
});

console.log('🤖 CHATBOT ROUTES: Routes configured successfully');
module.exports = router;