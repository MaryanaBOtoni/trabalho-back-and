var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index.jade', { title: 'Express' });
});

router.get('/clientes', function(req, res) {
    res.send('index.jade', { title: 'Express' });
});

router.get('/', function(req, res) {
    res.render('index.jade', { title: 'Express' });
});

router.get('/', function(req, res) {
    res.render('index.jade', { title: 'Express' });
});
module.exports = router;
