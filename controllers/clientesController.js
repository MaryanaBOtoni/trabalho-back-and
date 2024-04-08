const asyncHandler = require("express-async-handler");

const ClientesModel = require('../models/ClientesModel');
//Home 
exports.index = asyncHandler(async (req, res) => {
    try {
        const clientes = await ClientesModel.getAllClientes();
        res.render('clientes', { dados: clientes })
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
