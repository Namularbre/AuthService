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
 *         userLoggedOut:
 *           type: boolean
 *           description: Indicate if user is logged out
 *       example:
 *         idSession: 1
 *         token: 654156156156156135
 *         idUser: 1
 *         expirationDate: 2024-05-05T17:04:00.912Z
 *         userLoggedOut: false
 *       description: Represent a session of a user, so other apps don't have to send login & password everytime.
 */

/**
 * @swagger
 * tags:
 *   name: AuthService
 *   description: The auth service API
 * /login:
 *   post:
 *     summary: Create a new session if a valid one does not exist, and return the session user's id with a token
 *     tags: [Session]
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
 *                 message:
 *                   type: string|undefined
 *       400:
 *          description: Missing username or password
 *       401:
 *          description: Wrong username or password
 *       500:
 *          description: Some server error occurred
 */

/**
 * @swagger
 * tags:
 *   name: AuthService
 *   description: The auth service API
 * /verify:
 *   post:
 *     summary: Verify the token in authorization request header
 *     tags: [Session]
 *     security:
 *       - BearerAuth: []
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
 *     responses:
 *       200:
 *         description: Token and session verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logged:
 *                   type: boolean
 *                   description: true if user is logged, false if not
 *       400:
 *         description: Missing token or username in request payload
 *       401:
 *         description: Not logged or trying to verify another user
 *       500:
 *         description: Some server error occurred
 */

/**
 * @swagger
 * tags:
 *   name: AuthService
 *   description: The auth service API
 * /logout:
 *   put:
 *     summary: Log out the user
 *     tags: [Session]
 *     security:
 *       - BearerAuth: []
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
 *     responses:
 *       200:
 *         description: User logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message saying user is logged out
 *       400:
 *         description: Missing username in request payload
 *       401:
 *         description: User not logged or trying to log out another user
 *       500:
 *         description: Some server error occurred
 */
