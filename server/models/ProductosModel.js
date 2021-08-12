import mongoose from "mongoose";
const { Schema } = mongoose;

const prouctosSchema = new Schema({
    producto: String,
    precioVenta: Number,
    cantidad: Number,
    marca: String,
    precioCompra: Number,
    porcentajeGanancia: Number,
    concesion: Boolean,
});

const ProductosModel = mongoose.model("Productos", prouctosSchema);

export default ProductosModel;
