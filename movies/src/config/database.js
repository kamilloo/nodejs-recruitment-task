require('dotenv').config();
const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;



module.exports = {
    db: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    },
    listPerPage: 10,
};