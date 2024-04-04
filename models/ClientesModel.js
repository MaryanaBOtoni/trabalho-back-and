const db = require('../configs/database');

const Clientes = {
    getAllClientes: async function() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM clientes', (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = Clientes;