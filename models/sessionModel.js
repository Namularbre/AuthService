const db = require("../utils/db");

class SessionModel {
    /**
     *
     * @param idUser {number}
     * @param token {string}
     * @param expirationDate {Date}
     * @returns {Promise<number|null>}
     */
    static async create(idUser, token, expirationDate) {
        let conn;
        let rows;

        try {
            conn = await db.getConnection();

            rows = await db.query(`INSERT INTO sessions (idUser, token, expirationDate) VALUES (?, ?, ?)`,
                [idUser, token, expirationDate]);
        } catch (error) {
            console.error(error.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }

        if (rows)
            return parseInt(rows.insertId);
        return null;
    }

    /**
     *
     * @param idUser {number}
     * @returns {Promise<*|null>}
     */
    static async sessionExists(idUser) {
        let conn;
        let result;

        try {
            conn = await db.getConnection();
            result = await conn.query(`SELECT idSession, idUser, token, expirationDate FROM sessions WHERE idUser = ?;`,
                [idUser]);
        } catch (error) {
            console.error(error.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }

        if (result)
            return result[0];
        return null;
    }
}

module.exports = SessionModel;
