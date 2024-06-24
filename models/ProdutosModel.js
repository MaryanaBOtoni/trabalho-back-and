const db = require('../configs/database');
var moment = require('moment');


const Produtos = {
    getAllProdutos: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM produtos';
            db.query(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });

        });
    },


    getProdutoById: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM produtos WHERE id = ?';
            db.query(sql, id, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    insertProduto: (data) => {
        let sql = 'INSERT INTO produtos(nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)';
        var mysqlTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        db.query(sql, [data.nome, data.descricao, data.preco, mysqlTimestamp], function (err,) {
            if (err) throw err;
            console.log("1 registro inserido");
        });
    },

    updateProdutoById: async (id,  data) => {
        let sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?';
        var mysqlTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        db.query(sql, [data.nome, data.descricao, data.preco, mysqlTimestamp, id], function (err) {
            
            if (err) throw err;
            console.log("1 registro alterado");
        });
    },

    deleteProdutoById: async (id) => {
        let sql = 'DELETE FROM produtos WHERE id = ?';
        db.query(sql, id, function (err) {
            if (err) throw err;
            console.log("1 registro apagado com sucesso");
        });
    }

}

module.exports = Produtos;