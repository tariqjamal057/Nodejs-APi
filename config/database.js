const mysql = require("mysql2");

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'greverence_app',
    password: 'Jamal@123',
    port: '3300'
});
db.connect();

module.exports = db;