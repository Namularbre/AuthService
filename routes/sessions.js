/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *          - idUser
 *          - token
 *          - expirationDate
 *       properties:
 *         idSession:
 *           type: number
 *           description: The auto-generated id of the session
 *         token:
 *           type: string
 *           description: The token of the session
 *         idUser:
 *           type: number
 *           description: The id of the user session
 *         expirationDate:
 *           type: Date
 *           description: Expiration date of the session
 *       example:
 *         idSession: 1
 *         token: 654156156156156135
 *         idUser: 1
 *         expirationDate: 2024-05-05T17:04:00.912Z
 */

/**
 * @swagger
 * tags:
 *   name: AuthService
 *   description: The auth service API
 * /login:
 *   post:
 *     summary: Create a new session if a valid one does not exist, and return the session user's id with a token
 *     tags: [AuthService]
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user id and the token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idUser:
 *                   type: number
 *                 token:
 *                   type: string
 *       500:
 *          description: Some server error occurred
 *       402:
 *          description: Missing username or password
 *       404:
 *          description: Username not found
 *       401:
 *          description: Wrong username or password
 */

/**
 * @swagger
 * tags:
 *   name: AuthService
 *   description: The auth service API
 * /verify:
 *   post:
 *     summary: Verify the token in authorization request header
 *     tags: [AuthService]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Token verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logged:
 *                   type: boolean
 *                   description: Indicates whether the token is valid
 *       400:
 *         description: Missing token in request payload
 *       500:
 *         description: Some server error occurred
 */
