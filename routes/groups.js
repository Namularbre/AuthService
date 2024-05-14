/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *          - name
 *       properties:
 *         idGroup:
 *           type: number
 *           description: The auto-generated id of the group
 *         name:
 *           type: string
 *           description: The name of the group
 *       example:
 *         idGroup: 1
 *         name: file_sharing
 *       description: The groups cannot be modified with any APIs because they define the privileges of users.
 */

/**
 * @swagger
 * tags:
 *   name: AuthService
 *   description: The auth service API
 * /groups-users/{groupName}/check:
 *   get:
 *     summary: Indicate if current user is in group (use the user token, only the user can see in what group he/she is)
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: groupName
 *         schema:
 *            type: string
 *         required: true
 *         description: Name of the group
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A boolean indicating if user is in group or not
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isInGroups:
 *                   type: boolean
 *       400:
 *          description: Missing username
 *       401:
 *          description: You are not logged
 *       404:
 *          description: Group not found
 *       500:
 *         description: Some server error occurred
 */
