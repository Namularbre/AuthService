const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DBHOST || 'localhost',
    database: process.env.DBNAME || 'auth',
    user: process.env.DBUSER || 'namu',
    password: process.env.DBPASSWORD || '1234',
    connectionLimit: 5
});

module.exports = pool;
