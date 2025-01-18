const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Log the password before hashing to see the input
  console.log('Password before hashing:', password);

  // Create a new user instance
  const user = new User({
    name,
    email,
    password,
  });

  // Save the user to the database
  await user.save();

  // Send a response
  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // Check if the user exists
//   const user = await User.findOne({ email });
//   if (!user) {
//     res.status(400);
//     throw new Error('User not found');
//   }

//   console.log('User found:', user);  // Log the user to ensure it's found

//   // Compare password with hashed password
//   const isMatch = await bcrypt.compare(password, user.password);
//   console.log('Password match:', isMatch);  // Log whether password matches

//   if (!isMatch) {
//     res.status(400);
//     throw new Error('Invalid credentials');
//   }

//   // Create a JWT token
//   const token = jwt.sign(
//     { userId: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: '30d' }
//   );

//   res.json({
//     token,
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//     },
//   });
// });

// Forgot password
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  console.log('User found:', user); // Log user details to see what is being fetched from DB

  // Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Password match:', isMatch); // Log password match result

  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  // Create a JWT token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});


// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Generate a password reset token (1 hour expiry)
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiration = Date.now() + 3600000;  // 1 hour expiration time

  // Save the reset token and expiration time in the user's document
  user.resetToken = resetToken;
  user.resetTokenExpiration = resetTokenExpiration;
  await user.save();

  // Set up the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password',   // Replace with your email password or app password
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the following link to reset your password:\n\nhttp://localhost:5000/api/auth/reset-password/${resetToken}\n\nThis link will expire in 1 hour.`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.json({ message: 'Password reset email sent successfully' });
  });
});

// Reset password route
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  // Find the user based on the token and check if it's expired
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },  // Token is valid only if expiration time is greater than now
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  // Hash the new password before saving
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  // Clear the reset token and expiration time
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;

  // Save the user with the new password
  await user.save();

  res.json({ message: 'Password reset successfully' });
});


// Logout user and clear the token
const logoutUser = asyncHandler(async (req, res) => {
  // Clear the token in a real-world scenario by removing it from the frontend or storing a blacklist
  res.json({ message: 'User logged out successfully' });
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
};
