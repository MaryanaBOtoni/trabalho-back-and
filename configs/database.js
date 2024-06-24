const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10, // número máximo de conexões simultâneas
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'projeto express' // nome do banco de dados 
});

module.exports = pool;

