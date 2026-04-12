const nodemailer = require('nodemailer');

// ✅ Create transporter (FIXED)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // IMPORTANT
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  try {
    console.log('📧 Sending OTP to:', email);
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? "Loaded" : "Missing");
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? "Loaded" : "Missing");

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - Pest Management System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color: #4CAF50;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ OTP email sent:', info.messageId);
    return true;

  } catch (error) {
    console.error('❌ EMAIL ERROR:', error.message);
    return false;
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Pest Management System 🌾',
      html: `
        <h2>Welcome ${name}!</h2>
        <p>Your account has been created successfully.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);

    return true;
  } catch (error) {
    console.error('❌ Welcome email error:', error.message);
    return false;
  }
};

module.exports = { generateOTP, sendOTPEmail, sendWelcomeEmail };