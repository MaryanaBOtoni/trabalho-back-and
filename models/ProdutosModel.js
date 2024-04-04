const db = require('../configs/database');

const Produtos = {
    getAllClientes: async function() {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, nome, preco, data_atualizado FROM produtos', (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = Produtos;