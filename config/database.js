const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'bo6j9vxbokcmj3tmsd2e-mysql.services.clever-cloud.com',
    user: 'uhy07diumnxfr5s4',
    database: 'bo6j9vxbokcmj3tmsd2e',
    password: '9Zg9tFffPWeZsu0B2M1s',
    port: '3306'
});
db.connect();

module.exports = db;