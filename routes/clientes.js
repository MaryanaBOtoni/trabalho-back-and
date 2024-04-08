var express = require('express');
var router = express.Router();

const clientes_controller = require("../controllers/clientesController");
const validateCliente = require("../middlewares/validateCliente");


router.get("/", clientes_controller.index);
router.get("/criar", clientes_controller.clientes_criar_form);
router.post("/criar", validateCliente, clientes_controller.clientes_criar_handler);
router.post("/delete/:id", clientes_controller.clientes_delete_handler);
router.get("/update/:id", clientes_controller.clientes_update_form);
router.post("/update/:id", validateCliente,  clientes_controller.clientes_update_handler);

module.exports = router;