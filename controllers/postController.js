const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');

// Get all posts with pagination and filters
exports.getAllPosts = asyncHandler(async (req, res) => {
    const { 
        page = 1, 
        limit = 10, 
        sort = '-createdAt',
        search 
    } = req.query;

    const query = {};

    // Search in title and content
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } }
        ];
    }

    const posts = await Post.find(query)
        .populate('author', 'name lastname avatar')
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select('-__v');

    const count = await Post.countDocuments(query);

    res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalPosts: count
    });
});

// Get post by ID
exports.getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate('author', 'name lastname avatar')
        .populate({
            path: 'comments.user',
            select: 'name lastname avatar'
        });

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    res.json(post);
});

// Create post
exports.createPost = asyncHandler(async (req, res) => {
    const { title, content, categories, tags } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error('Please provide title and content');
    }

    const post = await Post.create({
        title,
        content,
        author: req.user._id,
        categories,
        tags
    });

    res.status(201).json(post);
});

// Update post
exports.updatePost = asyncHandler(async (req, res) => {
    let post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    // Check post ownership
    if (post.author.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to update this post');
    }

    post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    ).populate('author', 'name lastname avatar');

    res.json(post);
});

// Delete post
exports.deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    // Check post ownership or admin role
    if (post.author.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to delete this post');
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
});

// Like post
exports.likePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    // Check if already liked
    if (post.likes.includes(req.user._id)) {
        res.status(400);
        throw new Error('Post already liked');
    }

    post.likes.push(req.user._id);
    await post.save();

    res.json({ likes: post.likes.length });
});

// Unlike post
exports.unlikePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    // Remove like
    post.likes = post.likes.filter(
        like => like.toString() !== req.user._id.toString()
    );
    
    await post.save();

    res.json({ likes: post.likes.length });
});

// Get posts by user
exports.getUserPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const posts = await Post.find({ author: req.params.userId })
        .populate('author', 'name lastname avatar')
        .sort('-createdAt')
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const count = await Post.countDocuments({ author: req.params.userId });

    res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalPosts: count
    });
});

// Get posts by category
exports.getPostsByCategory = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const category = req.params.category;

    const posts = await Post.find({ categories: category })
        .populate('author', 'name lastname avatar')
        .sort('-createdAt')
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const count = await Post.countDocuments({ categories: category });

    res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalPosts: count
    });
});

// Get posts by tag
exports.getPostsByTag = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const tag = req.params.tag;

    const posts = await Post.find({ tags: tag })
        .populate('author', 'name lastname avatar')
        .sort('-createdAt')
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const count = await Post.countDocuments({ tags: tag });

    res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalPosts: count
    });
});

// Add comment
exports.addComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    const comment = {
        user: req.user._id,
        content: req.body.content,
        createdAt: Date.now()
    };

    post.comments.push(comment);
    await post.save();

    // Get populated comment
    const populatedPost = await Post.findById(post._id)
        .populate({
            path: 'comments.user',
            select: 'name lastname avatar'
        });

    const newComment = populatedPost.comments[populatedPost.comments.length - 1];

    res.status(201).json(newComment);
});

// Update comment
exports.updateComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
        res.status(404);
        throw new Error('Comment not found');
    }

    if (comment.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this comment');
    }

    comment.content = req.body.content;
    await post.save();

    res.json(comment);
});

// Delete comment
exports.deleteComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
        res.status(404);
        throw new Error('Comment not found');
    }

    if (comment.user.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to delete this comment');
    }

    comment.deleteOne();
    await post.save();

    res.json({ message: 'Comment deleted successfully' });
});