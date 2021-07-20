const express = require("express");
const router = express.Router();
const {
    getProductos,
    uploadProducto,
    uploadTodo,
    getTodos,
    deleteTodo,
} = require("../controllers/controllers");

router.get("/productos", getProductos);

router.get("/uploadProducto", uploadProducto);

router.post("/todo", uploadTodo);

router.get("/todo", getTodos);

router.delete("/todo", deleteTodo);
module.exports = router;
