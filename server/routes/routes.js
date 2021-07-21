const express = require("express");
const router = express.Router();
const {
    getProductos,
    uploadProducto,
    uploadTodo,
    getTodos,
    deleteTodo,
    uploadVendedor,
    getVendedores,
    deleteVendedor,
    updateProducto,
    deleteProducto,
} = require("../controllers/controllers");

router.post("/todo", uploadTodo);
router.get("/todo", getTodos);
router.delete("/todo", deleteTodo);

router.post("/vendedor", uploadVendedor);
router.get("/vendedor", getVendedores);
router.delete("/vendedor", deleteVendedor);

router.get("/productos/:producto", getProductos);
router.post("/productos", uploadProducto);
router.patch("/productos", updateProducto);
router.delete("/productos", deleteProducto);
router.get("/productos/", getProductos);

module.exports = router;
