const ProductosModel = require("../models/ProductosModel");
const TodoModel = require("../models/TodoModel");
const VendedoresModel = require("../models/VendedoresModel");
const FraccionamientoModel = require("../models/FraccionamientoModel");
const bcrypt = require("bcrypt");

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
        bcrypt.hash(data.password, 11, async function (err, hash) {
            const nuevoVendedor = new VendedoresModel({
                nombre: data.nombre,
                antiguedad: data.antiguedad,
                password: hash,
                rol: data.rol,
            });
            const isSaved = await nuevoVendedor.save();
            res.send(isSaved);
        });
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
export const checkPass = async (req, res, next) => {
    const { data } = await req.body;
    try {
        const savedUser = await VendedoresModel.findOne({
            nombre: data.nombre,
        });
        if (savedUser) {
            bcrypt.compare(
                data.password,
                savedUser.password,
                function (err, result) {
                    if (result) {
                        res.send({
                            isAuthenticated: true,
                            user: {
                                _id: savedUser._id,
                                nombre: savedUser.nombre,
                                rol: savedUser.rol,
                                antiguedad: savedUser.antiguedad,
                            },
                        });
                    } else {
                        res.send({ isAuthenticated: false });
                    }
                }
            );
        }
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
        next(err);
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
    const { busqueda } = await req.params;
    try {
        if (busqueda === "all") {
            const response = await ProductosModel.find();
            res.send(response);
        } else {
            const regex = new RegExp(busqueda, "i");
            const response = await ProductosModel.find({
                $or: [
                    { producto: { $regex: regex } },
                    { marca: { $regex: regex } },
                ],
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
    try {
        const isDeleted = await ProductosModel.findOneAndDelete({ _id: id });
        res.send(isDeleted);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
export const updateProducto = async (req, res, next) => {
    const { id } = await req.params;
    const { producto } = await req.body;
    try {
        const isUpdated = await ProductosModel.findByIdAndUpdate(id, producto);
        res.send(isUpdated);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};

export const getFraccionamiento = async (req, res, next) => {
    try {
        const fraccionamientos = await FraccionamientoModel.find();
        res.send(fraccionamientos);
    } catch (err) {
        res.status(413).send(
            "Ha ocurrido un error al buscar los fraccionamientos."
        );
    }
};
export const postFraccionamiento = async (req, res, next) => {
    const { nombre, descripcion, ganancia, cantidad, fecha } = await req.body;
    try {
        const nuevoFraccionamiento = new FraccionamientoModel({
            nombre,
            descripcion,
            ganancia,
            cantidad,
            fecha,
        });
        const isSaved = await nuevoFraccionamiento.save();
        res.send(isSaved);
    } catch (err) {
        res.status(413).send(
            "Ha ocurrido un error guardando el fraccionamiento."
        );
        next(err);
    }
};
export const deleteFraccionamiento = async (req, res, next) => {
    const { id } = await req.body;
    try {
        const isDeleted = await FraccionamientoModel.findOneAndDelete({
            _id: id,
        });
        res.send(isDeleted);
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
