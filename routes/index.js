var express = require('express');
var router = express.Router();


// Traz clientes como home
router.get('/', function (req, res) {
    res.redirect("clientes")
});

module.exports = router;
