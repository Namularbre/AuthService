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
 * @returns {Promise<*|undefined>}
 */
async function generateToken(username, idUser) {
    return jwt.sign({ username, idUser }, process.env.TOKEN_SECRET, { expiresIn: expirationTime });
}

/**
 * Check if the token is valid, and return the user information linked to the token (username + id)
 * @param token {string}
 * @returns {Promise<{idUser: number, username: string, iat: number, exp: number}>}
 */
async function verifyToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET, { expiresIn: expirationTime });
}

module.exports = {
    generateToken,
    verifyToken
};
