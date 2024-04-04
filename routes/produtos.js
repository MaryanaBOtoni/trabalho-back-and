var express = require('express');
var router = express.Router();

const produtos_controller = require("../controllers/produtosController");


// Traz clientes como home
router.get("/", produtos_controller.index);

// traz formulario de criacao de clientes
router.get("/criar",  produtos_controller.produtos_criar_form);

// faz post request para criacao do cliente
router.post("/criar",  produtos_controller.produtos_criar_handler);

router.get("/:id/delete",  produtos_controller.produtos_delete_form);

router.post("/:id/delete",  produtos_controller.produtos_delete_handler);

router.get("/:id/update",  produtos_controller.produtos_update_form);

router.post("/:id/update",  produtos_controller.produtos_update_handler);

module.exports = router;