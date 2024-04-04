var express = require('express');
var router = express.Router();

const clientes_controller = require("../controllers/clientesController");


// Traz clientes como home
router.get("/", clientes_controller.index);

// traz formulario de criacao de clientes
router.get("/criar", clientes_controller.clientes_criar_form);

// faz post request para criacao do cliente
router.post("/criar", clientes_controller.clientes_criar_handler);

router.get("/:id/delete", clientes_controller.clientes_delete_form);

router.post("/:id/delete", clientes_controller.clientes_delete_handler);

router.get("/:id/update", clientes_controller.clientes_update_form);

router.post("/:id/update", clientes_controller.clientes_update_handler);

module.exports = router;