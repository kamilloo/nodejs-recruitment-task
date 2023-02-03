var mysql = require('mysql2');
var migration = require('mysql-migrations');
const config = require('../config/database');

var connection = mysql.createPool(config.db);

migration.init(connection, __dirname + '/../databases/migrations', function() {
    console.log("Finished running migrations");
});
