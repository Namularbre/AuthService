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
                    message: 'Internal server error',
                });
            }
        } else {
            res.status(402).json({
                message: 'Missing username and password',
            });
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async delete(req, res) {
        const { username } = req.body;

        if (username) {
            if (req.user.username === username) {
                try {
                    const dbUser = await UserModel.selectUserByUsername(username);

                    if (dbUser) {
                        const idUser = dbUser.idUser;

                        const affectedRows = await UserModel.deleteUser(idUser);

                        if (affectedRows) {
                            req.user = null;
                            req.headers.authorization = null;

                            res.status(200).json({
                                message: 'User deleted',
                            });
                        } else {
                            res.status(500).json({
                                message: 'Internal server error',
                            });
                        }
                    } else {
                        res.status(404).json({
                            message: 'Not found',
                        });
                    }
                } catch (error) {
                    console.error(error.message);
                    res.status(500).json({
                        message: 'Internal server error',
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Wrong user',
                });
            }
        } else {
            res.status(402).json({
                message: 'Missing username in request payload',
            });
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async getGroups(req, res) {
        const username = req.user.username;

        if (username) {
            if (req.user.username === username) {
                try {
                    const idUser = await UserModel.usernameExists(username);

                    if (idUser) {
                        const groups = await UserModel.getGroups(idUser);
                        res.json({
                            groups,
                        });
                    } else {
                        res.status(404).json({
                            message: 'User not found',
                        });
                    }
                } catch (error) {
                    console.error(error.message);
                    res.status(500).json({
                        message: 'Internal server error',
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Wrong user',
                });
            }
        } else {
            res.status(400).json({
                message: 'Missing username in request payload',
            });
        }
    }
}

module.exports = UserController;
