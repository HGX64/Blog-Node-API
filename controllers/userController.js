const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { processAvatar } = require('../utils/fileUpload');

// Get all users (simplified version)
exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
        .select('name lastname email avatar role createdAt')
        .lean(); // 👈 For better performance

    res.json(users);
});

// Create user
exports.createUser = asyncHandler(async (req, res) => {
    const { name, lastname, email, password } = req.body;

    // Validate required fields
    if (!name || !lastname || !email || !password) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        lastname,
        email,
        password:hashed_password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        });
    }
});

// Get user by ID (with their posts)
exports.getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('-password -resetPasswordToken -resetPasswordExpire')
        .populate({
            path: 'posts',
            select: 'title content createdAt likes comments' // 👈 Select the fields you want from posts
        });
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    res.json(user);
});

// Update user
exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Prevent password update through this endpoint
    if (req.body.password) {
        delete req.body.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
});

// Delete user
exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    await user.deleteOne();
    res.status(200).json({ message: 'User deleted successfully' });
});

// Update user avatar
exports.updateAvatar = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('Please upload an image');
    }

    const filename = await processAvatar(req.file.buffer);
    
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { avatar: filename },
        { new: true }
    ).select('-password');

    res.json(user);
});