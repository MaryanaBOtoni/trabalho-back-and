//  Chame o módulo express
//  Chame o módulo express
const express = require('express');
//  Crie um servidor app
const app = express();
//  Crie um endpoint para receber requisições
app.get('/', function(req, res) {
  res.send('Ola Mundo!');
});
//  Imprima URL para acessar o servidor
app.listen(8000, function() {
  console.log('App ouvindo na porta 8000!');
});
