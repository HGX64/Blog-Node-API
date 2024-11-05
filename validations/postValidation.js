const { body } = require('express-validator');

exports.createPostValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long'),
    body('categories')
        .optional()
        .isArray().withMessage('Categories must be an array'),
    body('tags')
        .optional()
        .isArray().withMessage('Tags must be an array')
];

exports.commentValidation = [
    body('content')
        .trim()
        .notEmpty().withMessage('Comment content is required')
        .isLength({ min: 1, max: 1000 }).withMessage('Comment must be between 1 and 1000 characters')
]; 