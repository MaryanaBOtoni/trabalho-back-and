const asyncHandler = require("express-async-handler");

const ClientesModel = require('../models/ClientesModel');
//Home 
exports.index = asyncHandler(async(req, res, next) => {
    try {
        const clientes = await ClientesModel.getAllClientes();
        res.render('clientes', {dados: clientes})
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// Mostra o lista da clientes
exports.clientes_list = asyncHandler(async (req, res, next) => {
    res.send("ainda nao foi feito");
});

// Mostra o formulario para criar o cliente
exports.clientes_criar_form = asyncHandler(async(req, res, next) => {
    res.render('clienteForm');
});

// Realiza o cadastro do cliente 
exports.clientes_criar_handler = asyncHandler(async(req, res, next) => {
    res.render('clienteForm');
});

// mostra formulario de delete de cliente
exports.clientes_delete_form = asyncHandler(async(req, res, next) => {
    res.send("nao implementada");
});

//Realiza o delete do cliente
exports.clientes_delete_handler = asyncHandler(async(req, res, next) => {
    res.send("nao implementada");
});

// mostra formulario de update do cliente
exports.clientes_update_form = asyncHandler(async(req, res, next) => {
    res.send("nao implementada");
});

// Realiza o update do cliente
exports.clientes_update_handler = asyncHandler(async(req, res, next) => {
    res.send("nao implementada");
});
