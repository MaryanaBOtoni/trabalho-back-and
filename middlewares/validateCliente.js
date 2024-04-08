function validateCliente(req, res, next) {
    const body = req.body;

    let erros = [];

    if(body.nome === undefined) {
        const msg = "Erro no servidor";
        erros.push(msg)
    }
    if(body.nome === "") {
        const msg = "Campo nome não pode ser vazio";
        erros.push(msg)
    }
    if(body.sobrenome === undefined) {
        const msg = "Erro no servidor";
        erros.push(msg)
    }
    if(body.sobrenome === "") {
        const msg = "Campo sobrenome não pode ser vazio";
        erros.push(msg)
    }
    if(body.email === undefined) {
        const msg = "Erro no servidor";
        body.email = "";
        erros.push(msg)
    }
    if(body.email === "") {
        const msg = "Campo email não pode ser vazio";
        erros.push(msg)
    }
    if(body.idade === undefined) {
        const msg = "Erro no servidor";
        erros.push(msg)
    }
    if(body.idade == "" ) {
        const msg = "Campo idade não pode ser vazio";
        erros.push(msg)
    }
    if(erros.length === 0) {
        next();
    } else {
        res.render('clienteFormCreate', {erros: erros})
    }
}

module.exports = validateCliente;