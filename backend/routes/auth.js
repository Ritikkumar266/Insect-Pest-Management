const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role: role || 'user' });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      token, 
      user: { id: user._id, name, email, role: user.role },
      message: 'Registration successful!'
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('\n🔍 Login attempt:');
    console.log('Email received:', `"${email}"`);
    console.log('Password received:', `"${password}"`);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('✅ User found:', user.name, user.role);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔐 Password match:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Login successful for:', user.email);

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
