const db = require('../configs/database');
var moment = require('moment');

const Clientes = {
    getAllClientes: async function () {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM clientes', (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    getClienteById: async function (id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM clientes WHERE id = ?';
            db.query(sql, id, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    insertCliente: (data) => {
        let sql = 'INSERT INTO clientes(nome, sobrenome, email, idade, data_cadastro) VALUES (?, ?, ?, ?, ?)';
        var mysqlTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        db.query(sql, [data.nome, data.sobrenome, data.email, data.idade, mysqlTimestamp], function (err) {
            if (err) throw err;
            console.log("1 registro inserido");
        });
    },

    updateClienteById: async (id, data) => {
        console.log(data);
        let sql = 'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ?, data_cadastro = ? WHERE id = ?';
        var mysqlTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        db.query(sql, [data.nome, data.sobrenome, data.email, data.idade, mysqlTimestamp, id] , function (err) {
            if (err) throw err;
            console.log("1 registro alterado");
        });
    },

    deleteClienteById: async (id) => {
        let sql = 'DELETE FROM clientes WHERE id = ?';
        db.query(sql, id, function (err) {
            if (err) throw err;
            console.log("1 registro apagado com sucesso");
        });
    }

}

module.exports = Clientes;