const db = require("../utils/db");

class UserModel {
    /**
     *
     * @param username {string}
     * @param password {string}
     * @returns {Promise<number|null>}
     */
    static async create(username, password) {
        let conn;
        let rows;

        try {
            conn = await db.getConnection();

            rows = await conn.query(`INSERT INTO users (username, password) VALUES (?, ?)`,
                [username, password]);
        } catch (err) {
            console.error(err.message);
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
     * @param username {string}
     * @returns {Promise<number|null>}
     */
    static async usernameExists(username) {
        let conn;
        let result;

        try {
            conn = await db.getConnection();

            result = await conn.query(`SELECT idUser, username FROM users WHERE username = ?;`,
                [username]);
        } catch (err) {
            console.error(err.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }

        if (result) {
            if (result[0]) {
                return result[0].idUser;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    /**
     *
     * @param username {string}
     * @returns {Promise<Object|null>}
     */
    static async selectUserByUsername(username) {
        let conn;
        let result;

        try {
            conn = await db.getConnection();

            result = await conn.query(`SELECT idUser, username, password FROM users WHERE username = ?;`,
                [username]);
        } catch (error) {
            console.error(error.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }

        if (result[0])
            return result[0];
        return null;
    }

    /**
     *
     * @param idUser {number}
     * @returns {Promise<number|null>}
     */
    static async deleteUser(idUser) {
        let conn;
        let rows;

        try {
            conn = await db.getConnection();

            await conn.beginTransaction();

            rows = await conn.query(`DELETE FROM sessions WHERE idUser = ?;`,
                [idUser]);

            rows = await conn.query(`DELETE FROM users WHERE idUser = ?;`,
                [idUser]);

            await conn.commit();
        } catch (error) {
            console.error(error.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }

        if (rows) {
            return parseInt(rows.affectedRows);
        }
        return null;
    }

    /**
     *
     * @param idUser {number}
     * @returns {Promise<Object[]>}
     */
    static async getGroups(idUser) {
        let conn;
        let result = [];

        try {
            conn = await db.getConnection();

            result = await conn.query(`SELECT name FROM groups g INNER JOIN groups_users gu ON (g.idGroup=gu.idGroup) WHERE idUser = ?;`,
                [idUser]);
        } catch (error) {
            console.error(error.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }

        return result;
    }
}

module.exports = UserModel;
