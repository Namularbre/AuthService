const SessionModel = require('../models/sessionModel');
const UserModel = require('../models/userModel');
const {generateToken, verifyToken} = require('../utils/jwt');
const {nowPlusOneHour, isNotExpired} = require('../utils/dateTools');
const {compare} = require("../utils/hashing");

class SessionController {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async login(req, res) {
        const { username, password } = req.body;

        if (username && password) {
            try {
                const user = await UserModel.selectUserByUsername(username);

                if (await SessionController.#verifyUserPassword(user, password)) {
                    const session = await SessionController.#verifyUserSessionExistsAndIsNotExpired(user.idUser);

                    if (session) {
                        res.json({
                            sessionId: session.idSession,
                            token: session.token,
                        });
                    } else {
                        const {sessionId, token} = await SessionController.#createNewSession(user);

                        if (sessionId) {
                            res.json({
                                sessionId: sessionId,
                                token: token,
                            });
                        } else {
                            console.error("Error recovering a session");
                            res.status(500).json({
                                message: 'Internal server error',
                            });
                        }
                    }
                } else {
                    res.status(401).json({
                        message: 'Wrong username or password',
                    });
                }
            } catch (error) {
                console.error(error.message);
                res.status(500).json({
                    message: 'Internal server error',
                });
            }
        } else {
            res.status(400).json({message: 'Missing username or password in request payload'});
        }
    }

    /**
     *
     * @param user {Object}
     * @returns {Promise<{sessionId: number|null, token: string}>}
     * @private
     */
    static async #createNewSession(user) {
        const expirationDate = await nowPlusOneHour();
        const token = await generateToken(user.username, user.idUser);
        const sessionId = await SessionModel.create(user.idUser, token, expirationDate);

        return {sessionId, token};
    }

    /**
     *
     * @param idUser {number}
     * @returns {Promise<Object|null>}
     * @private
     */
    static async #verifyUserSessionExistsAndIsNotExpired(idUser) {
        const session = await SessionModel.sessionExists(idUser);

        if (session) {
            const expirationDate = new Date(session.expirationDate);
            if (await isNotExpired(expirationDate))
                return session;
        }
        return null;
    }

    /**
     *
     * @param user {object|null}
     * @param password {string}
     * @returns {Promise<boolean>}
     * @private
     */
    static async #verifyUserPassword(user, password) {
        if (user)
            return await compare(password, user.password);
        return false;
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async verify(req, res) {
        const authHeader = req.headers.authorization;
        const {username} = req.body;

        if (authHeader && username) {
            const token = authHeader.split(' ')[1];

            try {
                const userInformation = await verifyToken(token);

                if (userInformation.username === username) {
                    const sessionInformation = await SessionModel.sessionExists(userInformation.idUser);

                    if (sessionInformation) {
                        if (!sessionInformation.userLoggedOut && await isNotExpired(sessionInformation.expirationDate)) {
                            res.json({
                                logged: true,
                            });
                        } else {
                            res.json({
                                logged: false,
                            });
                        }
                    } else {
                        res.json({
                            logged: false,
                        });
                    }
                } else {
                    res.status(401).json({
                        message: 'Wrong user',
                    });
                }
            } catch (error) {
                console.error(error.message);
                res.status(500).json({
                    message: 'Internal server error',
                });
            }
        } else {
            res.status(400).json({
                message: "Missing username in request payload or not logged",
            });
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @returns {Promise<void>}
     */
    static async logout(req, res) {
        const { username } = req.body;

        if (username) {
            if (req.user.username === username) {
                const idUser = req.user.idUser;

                try {
                    const affectedRows = await SessionModel.logOutUser(idUser);

                    if (affectedRows) {
                        res.json({
                           message: 'User logged out',
                        });
                    } else {
                        res.status(500).json({
                            message: 'Internal server error',
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
            })
        }
    }
}

module.exports = SessionController;
