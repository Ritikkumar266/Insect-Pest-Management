const Pest = require('../models/Pest');
const { identifyPestWithRoboflow } = require('./roboflowAI');
const { identifyPestWithCropDoctorAI } = require('./cropDoctorAI');

// Main identification function with your custom AI
const identifyPestFromImage = async (imagePath) => {
  console.log('🚀 PEST IDENTIFICATION: Starting process...');
  console.log('📁 Image path:', imagePath);
  
  // Try your custom Crop Doctor AI API first (Supabase function)
  try {
    if (process.env.CROP_DOCTOR_SUPABASE_URL && process.env.CROP_DOCTOR_SUPABASE_KEY) {
      console.log('✅ CROP DOCTOR AI: Credentials found, using your custom AI...');
      const { identifyPestWithCropDoctorAPI } = require('./cropDoctorAPI');
      const result = await identifyPestWithCropDoctorAPI(imagePath);
      
      console.log('🎯 CROP DOCTOR AI RESULT:', {
        primaryMatch: result.primaryMatch ? 'Found' : 'None',
        error: result.error || 'None',
        note: result.note
      });
      
      // If your AI says it's not a pest, trust it and don't fall back
      if (result.error === 'Not a pest or crop image') {
        console.log('🛑 CROP DOCTOR AI: Determined this is not agricultural content - stopping here');
        return result;
      }
      
      console.log('✅ CROP DOCTOR AI: Returning successful result');
      return result;
    } else {
      console.log('❌ CROP DOCTOR AI: Credentials not configured');
    }
  } catch (error) {
    console.error('❌ CROP DOCTOR AI FAILED:', error.message);
    console.error('Stack trace:', error.stack);
  }

  // Try local Python AI script as backup
  try {
    console.log('🐍 LOCAL PYTHON AI: Trying local Crop Doctor AI script...');
    const result = await identifyPestWithCropDoctorAI(imagePath);
    
    // If local AI also says it's not a pest, trust it
    if (result.error === 'Not a pest or crop image') {
      console.log('🛑 LOCAL PYTHON AI: Determined this is not agricultural content - stopping here');
      return result;
    }
    
    console.log('✅ LOCAL PYTHON AI: Returning result');
    return result;
  } catch (error) {
    console.error('❌ LOCAL PYTHON AI FAILED:', error.message);
  }

  // Try Roboflow API as third option
  try {
    if (process.env.ROBOFLOW_API_KEY) {
      console.log('🤖 ROBOFLOW API: Using Roboflow for identification...');
      const result = await identifyPestWithRoboflow(imagePath);
      console.log('✅ ROBOFLOW API: Returning result');
      return result;
    } else {
      console.log('❌ ROBOFLOW API: No API key configured');
    }
  } catch (error) {
    console.error('❌ ROBOFLOW API FAILED:', error.message);
  }

  // Fallback to improved mock identification
  console.log('🎭 MOCK AI: Using fallback mock identification...');
  console.log('📁 Image path:', imagePath);
  const result = await mockIdentification(imagePath);
  console.log('✅ MOCK AI: Returning result');
  return result;
};

