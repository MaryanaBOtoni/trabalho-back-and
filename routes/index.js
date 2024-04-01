const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});

// Clientes

router.get('/clientes', function(req, res, next) {
res.send('end-point get clientes');
});

router.post('/clientes', function(reeq, res) {
res.send('end-point post clientes');
});

router.put('/clientes', function(reeq, res) {
res.send('end-point put clientes');
});

router.delete('/clientes', function(reeq, res) {
res.send('end-point delete clientes');
});

// Produtores

router.get('/produtos', function(reeq, res) {

});

router.post('/produtos', function(reeq, res) {

});

router.put('/produtos', function(reeq, res) {

});

router.delete('/produtos', function(reeq, res) {

});


module.exports = router;
