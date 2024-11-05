const userController = require('../controllers/userController');
const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 * 
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved
 *       401:
 *         description: Not authorized
 * 
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 * 
 * /users/avatar:
 *   patch:
 *     summary: Update user avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file (jpg, png, etc.) max 5MB
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                   description: Filename of the uploaded avatar
 *       400:
 *         description: No image uploaded or invalid file type
 *       401:
 *         description: Not authorized
 */

router.get("/", protect, userController.getAllUsers);
router.get("/:id", protect, userController.getUserById);
router.patch('/avatar', protect, upload.single('avatar'), userController.updateAvatar);

module.exports = router;