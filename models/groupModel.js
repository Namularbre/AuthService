const db = require('../utils/db');

class GroupModel {
    /**
     *
     * @param idUser {number}
     * @param idGroup {number}
     * @returns {Promise<boolean>}
     */
    static async userIsInGroup(idUser, idGroup) {
        let conn;
        let result = [];

        try {
            conn = await db.getConnection();
            result = await conn.query(`SELECT idUser, idGroup FROM groups_users WHERE idUser = ? AND idGroup = ?`,
                [idUser, idGroup]);
        } catch (error) {
            console.error(error.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }

        return result.length !== 0;
    }

    /**
     *
     * @param groupName {string}
     * @returns {Promise<Object|null>}
     */
    static async getGroup(groupName) {
        let conn;
        let result = [];

        try {
            conn = await db.getConnection();

            result = await conn.query(`SELECT idGroup, name FROM \`groups\` WHERE name = ?;`,
                [groupName]);
        } catch (err) {
            console.error(err.message);
            throw new Error("DB_ERROR");
        } finally {
            if (conn) await conn.release();
        }

        return (result.length !== 0) ? result[0] : null;
    }
}

module.exports = GroupModel;
