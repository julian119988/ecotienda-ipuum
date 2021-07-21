const ProductosModel = require("../models/ProductosModel");
const TodoModel = require("../models/TodoModel");
const VendedoresModel = require("../models/VendedoresModel");

export const getTodos = async (req, res, next) => {
    try {
        const todos = await TodoModel.find();
        res.send(todos);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
export const uploadTodo = async (req, res, next) => {
    const { titulo, descripcion, persona } = await req.body;
    try {
        const nuevoTodo = new TodoModel({
            titulo: titulo,
            descripcion: descripcion,
            persona: persona,
        });
        const isSaved = await nuevoTodo.save();
        res.send(isSaved);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
export const deleteTodo = async (req, res, next) => {
    const { id } = await req.body;
    try {
        const isDeleted = await TodoModel.findOneAndDelete({ _id: id });
        res.send(isDeleted);
    } catch (err) {
        res.status(413).send(err);
    }
};

export const uploadVendedor = async (req, res, next) => {
    const { data } = await req.body;
    try {
        const nuevoVendedor = new VendedoresModel({
            nombre: data.nombre,
            antiguedad: data.antiguedad,
        });
        const isSaved = await nuevoVendedor.save();
        res.send(isSaved);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
export const getVendedores = async (req, res, next) => {
    try {
        const vendedores = await VendedoresModel.find();
        res.send(vendedores);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
export const deleteVendedor = async (req, res, next) => {
    const { id } = await req.body;
    try {
        const isDeleted = await VendedoresModel.findOneAndDelete({ _id: id });
        res.send(isDeleted);
    } catch (err) {
        res.status(413).send(err);
    }
};

export const uploadProducto = async (req, res, next) => {
    const {
        producto,
        precioVenta,
        cantidad,
        marca,
        precioCompra,
        porcentajeGanancia,
    } = await req.body;
    console.log(req.body);
    try {
        const nuevoProducto = new ProductosModel({
            producto: producto.toString(),
            precioVenta: parseInt(precioVenta),
            cantidad: parseInt(cantidad),
            marca: marca.toString(),
            precioCompra: parseInt(precioCompra),
            porcentajeGanancia: parseInt(porcentajeGanancia),
        });
        console.log({
            producto: producto.toString(),
            precioVenta: parseInt(precioVenta),
            cantidad: parseInt(cantidad),
            marca: marca.toString(),
            precioCompra: parseInt(precioCompra),
            porcentajeGanancia: parseInt(porcentajeGanancia),
        });
        const isSaved = await nuevoProducto.save();
        res.send(isSaved);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
export const getProductos = async (req, res, next) => {
    const { producto } = await req.params;
    try {
        if (producto === "all") {
            const response = await ProductosModel.find();
            res.send(response);
        } else {
            const regex = new RegExp(producto, "i");
            const response = await ProductosModel.find({
                producto: { $regex: regex },
            }).exec();
            res.send(response);
        }
    } catch (err) {
        res.status(413).send(err);
        console.log(err);
        next(err);
    }
};
export const deleteProducto = async (req, res, next) => {
    const { id } = await req.body;
    console.log(id);
    try {
        const isDeleted = await ProductosModel.findOneAndDelete({ _id: id });
        res.send(isDeleted);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
export const updateProducto = async (req, res, next) => {
    const { id } = await req.body;
    try {
        const isDeleted = await ProductosModel.findOneAndDelete({ _id: id });
        res.send(isDeleted);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
