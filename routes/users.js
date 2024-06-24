const express = require('express');
const router = express.Router();


// Rota GET para listar usuários
router.get('/', function(req, res) {
     // Lógica para buscar e retornar os usuários do banco de dados
    res.send('lista de usuarios');
});

module.exports = router;
