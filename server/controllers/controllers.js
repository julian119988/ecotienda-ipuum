import ProductosModel from "../models/ProductosModel";
import TodoModel from "../models/TodoModel";
import VendedoresModel from "../models/VendedoresModel";
import FraccionamientoModel from "../models/FraccionamientoModel";
import HistorialModel from "../models/HistorialModel";
import AperturaCajaModel from "../models/AperturaCajaModel";
import bcrypt from "bcrypt";

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
        const existeVendedor = await VendedoresModel.find({
            nombre: data.nombre,
        });
        if (!existeVendedor[0]) {
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
        } else {
            res.status(418).send({
                message: "Ese nombre ya se encuentra registrado",
            });
        }
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
    const { producto, productoAntiguo } = await req.body;
    try {
        const isUpdated = await ProductosModel.findByIdAndUpdate(id, producto);
        const newHistory = new HistorialModel({
            tipo: "producto",
            responsable: productoAntiguo.user.nombre,
            descripcion: `Producto: ${productoAntiguo.producto}. ${
                productoAntiguo.campo
            } cambio de: ${productoAntiguo[productoAntiguo.campo]}. A: ${
                producto[productoAntiguo.campo]
            }`,
        });
        const historyIsSaved = await newHistory.save();
        res.send({ isUpdated, historyIsSaved });
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
    const { nombre, descripcion, ganancia, cantidad } = await req.body;
    try {
        const newHistory = new HistorialModel({
            tipo: "fraccionamiento",
            responsable: nombre,
            descripcion: `Fraccionamiento agregado: Producto: ${descripcion}. Cantidad: ${cantidad}.`,
            total: parseInt(ganancia) * parseInt(cantidad),
        });
        const historyIsSaved = await newHistory.save();

        const nuevoFraccionamiento = new FraccionamientoModel({
            nombre,
            descripcion,
            ganancia: parseInt(ganancia) * parseInt(cantidad),
            cantidad,
            idHistorial: historyIsSaved._id,
        });
        const isSaved = await nuevoFraccionamiento.save();
        console.log(isSaved);
        res.send({ isSaved, historyIsSaved });
    } catch (err) {
        res.status(413).send(
            "Ha ocurrido un error guardando el fraccionamiento."
        );
        next(err);
    }
};
export const deleteFraccionamiento = async (req, res, next) => {
    const { id, idHistorial } = await req.body;
    try {
        const isDeletedFromHistory = await HistorialModel.findOneAndDelete({
            _id: idHistorial,
        });
        const isDeleted = await FraccionamientoModel.findOneAndDelete({
            _id: id,
        });
        res.send("Fraccionamiento eliminado!");
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};
export const postVenta = async (req, res, next) => {
    const { productos, isFeria, user } = await req.body;
    try {
        const available = await checkStock(productos);
        if (available) {
            res.send({ message: "Se ha realizado la venta." });
            calcularInfoVenta(productos, isFeria, user);
        } else {
            res.status(418).send({ message: "No hay stock disponible." });
        }
    } catch (err) {
        res.status(413).send(err);
        next(err);
    }
};

async function checkStock(productos) {
    var isCorrect = true;
    const savedProducts = await Promise.all(
        productos.map(async (producto) => {
            const response = await ProductosModel.findById(producto._id);
            if (response.cantidad < producto.cantidad) isCorrect = false;
            return response;
        })
    );
    if (isCorrect) {
        try {
            productos.map(async (producto) => {
                savedProducts.forEach(async (savedProduct) => {
                    if (producto._id == savedProduct._id) {
                        await ProductosModel.findByIdAndUpdate(producto._id, {
                            cantidad: savedProduct.cantidad - producto.cantidad,
                        });
                    }
                });
            });
            return true;
        } catch (err) {
            return false;
        }
    }
    return false;
}

const calcularInfoVenta = async (productos, isFeria, user) => {
    var total = 0;
    var descripcion = [];
    productos.map((producto) => {
        descripcion.push({ producto });
        total += producto.cantidad * producto.precioVenta;
    });
    console.log(productos, isFeria, user);
    const nuevoHistorial = new HistorialModel({
        tipo: "venta",
        responsable: user.nombre,
        descripcion: JSON.stringify(descripcion),
        opcional: isFeria,
        total: total,
    });
    const isSaved = await nuevoHistorial.save();
};

export const getHistorial = async (req, res, next) => {
    const { fecha, tipo, responsable } = req.query;
    try {
        const historial = await HistorialModel.find({
            $and: [
                fecha === "todos"
                    ? {}
                    : {
                          $expr: {
                              $and: [
                                  {
                                      $eq: [
                                          { $month: "$createdAt" },
                                          parseInt(fecha),
                                      ],
                                  },
                                  {
                                      $eq: [
                                          { $year: "$createdAt" },
                                          new Date().getFullYear(),
                                      ],
                                  },
                              ],
                          },
                      },
                tipo === "todos" ? {} : { tipo: tipo },
                responsable === "todos" ? {} : { responsable: responsable },
            ],
        });
        res.send(historial);
    } catch (err) {
        res.status(418).send(err);
        next(err);
    }
};
export const aperturaCaja = async (req, res, next) => {
    const {
        data: { monto, user },
    } = req.body;

    try {
        const nuevoRegistro = new AperturaCajaModel({
            nombre: user.nombre,
            abrio: "abrio",
            dinero: parseInt(monto),
        });
        const isSaved = await nuevoRegistro.save();
        const newHistory = new HistorialModel({
            tipo: "caja",
            responsable: user.nombre,
            descripcion: `Apertura de caja con un monto de $${monto}.`,
            total: parseInt(monto),
        });
        await newHistory.save();
        res.send(isSaved);
    } catch (err) {
        res.status(418).send(err);
        next(err);
    }
};
export const cierreCaja = async (req, res, next) => {
    const {
        data: { monto, user },
    } = req.body;

    try {
        const nuevoRegistro = new AperturaCajaModel({
            nombre: user.nombre,
            abrio: "cerro",
            dinero: parseInt(monto),
        });
        const isSaved = await nuevoRegistro.save();
        const newHistory = new HistorialModel({
            tipo: "caja",
            responsable: user.nombre,
            descripcion: `Cierre de caja con un monto de $${monto}.`,
            total: parseInt(monto),
        });
        await newHistory.save();
        res.send(isSaved);
    } catch (err) {
        res.status(418).send(err);
        next(err);
    }
};
