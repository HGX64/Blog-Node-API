const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay artificial
        res.status(401);
        throw new Error('Invalid credentials');
    }

    // Generate JWT token properly
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    // Set cookie for all clients
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: '/'
    });

    // Send response
    res.json({
        success: true,
        token,
        user: {
            _id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        }
    });
});

// Logout user
exports.logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

// Get current user profile
exports.getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
    });
});

// Generate JWT
const generateToken = (userId) => {
    return crypto.randomBytes(32).toString('hex');
};

// Set JWT cookie
const setSecureCookie = (res, token) => {
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
        domain: process.env.COOKIE_DOMAIN
    });
};

// Refresh token
exports.refreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error('No token provided');
    }

    try {
        // Verify existing token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Generate new token
        const newToken = generateToken(decoded.id);
        
        // Set new cookie
        setTokenCookie(res, newToken);

        res.json({ message: 'Token refreshed successfully' });
    } catch (error) {
        res.status(401);
        throw new Error('Invalid token');
    }
});

// Forgot Password
exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Create reset url
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
        You requested a password reset. Please go to this link to reset your password:
        ${resetUrl}
        
        If you didn't request this, please ignore this email.
    `;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message
        });

        res.json({ message: 'Reset password email sent' });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(500);
        throw new Error('Email could not be sent');
    }
});

// Reset Password
exports.resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    // Hash token from params
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    // Find user with valid token
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired reset token');
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();

    // Log user in
    const newToken = generateToken(user._id);
    setTokenCookie(res, newToken);

    res.json({ message: 'Password reset successful' });
});

// Update Password
exports.updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    if (!(await user.comparePassword(currentPassword))) {
        res.status(401);
        throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Log user in with new password
    const token = generateToken(user._id);
    setTokenCookie(res, token);

    res.json({ message: 'Password updated successfully' });
});

// Sanitize user data
const sanitizeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
});