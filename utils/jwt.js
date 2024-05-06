const jwt = require('jsonwebtoken');

/**
 *
 * @type {string}
 */
const expirationTime = process.env.SESSION_DURATION || '1h';

/**
 * Generate a new JWT from username and email.
 * @param username {string}
 * @param idUser {number}
 * @returns {Promise<*>}
 */
async function generateToken(username, idUser) {
    return jwt.sign({ username, idUser }, process.env.TOKEN_SECRET, { expiresIn: expirationTime });
}

/**
 *
 * @param token {string}
 * @returns {Promise<boolean>}
 */
async function verifyToken(token) {
    const result = jwt.verify(token, process.env.TOKEN_SECRET, { expiresIn: expirationTime });

    return result.username != null;
}

module.exports = {
    generateToken,
    verifyToken
};
