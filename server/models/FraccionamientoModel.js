import mongoose from "mongoose";
const { Schema } = mongoose;

const fraccionamientoSchema = new Schema({
    nombre: String,
    descripcion: String,
    ganancia: Number,
    fecha: { type: Date, default: Date.now },
    cantidad: Number,
});

const FraccionamientoModel = mongoose.model(
    "fraccionamiento",
    fraccionamientoSchema
);

export default FraccionamientoModel;
