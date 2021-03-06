import express from "express";
const router = express.Router();
import {
    getProductos,
    uploadProducto,
    uploadTodo,
    getTodos,
    deleteTodo,
    uploadVendedor,
    getVendedores,
    checkPass,
    deleteVendedor,
    updateProducto,
    deleteProducto,
    getFraccionamiento,
    postFraccionamiento,
    deleteFraccionamiento,
    postVenta,
    getHistorial,
    aperturaCaja,
    cierreCaja,
    deleteProductos,
    deleteHistorial,
    postNotaDeCredito,
} from "../controllers/controllers";

router.post("/todo", uploadTodo);
router.get("/todo", getTodos);
router.delete("/todo", deleteTodo);

router.get("/vendedor", getVendedores);
router.post("/vendedor/:nombre", checkPass);
router.post("/vendedor", uploadVendedor);
router.delete("/vendedor", deleteVendedor);

router.get("/productos/:busqueda", getProductos);
router.post("/productos", uploadProducto);
router.patch("/productos/:id", updateProducto);
router.delete("/productos", deleteProducto);
router.get("/productos/", getProductos);

router.get("/fraccionamiento", getFraccionamiento);
router.post("/fraccionamiento", postFraccionamiento);
router.delete("/fraccionamiento", deleteFraccionamiento);

router.post("/ventas", postVenta);

router.get("/historial", getHistorial);

router.post("/aperturaCaja", aperturaCaja);
router.post("/cierreCaja", cierreCaja);

router.post("/deleteProductos", deleteProductos);
router.post("/deleteHistorial", deleteHistorial);

router.post("/nota-de-credito", postNotaDeCredito);

export default router;
