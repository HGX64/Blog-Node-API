/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: User's name
 *         lastname:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         avatar:
 *           type: string
 *           description: URL to user's avatar
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: User's role
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Post title
 *         content:
 *           type: string
 *           description: Post content
 *         author:
 *           type: string
 *           description: Reference to User ID
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of categories
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of tags
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who liked the post
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID who made the comment
 *               content:
 *                 type: string
 *                 description: Comment content
 *               createdAt:
 *                 type: string
 *                 format: date-time
 */ 