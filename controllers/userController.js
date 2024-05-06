const UserModel = require('../models/userModel');
const {hash} = require("../utils/hashing");

class UserController {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async register(req, res) {
        const { username, plainPassword } = req.body;

        if (username && plainPassword) {
            try {
                const dbUserId = await UserModel.usernameExists(username);
                if (!dbUserId) {
                    const password = await hash(plainPassword);
                    const userId = await UserModel.create(username, password);

                    res.json({
                        message: 'Registered',
                        idUser: userId,
                    });
                } else {
                    res.status(400).json({
                        message: `User already exists`,
                    });
                }
            } catch (error) {
                console.error(error.message);
                res.status(500).json({
                    message: 'Internal server error'
                });
            }
        } else {
            res.status(402).json({
                message: 'Missing username and password'
            });
        }
    }
}

module.exports = UserController;
