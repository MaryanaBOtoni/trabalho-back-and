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
    } else if (body.nome.length < 3 || body.nome.length > 255) {
        const msg = "Campo nome deve ter entre 3 e 255 caracteres";
        erros.push(msg);
    
    }
    if(body.sobrenome === undefined) {
        const msg = "Erro no servidor";
        erros.push(msg)
    }
    if(body.sobrenome === "") {
        const msg = "Campo sobrenome não pode ser vazio";
        erros.push(msg)
    } else if (body.sobrenome.length < 3 || body.sobrenome.length > 255) {
        const msg = "Campo sobrenome deve ter entre 3 e 255 caracteres";
        erros.push(msg);
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
    if (body.email.indexOf('@') == -1)
        {
            const msg = "Campo de email inválido, deve conter @ ";
        erros.push(msg)
        }
    if(body.idade === undefined) {
        const msg = "Erro no servidor";
        erros.push(msg)
    }
    if(body.idade == "" ) {
        const msg = "Campo idade não pode ser vazio";
        erros.push(msg)
    } else if (body.idade <= 0 || body.idade >= 120) {
        const msg = "Campo idade deve ser positivo e menor do que 120";
        erros.push(msg);
    
    }
    if(erros.length === 0) {
        next();
    } else {
        res.render('clienteFormCreate', {erros: erros})
    }
}

module.exports = validateCliente;