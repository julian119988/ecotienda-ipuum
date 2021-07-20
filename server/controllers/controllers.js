const ProductosModel = require("../models/ProductosModel");
const TodoModel = require("../models/TodoModel");

export const uploadProducto = async (req, res, next) => {
    try {
        const nuevoProducto = new ProductosModel({
            producto: "Semillas",
            precioVenta: 700,
            cantidad: 10,
            marca: "Una marca",
            precioCompra: 500,
            porcentajeGanancia: 1.4,
        });
        const isSaved = await nuevoProducto.save();
        res.send(isSaved);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};

export const getProductos = async (req, res, next) => {
    try {
        const response = await ProductosModel.find();
        res.send(response);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};

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
        console.log(req.body);
        const isDeleted = await TodoModel.findOneAndDelete({ _id: id });
        res.send(isDeleted);
    } catch (err) {
        res.status(413).send(err);
    }
};
