const mysql = require('mysql');

const connection = mysql.createConnection ({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"clientes",
});

connection.connect(function(err) {
    if(err) {
        console.error('error connecting ' + err.stack);
        return;
    }

    console.log('conectado com id ' + connection.threadId);
});

module.exports = connection;