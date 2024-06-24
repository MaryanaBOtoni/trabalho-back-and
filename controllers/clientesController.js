const asyncHandler = require("express-async-handler");
const ClientesModel = require('../models/ClientesModel');
const cache = require('../cache');

// Middleware para logging
const requestLogger = (req, res, next) => {
    console.log(`Recebida requisição para clientes: ${req.method} ${req.originalUrl}`);
    next();
};

// Endpoint para buscar clientes
exports.index = asyncHandler(async (req, res) => {
    try {
        // Verifica se há dados no cache
        const clientesCache = cache.get('clientes');
       
        if (!clientesCache) {
            // Se não houver cache, busca os clientes no banco de dados
            const clientes = await ClientesModel.getAllClientes();
            // Salva no cache por 30 segundos
            cache.set('clientes', clientes);
            console.log('Requisição para clientes: buscando no banco de dados');
            res.render('clientes', { dados: clientes });
        } else {
            // Se tiver cache, utiliza os dados do cache
            console.log('Requisição para clientes: utilizando cache');
            res.render('clientes', { dados: clientesCache });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


exports.clientes_criar_form = asyncHandler(async (req, res) => {
    res.render('clienteFormCreate');
});

exports.clientes_criar_handler = asyncHandler(async (req, res) => {
    try {
        ClientesModel.insertCliente(req.body);
        res.redirect('/clientes')
    } catch (error) {
        console.log(error);
    }
});

exports.clientes_delete_handler = asyncHandler(async (req, res) => {
    try {
        ClientesModel.deleteClienteById(req.params.id);
        res.redirect('/clientes')
    } catch (error) {
        console.log(error);
    }
});

exports.clientes_update_form = asyncHandler(async (req, res) => {
    try {
        let produto = await ClientesModel.getClienteById(req.params.id);
        res.render('clienteFormUpdate', { dados: produto });
    } catch (error) {
        console.log(error);
    }
});

exports.clientes_update_handler = asyncHandler(async (req, res) => {
    try {
        await ClientesModel.updateClienteById(req.params.id, req.body);
        res.redirect('/clientes')
    } catch (error) {
        console.log(error);
    }
});
