var express = require('express');
var router = express.Router();

const produtos_controller = require("../controllers/produtosController");
const validateCliente = require("../middlewares/validateProduto");


router.get("/", produtos_controller.index);
router.get("/criar",  produtos_controller.produtos_criar_form);
router.post("/criar", validateCliente,produtos_controller.produtos_criar_handler);
router.post("/delete/:id", produtos_controller.produtos_delete_handler);
router.get("/update/:id", produtos_controller.produtos_update_form);
router.post("/update/:id", validateCliente, produtos_controller.produtos_update_handler);

module.exports = router;