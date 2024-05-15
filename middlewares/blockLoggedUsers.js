/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param next {Function}
 * @returns {Promise<void>}
 */
async function blockLoggedUsers(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            message: 'Already logged in',
        });
    } else {
        next();
    }
}

module.exports = blockLoggedUsers;
