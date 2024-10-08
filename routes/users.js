/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          - username
 *          - password
 *       properties:
 *         idUser:
 *           type: number
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         idUser: 1
 *         username: bob
 *         password: 1234
 *       description: The users of all other APIs
 */

/**
 * @swagger
 * tags:
 *   name: AuthService
 *   description: The auth service API
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               plainPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idUser:
 *                   type: number
 *       500:
 *         description: Some server error occurred
 *       402:
 *          description: Missing username or password
 *       400:
 *          description: User already exists
 */

/**
 * @swagger
 * tags:
 *   name: AuthService
 *   description: The auth service API
 * /delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Message indicating that user is deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idUser:
 *                   type: number
 *       500:
 *         description: Some server error occurred
 *       402:
 *          description: Missing username
 *       404:
 *          description: User doesn't exist
 *       401:
 *          description: You are not logged
 */

/**
 * @swagger
 * tags:
 *   name: AuthService
 *   description: The auth service API
 * /groups:
 *   get:
 *     summary: Get all the groups of the user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of groups of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groups:
 *                   type: array
 *       400:
 *          description: Missing username
 *       401:
 *          description: You are not logged or trying to see group of another user
 *       404:
 *          description: User doesn't exist
 *       500:
 *         description: Some server error occurred
 */
