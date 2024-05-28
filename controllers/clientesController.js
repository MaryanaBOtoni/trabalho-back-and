const asyncHandler = require("express-async-handler");
const ClientesModel = require('../models/ClientesModel');
const cache = require('../cache');

//Home 
exports.index = asyncHandler(async (req, res) => {
    try {
        // pega clientes
        const clientes = await ClientesModel.getAllClientes();
        // pega o cache de clientes
        const clientesCache = cache.get('clientes');

        // se existir nao existir o cache de clientes
        if (!clientesCache) { 

            // vai pegar e setar o cache de cliente
             cache.set('clientes', clientes);
            
             // vai voltar que nao existia o cache
            console.log('nao cache')

            // volta os dados da requisição 
            res.render('clientes', {
                dados: clientes
            })
        } else {
            
            // volta que o que esta voltando é o cache
            console.log("cache");

            // volta os dados do cache 
            res.render('clientes', {
                dados: clientesCache
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
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
        let cliente = await ClientesModel.getClienteById(req.params.id);
        res.render('clienteFormUpdate', {
            dados: cliente
        });
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