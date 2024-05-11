const {verifyToken} = require("../utils/jwt");

/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param next {Function}
 * @returns {Promise<void>}
 */
async function login(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const userInfo = await verifyToken(token);

            if (userInfo) {
                req.user = userInfo;

                next();
            } else {
                res.status(401).json({
                    message: 'Unauthorized',
                });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    } else {
        res.status(401).json({
            message: "Not logged"
        });
    }
}

module.exports = login;
