var mysql2 = require('mysql2');
var connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'foodiedb'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
