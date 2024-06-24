function validateProduto(req, res, next) {
    const data = req.body;
    let erros = [];

    // Validar campo nome
    if (data.nome === undefined || data.nome === "") {
        const msg = "O campo nome é obrigatório";
        erros.push(msg);
    } else if (data.nome.length < 3 || data.nome.length > 255) {
        const msg = "Campo nome deve ter entre 3 e 255 caracteres";
        erros.push(msg);
    }

    // Validar campo descrição
    if (data.descricao === undefined || data.descricao === "") {
        const msg = "O campo descrição é obrigatório";
        erros.push(msg);
    } else if (data.descricao.length < 3 || data.descricao.length > 255) {
        const msg = "Campo descrição deve ter entre 3 e 255 caracteres";
        erros.push(msg);
    }

    // Validar campo preço
    if (data.preco === undefined || data.preco === "") {
        const msg = "O campo preço é obrigatório";
        erros.push(msg);
    } else if (isNaN(data.preco) || parseFloat(data.preco) <= 0) {
        const msg = "O preço deve ser um valor numérico positivo";
        erros.push(msg);
    }

    // Se não houver erros, passa para o próximo middleware
    if (erros.length === 0) {
        next();
    } else {
        // Caso contrário, renderiza a página de criação de produtos com os erros
        res.render('produtosFormCreate', { erros: erros });
    }
}

module.exports = validateProduto;
