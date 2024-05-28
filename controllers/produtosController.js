const asyncHandler = require("express-async-handler");
const NodeCache = require('node-cache');
const cache = new NodeCache();
const ProdutosModel = require('../models/ProdutosModel');

exports.index = asyncHandler(async (req, res) => {
    try {
        const produtos = await ProdutosModel.getAllProdutos();

        const produtosCache = cache.get('produtos');

        if (!produtosCache) { 
             cache.set('produtos', produtos);

            console.log('nao cache')

            res.render('produtos', {
                dados: produtos
            })
        } else {
            console.log("cache");
            res.render('produtos', {
                dados: produtos
            })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

exports.produtos_criar_form = asyncHandler(async (req, res) => {
    res.render('produtosFormCreate');
});

exports.produtos_criar_handler = asyncHandler(async (req, res) => {
    try {
        ProdutosModel.insertProduto(req.body);
        res.redirect('/produtos')
    } catch (error) {
        console.log(error);
    }
});

exports.produtos_delete_handler = asyncHandler(async (req, res) => {
    try {
        ProdutosModel.deleteProdutoById(req.params.id);
        res.redirect('/produtos')
    } catch (error) {
        console.log(error);
    }
});

exports.produtos_update_form = asyncHandler(async (req, res) => {
    try {
        let produto = await ProdutosModel.getProdutoById(req.params.id);
        res.render('produtosFormUpdate', { dados: produto });
    } catch (error) {
        console.log(error);
    }
});

exports.produtos_update_handler = asyncHandler(async (req, res) => {
    try {
        await ProdutosModel.updateProdutoById(req.params.id, req.body);
        res.redirect('/produtos')
    } catch (error) {
        console.log(error);
    }
});
