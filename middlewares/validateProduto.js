function validateProduto(req, res, next) {
    data = req.body;
    let erros = [];

    console.log(data);
    if(data.nome === undefined) {
        const msg = "Erro no servidor";
        erros.push(msg)
    }
    if(data.nome === "") {
        const msg = "O campo nome é obrigatorio";
        erros.push(msg)
    }

    if(data.descricao === undefined) {
        const msg = "Erro no servidor";
        erros.push(msg)
    }
    if(data.descricao === "") {
        const msg = "O campo descrição é obrigatório";
        erros.push(msg)
    }
    if(data.preco === undefined) {
        const msg = "Erro no servidor";
        erros.push(msg)
    }
    if(data.preco === "") {
        const msg = "O campo preço é obrigatório";
        erros.push(msg)
    }

    if(erros.length === 0) {
        next();
    } else {
        res.render('produtosFormCreate', {erros: erros})
    }
}

module.exports = validateProduto;