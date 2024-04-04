const asyncHandler = require("express-async-handler");

const ProdutosModel = require('../models/ProdutosModel');
//Home 
exports.index = asyncHandler(async(req, res, next) => {
    try {
        const produtos = await ProdutosModel.getAllClientes();
        res.render('produtos', {dados: produtos})
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// Mostra o lista da clientes
exports.produtos_list = asyncHandler(async (req, res, next) => {
    res.send("ainda nao foi feito");
});

// Mostra o formulario para criar o cliente
exports.produtos_criar_form = asyncHandler(async(req, res, next) => {
    res.render('produtosForm');
});

// Realiza o cadastro do cliente 
exports.produtos_criar_handler = asyncHandler(async(req, res, next) => {
    res.render('produtosForm');
});

// mostra formulario de delete de cliente
exports.produtos_delete_form = asyncHandler(async(req, res, next) => {
    res.send("nao implementada");
});

//Realiza o delete do cliente
exports.produtos_delete_handler = asyncHandler(async(req, res, next) => {
    res.send("nao implementada");
});

// mostra formulario de update do cliente
exports.produtos_update_form = asyncHandler(async(req, res, next) => {
    res.send("nao implementada");
});

// Realiza o update do cliente
exports.produtos_update_handler = asyncHandler(async(req, res, next) => {
    res.send("nao implementada");
});
