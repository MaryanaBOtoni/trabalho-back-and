var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Clientes

router.get('/clientes', function(reeq, res){

});

router.post('/clientes', function(reeq, res){

});

router.put('/clientes', function(reeq, res){

});

router.delete('/clientes', function(reeq, res){

});

// Produtores

router.get('/produtos', function(reeq, res){

});

router.post('/produtos', function(reeq, res){

});

router.put('/produtos', function(reeq, res){

});

router.delete('/produtos', function(reeq, res){

});


module.exports = router;