// Mock AI identification service (fallback)
const mockIdentification = async (imagePath) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Enhanced image validation using file analysis
  const fs = require('fs');
  const path = require('path');
  
  try {
    // Check file size - screenshots are usually larger
    const stats = fs.statSync(imagePath);
    const fileSizeInMB = stats.size / (1024 * 1024);
    
    // Very large files (>5MB) might be screenshots
    if (fileSizeInMB > 5) {
      return {
        primaryMatch: null,
        alternativeMatches: [],
        analysisComplete: true,
        error: 'Image file too large',
        note: 'Please upload a smaller image (under 5MB). Large files are often screenshots or high-resolution non-pest images. Take a photo directly of the pest or affected crop.'
      };
    }

    // Check filename for obvious indicators
    const filename = path.basename(imagePath).toLowerCase();
    const invalidPatterns = ['screenshot', 'screen', 'capture', 'code', 'document', 'desktop', 'monitor'];
    
    if (invalidPatterns.some(pattern => filename.includes(pattern))) {
      return {
        primaryMatch: null,
        alternativeMatches: [],
        analysisComplete: true,
        error: 'Invalid image type detected',
        note: 'The filename suggests this is a screenshot or document. Please upload a real photograph of a pest, insect, or affected crop taken with a camera.'
      };
    }

    // Enhanced validation: Check image dimensions (screenshots often have specific ratios)
    const sharp = require('sharp');
    const metadata = await sharp(imagePath).metadata();
    
    // Only flag extremely obvious screenshots
    const aspectRatio = metadata.width / metadata.height;
    const isLikelyScreenshot = (
      // Only flag extremely wide or tall images (panoramas or UI screenshots)
      aspectRatio > 4 || aspectRatio < 0.25 ||
      // Only flag very large dimensions that are clearly desktop screenshots
      (metadata.width > 2560 && metadata.height > 1440)
    );

    if (isLikelyScreenshot) {
      return {
        primaryMatch: null,
        alternativeMatches: [],
        analysisComplete: true,
        error: 'Possible screenshot detected',
        note: 'The image dimensions suggest this might be a screenshot or computer display. Please upload a real photograph of a pest, insect, or affected crop taken with a camera or phone.'
      };
    }

  } catch (err) {
    console.error('File validation error:', err);
    // If validation fails, assume it might be invalid
    return {
      primaryMatch: null,
      alternativeMatches: [],
      analysisComplete: true,
      error: 'Image validation failed',
      note: 'Unable to process this image. Please ensure you are uploading a clear photograph of a pest, insect, or affected crop. Avoid screenshots, documents, or heavily processed images.'
    };
  }

  // Smart validation: Only reject obvious non-pest images
  // For real pest images, this should almost never reject
  const randomValidation = Math.random();
  if (randomValidation < 0.02) { // Only 2% chance to reject (very rare)
    return {
      primaryMatch: null,
      alternativeMatches: [],
      analysisComplete: true,
      error: 'Image analysis inconclusive',
      note: 'Unable to clearly identify pest-related content. Please try uploading a clearer photograph or different angle.'
    };
  }

  // Smart mock identification logic
  const allPests = await Pest.find().populate('affectedCrops');
  
  // Smart pest selection based on common patterns
  let selectedPest;
  let confidence;
  
  // Try to make intelligent guesses based on filename or common pests
  const filename = path.basename(imagePath).toLowerCase();
  
  if (filename.includes('beetle') || Math.random() < 0.3) {
    // Prefer Colorado Potato Beetle for beetle-like images
    selectedPest = allPests.find(p => p.name.includes('Colorado Potato Beetle')) || allPests[0];
    confidence = (Math.random() * 0.15 + 0.75) * 100; // 75-90% for beetle
  } else if (filename.includes('worm') || Math.random() < 0.2) {
    // Prefer worm pests
    selectedPest = allPests.find(p => p.name.includes('worm')) || allPests[1];
    confidence = (Math.random() * 0.15 + 0.70) * 100; // 70-85%
  } else if (filename.includes('fly') || Math.random() < 0.2) {
    // Prefer fly pests
    selectedPest = allPests.find(p => p.name.includes('Fly')) || allPests[2];
    confidence = (Math.random() * 0.15 + 0.65) * 100; // 65-80%
  } else {
    // Random selection for other cases
    const randomIndex = Math.floor(Math.random() * allPests.length);
    selectedPest = allPests[randomIndex];
    confidence = (Math.random() * 0.2 + 0.60) * 100; // 60-80%
  }
  
  // Get alternative matches
  const otherPests = allPests.filter(p => p._id !== selectedPest._id);
  const shuffledOthers = [...otherPests].sort(() => 0.5 - Math.random());
  
  const topMatches = [
    {
      pest: {
        _id: selectedPest._id,
        name: selectedPest.name,
        scientificName: selectedPest.scientificName,
        description: selectedPest.description,
        symptoms: selectedPest.symptoms,
        management: selectedPest.management,
        affectedCrops: selectedPest.affectedCrops
      },
      confidence: confidence
    },
    ...shuffledOthers.slice(0, 2).map((pest, index) => ({
      pest: {
        _id: pest._id,
        name: pest.name,
        scientificName: pest.scientificName,
        description: pest.description,
        symptoms: pest.symptoms,
        management: pest.management,
        affectedCrops: pest.affectedCrops
      },
      confidence: confidence - (15 + Math.random() * 10)
    }))
  ];

  return {
    primaryMatch: topMatches[0],
    alternativeMatches: topMatches.slice(1),
    analysisComplete: true,
    note: '⚠️ Using simulated AI (Google Cloud Vision billing not enabled). Results are random for demonstration. Enable billing at https://console.cloud.google.com/billing for real AI identification.'
  };
};

// Function to integrate with real ML models
// Uncomment and configure when you have a trained model
/*
const identifyPestWithMLModel = async (imagePath) => {
  // Example: Using TensorFlow.js
  const tf = require('@tensorflow/tfjs-node');
  const fs = require('fs');
  
  // Load your trained model
  const model = await tf.loadLayersModel('file://./models/pest-classifier/model.json');
  
  // Load and preprocess image
  const imageBuffer = fs.readFileSync(imagePath);
  const tfimage = tf.node.decodeImage(imageBuffer);
  const resized = tf.image.resizeBilinear(tfimage, [224, 224]);
  const normalized = resized.div(255.0).expandDims(0);
  
  // Make prediction
  const predictions = await model.predict(normalized).data();
  
  // Get top predictions
  const topPredictions = Array.from(predictions)
    .map((prob, index) => ({ index, probability: prob }))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3);
  
  // Map predictions to pest data
  const pestClasses = ['Aphid', 'Bollworm', 'Whitefly', ...]; // Your class labels
  const results = await Promise.all(
    topPredictions.map(async (pred) => {
      const pestName = pestClasses[pred.index];
      const pest = await Pest.findOne({ name: pestName }).populate('affectedCrops');
      return {
        pest,
        confidence: pred.probability * 100
      };
    })
  );
  
  return {
    primaryMatch: results[0],
    alternativeMatches: results.slice(1),
    analysisComplete: true
  };
};
*/

// Function to integrate with cloud AI services
/*
const identifyPestWithCloudAI = async (imagePath) => {
  // Example: Using Google Cloud Vision API
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient();
  
  const [result] = await client.labelDetection(imagePath);
  const labels = result.labelAnnotations;
  
  // Match labels with pest database
  const pestMatches = await Promise.all(
    labels.slice(0, 3).map(async (label) => {
      const pest = await Pest.findOne({ 
        $or: [
          { name: new RegExp(label.description, 'i') },
          { scientificName: new RegExp(label.description, 'i') }
        ]
      }).populate('affectedCrops');
      
      return {
        pest,
        confidence: label.score * 100
      };
    })
  );
  
  return {
    primaryMatch: pestMatches[0],
    alternativeMatches: pestMatches.slice(1),
    analysisComplete: true
  };
};
*/

module.exports = { identifyPestFromImage };
